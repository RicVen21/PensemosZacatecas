"use client";

import { useActionState, type ReactNode } from "react";
import { enviarPropuesta, type EnviarPropuestaState } from "@/lib/actions";
import { MUNICIPIOS } from "@/lib/categorias";
import type { Categoria } from "@/lib/categorias";

const initialState: EnviarPropuestaState = {
  error: null,
  values: {
    situacion: "",
    causa: "",
    propuesta: "",
    nombre: "",
    municipio: "",
    correo: "",
    telefono: "",
  },
};

export function PropuestaForm({ categoria }: { categoria: Categoria }) {
  const action = enviarPropuesta.bind(null, categoria.slug);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-7 border border-line-card bg-white p-6 sm:p-9 lg:p-11">
      <Campo label="¿Qué observas o vives tú en este tema?" required>
        <textarea
          name="situacion"
          rows={4}
          defaultValue={state.values.situacion}
          placeholder={categoria.ph[0]}
          className={campoClase}
        />
      </Campo>

      <Campo label="¿A qué crees que se debe?" required>
        <textarea
          name="causa"
          rows={4}
          defaultValue={state.values.causa}
          placeholder={categoria.ph[1]}
          className={campoClase}
        />
      </Campo>

      <Campo label="¿Qué harías tú al respecto?" required>
        <textarea
          name="propuesta"
          rows={4}
          defaultValue={state.values.propuesta}
          placeholder={categoria.ph[2]}
          className={campoClase}
        />
      </Campo>

      <div className="grid grid-cols-1 gap-4 border-t border-line-soft pt-2 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] tracking-[0.13em] uppercase text-ink-faint">
            Municipio
          </label>
          <select
            name="municipio"
            defaultValue={state.values.municipio}
            className={campoClase}
          >
            <option value="">Selecciona tu municipio</option>
            {MUNICIPIOS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] tracking-[0.13em] uppercase text-ink-faint">
            Tu nombre
          </label>
          <input
            name="nombre"
            defaultValue={state.values.nombre}
            placeholder="Opcional"
            className={campoClase}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] tracking-[0.13em] uppercase text-ink-faint">
            Correo electrónico
          </label>
          <input
            type="email"
            name="correo"
            defaultValue={state.values.correo}
            placeholder="Opcional — sólo para dar seguimiento"
            className={campoClase}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] tracking-[0.13em] uppercase text-ink-faint">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            defaultValue={state.values.telefono}
            placeholder="Opcional — sólo para dar seguimiento"
            className={campoClase}
          />
        </div>
      </div>

      {state.error && (
        <div className="border-l-[3px] border-rojo bg-rojo-soft px-3.5 py-3 text-sm text-rojo-text">
          {state.error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-2">
        <p className="max-w-[24em] text-[13px] leading-relaxed text-ink-mute">
          Al enviar aceptas que tu propuesta pueda publicarse de forma anónima.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="bg-marino px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-marino-dark disabled:opacity-60"
        >
          {pending ? "Enviando…" : "Enviar mi propuesta"}
        </button>
      </div>
    </form>
  );
}

const campoClase =
  "rounded-sm border border-line-strong bg-cream-soft px-3.5 py-3.5 text-base text-ink outline-none focus:border-marino resize-vertical";

function Campo({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-lg font-semibold tracking-[-0.015em] text-marino sm:text-xl">
        {label} {required && <span className="text-rojo">*</span>}
      </label>
      {children}
    </div>
  );
}
