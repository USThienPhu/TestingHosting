import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'file.jpg';

  try {
    // Read the body as a buffer or arrayBuffer
    const buffer = Buffer.from(await request.arrayBuffer());

    // Check if Vercel Blob Token is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, buffer, {
        access: 'public',
        addRandomSuffix: true,
      });
      return NextResponse.json(blob);
    } else {
      // Check if we are running on Vercel (read-only filesystem)
      if (process.env.VERCEL === '1') {
        return NextResponse.json(
          { error: "Vercel Blob is not configured. Please add BLOB_READ_WRITE_TOKEN to your Vercel Environment Variables." },
          { status: 500 }
        );
      }

      // Fallback: Save locally in public/uploads/ (only for local development)
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate a unique filename to avoid duplicates
      const uniqueFilename = `${Date.now()}-${filename.replace(/\s+/g, '_')}`;
      const filePath = path.join(uploadDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        url: `/uploads/${uniqueFilename}`,
        pathname: uniqueFilename,
        contentType: 'image/jpeg'
      });
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}