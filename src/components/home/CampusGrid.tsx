import Link from "next/link";
import { Container } from "@/components/shared/Container";
import campuses from "@data/campuses.json";

export function CampusGrid() {
  return (
    <section id="about" className="border-t border-line">
      <Container className="py-section">
        <div className="intro-grid">
          <p className="label pt-2">Where we are</p>
          <div>
            <h2 className="h-section">From across the CUNY system.</h2>
            <p className="body mt-6">
              Our community draws from every kind of CUNY school: senior
              colleges, community colleges, and Macaulay&apos;s cross-campus
              network. Wherever you study CS at CUNY, you belong here.
            </p>
          </div>
        </div>

        <ul className="mt-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] border-t border-line">
          {campuses.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-4 border-b border-line py-5 pr-6"
            >
              <span className="text-[15px] font-medium">{c.name}</span>
              <span className="font-mono text-xs tabular-nums text-fg-2">{c.memberCount}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[15px] text-fg-2">
          And more,{" "}
          <Link href="/join" className="text-link">
            join us!
          </Link>
        </p>
      </Container>
    </section>
  );
}
