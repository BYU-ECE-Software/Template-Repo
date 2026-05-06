'use client';

import { useState } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import Tag from '@/components/general/data-display/Tag';
import type { TagVariant, TagSize } from '@/components/general/data-display/Tag';
import { statusToBadgeClasses } from '@/utils/statusBadge';

// ─── Types ────────────────────────────────────────────────────────────────────

type TagVariantMeta = { value: TagVariant; label: string };

// ─── Sample data ──────────────────────────────────────────────────────────────

const TAG_VARIANTS: TagVariantMeta[] = [
  { value: 'royal', label: 'Royal' },
  { value: 'navy', label: 'Navy' },
  { value: 'success', label: 'Success' },
  { value: 'error', label: 'Error' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'gray', label: 'Gray' },
];

const TAG_USE_CASES = [
  {
    label: 'Status',
    tags: [
      { label: 'Live', variant: 'success' as TagVariant },
      { label: 'Draft', variant: 'gray' as TagVariant },
      { label: 'Archived', variant: 'gray' as TagVariant },
      { label: 'Scheduled', variant: 'warning' as TagVariant },
    ],
  },
  {
    label: 'Category',
    tags: [
      { label: 'Tutorial', variant: 'royal' as TagVariant },
      { label: 'Keynote', variant: 'navy' as TagVariant },
      { label: 'Workshop', variant: 'info' as TagVariant },
    ],
  },
  {
    label: 'Validation',
    tags: [
      { label: 'Required', variant: 'error' as TagVariant },
      { label: 'Optional', variant: 'gray' as TagVariant },
      { label: 'Verified', variant: 'success' as TagVariant },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackShowcasePage() {
  // Dismissible tag demo
  const [activeTags, setActiveTags] = useState([
    'TypeScript',
    'React',
    'Next.js',
    'Tailwind',
    'Node.js',
  ]);

  return (
    <>
      <PageTitle title="TAG" />

      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* ── Tag ───────────────────────────────────────────────────────── */}

          {/* All variants */}
          <div className="space-y-5 rounded-xl border bg-white p-6 shadow-md">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Tag — Variants</h2>
              <p className="mt-0.5 text-sm text-gray-500">All variants at md and sm sizes</p>
            </div>

            <div className="space-y-3">
              {(['md', 'sm'] as TagSize[]).map((size) => (
                <div key={size} className="flex flex-wrap items-center gap-2">
                  <span className="w-6 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                    {size}
                  </span>
                  {TAG_VARIANTS.map(({ value, label }) => (
                    <Tag key={value} label={label} variant={value} size={size} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Real-world use cases */}
          <div className="grid gap-6 md:grid-cols-3">
            {TAG_USE_CASES.map(({ label, tags }) => (
              <div key={label} className="space-y-3 rounded-xl border bg-white p-6 shadow-md">
                <h2 className="text-byu-navy text-lg font-semibold">{label}</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Tag key={t.label} label={t.label} variant={t.variant} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dismissible tags */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Tag — Dismissible</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Pass <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">onDismiss</code> to
                render a × button. Useful for filter chips and editable tag lists.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeTags.map((t) => (
                <Tag
                  key={t}
                  label={t}
                  variant="info"
                  onDismiss={() => setActiveTags((prev) => prev.filter((x) => x !== t))}
                />
              ))}
              {activeTags.length === 0 && (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-400 italic">All tags dismissed.</p>
                  <button
                    className="text-byu-royal text-xs font-medium hover:underline"
                    onClick={() =>
                      setActiveTags(['TypeScript', 'React', 'Next.js', 'Tailwind', 'Node.js'])
                    }
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* statusToBadgeClasses utility */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Auto-coloring from DB strings</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                When your status comes straight from the database as a raw string and you don&apos;t
                know the value ahead of time, use the{' '}
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">
                  statusToBadgeClasses
                </code>{' '}
                utility instead of the Tag component. It maps common keywords to badge colors
                automatically.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'Active',
                'Inactive',
                'Pending',
                'Cancelled',
                'Complete',
                'Overdue',
                'Maintenance',
                'Unknown',
              ].map((s) => (
                <span
                  key={s}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusToBadgeClasses(s)}`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
              <p className="mb-2 text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
                When to use which:
              </p>
              <p className="mb-1">
                <span className="font-semibold">Tag component</span> — you control the value and
                pick the variant explicitly.
              </p>
              <p>
                <span className="font-semibold">statusToBadgeClasses</span> — value comes from the
                API/DB as a raw string and you need auto-mapping.
              </p>
            </div>

            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
              {`import { statusToBadgeClasses } from '@/utils/statusBadge';

// In a data table render function:
render: (row) => (
  <span className={\`rounded-full px-2 py-1 text-xs font-medium \${statusToBadgeClasses(row.status)}\`}>
    {row.status}
  </span>
)`}
            </pre>
          </div>

          {/* Tag usage snippet */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-1 text-lg font-semibold">Usage — Tag</h2>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
              {`import Tag from '@/components/general/display/Tag';

// Static label
<Tag label="Live" variant="success" />
<Tag label="Draft" variant="gray" size="sm" />

// Dismissible filter chip
<Tag
  label="TypeScript"
  variant="info"
  onDismiss={() => removeTag('TypeScript')}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
