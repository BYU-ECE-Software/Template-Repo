'use client';

// This page demonstrates the full data table pattern used across ECE apps.
// It shows how to wire up: API fetching, search, pagination, sorting, expandable rows,
// column rendering, edit/delete modals, toasts, and role-based visibility — all together.
//
// Data comes from:
//   app/api/users/route.ts      — the GET route that queries the db with pagination/search/sort
//   lib/api/users.ts            — the client-side fetch function that calls that route
//
// In a real app, swap out getUsers() for your own fetch function and update the columns to match your data.

import PageTitle from '@/components/general/layout/PageTitle';
import DataTable, {
  type DataTableColumn,
  type ExpandableRowsConfig,
} from '@/components/general/data-display/DataTable';
import Pagination from '@/components/general/data-display/Pagination';
import { useState, useEffect, useRef } from 'react';
import SearchBar from '@/components/general/data-display/SearchBar';
import { statusToBadgeClasses } from '@/utils/statusBadge';
import { formatDBEnums } from '@/utils/formatUnfriendlyEnums';
import { FiBook, FiEdit2, FiShield, FiTrash2, FiZap } from 'react-icons/fi';
import ConfirmModal from '@/components/general/overlays/ConfirmModal';
import { useToast } from '@/hooks/useToast';
import FormModal from '@/components/general/forms/FormModal';
import { useRole } from '@/components/dev/TestingRoleProvider';
import { getUsers, type User, type Spell } from '@/lib/api/users';

