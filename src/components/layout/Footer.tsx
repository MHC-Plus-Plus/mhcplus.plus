import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Wordmark } from "@/components/shared/Wordmark";
import { DISCORD_URL, EMAIL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/links";

const externalLinks = [
  { href: DISCORD_URL, label: "Discord" },
  { href: GITHUB_URL, label: "GitHub" },
  { href: INSTAGRAM_URL, label: "Instagram" },
  { href: LINKEDIN_URL, label: "LinkedIn" },
  { href: `mailto:${EMAIL}`, label: "Contact" },
];

const internalLinks = [
  { href: "/join", label: "Join" },
  { href: "/events", label: "Events" },
  { href: "/highlights", label: "Highlights" },
  { href: "/hackathon", label: "HackMHC++" },
  { href: "/team", label: "Team" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-wrap items-center justify-between gap-6">
        <Wordmark size={15} />

        <div className="flex flex-col gap-3 text-[13px] text-fg-muted">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {internalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-primary-bright">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-fg-subtle">
          {externalLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-primary-bright"
            >
              {l.label}
            </Link>
          ))}
          </div>
        </div>

        <div className="font-mono text-[11px] tracking-[0.08em] text-fg-dim">
          © {year} · MHCPLUS.PLUS
        </div>
      </Container>
    </footer>
  );
}
