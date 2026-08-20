"use server";

import { redirect } from "next/navigation";
import { getSupabaseClient } from "./supabase";
import { getCategoria } from "./categorias";

export interface EnviarPropuestaState {
  error: string | null;
  values: {
    situacion: string;
    causa: string;
    propuesta: string;
    nombre: string;
    municipio: string;
    contacto: string;
  };
}

const MIN_LARGO = 20;

export async function enviarPropuesta(
  slug: string,
  _prevState: EnviarPropuestaState,
  formData: FormData
): Promise<EnviarPropuestaState> {
  const situacion = String(formData.get("situacion") ?? "").trim();
  const causa = String(formData.get("causa") ?? "").trim();
  const propuesta = String(formData.get("propuesta") ?? "").trim();
  const nombre = String(formData.get("nombre") ?? "").trim();
  const municipio = String(formData.get("municipio") ?? "").trim();
  const contacto = String(formData.get("contacto") ?? "").trim();

  const values = { situacion, causa, propuesta, nombre, municipio, contacto };

  const categoria = getCategoria(slug);
  if (!categoria) {
    return { error: "Categoría no encontrada.", values };
  }

  if (situacion.length < MIN_LARGO) {
    return {
      error: "Cuéntanos qué observas o vives: al menos 20 caracteres.",
      values,
    };
  }
  if (causa.length < MIN_LARGO) {
    return {
      error: "Dinos a qué crees que se debe: al menos 20 caracteres.",
      values,
    };
  }
  if (propuesta.length < MIN_LARGO) {
    return { error: "Falta tu propuesta: al menos 20 caracteres.", values };
  }

  const { data, error } = await getSupabaseClient().rpc("crear_propuesta", {
    p_categoria_slug: categoria.slug,
    p_categoria_nombre: categoria.nombre,
    p_situacion: situacion,
    p_causa: causa,
    p_propuesta: propuesta,
    p_nombre: nombre || null,
    p_municipio: municipio || null,
    p_contacto: contacto || null,
  });
  const folio = data as string | null;

  if (error || !folio) {
    console.error("Error al insertar propuesta:", error);
    return {
      error: "No pudimos registrar tu propuesta. Intenta de nuevo en unos minutos.",
      values,
    };
  }

  redirect(`/propuestas/${slug}/gracias?folio=${encodeURIComponent(folio)}`);
}
