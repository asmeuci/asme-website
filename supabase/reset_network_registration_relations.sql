-- Destructive reset for the Network With ASME database objects only.
-- This deletes all rows in these three tables by removing the tables themselves.
-- It does not delete the Supabase project or the private network-resumes bucket.

begin;

drop table if exists public.stripe_webhook_events;
drop table if exists public.network_registrations;
drop table if exists public.network_companies;
drop function if exists public.set_network_registration_updated_at();

commit;
