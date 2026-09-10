"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./LogoMark";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-6 border-b border-line sm:px-10 lg:px-[60px]">
      <Link href="/">
        <LogoMark />
      </Link>
      <span className="hidden font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute sm:block">
        {pathname}
      </span>
    </header>
  );
}
