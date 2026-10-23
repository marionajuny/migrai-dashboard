# Supabase: estado verificado y pendientes

**Última revisión de solo lectura: 18/10/2026.** No se han ejecutado scripts ni modificado objetos, datos, permisos o configuración de Supabase durante esta integración.

## Vistas ya disponibles

El esquema `migrai` expone las vistas que consume el dashboard:

- `observed_latest` y `forecasts_latest`: resultados de producción.
- `context_observations_latest`: observaciones contextuales de país y ciudad.
- `backtest_evaluations_latest`, `backtest_predictions_latest`, `backtest_metrics_latest` y `backtest_entity_metrics_latest`: procedencia del backtest, pares real/predicho y métricas de evaluación.

La inspección de solo lectura encontró `SELECT` permitido para `authenticated` y denegado para `anon` en las vistas nuevas. El cliente web usa Supabase Auth y la publishable key; no usa claves `secret`/`service_role` ni `DATABASE_URL`.

## Cobertura contextual observada

- País: 4.602 observaciones, 29 entidades, 10 indicadores, 2010–2025.
- Ciudad: 1.284 observaciones, 12 entidades, 8 indicadores, 2003–2026.
- Las filas publicadas tenían valor y metadatos de fuente. La cobertura temporal varía por indicador y entidad; el rango global no significa que todos los años estén cubiertos para cada serie.

## Backtesting disponible

- 519 pares completos real/predicho y registros en 5 grupos de nivel/horizonte.
- País: horizontes 1, 3 y 5; ciudad: horizontes 1 y 3.
- Hay métricas agregadas por horizonte y por entidad (MAE, RMSE y WAPE en el agregado; MAE/WAPE por entidad), además de recuentos de pares y folds.
- Son resultados del backtest de selección del modelo publicado, no un holdout independiente. No hay métrica MASE publicada y los intervalos de producción no incluyen un porcentaje de cobertura de backtest.
- La vista de evaluaciones contiene dos registros (país y ciudad), artefacto de origen, SHA-256, filas de origen/evaluadas/excluidas, regla de selección y alcance. El dashboard muestra estos metadatos sin presentar los artefactos como validación independiente.

## Pendiente real de datos

- Las vistas actuales no exponen un manifiesto de combinaciones entidad-año esperadas. Por eso la web puede mostrar años observados y huecos entre filas, pero no afirmar una completitud respecto al calendario esperado por el pipeline.
- `observed_latest` no expone fuente/dataset por fila para los flujos migratorios; el inventario contextual sí publica esas fuentes y se muestra separado para no atribuirlas erróneamente a los flujos.
- Falta enlazar cada evaluación de backtesting a su artefacto/run de pipeline mediante una referencia verificable; las métricas no se deben presentar como evaluación independiente.
- No recalcular ni volver a cargar datos mientras las vistas actuales sean suficientes. Si se añade en el futuro un manifiesto de cobertura o trazabilidad de run, diseñar primero la vista segura y validar su política antes de consumirla.

## Scripts del repositorio

`supabase_rls.sql`, `supabase_backtest_rls.sql` y `supabase_context_rls.sql` son referencias versionadas. No volver a ejecutarlas como parte de esta integración: la exposición y el acceso de lectura de las vistas se verificaron en la inspección indicada arriba. Cualquier cambio futuro de RLS, Data API o esquema requiere revisión específica y verificación posterior.

## Eurostat: integración de Social Impact

La nueva página del dashboard consulta `migrai.eurostat_dashboard_latest` con la sesión autenticada. La vista debe publicar las series curadas de arrivals, housing, health y education, junto con sus desgloses, unidad, geografía, estado de calidad y referencias de fuente. El cliente no consulta tablas de staging ni escribe datos.

Este cambio de frontend no ejecuta SQL ni altera Supabase. Antes de publicar la página en `main`, confirma que la vista existe en el mismo proyecto que usa el dashboard y que `SELECT` está concedido a `authenticated` pero no a `anon`; revisa también que solo se expongan las columnas curadas y que la vista conserve la política de acceso prevista para las tablas subyacentes. Si la vista o el permiso aún no está aplicado, la sección mostrará un estado de error y no debe intentarse un arreglo manual desde el dashboard.
