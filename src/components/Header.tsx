import Link from "next/link";
import { LogoMark } from "./LogoMark";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-6 border-b border-line sm:px-10 lg:px-[60px]">
      <Link href="/" className="flex items-center gap-3.5">
        <LogoMark />
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight leading-none text-marino">
            Pensemos
          </span>
          <span className="text-[9.5px] font-normal tracking-[0.22em] uppercase text-ink-faint">
            Zacatecas
          </span>
        </div>
      </Link>
      <Link
        href="/"
        className="hidden sm:block font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute hover:text-rojo"
      >
        Ocho temas · una sola conversación
      </Link>
    </header>
  );
}
