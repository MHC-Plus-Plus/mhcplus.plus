import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { formatDateBadge, getPastEventByRsvpId } from "@/lib/events";
import { inferEventType } from "@/lib/feedback";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getPastEventByRsvpId((await params).id);
  return {
    title: event ? `Feedback on ${event.title} · MHC++` : "Feedback · MHC++",
    robots: { index: false },
  };
}

export default async function FeedbackPage({ params }: Props) {
  const { id } = await params;
  const event = await getPastEventByRsvpId(id);
  if (!event) notFound();
  const { type, hasSpeaker } = inferEventType(event);

  return (
    <Container className="py-[120px]">
      <div className="mx-auto max-w-[680px]">
        <span className="mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']">
          Feedback · {formatDateBadge(event)}
        </span>
        <h1 className="text-[clamp(30px,4.5vw,48px)] font-bold leading-[1.1] tracking-[-0.025em]">
          Feedback on {event.title}
        </h1>
        <p className="mb-10 mt-5 text-lg leading-[1.6] text-fg-muted">
          Your feedback helps us improve and make future events even better. Let us know what you
          enjoyed and how we can make the next one even more awesome!
        </p>
        {event.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.coverImage}
            alt=""
            className="mb-8 aspect-video w-full rounded-md border border-border object-cover"
          />
        )}
        <FeedbackForm eventId={id} type={type} hasSpeaker={hasSpeaker} />
      </div>
    </Container>
  );
}
