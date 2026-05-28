import Link from "next/link";
import { Container } from "@/components/shared/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[140px] pb-[120px] text-center">
      {/* Brand glow halo behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-200px] z-0 h-[700px] w-[900px] -translate-x-1/2 blur-[40px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(219,51,20,0.22) 0%, rgba(219,51,20,0.08) 25%, transparent 60%)",
        }}
      />

      <Container>
        <div className="mb-9 inline-flex items-center gap-2.5 rounded-sm border border-primary/25 bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-[0.08em] text-primary-bright">
          <span
            aria-hidden
            className="h-1.5 w-1.5 animate-pulse bg-primary-bright shadow-[0_0_8px_var(--primary-bright)]"
          />
          THE INTER-CUNY CS CLUB
        </div>

        <h1 className="mb-8 text-[clamp(44px,8vw,92px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
          Unite CS
          <br />
          at CUNY
          <span className="text-primary-bright [text-shadow:0_0_28px_rgba(255,69,37,0.55)]">
            ++
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-[580px] text-[17px] leading-[1.6] text-fg-muted">
          MHC++ brings together computer science students from across The City
          University of New York — through career development, mutual growth,
          and lasting connection.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/join"
            className="group inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_var(--primary),0_0_24px_-4px_var(--primary),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:-translate-y-px hover:bg-primary-bright hover:shadow-[0_0_0_1px_var(--primary-bright),0_0_40px_-4px_var(--primary-bright),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            Become a member
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2.5 rounded-sm border border-border-strong bg-transparent px-6 py-3.5 text-[15px] font-semibold text-fg transition-colors hover:border-border-bright hover:bg-bg-card"
          >
            See upcoming events
          </Link>
        </div>
      </Container>
    </section>
  );
}
