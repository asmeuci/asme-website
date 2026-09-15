-- Network With ASME registration storage.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
--
-- The browser will not access these tables or resumes directly. The website's
-- Vercel API will use a server-only Supabase secret key, which keeps participant
-- data and resumes private.

begin;

create extension if not exists pgcrypto;

-- Dropdown choices live in their own table so organizers can add, rename,
-- reorder, or deactivate companies later from Supabase's Table Editor.
create table if not exists public.network_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 1 and 150),
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.network_companies is
  'Companies available in the ranked Network With ASME preference dropdowns.';

insert into public.network_companies (name, display_order)
values
  ('Company A', 10),
  ('Company B', 20),
  ('Company C', 30),
  ('Company D', 40),
  ('Company E', 50)
on conflict (name) do nothing;

create table if not exists public.network_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  first_name text not null check (char_length(first_name) between 1 and 100),
  last_name text not null check (char_length(last_name) between 1 and 100),
  email text not null check (
    char_length(email) between 3 and 254
    and position('@' in email) > 1
  ),

  -- Ranked preferences. Choice 1 is required; choices 2 and 3 can be optional.
  company_preference_1 uuid not null references public.network_companies(id),
  company_preference_2 uuid references public.network_companies(id),
  company_preference_3 uuid references public.network_companies(id),

  -- The actual PDF is stored in the private network-resumes bucket.
  resume_path text unique,
  resume_original_name text,
  resume_size_bytes integer check (
    resume_size_bytes > 0 and resume_size_bytes <= 2097152
  ),
  resume_mime_type text
    check (resume_mime_type = 'application/pdf'),

  tier text not null check (tier in ('no_meal', 'meal')),
  dietary_restrictions text check (char_length(dietary_restrictions) <= 500),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'expired', 'refunded')),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  paid_at timestamptz,

  constraint network_registrations_distinct_preferences check (
    (company_preference_2 is null or company_preference_2 <> company_preference_1)
    and (
      company_preference_3 is null
      or (
        company_preference_3 <> company_preference_1
        and (
          company_preference_2 is null
          or company_preference_3 <> company_preference_2
        )
      )
    )
  )
);

comment on table public.network_registrations is
  'Participant registration, ranked company preferences, resume reference, and Stripe payment state.';

create index if not exists network_registrations_email_idx
  on public.network_registrations (lower(email));

create index if not exists network_registrations_payment_status_idx
  on public.network_registrations (payment_status);

-- Stripe can retry the same webhook. Recording event IDs lets the future
-- webhook handler safely ignore a duplicate delivery.
create table if not exists public.stripe_webhook_events (
  stripe_event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);

create or replace function public.set_network_registration_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  create trigger set_network_registration_updated_at
  before update on public.network_registrations
  for each row execute function public.set_network_registration_updated_at();
exception
  when duplicate_object then
    null;
end;
$$;

-- RLS starts closed. No public policies are created: only trusted backend code
-- using the server-only secret key can read or write registration information.
alter table public.network_companies enable row level security;
alter table public.network_registrations enable row level security;
alter table public.stripe_webhook_events enable row level security;

revoke all on table public.network_companies from anon, authenticated;
revoke all on table public.network_registrations from anon, authenticated;
revoke all on table public.stripe_webhook_events from anon, authenticated;

grant select, insert, update, delete on table public.network_companies to service_role;
grant select, insert, update, delete on table public.network_registrations to service_role;
grant select, insert, update, delete on table public.stripe_webhook_events to service_role;

-- Private PDF-only resume bucket with a 2 MiB per-file limit.
insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'network-resumes',
  'network-resumes',
  false,
  2097152,
  array['application/pdf']::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

commit;
