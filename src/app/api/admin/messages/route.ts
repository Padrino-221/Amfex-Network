import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await query(
    `SELECT * FROM "ContactMessage" ORDER BY "createdAt" DESC LIMIT 200`
  );
  return NextResponse.json({ data: rows });
}

export async function PUT(req: Request) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await query(`UPDATE "ContactMessage" SET read = true WHERE id = $1`, [id]);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await query(`DELETE FROM "ContactMessage" WHERE id = $1`, [id]);
  return NextResponse.json({ success: true });
}
