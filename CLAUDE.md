# Claude Code instructions for mhcplus.plus

This file is read automatically at the start of every Claude Code session. It captures decisions made during planning so you don't have to re-derive them.

## Project overview

This is the website for **MHC++**, the inter-CUNY CS club. See `README.md` for the full project brief, audiences, and roadmap.

We are currently building **v1**: a public, static, content-driven Next.js site. No auth, no database. v2 (auth, profiles, member features) ships in the fall.

## Reference materials in the repo

- **`mockup.html`** — Visual reference for the home page. The actual implementation should match this aesthetic closely: dark mode, Urbanist for content, JetBrains Mono for accents, square corners, glows, translucent panels with backdrop blur, `#DB3314` primary. Open this in a browser before making design decisions.
- **`README.md`** — Project brief and feature roadmap.
- **`mhcpp_icon.svg`** — Logo. Note: the SVG file uses `#F14323` as the square color; the canonical brand color is `#DB3314`. When using this logo inline, use `#DB3314`.

## Tech stack (locked)

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **MDX** for content (team, sponsors, about copy). Events come from the CampusGroups ICS feed instead.
- **`src/` directory** — yes, use `src/app/`, `src/components/`, etc.
- **Vercel** for hosting (free tier, spend limit configured)
- **Porkbun** for domain (`mhcplus.plus`)

## Design tokens

Use CSS custom properties in `src/styles/tokens.css` and reference them from Tailwind config so both work.

```
--primary: #DB3314
--primary-bright: #FF4525   /* hover, accent text on dark */
--primary-dim: #8A2010      /* subdued contexts */

--bg: #0A0A0B
--bg-elevated: #111113
--bg-card: #131316
--bg-card-hover: #18181C

--border: #1F1F23
--border-strong: #2A2A30
--border-bright: #3A3A42

--fg: #F4F4F5
--fg-muted: #9A9AA3
--fg-subtle: #5E5E66
--fg-dim: #3F3F46

--font-sans: 'Urbanist', system-ui, sans-serif
--font-mono: 'JetBrains Mono', 'Courier New', monospace

--radius-sm: 2px
--radius-md: 3px

--container: 1180px
```

## Typography rules

- **Urbanist** for content: headlines, body, event titles, nav links, brand wordmark, stat numbers, button labels
- **JetBrains Mono** for technical/label accents only: section eyebrows, stat labels ("Members", "Campuses"), event date badges, event meta info, sponsor strip label, footer copyright
- **Sentence case** for body, buttons, and most UI. **Title Case** for event titles. **Tracked uppercase** for eyebrow labels.
- Do not use snake_case in displayed text. Do not use lowercase as a stylistic choice (that direction was rejected in design review).

## Repo structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Home
│   ├── about/page.tsx
│   ├── events/page.tsx
│   ├── team/page.tsx
│   ├── sponsors/page.tsx
│   ├── join/page.tsx
│   ├── rsvp-help/page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── layout/   # Nav, Footer, Container
│   ├── home/     # Hero, CampusGrid, StatsBlock, FeaturedEvent, SponsorStrip
│   ├── events/   # EventList, EventCard, EventCardExpanded, EventMeta
│   ├── team/
│   ├── sponsors/
│   ├── shared/   # Button, Section, MarkdownContent, Badge
│   └── ui/       # shadcn-generated
├── lib/
│   ├── content.ts    # MDX loaders (team, about, sponsors)
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
    └── about.mdx
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
- Cover images are scraped from each event's CampusGroups RSVP page (`og:image`); the club-logo fallback is ignored. To get a cover on the site, upload it on the event in CampusGroups.
- The feed hides event location from anonymous fetches, so cards say "Location on CampusGroups". Put the location in the event description if it matters.
- **Photos** never go in the repo. Host on Cloudinary (or similar) and reference by URL. Repo stays small, no binary bloat.

## Build order

v1 implementation should proceed in this order — finish each step before moving to the next:

1. Project init: Next.js, TypeScript, Tailwind, shadcn/ui setup. Verify dev server runs.
2. Design tokens: `tokens.css`, Tailwind config extending with these tokens, fonts loaded (Google Fonts for Urbanist and JetBrains Mono).
3. Layout shell: `layout.tsx`, Nav, Footer, base styles, dark mode as default.
4. Home page: Hero, Stats, CampusGrid, FeaturedEvent placeholder, SponsorStrip. Match `mockup.html` aesthetic.
5. Content infrastructure: `lib/content.ts`, types, MDX setup with `next-mdx-remote` or built-in MDX support.
6. Events page: EventCard with inline expansion, reading from the CampusGroups ICS feed. **Done.**
7. Other pages: About (MDX-driven), Team (MDX per member), Sponsors, Join, RSVP Help.
8. Polish: metadata, OG image, 404 page, favicons, mobile QA.

Each step should produce a working, deployable site. Do not skip ahead.

## Out of scope for v1

If asked to add any of these, push back and confirm — they are v2:
- Authentication, signup, login
- Member profiles or directory
- Membership cards
- Database, Supabase integration
- Member-only resources
- Project showcase
- Wins feed
- Admin UI for officers

## Key design decisions (don't relitigate)

These were debated during planning and decided. Don't propose alternatives without explicit reason:

- **CampusGroups is the only RSVP system.** The site links out to CampusGroups for RSVPs; we do not build a parallel RSVP form.
- **Events use cards with inline expansion**, not per-event detail pages. The expanded content (the feed description) renders on the events page, not on its own route.
- **No `/events/[slug]` routes** in v1. Only the home page and `/events` read event data.
- **Membership stats are a JSON file** updated manually. No CampusGroups API integration.
- **Dark mode is the default and only mode** for now. We're not building a light/dark toggle.

## Working style

- When in doubt about a design decision, look at `mockup.html` first.
- Before adding a new dependency, ask. Prefer using what's already installed (Tailwind, shadcn primitives).
- After non-trivial changes, run `npm run build` to catch type errors and build issues before claiming work is done.
- Don't auto-commit. Show me what you've changed and let me commit.
