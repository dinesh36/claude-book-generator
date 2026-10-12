import SectionHeading from './SectionHeading.jsx';

// A chapter subsection — the markdown ## (level 2, default) or ### (level 3)
// heading plus its body content. `id` must match the slug used by any
// CrossRefLink/Outline entry pointing at this section. Heading rendering is
// delegated to SectionHeading (kicker label + gradient rule) so a new
// section is easy to spot rather than starting directly under the
// preceding content with no visual break.
export default function Section({ id, title, level = 2, children }) {
  return (
    <section className={level === 3 ? 'sub-section' : 'section'}>
      <SectionHeading id={id} title={title} level={level} />
      {children}
    </section>
  );
}
