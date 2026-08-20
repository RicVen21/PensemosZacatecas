export const ADMIN_SESSION_COOKIE = "admin_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Falta ADMIN_SESSION_SECRET en las variables de entorno.");
  }
  return secret;
}

// The session token is a fixed hash derived from a server-only secret, not a
// per-login random value: it doesn't need a session store, and rotating
// ADMIN_SESSION_SECRET is enough to invalidate every existing session at once.
export async function createSessionToken(): Promise<string> {
  return sha256Hex(`pensemos-zacatecas-admin:${getSessionSecret()}`);
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await createSessionToken();
  return token === expected;
}
