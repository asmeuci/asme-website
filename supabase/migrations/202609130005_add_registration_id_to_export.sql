-- Include the internal registration UUID in organizer CSV exports.
create or replace view public.network_registration_export
with (security_invoker = true)
as
select
  r.created_at as registered_at,
  r.first_name,
  r.last_name,
  r.email,
  case r.tier
    when 'no_meal' then 'No Meal'
    when 'meal' then 'Meal'
    else r.tier
  end as ticket,
  r.payment_status,
  c1.name as company_choice_1,
  c2.name as company_choice_2,
  c3.name as company_choice_3,
  r.resume_original_name,
  r.resume_path,
  r.paid_at,
  r.dietary_restrictions,
  r.id as registration_id
from public.network_registrations r
left join public.network_companies c1
  on r.company_preference_1 = c1.id
left join public.network_companies c2
  on r.company_preference_2 = c2.id
left join public.network_companies c3
  on r.company_preference_3 = c3.id;

revoke all on public.network_registration_export from anon, authenticated;
grant select on public.network_registration_export to service_role;
