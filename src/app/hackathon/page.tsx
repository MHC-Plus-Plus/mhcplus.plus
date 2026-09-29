import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { getPage } from "@/lib/content";
import { HACKATHON_REGISTER_URL, SPONSOR_PACKET_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "HackMHC++ · MHC++",
  description: "HackMHC++, the inter-CUNY hackathon run by MHC++.",
};

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

export default async function HackathonPage() {
  const page = await getPage("hackathon");
  const meta = page?.meta ?? {};
  const past = meta.status === "past";

  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>Hackathon</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        HackMHC++
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">The inter-CUNY hackathon. Build something with students from every campus.</p>

      <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 font-mono text-xs uppercase tracking-[0.1em]">
        {[
          ["Date", meta.date ?? "TBA"],
          ["Location", meta.location ?? "TBA"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-fg-subtle">{k}</dt>
            <dd className="mt-1 text-sm text-fg">{v}</dd>
          </div>
        ))}
      </dl>

      {!past && (
        <a
          href={meta.register || HACKATHON_REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 group inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_var(--primary),0_0_24px_-4px_var(--primary),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:-translate-y-px hover:bg-primary-bright hover:shadow-[0_0_0_1px_var(--primary-bright),0_0_40px_-4px_var(--primary-bright),inset_0_1px_0_rgba(255,255,255,0.2)]"
        >
          Register on CampusGroups
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      )}

      {page && (
        <div className="mt-16 max-w-[680px] [&_p]:text-lg">
          <MarkdownContent>{page.body}</MarkdownContent>
        </div>
      )}

      <section
        className="mt-20 rounded-md border border-border-strong bg-bg-card/60 p-8 backdrop-blur-sm"
        aria-labelledby="sponsor"
      >
        <h2 id="sponsor" className="text-2xl font-bold tracking-[-0.02em]">
          Sponsor HackMHC++
        </h2>
        <p className="mt-3 max-w-[560px] text-fg-muted">
          Reach CS students across all of CUNY. Our sponsor packet has the details.
        </p>
        <a
          href={SPONSOR_PACKET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-bright"
        >
          View the sponsor packet <span aria-hidden>→</span>
        </a>
      </section>
    </Container>
  );
}