export default function DataTableDemo() {
  const { isAdmin } = useRole();

  // Ref used to scroll back to the top of the table when changing pages
  const tableRef = useRef<HTMLDivElement>(null);
  const goToPage = (page: number) => {
    setCurrentPage(page);
    tableRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  // ── Pagination & Search State ─────────────────────────────────────────────
  // These three values are sent as query params to the API on every fetch.
  // Any time one of them changes, the useEffect below automatically re-fetches.
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');

  // ── Sort State ────────────────────────────────────────────────────────────
  // sortKey is the column being sorted, sortDir is asc or desc.
  // Both are sent to the API — the API handles the actual sorting, not the frontend.
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Called when a sortable column header is clicked
  // Resets to page 1 so you don't land mid-table after a sort change
  const handleSort = (key: string, dir: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDir(dir);
    setCurrentPage(1);
  };

  // ── Data State ────────────────────────────────────────────────────────────
  // data is the current page of rows from the API.
  // totalPages comes from res.meta.totalPages — the API calculates this based on the total row count.
  const [data, setData] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // ── Data Fetching ─────────────────────────────────────────────────────────
  // This useEffect is the core of how the table works.
  // It runs once on mount, and again any time a value in the dependency array changes.
  // The API at app/api/users/route.ts receives these as query params and returns the right slice of data.
  // In real dev: replace getUsers() with your own fetch function from lib/api/
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getUsers({
          page: currentPage,
          perPage: pageSize,
          search: searchInput,
          sortBy: sortKey || undefined, // undefined tells the API to use its default sort order
          sortDir: sortDir,
        });
        setData(res.data);
        setTotalPages(res.meta.totalPages); // totalPages drives the Pagination component below
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage, pageSize, searchInput, sortKey, sortDir]);

  // ── Edit Row State ────────────────────────────────────────────────────────
  // editRow holds the full row object so we know which record is being edited.
  // editRowValues holds the current form field values inside the edit modal.
  // In real dev: update the type to match the shape of your own data.
  const [editRow, setEditRow] = useState<User | null>(null);
  const [editRowValues, setEditRowValues] = useState<{
    name: string;
    house: string;
    status: 'IN_GOOD_STANDING' | 'ON_PROBATION' | 'BANNED' | 'INACTIVE';
    role: string;
    wand: string;
  }>({
    name: '',
    house: '',
    status: 'IN_GOOD_STANDING',
    role: '',
    wand: '',
  });

  // Disables the submit button until all required fields are filled
  const isEditRowValid =
    editRowValues.name.trim() !== '' &&
    editRowValues.house !== '' &&
    editRowValues.role !== '' &&
    editRowValues.wand.trim() !== '';

  // ── Delete Row State ──────────────────────────────────────────────────────
  // deleteTarget holds the row being deleted so we can show the name in the confirm modal
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deletingRow, setDeletingRow] = useState(false);

  // ── Toast ─────────────────────────────────────────────────────────────────
  // useToast is a custom hook that manages a queue of toast notifications.
  // ToastContainer renders them — place it once near the top of your JSX.
  // Call showToast({ type, title, message }) anywhere in the component.
  const { showToast, ToastContainer } = useToast({ position: 'top-right' });

  // Reset to page 1 whenever search changes so results always start from the beginning
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1);
  };

  // ── Columns ───────────────────────────────────────────────────────────────
  // Each object in this array defines one column in the table.
  // key must match the field name in your data object.
  // render() lets you return custom JSX instead of plain text.
  // sortable: true adds asc/desc arrows to the header.
  const columns: DataTableColumn<User>[] = [
    // Plain text column — no render needed, key renders the value directly
    {
      key: 'name',
      header: 'Name',
      noWrap: true, // stops the text from wrapping — good for names and IDs
      sortable: true, // clicking the header sends sortBy=name to the API
    },

    // Badge column — render() returns a colored pill using statusToBadgeClasses()
    // statusToBadgeClasses() is a utility in utils/statusBadge.ts that maps keywords to colors
    // In real dev: use this for any field where color communicates meaning (status, category, etc.)
    {
      key: 'house',
      header: 'House',
      sortable: true,
      render: (row) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${statusToBadgeClasses(row.house)}`}
        >
          {row.house}
        </span>
      ),
    },

    // Enum column — formatDBEnums() is a utility in utils/formatUnfriendlyEnums.ts
    // It converts db-style values like "IN_GOOD_STANDING" into readable "In Good Standing"
    // In real dev: use this anywhere you have enum values coming back from the db
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
          {formatDBEnums(row.status)}
        </span>
      ),
    },

    // Plain text column — role is an enum in the db but renders fine as plain text here
    {
      key: 'role',
      header: 'Role',
      sortable: true,
    },

    // Icon column — combine a react-icon with text inside render()
    // In real dev: use this to add visual context to any column
    {
      key: 'wand',
      header: 'Wand',
      render: (row) => (
        <span className="flex items-center gap-1.5 text-gray-700">
          <FiZap className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          {row.wand}
        </span>
      ),
    },

    // Actions column — renders a three-dot dropdown menu per row
    // Each action gets a label, icon, and onClick. variant: 'danger' renders in red.
    // Wrapping in isAdmin hides the entire column from non-admin users.
    // In real dev: remove the isAdmin check if all users should have access, or swap in your own auth check
    ...(isAdmin
      ? ([
          {
            key: 'actions',
            header: '',
            actions: [
              {
                label: 'Edit',
                icon: <FiEdit2 className="h-4 w-4" />,
                onClick: (row) => {
                  // Pre-fill the edit form with the current row values before opening the modal
                  setEditRowValues({
                    name: row.name,
                    house: row.house,
                    status: row.status as
                      | 'IN_GOOD_STANDING'
                      | 'ON_PROBATION'
                      | 'BANNED'
                      | 'INACTIVE',
                    role: row.role,
                    wand: row.wand,
                  });
                  setEditRow(row);
                },
              },
              {
                label: 'Delete',
                icon: <FiTrash2 className="h-4 w-4" />,
                variant: 'danger' as const, // renders this menu item in red
                onClick: (row) => setDeleteTarget(row),
              },
            ],
          },
        ] satisfies DataTableColumn<User>[])
      : []),
  ];

  // ── Expandable Rows ───────────────────────────────────────────────────────
  // Expandable rows let you show nested data inside a row without navigating away.
  // isExpandable controls which rows get the expand toggle — rows that return false won't show one.
  // expandedTable defines the inner table that appears when a row is expanded.
  // In real dev: use this for one-to-many relationships (e.g. a user with many orders)
  const expandableRows: ExpandableRowsConfig<User, Spell> = {
    isExpandable: (row) => row.spells.length > 0,

    expandedTable: {
      getRows: (row) => row.spells, // the nested array to display inside the expanded section
      gridCols: '1fr 1fr 3fr', // CSS grid column widths for the inner table
      summary: (rows) => `${rows.length} spell${rows.length !== 1 ? 's' : ''} known`,

      columns: [
        { key: 'name', header: 'Spell Name' },
        {
          key: 'type',
          header: 'Type',
          render: (spell) => (
            <span className="inline-flex items-center text-xs font-medium">{spell.type}</span>
          ),
        },
        // Icon column inside the inner table — same render() pattern as the outer table
        {
          key: 'category',
          header: 'Category',
          render: (spell) => {
            const isDark = spell.type === 'Unforgivable' || spell.type === 'Dark';
            const isDefensive = spell.type === 'Defensive';
            return (
              <span
                className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-red-600' : isDefensive ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {isDark || isDefensive ? (
                  <FiShield className="h-3.5 w-3.5" />
                ) : (
                  <FiBook className="h-3.5 w-3.5" />
                )}
                {isDark ? 'Dark Arts' : isDefensive ? 'Defensive' : 'Standard'}
              </span>
            );
          },
        },
      ],
    },
  };

  return (
    <>
      <ToastContainer />
      <PageTitle title="SAMPLE DATA TABLE" />

      <div className="px-6 py-10">
        <div className="mx-auto max-w-7xl space-y-10">
          {/* ── How the data gets here ──────────────────────────────────────
            This section explains the full data flow so devs understand what is happening */}
          <div className="space-y-3 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">How the data gets here</h2>
            <p className="text-sm text-gray-600">
              This table pulls live data from the database — no hardcoded arrays. The flow is:
            </p>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-600">
              <li>
                <code className="rounded bg-gray-100 px-1">lib/api/users.ts</code> — exports{' '}
                <code className="rounded bg-gray-100 px-1">getUsers()</code>, a fetch function that
                calls the API with pagination, search, and sort params
              </li>
              <li>
                <code className="rounded bg-gray-100 px-1">app/api/users/route.ts</code> — the GET
                route that receives those params, queries the db via Prisma, and returns a page of
                results plus pagination metadata
              </li>
              <li>
                A <code className="rounded bg-gray-100 px-1">useEffect</code> on this page calls{' '}
                <code className="rounded bg-gray-100 px-1">getUsers()</code> whenever page, page
                size, search, or sort changes — the table always reflects the current state
              </li>
            </ol>
            <p className="text-sm text-gray-500 italic">
              In real dev: replace <code className="rounded bg-gray-100 px-1">getUsers()</code> with
              your own fetch function from{' '}
              <code className="rounded bg-gray-100 px-1">lib/api/</code> and update the columns to
              match your schema.
            </p>
          </div>

          {/* ── Search ───────────────────────────────────────────────────────
            SearchBar is a controlled input — its value and onChange are managed in state above.
            Changing the search resets to page 1 and triggers a re-fetch via the useEffect. */}
          <div className="space-y-3">
            <h2 className="text-byu-navy text-lg font-semibold">Search</h2>
            <p className="text-sm text-gray-500">
              Search is handled server-side — the API filters results, not the frontend. Type to
              search by name or house. Results update automatically.
            </p>
            <div className="flex justify-end">
              <SearchBar
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search wizards…"
                widthClass="w-full sm:w-80 md:w-96"
              />
            </div>
          </div>

          {/* ── Data Table ───────────────────────────────────────────────────
            The table itself. All the interesting stuff is in the columns array above.
            Sortable columns send sortBy/sortDir to the API on click.
            Expandable rows show nested spell data inline.
            The actions column (admin only) opens edit/delete modals. */}
          <div className="space-y-3">
            <h2 className="text-byu-navy text-lg font-semibold">Data Table</h2>
            <p className="text-sm text-gray-500">
              Each column demonstrates a different rendering pattern — plain text, colored badges,
              enum formatting, icons, and action menus. Sortable columns are marked with arrows.
              Rows with spells have an expand toggle. The three-dot action menu is admin-only —
              toggle your role in the header to see it appear and disappear.
            </p>

            {/* scrollMarginTop accounts for the sticky header so the table isn't hidden behind it on page change */}
            <div ref={tableRef} style={{ scrollMarginTop: '150px' }}>
              <DataTable
                data={data} // current page of results from the API
                columns={columns}
                expandableRows={expandableRows}
                emptyMessage="No wizards found."
                loading={loading} // shows a loading state while the API call is in flight
                sortKey={sortKey} // which column is currently sorted
                sortDir={sortDir} // asc or desc
                onSort={handleSort} // called when a sortable column header is clicked
              />
            </div>
          </div>

          {/* ── Pagination ───────────────────────────────────────────────────
            Pagination is also server-side. currentPage and pageSize are sent to the API.
            totalPages comes back from res.meta.totalPages in the API response.
            Changing page or page size triggers a re-fetch via the useEffect. */}
          <div className="space-y-3">
            <h2 className="text-byu-navy text-lg font-semibold">Pagination</h2>
            <p className="text-sm text-gray-500">
              The API returns one page of results at a time. Use the controls below to navigate
              pages or change how many results show per page. The total page count comes from the
              API response — the frontend never calculates it.
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // from res.meta.totalPages
              onPageChange={goToPage}
              pageSize={pageSize}
              setPageSize={(size) => {
                setPageSize(size);
                setCurrentPage(1); // reset to page 1 when page size changes
              }}
              itemLabel="Wizards"
            />
          </div>

          {/* ── Column rendering patterns ─────────────────────────────────── */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Column Rendering Patterns</h2>
            <p className="text-sm text-gray-600">
              The five column types used in the table above — each is a different way to pass data
              into a DataTable column definition.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1 rounded-lg border bg-gray-50 p-4">
                <p className="text-byu-navy text-sm font-semibold">Plain text</p>
                <p className="text-xs text-gray-500">
                  Just <code className="rounded bg-gray-100 px-1">key</code> +{' '}
                  <code className="rounded bg-gray-100 px-1">header</code> — no render needed. Used
                  for name and role.
                </p>
              </div>
              <div className="space-y-1 rounded-lg border bg-gray-50 p-4">
                <p className="text-byu-navy text-sm font-semibold">Badge / colored pill</p>
                <p className="text-xs text-gray-500">
                  <code className="rounded bg-gray-100 px-1">render()</code> returns a{' '}
                  <code className="rounded bg-gray-100 px-1">{'<span>'}</code> with classes from{' '}
                  <code className="rounded bg-gray-100 px-1">statusToBadgeClasses()</code>. Used for
                  house.
                </p>
              </div>
              <div className="space-y-1 rounded-lg border bg-gray-50 p-4">
                <p className="text-byu-navy text-sm font-semibold">Enum formatting</p>
                <p className="text-xs text-gray-500">
                  <code className="rounded bg-gray-100 px-1">formatDBEnums()</code> converts{' '}
                  <code className="rounded bg-gray-100 px-1">IN_GOOD_STANDING</code> →{' '}
                  <code className="rounded bg-gray-100 px-1">In Good Standing</code>. Used for
                  status.
                </p>
              </div>
              <div className="space-y-1 rounded-lg border bg-gray-50 p-4">
                <p className="text-byu-navy text-sm font-semibold">Icon + text</p>
                <p className="text-xs text-gray-500">
                  <code className="rounded bg-gray-100 px-1">render()</code> returns an icon
                  alongside text using{' '}
                  <code className="rounded bg-gray-100 px-1">flex items-center gap-1.5</code>. Used
                  for wand.
                </p>
              </div>
              <div className="space-y-1 rounded-lg border bg-gray-50 p-4">
                <p className="text-byu-navy text-sm font-semibold">Actions menu</p>
                <p className="text-xs text-gray-500">
                  Pass an <code className="rounded bg-gray-100 px-1">actions</code> array instead of{' '}
                  <code className="rounded bg-gray-100 px-1">render()</code>. Each action gets a
                  label, icon, and onClick.{' '}
                  <code className="rounded bg-gray-100 px-1">variant: &apos;danger&apos;</code>{' '}
                  renders in red.
                </p>
              </div>
              <div className="space-y-1 rounded-lg border bg-gray-50 p-4">
                <p className="text-byu-navy text-sm font-semibold">Expandable rows</p>
                <p className="text-xs text-gray-500">
                  Pass <code className="rounded bg-gray-100 px-1">expandableRows</code> to the
                  DataTable with an inner column definition. The expand toggle only appears when{' '}
                  <code className="rounded bg-gray-100 px-1">isExpandable</code> returns true.
                </p>
              </div>
            </div>
          </div>

          {/* Edit Modal — opens when Edit is clicked in the three-dot menu
            Pre-fills with the current row values. submitDisabled blocks the button until required fields are filled. */}
          <FormModal
            open={Boolean(editRow)}
            title="Edit Wizard"
            onClose={() => setEditRow(null)}
            values={editRowValues}
            setValues={setEditRowValues}
            submitDisabled={!isEditRowValid}
            fields={[
              { key: 'name', label: 'Wizard Name', required: true },
              {
                key: 'house',
                label: 'House',
                kind: 'select',
                required: true,
                options: [
                  { label: 'Gryffindor', value: 'Gryffindor' },
                  { label: 'Hufflepuff', value: 'Hufflepuff' },
                  { label: 'Slytherin', value: 'Slytherin' },
                  { label: 'Ravenclaw', value: 'Ravenclaw' },
                  { label: 'Beauxbatons', value: 'Beauxbatons' },
                  { label: 'Durmstrang', value: 'Durmstrang' },
                ],
              },
              {
                key: 'status',
                label: 'Status',
                kind: 'select',
                options: [
                  { label: 'In Good Standing', value: 'IN_GOOD_STANDING' },
                  { label: 'On Probation', value: 'ON_PROBATION' },
                  { label: 'Banned', value: 'BANNED' },
                  { label: 'Inactive', value: 'INACTIVE' },
                ],
              },
              {
                key: 'role',
                label: 'Role',
                kind: 'radio',
                required: true,
                options: [
                  { label: 'Student', value: 'Student' },
                  { label: 'Order of the Phoenix', value: 'Order of the Phoenix' },
                  { label: 'Professor', value: 'Professor' },
                  { label: 'Death Eater', value: 'Death Eater' },
                ],
              },
              { key: 'wand', label: 'Wand Type', required: true },
            ]}
            onSubmit={async () => {
              try {
                // In real dev: call your PUT route here
                // await updateUser(editRow.id, editRowValues);

                showToast({
                  type: 'success',
                  title: 'Update successful',
                  message: 'Wizard information would be saved if the PUT endpoint existed.',
                });
                setEditRow(null);

                // After a mutation, the useEffect won't re-run automatically.
                // The cleanest way to force a re-fetch is a refresh counter:
                //   const [refreshKey, setRefreshKey] = useState(0);
                //   setRefreshKey(k => k + 1);
                // Then add refreshKey to the useEffect dependency array.
              } catch (error) {
                console.error('Update wizard failed:', error);
                showToast({
                  type: 'error',
                  title: 'Update failed',
                  message: 'Wizard edit was unsuccessful. Please try again.',
                });
              }
            }}
          />

          {/* Delete Confirmation Modal — opens when Delete is clicked in the three-dot menu
            Shows the wizard name so the user knows exactly what they are deleting. */}
          <ConfirmModal
            open={Boolean(deleteTarget)}
            title="Delete Wizard"
            message={
              <div className="space-y-2">
                <p>
                  Are you sure you want to delete the record for{' '}
                  <span className="font-semibold">{deleteTarget?.name}</span>?
                </p>
                <p className="font-medium">This action cannot be undone.</p>
                <p className="text-xs">Except this isn&apos;t actually real</p>
              </div>
            }
            confirmLabel="Delete"
            busyLabel="Deleting…"
            busy={deletingRow}
            variant="danger"
            onCancel={() => setDeleteTarget(null)}
            onConfirm={async () => {
              setDeletingRow(true);
              try {
                // In real dev: call your DELETE route here
                // await deleteUser(deleteTarget.id);

                showToast({
                  type: 'success',
                  title: 'Wizard (not really) deleted',
                  message: `${deleteTarget?.name} would have been removed if the DELETE endpoint existed.`,
                });
                setDeleteTarget(null);

                // Same refresh pattern as the edit modal
                // setRefreshKey(k => k + 1);
              } catch (error) {
                console.error('Delete wizard failed:', error);
                showToast({
                  type: 'error',
                  title: 'Delete failed',
                  message: 'Could not delete the wizard. Please try again.',
                });
              } finally {
                setDeletingRow(false);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
