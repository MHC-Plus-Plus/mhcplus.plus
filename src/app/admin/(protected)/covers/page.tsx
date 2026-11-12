import { CoverUploader } from "@/components/admin/CoverUploader";
import { EventTypeSelect } from "@/components/admin/EventTypeSelect";
import { requireAdmin } from "@/lib/admin";
import { formatDateBadge, getPastEvents, getUpcomingEvents, rsvpId } from "@/lib/events";
import type { CalendarEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

const RECENT_PAST = 10;

export default async function AdminCoversPage() {
  const { supabase } = await requireAdmin();
  const [upcoming, past, { data }, { data: typeRows }] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
    supabase.from("event_covers").select("event_id"),
    supabase.from("event_types").select("event_id, event_type"),
  ]);
  const overrides = new Map((typeRows ?? []).map((r) => [r.event_id as string, r.event_type as string]));
  const custom = new Set((data ?? []).map((r) => r.event_id as string));

  const row = (e: CalendarEvent) => {
    const id = rsvpId(e);
    const hasCustom = id !== null && custom.has(id);
    return (
      <div key={e.id} className="flex flex-col gap-4 rounded-md border border-border bg-bg-card/60 p-4 sm:flex-row sm:items-center">
        <div className="aspect-video w-full shrink-0 overflow-hidden border border-border bg-bg-elevated sm:w-48">
          {e.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={e.coverImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-[11px] uppercase text-fg-dim">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle">
            {formatDateBadge(e)} ·{" "}
            {hasCustom ? "Custom cover" : e.coverImage ? "From CampusGroups" : "No cover"} ·{" "}
            {e.eventType ?? "no type"}{id && overrides.has(id) ? " (override)" : ""}
          </div>
          <div className="mt-1 font-semibold">{e.title}</div>
        </div>
        {id ? (
          <>
            <EventTypeSelect eventId={id} override={overrides.get(id) ?? null} />
            <CoverUploader eventId={id} hasCustom={hasCustom} />
          </>
        ) : (
          <span className="text-sm text-fg-subtle">No CampusGroups id</span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <section>
        <h1 className="mb-2 text-2xl font-bold tracking-[-0.02em]">Events</h1>
        <p className="mb-6 text-sm text-fg-muted">
          Uploaded covers always win over the CampusGroups image (JPG, PNG, or WebP, aim for 16:9; images are shrunk to 1280px wide automatically).
          A type override replaces the CampusGroups type and changes how the feedback form is worded.
        </p>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-fg-subtle">Upcoming</h2>
        <div className="flex flex-col gap-3">{upcoming.map(row)}</div>
        {upcoming.length === 0 && <p className="text-fg-muted">No upcoming events.</p>}
      </section>
      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-fg-subtle">Recent past</h2>
        <div className="flex flex-col gap-3">{past.slice(0, RECENT_PAST).map(row)}</div>
      </section>
    </div>
  );
}
