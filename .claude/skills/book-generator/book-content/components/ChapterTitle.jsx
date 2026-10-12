// A chapter's opening banner: title plus a short subtitle. `id` is required
// (the outline links to it). Always starts a new page.
export default function ChapterTitle({ id, title, subtitle }) {
  return (
    <div className="chapter-title-banner">
      <h1 id={id} className="chapter-title">{title}</h1>
      {subtitle && <p className="chapter-subtitle">{subtitle}</p>}
    </div>
  );
}
