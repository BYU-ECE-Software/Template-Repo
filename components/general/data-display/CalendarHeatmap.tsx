'use client';

import React, { useMemo } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import type { ReactCalendarHeatmapValue, TooltipDataAttrs } from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export type HeatmapValue = {
  date: string; // "YYYY-MM-DD"
  count: number;
};

export type CalendarHeatmapProps = {
  /** Array of { date, count } objects */
  values: HeatmapValue[];
  /** Start date of the heatmap range (defaults to 1 year ago) */
  startDate?: Date;
  /** End date of the heatmap range (defaults to today) */
  endDate?: Date;
  /** Label shown above the heatmap */
  title?: string;
  /** Colour scale thresholds – index 0 = lowest, 4 = highest */
  thresholds?: [number, number, number, number];
  /** Colour palette for scale-0 through scale-4 */
  colors?: [string, string, string, string, string];
  /** Called when a day cell is clicked */
  onClick?: (value: HeatmapValue | null) => void;
  /** Show a legend beneath the heatmap */
  showLegend?: boolean;
  /** Extra className on the wrapper */
  className?: string;
};

const DEFAULT_THRESHOLDS: [number, number, number, number] = [1, 3, 6, 10];
const DEFAULT_COLORS: [string, string, string, string, string] = [
  '#ebedf0', // 0 – empty
  '#9be9a8', // 1 – low
  '#40c463', // 2
  '#30a14e', // 3
  '#216e39', // 4 – high
];

function classForCount(
  value: HeatmapValue | null,
  thresholds: [number, number, number, number],
): string {
  if (!value || value.count === 0) return 'color-scale-0';
  if (value.count < thresholds[0]) return 'color-scale-1';
  if (value.count < thresholds[1]) return 'color-scale-2';
  if (value.count < thresholds[2]) return 'color-scale-3';
  return 'color-scale-4';
}

export default function CalendarHeatmap({
  values,
  startDate,
  endDate,
  title,
  thresholds = DEFAULT_THRESHOLDS,
  colors = DEFAULT_COLORS,
  onClick,
  showLegend = true,
  className = '',
}: CalendarHeatmapProps) {
  const end = endDate ?? new Date();
  const start = useMemo(() => {
    if (startDate) return startDate;
    const d = new Date(end);
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }, [startDate, end]);

  // Inject dynamic colour variables into a <style> tag so SSR is safe
  const cssVars = colors
    .map(
      (c, i) => `
    .chm-wrapper .color-scale-${i} rect { fill: ${c}; }
    .chm-wrapper .react-calendar-heatmap .color-scale-${i} { fill: ${c}; }`,
    )
    .join('');

  return (
    <div className={`chm-wrapper ${className}`}>
      <style>{cssVars}</style>

      {title && <p className="chm-title">{title}</p>}

      <ReactCalendarHeatmap
        startDate={start}
        endDate={end}
        values={values}
        classForValue={(v) => classForCount(v as HeatmapValue | null, thresholds)}
        tooltipDataAttrs={(value: ReactCalendarHeatmapValue<string> | undefined) => {
          const v = value as HeatmapValue | null;
          const tip = v?.date
            ? `${v.date}: ${v.count} contribution${v.count !== 1 ? 's' : ''}`
            : 'No data';
          return { 'data-tip': tip } as unknown as TooltipDataAttrs;
        }}
        showWeekdayLabels
        onClick={(v: ReactCalendarHeatmapValue<string> | undefined) =>
          onClick?.(v as HeatmapValue | null)
        }
      />

      {showLegend && (
        <div className="chm-legend">
          <span className="chm-legend-label">Less</span>
          {colors.map((c, i) => (
            <span
              key={i}
              className="chm-legend-cell"
              style={{ background: c }}
              aria-label={`Scale ${i}`}
            />
          ))}
          <span className="chm-legend-label">More</span>
        </div>
      )}

      <style>{`
        .chm-wrapper {
          width: 100%;
          font-family: inherit;
        }
        .chm-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: inherit;
        }
        .chm-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          justify-content: flex-end;
        }
        .chm-legend-label {
          font-size: 0.75rem;
          color: #6b7280;
        }
        .chm-legend-cell {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }
        /* Override the library's default colour classes */
        .chm-wrapper .react-calendar-heatmap text {
          font-size: 8px;
          fill: #6b7280;
        }
        .chm-wrapper .react-calendar-heatmap rect:hover {
          opacity: 0.7;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
