"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, createSessionToken, isValidSessionToken } from "./adminAuth";
import { getSupabaseAdmin } from "./supabase-admin";

export interface IniciarSesionState {
  error: string | null;
}

export async function iniciarSesion(
  _prevState: IniciarSesionState,
  formData: FormData
): Promise<IniciarSesionState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "ADMIN_PASSWORD no está configurado en el servidor." };
  }
  if (!password || password !== expected) {
    return { error: "Contraseña incorrecta." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });

  redirect("/moderacion");
}

export async function cerrarSesion(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/moderacion/login");
}

// Server Actions are reachable by direct POST, not just through the page's
// UI, so every mutation re-checks the session cookie itself rather than
// trusting that middleware already ran.
async function requireAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await isValidSessionToken(token))) {
    redirect("/moderacion/login");
  }
}

export async function moderarPropuesta(
  id: string,
  nuevoEstado: "aprobada" | "rechazada"
): Promise<void> {
  await requireAdminSession();

  const { error } = await getSupabaseAdmin()
    .from("propuestas")
    .update({ estado_moderacion: nuevoEstado })
    .eq("id", id);

  if (error) {
    throw new Error(`No se pudo actualizar la propuesta: ${error.message}`);
  }

  revalidatePath("/moderacion");
}
