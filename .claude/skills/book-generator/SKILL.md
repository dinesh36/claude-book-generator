---
name: book-generator
description: Writes a PDF book from a topic in four stages (research, outline, content, PDF). Use when the user asks to research, outline, write a chapter of, or produce the PDF for a book. Triggers even if only one stage is asked for.
---

# Book Generator

Turns a topic into a PDF book. One deliverable: `book.pdf`.

1. **Research** — [research.md](research.md): gather sourced facts for a chapter before writing it.
2. **Outline** — [generate-outline.md](generate-outline.md): turn research into a table of contents with a page budget.
3. **Content** — [generate-content.md](generate-content.md): write chapters as React components, one section at a time.
4. **PDF** — [generate-pdf.md](generate-pdf.md): print the outline and chapters to `book.pdf`.

Each stage ends with a checkpoint: show the user the result and wait before the next stage. If the user asks for one stage, do only that stage, and check that the earlier stage's output exists.

## Output layout

```
data/<book-name>/            # <book-name> = kebab-case title, e.g. prompt-engineering-handbook
├── research/chapter-<chapter-id>.md
├── outline.md               # the plan: chapters, sections, page budget
├── outline.jsx              # the table-of-contents page
├── chapter-<NN>-<chapter-id>.jsx   # NN = chapter number: 01, 02, ...
└── book.pdf
```

Chapter ids are the kebab-case chapter title, chosen once in the outline. File names carry the number; research files and `ChapterTitle` ids do not.

## Writing standard

- Short, plain sentences (about 15–20 words). One idea per sentence. Active voice.
- Everyday words. Explain a technical term once, in one line, then use it the same way every time.
- Speak to the reader as "you". Teach with small, real examples.
- Keep it accurate. Simple does not mean shallow. Code and official names stay exact.
- Every fact that can go out of date must come from a source listed in the research file. Never write unsourced facts as if they were checked.
- Never describe the book's own language level ("a plain-English guide").

## Commands

Run from `.claude/skills/book-generator/`. Needs Node.js and Google Chrome (set `CHROME_PATH` if Chrome is somewhere else).

| Command | What it does |
| --- | --- |
| `npm run setup` | Install dependencies (once). |
| `npm run dev` | Live preview at http://localhost:5183. Shows every book under `data/`. |
| `npm run build` | Compile check for the components and chapters. |
| `npm run pdf -- <book-name>` | Print `outline.jsx` and all `chapter-*.jsx` to `data/<book-name>/book.pdf`. |
