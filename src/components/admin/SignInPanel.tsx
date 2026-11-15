import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GoogleSignInButton } from "@/components/admin/GoogleSignInButton";

export function SignInPanel() {
  return (
    <PageHeader
      label="Officers"
      title="Admin sign in"
      lead="Sign in with the Google account"
      rest="an officer added to the allowlist."
    >
      <Suspense fallback={null}>
        <GoogleSignInButton />
      </Suspense>
    </PageHeader>
  );
}
