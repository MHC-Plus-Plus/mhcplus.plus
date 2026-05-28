import Link from "next/link";
import { Container } from "@/components/shared/Container";

// Placeholder events. Replaced in step 5/6 once the MDX loader lands.
type UpcomingEvent = {
  dateBadge: string;
  dayTime: string;
  title: string;
  description: string;
  location: string;
  going: number;
};

const placeholderEvents: UpcomingEvent[] = [
  {
    dateBadge: "JUN 12",
    dayTime: "Thu · 6:00 PM",
    title: "Summer Internship Stories",
    description:
      "Members share what they're working on this summer, from quant trading to ML research. Q&A and networking after.",
    location: "Macaulay Honors",
    going: 42,
  },
  {
    dateBadge: "JUN 25",
    dayTime: "Wed · 5:30 PM",
    title: "Resume Review Night",
    description:
      "Bring your resume, leave with feedback from members who've landed offers at top firms. Open to all CUNY CS students.",
    location: "Macaulay Honors",
    going: 28,
  },
  {
    dateBadge: "JUL 10",
    dayTime: "Thu · 6:00 PM",
    title: "Cross-CUNY Mixer",
    description:
      "Meet CS students from every CUNY campus. Pizza, conversation, and maybe a project collaborator or two.",
    location: "Macaulay Honors",
    going: 56,
  },
];

export function FeaturedEvent() {
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

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {placeholderEvents.map((e) => (
            <article
              key={e.title}
              className="group relative flex cursor-pointer flex-col gap-[18px] overflow-hidden rounded-md border border-border bg-bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-border-bright hover:bg-bg-card-hover/80"
            >
              {/* top accent line */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--primary), transparent)",
                }}
              />
              <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-fg-subtle">
                <span className="rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.1em] text-primary-bright">
                  {e.dateBadge}
                </span>
                <span>{e.dayTime}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold leading-[1.25] tracking-[-0.015em]">
                  {e.title}
                </h3>
                <p className="mt-2.5 flex-grow text-sm leading-[1.6] text-fg-muted">
                  {e.description}
                </p>
              </div>
              <div className="flex items-center gap-5 border-t border-border pt-[18px] font-mono text-xs text-fg-subtle">
                <span className="flex items-center gap-1.5 before:h-[3px] before:w-[3px] before:bg-fg-subtle before:content-['']">
                  {e.location}
                </span>
                <span className="flex items-center gap-1.5 before:h-[3px] before:w-[3px] before:bg-fg-subtle before:content-['']">
                  {e.going} going
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
