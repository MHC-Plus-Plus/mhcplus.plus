/**
 * Renders plain paragraphs from a text body (blank line = new paragraph).
 * Not a markdown compiler: no inline formatting yet.
 */
type Props = {
  children: string;
};

export function MarkdownContent({ children }: Props) {
  const paragraphs = children.split(/\n\s*\n/).filter((p) => p.trim());
  return (
    <div className="space-y-4 text-[15px] leading-[1.7] text-fg-muted">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {p.trim()}
        </p>
      ))}
    </div>
  );
}
