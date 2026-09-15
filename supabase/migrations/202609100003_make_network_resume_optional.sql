-- Allow a participant to register without submitting a resume.
begin;

alter table public.network_registrations
  alter column resume_path drop not null,
  alter column resume_original_name drop not null,
  alter column resume_size_bytes drop not null,
  alter column resume_mime_type drop not null,
  alter column resume_mime_type drop default;

commit;
