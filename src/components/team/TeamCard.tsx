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

const linkClass = "btn btn-outline h-9 px-4 text-[13px]";

/**
 * Bio and links appear in a panel over the photo on hover or focus, so the
 * grid never reflows. tabIndex makes a tap (touch) or Tab (keyboard) reveal it too.
 */
export function TeamCard({ member }: Props) {
  const hasDetails = member.bio || member.linkedin || member.github;

  return (
    <article
      tabIndex={hasDetails ? 0 : undefined}
      className="card group flex flex-col overflow-hidden transition-colors duration-150 hover:border-line-strong"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-line bg-bg">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="absolute inset-0 flex items-center justify-center font-heading text-7xl font-extrabold tracking-[-0.05em] text-fg-3"
            aria-hidden
          >
            {initials(member.name)}
          </span>
        )}

        {hasDetails && (
          <div className="pointer-events-none absolute inset-0 flex flex-col gap-4 overflow-y-auto bg-bg p-6 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
            {member.bio && <MarkdownContent>{member.bio}</MarkdownContent>}
            {(member.linkedin || member.github) && (
              <div className="mt-auto flex flex-wrap gap-2">
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
        <h3 className="h-card">{member.name}</h3>
        <p className="meta mt-3">{member.role}</p>
        {member.campus && <p className="mt-1 text-[15px] text-fg-2">{member.campus}</p>}
      </div>
    </article>
  );
}
