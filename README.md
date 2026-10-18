# migrAI Dashboard

Dashboard estático y privado para consultar los resultados del pipeline de migrAI almacenados en Supabase.

## Seguridad

- GitHub Pages contiene únicamente la URL del proyecto y la `publishable key`, que están diseñadas para ejecutarse en el navegador.
- No se almacenan claves `secret`, `service_role`, contraseñas de PostgreSQL ni `DATABASE_URL`.
- El acceso a los datos depende de Supabase Auth y de las políticas RLS de `supabase_rls.sql`.
- El dashboard solo realiza operaciones de lectura sobre `runs`, `forecasts_latest` y `observed_latest`.

## Publicación

GitHub Pages sirve la rama `main` desde la raíz del repositorio:

<https://marionajuny.github.io/migrai-dashboard/>

## Configuración de Supabase

1. Exponer el esquema `migrai` en la Data API.
2. Exponer solamente las vistas `runs`, `forecasts_latest` y `observed_latest`.
3. Desactivar la exposición automática de tablas nuevas.
4. Revisar y ejecutar `supabase_rls.sql` en el SQL Editor.
5. Mantener desactivados los registros públicos y los accesos anónimos.

## Desarrollo local

El proyecto no requiere compilación. Puede servirse con cualquier servidor HTTP estático, por ejemplo:

```bash
python3 -m http.server 8000
```

Después abre <http://localhost:8000>. Para probar los enlaces de recuperación en local, añade temporalmente esa URL a las Redirect URLs de Supabase.
