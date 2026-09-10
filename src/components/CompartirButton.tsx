"use client";

export function CompartirButton({ texto }: { texto: string }) {
  function compartir() {
    if (navigator.share) {
      navigator.share({ text: texto }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(texto).catch(() => {});
    }
  }

  return (
    <button
      type="button"
      onClick={compartir}
      className="rounded-sm bg-marino px-7 py-4 text-base font-semibold text-white hover:bg-marino-dark"
    >
      Compartir en redes
    </button>
  );
}
