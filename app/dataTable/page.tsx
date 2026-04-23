'use client';

import PageTitle from '@/components/general/layout/PageTitle';
import DataTable, {
  type DataTableColumn,
  type ExpandableRowsConfig,
} from '@/components/general/data-display/DataTable';
import Pagination from '@/components/general/data-display/Pagination';
import { harryPotterData } from '@/lib/sampleData/harryPotterUserData';
import { useState, useMemo, useRef } from 'react';
import SearchBar from '@/components/general/data-display/SearchBar';
import { statusToBadgeClasses } from '@/utils/statusBadge';
import { formatDBEnums } from '@/utils/formatUnfriendlyEnums';
import { FiBook, FiEdit2, FiShield, FiTrash2, FiZap } from 'react-icons/fi';
import ConfirmModal from '@/components/general/overlays/ConfirmModal';
// import Toast, { ToastType } from '@/components/general/feedback/Toast';
import {useToast} from '@/hooks/useToast';
import FormModal from '@/components/general/forms/FormModal';
import { useRole } from '../providers/TestingRoleProvider';

export default function DataTableDemo() {
  // role state
  const { isAdmin } = useRole();

  // Ref used to scroll back to the top of the table when changing pages on the data table
  const tableRef = useRef<HTMLDivElement>(null);
  const goToPage = (page: number) => {
    setCurrentPage(page);
    tableRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  // ── Pagination & Search State ─────────────────────────────────────────────
  // In real dev: currentPage, pageSize, and searchQuery are sent as params in the API call
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');

  // In real dev: replace this with const [loading, setLoading] = useState(true) and set it in your fetch useEffect
  const loading = false;

  // ── Sort State ────────────────────────────────────────────────────────────
  // In real dev: sortKey and sortDir are sent as params in the API call (see commented useEffect below)
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Called when a sortable column header is clicked — resets to page 1 and updates sort state
  // In real dev: the useEffect watching these will automatically re-fetch with the new sort params
  const handleSort = (key: string, dir: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDir(dir);
    setCurrentPage(1);
    // In real dev this triggers a re-fetch — the useEffect below will fire automatically because sortKey and sortDir are in its dependency array
    // clearing sort (key === '') sends the request without sortBy/sortDir so the API returns data in its default order
  };

  // ── Data Fetching (real dev) ──────────────────────────────────────────────
  // Replace the hardcoded data below with this pattern in a real app.
  // Add sortKey and sortDir to the fetch and its dependency array so it re-fetches on sort.
  // const [data, setData] = useState<any[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true);
  //     const res = await getRows({
  //       page: currentPage,
  //       perPage: pageSize,
  //       search: searchQuery,
  //       sortBy: sortKey,     // pass '' to use the API's default order
  //       sortDir: sortDir,
  //     });
  //     setData(res.data);
  //     setTotalPages(res.meta.totalPages);
  //     setLoading(false);
  //   }
  //   fetchData();
  // }, [currentPage, pageSize, searchQuery, sortKey, sortDir]);

  // ── Edit Row State ────────────────────────────────────────────────────────
  // Replace these field names with the fields relevant to your data
  const [editRow, setEditRow] = useState<any | null>(null);
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
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deletingRow, setDeletingRow] = useState(false);

  // ── Toast State ───────────────────────────────────────────────────────────
  // const [toast, setToast] = useState<{
  //   type: ToastType;
  //   title: string;
  //   message: string;
  // } | null>(null);

  // const showToast = (type: ToastType, title: string, message: string) => {
  //   setToast({ type, title, message });
  // };
  const { showToast, ToastContainer } = useToast({position: 'top-right'});

  // ── Hardcoded Data (template only) ───────────────────────────────────────
  // In real dev: delete everything below and use the useEffect fetch pattern above instead.
  // The API handles search, pagination, and sort — none of this manual filtering is needed.
  const filteredData = useMemo(() => {
    const q = searchInput.toLowerCase();
    if (!q) return harryPotterData;
    return harryPotterData.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.house.toLowerCase().includes(q) ||
        row.role.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q),
    );
  }, [searchInput]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const pagedData = useMemo(() => {
    // In real dev: remove this sort — the API handles it. This is template-only.
    const sorted = sortKey
      ? [...filteredData].sort((a, b) => {
          const aVal = String((a as any)[sortKey] ?? '').toLowerCase();
          const bVal = String((b as any)[sortKey] ?? '').toLowerCase();
          return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        })
      : filteredData;

    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize, sortKey, sortDir]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPage(1);
  };

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns: DataTableColumn[] = [
    // Plain text column — just key + header, no extra styling
    {
      key: 'name',
      header: 'Name',
      noWrap: true, // prevents text from wrapping to a second line. good for text that logically needs to stay together
      sortable: true, // adds asc/desc arrows to this column header
    },

    // Badge column — use render() to return custom JSX instead of plain text
    // statusToBadgeClasses picks a color automatically based on the value
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

    // Enum column — formatDBEnums converts "IN_GOOD_STANDING" to "In Good Standing"
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium`}>
          {formatDBEnums(row.status)}
        </span>
      ),
    },

    // Plain text column — no render needed, renders the value as-is
    {
      key: 'role',
      header: 'Role',
      sortable: true,
    },

    // Icon column — combine an icon and text inside render()
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

    // Actions column — renders a three-dot menu per row
    // wrap in isAdmin to hide the entire column from non-admins
    ...(isAdmin
      ? [
          {
            key: 'actions',
            header: '',
            actions: [
              {
                label: 'Edit',
                // use icon to put an icon image before the label text
                icon: <FiEdit2 className="h-4 w-4" />, // icon shows before the label in the menu
                onClick: (row: any) => {
                  setEditRowValues({
                    name: row.name,
                    house: row.house,
                    status: row.status,
                    role: row.role,
                    wand: row.wand,
                  });
                  setEditRow(row);
                },
              },
              {
                label: 'Delete',
                icon: <FiTrash2 className="h-4 w-4" />,
                variant: 'danger' as const, // renders this action in red
                onClick: (row: any) => setDeleteTarget(row),
              },
            ],
          },
        ]
      : []),
  ];

  // ── Expandable Rows ───────────────────────────────────────────────────────
  const expandableRows: ExpandableRowsConfig = {
    // isExpandable controls which rows show the expand toggle — return false to hide it
    isExpandable: (row) => row.spells.length > 0,

    expandedTable: {
      getRows: (row) => row.spells, // returns the nested array to show in the expanded section
      gridCols: '1fr 1fr 3fr', // controls column widths using CSS grid syntax
      summary: (rows) => `${rows.length} spell${rows.length !== 1 ? 's' : ''} known`, // summary shows a short label above the expanded rows

      columns: [
        {
          key: 'name',
          header: 'Spell Name',
        },
        {
          key: 'type',
          header: 'Type',
          render: (spell) => (
            <span className="inline-flex items-center text-xs font-medium">{spell.type}</span>
          ),
        },
        // Icon column inside the inner table — same pattern as the outer table
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
      {/* Toast notification — appears in the top right after an action */}
      {/* {toast && (
        <div className="fixed top-4 right-4 z-50 w-[min(420px,calc(100vw-2rem))]">
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => setToast(null)}
            duration={4000}
          />
        </div>
      )} */}
      <ToastContainer/>

      <PageTitle title="SAMPLE DATA TABLE" />

      <div className="space-y-6 px-12 py-8">
        <div className="flex justify-end">
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search wizards…"
            widthClass="w-full sm:w-80 md:w-96"
          />
        </div>

        {/* scrollMarginTop accounts for the sticky header height so the table isn't hidden behind it on page change adjust 150px as needed if you have a different size header*/}
        <div ref={tableRef} style={{ scrollMarginTop: '150px' }}>
          <DataTable
            data={pagedData} // in real dev: pass data from your useState that gets set in the fetch useEffect
            columns={columns}
            expandableRows={expandableRows}
            emptyMessage="No wizards found."
            loading={loading}
            sortKey={sortKey} // tells the table which column is currently sorted
            sortDir={sortDir} // tells the table which direction the sort is
            onSort={handleSort} // called when a sortable column header is clicked
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages} // in real dev: comes from res.meta.totalPages in your fetch
          onPageChange={goToPage}
          pageSize={pageSize}
          setPageSize={(size) => {
            setPageSize(size);
            handlePageSizeChange(size);
          }}
          itemLabel="Wizards"
        />

        {/* Edit Modal — opens when Edit is clicked in the actions menu */}
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
            {
              key: 'wand',
              label: 'Wand Type',
              required: true,
            },
          ]}
          onSubmit={async () => {
            try {
              // await updateRow(editRow.id, editRowValues); — call your API update route here

              showToast({
                type: 'success',
                title: 'Update successful',
                message: 'Wizard information would be saved if this was real.',
            });
              setEditRow(null);

              // After saving, re-fetch to get the updated data:
              // const res = await getRows({ page: currentPage, perPage: pageSize, search: searchQuery });
              // setData(res.data);
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

        {/* Delete Confirmation Modal — opens when Delete is clicked in the actions menu */}
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
              <p className="text-xs">Except this isn't actually real</p>
            </div>
          }
          confirmLabel="Delete"
          busyLabel="Deleting…"
          busy={deletingRow}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={async () => {
            setDeletingRow(true);
            try {
              // await deleteFunctionName(deleteTarget.id); — call your API delete route here

              showToast({
                type: 'success',
                title: 'Wizard (not really) deleted',
                message: `${deleteTarget?.name} would have been removed if this was real.`,
            });
              setDeleteTarget(null);

              // After deleting, re-fetch to get the updated data:
              // const res = await getRows({ page: currentPage, perPage: pageSize, search: searchQuery });
              // setData(res.data);
            } catch (error) {
              console.error('Delete wizard failed:', error);

              showToast({ type: 'error', title: 'Delete failed', message: 'Could not delete the wizard. Please try again.'});
            } finally {
              setDeletingRow(false);
            }
          }}
        />
      </div>
    </>
  );
}
