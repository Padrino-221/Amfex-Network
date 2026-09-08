import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { getResource, allowedColumns } from "@/lib/admin-resources";

export async function GET(req: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const rows = await query(`SELECT * FROM "${config.table}" WHERE id = $1`, [id]);
  if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function PUT(req: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const body = await req.json();
  const allowed = allowedColumns(config);
  const sets: string[] = [];
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
    values.push(value);
    sets.push(`"${key}" = $${values.length}`);
  }

  if (sets.length === 0) {
    return NextResponse.json({ error: "No fields provided" }, { status: 400 });
  }

  values.push(id);
  const rows = await query(
    `UPDATE "${config.table}" SET ${sets.join(", ")}, "updatedAt" = NOW() WHERE id = $${values.length} RETURNING *`,
    values
  );
  if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  await query(`DELETE FROM "${config.table}" WHERE id = $1`, [id]);
  return NextResponse.json({ success: true });
}
