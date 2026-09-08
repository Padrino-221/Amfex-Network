import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAuth, hashPassword, type AuthUser } from "@/lib/auth";

async function requireAdmin(req: Request) {
  const user = await requireAuth(req);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { full_name, role, is_active, password } = body;

  const sets: string[] = [];
  const values: unknown[] = [];
  const push = (col: string, val: unknown) => {
    values.push(val);
    sets.push(`${col} = $${values.length}`);
  };
  if (full_name !== undefined) push("full_name", full_name);
  if (role !== undefined) push("role", role);
  if (is_active !== undefined) push("is_active", is_active);
  if (password !== undefined && password !== "") push("password_hash", hashPassword(password));

  if (sets.length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }
  values.push(id);
  const rows = await query<AuthUser>(
    `UPDATE "User" SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $${values.length}
     RETURNING id, full_name, email, role, is_active, created_at`,
    values
  );
  if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (admin.id === id) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }
  await query(`DELETE FROM "User" WHERE id = $1`, [id]);
  return NextResponse.json({ success: true });
}
