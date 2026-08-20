import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client: bypasses RLS entirely. Only ever import this from
// code paths gated by requireAdminSession() — never from client components,
// and never used to serve the public site.
//
// Built lazily (not at module load) so that build-time page-data collection
// for /moderacion doesn't fail in environments where
// SUPABASE_SERVICE_ROLE_KEY isn't set yet (e.g. a fresh checkout before the
// operator has configured it) — the error only surfaces when the page is
// actually requested.
let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY en las variables de entorno."
    );
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
