# Stage 2: Outline

Turn the research into `data/<book-name>/outline.md` and `outline.jsx`. Fixing structure here costs one line; fixing it after chapters exist costs a rewrite.

## `outline.md` (the plan)

- Title, subtitle, author, and a **total page limit**.
- A table: chapter number, title, chapter id, page budget, and sections (each with its own id).
- Page budgets add up to the limit. Plan about 2 pages per section.
- A short notes list on order and what each chapter is for.

Use ids in kebab-case. Chapter 1 should be a short opener. Order chapters so each one only needs what came before it.

## `outline.jsx` (the table-of-contents page)

```jsx
import { Outline } from '@components';

const chapters = [
  { id: 'chapter-id', title: 'Chapter Title', sections: [{ id: 'section-id', title: 'Section title' }] },
];

export default function BookOutline() {
  return <Outline bookTitle="Book Title" chapters={chapters} />;
}
```

`bookTitle` must be a plain string literal. The PDF build reads it for the running page header. List the whole planned book. Entries for chapters that are not written yet are skipped when links are added.

Checkpoint: the user approves the outline before any chapter is written.
