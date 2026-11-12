import { normalizeCategory } from "@/lib/opportunity-meta";
import type { OpportunityCategory } from "@/lib/types";

export const LIMITS = { title: 160, org: 120, url: 2000, description: 1500 } as const;

export type OpportunityInput = {
  title: string;
  org: string;
  url: string;
  description: string;
  category: OpportunityCategory;
  /** YYYY-MM-DD, or null for rolling. */
  deadline: string | null;
  published: boolean;
};

export type RawOpportunity = {
  title: string;
  org: string;
  url: string;
  description: string;
  category: string;
  deadline: string;
  published: boolean;
};

function isRealDate(d: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const parsed = new Date(`${d}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === d;
}

/** Single source of truth for the form, the CSV import, and (mirrored) the DB constraints. */
export function validateOpportunity(
  raw: RawOpportunity,
): { error: string } | { values: OpportunityInput } {
  if (!raw.title || !raw.org) return { error: "Title and organization are required." };
  for (const key of ["title", "org", "url", "description"] as const) {
    if (raw[key].length > LIMITS[key]) return { error: `${key} is over ${LIMITS[key]} characters.` };
  }
  const category = normalizeCategory(raw.category);
  if (!category) return { error: `Unknown category "${raw.category}".` };
  try {
    const u = new URL(raw.url);
    if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error();
  } catch {
    return { error: "Link must be a valid http(s) URL." };
  }
  if (raw.deadline && !isRealDate(raw.deadline)) {
    return { error: `Deadline "${raw.deadline}" must be a date like 2026-12-01.` };
  }
  return {
    values: {
      title: raw.title,
      org: raw.org,
      url: raw.url,
      description: raw.description,
      category,
      deadline: raw.deadline || null,
      published: raw.published,
    },
  };
}
