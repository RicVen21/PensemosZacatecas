# Pensemos Zacatecas — Propuestas ciudadanas

Sitio público donde cualquier persona puede enviar una propuesta ciudadana en
uno de ocho temas, y ver las propuestas ya aprobadas de cada tema. Construido
con Next.js (App Router) y Supabase, pensado para desplegarse en Vercel.

## Stack

- **Next.js 16** (App Router, Server Actions, TypeScript)
- **Tailwind CSS v4** para el diseño responsive
- **Supabase** (Postgres + RLS) como backend, sin autenticación de usuarios

## Variables de entorno

Copia `.env.example` a `.env.local` y complétalo con las credenciales del
proyecto de Supabase (Project Settings → API):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-o-publishable
```

Estas mismas dos variables se configuran en Vercel (Project Settings →
Environment Variables) para producción, preview y development.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Base de datos (Supabase)

El proyecto ya tiene provisionado un proyecto de Supabase (`pensemos-zacatecas`,
región `us-east-2`) con:

- **Tabla `propuestas`**: `id` (folio `PROP-AAAA-NNNNNN`), `categoria_slug`,
  `categoria_nombre`, `situacion`, `causa`, `propuesta`, `nombre`,
  `municipio`, `contacto`, `fecha_envio`, `estado_moderacion`
  (`pendiente` | `aprobada` | `rechazada`).
- **Folio automático**: un trigger `BEFORE INSERT` genera el `id` a través de
  `generar_folio_propuesta()`, que lleva un consecutivo por año en la tabla
  `propuestas_contadores`. El mismo trigger fuerza `fecha_envio = now()` y
  `estado_moderacion = 'pendiente'` en cada envío, sin importar lo que mande
  el cliente.
- **Envío público**: el formulario llama al RPC `crear_propuesta(...)`
  (`SECURITY DEFINER`), que inserta la fila y devuelve solo el folio. Esto
  evita exponer el resto de la fila (que sigue sin ser visible por RLS hasta
  que se aprueba).
- **RLS**: el rol `anon` puede insertar (vía el RPC) pero solo puede leer
  filas con `estado_moderacion = 'aprobada'`.

### Moderar propuestas

No hay panel de moderación: se revisa y aprueba directamente desde el
**Table Editor** de Supabase, cambiando `estado_moderacion` de `pendiente` a
`aprobada` (o `rechazada`). Solo las propuestas `aprobada` aparecen en
`/propuestas/[categoria]/ver`.

Para replicar el esquema en otro proyecto de Supabase, corre las migraciones
en `supabase/migrations/` (en orden) desde el SQL Editor, o con la CLI de
Supabase.

## Despliegue en Vercel

1. Sube este repositorio a GitHub.
2. En Vercel: **Add New → Project**, importa el repositorio.
3. Framework Preset: **Next.js** (detectado automáticamente).
4. Agrega las variables de entorno `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Deploy. Cada push a `main` vuelve a desplegar automáticamente.

## Estructura

```
src/
  app/
    page.tsx                       Home — ocho categorías
    propuestas/[slug]/page.tsx     Formulario de propuesta por categoría
    propuestas/[slug]/gracias/     Confirmación con folio
    propuestas/[slug]/ver/         Propuestas aprobadas de la categoría
  components/                      Header, Footer, formulario, etc.
  lib/
    categorias.ts                  Contenido de las 8 categorías + municipios
    actions.ts                     Server Action: valida y envía a Supabase
    supabase.ts                    Cliente de Supabase (anon key)
    database.types.ts              Tipos de la tabla propuestas
supabase/migrations/                Historial de migraciones SQL aplicadas
```
