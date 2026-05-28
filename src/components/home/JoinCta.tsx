import Link from "next/link";
import { Container } from "@/components/shared/Container";

/**
 * Closing "Ready to join the CUNY CS community?" panel — last section on
 * the home page before the footer, anchor target #join.
 */
export function JoinCta() {
  return (
    <section id="join" className="border-t border-border py-[120px] pb-[140px]">
      <Container>
        <div
          className="relative overflow-hidden rounded-md border border-border-strong px-10 py-[88px] text-center backdrop-blur-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,19,0.7) 0%, rgba(19,19,22,0.7) 100%)",
          }}
        >
          {/* top glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 blur-[40px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(219,51,20,0.2) 0%, transparent 70%)",
            }}
          />
          {/* watermark "++" */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[180px] -right-8 select-none text-[380px] font-extrabold leading-none tracking-[-0.05em] text-primary opacity-[0.05]"
          >
            ++
          </div>

          <h2 className="relative mb-5 text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            Ready to join the
            <br />
            CUNY CS community?
          </h2>
          <p className="relative mx-auto mb-9 max-w-[540px] text-base leading-[1.6] text-fg-muted">
            Whatever campus you&apos;re at, whatever year you&apos;re in,
            whatever you&apos;re building — there&apos;s a place for you here.
          </p>
          <Link
            href="/join"
            className="group relative inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_var(--primary),0_0_24px_-4px_var(--primary),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:-translate-y-px hover:bg-primary-bright hover:shadow-[0_0_0_1px_var(--primary-bright),0_0_40px_-4px_var(--primary-bright),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            Become a member
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
