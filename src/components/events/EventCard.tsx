import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { formatDateBadge, formatDayTime } from "@/lib/events";
import type { CalendarEvent } from "@/lib/types";

/**
 * Card with inline expansion. Uses native <details> so it works without
 * client JS: click the header to reveal the full text and RSVP link.
 */
type Props = {
  event: CalendarEvent;
  /** Past events drop the RSVP button. */
  past?: boolean;
};

export function EventCard({ event, past = false }: Props) {
  return (
    <details className="group relative rounded-md border border-border bg-bg-card/60 backdrop-blur-sm transition-colors hover:border-border-bright open:border-border-bright open:bg-bg-card-hover/80">
      <summary className="flex cursor-pointer list-none flex-col gap-5 p-6 sm:flex-row [&::-webkit-details-marker]:hidden">
        <div
          className="relative aspect-video w-full shrink-0 overflow-hidden border border-border bg-bg-elevated sm:w-60"
          aria-hidden={event.coverImage === null}
        >
          {event.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.coverImage}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(219,51,20,0.10) 0%, transparent 60%)",
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
                {"//"}&nbsp;&nbsp;Image
              </span>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-fg-subtle">
            <span className="rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 font-bold text-primary-bright">
              {formatDateBadge(event)}
            </span>
            <span>{formatDayTime(event)}</span>
          </div>
          <h3 className="text-xl font-bold leading-[1.25] tracking-[-0.015em]">
            {event.title}
          </h3>
          {event.description && (
            <p className="line-clamp-2 text-sm leading-[1.6] text-fg-muted group-open:hidden">
              {event.description}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between gap-4 font-mono text-xs text-fg-subtle">
            <span>{event.location ?? "Location on CampusGroups"}</span>
            <span
              aria-hidden
              className="text-primary-bright group-open:hidden"
            >
              Details +
            </span>
            <span
              aria-hidden
              className="hidden text-primary-bright group-open:inline"
            >
              Close −
            </span>
          </div>
        </div>
      </summary>

      <div className="space-y-6 border-t border-border p-6">
        {event.description && <MarkdownContent>{event.description}</MarkdownContent>}
        {!past && event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-bright"
          >
            RSVP on CampusGroups <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </details>
  );
}
