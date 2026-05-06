'use client';

import { useState } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import CountBadge from '@/components/general/feedback/CountBadge';
import Button from '@/components/general/actions/Button';
import { FiBell, FiShoppingCart, FiMail, FiMessageSquare, FiUser } from 'react-icons/fi';

export default function CountBadgeDemoPage() {
  const [notifCount, setNotifCount] = useState(3);
  const [cartCount, setCartCount] = useState(12);
  const messageCount = 99;

  return (
    <>
      <PageTitle title="COUNT BADGE" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Color variants */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Variants</h2>
            <p className="text-sm text-gray-600">
              Pass a <code className="rounded bg-gray-100 px-1">variant</code> prop — no className
              needed for standard colors.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {(['primary', 'navy', 'danger', 'success', 'warning', 'neutral'] as const).map(
                (v) => (
                  <div key={v} className="flex flex-col items-center gap-2">
                    <CountBadge variant={v} size="sm">
                      4
                    </CountBadge>
                    <span className="text-xs text-gray-400">{v}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Attached to icons */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Attached to Icons</h2>
            <p className="text-sm text-gray-600">
              Position the badge absolutely on top of an icon using{' '}
              <code className="rounded bg-gray-100 px-1">relative</code> on the parent and{' '}
              <code className="rounded bg-gray-100 px-1">absolute -top-1 -right-1</code> on the
              badge. The <code className="rounded bg-gray-100 px-1">ring-2 ring-white</code> built
              into the component creates the floating effect.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="relative inline-flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-gray-100">
                  <FiBell className="h-6 w-6 text-gray-600" />
                  {notifCount > 0 && (
                    <CountBadge variant="danger" size="sm" className="absolute -top-1 -right-1">
                      {notifCount}
                    </CountBadge>
                  )}
                </div>
                <span className="text-xs text-gray-400">notifications</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="relative inline-flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-gray-100">
                  <FiShoppingCart className="h-6 w-6 text-gray-600" />
                  {cartCount > 0 && (
                    <CountBadge variant="primary" size="sm" className="absolute -top-1 -right-1">
                      {cartCount > 99 ? '99+' : cartCount}
                    </CountBadge>
                  )}
                </div>
                <span className="text-xs text-gray-400">cart</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="relative inline-flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-gray-100">
                  <FiMail className="h-6 w-6 text-gray-600" />
                  {messageCount > 0 && (
                    <CountBadge variant="warning" size="sm" className="absolute -top-1 -right-1">
                      {messageCount > 99 ? '99+' : messageCount}
                    </CountBadge>
                  )}
                </div>
                <span className="text-xs text-gray-400">messages</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="relative inline-flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-gray-100">
                  <FiMessageSquare className="h-6 w-6 text-gray-600" />
                </div>
                <span className="text-xs text-gray-400">zero state (hidden)</span>
              </div>
            </div>
          </div>

          {/* Interactive demo */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Interactive Demo</h2>
            <p className="text-sm text-gray-600">
              Add and clear counts to see how the badge behaves. In a real app, pass the count from
              wherever your data lives — a database query, an API response, a global state provider,
              or a cart context. The badge just renders whatever number you give it.
            </p>
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex flex-col items-center gap-3">
                <div className="relative inline-flex items-center justify-center rounded-lg border border-gray-200 p-3">
                  <FiBell className="text-byu-navy h-7 w-7" />
                  {notifCount > 0 && (
                    <CountBadge variant="danger" size="md" className="absolute -top-2 -right-2">
                      {notifCount}
                    </CountBadge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="subtle"
                    label="+ Add"
                    onClick={() => setNotifCount((c) => c + 1)}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    label="Clear"
                    onClick={() => setNotifCount(0)}
                    disabled={notifCount === 0}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="relative inline-flex items-center justify-center rounded-lg border border-gray-200 p-3">
                  <FiShoppingCart className="text-byu-navy h-7 w-7" />
                  {cartCount > 0 && (
                    <CountBadge variant="primary" size="md" className="absolute -top-2 -right-2">
                      {cartCount > 99 ? '99+' : cartCount}
                    </CountBadge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="subtle"
                    label="+ Add"
                    onClick={() => setCartCount((c) => c + 1)}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    label="Clear"
                    onClick={() => setCartCount(0)}
                    disabled={cartCount === 0}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inline in labels */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Inline in Labels</h2>
            <p className="text-sm text-gray-600">
              Badges can sit inline next to text, like nav items or tab labels.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiUser className="h-4 w-4" />
                Users
                <CountBadge variant="neutral" size="sm">
                  24
                </CountBadge>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiMail className="h-4 w-4" />
                Inbox
                <CountBadge variant="primary" size="sm">
                  3
                </CountBadge>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FiBell className="h-4 w-4" />
                Alerts
                <CountBadge variant="danger" size="sm">
                  !
                </CountBadge>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Sizes</h2>
            <p className="text-sm text-gray-600">
              Pass a <code className="rounded bg-gray-100 px-1">size</code> prop — sm, md (default),
              or lg. For fully custom sizing, pass{' '}
              <code className="rounded bg-gray-100 px-1">className</code> with your own h/w/text
              values.
            </p>
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex flex-col items-center gap-2">
                <CountBadge variant="primary" size="sm">
                  4
                </CountBadge>
                <span className="text-xs text-gray-400">sm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CountBadge variant="primary" size="md">
                  4
                </CountBadge>
                <span className="text-xs text-gray-400">md</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CountBadge variant="primary" size="lg">
                  4
                </CountBadge>
                <span className="text-xs text-gray-400">lg</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CountBadge variant="danger" className="h-8 min-w-8 text-sm">
                  99+
                </CountBadge>
                <span className="text-xs text-gray-400">custom via className</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
