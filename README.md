# mhcplus.plus

The offical club website for **MHC++**, the inter-CUNY computer science club based at Macaulay Honors College.

---

## About

This is the codebase for [mhcplus.plus](https://mhcplus.plus), MHC++'s public website and member platform.

The site has two primary audiences:

1. **Students**: current and prospective members across CUNY who want to know what MHC++ is, what we do, and how to get involved.
2. **Sponsors and partners**: companies and organizations evaluating MHC++ as a recruiting pipeline or event partner.


---

## Key Features

**Pages**

- **Home**: hero, mission, map of CUNY campuses, key stats, upcoming event highlight, calls to action.
- **About**: origin story, the inter-CUNY mission, why we exist.
- **Events**: view upcoming and past events
- **Team**: current eboard with bios, campuses, and headshots
- **Sponsors & Partners**: pitch for prospective sponsors, current/past partners, contact
- **Join**: clear criteria for membership, Discord link, CampusGroups guidance and registration

<!-- **More features**

- **Auth**: sign up with CUNY email/password
- **Member profiles**: campus, year, major, bio, links (GitHub, LinkedIn, personal site), optional photo
- **Virtual membership card**: generated on signup, designed to feel collectible and shareable. Shows member ID, campus, join date, and stats. Doubles as a profile preview. Badges and achievements
- **Member directory**: searchable, filterable by campus and other attributes. Logged-in members only by default.
- **Member-only resources**: interview prep, alumni contacts, internship leads
- **Member wins feed**: curated highlights of member achievements (internships, full-time offers, hackathon wins, research, etc.)
- **Project showcase**: members can post what they're building; doubles as a recruiting signal for sponsors -->

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js** (App Router) + TypeScript | Treated as a mostly-static site for now |
| Styling | **Tailwind CSS** | |
| Components | **shadcn/ui** | Use these instead of building from scratch |
| Content | **MDX** files in the repo | Events, team, sponsors authored as markdown |
| Hosting | **Vercel**  | Requires public org repo |
| Domain | **mhcplus.plus** | Registered with Porkbun |
<!-- | Auth (v2) | **Supabase Auth** | Google OAuth + email/password |
| Database (v2) | **Supabase** (Postgres) | Same project as auth |
| File storage (v2) | **Supabase Storage** | Profile photos, project screenshots | -->
---

## Design

- **Guidelines** light mode, sans serif, modern minimal
- **Typography:** Urbanist
- **Primary color:** `#DB3314`

---

## Repository structure


---

## Getting started


---

## Contributing

---

## Operational notes

---

## License

