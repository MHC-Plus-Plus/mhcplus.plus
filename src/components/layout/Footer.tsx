import { Container } from "@/components/shared/Container";
import { DISCORD_URL, EMAIL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/links";

const externalLinks = [
  { href: `mailto:${EMAIL}`, label: "Contact" },
  { href: DISCORD_URL, label: "Discord" },
  { href: GITHUB_URL, label: "GitHub" },
  { href: INSTAGRAM_URL, label: "Instagram" },
  { href: LINKEDIN_URL, label: "LinkedIn" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden border-t border-line">
      <Container className="pt-section">
        <ul className="flex flex-wrap gap-3">
          {externalLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...(l.href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="btn btn-outline btn-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <p
          aria-hidden
          className="mt-[clamp(48px,7vw,96px)] select-none font-heading text-[clamp(96px,25vw,400px)] font-extrabold leading-[0.82] tracking-[-0.07em] text-fg"
        >
          MHC<span className="text-accent">++</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-mono text-xs uppercase tracking-[0.08em] text-fg-2">
          <span>© {year} · MHCPLUS.PLUS</span>
        </div>
      </Container>
    </footer>
  );
}
