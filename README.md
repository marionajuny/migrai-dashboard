# migrAI Dashboard

Dashboard estático y privado para consultar los resultados del pipeline de migrAI almacenados en Supabase.

## Seguridad

- GitHub Pages contiene únicamente la URL del proyecto y la `publishable key`, que están diseñadas para ejecutarse en el navegador.
- No se almacenan claves `secret`, `service_role`, contraseñas de PostgreSQL ni `DATABASE_URL`.
- El acceso a los datos depende de Supabase Auth y de las políticas RLS de `supabase_rls.sql`.
- El dashboard solo realiza operaciones de lectura. Para producción consulta `runs`, `forecasts_latest` y `observed_latest`; las secciones de metodología/contexto y fiabilidad consultan `context_observations_latest`, `backtest_evaluations_latest`, `backtest_predictions_latest`, `backtest_metrics_latest` y `backtest_entity_metrics_latest`. La página `Social Impact` consulta la vista curada `eurostat_dashboard_latest` para mostrar las series históricas de Eurostat por país y subsección.
- Si las vistas de backtesting o contexto aún no existen o no están accesibles, las secciones muestran estados vacíos explicativos y el dashboard de producción sigue funcionando.
- La consulta de `runs` solicita columnas explícitas y no incluye `github_run_url`. Para retirarlo también de la vista de Supabase, hay que cambiar la vista en la base de datos.
- La página de metodología carga el inventario contextual bajo demanda y pagina las filas para respetar el límite de respuesta de la Data API. La cobertura publicada se presenta como rango observado; no se interpreta como cobertura completa si la base no expone un manifiesto de años esperados.

## Estructura del código

- `acceso.html`, `app.js`, `styles.css`: dashboard privado (siempre en inglés).
- `insights.js`: estadística y lecturas orientadas a decisión (comparación con modelo ingenuo, resúmenes, correlaciones, alertas, exportación CSV e informe imprimible en PDF). Se carga antes de `app.js` y usa su `state`.
- `i18n.js`: selector EN/ES/FR de la web pública (`index.html`, `planes.html`, `equipo.html`, `checkout.html`). El HTML fuente está en español y el inglés es el idioma por defecto. El dashboard no lo carga.
- `assets/europe-countries.geojson`: fronteras de Natural Earth (dominio público) recortadas a Europa y alojadas en el propio repositorio para no depender de un tercero.

## Publicación

GitHub Pages sirve la rama `main` desde la raíz del repositorio:

<https://marionajuny.github.io/migrai-dashboard/>

## Configuración de Supabase

1. Exponer el esquema `migrai` en la Data API.
2. Exponer solo estas vistas en la Data API: `runs`, `forecasts_latest`, `observed_latest`, `backtest_evaluations_latest`, `backtest_predictions_latest`, `backtest_metrics_latest`, `backtest_entity_metrics_latest`, `context_observations_latest` y `eurostat_dashboard_latest`.
3. Mantener desactivada la exposición automática de tablas nuevas. No exponer las tablas base de backtesting o contexto.
4. Antes de aplicar cualquier SQL, revisar el estado actual documentado en `SUPABASE_PENDING.md`. Ese archivo registra qué vistas y permisos ya se verificaron; las migraciones y los scripts de políticas del repositorio son referencias, no instrucciones para volver a ejecutarlos a ciegas.
5. Mantener desactivados los registros públicos y el acceso anónimo. No exponer claves `service_role` ni `DATABASE_URL`.

`eurostat_dashboard_latest` debe seguir siendo una vista de solo lectura con acceso exclusivo a usuarios autenticados. El dashboard filtra por subsección y país, pagina los resultados y no solicita tablas de staging ni credenciales privilegiadas. Esta integración del cliente no modifica por sí sola la vista, sus permisos ni el pipeline.

## Desarrollo local

El proyecto no requiere compilación. Puede servirse con cualquier servidor HTTP estático, por ejemplo:

```bash
python3 -m http.server 8000
```

Después abre <http://localhost:8000>. Para probar los enlaces de recuperación en local, añade temporalmente esa URL a las Redirect URLs de Supabase.
