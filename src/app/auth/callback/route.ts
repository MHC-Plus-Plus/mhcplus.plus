import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient, supabaseConfigured } from "@/lib/supabase/server";

/** Only same-origin absolute paths, so `next` can't redirect to another site. */
function safeNext(next: string | null): string {
  return next && /^\/(?![/\\])/.test(next) ? next : "/admin";
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));

  if (code && supabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }
  return NextResponse.redirect(`${origin}/admin?error=1`);
}
