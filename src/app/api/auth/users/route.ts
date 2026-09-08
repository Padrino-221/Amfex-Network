import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAuth, ensureUserTable, hashPassword, type AuthUser } from "@/lib/auth";

async function requireAdmin(req: Request) {
  const user = await requireAuth(req);
  if (!user || user.role !== "admin") {
    return null;
  }
  return user;
}

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await query<AuthUser>(
    `SELECT id, full_name, email, role, is_active, created_at FROM "User" ORDER BY created_at ASC`
  );
  return NextResponse.json({ data: rows });
}

export async function POST(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureUserTable();
    const { full_name, email, password, role = "editor" } = await req.json();
    if (!full_name || !email || !password) {
      return NextResponse.json({ error: "full_name, email and password are required" }, { status: 400 });
    }
    const password_hash = hashPassword(password);
    const rows = await query<AuthUser>(
      `INSERT INTO "User" (id, full_name, email, password_hash, role)
       VALUES (gen_random_uuid(), $1, $2, $3, $4)
       RETURNING id, full_name, email, role, is_active, created_at`,
      [full_name, email, password_hash, role]
    );
    return NextResponse.json({ data: rows[0] }, { status: 201 });
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e?.code === "23505") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    console.error("register user error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
