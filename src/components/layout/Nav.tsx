import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Wordmark } from "@/components/shared/Wordmark";

const links = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-md backdrop-saturate-150">
      <Container className="flex h-[68px] items-center justify-between">
        <Link href="/" aria-label="MHC++ home">
          <Wordmark className="text-primary-bright"/>
        </Link>

        <ul className="hidden gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/join"
          className="group inline-flex items-center gap-2.5 rounded-sm border border-border-strong px-[18px] py-[9px] text-sm font-semibold text-fg transition-all hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_24px_-8px_var(--primary)]"
        >
          Join us
          <span
            aria-hidden
            className="text-primary transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </Container>
    </nav>
  );
}
