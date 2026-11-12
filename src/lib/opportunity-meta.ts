import type { Opportunity, OpportunityCategory } from "@/lib/types";

const TIME_ZONE = "America/New_York";

export const CATEGORY_LABELS: Record<OpportunityCategory, string> = {
  internship: "Internship",
  mentorship: "Mentorship",
  cuny_program: "CUNY program",
  scholarship: "Scholarship",
  other: "Other",
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as OpportunityCategory[];

export function isCategory(value: unknown): value is OpportunityCategory {
  return typeof value === "string" && value in CATEGORY_LABELS;
}

const slugify = (v: string) => v.trim().toLowerCase().replace(/[\s-]+/g, "_");

/** Accepts a slug ("cuny_program") or a display label ("CUNY program"), case-insensitive. */
export function normalizeCategory(value: string): OpportunityCategory | null {
  const v = slugify(value);
  if (isCategory(v)) return v;
  return CATEGORIES.find((c) => slugify(CATEGORY_LABELS[c]) === v) ?? null;
}

export type OpportunityRow = {
  id: string;
  title: string;
  org: string;
  url: string;
  description: string;
  category: OpportunityCategory;
  deadline: string | null;
  posted_at: string;
  published: boolean;
};

export const OPPORTUNITY_COLUMNS =
  "id, title, org, url, description, category, deadline, posted_at, published";

export function toOpportunity(r: OpportunityRow): Opportunity {
  return {
    id: r.id,
    title: r.title,
    org: r.org,
    url: r.url,
    description: r.description,
    category: r.category,
    deadline: r.deadline,
    postedAt: r.posted_at,
    published: r.published,
  };
}

const ymd = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's date in New York as YYYY-MM-DD. */
export function todayNY(now = new Date()): string {
  return ymd.format(now);
}

/** A deadline of today is still open. Rolling (null) never expires. */
export function isOpen(o: Pick<Opportunity, "deadline">, today = todayNY()): boolean {
  return o.deadline === null || o.deadline >= today;
}

const badgeMonth = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
});

/** e.g. "NOV 30". Parsed as UTC so the calendar date never shifts. */
export function formatDeadlineBadge(deadline: string): string {
  const d = new Date(`${deadline}T00:00:00Z`);
  return `${badgeMonth.format(d)} ${d.getUTCDate()}`.toUpperCase();
}

/** e.g. "today", "3d ago", "2w ago", "5mo ago". */
export function formatPostedAgo(postedAt: string, now = Date.now()): string {
  const days = Math.floor((now - new Date(postedAt).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 14) return `${days}d ago`;
  if (days < 60) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
