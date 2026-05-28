import { Container } from "@/components/shared/Container";
import sponsors from "@data/sponsors.json";

export function SponsorStrip() {
  return (
    <section id="sponsors" className="border-t border-border py-20">
      <Container>
        <div className="mb-10 text-center">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle before:text-fg-dim before:content-['//_']">
            Trusted By
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {sponsors.map((s, i) => (
            <div
              key={i}
              className="flex h-11 items-center rounded-sm border border-border bg-bg-card/60 px-7 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-fg-dim"
            >
              {s.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
