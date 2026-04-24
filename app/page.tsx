'use client';

import Link from 'next/link';
import { useRole } from '@/app/providers/TestingRoleProvider';

export default function Home() {
  const { isAdmin } = useRole();

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
      tag: 'reactive',
      tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      href: '/pageHero',
      title: 'Page Hero',
      desc: 'More SPA based than interactive, but a fun way to layout having a large photo',
      tag: 'static',
      tagColor: 'bg-pink-100 text-pink-700 border-pink-200',
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
      tag: 'reactive',
      tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      href: '/buttons',
      title: 'Buttons',
      desc: 'You know what a button is',
      tag: 'actions',
      tagColor: 'bg-rose-100 text-rose-700 border-rose-200',
    },
    {
      href: '/countBadge',
      title: 'Count Badge',
      desc: 'Show count from wherever the data lives',
      tag: 'feedback',
      tagColor: 'bg-orange-100 text-orange-700 border-orange-200',
    },
  ];

  const SPECIAL_PAGES = [
    {
      href: '/comingSoon',
      title: 'Coming Soon',
      desc: 'Placeholder for unfinished pages.',
      tag: 'manual',
      tagColor: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    // Shows the admin page if admin, otherwise shows the 403 page — same slot, different content
    isAdmin
      ? {
          href: '/adminOnly',
          title: 'Top Secret (Admin Only)',
          desc: 'You have clearance. Use it wisely.',
          tag: 'admin',
          tagColor: 'bg-red-100 text-red-700 border-red-200',
        }
      : {
          href: '/unauthorized',
          title: '403 — Unauthorized',
          desc: 'Select Student View and click this button or try to load /adminOnly',
          tag: 'auto',
          tagColor: 'bg-gray-100 text-gray-600 border-gray-200',
        },
    {
      href: '/not-found',
      title: '404 — Not Found',
      desc: 'Click this button or manually type any nonexisting route in the url',
      tag: 'auto',
      tagColor: 'bg-gray-100 text-gray-600 border-gray-200',
    },
    {
      href: '/error-test',
      title: '500 — Runtime Error',
      desc: 'Auto-triggered when a component crashes.',
      tag: 'auto',
      tagColor: 'bg-gray-100 text-gray-600 border-gray-200',
    },
  ];

  return (
    <main className="relative min-h-[calc(100vh-125px)] overflow-hidden bg-white px-6 py-16">
      {/* Background grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="pointer-events-none absolute -top-20 -left-20 h-100 w-100 rounded-full bg-indigo-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -right-15 -bottom-15 h-87.5 w-87.5 rounded-full bg-blue-100 opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-byu-navy mb-3 text-5xl font-bold tracking-tight sm:text-6xl">
            ECE Template
            <span className="ml-3 inline-block -rotate-5 rounded-lg bg-indigo-600 px-3 py-0 text-white">
              Repo
            </span>
          </h1>
          <p className="mx-auto max-w-md text-base leading-relaxed text-gray-500">
            Copy the patterns you need. Swap in real data. Ship something.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — Components */}
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Components
            </p>
            <div className="space-y-2">
              {PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                >
                  <div>
                    <p className="text-byu-navy text-sm font-semibold">{page.title}</p>
                    <p className="text-xs text-gray-400">{page.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${page.tagColor}`}
                    >
                      {page.tag}
                    </span>
                    <span className="text-xs text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Special Pages */}
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Special Pages
            </p>
            <div className="space-y-2">
              {SPECIAL_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-sm"
                >
                  <div>
                    <p className="text-byu-navy text-sm font-semibold">{page.title}</p>
                    <p className="text-xs text-gray-400">{page.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${page.tagColor}`}
                    >
                      {page.tag}
                    </span>
                    <span className="text-xs text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-300">
          BYU ECE Department &mdash; internal use only
        </p>
      </div>
    </main>
  );
}
