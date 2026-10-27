-- Phase 2 schema for Minecraft variants, youth safety and reports.
-- Not applied yet: Phase 1 still uses the seed catalog. Apply with the rest of auth/orders.

alter table if exists public.games
  add column if not exists audience_risk text not null default 'standard',
  add column if not exists legal_notice text;

alter table if exists public.guide_games
  add column if not exists variants text[] not null default '{}',
  add column if not exists platforms text[] not null default '{}',
  add column if not exists modded_experience boolean not null default false;

alter table if exists public.guides
  add column if not exists youth_cleared boolean not null default false;

alter table if exists public.orders
  add column if not exists variant text,
  add column if not exists game_version text,
  add column if not exists mod_setup jsonb,
  add column if not exists adult_present_confirmed boolean not null default false,
  add column if not exists world_backup_confirmed boolean not null default false,
  add column if not exists player_count integer;

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null,
  reporter_id uuid not null,
  category text not null,
  body text not null,
  status text not null default 'open',
  handled_by uuid,
  created_at timestamptz not null default now()
);

alter table public.reports enable row level security;

create policy reports_own_rows
  on public.reports
  for select
  using (auth.uid() = reporter_id);

create policy reports_admin_all
  on public.reports
  for all
  using (coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false));
