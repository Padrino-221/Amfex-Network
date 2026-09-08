import { query } from "./db";

// ── Types ──
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  order: number;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  cover: string | null;
  published: boolean;
};

export type Book = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  cover: string | null;
  price: number | null;
  link: string | null;
  published: boolean;
};

export type GalleryImage = {
  id: string;
  src: string;
  title: string;
  category: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string | null;
  icon: string | null;
};

export type ContactMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

// ── Fetchers (server-side) ──
export async function getProjects(): Promise<Project[]> {
  try {
    return await query<Project>(`SELECT * FROM "Project" ORDER BY "order" ASC, "createdAt" DESC`);
  } catch {
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    return await query<Service>(`SELECT * FROM "Service" ORDER BY "order" ASC`);
  } catch {
    return [];
  }
}

export async function getPosts(publishedOnly = true): Promise<Post[]> {
  try {
    const where = publishedOnly ? `WHERE published = true` : ``;
    return await query<Post>(`SELECT * FROM "Post" ${where} ORDER BY date DESC`);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = await query<Post>(`SELECT * FROM "Post" WHERE slug = $1 LIMIT 1`, [slug]);
  return rows[0] ?? null;
}

export async function getBooks(publishedOnly = true): Promise<Book[]> {
  try {
    const where = publishedOnly ? `WHERE published = true` : ``;
    return await query<Book>(`SELECT * FROM "Book" ${where} ORDER BY "createdAt" DESC`);
  } catch {
    return [];
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    return await query<GalleryImage>(`SELECT * FROM "GalleryImage" ORDER BY "createdAt" DESC`);
  } catch {
    return [];
  }
}

export async function getResources(): Promise<Resource[]> {
  try {
    return await query<Resource>(`SELECT * FROM "Resource" ORDER BY "createdAt" DESC`);
  } catch {
    return [];
  }
}

export type SiteSetting = {
  key: string;
  value: string | null;
};

export type SiteSettings = Record<string, string | null>;

export async function getSiteSetting<T = Record<string, unknown>>(key: string): Promise<T | null> {
  try {
    const rows = await query<SiteSetting>(`SELECT value FROM "SiteSettings" WHERE key = $1 LIMIT 1`, [key]);
    if (!rows[0] || rows[0].value == null) return null;
    try {
      return JSON.parse(rows[0].value as string) as T;
    } catch {
      return rows[0].value as unknown as T;
    }
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await query<SiteSetting>(`SELECT key, value FROM "SiteSettings"`);
    const map: SiteSettings = {};
    rows.forEach((r) => {
      map[r.key] = r.value as string | null;
    });
    return map;
  } catch {
    return {};
  }
}

/** Backwards-compat helper for flat-settings migration: JSON blobs converted to flat keys */
export async function getSettings(): Promise<SiteSettings> {
  return getSiteSettings();
}
