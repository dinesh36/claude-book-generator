import { CircleAlert, Star, Info } from 'lucide-react';
import './styles.css';

// Generic callout box — colored left border + icon + tinted background,
// varying only by `variant`. Icons come from lucide-react (see styles.css
// for the color tokens per variant).
const VARIANTS = {
  important: { defaultLabel: 'Important', Icon: CircleAlert },
  tip: { defaultLabel: 'Tip', Icon: Star },
  note: { defaultLabel: 'Note', Icon: Info },
};

// `layout="inline"` (default): icon on the left, bold label + text on one flow.
// `layout="stacked"`: centered icon, then centered title, then the content below.
// `borderSide="left"` (default): gradient bar on the left edge.
// `borderSide="bottom"`: gradient bar along the bottom edge instead.
export default function Alert({
  variant = 'note',
  label,
  layout = 'inline',
  borderSide = 'left',
  children,
}) {
  const config = VARIANTS[variant] ?? VARIANTS.note;
  const Icon = config.Icon;
  const title = label ?? config.defaultLabel;
  const border = borderSide === 'bottom' ? ' alert-border-bottom' : '';
  if (layout === 'stacked') {
    return (
      <div className={`alert alert-${variant} alert-stacked${border}`}>
        <Icon className="alert-icon" size={28} aria-hidden="true" />
        <strong className="alert-label">{title}</strong>
        <div className="alert-body">{children}</div>
      </div>
    );
  }
  return (
    <div className={`alert alert-${variant}${border}`}>
      <Icon className="alert-icon" size={18} aria-hidden="true" />
      <div className="alert-body">
        <strong className="alert-label">{title}:</strong>{' '}
        {children}
      </div>
    </div>
  );
}
