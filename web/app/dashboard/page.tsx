import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const token = (await cookies()).get("shop_session")?.value;
  if (!token) redirect("/login");

  const response = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) redirect("/login");
  const user = await response.json();
  const params = await searchParams;
  const welcome = params.welcome === "created" ? "Your account has been created successfully." : params.welcome === "login" ? "You have signed in successfully." : "Welcome to your dashboard.";

  return (
    <main className="mx-auto min-h-[75vh] max-w-6xl px-6 pb-20 pt-32">
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface/60 p-8 sm:flex-row sm:items-center sm:p-10">
        <div><p className="text-xs uppercase tracking-[0.2em] text-accent">Personal space</p><h1 className="mt-3 text-3xl font-semibold">Welcome, {user.username}!</h1><p className="mt-3 text-sm text-muted">{welcome}</p></div>
        <LogoutButton />
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border p-6"><p className="text-sm text-muted">Account email</p><p className="mt-2 break-all font-medium">{user.email}</p></div>
        <div className="rounded-2xl border border-border p-6"><p className="text-sm text-muted">Account status</p><p className="mt-2 font-medium">Signed in</p></div>
      </section>
    </main>
  );
}
