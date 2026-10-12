# Components

All live in `book-content/components/` and are imported from `@components`. Colours are flat and come from the variables at the top of `styles.css`. Change the theme there only.

| Component | Use |
| --- | --- |
| `ContentContainer` | Wraps a whole chapter. Sets fonts and page margins. |
| `ChapterTitle` `{ id, title, subtitle }` | Chapter opener. Starts a new page. |
| `Section` `{ id, title, level? }` | A titled section. `level={3}` for a sub-section. |
| `SectionHeading` | The heading alone, if you need it. |
| `List`, `ListItem` | Bulleted list. |
| `Card` `{ title }` | A short boxed note. |
| `Alert` `{ variant, label? }` | Callout. Variants: `note`, `tip`, `important`. |
| `CodeSection` `{ lang }` | A code block with syntax colours. |
| `CrossRefLink` `{ href }` | Link to another heading (`#id`). |
| `Outline` `{ bookTitle, chapters }` | The table-of-contents page. Used in `outline.jsx`. |

To add a component: create `<Name>.jsx`, add its CSS to `styles.css` using the existing colour variables, export it from `index.js`, and add a row above.
