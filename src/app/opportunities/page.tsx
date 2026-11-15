import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { OpportunityFeed } from "@/components/opportunities/OpportunityFeed";
import { getOpportunities } from "@/lib/opportunities";

export const metadata: Metadata = {
  title: "Opportunities · MHC++",
  description:
    "Internships, mentorship, CUNY programs, and scholarships for CUNY computer science students, curated by MHC++ officers.",
};

// Re-fetch at most once an hour; admin edits revalidate this path immediately.
export const revalidate = 3600;

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <>
      <PageHeader
        label="Opportunities"
        title="Find your next step."
        lead="Internships, mentorship, CUNY programs, and scholarships, posted by our officers as we find them."
        rest="Expired deadlines drop off automatically."
      />
      <section aria-label="Opportunities feed" className="border-t border-line">
        <Container className="py-section">
          {opportunities.length > 0 ? (
            <OpportunityFeed opportunities={opportunities} />
          ) : (
            <p className="card p-6 text-fg-2">Nothing posted right now. Check back soon.</p>
          )}
        </Container>
      </section>
    </>
  );
}
