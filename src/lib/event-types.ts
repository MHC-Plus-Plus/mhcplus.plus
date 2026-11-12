/** Overridable event types. Values mirror the check constraint in supabase/migrations/0001_admin.sql. */
export const EVENT_TYPES = [
  { value: "workshop", label: "Workshop" },
  { value: "talk", label: "Talk" },
  { value: "panel", label: "Panel" },
  { value: "hackathon", label: "Hackathon" },
  { value: "tour", label: "Tour" },
  { value: "social", label: "Social" },
  { value: "event", label: "General event" },
] as const;

export type EventTypeValue = (typeof EVENT_TYPES)[number]["value"];

export function isEventType(value: unknown): value is EventTypeValue {
  return EVENT_TYPES.some((t) => t.value === value);
}
