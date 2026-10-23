import "./globals.css";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata() {
  const s = await getSiteSettings();
  return {
    title: { default: s.siteName, template: `%s | ${s.siteName}` },
    description: s.tagline,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll>
          <Navbar siteName={settings.siteName} logo={settings.logo} links={settings.navLinks} />
          {children}
          <Footer settings={settings} />
        </SmoothScroll>
      </body>
    </html>
  );
}