# migrAI Dashboard

Dashboard estático y privado para consultar los resultados del pipeline de migrAI almacenados en Supabase.

## Seguridad

- GitHub Pages contiene únicamente la URL del proyecto y la `publishable key`, que están diseñadas para ejecutarse en el navegador.
- No se almacenan claves `secret`, `service_role`, contraseñas de PostgreSQL ni `DATABASE_URL`.
- El acceso a los datos depende de Supabase Auth y de las políticas RLS de `supabase_rls.sql`.
- El dashboard solo realiza operaciones de lectura. Para producción consulta `runs`, `forecasts_latest` y `observed_latest`; las nuevas secciones consumen `backtest_predictions_latest`, `backtest_metrics_latest`, `backtest_entity_metrics_latest` y `context_observations_latest`.
- Si las vistas de backtesting o contexto aún no existen o no están accesibles, las secciones muestran estados vacíos explicativos y el dashboard de producción sigue funcionando.

## Publicación

GitHub Pages sirve la rama `main` desde la raíz del repositorio:

<https://marionajuny.github.io/migrai-dashboard/>

## Configuración de Supabase

1. Exponer el esquema `migrai` en la Data API.
2. Exponer solo estas vistas en la Data API: `runs`, `forecasts_latest`, `observed_latest`, `backtest_predictions_latest`, `backtest_metrics_latest`, `backtest_entity_metrics_latest` y `context_observations_latest`.
3. Mantener desactivada la exposición automática de tablas nuevas. No exponer las tablas base de backtesting o contexto.
4. Para los objetos de producción existentes, revisar y ejecutar `supabase_rls.sql` en el SQL Editor. Para las nuevas tablas/vistas, aplicar las migraciones del repositorio del pipeline y después `supabase_backtest_rls.sql` y `supabase_context_rls.sql`.
5. Las migraciones, los permisos RLS y la exposición en Data API son cambios separados. Revisarlos y autorizarlos antes de aplicarlos. El pipeline mensual no crea las nuevas tablas/vistas: las ignora hasta que la migración se haya aplicado; por tanto puede seguir cargando los forecasts actuales.
6. Mantener desactivados los registros públicos y el acceso anónimo. No exponer claves `service_role` ni `DATABASE_URL`.

## Desarrollo local

El proyecto no requiere compilación. Puede servirse con cualquier servidor HTTP estático, por ejemplo:

```bash
python3 -m http.server 8000
```

Después abre <http://localhost:8000>. Para probar los enlaces de recuperación en local, añade temporalmente esa URL a las Redirect URLs de Supabase.
