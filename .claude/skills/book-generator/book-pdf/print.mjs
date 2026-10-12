// Prints HTML pages to PDF with headless Chrome (puppeteer-core), waiting for
// web fonts to finish loading. Each section is its own print job because a
// running header/footer must (a) never appear on Cover/Outline and (b) differ
// per section — Chrome's headerTemplate/footerTemplate is per print job, and
// `position: fixed` in one continuous document repeats across the whole job.
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];

export function findChrome() {
  const found = [process.env.CHROME_PATH, ...CHROME_CANDIDATES].find((p) => p && fs.existsSync(p));
  if (!found) throw new Error('Chrome not found — install Google Chrome or set CHROME_PATH.');
  return found;
}

export function launchChrome() {
  return puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
}

/** Print one URL to PDF bytes. */
export async function printUrl(browser, url, { header, footer } = {}) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 300)); // layout settle after font swap
    const displayHeaderFooter = Boolean(header || footer);
    // No margin params: the printed document's own @page margin always wins
    // in Chrome (see styles.css and App.jsx), so passing them is pointless.
    return await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter,
      ...(displayHeaderFooter && {
        headerTemplate: header || '<span></span>',
        footerTemplate: footer || '<span></span>',
      }),
    });
  } finally {
    await page.close();
  }
}
