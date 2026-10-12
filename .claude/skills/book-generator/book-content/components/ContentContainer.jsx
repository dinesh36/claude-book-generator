import './styles.css';

// Page-shell wrapper every chapter renders inside: base typography and margins.
export default function ContentContainer({ children }) {
  return <div className="content-container">{children}</div>;
}
