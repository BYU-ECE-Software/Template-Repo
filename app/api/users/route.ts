// =============================================
// FILE: app/api/users/route.ts
// =============================================
// This is an example of a GET all route — one of the most common routes you will write.
// In Next.js the folder path that holds a route.ts file becomes the API path. /api/users in this case
// Routes that don't need a specific id like POST or GET all can be found in this file.
// Routes that need an id like PUT or DELETE should be in a route.ts file within a /[id]/ folder such as /api/users/[id]
//
// This route supports:
//   - Pagination  (page, perPage)
//   - Search      (search) — // Searches name and house — both are plain string columns.
//   - Sorting     (sortBy, sortDir)
//
// All three are passed as query params from the frontend.
// The API does the filtering, sorting, and slicing — the frontend just passes params and renders results.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Small helper to safely parse query params as integers with a fallback default
function toIntOrDefault(val: string | null, defaultVal: number): number {
  const n = parseInt(val ?? '', 10);
  return Number.isFinite(n) ? n : defaultVal;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    // ── Pagination ────────────────────────────────────────────────────────
    // page is 1-based. perPage is capped at 100 to prevent accidental full-table fetches.
    // In real dev: pass these from the frontend via your pagination component.
    const page = toIntOrDefault(params.get('page'), 1);
    const perPageRequested = toIntOrDefault(params.get('perPage'), 20);
    const PER_PAGE_MAX = 100;
    const perPage = Math.min(perPageRequested, PER_PAGE_MAX);
    const skip = (page - 1) * perPage;

    // ── Search ────────────────────────────────────────────────────────────
    // Trims whitespace and defaults to empty string if not provided.
    // Add or remove fields in the OR block to match what makes sense to search in your table.
    const search = params.get('search')?.trim() ?? '';

    // ── Sort ──────────────────────────────────────────────────────────────
    // sortBy defaults to createdAt (newest first).
    // sortDir defaults to desc. Only 'asc' overrides it — anything else stays desc.
    // In real dev: add the column names you want to support sorting by.
    const sortBy = params.get('sortBy') ?? 'createdAt';
    const sortDir = params.get('sortDir') === 'asc' ? 'asc' : 'desc';

    // ── Where clause ──────────────────────────────────────────────────────
    // Only applies filters when search is non-empty.
    // 'insensitive' makes the search case-insensitive.
    // In real dev: update the OR fields to match the columns in your table.
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { house: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // ── Count ─────────────────────────────────────────────────────────────
    // Total matching rows — needed to calculate totalPages on the frontend.
    // Always count with the same where clause as the query below.
    const total = await prisma.user.count({ where });

    // ── Query ─────────────────────────────────────────────────────────────
    // Fetches one page of results. include brings in related data from other tables.
    // select inside include controls which fields come back from the related table.
    // In real dev: update include/select to match your schema's relations.
    const users = await prisma.user.findMany({
      where,
      orderBy: { [sortBy]: sortDir },
      skip,
      take: perPage,
      include: {
        spells: {
          include: {
            spell: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    // ── Shape the response ────────────────────────────────────────────────
    // Flatten the join table so the frontend gets spells as a simple array.
    // Without this, spells would come back as [{ spellId, userId, spell: {...} }]
    // which is awkward to work with. This maps it to [{ id, name, type }] instead.
    const shaped = users.map((user) => ({
      ...user,
      spells: user.spells.map((us) => us.spell),
    }));

    const totalPages = Math.max(1, Math.ceil(total / perPage));

    // ── Response ──────────────────────────────────────────────────────────
    // data is the array of results for the current page.
    // meta is pagination info the frontend needs to render the pagination component.
    return NextResponse.json(
      {
        data: shaped,
        meta: {
          total,
          page,
          perPage,
          totalPages,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('GET /api/users error', err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
