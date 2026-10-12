import { useEffect, useMemo, useState } from 'react';

// Scans every book under data/ so one preview app shows any book. This file
// sits five levels below the repo root (.claude/skills/book-generator/
// book-content/src). import.meta.glob needs a literal pattern, so keep the
// path in sync with DATA_GLOB_ROOT if this app moves.
const outlineModules = import.meta.glob('../../../../../data/**/outline.jsx', { eager: true });
const chapterModules = import.meta.glob('../../../../../data/**/chapter-*.jsx', { eager: true });
const DATA_GLOB_ROOT = '../../../../../data';

const bookNameFor = (path) => path.replace(`${DATA_GLOB_ROOT}/`, '').split('/')[0];
const fileLabelFor = (path) => path.replace(`${DATA_GLOB_ROOT}/`, '').split('/').slice(1).join('/');
const pageDomId = (path) => `page-${path.replace(/[^a-zA-Z0-9]/g, '-')}`;

const pageModules = { ...outlineModules, ...chapterModules };

// { [bookName]: { pages: [{ path, label }] } }: outline first, then chapters in numeric order.
function buildBookMap() {
  const map = {};
  const add = (path) => (map[bookNameFor(path)] ??= { pages: [] }).pages.push({ path, label: fileLabelFor(path) });
  Object.keys(outlineModules).forEach(add);
  Object.keys(chapterModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).forEach(add);
  return map;
}

const pageSheetStyle = {
  boxShadow: '0 0 0 1px rgba(17, 24, 39, 0.08)',
  margin: '32px auto',
  maxWidth: 'fit-content',
};

// The selection lives in the query string so a refresh reopens the same view.
const params = new URLSearchParams(window.location.search);

function writeParams(updates) {
  const next = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(updates)) {
    if (value == null || value === '') next.delete(key);
    else next.set(key, value);
  }
  const query = next.toString();
  window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
}

export default function App() {
  const bookMap = useMemo(buildBookMap, []);
  const bookNames = useMemo(() => Object.keys(bookMap).sort(), [bookMap]);
  const [selectedBook, setSelectedBook] = useState(
    bookNames.includes(params.get('book')) ? params.get('book') : bookNames[0] ?? null,
  );
  const [tab, setTab] = useState(params.get('tab') === 'pdf' ? 'pdf' : 'html');
  const book = selectedBook ? bookMap[selectedBook] : null;

  // ?only=<file> prints one section at a time (used by book-pdf/build-book.mjs).
  const only = params.get('only');
  const visiblePages = book ? (only ? book.pages.filter((p) => p.label === only) : book.pages) : [];

  useEffect(() => {
    writeParams({ book: selectedBook, tab: tab === 'pdf' ? 'pdf' : null });
  }, [selectedBook, tab]);

  const jumpTo = (path) => document.getElementById(pageDomId(path))?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div>
      <div className="preview-toolbar" style={toolbarStyle}>
        <strong>Book Preview</strong>
        {bookNames.length > 0 ? (
          <>
            <select value={selectedBook ?? ''} onChange={(e) => setSelectedBook(e.target.value)}>
              {bookNames.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
            {['html', 'pdf'].map((id) => (
              <button key={id} onClick={() => setTab(id)} style={{ ...buttonStyle, background: tab === id ? '#1d4ed8' : '#374151' }}>
                {id.toUpperCase()}
              </button>
            ))}
            {tab === 'html' && book && (
              <select onChange={(e) => jumpTo(e.target.value)}>
                {book.pages.map((page) => <option key={page.path} value={page.path}>{page.label}</option>)}
              </select>
            )}
          </>
        ) : (
          <span>No books found under data/ (looking for outline.jsx and chapter-*.jsx)</span>
        )}
      </div>

      {only === 'outline.jsx' && <style>{'@page { margin: 5mm 0; } @page :first { margin: 0; }'}</style>}
      {only && only !== 'outline.jsx' && <style>{'@page { margin-top: 17mm; margin-bottom: 17mm }'}</style>}

      <div className="preview-page-list" style={{ paddingTop: 48 }}>
        {tab === 'pdf' && selectedBook ? (
          <iframe
            title="book.pdf"
            src={`/data/${selectedBook}/book.pdf`}
            style={{ border: 0, width: '100%', height: 'calc(100vh - 48px)', display: 'block', background: '#fff' }}
          />
        ) : visiblePages.length > 0 ? (
          visiblePages.map((page) => {
            const PageComponent = pageModules[page.path]?.default;
            return PageComponent ? (
              <div key={page.path} id={pageDomId(page.path)} className="preview-page-sheet" style={pageSheetStyle}>
                <PageComponent />
              </div>
            ) : null;
          })
        ) : (
          <p style={{ padding: 24 }}>Nothing to preview yet.</p>
        )}
      </div>
    </div>
  );
}

const toolbarStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10,
  display: 'flex', gap: 12, alignItems: 'center',
  padding: '10px 16px', background: '#111827', color: '#fff',
  fontFamily: 'sans-serif', fontSize: 13,
};
const buttonStyle = { padding: '4px 12px', border: 0, borderRadius: 4, cursor: 'pointer', color: '#fff' };
