import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];

export async function POST(req: Request) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded (field name: file)" }, { status: 400 });
    }

    const allowed = [...IMAGE_TYPES, ...VIDEO_TYPES];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only image (JPEG, PNG, WEBP, GIF, SVG) and video (MP4, WEBM) files are allowed" },
        { status: 400 }
      );
    }

    // On Vercel, use Blob Storage if configured; locally fallback to filesystem
    const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

    if (hasBlob) {
      const { put } = await import("@vercel/blob");
      const ext = file.name.split(".").pop() || (VIDEO_TYPES.includes(file.type) ? "mp4" : "png");
      const blob = await put(`uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`, file, {
        access: "public",
        addRandomSuffix: false,
      });
      return NextResponse.json({ data: { url: blob.url, filename: blob.pathname } }, { status: 201 });
    }

    // Local dev fallback: write to public/uploads (ephemeral on Vercel, persistent locally)
    const { writeFile, mkdir } = await import("fs/promises");
    const path = await import("path");
    const crypto = await import("crypto");
    const isVideo = VIDEO_TYPES.includes(file.type);
    const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".png");
    const filename = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);

    return NextResponse.json({ data: { url: `/uploads/${filename}`, filename } }, { status: 201 });
  } catch (err) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
