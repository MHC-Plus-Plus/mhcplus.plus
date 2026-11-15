import Link from "next/link";
import { Container } from "@/components/shared/Container";

export function Hero() {
  return (
    <section>
      <Container className="pt-section pb-[clamp(48px,6vw,80px)]">
        <p className="label">The inter-CUNY CS club</p>

        <h1 className="h-hero mt-[clamp(24px,4vw,48px)]">
          Uniting
          <br />
          CUNY CS<span className="text-accent">.</span>
        </h1>

        <div className="mt-[clamp(40px,6vw,80px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-t border-line pt-8">
          <p className="body max-w-[52ch]">
            MHC++ brings together computer science students from across CUNY,
            through career development, technical upskilling, and lasting
            connection.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="btn btn-accent btn-lg">
              Become a member →
            </Link>
            <Link href="/events" className="btn btn-outline btn-lg">
              See events
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
