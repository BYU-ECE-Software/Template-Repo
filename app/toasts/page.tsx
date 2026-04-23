'use client';

import { useState } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import Button from '@/components/general/actions/Button';
import Toast from '@/components/general/feedback/Toast'; 
import type { ToastType } from '@/components/general/feedback/Toast';
import { useToast } from '@/hooks/useToast';

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastConfig = { type: ToastType; title: string; message: string };

// ─── Sample data ──────────────────────────────────────────────────────────────

const TOAST_EXAMPLES: ToastConfig[] = [
  {
    type: 'success',
    title: 'Changes saved',
    message: 'Your profile has been updated successfully.',
  },
  { type: 'error', title: 'Upload failed', message: 'The file exceeds the 10 MB size limit.' },
  { type: 'warning', title: 'Session expiring', message: 'You will be logged out in 5 minutes.' },
  {
    type: 'info',
    title: 'Update available',
    message: 'A new version of the app is ready to install.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackShowcasePage() {
  const { showToast, ToastContainer } = useToast();

  // Inline static toast demo (no queue)
  const [staticType, setStaticType] = useState<ToastType>('success');

  return (
    <>
      <PageTitle title="TOASTS" />
      <ToastContainer />

      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* ── Toast ─────────────────────────────────────────────────────── */}

          {/* Trigger cards */}
          <div className="grid gap-6 md:grid-cols-4">
            {TOAST_EXAMPLES.map(({ type, title, message }) => (
              <div
                key={type}
                className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md"
              >
                <h2 className="text-byu-navy text-lg font-semibold capitalize">{type}</h2>
                <p className="text-sm text-gray-600">{title}</p>
                <Button
                  label={`Show ${type}`}
                  onClick={() => showToast({ type, title, message })}
                />
              </div>
            ))}
          </div>

          {/* Static preview */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-byu-navy text-lg font-semibold">Static Preview</h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  Inspect a toast without it auto-dismissing
                </p>
              </div>
              {/* Variant switcher */}
              <div className="flex flex-wrap gap-2">
                {(['success', 'error', 'warning', 'info'] as ToastType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setStaticType(t)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                      staticType === t
                        ? 'border-byu-navy bg-byu-navy text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* No onClose = no auto-dismiss, no × button */}
            <div className="max-w-sm">
              <Toast
                key={staticType}
                type={staticType}
                title={TOAST_EXAMPLES.find((e) => e.type === staticType)!.title}
                message={TOAST_EXAMPLES.find((e) => e.type === staticType)!.message}
              />
            </div>
          </div>

          {/* useToast usage snippet */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-1 text-lg font-semibold">Usage — useToast hook</h2>
            <p className="mb-4 text-sm text-gray-600">
              Import the hook, place{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">ToastContainer</code> once
              near the top of your page, then call{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">showToast</code> anywhere.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
              {`import { useToast } from '@/hooks/useToast';

export default function MyPage() {
  const { showToast, ToastContainer } = useToast();

  return (
    <>
      <ToastContainer />   {/* renders the live queue */}

      <button onClick={() =>
        showToast({
          type: 'success',
          title: 'Saved',
          message: 'Your changes have been saved.',
          duration: 4000,   // optional, default 5000 ms
        })
      }>
        Save
      </button>
    </>
  );
}`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
