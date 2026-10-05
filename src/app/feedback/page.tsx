import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { formatDateBadge, getPastEvents, rsvpId } from "@/lib/events";

export const metadata: Metadata = {
  title: "Event feedback · MHC++",
  description: "Tell us how our past events went so we can make the next ones better.",
};

export const revalidate = 3600;

export default async function FeedbackIndexPage() {
  const past = (await getPastEvents()).filter((e) => rsvpId(e));

  return (
    <Container className="py-[120px]">
      <span className="mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']">
        Feedback
      </span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        How did we do?
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
        Pick an event you attended and tell us what worked and what didn&apos;t.
      </p>

      {past.length > 0 ? (
        <ul className="mt-12 flex flex-col gap-3">
          {past.map((e) => (
            <li key={e.id}>
              <Link
                href={`/feedback/${rsvpId(e)}`}
                className="flex items-center justify-between gap-4 rounded-md border border-border bg-bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-border-bright"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-bold text-primary-bright">
                    {formatDateBadge(e)}
                  </span>
                  <span className="truncate font-semibold">{e.title}</span>
                </span>
                <span aria-hidden className="text-primary-bright">→</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 rounded-md border border-border bg-bg-card/60 p-6 text-fg-muted">
          No past events to review yet.
        </p>
      )}
    </Container>
  );
}
