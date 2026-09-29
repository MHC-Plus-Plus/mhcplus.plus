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

export type TeamMember = {
  /** MDX filename without extension. */
  slug: string;
  name: string;
  role: string;
  campus: string | null;
  /** Hosted URL (Cloudinary etc.). Null renders initials. */
  photo: string | null;
  linkedin: string | null;
  github: string | null;
  /** Lower comes first. Ties fall back to name. */
  order: number;
  /** MDX body, plain paragraphs. */
  bio: string;
};

export type Page = {
  slug: string;
  /** Flat frontmatter values, as written. */
  meta: Record<string, string>;
  body: string;
};

export type Highlight = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Hosted URL. Null renders a placeholder block. */
  cover: string | null;
  /** Hosted URLs. */
  photos: string[];
  attendance: number | null;
  /** CampusGroups event page, if any. */
  event: string | null;
  /** MDX body, plain paragraphs. */
  recap: string;
};
