"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function GoogleSignInButton() {
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const failed = useSearchParams().get("error") !== null;

  async function signIn() {
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(pathname)}` },
    });
    if (error) setError("Couldn't start Google sign-in. Try again.");
  }

  return (
    <div>
      <button
        onClick={signIn}
        className="inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-primary-bright"
      >
        Sign in with Google
      </button>
      {(error || failed) && (
        <p className="mt-3 text-sm text-primary-bright">
          {error ?? "Sign-in failed. Please try again."}
        </p>
      )}
    </div>
  );
}
