-- Run once in the Supabase SQL editor.
-- Admin access is an email allowlist enforced by RLS: the UI checks are for UX only.

create table if not exists public.admins (
  email text primary key check (email = lower(email))
);
alter table public.admins enable row level security;
-- No policies: nobody can read or write `admins` through the API.
-- Manage it from the SQL editor: insert into public.admins values ('officer@example.com');

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Opportunities ---------------------------------------------------------------
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  org text not null check (char_length(org) between 1 and 120),
  url text not null check (url ~* '^https?://' and char_length(url) <= 2000),
  description text not null default '' check (char_length(description) <= 1500),
  category text not null
    check (category in ('internship','mentorship','cuny_program','scholarship','other')),
  deadline date,
  posted_at timestamptz not null default now(),
  published boolean not null default true
);
create index if not exists opportunities_posted_at_idx
  on public.opportunities (posted_at desc);
alter table public.opportunities enable row level security;

create policy "public reads published opportunities" on public.opportunities
  for select using (published or public.is_admin());
create policy "admins insert opportunities" on public.opportunities
  for insert to authenticated with check (public.is_admin());
create policy "admins update opportunities" on public.opportunities
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete opportunities" on public.opportunities
  for delete to authenticated using (public.is_admin());

-- Event covers ----------------------------------------------------------------
-- Keyed by the CampusGroups numeric event id (see rsvpId() in src/lib/events.ts).
create table if not exists public.event_covers (
  event_id text primary key check (event_id ~ '^[0-9]+$'),
  image_url text not null check (image_url ~* '^https://'),
  updated_at timestamptz not null default now()
);
alter table public.event_covers enable row level security;

create policy "public reads event covers" on public.event_covers
  for select using (true);
create policy "admins insert event covers" on public.event_covers
  for insert to authenticated with check (public.is_admin());
create policy "admins update event covers" on public.event_covers
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete event covers" on public.event_covers
  for delete to authenticated using (public.is_admin());

-- Storage: public-read bucket, admin-only writes -------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-covers', 'event-covers', true, 5242880,
        array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create policy "admins upload covers" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'event-covers' and public.is_admin());
create policy "admins update covers" on storage.objects
  for update to authenticated
  using (bucket_id = 'event-covers' and public.is_admin())
  with check (bucket_id = 'event-covers' and public.is_admin());
create policy "admins delete covers" on storage.objects
  for delete to authenticated
  using (bucket_id = 'event-covers' and public.is_admin());

-- Event type overrides ---------------------------------------------------------
-- Replaces the CampusGroups type (or the title-keyword guess) for one event.
-- Drives the feedback form's wording. Values mirror src/lib/event-types.ts.
create table if not exists public.event_types (
  event_id text primary key check (event_id ~ '^[0-9]+$'),
  event_type text not null
    check (event_type in ('workshop','hackathon','panel','talk','tour','social','event')),
  updated_at timestamptz not null default now()
);
alter table public.event_types enable row level security;

create policy "public reads event types" on public.event_types
  for select using (true);
create policy "admins insert event types" on public.event_types
  for insert to authenticated with check (public.is_admin());
create policy "admins update event types" on public.event_types
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete event types" on public.event_types
  for delete to authenticated using (public.is_admin());
