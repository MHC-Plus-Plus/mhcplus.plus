"use client";

import { useState } from "react";
import { OpportunityPost } from "@/components/opportunities/OpportunityPost";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/opportunity-meta";
import type { Opportunity, OpportunityCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = { opportunities: Opportunity[] };

export function OpportunityFeed({ opportunities }: Props) {
  const [filter, setFilter] = useState<OpportunityCategory | "all">("all");
  const present = CATEGORIES.filter((c) => opportunities.some((o) => o.category === c));
  const shown = filter === "all" ? opportunities : opportunities.filter((o) => o.category === filter);

  const chip = (active: boolean) =>
    cn(
      "rounded-sm border px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors",
      active
        ? "border-primary bg-primary/10 text-primary-bright"
        : "border-border-strong text-fg-muted hover:border-border-bright hover:text-fg",
    );

  return (
    <>
      {present.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button className={chip(filter === "all")} onClick={() => setFilter("all")}>
            All
          </button>
          {present.map((c) => (
            <button key={c} className={chip(filter === c)} onClick={() => setFilter(c)}>
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      )}
      <div className="flex max-w-[760px] flex-col gap-3">
        {shown.map((o) => (
          <OpportunityPost key={o.id} opportunity={o} />
        ))}
      </div>
    </>
  );
}
