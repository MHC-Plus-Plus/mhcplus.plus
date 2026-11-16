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
      <div key={e.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="aspect-video w-full shrink-0 overflow-hidden rounded-[12px] border border-line bg-bg sm:w-48">
          {e.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={e.coverImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="meta flex h-full items-center justify-center">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="meta">
            {formatDateBadge(e)} -{" "}
            {hasCustom ? "Custom cover" : e.coverImage ? "From CampusGroups" : "No cover"} -{" "}
            {e.eventType ?? "no type"}{id && overrides.has(id) ? " (override)" : ""}
          </div>
          <div className="mt-2 font-heading text-lg font-semibold tracking-[-0.03em]">{e.title}</div>
        </div>
        {id ? (
          <>
            <EventTypeSelect eventId={id} override={overrides.get(id) ?? null} />
            <CoverUploader eventId={id} hasCustom={hasCustom} />
          </>
        ) : (
          <span className="text-sm text-fg-2">No CampusGroups id</span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <section>
        <h1 className="h-section mb-4">Events</h1>
        <p className="body mb-8 text-[15px]">
          Uploaded covers always win over the CampusGroups image (JPG, PNG, or WebP, aim for 16:9; images are shrunk to 1280px wide automatically).
          A type override replaces the CampusGroups type and changes how the feedback form is worded.
        </p>
        <h2 className="label mb-4">Upcoming</h2>
        <div className="flex flex-col gap-3">{upcoming.map(row)}</div>
        {upcoming.length === 0 && <p className="text-fg-2">No upcoming events.</p>}
      </section>
      <section>
        <h2 className="label mb-4">Recent past</h2>
        <div className="flex flex-col gap-3">{past.slice(0, RECENT_PAST).map(row)}</div>
      </section>
    </div>
  );
}
