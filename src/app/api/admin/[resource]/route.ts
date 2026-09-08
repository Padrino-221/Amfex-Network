import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { getResource, allowedColumns } from "@/lib/admin-resources";

export async function GET(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const rows = await query(`SELECT * FROM "${config.table}" ORDER BY ${config.orderBy}`);
  return NextResponse.json({ data: rows });
}

export async function POST(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const body = await req.json();
  const allowed = allowedColumns(config);
  const columns: string[] = [];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (!(key in body)) continue;
    let value = body[key];
    if (config.arrayFields?.includes(key)) {
      value = Array.isArray(value) ? value : [];
    } else if (config.floatFields?.includes(key)) {
      value = value === "" || value == null ? null : Number(value);
    } else if (value === "") {
      value = null;
    }
    columns.push(`"${key}"`);
    values.push(value);
  }

  if (columns.length === 0) {
    return NextResponse.json({ error: "No fields provided" }, { status: 400 });
  }

  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
  const rows = await query(
    `INSERT INTO "${config.table}" (id, ${columns.join(", ")}, "createdAt", "updatedAt")
     VALUES (gen_random_uuid(), ${placeholders}, NOW(), NOW()) RETURNING *`,
    values
  );
  return NextResponse.json({ data: rows[0] }, { status: 201 });
}
