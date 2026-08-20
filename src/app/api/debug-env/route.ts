import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Temporary diagnostic route to confirm which deployment/commit is actually
// live and whether it can see the required env vars, without exposing any
// secret values. Delete once the Vercel env var mismatch is resolved.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

  return NextResponse.json({
    hasNextPublicSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasNextPublicSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasSupabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
    hasAdminSessionSecret: Boolean(process.env.ADMIN_SESSION_SECRET),
    supabaseUrlPrefix: url.slice(0, 28),
    vercelEnv: process.env.VERCEL_ENV ?? null,
    vercelUrl: process.env.VERCEL_URL ?? null,
    vercelProjectId: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? null,
    gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    gitCommitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE ?? null,
  });
}
