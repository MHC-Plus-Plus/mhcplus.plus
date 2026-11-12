import { createSupabaseServerClient, supabaseConfigured } from "@/lib/supabase/server";

export type AdminSession = {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  email: string;
};

/**
 * Resolves the signed-in user and whether they're on the `admins` allowlist.
 * `getUser()` validates the JWT with Supabase; `getSession()` would only read the cookie.
 */
export async function getAdminState(): Promise<
  | { status: "unconfigured" }
  | { status: "signed-out" }
  | { status: "forbidden"; email: string }
  | ({ status: "admin" } & AdminSession)
> {
  if (!supabaseConfigured()) return { status: "unconfigured" };
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  if (!email) return { status: "signed-out" };
  const { data: isAdmin } = await supabase.rpc("is_admin");
  return isAdmin === true ? { status: "admin", supabase, email } : { status: "forbidden", email };
}

/** For server actions: throws unless the caller is an admin. RLS still enforces it in the DB. */
export async function requireAdmin(): Promise<AdminSession> {
  const state = await getAdminState();
  if (state.status !== "admin") throw new Error("Not authorized");
  return { supabase: state.supabase, email: state.email };
}
