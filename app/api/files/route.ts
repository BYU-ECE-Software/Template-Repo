// =============================================
// FILE: app/api/files/route.ts
// =============================================
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/files - Create a new file record in the database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { link } = body;

    // link is a required field — reject the request if it's missing
    if (!link) {
      return NextResponse.json({ error: 'link is required' }, { status: 400 });
    }

    // Create a new row in the files table
    const file = await prisma.file.create({
      data: { link },
    });

    return NextResponse.json({ message: 'File created', file }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
}

// GET /api/files - Return all rows in the files table
export async function GET() {
  try {
    const files = await prisma.file.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ data: files }, { status: 200 });
  } catch (error) {
    console.error('GET /api/files error', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}
