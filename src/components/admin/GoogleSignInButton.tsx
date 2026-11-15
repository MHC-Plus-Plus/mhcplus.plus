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
        className="btn btn-accent btn-lg"
      >
        Sign in with Google
      </button>
      {(error || failed) && (
        <p role="alert" className="mt-3 text-sm text-fg">
          {error ?? "Sign-in failed. Please try again."}
        </p>
      )}
    </div>
  );
}
