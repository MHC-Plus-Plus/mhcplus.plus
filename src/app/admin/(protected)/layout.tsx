import Link from "next/link";
import { SignInPanel } from "@/components/admin/SignInPanel";
import { Container } from "@/components/shared/Container";
import { getAdminState } from "@/lib/admin";
import { signOut } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const state = await getAdminState();
  if (state.status === "signed-out") return <SignInPanel />;

  if (state.status === "unconfigured") {
    return (
      <Container className="py-section">
        <h1 className="h-section">Admin isn&apos;t configured</h1>
        <p className="body mt-6">
          Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </p>
      </Container>
    );
  }

  if (state.status === "forbidden") {
    return (
      <Container className="py-section">
        <h1 className="h-section">Not authorized</h1>
        <p className="body mt-6">
          {state.email} isn&apos;t on the officer list. Ask an officer to add your email, or sign
          in with a different account.
        </p>
        <form action={signOut} className="mt-8">
          <button className="btn btn-outline">Sign out</button>
        </form>
      </Container>
    );
  }

  return (
    <Container className="py-section">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <nav className="flex gap-6 font-mono text-xs uppercase tracking-[0.08em]">
          <Link href="/admin/opportunities" className="rounded-sm text-fg-2 transition-colors duration-150 hover:text-fg">
            Opportunities
          </Link>
          <Link href="/admin/covers" className="rounded-sm text-fg-2 transition-colors duration-150 hover:text-fg">
            Events
          </Link>
        </nav>
        <form action={signOut} className="flex flex-wrap items-center gap-4">
          <span className="text-sm text-fg-2">{state.email}</span>
          <button className="btn btn-outline h-9 px-4 text-[13px]">Sign out</button>
        </form>
      </div>
      {children}
    </Container>
  );
}
