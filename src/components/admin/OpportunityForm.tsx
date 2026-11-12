"use client";

import { useActionState } from "react";
import { saveOpportunity, type FormState } from "@/app/admin/(protected)/opportunities/actions";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/opportunity-meta";
import type { Opportunity } from "@/lib/types";

type Props = { opportunity?: Opportunity };

const field =
  "w-full rounded-sm border border-border-strong bg-bg-elevated px-3 py-2.5 text-sm text-fg outline-none focus:border-primary";
const label = "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle";

export function OpportunityForm({ opportunity: o }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveOpportunity.bind(null, o?.id ?? null),
    { ok: false, message: "" },
  );

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={label} htmlFor={`title-${o?.id ?? "new"}`}>Title</label>
        <input id={`title-${o?.id ?? "new"}`} name="title" required maxLength={160} defaultValue={o?.title} className={field} />
      </div>
      <div>
        <label className={label} htmlFor={`org-${o?.id ?? "new"}`}>Organization</label>
        <input id={`org-${o?.id ?? "new"}`} name="org" required maxLength={120} defaultValue={o?.org} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor={`url-${o?.id ?? "new"}`}>Link</label>
        <input id={`url-${o?.id ?? "new"}`} name="url" type="url" required defaultValue={o?.url} placeholder="https://" className={field} />
      </div>
      <div>
        <label className={label} htmlFor={`cat-${o?.id ?? "new"}`}>Category</label>
        <select id={`cat-${o?.id ?? "new"}`} name="category" required defaultValue={o?.category ?? "internship"} className={field}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor={`deadline-${o?.id ?? "new"}`}>Deadline (blank = rolling)</label>
        <input id={`deadline-${o?.id ?? "new"}`} name="deadline" type="date" defaultValue={o?.deadline ?? ""} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor={`desc-${o?.id ?? "new"}`}>Description</label>
        <textarea id={`desc-${o?.id ?? "new"}`} name="description" rows={4} maxLength={1500} defaultValue={o?.description} className={field} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <label className="flex items-center gap-2 text-sm text-fg-muted">
          <input type="checkbox" name="published" defaultChecked={o?.published ?? true} />
          Published
        </label>
        <button
          disabled={pending}
          className="rounded-sm border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-bright disabled:opacity-60"
        >
          {pending ? "Saving…" : o ? "Save changes" : "Post opportunity"}
        </button>
        {state.message && (
          <span role="status" className={state.ok ? "text-sm text-fg-muted" : "text-sm text-primary-bright"}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
