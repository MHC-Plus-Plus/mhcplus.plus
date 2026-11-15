import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { HighlightCard } from "@/components/highlights/HighlightCard";
import { getHighlights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Highlights · MHC++",
  description: "Recaps and photos from past MHC++ events.",
};

export default async function HighlightsPage() {
  const highlights = await getHighlights();

  return (
    <>
      <PageHeader
        label="Highlights"
        title="Look back."
        lead="Recaps and photos from past MHC++ events."
        rest={
          <>
            Looking for what&apos;s next? See{" "}
            <Link href="/events" className="text-link">
              upcoming events
            </Link>
            .
          </>
        }
      />

      <section className="border-t border-line">
        <Container className="py-section">
          {highlights.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {highlights.map((h) => (
                <HighlightCard key={h.slug} highlight={h} />
              ))}
            </div>
          ) : (
            <p className="card p-6 text-fg-2">Highlights coming soon.</p>
          )}
        </Container>
      </section>
    </>
  );
}
