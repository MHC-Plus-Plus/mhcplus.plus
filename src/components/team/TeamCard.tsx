import { MarkdownContent } from "@/components/shared/MarkdownContent";
import type { TeamMember } from "@/lib/types";

type Props = {
  member: TeamMember;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const linkClass =
  "font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-fg-subtle transition-colors hover:text-primary-bright";

/**
 * Bio and links appear in a panel over the photo on hover or focus, so the
 * grid never reflows. tabIndex makes a tap (touch) or Tab (keyboard) reveal it too.
 */
export function TeamCard({ member }: Props) {
  const hasDetails = member.bio || member.linkedin || member.github;

  return (
    <article
      tabIndex={hasDetails ? 0 : undefined}
      className="group flex flex-col rounded-md border border-border bg-bg-card/60 outline-none backdrop-blur-sm transition-colors hover:border-border-bright focus-visible:border-primary"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-border bg-bg-elevated">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(219,51,20,0.10) 0%, transparent 60%)",
              }}
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-fg-dim"
              aria-hidden
            >
              {initials(member.name)}
            </span>
          </>
        )}

        {hasDetails && (
          <div className="pointer-events-none absolute inset-0 flex translate-y-2 flex-col gap-4 overflow-y-auto bg-bg/90 p-6 opacity-0 backdrop-blur-md transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {member.bio && <MarkdownContent>{member.bio}</MarkdownContent>}
            {(member.linkedin || member.github) && (
              <div className="mt-auto flex gap-4">
                {member.linkedin && (
                  <a href={member.linkedin} className={linkClass} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {member.github && (
                  <a href={member.github} className={linkClass} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold leading-[1.25] tracking-[-0.015em]">
          {member.name}
        </h3>
        <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-bright">
          {member.role}
        </p>
        {member.campus && (
          <p className="mt-1 text-sm text-fg-subtle">{member.campus}</p>
        )}
      </div>
    </article>
  );
}
