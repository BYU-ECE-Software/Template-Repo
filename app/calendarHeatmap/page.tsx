'use client';

import { useState, useEffect } from 'react';
import CalendarHeatmap from '@/components/general/data-display/CalendarHeatmap';
import type {
  HeatmapValue,
  HeatmapPreset,
} from '@/components/general/data-display/CalendarHeatmap';
import Button from '@/components/general/actions/Button';
import PageTitle from '@/components/general/layout/PageTitle';

function randomValues(days = 365): HeatmapValue[] {
  const values: HeatmapValue[] = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (Math.random() > 0.4) {
      values.push({
        date: d.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 14) + 1,
      });
    }
  }
  return values;
}

// Labels for the preset picker buttons
const PRESET_LABELS: Record<HeatmapPreset, string> = {
  byu: 'BYU Blue',
  green: 'BYU Green',
  red: 'BYU Red',
  gold: 'BYU Gold',
  teal: 'BYU Teal',
  github: 'GitHub',
};

export default function HeatmapDemoPage() {
  const [values, setValues] = useState<HeatmapValue[]>([]);
  useEffect(() => {
    // Random data is generated client-side to avoid SSR hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(randomValues(365));
  }, []);

  const [preset, setPreset] = useState<HeatmapPreset>('byu');
  const [clicked, setClicked] = useState<HeatmapValue | null>(null);

  const total = values.reduce((s, v) => s + v.count, 0);
  const activeDays = values.length;

  return (
    <>
      <PageTitle title="CALENDAR HEATMAP" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Info cards row */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Total Contributions</h2>
              <p className="text-byu-navy text-3xl font-bold">{total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">across the last year</p>
            </div>

            <div className="space-y-2 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Active Days</h2>
              <p className="text-byu-navy text-3xl font-bold">{activeDays}</p>
              <p className="text-sm text-gray-600">days with at least one contribution</p>
            </div>

            {/* Preset picker — just pass the preset name, colors live in the component */}
            <div className="space-y-2 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Color Theme</h2>
              <p className="mb-3 text-sm text-gray-600">
                Built-in presets — pass preset=&quot;byu&quot; etc.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {(Object.keys(PRESET_LABELS) as HeatmapPreset[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setPreset(key)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      preset === key
                        ? 'border-byu-navy bg-byu-navy text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {PRESET_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Heatmap card */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <CalendarHeatmap
              values={values}
              title="Contributions over the last year"
              preset={preset}
              showLegend
              onClick={(v) => setClicked(v)}
            />
          </div>

          {/* Clicked day info */}
          {clicked && (
            <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-4 shadow-md">
              <div className="flex-1">
                <p className="text-xs tracking-wide text-gray-500 uppercase">Selected Day</p>
                <p className="text-byu-navy font-semibold">{clicked.date}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs tracking-wide text-gray-500 uppercase">Contributions</p>
                <p className="text-byu-navy font-semibold">{clicked.count}</p>
              </div>
              <Button label="Dismiss" onClick={() => setClicked(null)} />
            </div>
          )}

          {/* Usage snippet */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-1 text-lg font-semibold">Basic Usage</h2>
            <p className="mb-4 text-sm text-gray-600">
              Pass a <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">preset</code> for
              built-in BYU color schemes, or pass a custom{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">colors</code> array to fully
              override.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
              {`import CalendarHeatmap from "@/components/general/data-display/CalendarHeatmap";

// Using a built-in preset
<CalendarHeatmap values={values} preset="byu" showLegend />
<CalendarHeatmap values={values} preset="green" showLegend />

// Custom color override
<CalendarHeatmap
  values={values}
  colors={['#f0f0f0', '#aaa', '#888', '#555', '#222']}
  showLegend
/>`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
