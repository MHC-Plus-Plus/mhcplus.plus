import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Wordmark } from "@/components/shared/Wordmark";

const externalLinks = [
  { href: "https://discord.com", label: "Discord" },
  { href: "https://github.com", label: "GitHub" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "mailto:hello@mhcplus.plus", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-wrap items-center justify-between gap-6">
        <Wordmark size={15} />

        <div className="flex items-center gap-7 text-[13px] text-fg-muted">
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

        <div className="font-mono text-[11px] tracking-[0.08em] text-fg-dim">
          © {year} · MHCPLUS.PLUS
        </div>
      </Container>
    </footer>
  );
}
