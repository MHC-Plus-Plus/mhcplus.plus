import { OpportunityCsvImport } from "@/components/admin/OpportunityCsvImport";
import { OpportunityForm } from "@/components/admin/OpportunityForm";
import { requireAdmin } from "@/lib/admin";
import {
  CATEGORY_LABELS,
  OPPORTUNITY_COLUMNS,
  formatDeadlineBadge,
  isOpen,
  toOpportunity,
} from "@/lib/opportunity-meta";
import { deleteOpportunity, setPublished } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("opportunities")
    .select(OPPORTUNITY_COLUMNS)
    .order("posted_at", { ascending: false });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = (data ?? []).map((r: any) => toOpportunity(r));

  return (
    <div className="space-y-12">
      <section>
        <h1 className="mb-6 text-2xl font-bold tracking-[-0.02em]">New opportunity</h1>
        <div className="rounded-md border border-border bg-bg-card/60 p-6">
          <OpportunityForm />
        </div>
        <div className="mt-3">
          <OpportunityCsvImport />
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-[-0.02em]">All posts ({posts.length})</h2>
        <div className="flex flex-col gap-3">
          {posts.map((o) => (
            <details key={o.id} className="rounded-md border border-border bg-bg-card/60">
              <summary className="flex cursor-pointer flex-wrap items-center gap-3 p-4">
                <span className="font-semibold">{o.title}</span>
                <span className="text-sm text-fg-muted">{o.org}</span>
                <span className="font-mono text-[11px] uppercase text-fg-subtle">
                  {CATEGORY_LABELS[o.category]}
                  {o.deadline ? ` · due ${formatDeadlineBadge(o.deadline)}` : " · rolling"}
                </span>
                {!o.published && <span className="font-mono text-[11px] uppercase text-primary-bright">Hidden</span>}
                {o.published && !isOpen(o) && (
                  <span className="font-mono text-[11px] uppercase text-primary-bright">Expired</span>
                )}
              </summary>
              <div className="space-y-4 border-t border-border p-4">
                <OpportunityForm opportunity={o} />
                <div className="flex gap-4">
                  <form action={setPublished.bind(null, o.id, !o.published)}>
                    <button className="text-sm text-fg-muted hover:text-fg">
                      {o.published ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <form action={deleteOpportunity.bind(null, o.id)}>
                    <button className="text-sm text-primary-bright hover:underline">Delete</button>
                  </form>
                </div>
              </div>
            </details>
          ))}
          {posts.length === 0 && <p className="text-fg-muted">No posts yet.</p>}
        </div>
      </section>
    </div>
  );
}
