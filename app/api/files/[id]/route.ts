import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { minioClient, SAMPLE_IMAGES_BUCKET } from '@/lib/minioClient';

// DELETE /api/files/[id] - Delete a file row from the db and remove the object from MinIO
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const fileId = Number(id);

    if (isNaN(fileId)) {
      return NextResponse.json({ error: 'Invalid file id' }, { status: 400 });
    }

    // 1) Find the file first so we can grab the MinIO key before deleting
    const existing = await prisma.file.findUnique({
      where: { id: fileId },
      select: { link: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // 2) Delete the row from the db
    const deleted = await prisma.file.delete({
      where: { id: fileId },
    });

    // 3) Best-effort delete the object from MinIO — don't fail the whole request if this errors
    if (existing.link) {
      try {
        await minioClient.removeObject(SAMPLE_IMAGES_BUCKET, existing.link);
      } catch (err) {
        // don't fail the whole deletion if MinIO cleanup fails
        console.warn('MinIO file delete failed:', err);
      }
    }

    return NextResponse.json({ message: 'File deleted', file: deleted });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}

// PUT /api/files/[id] - Update the link on a file row and clean up the old MinIO object
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const fileId = Number(id);

    if (isNaN(fileId)) {
      return NextResponse.json({ error: 'Invalid file id' }, { status: 400 });
    }

    const body = await request.json();

    // 1) Find the existing row so we can compare the old MinIO key to the new one
    const existing = await prisma.file.findUnique({
      where: { id: fileId },
      select: { link: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const oldKey = existing.link ?? null;

    // 2) Update the row in the db
    const updated = await prisma.file.update({
      where: { id: fileId },
      data: { link: body?.link },
    });

    const newKey = updated.link ?? null;

    // 3) If the link changed, delete the old object from MinIO — best-effort, don't fail the update
    if (oldKey && oldKey !== newKey) {
      try {
        await minioClient.removeObject(SAMPLE_IMAGES_BUCKET, oldKey);
      } catch (err) {
        console.warn('MinIO old file cleanup failed:', err);
      }
    }

    return NextResponse.json({ message: 'File updated', file: updated });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 });
  }
}
