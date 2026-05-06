'use client';

// This page demonstrates the full MinIO file lifecycle: upload, save to db, retrieve/display, update, and delete
// Step 1 — upload the file to MinIO and get back an object key
// Step 2 — save that key to the database via a POST to /api/files
// Step 3 — retrieve files from the db and display them by calling the GET route which fetches from MinIO on demand
// Step 4 — update a file row (uploads new file to MinIO, saves new key, deletes old object from MinIO)
// Step 5 — delete a file row (removes from db and deletes the object from MinIO)
// See lib/minio/uploadedFiles.ts for the api calls and app/api/minio/sample-images/route.ts for the routes

import { useState, useEffect } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import Button from '@/components/general/actions/Button';
import type { ToastType } from '@/components/general/feedback/Toast';
import Toast from '@/components/general/feedback/Toast';
import FilePicker from '@/components/general/forms/FilePicker';
import DataTable, { type DataTableColumn } from '@/components/general/data-display/DataTable';
import ConfirmModal from '@/components/general/overlays/ConfirmModal';
import BaseModal from '@/components/general/overlays/BaseModal';
import {
  uploadSampleImage,
  submitFile,
  getFiles,
  updateFile,
  deleteFile,
} from '@/lib/minio/uploadedFiles';
import { FiExternalLink, FiEdit2, FiTrash2 } from 'react-icons/fi';

type SampleFile = {
  id: number;
  link: string;
  createdAt: string;
  updatedAt: string;
};

