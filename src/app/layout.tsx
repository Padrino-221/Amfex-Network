import type { Metadata, Viewport } from "next";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://amfex-network.vercel.app");

export const viewport: Viewport = {
  themeColor: "#1A1A18",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settingValue(settings, "seo_title", "Emmanuel Amful Owusu | Technology. Knowledge. Leadership. Purpose.");
  const description = settingValue(
    settings,
    "seo_description",
    "IT Consultant | Entrepreneur | Academic Technologist | Author | Leadership & Purpose Mentor. Building technology, developing people, advancing purpose."
  );
  const ogImage = settingValue(settings, "site_logo_url", "/logo.png");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | Emmanuel Amful Owusu`,
    },
    description,
    keywords: [
      "Emmanuel Amful Owusu",
      "Amfex Network",
      "IT Consultant Ghana",
      "Academic Technologist",
      "UENR",
      "SEDES Framework",
      "Generals Hub",
      "Technology Entrepreneur",
      "Leadership Mentor",
      "Ghana",
    ],
    authors: [{ name: "Emmanuel Amful Owusu", url: siteUrl }],
    creator: "Emmanuel Amful Owusu",
    publisher: "Amfex Network",
    category: "Technology",
    formatDetection: { telephone: false, email: true, address: false },
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Emmanuel Amful Owusu",
      type: "website",
      locale: "en_GH",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Emmanuel Amful Owusu — Technology. Knowledge. Leadership. Purpose.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@amful_",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }, { url: "/favicon.ico", type: "image/x-icon" }],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    manifest: "/manifest.json",
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emmanuel Amful Owusu",
  url: siteUrl,
  image: `${siteUrl}/logo.png`,
  jobTitle: ["IT Consultant", "Entrepreneur", "Academic Technologist", "Author", "Leadership Mentor"],
  worksFor: { "@type": "Organization", name: "Amfex Network", url: "https://amfexnetwork.com" },
  affiliation: { "@type": "Organization", name: "University of Energy and Natural Resources" },
  sameAs: [
    "https://linkedin.com/in/emmanuel-amful",
    "https://twitter.com/amful_",
    "https://instagram.com/emmanuel_amful",
  ],
  knowsAbout: ["Technology", "Leadership", "SEDES Framework", "Generals Hub", "Digital Transformation"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoNarrow.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
