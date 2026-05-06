// =============================================
// FILE: lib/api/users.ts
// =============================================
// This is the client-side api call file for the users table.
// Every fetch() call that talks to /api/users lives here — not in page files.
//
// Page components can call fetch() directly without this intermediate client api file. However, if you are going to use these fetch() calls on
// multiple pages, it is recommended to use a client api file to centralize the call. That way it can be reused every time and you know it works.
// This keeps all your api calls in one place and makes them easy to find and update.
//
// One file per db table. If you have a receipts table, make lib/api/receipts.ts.
// If you have a users table, this is it.

// ── Types ─────────────────────────────────────────────────────────────────────
// Define the shape of the data coming back from the API.
// These should match what the route returns — update them when the route changes.
// In real dev: replace these with types that match your actual schema.

export type Spell = {
  id: number;
  name: string;
  type: string;
};

export type User = {
  id: number;
  name: string;
  house: string;
  role: string;
  status: string;
  wand: string;
  spells: Spell[];
  createdAt: string;
  updatedAt: string;
};

// The shape of the full GET response — data is the array, meta is pagination info
type GetUsersResponse = {
  data: User[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

// ── Query params ──────────────────────────────────────────────────────────────
// All optional — the API has sensible defaults for everything.
// Pass only what you need. Unused params are just omitted from the URL.
type GetUsersParams = {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

// ── GET all users ─────────────────────────────────────────────────────────────
// Fetches a paginated, searchable, sortable list of users from the API.
// Call this inside a useEffect on your page — re-call it whenever page, perPage,
// search, sortBy, or sortDir changes by putting them in the dependency array.
//
// In real dev: rename this function to match your table e.g. getReceipts, getEquipment
export async function getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
  // Build the query string from whatever params were passed in
  // URLSearchParams automatically skips undefined values
  const query = new URLSearchParams();

  if (params.page !== undefined) query.set('page', String(params.page));
  if (params.perPage !== undefined) query.set('perPage', String(params.perPage));
  if (params.search) query.set('search', params.search);
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.sortDir) query.set('sortDir', params.sortDir);

  const queryString = query.toString();
  const url = `/api/users${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}
