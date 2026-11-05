import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import SmoothScroll from "@/components/effects/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const STRAPI_URL =
  process.env.STRAPI_URL || "http://localhost:1337";

export async function generateMetadata() {
  const s = await getSiteSettings();

  return {
    title: {
      default: s.siteName,
      template: `%s | ${s.siteName}`,
    },
    description: s.tagline,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  let user: { username: string } | null = null;

  try {
    const token = (await cookies()).get("shop_session")?.value;

    if (token) {
      const response = await fetch(`${STRAPI_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        user = {
          username: data.username,
        };
      }
    }
  } catch (error) {
    console.error("Navbar auth error:", error);
  }

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll>
          <Navbar
            siteName={settings.siteName}
            logo={settings.logo}
            links={settings.navLinks}
            user={user}
          />

          {children}

          <Footer settings={settings} />
        </SmoothScroll>
      </body>
    </html>
  );
}