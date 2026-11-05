"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = { mode: "login" | "register" };

export default function AuthForm({ mode }: Props) {
  const isRegister = mode === "register";
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const payload = isRegister
      ? { username: form.get("username"), email: form.get("email"), password: form.get("password") }
      : { identifier: form.get("email"), password: form.get("password") };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong.");
      router.push(`/dashboard?welcome=${isRegister ? "created" : "login"}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[78vh] items-center justify-center px-6 pb-16 pt-28">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface/70 p-7 shadow-2xl shadow-black/20 sm:p-9">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Your account</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-2 text-sm leading-6 text-muted">{isRegister ? "Join us and keep everything you need in one place." : "Sign in to continue to your personal dashboard."}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {isRegister && <div><label htmlFor="username" className="mb-2 block text-sm">Username</label><input id="username" name="username" autoComplete="username" required minLength={3} className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent" placeholder="Your name" /></div>}
          <div><label htmlFor="email" className="mb-2 block text-sm">Email address</label><input id="email" name="email" type="email" autoComplete="email" required className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent" placeholder="you@example.com" /></div>
          <div><label htmlFor="password" className="mb-2 block text-sm">Password</label><input id="password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} required minLength={isRegister ? 8 : 1} className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent" placeholder={isRegister ? "At least 8 characters" : "Your password"} /></div>
          {error && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
          <button disabled={loading} className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Please wait..." : isRegister ? "Create account" : "Log in"}</button>
        </form>
        <p className="mt-7 text-center text-sm text-muted">{isRegister ? "Already have an account? " : "New here? "}<Link href={isRegister ? "/login" : "/register"} className="font-medium text-text underline decoration-accent underline-offset-4">{isRegister ? "Log in" : "Create an account"}</Link></p>
      </section>
    </main>
  );
}
