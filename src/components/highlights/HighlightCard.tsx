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
    <article className="card overflow-hidden">
      {h.cover && (
        <div className="aspect-video overflow-hidden border-b border-line bg-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={h.cover} alt={h.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="tag">{dateFormat.format(new Date(h.date))}</span>
          {h.attendance !== null && <span className="meta">{h.attendance} attended</span>}
        </div>
        <h3 className="h-card">{h.title}</h3>
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
                className="aspect-square w-full rounded-[12px] border border-line object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
