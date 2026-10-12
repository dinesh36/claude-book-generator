import { Highlight, themes } from 'prism-react-renderer';

// A fenced code block. Renders in a real <pre> so whitespace/indentation is
// preserved exactly as written — never pass code through this as prose.
//
// Syntax highlighting theme is locked to `nightOwlLight`, chosen by
// comparing every bundled light theme in book-content's "Code theme
// gallery" view (see ThemeGallery.jsx) against real chapter code. Not a
// prop — deliberately not configurable per call site, so every code block
// in every book looks the same. To change it later, pick a new theme in
// that gallery first, then update the single reference here.
//
// Author code samples as a template literal child:
//   <CodeSection lang="javascript">{`const x = 1;`}</CodeSection>
// Escape any literal backtick or `${` inside the sample itself (\` and \${).
export default function CodeSection({ lang = 'javascript', children }) {
  const code = String(children).replace(/^\n/, '').replace(/\n\s*$/, '');
  return (
    <Highlight theme={themes.nightOwlLight} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`code-block ${className}`} style={style}>
          {tokens.map((line, lineIndex) => {
            const lineProps = getLineProps({ line });
            return (
              <div key={lineIndex} {...lineProps}>
                {line.map((token, tokenIndex) => {
                  const tokenProps = getTokenProps({ token });
                  return <span key={tokenIndex} {...tokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
