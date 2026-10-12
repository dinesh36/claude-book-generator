// A more identifiable section start — extra top spacing to break from the
// preceding content, plus a short brand-gradient rule under the heading
// (same family as ChapterTitle's own title rule, just smaller/lighter so
// it doesn't compete with the chapter banner). Used internally by
// `Section` — not meant to be reached for directly in chapter content, but
// exported since it's a reusable visual unit. `id` goes on the heading
// itself, same anchor convention as before (matches what
// CrossRefLink/Outline point at).
export default function SectionHeading({ id, title, level = 2 }) {
  const Heading = level === 3 ? 'h3' : 'h2';
  return (
    <div className={`section-heading section-heading-level-${level}`}>
      <Heading id={id} className="section-heading-title">{title}</Heading>
      <div className="section-heading-rule" aria-hidden="true" />
    </div>
  );
}
