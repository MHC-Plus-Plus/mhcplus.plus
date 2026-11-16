import Link from "next/link";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { EventDate, EventTags } from "@/components/events/EventDate";
import { rsvpId } from "@/lib/events";
import type { CalendarEvent } from "@/lib/types";

/**
 * Card with inline expansion. Uses native <details> so it works without
 * client JS: click the header to reveal the cover, full text and RSVP link.
 */
type Props = {
  event: CalendarEvent;
  /** Past events drop the RSVP button. */
  past?: boolean;
};

export function EventCard({ event, past = false }: Props) {
  return (
    <details className="card group overflow-hidden transition-colors duration-150 hover:border-line-strong open:border-line-strong">
      <summary className="flex cursor-pointer list-none flex-col rounded-[20px] md:flex-row [&::-webkit-details-marker]:hidden">
        <EventDate event={event} />

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-6 p-6">
          <div className="flex min-w-0 flex-1 basis-[320px] flex-col gap-3">
            <EventTags event={event} />
            <h3 className="h-card">{event.title}</h3>
            {event.description && (
              <p className="line-clamp-2 max-w-[60ch] text-[15px] leading-[1.6] text-fg-2 group-open:hidden">
                {event.description}
              </p>
            )}
          </div>
          <span aria-hidden className="btn btn-outline group-hover:border-fg">
            <span className="group-open:hidden">Details +</span>
            <span className="hidden group-open:inline">Close −</span>
          </span>
        </div>
      </summary>

      <div className="space-y-6 border-t border-line p-6 md:pl-[calc(168px+24px)]">
        {event.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.coverImage}
            alt={event.title}
            className="aspect-video w-full max-w-[560px] rounded-[14px] border border-line object-cover"
          />
        )}
        {event.description && <MarkdownContent>{event.description}</MarkdownContent>}
        {!past && event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            RSVP on CampusGroups →
          </a>
        )}
        {past && rsvpId(event) && (
          <Link href={`/feedback/${rsvpId(event)}`} className="btn btn-outline">
            Give feedback →
          </Link>
        )}
      </div>
    </details>
  );
}
