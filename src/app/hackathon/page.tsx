import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { getPage } from "@/lib/content";

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
        <span
          aria-disabled="true"
          className="mt-10 inline-flex cursor-not-allowed items-center rounded-sm border border-border-strong bg-bg-card px-6 py-3.5 text-[15px] font-semibold text-fg-subtle"
        >
          Registration opens in the spring
        </span>
      )}

      {page && (
        <div className="mt-16 max-w-[680px] [&_p]:text-lg">
          <MarkdownContent>{page.body}</MarkdownContent>
        </div>
      )}
    </Container>
  );
}
