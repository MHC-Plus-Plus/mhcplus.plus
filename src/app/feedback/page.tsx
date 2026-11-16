import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { formatDateBadge, getPastEvents, rsvpId } from "@/lib/events";

export const metadata: Metadata = {
  title: "Event feedback - MHC++",
  description: "Tell us how our past events went so we can make the next ones better.",
};

export const revalidate = 3600;

export default async function FeedbackIndexPage() {
  const past = (await getPastEvents()).filter((e) => rsvpId(e));

  return (
    <>
      <PageHeader
        label="Feedback"
        title="How did we do?"
        lead="Pick an event you attended"
        rest="and tell us what worked and what didn't."
      />

      <section className="border-t border-line">
        <Container className="py-section">
          {past.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {past.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/feedback/${rsvpId(e)}`}
                    className="card group flex items-center justify-between gap-4 p-5 transition-colors duration-150 hover:border-line-strong"
                  >
                    <span className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
                      <span className="tag">{formatDateBadge(e)}</span>
                      <span className="min-w-0 font-heading text-xl font-semibold tracking-[-0.03em]">
                        {e.title}
                      </span>
                    </span>
                    <span aria-hidden className="btn btn-outline size-11 shrink-0 p-0 group-hover:border-fg">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="card p-6 text-fg-2">No past events to review yet.</p>
          )}
        </Container>
      </section>
    </>
  );
}
