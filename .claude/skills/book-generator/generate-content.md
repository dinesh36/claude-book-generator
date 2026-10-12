# Stage 3: Content

Write chapters as React components in `data/<book-name>/chapter-<NN>-<chapter-id>.jsx`. Write one section first, show it rendered, then continue.

## Loop

1. Check that `outline.md` and `research/chapter-<chapter-id>.md` exist. If not, stop and run those stages.
2. Write the chapter file: `ChapterTitle` plus the first `Section` only.
3. Preview with `npm run dev` and show the user the rendered page, not the JSX.
4. After approval, add the next section. Repeat.
5. Keep within the chapter's page budget from `outline.md`.

## File shape

```jsx
import { ContentContainer, ChapterTitle, Section, List, ListItem } from '@components';

export default function ChapterName() {
  return (
    <ContentContainer>
      <ChapterTitle id="chapter-id" title="Chapter Title" subtitle="One line on what the reader learns." />
      <Section id="section-id" title="Section title">
        <p>Plain paragraph text.</p>
      </Section>
    </ContentContainer>
  );
}
```

- Import only from `@components`. Ids must match `outline.jsx`.
- Use plain `<p>`, `<h3>` and `<em>` for text. Do not add inline styles or new colours.
- Break long text into components. Prefer a list, table or callout over a wall of paragraphs.
- Sourced claims must trace to the chapter's research file. Examples you invent for teaching are labelled as examples (for instance "Illustrative reply").
- Do not describe the book's own style, and do not use gradients or decoration. See the writing standard in [SKILL.md](SKILL.md).

Components are listed in [component-reference.md](component-reference.md).
