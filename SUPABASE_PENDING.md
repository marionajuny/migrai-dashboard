# Supabase: siguiente revisión conjunta

**Estado observado: 18/10/2026 · `migrAI` · `main PRODUCTION`. No se ha cambiado nada.**

- El esquema `migrai` contiene los 8 objetos actuales de producción; todavía no aparecen tablas ni vistas de contexto/backtesting.
- Las tablas actuales muestran marcas de exposición en Table Editor, mientras que la página de políticas muestra `API DISABLED` para `pipeline_runs` y `forecasts`. No asumir qué configuración prevalece: revisar Data API juntos antes de decidir.
- Hay una política de lectura `dashboard_authenticated_read` para usuarios `authenticated` en `pipeline_runs` y `forecasts`.

## Pendiente, en este orden

1. Revisar juntos la exposición actual de Data API sin abrir ni copiar claves.
2. Decidir si aplicamos las migraciones aditivas de contexto/backtesting y sus políticas RLS.
3. Solo después, importar las filas verificadas y exponer las vistas concretas que usa el dashboard.

No ejecutar SQL, cambiar permisos/exposición ni cargar datos en producción sin autorización explícita para ese paso.
