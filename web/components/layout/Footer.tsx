import Link from "next/link";
import type { SiteSettings } from "@/lib/site";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { siteName, tagline, footerText, navLinks, socialLinks } = settings;

  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{siteName}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{tagline}</p>
        </div>

        <div>
          <p className="text-sm font-medium">Navigate</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted transition-colors hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">{socialLinks.length ? "Follow" : "Account"}</p>
          <ul className="mt-3 space-y-2">
            {socialLinks.length > 0 ? (
              socialLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-sm text-muted hover:text-text">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-sm text-muted hover:text-text">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteName}. {footerText}
      </div>
    </footer>
  );
}