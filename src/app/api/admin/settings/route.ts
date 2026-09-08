import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

// Public GET like Yedent: returns {key: value} flat map
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  // Single-key fetch still requires auth for admin; public bulk fetch is unauthenticated for backwards-compat with adminApi, but we also expose public /api/settings
  if (key) {
    const user = await requireAuth(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const rows = await query(`SELECT key, value FROM "SiteSettings" WHERE key = $1`, [key]);
    return NextResponse.json({ data: rows[0] ?? null });
  }
  // Bulk fetch — check for admin token, but also allow public consumption via /api/settings alias
  // For admin, require auth; caller for public should use /api/settings (see that route). Here we keep auth for admin consistency.
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await query<{ key: string; value: string | null }>(`SELECT key, value FROM "SiteSettings" ORDER BY key ASC`);
  return NextResponse.json({ data: rows });
}

// Bulk PUT like Yedent: accepts Record<string, string | null>
export async function PUT(req: Request) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Support both legacy single-key {key, value} and new bulk {key: value}
  let entries: [string, string | null][];
  if (body && typeof body.key === "string" && "value" in body) {
    // legacy: {key, value} where value may be object/array -> stringify if needed
    let v: string | null = body.value as string | null;
    if (v !== null && typeof v !== "string") v = JSON.stringify(v);
    entries = [[body.key as string, v]];
  } else {
    entries = Object.entries(body as Record<string, string | null>);
  }

  for (const [k, v] of entries) {
    const val = v === "" ? null : v;
    await query(
      `INSERT INTO "SiteSettings" (id, key, value, "updatedAt") VALUES (gen_random_uuid(), $1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $2, "updatedAt" = NOW()`,
      [k, val]
    );
  }

  const rows = await query<{ key: string; value: string | null }>(`SELECT key, value FROM "SiteSettings" ORDER BY key ASC`);
  return NextResponse.json({ data: rows });
}

export async function POST(req: Request) {
  return PUT(req);
}
