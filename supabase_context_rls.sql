-- migrAI: lectura autenticada de contexto descriptivo; solo objetos nuevos.
-- No altera las políticas ni permisos de las vistas/tablas actuales.

begin;

grant usage on schema migrai to authenticated;

revoke all on table
  migrai.context_observations,
  migrai.context_observations_latest
from anon, authenticated;

grant select on table
  migrai.context_observations,
  migrai.context_observations_latest
to authenticated;

alter view migrai.context_observations_latest set (security_invoker = true);
alter table migrai.context_observations enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'migrai'
      and tablename = 'context_observations'
      and policyname = 'dashboard_authenticated_read'
  ) then
    execute 'create policy dashboard_authenticated_read on migrai.context_observations '
         || 'for select to authenticated using ((select auth.uid()) is not null)';
  end if;
end $$;

commit;
