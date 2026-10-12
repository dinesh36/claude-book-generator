// One card in a `CardGrid` — a tinted title header (teal, same token as
// Alert's tip variant) over a plain body. Body is free-form children, not
// a fixed prop, so it can hold more than a single paragraph if needed.
// `title` is optional — a card with no title skips the header bar entirely
// (see .card-body:first-child in styles.css) rather than rendering an empty
// one, for content that doesn't have a natural label (e.g. one plain fact
// per card in a grid).
export default function Card({ title, children }) {
  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <h3>{title}</h3>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
