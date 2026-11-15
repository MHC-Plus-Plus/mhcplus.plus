import type { Metadata } from "next";
import { Briefcase, Camera, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  CAMPUSGROUPS_URL,
  DISCORD_URL,
  EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Join · MHC++",
  description:
    "Join MHC++: sign up on Club Macaulay, then find us on Discord, Instagram, and more.",
};

const steps = [
  "The first time you RSVP, you'll be prompted to create an account. You'll need your first and last name, email, and account type.",
  "Having trouble logging in? Click \"Forgot Password\" the first time you log in to set your password.",
  "Once you're set up, you can use the same account all semester.",
];

const links = [
  { label: "Discord", note: "Chat with members across campuses", href: DISCORD_URL, Icon: MessageCircle },
  { label: "Instagram", note: "Photos and announcements", href: INSTAGRAM_URL, Icon: Camera },
  { label: "LinkedIn", note: "Follow for opportunities", href: LINKEDIN_URL, Icon: Briefcase },
  { label: "Email", note: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        label="Join"
        title="Become a member."
        lead="Any CUNY student can join, whatever campus, major, or year."
        rest="Membership is free and runs through Club Macaulay."
      >
        <a
          href={CAMPUSGROUPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent btn-lg"
        >
          Sign up on Club Macaulay →
        </a>

        <ol className="mt-12 max-w-[60ch] border-t border-line">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-6 border-b border-line py-5 text-base leading-[1.6] text-fg-2">
              <span className="pt-1 font-mono text-xs tracking-[0.08em] text-fg-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </li>
          ))}
        </ol>

        <p className="mt-6 text-base leading-[1.6] text-fg-2">
          Need help? Ask us in our Discord below.
        </p>
      </PageHeader>

      <section aria-labelledby="find-us" className="border-t border-line">
        <Container className="py-section">
          <div className="intro-grid">
            <p className="label pt-3">Elsewhere</p>
            <div className="min-w-0">
              <h2 id="find-us" className="h-section">
                Find us everywhere else
              </h2>
              <ul className="mt-[clamp(32px,4vw,48px)] border-t border-line">
                {links.map((l) => (
                  <li key={l.label} className="border-b border-line">
                    <a
                      href={l.href}
                      target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 rounded-sm py-6"
                    >
                      <span className="flex min-w-0 items-center gap-5">
                        <l.Icon aria-hidden className="size-5 shrink-0 text-fg-2" />
                        <span className="min-w-0">
                          <span className="block font-heading text-[clamp(24px,2.4vw,32px)] font-semibold leading-none tracking-[-0.04em] text-fg">
                            {l.label}
                          </span>
                          <span className="mt-2 block break-words text-[15px] text-fg-2">{l.note}</span>
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="btn btn-outline size-11 shrink-0 p-0 group-hover:border-fg"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
