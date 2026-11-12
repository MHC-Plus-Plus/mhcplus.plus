import { CATEGORY_LABELS, formatDeadlineBadge, formatPostedAgo } from "@/lib/opportunity-meta";
import type { Opportunity } from "@/lib/types";

type Props = { opportunity: Opportunity };

export function OpportunityPost({ opportunity: o }: Props) {
  return (
    <article className="rounded-md border border-border bg-bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-border-bright">
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-fg-subtle">
        <span className="rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 font-bold text-primary-bright">
          {CATEGORY_LABELS[o.category]}
        </span>
        <span>Posted {formatPostedAgo(o.postedAt)}</span>
        <span className="ml-auto text-fg-muted">
          {o.deadline ? `Due ${formatDeadlineBadge(o.deadline)}` : "Rolling"}
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-fg-muted">{o.org}</p>
      <h3 className="mt-1 text-xl font-bold leading-[1.25] tracking-[-0.015em]">{o.title}</h3>
      {o.description && (
        <p className="mt-3 whitespace-pre-line text-sm leading-[1.6] text-fg-muted">
          {o.description}
        </p>
      )}
      <a
        href={o.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-bright hover:underline"
      >
        View opportunity <span aria-hidden>→</span>
      </a>
    </article>
  );
}
