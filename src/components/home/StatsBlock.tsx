import { Container } from "@/components/shared/Container";
import stats from "@data/stats.json";

type Stat = {
  label: string;
  value: number;
  showPlus: boolean;
  sub: string;
};

const items: Stat[] = [
  { label: "Members",  value: stats.members,  showPlus: true,  sub: "Active across the CUNY system" },
  { label: "Campuses", value: stats.campuses, showPlus: false, sub: "CUNY schools currently represented" },
  { label: "Events",   value: stats.events,   showPlus: true,  sub: "Run since the club was founded" },
];

export function StatsBlock() {
  return (
    <section className="border-t border-line">
      <Container className="py-section">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {items.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 md:px-8 md:first:pl-0 ${
                i < items.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""
              }`}
            >
              <p className="label">{s.label}</p>
              <p className="mt-6 font-heading text-[clamp(56px,7vw,96px)] font-extrabold leading-[0.9] tracking-[-0.05em] tabular-nums">
                {s.value}
                {s.showPlus && <span className="text-accent">+</span>}
              </p>
              <p className="mt-4 text-[15px] text-fg-2">{s.sub}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
