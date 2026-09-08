import type { MetadataRoute } from "next";
import { getPosts, getBooks } from "@/lib/cms";

export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://amfex-network.vercel.app");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/business`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/academia`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/ministry`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/sedes`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/books`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/journal`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/gallery`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/resources`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [posts, books] = await Promise.all([getPosts(), getBooks()]);
    dynamicRoutes = [
      ...posts.map((p) => ({
        url: `${siteUrl}/journal/${p.slug}`,
        lastModified: new Date((p as unknown as { date: string }).date || new Date().toISOString()),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...books
        .filter((b) => b.slug)
        .map((b) => ({
          url: `${siteUrl}/books#${b.slug}`,
          lastModified: new Date((b as unknown as { createdAt: string }).createdAt || new Date().toISOString()),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        })),
    ];
  } catch {
    // DB unavailable during build — return static only
  }

  return [...staticRoutes, ...dynamicRoutes];
}
