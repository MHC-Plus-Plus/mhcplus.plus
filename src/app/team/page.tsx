import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { TeamCard } from "@/components/team/TeamCard";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team · MHC++",
  description: "Meet the MHC++ executive board, the students who run the inter-CUNY CS club.",
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        label="Team"
        title="The people behind MHC++."
        lead="Our executive board:"
        rest="students from across CUNY who organize events, run the community, and keep the club going."
      />

      <section className="border-t border-line">
        <Container className="py-section">
          {team.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <TeamCard key={m.slug} member={m} />
              ))}
            </div>
          ) : (
            <p className="card p-6 text-fg-2">Team profiles coming soon.</p>
          )}
        </Container>
      </section>
    </>
  );
}
