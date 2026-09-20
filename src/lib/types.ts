export type CalendarEvent = {
  /** ICS UID. */
  id: string;
  title: string;
  /** ISO 8601, UTC. */
  start: string;
  /** ISO 8601, UTC. Null when the feed gives no end time. */
  end: string | null;
  /** Null when the feed hides it (CampusGroups gates location behind sign-in). */
  location: string | null;
  /** Plain text, with CampusGroups boilerplate stripped. */
  description: string;
  /** CampusGroups RSVP page. */
  url: string;
  /** From the RSVP page's og:image. Null renders a placeholder block. */
  coverImage: string | null;
};
