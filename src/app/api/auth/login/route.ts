import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensureUserTable, verifyPassword, signToken, publicUser, type AuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await ensureUserTable();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const rows = await query<(AuthUser & { password_hash: string })>(`SELECT * FROM "User" WHERE email = $1`, [email]);
    const user = rows[0];
    if (!user || !user.is_active) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const valid = verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return NextResponse.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error("login error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
