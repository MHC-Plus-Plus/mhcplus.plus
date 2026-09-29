import { MarkdownContent } from "@/components/shared/MarkdownContent";
import type { Highlight } from "@/lib/types";

type Props = {
  highlight: Highlight;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function HighlightCard({ highlight: h }: Props) {
  return (
    <article className="overflow-hidden rounded-md border border-border bg-bg-card/60 backdrop-blur-sm">
      <div className="relative aspect-video overflow-hidden border-b border-border bg-bg-elevated">
        {h.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={h.cover} alt={h.title} className="h-full w-full object-cover" />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim"
          >
            {"//"}&nbsp;&nbsp;Photo
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-fg-subtle">
          <span className="rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 font-bold text-primary-bright">
            {dateFormat.format(new Date(h.date)).toUpperCase()}
          </span>
          {h.attendance !== null && <span>{h.attendance} attended</span>}
        </div>
        <h3 className="text-xl font-bold leading-[1.25] tracking-[-0.015em]">{h.title}</h3>
        {h.recap && <MarkdownContent>{h.recap}</MarkdownContent>}

        {h.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {h.photos.slice(0, 6).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-sm border border-border object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
