'use client';

import { useState } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import Button from '@/components/general/actions/Button';
import IconButton from '@/components/general/actions/IconButton';
import LinkButton from '@/components/general/actions/LinkButton';
import ToggleSwitch from '@/components/general/actions/ToggleSwitch';
import SegmentedControl from '@/components/general/actions/SegmentedControl';
import { FiTrash2, FiEdit2, FiPlus, FiDownload, FiArrowRight } from 'react-icons/fi';

export default function ButtonsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const [toggled, setToggled] = useState(false);
  const [period, setPeriod] = useState('week');
  const [view, setView] = useState('list');

  const simulateLoad = (key: string) => {
    setLoading(key);
    setTimeout(() => setLoading(null), 2000);
  };

  return (
    <>
      <PageTitle title="BUTTON EXAMPLES" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Variants */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Variants</h2>
            <p className="text-sm text-gray-600">
              All from the same <code className="rounded bg-gray-100 px-1">Button</code> component —
              just change the <code className="rounded bg-gray-100 px-1">variant</code> prop.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" label="Primary" />
              <Button variant="secondary" label="Secondary" />
              <Button variant="danger" label="Danger" />
              <Button variant="ghost" label="Ghost" />
              <Button variant="navy" label="Navy" />
              <Button variant="subtle" label="Subtle" />
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Sizes</h2>
            <p className="text-sm text-gray-600">
              Use <code className="rounded bg-gray-100 px-1">size</code> prop — sm, md (default), or
              lg.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" label="Small" />
              <Button size="md" label="Medium" />
              <Button size="lg" label="Large" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="sm" label="Small" />
              <Button variant="secondary" size="md" label="Medium" />
              <Button variant="secondary" size="lg" label="Large" />
            </div>
          </div>

          {/* Icons */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">With Icons</h2>
            <p className="text-sm text-gray-600">
              Pass an <code className="rounded bg-gray-100 px-1">icon</code> and optionally set{' '}
              <code className="rounded bg-gray-100 px-1">iconPosition</code> to left (default) or
              right.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button label="Add item" icon={<FiPlus className="h-4 w-4" />} />
              <Button
                label="Download"
                icon={<FiDownload className="h-4 w-4" />}
                variant="secondary"
              />
              <Button
                label="Continue"
                icon={<FiArrowRight className="h-4 w-4" />}
                iconPosition="right"
                variant="navy"
              />
              <Button label="Delete" icon={<FiTrash2 className="h-4 w-4" />} variant="danger" />
            </div>
          </div>

          {/* Loading states */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Loading States</h2>
            <p className="text-sm text-gray-600">
              Pass <code className="rounded bg-gray-100 px-1">loading</code> and optionally{' '}
              <code className="rounded bg-gray-100 px-1">loadingLabel</code>. The button disables
              itself automatically.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                label="Save changes"
                loading={loading === 'save'}
                loadingLabel="Saving…"
                onClick={() => simulateLoad('save')}
              />
              <Button
                variant="danger"
                label="Delete"
                icon={<FiTrash2 className="h-4 w-4" />}
                loading={loading === 'delete'}
                loadingLabel="Deleting…"
                onClick={() => simulateLoad('delete')}
              />
            </div>
          </div>

          {/* Disabled */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Disabled</h2>
            <p className="text-sm text-gray-600">
              Pass <code className="rounded bg-gray-100 px-1">disabled</code> to any variant.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button label="Primary" disabled />
              <Button variant="secondary" label="Secondary" disabled />
              <Button variant="danger" label="Danger" disabled />
              <Button variant="ghost" label="Ghost" disabled />
            </div>
          </div>

          {/* Full width */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Full Width</h2>
            <p className="text-sm text-gray-600">
              Pass <code className="rounded bg-gray-100 px-1">fullWidth</code> to stretch the button
              to its container.
            </p>
            <Button label="Full width primary" fullWidth />
            <Button variant="secondary" label="Full width secondary" fullWidth />
          </div>

          {/* Icon Button */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Icon Button</h2>
            <p className="text-sm text-gray-600">
              Square icon-only button. Always add a{' '}
              <code className="rounded bg-gray-100 px-1">title</code> for accessibility.
            </p>
            <div className="flex flex-wrap gap-2">
              <IconButton icon={<FiEdit2 />} title="Edit" />
              <IconButton icon={<FiTrash2 />} variant="danger" title="Delete" />
              <IconButton icon={<FiDownload />} variant="ghost" title="Download" />
              {/* Make the icon buttons bigger using bigger h and w in the icon class */}
              <IconButton icon={<FiPlus className="h-8 w-8" />} title="Add" />
            </div>
          </div>

          {/* Link Button */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Link Button</h2>
            <p className="text-sm text-gray-600">
              Navigates to a route. Same variants and sizes as Button but renders as a Next.js Link.
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/" label="Go home" />
              <LinkButton href="/fullPageForm" label="View forms" variant="secondary" />
              <LinkButton
                href="/dataTable"
                label="View table"
                variant="ghost"
                icon={<FiArrowRight className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Toggle Switch</h2>
            <p className="text-sm text-gray-600">
              A simple on/off switch. Pass <code className="rounded bg-gray-100 px-1">checked</code>{' '}
              and <code className="rounded bg-gray-100 px-1">onChange</code>. Used inside{' '}
              <code className="rounded bg-gray-100 px-1">RoleToggle</code> to switch between Admin
              and Student view.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={toggled} onChange={setToggled} />
                <span className="text-sm text-gray-600">{toggled ? 'On' : 'Off'}</span>
              </div>
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={true} onChange={() => {}} disabled />
                <span className="text-sm text-gray-400">Disabled (on)</span>
              </div>
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={false} onChange={() => {}} disabled />
                <span className="text-sm text-gray-400">Disabled (off)</span>
              </div>
            </div>
          </div>

          {/* Segmented Control */}
          <div className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy text-lg font-semibold">Segmented Control</h2>
            <p className="text-sm text-gray-600">
              A pill-style selector where only one option is active at a time. Good for filters,
              view switchers, and tab-like navigation.
            </p>
            <div className="flex flex-wrap gap-6">
              <SegmentedControl
                options={[
                  { label: 'Week', value: 'week' },
                  { label: 'Month', value: 'month' },
                  { label: 'Year', value: 'year' },
                ]}
                value={period}
                onChange={setPeriod}
              />
              <SegmentedControl
                options={[
                  { label: 'List', value: 'list', icon: <FiEdit2 className="h-3.5 w-3.5" /> },
                  { label: 'Grid', value: 'grid', icon: <FiPlus className="h-3.5 w-3.5" /> },
                ]}
                value={view}
                onChange={setView}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
