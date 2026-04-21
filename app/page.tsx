'use client';

import Link from 'next/link';
import { useRole } from '@/app/providers/TestingRoleProvider';

const PAGES = [
  {
    href: '/fullPageForm',
    title: 'Full Page Form',
    desc: 'Every field type in one place. The best starting point.',
    tag: 'forms',
    tagColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  },
  {
    href: '/modals',
    title: 'Modals',
    desc: 'BaseModal + FormModal. Scroll, Escape, footer — all handled.',
    tag: 'overlays',
    tagColor: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    href: '/dataTable',
    title: 'Data Table',
    desc: 'Sortable, filterable table component ready to wire up.',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/calendarHeatmap',
    title: 'Calendar Heatmap',
    desc: 'GitHub contributions type calendar, ready for your surveilance state needs',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/calendar',
    title: 'Calendar',
    desc: 'To display static events',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/accordion',
    title: 'Accordion',
    desc: 'Fun ways to do collapsables',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/pageHero',
    title: 'Page Hero',
    desc: 'More SPA based than interactive, but a fun way to layout having a large photo',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/personPictureBioCard',
    title: 'PersonPictureBio Card',
    desc: 'Still workshopping the name',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/tag',
    title: 'Tags',
    desc: 'Also called chips, convenient way to tag things in your data',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/toasts',
    title: 'Toasts',
    desc: 'Lara designed these, I just love overcomponentizing, and I also made a hook',
    tag: 'data',
    tagColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  {
    href: '/comingSoon',
    title: 'Coming Soon',
    desc: 'Placeholder page for anything still being built.',
    tag: 'template',
    tagColor: 'bg-gray-100 text-gray-600 border-gray-200',
  },
];

export default function Home() {
  const { isAdmin } = useRole();

  return (
    <main className="relative min-h-[calc(100vh-96px)] overflow-hidden bg-white px-6 py-20">
      {/* Background grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Soft color blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-100 w-100 rounded-full bg-indigo-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -right-15 -bottom-15 h-87.5 w-87.5 rounded-full bg-blue-100 opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-byu-navy mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
            ECE Template
            <span className="ml-3 inline-block -rotate-5 rounded-lg bg-indigo-600 px-3 py-0 text-white">
              Repo
            </span>
          </h1>

          <p className="mx-auto max-w-md text-base leading-relaxed text-gray-500">
            Copy the patterns you need. Swap in real data. Ship something. Every page is a working
            example.
          </p>
        </div>

        {/* Page cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-byu-navy text-base font-semibold">{page.title}</h2>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${page.tagColor}`}
                >
                  {page.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">{page.desc}</p>
              <div className="mt-4 text-xs font-medium text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100">
                Go there →
              </div>
            </Link>
          ))}
        </div>

        {/* Admin card — only shown to admins */}
        {isAdmin && (
          <Link
            href="/adminOnly"
            className="group flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-6 py-4 transition-all hover:-translate-y-0.5 hover:border-red-300 hover:shadow-sm"
          >
            <div>
              <p className="text-sm font-semibold text-red-700">Top Secret (Admin Only)</p>
              <p className="text-xs text-red-400">You have clearance. Use it wisely.</p>
            </div>
            <span className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-500">
              Admin
            </span>
          </Link>
        )}

        {/* Footer note */}
        <p className="mt-12 text-center text-xs text-gray-300">
          BYU ECE Department &mdash; internal use only
        </p>
      </div>
    </main>
  );
}
