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
        <h1 className="h-section mb-8">New opportunity</h1>
        <div className="card p-6">
          <OpportunityForm />
        </div>
        <div className="mt-3">
          <OpportunityCsvImport />
        </div>
      </section>

      <section>
        <h2 className="h-section mb-8">All posts ({posts.length})</h2>
        <div className="flex flex-col gap-3">
          {posts.map((o) => (
            <details key={o.id} className="card overflow-hidden">
              <summary className="flex cursor-pointer flex-wrap items-center gap-3 rounded-[20px] p-4">
                <span className="font-heading text-lg font-semibold tracking-[-0.03em]">{o.title}</span>
                <span className="text-sm text-fg-2">{o.org}</span>
                <span className="meta">
                  {CATEGORY_LABELS[o.category]}
                  {o.deadline ? ` · due ${formatDeadlineBadge(o.deadline)}` : " · rolling"}
                </span>
                {!o.published && <span className="tag">Hidden</span>}
                {o.published && !isOpen(o) && <span className="tag">Expired</span>}
              </summary>
              <div className="space-y-4 border-t border-line p-4">
                <OpportunityForm opportunity={o} />
                <div className="flex flex-wrap gap-3">
                  <form action={setPublished.bind(null, o.id, !o.published)}>
                    <button className="btn btn-outline btn-sm">
                      {o.published ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <form action={deleteOpportunity.bind(null, o.id)}>
                    <button className="btn btn-outline btn-sm">Delete</button>
                  </form>
                </div>
              </div>
            </details>
          ))}
          {posts.length === 0 && <p className="text-fg-2">No posts yet.</p>}
        </div>
      </section>
    </div>
  );
}
