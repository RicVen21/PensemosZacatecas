-- Per-year consecutivo counter for folio generation
create table if not exists propuestas_contadores (
  anio int primary key,
  consecutivo int not null default 0
);

alter table propuestas_contadores enable row level security;

create or replace function generar_folio_propuesta()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  anio_actual int := extract(year from now());
  nuevo_consecutivo int;
begin
  insert into propuestas_contadores (anio, consecutivo)
  values (anio_actual, 1)
  on conflict (anio) do update set consecutivo = propuestas_contadores.consecutivo + 1
  returning consecutivo into nuevo_consecutivo;

  return 'PROP-' || anio_actual || '-' || lpad(nuevo_consecutivo::text, 6, '0');
end;
$$;

create table if not exists propuestas (
  id text primary key,
  categoria_slug text not null,
  categoria_nombre text not null,
  situacion text not null,
  causa text not null,
  propuesta text not null,
  nombre text,
  municipio text,
  contacto text,
  fecha_envio timestamptz not null default now(),
  estado_moderacion text not null default 'pendiente'
    check (estado_moderacion in ('pendiente', 'aprobada', 'rechazada'))
);

create index if not exists idx_propuestas_categoria_estado_fecha
  on propuestas (categoria_slug, estado_moderacion, fecha_envio desc);

-- Server-controlled fields: id, fecha_envio and estado_moderacion are always
-- set here, ignoring whatever the client sends, so a public anon insert can't
-- forge a folio, backdate a submission, or self-approve.
create or replace function propuestas_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.id := generar_folio_propuesta();
  new.fecha_envio := now();
  new.estado_moderacion := 'pendiente';
  return new;
end;
$$;

drop trigger if exists trg_propuestas_before_insert on propuestas;
create trigger trg_propuestas_before_insert
before insert on propuestas
for each row execute function propuestas_before_insert();

alter table propuestas enable row level security;

drop policy if exists "Cualquiera puede enviar una propuesta" on propuestas;
create policy "Cualquiera puede enviar una propuesta"
  on propuestas for insert
  to anon
  with check (true);

drop policy if exists "Cualquiera puede leer propuestas aprobadas" on propuestas;
create policy "Cualquiera puede leer propuestas aprobadas"
  on propuestas for select
  to anon
  using (estado_moderacion = 'aprobada');

revoke execute on function generar_folio_propuesta() from public, anon, authenticated;

-- Public insert path: SECURITY DEFINER so it can return the generated folio
-- without needing the fresh (still-pending) row to be visible under the
-- anon SELECT policy above, which only exposes approved rows.
create or replace function crear_propuesta(
  p_categoria_slug text,
  p_categoria_nombre text,
  p_situacion text,
  p_causa text,
  p_propuesta text,
  p_nombre text default null,
  p_municipio text default null,
  p_contacto text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  nuevo_id text;
begin
  insert into propuestas (categoria_slug, categoria_nombre, situacion, causa, propuesta, nombre, municipio, contacto)
  values (p_categoria_slug, p_categoria_nombre, p_situacion, p_causa, p_propuesta, p_nombre, p_municipio, p_contacto)
  returning id into nuevo_id;

  return nuevo_id;
end;
$$;

revoke execute on function crear_propuesta(text, text, text, text, text, text, text, text) from public;
grant execute on function crear_propuesta(text, text, text, text, text, text, text, text) to anon;
