"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

type Props = {
  /** The "Join us" pill, rendered on the right next to the menu toggle. */
  cta: React.ReactNode;
};

/** Centered link row (>= 760px), plus the right-hand CTA and the small-screen menu. */
export function NavLinks({ cta }: Props) {
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  // Tie "open" to the path it was opened on, so navigating closes the menu.
  const open = openAt === pathname;

  return (
    <>
      <ul className="hidden items-center gap-8 min-[760px]:flex">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={cn(
                "rounded-sm text-sm font-medium transition-colors duration-150 hover:text-fg",
                isActive(pathname, l.href) ? "text-fg" : "text-fg-2",
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 justify-self-end">
        {cta}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenAt(open ? null : pathname)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-150 hover:border-fg min-[760px]:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-bg px-[var(--gutter)] py-2 min-[760px]:hidden"
        >
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-line last:border-b-0">
              <Link
                href={l.href}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={cn(
                  "block py-4 font-heading text-2xl font-semibold tracking-[-0.03em] transition-colors duration-150 hover:text-fg",
                  isActive(pathname, l.href) ? "text-fg" : "text-fg-2",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
