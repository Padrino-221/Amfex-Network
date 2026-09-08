import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Public — no auth, like Yedent GET /api/settings
export async function GET() {
  const rows = await query<{ key: string; value: string | null }>(`SELECT key, value FROM "SiteSettings"`);
  const map: Record<string, string | null> = {};
  rows.forEach((r) => {
    map[r.key] = r.value;
  });
  return NextResponse.json({ data: map });
}
