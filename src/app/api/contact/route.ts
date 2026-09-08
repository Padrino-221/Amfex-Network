import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const result = await db.query(
      `INSERT INTO "ContactMessage" (id, "firstName", "lastName", email, message, read, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, false, NOW())
       RETURNING id`,
      [firstName, lastName, email, message]
    );

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error("contact api error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  // admin only - check pin via header
  return NextResponse.json({ error: "Use /api/admin/messages" }, { status: 404 });
}
