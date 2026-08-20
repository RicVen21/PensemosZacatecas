import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoria } from "@/lib/categorias";
import { LogoMark } from "@/components/LogoMark";
import { CompartirButton } from "@/components/CompartirButton";

export default async function GraciasPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ folio?: string }>;
}) {
  const { slug } = await params;
  const { folio } = await searchParams;
  const categoria = getCategoria(slug);
  if (!categoria || !folio) notFound();

  const textoCompartir = `Ya mandé mi propuesta para ${categoria.nombre}, ¿y tú? · Pensemos Zacatecas`;

  return (
    <div className="flex justify-center px-6 py-20 sm:px-10 lg:px-[60px] lg:py-28">
      <div className="flex w-full max-w-[720px] flex-col gap-6">
        <LogoMark size={74} />
        <h1 className="text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-marino [text-wrap:balance] sm:text-5xl lg:text-[58px]">
          Gracias por pensar en voz alta
        </h1>
        <div className="h-0.5 max-w-[260px] bg-marino" />
        <p className="max-w-[32em] text-lg leading-relaxed text-ink-soft [text-wrap:pretty] sm:text-[19px]">
          Tu propuesta en{" "}
          <strong className="font-semibold text-marino">{categoria.nombre}</strong>{" "}
          quedó registrada. La revisamos, la agrupamos por municipio y la
          publicamos junto con las demás.
        </p>
        <div className="inline-block w-fit border border-line-card bg-white px-4.5 py-3.5 font-mono text-[13px] tracking-[0.06em] text-ink-mute">
          FOLIO {folio}
        </div>
        <div className="mt-3 flex flex-wrap gap-3.5">
          <CompartirButton texto={textoCompartir} />
          <Link
            href="/"
            className="border-[1.5px] border-marino px-7 py-4 text-base font-medium text-marino hover:bg-marino hover:text-white"
          >
            Proponer en otro tema
          </Link>
        </div>
        <div className="mt-1.5 max-w-[34em] border-l-[3px] border-rojo bg-cream-soft px-4.5 py-3.5 text-sm leading-relaxed text-ink-mute">
          “{textoCompartir}”
        </div>
      </div>
    </div>
  );
}
