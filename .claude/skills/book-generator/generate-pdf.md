# Stage 4: PDF

Print the finished pages to `data/<book-name>/book.pdf`. This stage only assembles. If content is missing, fix it in Stage 3.

```bash
cd .claude/skills/book-generator
npm run setup                          # once
npm run pdf -- <book-name>
```

The script starts its own Vite server, prints `outline.jsx` and each `chapter-*.jsx` with headless Chrome (A4), merges them, adds the running header (book title) and page numbers (chapter 1 starts at page 1), and adds clickable table-of-contents links. Options: `--base-url URL` to reuse a running dev server, `--out PATH` to change the output file.

## Checks before sharing

- Page count is within the limit in `outline.md`.
- Each chapter starts on a new page; no heading is alone at the bottom of a page.
- Table-of-contents links work. A warning that a link target was "not found yet" is expected for chapters not written.
- The PDF tab in `npm run dev` shows the built file.
