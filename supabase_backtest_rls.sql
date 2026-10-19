-- migrAI: acceso de solo lectura para la nueva capa de backtesting.
-- Afecta únicamente a estos objetos; no modifica las políticas existentes.

begin;

grant usage on schema migrai to authenticated;

revoke all on table
  migrai.backtest_evaluations,
  migrai.backtest_predictions,
  migrai.backtest_evaluations_latest,
  migrai.backtest_predictions_latest,
  migrai.backtest_metrics_latest,
  migrai.backtest_entity_metrics_latest
from anon, authenticated;

grant select on table
  migrai.backtest_evaluations,
  migrai.backtest_predictions,
  migrai.backtest_evaluations_latest,
  migrai.backtest_predictions_latest,
  migrai.backtest_metrics_latest,
  migrai.backtest_entity_metrics_latest
to authenticated;

alter view migrai.backtest_evaluations_latest set (security_invoker = true);
alter view migrai.backtest_predictions_latest set (security_invoker = true);
alter view migrai.backtest_metrics_latest set (security_invoker = true);
alter view migrai.backtest_entity_metrics_latest set (security_invoker = true);

alter table migrai.backtest_evaluations enable row level security;
alter table migrai.backtest_predictions enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'migrai'
      and tablename = 'backtest_evaluations'
      and policyname = 'dashboard_authenticated_read'
  ) then
    execute 'create policy dashboard_authenticated_read on migrai.backtest_evaluations '
         || 'for select to authenticated using ((select auth.uid()) is not null)';
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'migrai'
      and tablename = 'backtest_predictions'
      and policyname = 'dashboard_authenticated_read'
  ) then
    execute 'create policy dashboard_authenticated_read on migrai.backtest_predictions '
         || 'for select to authenticated using ((select auth.uid()) is not null)';
  end if;
end $$;

commit;
