import { LogoDots } from "./LogoMark";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 flex items-center justify-between gap-6 flex-wrap sm:px-10 lg:px-[60px]">
      <div className="flex items-center gap-3">
        <LogoDots size={6} />
        <span className="text-[13px] text-ink-mute">
          Zacatecas Piensa · agrupación ciudadana · 2026
        </span>
      </div>
      <div className="flex gap-6 text-[13px]">
        <a
          href="https://www.facebook.com/PensemosZacatecas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
}
