# claude-book-generator

A Claude Code skill that turns a topic into a full-length PDF book: research → outline → chapters → print-ready PDF.

Give Claude a topic. It researches each chapter with sources, plans an outline with a page budget, writes the chapters as React components, and prints the result to `book.pdf`. You review after every stage.

## How it works

| Stage | What happens | Output |
| --- | --- | --- |
| 1. Research | Collects sourced facts for a chapter before any writing | `data/<book>/research/chapter-<id>.md` |
| 2. Outline | Plans chapters, sections and a page limit | `outline.md`, `outline.jsx` |
| 3. Content | Writes one section at a time, rendered live for review | `chapter-<NN>-<id>.jsx` |
| 4. PDF | Prints the outline and chapters with headless Chrome | `book.pdf` |

The output is a single deliverable: the book PDF. The styling is flat colours only. The theme variables are at the top of `book-content/components/styles.css`.

## Requirements

- [Claude Code](https://claude.com/claude-code)
- Node.js
- Google Chrome (set `CHROME_PATH` if it is installed in a non-standard place)

## Quick start

```bash
cd .claude/skills/book-generator
npm run setup
```

Then open the repo in Claude Code and ask, for example:

- "Research chapter 1 of a book on *Fundamentals of AI*."
- "Write the outline for the book."
- "Write chapter 2, section 1."
- "Build the PDF."

Commands, run from `.claude/skills/book-generator/`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Live preview at http://localhost:5183 of every book under `data/` |
| `npm run build` | Compile check for the components and chapters |
| `npm run pdf -- <book-name>` | Build `data/<book-name>/book.pdf` |

## Repository layout

```
.claude/skills/book-generator/
├── SKILL.md                  # entry point and writing standard
├── research.md               # stage 1
├── generate-outline.md       # stage 2
├── generate-content.md       # stage 3
├── generate-pdf.md           # stage 4
├── component-reference.md    # the components chapters can use
├── book-content/             # preview app, components and styles
└── book-pdf/                 # PDF build scripts
data/
└── fundamentals-of-ai/       # example book: 4 chapters, 14 pages
```

## Example book

`data/fundamentals-of-ai/` is a complete example: an introduction to how AI works, in 4 chapters. Every chapter has a research file listing its sources, so each claim can be traced.

## Components

Chapters use a small set of components: `ContentContainer`, `ChapterTitle`, `Section`, `List`, `Card`, `Alert`, `CodeSection`, `CrossRefLink` and `Outline`. See [component-reference.md](.claude/skills/book-generator/component-reference.md).

## Writing standard

Short, plain sentences. Everyday words. Technical terms explained once. Every fact that can go out of date comes from a source listed in the chapter's research file.

## Author

Dinesh Dabhi
