import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIAS, getCategoria } from "@/lib/categorias";
import { PropuestaForm } from "@/components/PropuestaForm";

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  return { title: categoria ? `${categoria.nombre} · Pensemos Zacatecas` : "Pensemos Zacatecas" };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  if (!categoria) notFound();

  return (
    <div className="px-6 py-12 sm:px-10 lg:px-[60px] lg:py-14">
      <Link
        href="/"
        className="mb-8 inline-block font-mono text-xs tracking-[0.1em] uppercase text-ink-softer hover:text-rojo"
      >
        ← Todas las categorías
      </Link>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-10">
          <span className="font-mono text-xs text-rojo">{categoria.num}</span>
          <h1 className="text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-marino [text-wrap:balance] sm:text-5xl">
            {categoria.nombre}
          </h1>
          <div className="h-0.5 max-w-[200px] bg-marino" />
          <p className="text-lg leading-relaxed text-ink-soft [text-wrap:pretty]">
            {categoria.larga}
          </p>
          <div className="mt-3 flex flex-col gap-3 border-t border-line-card pt-5 text-sm leading-relaxed text-ink-softer">
            <div className="flex gap-3">
              <span className="font-mono text-rojo">01</span>
              <span>No hace falta ser experto. Basta lo que vives y observas.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-rojo">02</span>
              <span>Puedes enviarla de forma anónima.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-rojo">03</span>
              <span>Entra a la agenda que publicamos rumbo a 2027.</span>
            </div>
          </div>
          <Link
            href={`/propuestas/${categoria.slug}/ver`}
            className="mt-2 inline-flex w-fit items-center gap-2 border border-line-strong px-4 py-2.5 text-sm font-semibold text-marino hover:border-marino"
          >
            Ver propuestas publicadas
          </Link>
        </div>

        <PropuestaForm categoria={categoria} />
      </div>
    </div>
  );
}
