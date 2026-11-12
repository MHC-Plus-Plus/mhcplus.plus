import { Suspense } from "react";
import { Container } from "@/components/shared/Container";
import { GoogleSignInButton } from "@/components/admin/GoogleSignInButton";

export function SignInPanel() {
  return (
    <Container className="py-[120px]">
      <span className="mb-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright before:text-fg-dim before:content-['//_']">
        Officers
      </span>
      <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.025em]">
        Admin sign in
      </h1>
      <p className="mt-5 max-w-[560px] text-lg leading-[1.6] text-fg-muted">
        Sign in with the Google account an officer added to the allowlist.
      </p>
      <div className="mt-10">
        <Suspense fallback={null}>
          <GoogleSignInButton />
        </Suspense>
      </div>
    </Container>
  );
}
