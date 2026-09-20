import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { EventCard } from "@/components/events/EventCard";
import { getPastEvents, getUpcomingEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events · MHC++",
  description:
    "Upcoming and past MHC++ events: workshops, talks, and meetups for CUNY computer science students.",
};

// Re-fetch the events feed at most once an hour.
export const revalidate = 3600;

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>Events</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        Come build with us.
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
        Workshops, talks, and meetups for CS students across CUNY. RSVPs happen on
        CampusGroups.
      </p>

      <section className="mt-16" aria-labelledby="upcoming">
        <h2 id="upcoming" className="mb-6 text-2xl font-bold tracking-[-0.02em]">
          Upcoming
        </h2>
        {upcoming.length > 0 ? (
          <div className="flex flex-col gap-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <p className="rounded-md border border-border bg-bg-card/60 p-6 text-fg-muted">
            No upcoming events right now. Check back soon.
          </p>
        )}
      </section>

      {past.length > 0 && (
        <section className="mt-16" aria-labelledby="past">
          <h2 id="past" className="mb-6 text-2xl font-bold tracking-[-0.02em]">
            Past events
          </h2>
          <div className="flex flex-col gap-3">
            {past.map((e) => (
              <EventCard key={e.id} event={e} past />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
