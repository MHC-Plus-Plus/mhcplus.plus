import type { CalendarEvent } from "@/lib/types";

const TYPE_KEYWORDS: [RegExp, string][] = [
  [/workshop/i, "workshop"],
  [/hackathon/i, "hackathon"],
  [/panel/i, "panel"],
  [/\b(talk|lecture|fireside)\b/i, "talk"],
  [/\b(tour|visit|trip)\b/i, "tour"],
  [/\b(social|mixer|meetup|game night)\b/i, "social"],
];

/** Types with no speaker to rate. */
const NO_SPEAKER = new Set(["tour", "social", "hackathon"]);

/**
 * Fills the `<event type>` slot of the feedback template. Prefers the
 * CampusGroups type when officers set one, then title keywords, then "event".
 */
export function inferEventType(event: Pick<CalendarEvent, "title" | "eventType">) {
  const type =
    event.eventType ?? TYPE_KEYWORDS.find(([re]) => re.test(event.title))?.[1] ?? "event";
  return { type, hasSpeaker: !NO_SPEAKER.has(type) };
}

export const ENJOYED_OPTIONS = [
  { value: "speaker", label: "The speaker & their insights", speakerOnly: true },
  { value: "qa", label: "Interactive Q&A sessions" },
  { value: "people", label: "Meeting fellow students" },
  { value: "organization", label: "The overall organization of the event" },
  { value: "vibe", label: "The event's inclusivity & vibe" },
  { value: "topics", label: "Focus on specific topics" },
  { value: "snacks", label: "The snacks provided" },
  { value: "resources", label: "Real world resources provided" },
] as const;

export type FeedbackPayload = {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventType: string;
  firstName: string;
  lastName: string;
  email: string;
  overall: number;
  access: number;
  relevance: number;
  /** Null when the event type has no speaker. */
  speaker: number | null;
  enjoyed: string[];
  enjoyedOther: string;
  improve: string;
  topics: string;
  recommend: number;
  comments: string;
};

const MAX_TEXT = 2000;

function text(form: FormData, key: string, max = MAX_TEXT): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function rating(form: FormData, key: string): number | null {
  const n = Number(form.get(key));
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

/** Returns an error message, or the cleaned payload. Event fields are filled in by the caller. */
export function parseFeedback(
  form: FormData,
  hasSpeaker: boolean,
): { error: string } | { values: Omit<FeedbackPayload, "eventId" | "eventTitle" | "eventDate" | "eventType"> } {
  const overall = rating(form, "overall");
  const access = rating(form, "access");
  const relevance = rating(form, "relevance");
  const speaker = hasSpeaker ? rating(form, "speaker") : null;
  const recommend = rating(form, "recommend");

  if (!overall || !access || !relevance || !recommend || (hasSpeaker && !speaker)) {
    return { error: "Please answer all the required ratings." };
  }

  const allowed = new Set<string>(ENJOYED_OPTIONS.map((o) => o.value));
  const enjoyed = form.getAll("enjoyed").filter((v): v is string => typeof v === "string" && allowed.has(v));

  return {
    values: {
      firstName: text(form, "firstName", 100),
      lastName: text(form, "lastName", 100),
      email: text(form, "email", 200),
      overall,
      access,
      relevance,
      speaker,
      enjoyed,
      enjoyedOther: text(form, "enjoyedOther", 300),
      improve: text(form, "improve"),
      topics: text(form, "topics"),
      recommend,
      comments: text(form, "comments"),
    },
  };
}