export default function MinioPage() {
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<SampleFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  // Edit state — holds the row being edited and the new file the user picks
  const [editTarget, setEditTarget] = useState<SampleFile | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);

  // Delete state — holds the row being deleted
  const [deleteTarget, setDeleteTarget] = useState<SampleFile | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState<{ type: ToastType; title: string; message: string } | null>(
    null,
  );

  const showToast = (type: ToastType, title: string, message: string) => {
    setToast({ type, title, message });
  };

  // Load all file rows from the db on mount — the link column holds the MinIO object key
  const fetchFiles = async () => {
    try {
      const res = await getFiles();
      setFiles(res.data);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // ── Upload ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!file) {
      showToast('warning', 'No file selected', 'Please choose a file before uploading.');
      return;
    }

    setSubmitting(true);

    try {
      // Step 1 — send the file to the MinIO route, get back the unique object key
      // In real dev: replace uploadSampleImage with the function for your bucket
      const objectKey = await uploadSampleImage(file);

      // Step 2 — save that key to the db so you can reference the file later
      // In real dev: replace submitFile with the POST call for your specific table
      await submitFile({ link: objectKey });

      setFile(null);
      showToast('success', 'Upload successful', 'Your file was uploaded and saved successfully.');

      // Refresh the table so the newly uploaded file appears immediately
      fetchFiles();
    } catch (error) {
      console.error('Upload failed:', error);
      showToast('error', 'Upload failed', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Update ────────────────────────────────────────────────────────────────
  // Update works by uploading the new file to MinIO first, then passing the new key
  // to the PUT route which saves the new key and deletes the old MinIO object
  //
  // In real dev: your table will likely have more fields than just link (e.g. name, description).
  // In that case, only upload to MinIO if the user actually picked a new file — otherwise
  // keep the existing key and pass it through unchanged so the PUT route skips the MinIO cleanup.
  // Example pattern:
  //   let newKey = existingRow.link;              // default to keeping the old key
  //   if (newFile) newKey = await uploadFn(newFile); // only upload if a new file was picked
  //   await updateRow(id, { name, link: newKey }); // always save all fields to db
  const handleUpdate = async () => {
    if (!editTarget || !editFile) return;
    setUpdating(true);

    try {
      // Upload the new file to MinIO and get back a new object key
      const newKey = await uploadSampleImage(editFile);

      // Save the new key to the db — the PUT route also deletes the old MinIO object
      await updateFile(editTarget.id, { link: newKey });

      setEditTarget(null);
      setEditFile(null);
      showToast('success', 'File updated', 'The file was replaced successfully.');
      fetchFiles();
    } catch (error) {
      console.error('Update failed:', error);
      showToast('error', 'Update failed', 'Something went wrong. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  // Delete removes the row from the db and also deletes the object from MinIO
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await deleteFile(deleteTarget.id);

      setDeleteTarget(null);
      showToast('success', 'File deleted', 'The file was removed from MinIO and the database.');
      fetchFiles();
    } catch (error) {
      console.error('Delete failed:', error);
      showToast('error', 'Delete failed', 'Something went wrong. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const columns: DataTableColumn<SampleFile>[] = [
    {
      key: 'id',
      header: 'ID',
      noWrap: true,
    },
    // Renders the file directly on the page by calling the GET route with the row id
    // The route fetches the file bytes from MinIO and streams them back as an HTTP response
    // Only works for image file types — non-images will show the fallback message
    {
      key: 'link_on_page',
      header: 'Render Inline',
      render: (row) => {
        if (!row.link) return null;

        return (
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/files/${row.id}/sample-image?t=${new Date(row.updatedAt).getTime()}`}
              alt={row.id != null ? String(row.id) : 'Item photo'}
              className="h-full w-full object-contain"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.display = 'none';
                const msg = document.createElement('p');
                msg.textContent = 'File type is not an image';
                msg.className = 'text-xs text-gray-400 italic text-center';
                img.parentElement?.appendChild(msg);
              }}
            />
          </div>
        );
      },
    },
    // Opens the file in a new browser tab using the same GET route
    // Works for any file type — images open in the browser, PDFs open in the PDF viewer
    {
      key: 'link_in_tab',
      header: 'Open in Viewer Tab',
      render: (row) => {
        if (!row.link) return null;

        return (
          <button
            type="button"
            className="text-byu-royal flex cursor-pointer items-center gap-1 text-xs font-medium whitespace-nowrap hover:underline"
            onClick={() => window.open(`/api/files/${row.id}/sample-image`, '_blank')}
          >
            View <FiExternalLink className="h-3 w-3" />
          </button>
        );
      },
    },
    // Edit and delete actions — edit opens a modal to pick a replacement file,
    // delete opens a confirmation modal before removing from db and MinIO
    {
      key: 'actions',
      header: '',
      actions: [
        {
          label: 'Replace file',
          icon: <FiEdit2 className="h-4 w-4" />,
          onClick: (row) => {
            setEditTarget(row);
            setEditFile(null);
          },
        },
        {
          label: 'Delete',
          icon: <FiTrash2 className="h-4 w-4" />,
          variant: 'danger',
          onClick: (row) => setDeleteTarget(row),
        },
      ],
    },
  ];

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 w-[min(420px,calc(100vw-2rem))]">
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => setToast(null)}
            duration={4000}
          />
        </div>
      )}

      {/* Edit modal — lets the user pick a replacement file
          On save: uploads new file to MinIO, updates the db row, deletes old MinIO object */}
      <BaseModal
        open={Boolean(editTarget)}
        title="Replace File"
        saveLabel="Upload & Replace"
        saving={updating}
        submitDisabled={!editFile}
        onClose={() => {
          setEditTarget(null);
          setEditFile(null);
        }}
        onSubmit={handleUpdate}
      >
        <p className="text-sm text-gray-500">
          Pick a new file to replace the current one. The old file will be deleted from MinIO and
          the database will be updated with the new object key.
        </p>
        <FilePicker
          value={editFile}
          accept=".jpg,.jpeg,.png,.pdf,.webp"
          onChange={(f) => setEditFile(f)}
        />
      </BaseModal>

      {/* Delete confirmation modal — confirms before removing from db and MinIO */}
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete File"
        message={
          <div className="space-y-2">
            <p>Are you sure you want to delete this file?</p>
            <p className="font-medium">
              This removes the record from the database and permanently deletes the object from
              MinIO.
            </p>
          </div>
        }
        confirmLabel="Delete"
        busyLabel="Deleting…"
        busy={deleting}
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <PageTitle title="MINIO FILE STORAGE" />

      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Upload form — FilePicker handles file selection, submit triggers the two-step upload */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Upload a File to MinIO</h2>
            <p className="text-sm text-gray-500">
              Select a file to upload to MinIO. The file is stored in the{' '}
              <code className="rounded bg-gray-100 px-1">sample-images</code> bucket and the object
              key is saved in the database. After uploading, the file will appear in the table
              below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* The field name passed to FilePicker must match the field name in your MinIO route and db column */}
              <FilePicker
                value={file}
                accept=".jpg,.jpeg,.png,.pdf,.webp"
                onChange={(f) => setFile(f)}
              />
              <Button
                type="submit"
                label="Upload"
                loading={submitting}
                loadingLabel="Uploading…"
                fullWidth
              />
            </form>
          </div>

          {/* File table — each row is a record from the db. The two display columns show the two ways
              to access a file from MinIO: rendering it inline on the page, or opening it in a viewer tab.
              Both use the same GET route at /api/files/[id]/sample-image which fetches from MinIO on demand.
              The actions column shows how to replace or delete a file — both operations touch MinIO and the db. */}
          <div className="space-y-3">
            <h2 className="text-byu-navy text-lg font-semibold">View/Access Files from MinIO</h2>
            <p className="text-sm text-gray-500">
              Each row is a record in the database. The object key stored in the{' '}
              <code className="rounded bg-gray-100 px-1">link</code> column is used to fetch the
              actual file from MinIO on demand. Use the action menu to replace or delete a file —
              both operations update the database and MinIO together.
            </p>
            <DataTable
              data={files}
              columns={columns}
              loading={loadingFiles}
              emptyMessage="No files uploaded yet."
            />
          </div>

          {/* How it works */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-1 text-lg font-semibold">How it works</h2>
            <p className="mb-4 text-sm text-gray-500">
              Every MinIO operation pairs a database change with a MinIO change. The database stores
              only the object key — the actual file lives in MinIO.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
              {`// ── Upload ──────────────────────────────────────────────────
// Step 1 — upload the file to MinIO, get back a unique object key
const objectKey = await uploadSampleImage(file);
// Step 2 — save that key to the database
await submitFile({ link: objectKey });

// ── Retrieve ─────────────────────────────────────────────────
// Render inline — works for images only
<img src={\`/api/files/\${id}/sample-image\`} />
// Open in viewer tab — works for any file type
window.open(\`/api/files/\${id}/sample-image\`, '_blank');

// ── Update ───────────────────────────────────────────────────
// Upload the new file, then pass the new key to updateFile
// The PUT route saves the new key and deletes the old MinIO object
const newKey = await uploadSampleImage(newFile);
await updateFile(id, { link: newKey });

// ── Delete ───────────────────────────────────────────────────
// deleteFile removes the db row AND the MinIO object in one call
await deleteFile(id);`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
