# Claude Code instructions for mhcplus.plus

This file is read automatically at the start of every Claude Code session. It captures decisions made during planning so you don't have to re-derive them.

## Project overview

This is the website for **MHC++**, the inter-CUNY CS club. See `README.md` for the full project brief, audiences, and roadmap.

We are currently building **v1**: a public, static, content-driven Next.js site. No auth, no database. v2 (auth, profiles, member features) ships in the fall.

## Reference materials in the repo

- **`mockup.html`** — The original v1 home page mockup. **Superseded** by the Swiss/editorial restyle described under "Design system" below; keep it for reference only.
- **`README.md`** — Project brief and feature roadmap.
- **`mhcpp_icon.svg`** — Logo. The SVG file uses `#F14323`; inline, use the `--c-accent` token instead.

## Tech stack (locked)

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **MDX** for content (team, sponsors, page copy). Events come from the CampusGroups ICS feed instead.
- **`src/` directory** — yes, use `src/app/`, `src/components/`, etc.
- **Vercel** for hosting (free tier, spend limit configured)
- **Porkbun** for domain (`mhcplus.plus`)

## Design system (Swiss / editorial, dark)

Huge tightly spaced headlines, small uppercase mono labels, hairline dividers, pill buttons, lots of empty space. **No** gradients, glows, glassmorphism, drop shadows, left-border accent cards or emoji.

