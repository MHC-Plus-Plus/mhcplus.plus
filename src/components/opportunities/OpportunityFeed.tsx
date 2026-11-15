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
    cn("btn btn-sm h-10", active ? "btn-solid" : "btn-outline text-fg-2 hover:text-fg");

  return (
    <>
      {present.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            type="button"
            aria-pressed={filter === "all"}
            className={chip(filter === "all")}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          {present.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              className={chip(filter === c)}
              onClick={() => setFilter(c)}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      )}
      <div className="flex max-w-[920px] flex-col gap-3">
        {shown.map((o) => (
          <OpportunityPost key={o.id} opportunity={o} />
        ))}
      </div>
    </>
  );
}
