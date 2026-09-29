import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { HighlightCard } from "@/components/highlights/HighlightCard";
import { getHighlights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Highlights · MHC++",
  description: "Recaps and photos from past MHC++ events.",
};

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

export default async function HighlightsPage() {
  const highlights = await getHighlights();

  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>Highlights</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        Look back.
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
        Recaps and photos from past MHC++ events. Looking for what&apos;s next? See{" "}
        <Link href="/events" className="font-semibold text-primary-bright">
          upcoming events
        </Link>
        .
      </p>

      {highlights.length > 0 ? (
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {highlights.map((h) => (
            <HighlightCard key={h.slug} highlight={h} />
          ))}
        </div>
      ) : (
        <p className="mt-16 rounded-md border border-border bg-bg-card/60 p-6 text-fg-muted">
          Highlights coming soon.
        </p>
      )}
    </Container>
  );
}