Tokens live only in `src/styles/tokens.css`; `src/app/globals.css` maps them to Tailwind (Tailwind's default palette is wiped, so only these exist) and defines the component classes. Never hard-code a color anywhere else.

```
--c-bg: #0A0A0B          bg-bg
--c-surface: #111113     bg-surface      (cards)
--c-line: #1F1F22        border-line     (hairlines, card borders)
--c-line-strong: #3A3A3E border-line-strong (outline buttons, inputs)
--c-fg: #EDEDE8          text-fg         (primary text)
--c-fg-2: #9A9A94        text-fg-2       (secondary text)
--c-fg-3: #6B6B67        text-fg-3       (muted; large text >= 28px only, it is ~3.7:1)
--c-accent: #FF5A36      text-accent / bg-accent
--container: 1360px, --gutter: clamp(20px,4vw,40px), --section-y: clamp(64px,9vw,120px)
```

Accent is used sparingly: the "++" in the logo, "//" label markers, the primary CTA, and the one closing CTA block. Errors use primary text, not accent.

Component classes (globals.css): `container-page` (via `Container`), `py-section`, `intro-grid` (220px label column + content, stacks under 760px), `label` (mono 12px uppercase with accent "//"), `meta`, `h-hero`, `h-page`, `h-section`, `h-card`, `statement` (+ `.muted` span), `body`, `text-link`, `btn` + `btn-solid | btn-accent | btn-outline | btn-dark` (+ `btn-sm | btn-lg`), `tag`, `card` (20px radius), `cta-block` (28px radius), `field`. Sub-pages use `PageHeader` for the label/title/two-tone intro.

## Typography rules

- **Inter Tight** (600–800, tight negative tracking) for headings, wordmark, big numbers, and the statement paragraph.
- **Inter** (400/500) for body, nav links and button labels.
- **JetBrains Mono** for labels/meta only: section labels, tags, event dates/times, footer copyright.
- **Sentence case** for body, buttons, and most UI. **Title Case** for event titles. **Tracked uppercase** for labels.
- Do not use snake_case in displayed text. Do not use lowercase as a stylistic choice (that direction was rejected in design review).

## Repo structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Home
│   ├── events/page.tsx
│   ├── team/page.tsx
│   ├── sponsors/page.tsx
│   ├── join/page.tsx
│   ├── rsvp-help/page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── layout/   # Nav, Footer, Container
│   ├── home/     # Hero, CampusGrid, StatsBlock, FeaturedEvent
│   ├── events/   # EventList, EventCard, EventCardExpanded, EventMeta
│   ├── team/
│   ├── sponsors/
│   ├── shared/   # Button, Section, MarkdownContent, Badge
│   └── ui/       # shadcn-generated
├── lib/
│   ├── content.ts    # MDX loaders (team, pages, sponsors)
│   ├── events.ts     # Event-specific helpers
│   ├── types.ts      # Event, TeamMember, Sponsor, Campus
│   └── utils.ts
├── styles/
│   ├── globals.css   # Tailwind directives + base
│   └── tokens.css    # CSS custom properties
content/
├── team/         # One MDX file per eboard member
├── sponsors/
│   └── pitch.mdx
└── pages/
    └── hackathon.mdx
data/
├── stats.json    # Membership counts, manually updated
├── campuses.json # CUNY campus list with member counts
└── sponsors.json # Past/current sponsors
public/
├── favicon.ico
├── favicon.svg
├── apple-touch-icon.png
├── og-image.png
└── logo.svg
```

## Component conventions

- All components use **named exports**, not default exports. (Easier refactoring, better IDE support.)
- Server components by default. Add `'use client'` only when needed (interactivity, hooks).
- Props interfaces defined inline in the component file as `Props`, not extracted to types files (unless reused).
- Tailwind classes ordered roughly: layout → spacing → typography → color → state. Use `clsx` or `cn` from shadcn for conditional classes.

## Content conventions

- **Events come from the CampusGroups ICS feed, not MDX.** See `src/lib/events.ts` (feed URL is `EVENTS_FEED_URL`). It's fetched server-side and revalidated hourly. There is no `content/events/`.
- Cover priority: custom upload (admin, `event_covers` table, keyed by CampusGroups event id) → scraped `og:image` from the RSVP page (club-logo fallback ignored) → placeholder. The scraped image can vanish, so upload a custom cover for events that matter.
- The feed hides event location from anonymous fetches, so cards say "Location on CampusGroups". Put the location in the event description if it matters.
- **Photos** never go in the repo. Host on Cloudinary (or similar) and reference by URL. Repo stays small, no binary bloat.

## Admin and Supabase

- `/admin/*` shows the Google sign-in button when signed out; non-admin accounts see "Not authorized". Pages: `/admin/opportunities`, `/admin/covers` (per-event cover upload and event-type override; the override replaces the CampusGroups type and feeds the feedback form).
- **RLS is the security boundary**, not the UI. Anyone can read; only emails in the `admins` table can write (`is_admin()` in `supabase/migrations/0001_admin.sql`). Add an officer with `insert into public.admins values ('email@example.com');` (lowercase).
- Every new table or storage bucket **must** enable RLS with explicit policies. After any schema change run `scripts/check-rls.sh` (anon key must be unable to write).
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. No service-role key anywhere; writes run as the signed-in user.
- Public pages use `publicClient()` (cookie-less) so they stay static/ISR; session-aware `createSupabaseServerClient()` is for admin only. Server actions must call `requireAdmin()`.
- `src/lib/opportunity-meta.ts` is client-safe; `src/lib/opportunities.ts` (loader) is server-only. Don't import the loader from client components.
- Opportunities page (`/opportunities`) is a feed: category chips, deadlines, expired posts hidden automatically.
- Opportunities can be bulk-imported from pasted CSV/TSV in the admin (`src/lib/opportunity-csv.ts`). All validation lives in `src/lib/opportunity-validate.ts`, shared by the form and the import; keep it in sync with the DB check constraints.

## Build order

v1 implementation should proceed in this order — finish each step before moving to the next:

1. Project init: Next.js, TypeScript, Tailwind, shadcn/ui setup. Verify dev server runs.
2. Design tokens: `tokens.css`, Tailwind config extending with these tokens, fonts loaded (Google Fonts for Urbanist and JetBrains Mono).
3. Layout shell: `layout.tsx`, Nav, Footer, base styles, dark mode as default.
4. Home page: Hero, Stats, CampusGrid, FeaturedEvent placeholder. Match `mockup.html` aesthetic.
5. Content infrastructure: `lib/content.ts`, types, MDX setup with `next-mdx-remote` or built-in MDX support.
6. Events page: EventCard with inline expansion, reading from the CampusGroups ICS feed. **Done.**
7. Other pages: Team (MDX per member), Sponsors, Join, RSVP Help.
8. Polish: metadata, OG image, 404 page, favicons, mobile QA.

Each step should produce a working, deployable site. Do not skip ahead.

## Out of scope for v1

If asked to add any of these, push back and confirm — they are v2:
- Member signup, member login, member profiles or directory
- Membership cards
- Member-only resources
- Project showcase
- Wins feed

Exception pulled into v1: an **officer-only admin** (Supabase + Google sign-in) for the opportunities feed and custom event covers. See "Admin and Supabase" below. It is not a member account system.

## Key design decisions (don't relitigate)

These were debated during planning and decided. Don't propose alternatives without explicit reason:

- **CampusGroups is the only RSVP system.** The site links out to CampusGroups for RSVPs; we do not build a parallel RSVP form.
- **Events use cards with inline expansion**, not per-event detail pages. The expanded content (the feed description) renders on the events page, not on its own route.
- **No `/events/[slug]` routes** in v1. Only the home page and `/events` read event data.
- **Membership stats are a JSON file** updated manually. No CampusGroups API integration.
- **Dark mode is the default and only mode** for now. We're not building a light/dark toggle.

## Working style

- When in doubt about a design decision, follow "Design system" above (not `mockup.html`).
- Before adding a new dependency, ask. Prefer using what's already installed (Tailwind, shadcn primitives).
- After non-trivial changes, run `npm run build` to catch type errors and build issues before claiming work is done.
- Don't auto-commit. Show me what you've changed and let me commit.
