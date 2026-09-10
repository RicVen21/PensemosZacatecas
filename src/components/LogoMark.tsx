export function LogoDots({
  size = 5,
  gap,
  animated = false,
}: {
  size?: number;
  gap?: number;
  animated?: boolean;
}) {
  const resolvedGap = gap ?? Math.round(size * 0.7);
  const dot = "shrink-0 rounded-full";
  return (
    <div className="flex items-end" style={{ gap: resolvedGap }}>
      <span className={dot} style={{ width: size, height: size, background: "var(--color-dot-1)" }} />
      <span className={dot} style={{ width: size, height: size, background: "var(--color-dot-2)" }} />
      <span
        className={`${dot}${animated ? " animate-[latido_2.8s_ease-in-out_infinite]" : ""}`}
        style={{ width: size, height: size, background: "var(--color-rojo)" }}
      />
    </div>
  );
}

export function LogoMark() {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-lg font-bold leading-none tracking-[-0.018em] text-ink">
        Zacatecas
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-normal uppercase leading-none tracking-[0.3em] text-navy-2">
          Piensa
        </span>
        <LogoDots size={5} gap={3.5} animated />
      </div>
    </div>
  );
}
