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
    title: event ? `Feedback on ${event.title} - MHC++` : "Feedback - MHC++",
    robots: { index: false },
  };
}

export default async function FeedbackPage({ params }: Props) {
  const { id } = await params;
  const event = await getPastEventByRsvpId(id);
  if (!event) notFound();
  const { type, hasSpeaker } = inferEventType(event);

  return (
    <Container className="py-section">
      <div className="intro-grid">
        <p className="label pt-3">Feedback - {formatDateBadge(event)}</p>
        <div className="min-w-0 max-w-[760px]">
          <h1 className="h-section break-words">Feedback on {event.title}</h1>
          <p className="body mb-10 mt-6">
            Your feedback helps us improve and make future events even better. Let us know what you
            enjoyed and how we can make the next one even more awesome!
          </p>
          {event.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.coverImage}
              alt=""
              className="mb-8 aspect-video w-full rounded-[20px] border border-line object-cover"
            />
          )}
          <FeedbackForm eventId={id} type={type} hasSpeaker={hasSpeaker} />
        </div>
      </div>
    </Container>
  );
}
