import type { Metadata } from "next";
import { cerrarSesion, moderarPropuesta } from "@/lib/adminActions";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { PropuestaRow } from "@/lib/database.types";

export const metadata: Metadata = { title: "Moderación · Pensemos Zacatecas" };
export const dynamic = "force-dynamic";

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ModeracionPage() {
  let propuestas: PropuestaRow[] | null = null;
  let mensajeError: string | null = null;

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("propuestas")
      .select("*")
      .eq("estado_moderacion", "pendiente")
      .order("fecha_envio", { ascending: true });

    if (error) throw new Error(error.message);
    propuestas = data as PropuestaRow[];
  } catch (err) {
    mensajeError = err instanceof Error ? err.message : "Error desconocido.";
  }

  return (
    <div className="px-6 py-10 sm:px-10 lg:px-[60px]">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-marino sm:text-3xl">
            Propuestas pendientes
          </h1>
          <p className="mt-1 text-sm text-ink-mute">
            {propuestas ? `${propuestas.length} en cola` : ""}
          </p>
        </div>
        <form action={cerrarSesion}>
          <button
            type="submit"
            className="border border-line-strong px-4 py-2 text-sm font-semibold text-ink-softer hover:border-marino hover:text-marino"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      {mensajeError && (
        <div className="border-l-[3px] border-rojo bg-rojo-soft px-3.5 py-3 text-sm text-rojo-text">
          No se pudieron cargar las propuestas pendientes: {mensajeError}
        </div>
      )}

      {!mensajeError && propuestas && propuestas.length === 0 && (
        <p className="text-ink-soft">No hay propuestas pendientes de moderación.</p>
      )}

      {!mensajeError && propuestas && propuestas.length > 0 && (
        <div className="overflow-x-auto border border-line-card">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line-card bg-cream-soft font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute">
                <th className="px-4 py-3 font-medium">Folio</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Contenido</th>
                <th className="px-4 py-3 font-medium">Autor</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {propuestas.map((p) => (
                <tr key={p.id} className="border-b border-line-soft align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-ink-mute">{p.id}</td>
                  <td className="px-4 py-4 text-ink-softer">{p.categoria_nombre}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-ink-mute">{formatearFecha(p.fecha_envio)}</td>
                  <td className="min-w-[320px] px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Campo etiqueta="Observa" texto={p.situacion} />
                      <Campo etiqueta="Cree que se debe a" texto={p.causa} />
                      <Campo etiqueta="Propone" texto={p.propuesta} />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-ink-mute">
                    <div>{p.nombre || "Anónimo"}</div>
                    {p.municipio && <div>{p.municipio}</div>}
                    {p.contacto && <div className="text-xs">{p.contacto}</div>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <form action={moderarPropuesta.bind(null, p.id, "aprobada")}>
                        <button
                          type="submit"
                          className="w-full bg-marino px-3 py-2 text-xs font-semibold text-white hover:bg-marino-dark"
                        >
                          Aprobar
                        </button>
                      </form>
                      <form action={moderarPropuesta.bind(null, p.id, "rechazada")}>
                        <button
                          type="submit"
                          className="w-full border border-line-strong px-3 py-2 text-xs font-semibold text-ink-softer hover:border-rojo hover:text-rojo"
                        >
                          Rechazar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Campo({ etiqueta, texto }: { etiqueta: string; texto: string }) {
  return (
    <div>
      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-rojo">{etiqueta}</span>
      <p className="text-[13px] leading-snug text-ink-softer">{texto}</p>
    </div>
  );
}
