// Header/footer HTML for Chrome's headerTemplate/footerTemplate. Flat colours,
// shown on every page of a chapter, including the first.
const PRIMARY = '#1d4ed8';
const RULE = '#d1d5db';
const FONT_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const SIDE_PADDING = '18mm';

export function chapterHeader(bookTitle) {
  return `
    <div style="width:100%; box-sizing:border-box; text-align:center;
                margin-top:0mm; padding:0 ${SIDE_PADDING} 5mm;
                font-family:${FONT_STACK}; font-size:7.5pt; font-weight:600;
                letter-spacing:0.08em; text-transform:uppercase; color:${PRIMARY};
                border-bottom:0.75pt solid ${RULE};
                -webkit-print-color-adjust:exact; print-color-adjust:exact;">
      ${bookTitle}
    </div>
  `;
}

// The page number is not in this template: Chrome's counter restarts at 1 for
// every section, so build-book.mjs stamps the running number after merging.
export function chapterFooter() {
  return `
    <div style="width:100%; box-sizing:border-box; margin-top:0mm; padding:4mm ${SIDE_PADDING} 0;
                border-top:0.75pt solid ${RULE};
                -webkit-print-color-adjust:exact; print-color-adjust:exact;">
    </div>
  `;
}
