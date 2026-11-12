import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { OpportunityFeed } from "@/components/opportunities/OpportunityFeed";
import { getOpportunities } from "@/lib/opportunities";

export const metadata: Metadata = {
  title: "Opportunities · MHC++",
  description:
    "Internships, mentorship, CUNY programs, and scholarships for CUNY computer science students, curated by MHC++ officers.",
};

// Re-fetch at most once an hour; admin edits revalidate this path immediately.
export const revalidate = 3600;

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>Opportunities</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        Find your next step.
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
        Internships, mentorship, CUNY programs, and scholarships, posted by our officers as we
        find them. Expired deadlines drop off automatically.
      </p>
      <section className="mt-16" aria-label="Opportunities feed">
        {opportunities.length > 0 ? (
          <OpportunityFeed opportunities={opportunities} />
        ) : (
          <p className="rounded-md border border-border bg-bg-card/60 p-6 text-fg-muted">
            Nothing posted right now. Check back soon.
          </p>
        )}
      </section>
    </Container>
  );
}
