import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { EventDate, EventTags } from "@/components/events/EventDate";
import { getUpcomingEvents } from "@/lib/events";

export async function FeaturedEvent() {
  const events = await getUpcomingEvents(3);

  return (
    <section id="events" className="border-t border-line">
      <Container className="py-section">
        <div className="intro-grid">
          <p className="label pt-2">What&apos;s next</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section">Upcoming events.</h2>
            <Link href="/events" className="btn btn-outline">
              View all events →
            </Link>
          </div>
        </div>

        <div className="mt-[clamp(40px,5vw,64px)] flex flex-col gap-3">
          {events.length === 0 && (
            <p className="card p-6 text-fg-2">No upcoming events right now. Check back soon.</p>
          )}

          {events.map((e) => (
            <article key={e.id} className="card flex flex-col overflow-hidden md:flex-row">
              <EventDate event={e} />
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-6 p-6">
                <div className="flex min-w-0 flex-1 basis-[320px] flex-col gap-3">
                  <EventTags event={e} />
                  <h3 className="h-card">{e.title}</h3>
                  {e.description && (
                    <p className="line-clamp-3 max-w-[60ch] text-[15px] leading-[1.6] text-fg-2">
                      {e.description}
                    </p>
                  )}
                </div>
                <a
                  href={e.url || "/events"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  RSVP on CampusGroups →
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
