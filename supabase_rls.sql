-- MigrAI dashboard: read-only access for authenticated users.
-- Run once in the Supabase SQL Editor after reviewing the statements.

begin;

-- The browser must never use anon access for MigrAI data.
revoke all on schema migrai from anon;
revoke all on all tables in schema migrai from anon;

-- Authenticated dashboard users receive read-only privileges.
grant usage on schema migrai to authenticated;
revoke all on all tables in schema migrai from authenticated;
grant select on table
  migrai.pipeline_runs,
  migrai.forecasts,
  migrai.observed,
  migrai.latest_run_by_level,
  migrai.runs,
  migrai.forecasts_latest,
  migrai.observed_latest
to authenticated;

-- Views created by postgres bypass RLS unless they use invoker security.
alter view migrai.latest_run_by_level set (security_invoker = true);
alter view migrai.runs set (security_invoker = true);
alter view migrai.forecasts_latest set (security_invoker = true);
alter view migrai.observed_latest set (security_invoker = true);

alter table migrai.pipeline_runs enable row level security;
alter table migrai.forecasts enable row level security;
alter table migrai.observed enable row level security;

drop policy if exists dashboard_authenticated_read on migrai.pipeline_runs;
create policy dashboard_authenticated_read
  on migrai.pipeline_runs
  for select
  to authenticated
  using ((select auth.uid()) is not null);

drop policy if exists dashboard_authenticated_read on migrai.forecasts;
create policy dashboard_authenticated_read
  on migrai.forecasts
  for select
  to authenticated
  using ((select auth.uid()) is not null);

drop policy if exists dashboard_authenticated_read on migrai.observed;
create policy dashboard_authenticated_read
  on migrai.observed
  for select
  to authenticated
  using ((select auth.uid()) is not null);

commit;

