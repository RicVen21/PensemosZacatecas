import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";
import { VerbRotator } from "@/components/VerbRotator";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-20 lg:px-[60px] lg:pt-[92px] lg:pb-24">
        <div className="pointer-events-none absolute top-[120px] right-24 hidden gap-10 sm:flex">
          <span
            className="h-[92px] w-[92px] shrink-0 rounded-full bg-ink opacity-[0.05] animate-[flota_8s_ease-in-out_infinite]"
          />
          <span
            className="h-[92px] w-[92px] shrink-0 rounded-full bg-ink opacity-[0.08] animate-[flota_8s_ease-in-out_infinite] [animation-delay:0.5s]"
          />
          <span
            className="h-[92px] w-[92px] shrink-0 rounded-full bg-rojo opacity-[0.14] animate-[flota_8s_ease-in-out_infinite] [animation-delay:1s]"
          />
        </div>

        <div className="relative max-w-[1280px]">
          <div className="flex items-center gap-4 animate-[subeFade_0.7s_ease-out_both]">
            <div className="h-px w-11 bg-rojo" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-rojo">
              Rumbo a 2027
            </span>
          </div>

          <h1 className="mt-6 text-[15vw] leading-[0.98] font-bold tracking-[-0.05em] text-[#111] sm:text-[80px] md:text-[110px] lg:text-[150px] xl:text-[188px]">
            <span className="block overflow-hidden pt-[0.1em] pb-[0.18em] -mb-[0.18em]">
              <span className="block animate-[revelaLinea_1s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
                Zacatecas
              </span>
            </span>
            <span className="block overflow-hidden pt-[0.1em] pb-[0.18em] -mb-[0.18em]">
              <span className="block animate-[revelaLinea_1s_cubic-bezier(0.16,1,0.3,1)_0.26s_both] text-[oklch(0.42_0.005_262)]">
                Piensa
              </span>
            </span>
          </h1>

          <div className="my-8 h-[3px] max-w-[940px] origin-left bg-rojo animate-[creceLinea_1.2s_cubic-bezier(0.22,1,0.36,1)_0.6s_both]" />

          <VerbRotator />

          <p className="mt-8 max-w-[30em] text-lg leading-relaxed text-ink-soft [text-wrap:pretty] sm:text-xl lg:text-[22px] animate-[subeFade_0.9s_ease-out_0.85s_both]">
            El futuro del estado no se decide en una boleta: se decide en lo que
            somos capaces de imaginar antes. Elige un tema y cuéntanos lo que
            ves, lo que crees y lo que harías.
          </p>

          <div className="mt-10 flex items-center gap-3 font-mono text-xs tracking-[0.16em] uppercase text-ink-mute animate-[subeFade_0.9s_ease-out_1.05s_both]">
            <span className="inline-block h-2 w-2 rounded-full bg-rojo animate-[latido_2.6s_ease-in-out_infinite]" />
            Ocho temas · una sola conversación
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-14 sm:px-10 lg:px-[60px] lg:py-24">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="text-3xl font-bold tracking-[-0.032em] text-marino sm:text-4xl lg:text-[42px]">
            Ocho conversaciones abiertas
          </h2>
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-ink-mute">
            Elige una para proponer
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/propuestas/${cat.slug}`}
              className="group flex min-h-[236px] flex-col gap-3 rounded-sm border border-line-card bg-white px-7 pt-8 pb-6 transition-[border-color,transform] duration-200 hover:-translate-y-[3px] hover:border-marino"
            >
              <span className="font-mono text-[11.5px] text-rojo">{cat.num}</span>
              <span className="text-2xl font-bold leading-tight tracking-[-0.022em] text-marino">
                {cat.nombre}
              </span>
              <span className="text-[15px] leading-relaxed text-ink-softer">
                {cat.corta}
              </span>
              <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-marino">
                Yo propongo
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-rojo" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
