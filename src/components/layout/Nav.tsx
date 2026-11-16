import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Wordmark } from "@/components/shared/Wordmark";
import { NavLinks } from "@/components/layout/NavLinks";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-[var(--c-nav)] backdrop-blur-md">
      <Container className="relative grid h-[var(--nav-h)] grid-cols-[1fr_auto] items-center gap-4 min-[760px]:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="MHC++ home" className="justify-self-start rounded-sm">
          <Wordmark />
        </Link>

        <NavLinks
          cta={
            <Link href="/join" className="btn btn-solid h-10 px-[18px] text-sm">
              Join us →
            </Link>
          }
        />
      </Container>
    </nav>
  );
}
