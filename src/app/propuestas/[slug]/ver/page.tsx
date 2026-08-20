import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoria } from "@/lib/categorias";
import { getSupabaseClient } from "@/lib/supabase";
import type { PropuestaRow } from "@/lib/database.types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  return {
    title: categoria ? `Propuestas · ${categoria.nombre} · Pensemos Zacatecas` : "Pensemos Zacatecas",
  };
}

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function VerPropuestasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  if (!categoria) notFound();

  const { data, error } = await getSupabaseClient()
    .from("propuestas")
    .select("*")
    .eq("categoria_slug", categoria.slug)
    .eq("estado_moderacion", "aprobada")
    .order("fecha_envio", { ascending: false });

  const propuestas = data as PropuestaRow[] | null;

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-[60px] lg:py-14">
      <Link
        href={`/propuestas/${categoria.slug}`}
        className="mb-8 inline-block font-mono text-xs tracking-[0.1em] uppercase text-ink-softer hover:text-rojo"
      >
        ← Volver a {categoria.nombre}
      </Link>

      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-rojo">{categoria.num}</span>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.032em] text-marino sm:text-4xl">
            Propuestas · {categoria.nombre}
          </h1>
        </div>
        <Link
          href={`/propuestas/${categoria.slug}`}
          className="border border-line-strong px-4 py-2.5 text-sm font-semibold text-marino hover:border-marino"
        >
          Enviar la mía
        </Link>
      </div>

      {error && (
        <div className="border-l-[3px] border-rojo bg-rojo-soft px-3.5 py-3 text-sm text-rojo-text">
          No pudimos cargar las propuestas en este momento. Intenta de nuevo más tarde.
        </div>
      )}

      {!error && propuestas && propuestas.length === 0 && (
        <p className="text-lg leading-relaxed text-ink-soft">
          Todavía no hay propuestas publicadas en este tema. Sé la primera
          persona en{" "}
          <Link href={`/propuestas/${categoria.slug}`} className="font-semibold text-marino">
            enviar la tuya
          </Link>
          .
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {propuestas?.map((p) => (
          <article key={p.id} className="flex flex-col gap-4 border border-line-card bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-mute">
              <span>{p.id}</span>
              <span>{formatearFecha(p.fecha_envio)}</span>
            </div>

            <Detalle etiqueta="Observa" texto={p.situacion} />
            <Detalle etiqueta="Cree que se debe a" texto={p.causa} />
            <Detalle etiqueta="Propone" texto={p.propuesta} />

            <div className="mt-1 border-t border-line-soft pt-3 text-[13px] text-ink-mute">
              {p.nombre || "Anónimo"}
              {p.municipio ? ` · ${p.municipio}` : ""}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Detalle({ etiqueta, texto }: { etiqueta: string; texto: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-rojo">
        {etiqueta}
      </span>
      <p className="text-[15px] leading-relaxed text-ink-softer">{texto}</p>
    </div>
  );
}
