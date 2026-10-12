// Real clickable Table-of-Contents links in the merged book.pdf.
//
// These can't be HTML #anchors: Outline and every chapter print as separate
// PDFs, so an in-page href has no target. After the merge, each link's label
// is located on the outline's own pages (its rect = clickable area) and the
// target text on the target section's pages (its page = destination), then a
// GOTO link annotation is added with pdf-lib. Text positions come from
// pdfjs-dist.
import { PDFName, PDFArray } from 'pdf-lib';

let pdfjsPromise;
const pdfjs = () => (pdfjsPromise ??= import('pdfjs-dist/legacy/build/pdf.mjs'));

const norm = (s) => s.replace(/\s+/g, '').toLowerCase();

/** Per page: text items with PDF-space boxes. */
export async function extractPages(pdfBytes) {
  const { getDocument } = await pdfjs();
  const task = getDocument({ data: new Uint8Array(pdfBytes), verbosity: 0 });
  const doc = await task.promise;
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const { items } = await (await doc.getPage(i)).getTextContent();
    pages.push(
      items
        .filter((it) => it.str && it.str.trim())
        .map((it) => ({ str: it.str, x: it.transform[4], y: it.transform[5], w: it.width, h: it.height || 10 })),
    );
  }
  await task.destroy();
  return pages;
}

/** Rects (one per text item touched) of every case-insensitive match of `text` on a page. */
function findRects(items, text) {
  const needle = norm(text);
  // Whitespace-stripped page text, remembering which item/char each char came from.
  let hay = '';
  const origin = [];
  items.forEach((it, idx) => {
    [...it.str].forEach((ch, ci) => {
      if (/\s/.test(ch)) return;
      hay += ch.toLowerCase();
      origin.push([idx, ci]);
    });
  });
  const rects = [];
  for (let at = hay.indexOf(needle); at !== -1; at = hay.indexOf(needle, at + 1)) {
    const byItem = new Map();
    for (let k = at; k < at + needle.length; k++) {
      const [idx, ci] = origin[k];
      const r = byItem.get(idx) ?? [ci, ci];
      r[1] = ci;
      byItem.set(idx, r);
    }
    for (const [idx, [from, to]] of byItem) {
      const it = items[idx];
      const len = it.str.length;
      const x1 = it.x + (it.w * from) / len;
      const x2 = it.x + (it.w * (to + 1)) / len;
      rects.push([x1, it.y - it.h * 0.25, x2, it.y + it.h * 0.9]);
    }
  }
  return rects;
}

/**
 * @param merged   pdf-lib PDFDocument (all sections already merged)
 * @param sections [{source, bytes, start, count}] — each section's own PDF bytes and page range in `merged`
 * @param links    [{text, source, target_source, target_text?}]
 */
export async function addOutlineLinks(merged, sections, links) {
  const bySource = new Map(sections.map((s) => [s.source, s]));
  const cache = new Map();
  const pagesOf = async (s) => {
    if (!cache.has(s.source)) cache.set(s.source, await extractPages(s.bytes));
    return cache.get(s.source);
  };
  const mergedPages = merged.getPages();

  for (const link of links) {
    const src = bySource.get(link.source);
    const tgt = bySource.get(link.target_source);
    if (!src || !tgt) {
      console.log(`  skipped outline link '${link.text}': unknown source/target_source`);
      continue;
    }
    const tgtPages = await pagesOf(tgt);
    const tgtLocal = tgtPages.findIndex((items) => findRects(items, link.target_text ?? link.text).length);
    if (tgtLocal === -1) {
      console.log(`  skipped outline link '${link.text}': target text not found yet (unauthored content)`);
      continue;
    }
    const targetPage = mergedPages[tgt.start + tgtLocal];

    let linked = false;
    const srcPages = await pagesOf(src);
    srcPages.forEach((items, local) => {
      const page = mergedPages[src.start + local];
      for (const rect of findRects(items, link.text)) {
        const annot = merged.context.obj({
          Type: 'Annot',
          Subtype: 'Link',
          Rect: rect,
          Border: [0, 0, 0],
          Dest: [targetPage.ref, 'XYZ', null, null, null],
        });
        const ref = merged.context.register(annot);
        let annots = page.node.lookup(PDFName.of('Annots'));
        if (!(annots instanceof PDFArray)) {
          annots = merged.context.obj([]);
          page.node.set(PDFName.of('Annots'), annots);
        }
        annots.push(ref);
        linked = true;
      }
    });
    console.log(
      linked
        ? `  linked '${link.text}' -> page ${tgt.start + tgtLocal + 1}`
        : `  skipped outline link '${link.text}': label text not found on its own page`,
    );
  }
}
