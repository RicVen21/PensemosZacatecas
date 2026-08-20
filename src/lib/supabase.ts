import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Built lazily (not at module load) so that build-time page-data collection
// doesn't fail for any route that imports this module — directly or
// transitively (e.g. through a Server Action bound into a statically
// generated page) — in an environment where the env vars aren't visible
// during that build step. The error only surfaces when the client is
// actually requested at runtime.
let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en las variables de entorno."
    );
  }

  cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
