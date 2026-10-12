// Internal chapter/section link. href is always an in-document anchor
// ("#section-slug") — the merge-time rewrite of chapter-N.md#anchor links
// doesn't apply here since JSX chapters already share one document.
export default function CrossRefLink({ href, children }) {
  return (
    <a className="cross-ref" href={href}>
      {children}
    </a>
  );
}
