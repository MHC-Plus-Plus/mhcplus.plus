import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/lib/types";

const TZ = "America/New_York";
const weekday = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" });
const month = new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short" });
const day = new Intl.DateTimeFormat("en-US", { timeZone: TZ, day: "numeric" });
const clock = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });

type Props = {
  event: CalendarEvent;
  className?: string;
};

/**
 * Left date column of an event card: "FRI · NOV", a huge day number, and the
 * start time. Horizontal on phones, a fixed-width column with a vertical
 * hairline from md up.
 */
export function EventDate({ event, className }: Props) {
  const d = new Date(event.start);
  return (
    <div
      className={cn(
        "flex shrink-0 items-end justify-between gap-4 border-b border-line px-6 py-5",
        "md:w-[168px] md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r md:py-6",
        className,
      )}
    >
      <span className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent">
        {weekday.format(d)} · {month.format(d)}
      </span>
      <span className="order-first font-heading text-[clamp(56px,6vw,80px)] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums text-fg md:order-none">
        {day.format(d)}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-2">
        {clock.format(d)}
      </span>
    </div>
  );
}

/** Small outline tag pills for an event: type and location, when known. */
export function EventTags({ event }: { event: CalendarEvent }) {
  const tags = [event.eventType, event.location ?? "Location on CampusGroups"].filter(
    (t): t is string => Boolean(t),
  );
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="tag max-w-full" title={t}>
          <span className="truncate">{t}</span>
        </li>
      ))}
    </ul>
  );
}
