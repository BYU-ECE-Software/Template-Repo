"use client";

import { useState, useEffect } from "react";
import CalendarHeatmap from "@/components/general/data-display/CalendarHeatmap";
import type { HeatmapValue } from "@/components/general/data-display/CalendarHeatmap";
import Button from "@/components/general/actions/Button";
import PageTitle from "@/components/general/layout/PageTitle";

// ─── helpers ──────────────────────────────────────────────────────────────────

function randomValues(days = 365): HeatmapValue[] {
  const values: HeatmapValue[] = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (Math.random() > 0.4) {
      values.push({
        date: d.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 14) + 1,
      });
    }
  }
  return values;
}

const PRESETS: Record<
  string,
  { colors: [string, string, string, string, string]; label: string }
> = {
  github: {
    colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    label: "GitHub Green",
  },
  ocean: {
    colors: ["#e8f4fd", "#a8d8ea", "#4a9eca", "#1a6fa8", "#0a3d6b"],
    label: "Ocean Blue",
  },
  fire: {
    colors: ["#f5f5f5", "#ffd6a5", "#ff9f43", "#ee5a24", "#c0392b"],
    label: "Fire",
  },
  purple: {
    colors: ["#f3f0ff", "#d8b4fe", "#a855f7", "#7c3aed", "#4c1d95"],
    label: "Purple",
  },
};

// ─── page ─────────────────────────────────────────────────────────────────────

export default function HeatmapDemoPage() {
  // Fix hydration error: generate random data only on the client
  const [values, setValues] = useState<HeatmapValue[]>([]);
  useEffect(() => {
    setValues(randomValues(365));
  }, []);

  const [preset, setPreset] = useState<keyof typeof PRESETS>("github");
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
              <p className="text-3xl font-bold text-byu-navy">{total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">across the last year</p>
            </div>

            <div className="space-y-2 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Active Days</h2>
              <p className="text-3xl font-bold text-byu-navy">{activeDays}</p>
              <p className="text-sm text-gray-600">days with at least one contribution</p>
            </div>

            <div className="space-y-2 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Colour Theme</h2>
              <p className="text-sm text-gray-600 mb-3">Change the heatmap palette</p>
              <div className="flex flex-wrap justify-center gap-2">
                {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setPreset(key)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      preset === key
                        ? "border-byu-navy bg-byu-navy text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: PRESETS[key].colors[4] }}
                    />
                    {PRESETS[key].label}
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
              colors={PRESETS[preset].colors}
              showLegend
              onClick={(v) => setClicked(v)}
            />
          </div>

          {/* Clicked day info */}
          {clicked && (
            <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-4 shadow-md">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500">Selected Day</p>
                <p className="text-byu-navy font-semibold">{clicked.date}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500">Contributions</p>
                <p className="text-byu-navy font-semibold">{clicked.count}</p>
              </div>
              <Button label="Dismiss" onClick={() => setClicked(null)} />
            </div>
          )}

          {/* Usage snippet */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-1 text-lg font-semibold">Basic Usage</h2>
            <p className="mb-4 text-sm text-gray-600">
              Drop <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">CalendarHeatmap</code> into
              any page and pass it an array of <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">{"{ date, count }"}</code> objects.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
{`import CalendarHeatmap from "@/components/CalendarHeatmap";

const values = [
  { date: "2025-04-01", count: 4 },
  { date: "2025-04-03", count: 12 },
  // ...
];

<CalendarHeatmap
  values={values}
  title="My activity"
  showLegend
  onClick={(v) => console.log(v)}
/>`}
            </pre>
          </div>

        </div>
      </div>
    </>
  );
}