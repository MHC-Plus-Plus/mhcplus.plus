import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import {
  CAMPUSGROUPS_URL,
  DISCORD_URL,
  EMAIL,
  GITHUB_URL,
  INTEREST_FORM_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Join · MHC++",
  description:
    "Join MHC++: sign up on CampusGroups, then find us on Discord, Instagram, and more.",
};

const eyebrowClass =
  "mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']";

const steps = [
  "Open our CampusGroups page with the button above.",
  "Sign in with your CUNY email (Macaulay's CampusGroups uses CUNY Login).",
  "Click Join. That's it, you're on the list and can RSVP to events.",
];

const links = [
  { label: "Discord", note: "Chat with members across campuses", href: DISCORD_URL },
  { label: "Interest form", note: "Tell us what you want to see", href: INTEREST_FORM_URL },
  { label: "Instagram", note: "Photos and announcements", href: INSTAGRAM_URL },
  { label: "GitHub", note: "Our code and projects", href: GITHUB_URL },
  { label: "LinkedIn", note: "Follow for opportunities", href: LINKEDIN_URL },
  { label: "Email", note: EMAIL, href: `mailto:${EMAIL}` },
];

const panelClass =
  "group flex items-center justify-between rounded-md border border-border bg-bg-card/60 px-6 py-5 backdrop-blur-sm transition-all hover:border-border-bright hover:bg-bg-card-hover/80";

export default function JoinPage() {
  return (
    <Container className="py-[120px]">
      <span className={eyebrowClass}>Join</span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        Become a member.
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-fg-muted">
        Any CUNY student can join, whatever campus, major, or year. Membership is
        free and runs through CampusGroups.
      </p>

      <a
        href={CAMPUSGROUPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 group inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_var(--primary),0_0_24px_-4px_var(--primary),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:-translate-y-px hover:bg-primary-bright hover:shadow-[0_0_0_1px_var(--primary-bright),0_0_40px_-4px_var(--primary-bright),inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        Sign up on CampusGroups
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </a>

      <ol className="mt-10 max-w-[620px] space-y-3 text-[15px] leading-[1.6] text-fg-muted">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4">
            <span className="font-mono text-xs font-bold text-primary-bright">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </li>
        ))}
      </ol>

      <section className="mt-20" aria-labelledby="find-us">
        <h2 id="find-us" className="mb-6 text-2xl font-bold tracking-[-0.02em]">
          Find us everywhere else
        </h2>
        <div className="grid max-w-[760px] gap-3">
          <Link href="/events" className={panelClass}>
            <span className="font-semibold">Upcoming events</span>
            <span aria-hidden className="text-primary">→</span>
          </Link>
          <Link href="/hackathon" className={panelClass}>
            <span className="font-semibold">HackMHC++</span>
            <span aria-hidden className="text-primary">→</span>
          </Link>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={panelClass}
            >
              <span>
                <span className="block font-semibold">{l.label}</span>
                <span className="text-sm text-fg-subtle">{l.note}</span>
              </span>
              <span aria-hidden className="text-primary">→</span>
            </a>
          ))}
        </div>
      </section>
    </Container>
  );
}
