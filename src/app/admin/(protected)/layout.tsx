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
      <Container className="py-[120px]">
        <h1 className="text-3xl font-bold">Admin isn&apos;t configured</h1>
        <p className="mt-4 text-fg-muted">
          Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </p>
      </Container>
    );
  }

  if (state.status === "forbidden") {
    return (
      <Container className="py-[120px]">
        <h1 className="text-3xl font-bold">Not authorized</h1>
        <p className="mt-4 max-w-[560px] text-fg-muted">
          {state.email} isn&apos;t on the officer list. Ask an officer to add your email, or sign
          in with a different account.
        </p>
        <form action={signOut} className="mt-8">
          <button className="rounded-sm border border-border-strong px-5 py-3 text-sm font-semibold hover:border-border-bright">
            Sign out
          </button>
        </form>
      </Container>
    );
  }

  return (
    <Container className="py-[120px]">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 font-mono text-xs uppercase tracking-[0.1em]">
        <nav className="flex gap-6">
          <Link href="/admin/opportunities" className="text-fg-muted hover:text-fg">Opportunities</Link>
          <Link href="/admin/covers" className="text-fg-muted hover:text-fg">Events</Link>
        </nav>
        <form action={signOut} className="flex items-center gap-4">
          <span className="normal-case tracking-normal text-fg-subtle">{state.email}</span>
          <button className="text-primary-bright hover:underline">Sign out</button>
        </form>
      </div>
      {children}
    </Container>
  );
}
