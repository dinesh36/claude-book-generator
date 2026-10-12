// One entry in a `List`. Children can be more than a single line of prose —
// a paragraph followed by a CodeSection, for instance — the gradient bullet
// just marks where the item starts.
export default function ListItem({ children }) {
  return <li className="list-item">{children}</li>;
}
