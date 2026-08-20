export function LogoMark({ size = 38 }: { size?: number }) {
  const dot = Math.round(size * 0.26);
  const border = Math.max(2, Math.round(size * 0.08));
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full box-border -rotate-45"
        style={{ border: `${border}px solid var(--color-marino)`, borderRightColor: "transparent" }}
      />
      <div
        className="absolute rounded-full animate-[latido_3.2s_ease-in-out_infinite]"
        style={{
          top: -1,
          right: -1,
          width: dot,
          height: dot,
          background: "var(--color-rojo)",
        }}
      />
    </div>
  );
}
