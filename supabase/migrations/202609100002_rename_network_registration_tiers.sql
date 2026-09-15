-- Rename the existing registration tier values without deleting registrations.
begin;

alter table public.network_registrations
  drop constraint if exists network_registrations_tier_check;

update public.network_registrations
set tier = case tier
  when 'member' then 'no_meal'
  when 'nonmember' then 'meal'
  else tier
end
where tier in ('member', 'nonmember');

alter table public.network_registrations
  add constraint network_registrations_tier_check
  check (tier in ('no_meal', 'meal'));

commit;
