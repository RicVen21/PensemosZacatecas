"use client";

import { useEffect, useState } from "react";

const VERBOS = ["Piensa.", "Debate.", "Comparte."];

export function VerbRotator() {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActivo((v) => (v + 1) % VERBOS.length), 1900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-baseline gap-4 text-[28px] font-semibold tracking-[-0.032em] sm:gap-6 sm:text-[38px] lg:text-[52px]">
      {VERBOS.map((verbo, i) => (
        <span
          key={verbo}
          className="inline-block transition-[color,opacity,transform] duration-[550ms]"
          style={{
            color: i === activo ? "var(--color-rojo)" : "#111111",
            opacity: i === activo ? 1 : 0.32,
            transform: i === activo ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: "ease, ease, cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {verbo}
        </span>
      ))}
    </div>
  );
}
