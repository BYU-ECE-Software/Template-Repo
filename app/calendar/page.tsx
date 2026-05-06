'use client';

import PageTitle from '@/components/general/layout/PageTitle';
import Calendar from '@/components/general/data-display/Calendar';
import type { CalendarEvent } from '@/types/CalendarEvent';

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_EVENTS: CalendarEvent[] = [
  // Monday
  {
    id: 'e1',
    dayIndex: 0,
    title: 'Breakfast & Registration',
    start: '08:00',
    end: '09:00',
    variant: 'Breakfast',
  },
  {
    id: 'e2',
    dayIndex: 0,
    title: 'Intro to Deep Learning',
    start: '09:00',
    end: '11:00',
    variant: 'Long Tutorial',
    speakers: ['Dr. Jane Smith'],
    location: 'Main Hall',
  },
  {
    id: 'e3',
    dayIndex: 0,
    title: 'Dirty Soda Break',
    start: '11:00',
    end: '11:30',
    variant: 'Break',
  },
  {
    id: 'e4',
    dayIndex: 0,
    title: 'Advanced NLP',
    start: '11:30',
    end: '12:30',
    variant: 'Short Tutorial',
    speakers: ['Prof. Alan Torres'],
  },
  { id: 'e5', dayIndex: 0, title: 'Lunch', start: '12:30', end: '13:30', variant: 'Lunch' },
  {
    id: 'e6',
    dayIndex: 0,
    title: 'Reinforcement Learning',
    start: '13:30',
    end: '15:30',
    variant: 'Long Tutorial',
    speakers: ['Dr. Priya Nair'],
    location: 'Room B',
  },
  // Tuesday
  { id: 'e7', dayIndex: 1, title: 'Breakfast', start: '08:00', end: '09:00', variant: 'Breakfast' },
  {
    id: 'e8',
    dayIndex: 1,
    title: 'Computer Vision',
    start: '09:00',
    end: '11:00',
    variant: 'Long Tutorial',
    speakers: ['Dr. Jane Smith'],
  },
  {
    id: 'e9',
    dayIndex: 1,
    title: 'Dirty Soda Break',
    start: '11:00',
    end: '11:30',
    variant: 'Break',
  },
  {
    id: 'e10',
    dayIndex: 1,
    title: 'Graph Neural Networks',
    start: '11:30',
    end: '12:30',
    variant: 'Short Tutorial',
  },
  {
    id: 'e11',
    dayIndex: 1,
    title: 'Lunch and Posters',
    start: '12:30',
    end: '14:00',
    variant: 'Lunch and Posters',
  },
  {
    id: 'e12',
    dayIndex: 1,
    title: 'City Excursion',
    start: '14:00',
    end: '18:00',
    variant: 'Excursion',
    location: 'Meet at lobby',
  },
  // Wednesday
  {
    id: 'e13',
    dayIndex: 2,
    title: 'Breakfast',
    start: '08:00',
    end: '09:00',
    variant: 'Breakfast',
  },
  {
    id: 'e14',
    dayIndex: 2,
    title: 'Generative Models',
    start: '09:00',
    end: '10:00',
    variant: 'Short Tutorial',
    speakers: ['Prof. Alan Torres'],
  },
  {
    id: 'e15',
    dayIndex: 2,
    title: 'Model Evaluation',
    start: '10:00',
    end: '11:00',
    variant: 'Short Tutorial',
  },
  { id: 'e16', dayIndex: 2, title: 'Lunch', start: '12:00', end: '13:00', variant: 'Lunch' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  return (
    <>
      <PageTitle title="CALENDAR" />

      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Section: Calendar */}
          <div className="space-y-4">
            <h2 className="text-byu-navy text-xl font-semibold">Calendar</h2>
            <p className="text-sm text-gray-600">
              A Mon–Fri time-grid for conference schedules. Events are positioned by{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">dayIndex</code>,{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">start</code>, and{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">end</code> strings. Pass{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">showLegend=false</code> to
              hide the colour key.
            </p>

            <div className="overflow-x-auto rounded-xl border bg-white p-6 shadow-md">
              <Calendar
                days={['Mon', 'Tue', 'Wed']}
                start="08:00"
                end="18:30"
                stepMinutes={30}
                events={SAMPLE_EVENTS}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
