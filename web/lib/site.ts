import { strapi } from "@/lib/strapi";

export type NavLink = {
  id?: number;
  label: string;
  href: string;
  isExternal?: boolean;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  footerText: string;
  logo?: { url: string; alternativeText?: string } | null;
  navLinks: NavLink[];
  socialLinks: NavLink[];
};

const FALLBACK: SiteSettings = {
  siteName: "Brand",
  tagline: "One sentence about what the shop offers.",
  footerText: "All rights reserved.",
  logo: null,
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ],
  socialLinks: [],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data } = await strapi("/global?populate=*");
    if (!data) return FALLBACK;
    return {
      siteName: data.siteName || FALLBACK.siteName,
      tagline: data.tagline || FALLBACK.tagline,
      footerText: data.footerText || FALLBACK.footerText,
      logo: data.logo ?? null,
      navLinks: data.navLinks?.length ? data.navLinks : FALLBACK.navLinks,
      socialLinks: data.socialLinks ?? [],
    };
  } catch {
    return FALLBACK;
  }
}

export function mediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${url}`;
}