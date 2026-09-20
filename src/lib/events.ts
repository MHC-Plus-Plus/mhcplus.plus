import type { CalendarEvent } from "@/lib/types";

export const EVENTS_FEED_URL =
  "https://macaulay.campusgroups.com/ical/macaulay/ical_club_20695.ics";

const TIME_ZONE = "America/New_York";

// The feed advertises a 1 hour TTL, so there's no point revalidating faster.
const REVALIDATE_SECONDS = 3600;

type Property = { name: string; params: Record<string, string>; value: string };

/** RFC 5545 line folding: a line starting with space or tab continues the previous one. */
function unfold(ics: string): string[] {
  return ics.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
}

/** Index of the first `:` that isn't inside a quoted param value. */
function valueSeparator(line: string): number {
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') inQuotes = !inQuotes;
    else if (line[i] === ":" && !inQuotes) return i;
  }
  return -1;
}

function parseProperty(line: string): Property | null {
  const sep = valueSeparator(line);
  if (sep === -1) return null;
  const [name, ...rawParams] = line.slice(0, sep).split(";");
  const params: Record<string, string> = {};
  for (const p of rawParams) {
    const eq = p.indexOf("=");
    if (eq !== -1) params[p.slice(0, eq).toUpperCase()] = p.slice(eq + 1);
  }
  return { name: name.toUpperCase(), params, value: line.slice(sep + 1) };
}

function decodeQuotedPrintable(value: string): string {
  const bytes: number[] = [];
  const clean = value.replace(/=\r?\n/g, "");
  for (let i = 0; i < clean.length; i++) {
    if (clean[i] === "=" && /^[0-9A-Fa-f]{2}$/.test(clean.slice(i + 1, i + 3))) {
      bytes.push(parseInt(clean.slice(i + 1, i + 3), 16));
      i += 2;
    } else {
      bytes.push(...Buffer.from(clean[i], "utf8"));
    }
  }
  return Buffer.from(bytes).toString("utf8");
}

function textValue({ params, value }: Property): string {
  const decoded =
    params.ENCODING?.toUpperCase() === "QUOTED-PRINTABLE"
      ? decodeQuotedPrintable(value)
      : value;
  return decoded
    .replace(/\\[nN]/g, "\n")
    .replace(/\\([,;\\])/g, "$1")
    .trim();
}

/** Handles UTC (`...Z`) timestamps, which is what CampusGroups emits. */
function parseDate(value: string): string | null {
  const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value);
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m;
  return `${y}-${mo}-${d}T${h}:${mi}:${s}Z`;
}

function cleanDescription(raw: string): string {
  // CampusGroups appends "---\nEvent Details: <url>" to every description.
  return raw.split(/\n---\n/)[0].trim();
}

function cleanLocation(raw: string): string | null {
  if (!raw || /sign in/i.test(raw)) return null;
  return raw;
}

export function parseIcs(ics: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let current: Property[] | null = null;

  for (const line of unfold(ics)) {
    if (line === "BEGIN:VEVENT") {
      current = [];
    } else if (line === "END:VEVENT" && current) {
      const props = new Map(current.map((p) => [p.name, p]));
      const start = props.has("DTSTART") ? parseDate(props.get("DTSTART")!.value) : null;
      const uid = props.get("UID")?.value;
      const title = props.has("SUMMARY") ? textValue(props.get("SUMMARY")!) : "";
      if (start && uid && title) {
        events.push({
          id: uid,
          title,
          start,
          end: props.has("DTEND") ? parseDate(props.get("DTEND")!.value) : null,
          location: props.has("LOCATION")
            ? cleanLocation(textValue(props.get("LOCATION")!))
            : null,
          description: props.has("DESCRIPTION")
            ? cleanDescription(textValue(props.get("DESCRIPTION")!))
            : "",
          url: props.get("URL")?.value ?? "",
          coverImage: null,
        });
      }
      current = null;
    } else if (current) {
      const prop = parseProperty(line);
      if (prop) current.push(prop);
    }
  }

  return events.sort((a, b) => a.start.localeCompare(b.start));
}

async function getFeedEvents(): Promise<CalendarEvent[]> {
  try {
    const res = await fetch(EVENTS_FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    return parseIcs(await res.text());
  } catch {
    return [];
  }
}

// The feed has no images, but each RSVP page carries an og:image. When an
// event has no cover of its own that tag is the club logo, which we skip.
const CLUB_LOGO = /mhcpp_icon/;

export function parseCoverImage(html: string): string | null {
  const tag = /<meta\b[^>]*\bproperty=["']og:image["'][^>]*>/i.exec(html)?.[0];
  const src = tag && /\bcontent=["']([^"']+)["']/i.exec(tag)?.[1];
  return src && !CLUB_LOGO.test(src) ? src : null;
}

async function getCoverImage(rsvpUrl: string): Promise<string | null> {
  if (!rsvpUrl) return null;
  try {
    const res = await fetch(rsvpUrl, { next: { revalidate: REVALIDATE_SECONDS } });
    return res.ok ? parseCoverImage(await res.text()) : null;
  } catch {
    return null;
  }
}

/** Every event in the feed, soonest first, with cover images where CampusGroups has one. */
export async function getEvents(): Promise<CalendarEvent[]> {
  const feed = await getFeedEvents();
  return Promise.all(
    feed.map(async (e) => ({ ...e, coverImage: await getCoverImage(e.url) })),
  );
}

function isPast(event: CalendarEvent, now: number): boolean {
  return new Date(event.end ?? event.start).getTime() < now;
}

export async function getUpcomingEvents(limit?: number): Promise<CalendarEvent[]> {
  const now = Date.now();
  const upcoming = (await getEvents()).filter((e) => !isPast(e, now));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

/** Most recent first. */
export async function getPastEvents(): Promise<CalendarEvent[]> {
  const now = Date.now();
  return (await getEvents()).filter((e) => isPast(e, now)).reverse();
}

const badgeMonth = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, month: "short" });
const badgeDay = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, day: "numeric" });
const weekday = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, weekday: "short" });
const clock = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

/** e.g. "SEP 25" */
export function formatDateBadge(event: CalendarEvent): string {
  const d = new Date(event.start);
  return `${badgeMonth.format(d)} ${badgeDay.format(d)}`.toUpperCase();
}

/** e.g. "Fri · 4:00 PM" */
export function formatDayTime(event: CalendarEvent): string {
  const d = new Date(event.start);
  return `${weekday.format(d)} · ${clock.format(d)}`;
}
