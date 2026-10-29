import Link from "next/link";
import { getTodaysEvents } from "@/lib/events";
import type { CalendarEvent } from "@/lib/types";

const clock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

export async function TodayTicker() {
  const events = await getTodaysEvents();

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="relative z-[1] flex w-full items-stretch border-b border-border bg-bg-elevated overflow-hidden">
      <div className="relative z-10 flex items-center bg-primary px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
        TODAY
      </div>
      <div className="ticker-viewport flex-1 overflow-x-hidden">
        <div
          className="ticker-track flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          style={{ "--duration": `${Math.max(events.length * 15, 30)}s` } as React.CSSProperties}
        >
          <TickerList events={events} />
          <TickerList events={events} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function TickerList({ events, "aria-hidden": ariaHidden }: { events: CalendarEvent[]; "aria-hidden"?: "true" }) {
  return (
    <div
      className="flex min-w-full sm:min-w-[100vw] items-center justify-around gap-8 px-8 py-1.5"
      aria-hidden={ariaHidden}
    >
      {events.map((event) => {
        const url = event.url || "/events";
        const isExternal = url.startsWith("http");

        return (
          <Link
            key={event.id}
            href={url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group flex flex-none items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated rounded-sm"
          >
            <span className="font-sans text-sm font-medium text-fg group-hover:text-primary-bright transition-colors">
              {event.title}
            </span>
            <span className="text-fg-subtle">/</span>
            <span className="font-mono text-xs text-fg-muted">
              {clock.format(new Date(event.start))}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
