"use client";

import { useActionState } from "react";
import { iniciarSesion, type IniciarSesionState } from "@/lib/adminActions";

const initialState: IniciarSesionState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(iniciarSesion, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 border border-line-card bg-white p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-mono text-[11px] tracking-[0.13em] uppercase text-ink-faint">
          Contraseña de moderación
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          className="rounded-sm border border-line-strong bg-cream-soft px-3.5 py-3.5 text-base text-ink outline-none focus:border-marino"
        />
      </div>

      {state.error && (
        <div className="border-l-[3px] border-rojo bg-rojo-soft px-3.5 py-3 text-sm text-rojo-text">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-marino px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-marino-dark disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
