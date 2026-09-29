import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { TeamCard } from "@/components/team/TeamCard";
import { getPage, getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "About · MHC++",
  description:
    "MHC++ is the inter-CUNY computer science club: who we are, why we exist, and who runs it.",
};

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

export default async function AboutPage() {
  const [page, team] = await Promise.all([getPage("about"), getTeam()]);
  const eboard = team.slice(0, 6);

  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>About</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        Uniting CUNY CS.
      </h1>
      <div className="mt-8 max-w-[680px] [&_p]:text-lg">
        {page && <MarkdownContent>{page.body}</MarkdownContent>}
      </div>

      {eboard.length > 0 && (
        <section id="team" className="mt-24" aria-labelledby="eboard">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="eboard" className="text-2xl font-bold tracking-[-0.02em]">
              Meet the eboard
            </h2>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-bright"
            >
              Meet the full team <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eboard.map((m) => (
              <TeamCard key={m.slug} member={m} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
