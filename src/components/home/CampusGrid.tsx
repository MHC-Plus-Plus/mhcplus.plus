import Link from "next/link";
import { Container } from "@/components/shared/Container";
import campuses from "@data/campuses.json";

export function CampusGrid() {
  return (
    <section id="about" className="border-t border-border py-[120px]">
      <Container>
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <span className="mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']">
            Where We Are
          </span>
          <h2 className="mb-[18px] text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.1] tracking-[-0.025em]">
            From across the CUNY system.
          </h2>
          <p className="text-base leading-[1.65] text-fg-muted">
            Our community draws from every kind of CUNY school: senior
            colleges, community colleges, and Macaulay&apos;s cross-campus
            network. Wherever you study CS at CUNY, you belong here.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
          {campuses.map((c) => (
            <div
              key={c.name}
              className="group relative flex items-center justify-between overflow-hidden rounded-sm border border-border bg-bg-card/60 px-5 py-[18px] backdrop-blur-sm transition-all hover:border-primary-dim hover:shadow-[0_0_0_1px_var(--primary-dim),0_0_20px_-8px_var(--primary)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(219,51,20,0) 0%, rgba(219,51,20,0.1) 100%)",
                }}
              />
              <span className="relative text-sm font-medium">{c.name}</span>
              <span className="relative font-mono text-[13px] font-semibold tabular-nums text-fg-muted transition-colors group-hover:text-primary-bright">
                {c.memberCount}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-fg-muted">
          Don&apos;t see your campus?{" "}
          <Link href="/join" className="font-semibold text-primary-bright">
            Be the first ++
          </Link>
        </p>
      </Container>
    </section>
  );
}
