import { NextResponse } from 'next/server';
import { minioClient, SAMPLE_IMAGES_BUCKET } from '@/lib/minio/client';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

// POST /api/minio/sample-images
// Accepts a file via multipart form, uploads it to the sample-images MinIO bucket,
// and returns the object key. That key is then saved to the database by the caller.
// The form field must be named "link"

// Pulls the file extension off the original filename so we can preserve it on the stored object
function extFromFilename(name: string) {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i).toLowerCase() : '';
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('link');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing file (field name must be 'link')" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Give the file a random unique name so nothing ever collides in the bucket
    const ext = extFromFilename(file.name);
    const objectName = `${randomUUID()}${ext}`;

    // Upload to MinIO — objectName is what gets stored in the db, not the original filename
    await minioClient.putObject(
      SAMPLE_IMAGES_BUCKET,
      objectName,
      buffer,
      buffer.length,
      file.type ? { 'Content-Type': file.type } : undefined,
    );

    return NextResponse.json({ link: objectName }, { status: 201 });
  } catch (err) {
    console.error('Upload failed:', err);
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
