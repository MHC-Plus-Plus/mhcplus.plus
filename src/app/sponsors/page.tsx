import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { EMAIL, SPONSOR_PACKET_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Sponsors · MHC++",
  description: "Partner with MHC++ to reach CS students across CUNY.",
};

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

export default function SponsorsPage() {
  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>Sponsors</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        Partner with us.
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
        MHC++ connects companies and organizations with computer science students
        from every CUNY campus, through events, workshops, and HackMHC++.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={SPONSOR_PACKET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_var(--primary),0_0_24px_-4px_var(--primary),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:-translate-y-px hover:bg-primary-bright hover:shadow-[0_0_0_1px_var(--primary-bright),0_0_40px_-4px_var(--primary-bright),inset_0_1px_0_rgba(255,255,255,0.2)]"
        >
          Download the sponsor packet
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center rounded-sm border border-border-strong px-6 py-3.5 text-[15px] font-semibold text-fg transition-colors hover:border-border-bright hover:bg-bg-card"
        >
          Contact us
        </a>
      </div>
    </Container>
  );
}
