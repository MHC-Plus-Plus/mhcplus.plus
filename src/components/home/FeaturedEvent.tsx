import Link from "next/link";
import { Container } from "@/components/shared/Container";
import {
  formatDateBadge,
  formatDayTime,
  getUpcomingEvents,
} from "@/lib/events";

export async function FeaturedEvent() {
  const events = await getUpcomingEvents(3);

  return (
    <section id="events" className="border-t border-border py-[120px]">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[680px]">
            <span className="mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']">
              What&apos;s Next
            </span>
            <h2 className="text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.1] tracking-[-0.025em]">
              Upcoming events.
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-bright"
          >
            View all events <span aria-hidden>→</span>
          </Link>
        </div>

        {events.length === 0 && (
          <p className="rounded-md border border-border bg-bg-card/60 p-6 text-fg-muted">
            No upcoming events right now. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {events.map((e) => (
            <a
              key={e.id}
              href={e.url || "/events"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-[18px] overflow-hidden rounded-md border border-border bg-bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-border-bright hover:bg-bg-card-hover/80"
            >
              {/* top accent line, sits above the cover image */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--primary), transparent)",
                }}
              />

              {/* Cover image: full-bleed against the card edges, 16:9.
                  Scraped from the CampusGroups event page; placeholder when it has none. */}
              <div
                className="relative -mx-6 -mt-6 aspect-video overflow-hidden border-b border-border bg-bg-elevated"
                aria-hidden={e.coverImage === null}
              >
                {e.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={e.coverImage}
                    alt={e.title}
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

              <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-fg-subtle">
                <span className="rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.1em] text-primary-bright">
                  {formatDateBadge(e)}
                </span>
                <span>{formatDayTime(e)}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold leading-[1.25] tracking-[-0.015em]">
                  {e.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 flex-grow text-sm leading-[1.6] text-fg-muted">
                  {e.description}
                </p>
              </div>
              <div className="flex items-center gap-5 border-t border-border pt-[18px] font-mono text-xs text-fg-subtle">
                {e.location && (
                  <span className="flex items-center gap-1.5 before:h-[3px] before:w-[3px] before:bg-fg-subtle before:content-['']">
                    {e.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-primary-bright before:h-[3px] before:w-[3px] before:bg-primary-bright before:content-['']">
                  RSVP on CampusGroups
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
