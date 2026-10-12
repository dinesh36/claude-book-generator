#!/usr/bin/env node
// Builds data/<book>/book.pdf from that book's outline.jsx and
// chapter-*.jsx: starts book-content's Vite dev server (unless --base-url
// points at one already running), prints each section with headless Chrome,
// merges the results, and adds clickable Table-of-Contents links.
//
// Usage: node book-pdf/build-book.mjs <book-folder-name> [--base-url URL] [--out PATH]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { createServer } from 'vite';
import { chapterHeader, chapterFooter } from './header-footer.mjs';
import { launchChrome, printUrl } from './print.mjs';
import { addOutlineLinks } from './outline-links.mjs';

const PIPELINE_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(PIPELINE_DIR, '..');
const REPO_ROOT = path.resolve(SKILL_DIR, '..', '..', '..');

function bookTitleFromOutline(outlinePath) {
  // outline.jsx is per-book JSX; its bookTitle prop is always a plain string literal.
  const match = fs.readFileSync(outlinePath, 'utf8').match(/bookTitle="([^"]+)"/);
  if (!match) throw new Error(`Could not find bookTitle="..." in ${outlinePath}`);
  return match[1];
}

function buildSections(bookDir, baseUrl) {
  const outlinePath = path.join(bookDir, 'outline.jsx');
  if (!fs.existsSync(outlinePath)) throw new Error(`${outlinePath} not found — build outline.jsx first (see generate-pdf.md)`);
  const bookTitle = bookTitleFromOutline(outlinePath);
  const bookQ = encodeURIComponent(path.basename(bookDir));

  // The outline prints with no header/footer; chapters get both.
  const outlineSource = `${baseUrl}/?book=${bookQ}&only=outline.jsx`;
  const sections = [{ source: outlineSource }];

  // Chapter order = the number in chapter-<NN>-<slug>.jsx (the outline
  // position), compared numerically so chapter-10 follows chapter-9. Header
  // shows the book title, not the chapter title, on every page including
  // the first.
  const chapterSources = {};
  const chapters = fs.readdirSync(bookDir).filter((f) => /^chapter-\d+-.*\.jsx$/.test(f))
    .sort((a, b) => parseInt(a.split('-')[1], 10) - parseInt(b.split('-')[1], 10));
  for (const basename of chapters) {
    const source = `${baseUrl}/?book=${bookQ}&only=${basename}`;
    chapterSources[basename] = source;
    sections.push({ source, header: chapterHeader(bookTitle), footer: chapterFooter() });
  }
  return { sections, outlineSource, chapterSources };
}

/** Chapter/section id+title tree from outline.jsx (flat, one-section-per-line shape — regex, not a JS parser). */
function parseOutlineStructure(outlinePath) {
  if (!fs.existsSync(outlinePath)) return [];
  const text = fs.readFileSync(outlinePath, 'utf8');
  // Accept single or double quotes and quoted or bare keys (outlines are written both ways).
  const chapterRe = /["']?id["']?:\s*(['"])([^'"]+)\1,\s*["']?title["']?:\s*(['"])((?:(?!\3)[^\\]|\\.)*)\3,\s*["']?sections["']?:\s*\[(.*?)\n\s*\],?\s*\n\s*\}/gs;
  const sectionRe = /\{\s*["']?id["']?:\s*(['"])([^'"]+)\1,\s*["']?title["']?:\s*(['"])((?:(?!\3)[^\\]|\\.)*)\3\s*,?\s*\}/g;
  return [...text.matchAll(chapterRe)].map(([, , id, , title, block]) => ({
    id,
    title,
    sections: [...block.matchAll(sectionRe)].map(([, , sid, , stitle]) => ({ id: sid, title: stitle })),
  }));
}

/** Only chapters whose chapter-<NN>-<slug>.jsx exists get entries; the outline lists the whole planned book. */
function buildOutlineLinks(bookDir, outlineSource, chapterSources) {
  if (!outlineSource) return [];
  const links = [];
  for (const chapter of parseOutlineStructure(path.join(bookDir, 'outline.jsx'))) {
    const file = Object.keys(chapterSources).find((f) => new RegExp(`^chapter-\\d+-${chapter.id}\\.jsx$`).test(f));
    const targetSource = file && chapterSources[file];
    if (!targetSource) continue; // not authored yet
    for (const text of [chapter.title, ...chapter.sections.map((s) => s.title)]) {
      links.push({ text, source: outlineSource, target_source: targetSource });
    }
  }
  return links;
}

// Chrome prints each section as its own job, so its page counter restarts per
// chapter. The footer template leaves the number out; this draws the running
// page number (first chapter page = 1) at the footer's right edge instead. Position and
// style mirror the footer row in header-footer.mjs (7.5pt, muted, 18mm side padding).
async function stampPageNumbers(merged, printed) {
  const font = await merged.embedFont(StandardFonts.HelveticaBold);
  const size = 7.5;
  const margin = (18 / 25.4) * 72;
  // The outline is unnumbered and not counted: chapter 1 starts at 1.
  const firstNumbered = printed.find((s) => s.numbered)?.start ?? 0;
  for (const section of printed.filter((s) => s.numbered)) {
    for (let i = 0; i < section.count; i++) {
      const page = merged.getPage(section.start + i);
      const text = String(section.start + i - firstNumbered + 1);
      page.drawText(text, {
        x: page.getWidth() - margin - font.widthOfTextAtSize(text, size),
        y: 18.4,
        size,
        font,
        color: rgb(0x6b / 255, 0x72 / 255, 0x80 / 255),
      });
    }
  }
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { 'base-url': { type: 'string' }, out: { type: 'string' } },
  });
  const [book] = positionals;
  if (!book) throw new Error('Usage: build-book.mjs <book-folder-name> [--base-url URL] [--out PATH]');
  const bookDir = path.join(REPO_ROOT, 'data', book);
  if (!fs.existsSync(bookDir)) throw new Error(`No such book directory: ${bookDir}`);
  const outPath = values.out ?? path.join(bookDir, 'book.pdf');

  let server;
  let baseUrl = values['base-url'];
  if (!baseUrl) {
    server = await createServer({ root: path.join(SKILL_DIR, 'book-content'), logLevel: 'error', server: { port: 5183 } });
    await server.listen();
    baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  }
  const browser = await launchChrome();
  try {
    const { sections, outlineSource, chapterSources } = buildSections(bookDir, baseUrl);
    const links = buildOutlineLinks(bookDir, outlineSource, chapterSources);

    const merged = await PDFDocument.create();
    const printed = [];
    for (const [i, section] of sections.entries()) {
      const bytes = await printUrl(browser, section.source, section);
      const doc = await PDFDocument.load(bytes);
      const start = merged.getPageCount();
      (await merged.copyPages(doc, doc.getPageIndices())).forEach((p) => merged.addPage(p));
      printed.push({ source: section.source, bytes, start, count: doc.getPageCount(), numbered: Boolean(section.footer) });
      console.log(`[${i + 1}/${sections.length}] printed ${section.source} (${doc.getPageCount()} pages)`);
    }

    await stampPageNumbers(merged, printed);

    if (links.length) {
      console.log(`Linking ${links.length} Table of Contents entries...`);
      await addOutlineLinks(merged, printed, links);
    }
    fs.writeFileSync(outPath, await merged.save());
    console.log(`Wrote ${outPath} (${merged.getPageCount()} pages total)`);
  } finally {
    await browser.close();
    await server?.close();
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
