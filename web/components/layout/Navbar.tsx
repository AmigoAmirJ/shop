"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { mediaUrl, type NavLink } from "@/lib/site";

type Props = {
  siteName: string;
  logo?: { url: string; alternativeText?: string } | null;
  links: NavLink[];
};

export default function Navbar({ siteName, logo, links }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const logoSrc = mediaUrl(logo?.url);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          {logoSrc && (
            <Image
              src={logoSrc}
              alt={logo?.alternativeText ?? siteName}
              width={28}
              height={28}
            />
          )}
          {siteName}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  target={l.isExternal ? "_blank" : undefined}
                  rel={l.isExternal ? "noopener noreferrer" : undefined}
                  className={`text-sm transition-colors ${
                    active ? "text-text" : "text-muted hover:text-text"
                  }`}
                >
                  {l.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm text-muted transition-colors hover:text-text">
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:scale-105"
          >
            Sign up
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-5 bg-text transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-text transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 pb-6 pt-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  target={l.isExternal ? "_blank" : undefined}
                  rel={l.isExternal ? "noopener noreferrer" : undefined}
                  className="text-muted hover:text-text"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/login" className="text-muted hover:text-text">
                Log in
              </Link>
              <Link
                href="/register"
                className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}