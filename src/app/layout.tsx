import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo-narrow",
  display: "swap",
});

import { getSiteSettings } from "@/lib/cms";
import { settingValue } from "@/lib/settingsUtils";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settingValue(settings, "seo_title", "Emmanuel Amful Owusu | Technology. Knowledge. Leadership. Purpose.");
  const description = settingValue(
    settings,
    "seo_description",
    "IT Consultant | Entrepreneur | Academic Technologist | Author | Leadership & Purpose Mentor. Building technology, developing people, advancing purpose."
  );
  return {
    title,
    description,
    keywords: ["Emmanuel Amful Owusu", "IT Consultant", "Entrepreneur", "Amfex Network", "Technology", "Leadership", "Ministry", "Academia"],
    openGraph: { title, description, type: "website" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  // We keep Header/Footer client but pass initial settings as prop via wrapper
  // To avoid turning them into server components, we render them via a client wrapper is not needed — we can just
  // not pass settings here and let them fetch themselves if needed. For now keep layout simple.
  // Header/Footer will fetch internally if settings not passed, so we keep layout lean.
  return (
    <html lang="en" className={`${archivo.variable} ${archivoNarrow.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}