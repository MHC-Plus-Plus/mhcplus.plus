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
    <section className="pb-[120px]">
      <Container>
        <div className="relative grid grid-cols-1 overflow-hidden rounded-md border border-border bg-bg-elevated/60 backdrop-blur-md md:grid-cols-3">
          {/* subtle top-down red tint */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(219,51,20,0.03) 0%, transparent 100%)",
            }}
          />
          {items.map((s, i) => (
            <div
              key={s.label}
              className={`relative p-8 transition-colors hover:bg-bg-card-hover ${
                i < items.length - 1
                  ? "border-b border-border md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="mb-[18px] flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
                <span
                  aria-hidden
                  className="h-[5px] w-[5px] bg-primary shadow-[0_0_6px_var(--primary)]"
                />
                {s.label}
              </div>
              <div className="mb-3.5 text-[clamp(44px,7vw,56px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                {s.value}
                {s.showPlus && <span className="text-primary-bright">+</span>}
              </div>
              <div className="text-sm text-fg-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
