import { NextResponse } from "next/server";
import { requireAuth, publicUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ user: publicUser(user) });
}
