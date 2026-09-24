import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { TeamCard } from "@/components/team/TeamCard";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team · MHC++",
  description: "Meet the MHC++ executive board, the students who run the inter-CUNY CS club.",
};

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>Team</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        The people behind MHC++.
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
        Our executive board: students from across CUNY who organize events, run the
        community, and keep the club going.
      </p>

      {team.length > 0 ? (
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <TeamCard key={m.slug} member={m} />
          ))}
        </div>
      ) : (
        <p className="mt-16 rounded-md border border-border bg-bg-card/60 p-6 text-fg-muted">
          Team profiles coming soon.
        </p>
      )}
    </Container>
  );
}
