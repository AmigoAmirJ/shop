"use client";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }
  return <button onClick={logout} className="w-fit rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent">Log out</button>;
}
