import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { EventCard } from "@/components/events/EventCard";
import { getPastEvents, getUpcomingEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events · MHC++",
  description:
    "Upcoming and past MHC++ events: workshops, talks, and meetups for CUNY computer science students.",
};

// Re-fetch the events feed at most once an hour.
export const revalidate = 3600;

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <>
      <PageHeader
        label="Events"
        title="Come build with us."
        lead="Workshops, talks, and meetups for CS students across CUNY."
        rest="RSVPs happen on CampusGroups."
      />

      <section aria-labelledby="upcoming" className="border-t border-line">
        <Container className="py-section">
          <h2 id="upcoming" className="h-section">
            Upcoming
          </h2>
          <div className="mt-[clamp(32px,4vw,48px)] flex flex-col gap-3">
            {upcoming.length > 0 ? (
              upcoming.map((e) => <EventCard key={e.id} event={e} />)
            ) : (
              <p className="card p-6 text-fg-2">No upcoming events right now. Check back soon.</p>
            )}
          </div>
        </Container>
      </section>

      {past.length > 0 && (
        <section aria-labelledby="past" className="border-t border-line">
          <Container className="py-section">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="past" className="h-section">
                Past events
              </h2>
              <Link href="/highlights" className="btn btn-outline">
                See highlights →
              </Link>
            </div>
            <div className="mt-[clamp(32px,4vw,48px)] flex flex-col gap-3">
              {past.map((e) => (
                <EventCard key={e.id} event={e} past />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
