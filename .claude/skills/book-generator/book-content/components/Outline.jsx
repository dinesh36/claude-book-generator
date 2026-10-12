import CrossRefLink from './CrossRefLink.jsx';

// Table of contents page. `chapters`: [{ id, title, sections: [{ id, title }] }].
export default function Outline({ bookTitle, chapters, linkEntries = true }) {
  return (
    <div className="outline">
      <div className="outline-header">
        {bookTitle && <div className="outline-book-title">{bookTitle}</div>}
        <h1>Table of Contents</h1>
      </div>
      <div className="outline-list">
        {chapters.map((chapter, index) => (
          <div className="outline-chapter" key={chapter.id}>
            <div className="outline-chapter-row">
              <span className="outline-chapter-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>
                {linkEntries ? <CrossRefLink href={`#${chapter.id}`}>{chapter.title}</CrossRefLink> : chapter.title}
              </h3>
            </div>
            {chapter.sections.length > 0 && (
              <ul>
                {chapter.sections.map((section) => (
                  <li key={section.id}>
                    {linkEntries ? <CrossRefLink href={`#${section.id}`}>{section.title}</CrossRefLink> : section.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
