import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { minioClient, SAMPLE_IMAGES_BUCKET } from '@/lib/minioClient';
import { Readable } from 'node:stream';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to turn a MinIO stream into raw bytes to be sent to the browser
function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

// GET /api/files/[id]/sample-image
// Fetches the file from MinIO by id and streams it to the browser
// Works for both embedding on the page and opening in a viewer tab
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = parseInt((await params).id, 10);
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    // Look up the stored MinIO object key for this file
    const sampleImage = await prisma.file.findUnique({
      where: { id },
      select: { link: true },
    });

    if (!sampleImage) return NextResponse.json({ error: 'File not found' }, { status: 404 });
    if (!sampleImage.link) return NextResponse.json({ error: 'Row has no file' }, { status: 404 });

    const key = sampleImage.link;

    // Get the real Content-Type stored in MinIO for this object
    const stat = await minioClient.statObject(SAMPLE_IMAGES_BUCKET, key);
    const contentType =
      stat.metaData?.['content-type'] ??
      stat.metaData?.['Content-Type'] ??
      'application/octet-stream';

    // Fetch the file from MinIO and convert the stream into bytes the browser can render
    const objStream = await minioClient.getObject(SAMPLE_IMAGES_BUCKET, key);
    const buffer = await streamToBuffer(objStream as unknown as Readable);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (err: any) {
    console.error('Sample image GET from MinIO failed:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Failed to fetch sample image from MinIO' },
      { status: 500 },
    );
  }
}
