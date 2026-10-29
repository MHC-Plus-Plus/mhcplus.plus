import type { ReactNode } from "react";

/**
 * Renders plain paragraphs from a text body (blank line = new paragraph).
 * Not a markdown compiler: only inline `[text](url)` links are supported.
 */
type Props = {
  children: string;
};

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const [, label, href] = m;
    // Only allow http(s), mailto, and site-relative links.
    if (/^(https?:|mailto:|\/)/i.test(href)) {
      const external = /^https?:/i.test(href);
      nodes.push(
        <a
          key={start}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-primary-bright underline underline-offset-4 hover:text-fg"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(m[0]);
    }
    last = start + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function MarkdownContent({ children }: Props) {
  const paragraphs = children.split(/\n\s*\n/).filter((p) => p.trim());
  return (
    <div className="space-y-4 text-[15px] leading-[1.7] text-fg-muted">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {renderInline(p.trim())}
        </p>
      ))}
    </div>
  );
}
