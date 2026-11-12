"use client";

import { useActionState, useMemo, useState } from "react";
import { importOpportunities, type FormState } from "@/app/admin/(protected)/opportunities/actions";
import { CSV_EXAMPLE, MAX_IMPORT_ROWS, parseOpportunityCsv } from "@/lib/opportunity-csv";

export function OpportunityCsvImport() {
  const [text, setText] = useState("");
  const [state, action, pending] = useActionState<FormState, FormData>(
    async (prev, form) => {
      const res = await importOpportunities(prev, form);
      if (res.ok) setText("");
      return res;
    },
    { ok: false, message: "" },
  );
  const parsed = useMemo(() => parseOpportunityCsv(text), [text]);
  const canImport = text.trim() !== "" && parsed.errors.length === 0 && parsed.rows.length > 0;

  return (
    <details className="rounded-md border border-border bg-bg-card/60">
      <summary className="cursor-pointer p-4 font-semibold">Import from CSV</summary>
      <form action={action} className="space-y-4 border-t border-border p-4">
        <p className="text-sm text-fg-muted">
          Paste CSV, or copy cells straight from a spreadsheet. The first row must be a header with{" "}
          <code className="font-mono text-xs">title, org, url, category</code>; optional columns are{" "}
          <code className="font-mono text-xs">deadline</code> (2026-12-01, or blank for rolling),{" "}
          <code className="font-mono text-xs">description</code> and{" "}
          <code className="font-mono text-xs">published</code> (yes/no). Categories: Internship,
          Mentorship, CUNY program, Scholarship, Other. Up to {MAX_IMPORT_ROWS} rows; if any row has
          a problem, nothing is imported.
        </p>
        <textarea
          name="csv"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder={CSV_EXAMPLE}
          aria-label="CSV to import"
          className="w-full rounded-sm border border-border-strong bg-bg-elevated px-3 py-2.5 font-mono text-xs text-fg outline-none focus:border-primary"
        />
        {text.trim() !== "" && (
          <div className="space-y-2 text-sm" aria-live="polite">
            <p className={parsed.errors.length ? "text-primary-bright" : "text-fg-muted"}>
              {parsed.errors.length
                ? `${parsed.errors.length} problem${parsed.errors.length === 1 ? "" : "s"} to fix`
                : `${parsed.rows.length} ${parsed.rows.length === 1 ? "row" : "rows"} ready to import`}
            </p>
            {parsed.errors.length > 0 && (
              <ul className="list-disc space-y-1 pl-5 text-primary-bright">
                {parsed.errors.slice(0, 10).map((e) => (
                  <li key={e}>{e}</li>
                ))}
                {parsed.errors.length > 10 && <li>…and {parsed.errors.length - 10} more</li>}
              </ul>
            )}
            {parsed.errors.length === 0 && parsed.rows.length > 0 && (
              <ul className="space-y-1 text-fg-muted">
                {parsed.rows.slice(0, 5).map((r, i) => (
                  <li key={i}>
                    {r.title} · {r.org}
                  </li>
                ))}
                {parsed.rows.length > 5 && <li>…and {parsed.rows.length - 5} more</li>}
              </ul>
            )}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <button
            disabled={!canImport || pending}
            className="rounded-sm border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-bright disabled:opacity-50"
          >
            {pending ? "Importing…" : "Import"}
          </button>
          {state.message && (
            <span role="status" className={state.ok ? "text-sm text-fg-muted" : "text-sm text-primary-bright"}>
              {state.message}
            </span>
          )}
        </div>
      </form>
    </details>
  );
}
