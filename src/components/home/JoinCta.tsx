import Link from "next/link";
import { Container } from "@/components/shared/Container";

/**
 * Closing "Ready to join the CUNY CS community?" block, the last section
 * on the home page before the footer. Anchor target #join.
 */
export function JoinCta() {
  return (
    <section id="join" className="border-t border-line">
      <Container className="py-section">
        <div className="cta-block flex flex-wrap items-end justify-between gap-10 px-[clamp(24px,5vw,72px)] py-[clamp(48px,7vw,96px)]">
          <div>
            <h2 className="h-section text-bg">
              Ready to join the
              <br />
              CUNY CS community?
            </h2>
            <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.25vw,18px)] leading-[1.6] text-bg">
              Whatever campus you&apos;re at, whatever year you&apos;re in,
              whatever you&apos;re building, there&apos;s a place for you here.
            </p>
          </div>
          <Link href="/join" className="btn btn-dark btn-lg">
            Become a member →
          </Link>
        </div>
      </Container>
    </section>
  );
}
