"use server";

import { getPastEventByRsvpId } from "@/lib/events";
import { inferEventType, parseFeedback, type FeedbackPayload } from "@/lib/feedback";

export type FeedbackState = { status: "idle" | "success" } | { status: "error"; message: string };

export async function submitFeedback(
  eventId: string,
  _prev: FeedbackState,
  form: FormData,
): Promise<FeedbackState> {
  // Honeypot: bots fill every field. Pretend it worked.
  if (form.get("website")) return { status: "success" };

  // Re-derive the event server-side rather than trusting hidden fields.
  const event = await getPastEventByRsvpId(eventId);
  if (!event) return { status: "error", message: "This event isn't open for feedback." };

  const { type, hasSpeaker } = inferEventType(event);
  const parsed = parseFeedback(form, hasSpeaker);
  if ("error" in parsed) return { status: "error", message: parsed.error };

  const url = process.env.FEEDBACK_SCRIPT_URL;
  const secret = process.env.FEEDBACK_SECRET;
  if (!url || !secret) {
    console.error("FEEDBACK_SCRIPT_URL / FEEDBACK_SECRET are not set");
    return { status: "error", message: "Feedback is temporarily unavailable. Please try again later." };
  }

  const payload: FeedbackPayload = {
    eventId,
    eventTitle: event.title,
    eventDate: event.start.slice(0, 10),
    eventType: type,
    ...parsed.values,
  };

  try {
    // Apps Script web apps answer with a redirect to the result, so follow it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...payload }),
      redirect: "follow",
      cache: "no-store",
    });
    const body = (await res.json()) as { ok?: boolean };
    if (!res.ok || !body.ok) throw new Error(`Apps Script responded ${res.status}`);
    return { status: "success" };
  } catch (err) {
    console.error("Feedback submit failed", err);
    return { status: "error", message: "Something went wrong sending your feedback. Please try again." };
  }
}
