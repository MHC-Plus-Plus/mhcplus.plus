import { CATEGORY_LABELS, formatDeadlineBadge, formatPostedAgo } from "@/lib/opportunity-meta";
import type { Opportunity } from "@/lib/types";

type Props = { opportunity: Opportunity };

export function OpportunityPost({ opportunity: o }: Props) {
  return (
    <article className="card p-6 transition-colors duration-150 hover:border-line-strong md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="tag">{CATEGORY_LABELS[o.category]}</span>
        <span className="meta">Posted {formatPostedAgo(o.postedAt)}</span>
        <span className="meta ml-auto">
          {o.deadline ? `Due ${formatDeadlineBadge(o.deadline)}` : "Rolling"}
        </span>
      </div>
      <p className="mt-6 text-[15px] font-medium text-fg-2">{o.org}</p>
      <h3 className="h-card mt-2">{o.title}</h3>
      {o.description && (
        <p className="mt-4 max-w-[60ch] whitespace-pre-line text-[15px] leading-[1.6] text-fg-2">
          {o.description}
        </p>
      )}
      <a
        href={o.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-solid mt-6"
      >
        View opportunity →
      </a>
    </article>
  );
}
