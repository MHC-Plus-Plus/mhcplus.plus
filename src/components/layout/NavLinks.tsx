"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/** Desktop link row plus the hamburger and its dropdown panel for small screens. */
export function NavLinks() {
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  // Tie "open" to the path it was opened on, so navigating closes the menu.
  const open = openAt === pathname;

  return (
    <>
      <ul className="hidden gap-9 md:flex">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-fg",
                isActive(pathname, l.href) ? "text-fg" : "text-fg-muted",
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenAt(open ? null : pathname)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong text-fg md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-border bg-bg/95 px-6 py-3 backdrop-blur-md md:hidden"
        >
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={cn(
                  "block py-3 text-base font-medium",
                  isActive(pathname, l.href) ? "text-primary-bright" : "text-fg-muted",
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
