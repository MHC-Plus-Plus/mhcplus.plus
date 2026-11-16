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
    <div className="flex w-full items-stretch overflow-hidden border-b border-line bg-surface">
      <div className="relative z-10 flex items-center bg-accent px-5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-bg">
        Today
      </div>
      <div className="ticker-viewport flex-1 overflow-x-hidden">
        <div
          className="ticker-track flex w-max will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
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
      className="flex min-w-full items-center justify-around gap-8 px-8 py-3 sm:min-w-[100vw]"
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
            tabIndex={ariaHidden ? -1 : undefined}
            className="group flex flex-none items-center gap-3 whitespace-nowrap rounded-sm focus-visible:outline-offset-0"
          >
            <span className="font-heading text-lg font-semibold tracking-[-0.03em] text-fg transition-colors duration-150 group-hover:text-fg-2">
              {event.title}
            </span>
            <span aria-hidden className="text-fg-2">/</span>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-2">
              {clock.format(new Date(event.start))}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
