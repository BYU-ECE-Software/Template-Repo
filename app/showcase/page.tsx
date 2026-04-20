"use client";

import PageTitle from "@/components/general/layout/PageTitle";
import PageHero from "@/components/general/layout/PageHero";
import Container from "@/components/general/layout/Container";
import PersonPictureBioCard from "@/components/general/cards/pictureBio";
import Calendar from "@/components/general/data-display/Calendar";
import type { PersonPictureBio } from "@/types/PersonPictureBio";
import type { CalendarEvent } from "@/types/CalendarEvent";

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_SPEAKERS: PersonPictureBio[] = [
  {
    id: "personPictureBio-1",
    name: "Dr. Jane Smith",
    affiliation: "MIT — Computer Science",
    bio: "Jane researches human-computer interaction and has published over 60 papers on accessible interface design. She leads the HCI Lab at MIT.",
    image: "/images/placeholder-person.jpg",
    link: "https://example.com/jane-smith",
  },
  {
    id: "personPictureBio-2",
    name: "Prof. Alan Torres",
    affiliation: "Stanford University",
    bio: "Alan specialises in distributed systems and is the author of two textbooks widely used in graduate programs across North America.",
    image: "/images/placeholder-person.jpg",
  },
  {
    id: "personPictureBio-3",
    name: "Dr. Priya Nair",
    affiliation: "DeepMind",
    bio: "Priya leads applied research in reinforcement learning with a focus on real-world robotics deployment.",
    image: "/images/placeholder-person.jpg",
    link: "/speakers/priya-nair",
  },
];

const SAMPLE_EVENTS: CalendarEvent[] = [
  // Monday
  { id: "e1", dayIndex: 0, title: "Breakfast & Registration", start: "08:00", end: "09:00", variant: "Breakfast" },
  { id: "e2", dayIndex: 0, title: "Intro to Deep Learning", start: "09:00", end: "11:00", variant: "Long Tutorial", speakers: ["Dr. Jane Smith"], location: "Main Hall" },
  { id: "e3", dayIndex: 0, title: "Coffee Break", start: "11:00", end: "11:30", variant: "Break" },
  { id: "e4", dayIndex: 0, title: "Advanced NLP", start: "11:30", end: "12:30", variant: "Short Tutorial", speakers: ["Prof. Alan Torres"] },
  { id: "e5", dayIndex: 0, title: "Lunch", start: "12:30", end: "13:30", variant: "Lunch" },
  { id: "e6", dayIndex: 0, title: "Reinforcement Learning", start: "13:30", end: "15:30", variant: "Long Tutorial", speakers: ["Dr. Priya Nair"], location: "Room B" },
  // Tuesday
  { id: "e7", dayIndex: 1, title: "Breakfast", start: "08:00", end: "09:00", variant: "Breakfast" },
  { id: "e8", dayIndex: 1, title: "Computer Vision", start: "09:00", end: "11:00", variant: "Long Tutorial", speakers: ["Dr. Jane Smith"] },
  { id: "e9", dayIndex: 1, title: "Coffee Break", start: "11:00", end: "11:30", variant: "Break" },
  { id: "e10", dayIndex: 1, title: "Graph Neural Networks", start: "11:30", end: "12:30", variant: "Short Tutorial" },
  { id: "e11", dayIndex: 1, title: "Lunch and Posters", start: "12:30", end: "14:00", variant: "Lunch and Posters" },
  { id: "e12", dayIndex: 1, title: "City Excursion", start: "14:00", end: "18:00", variant: "Excursion", location: "Meet at lobby" },
  // Wednesday
  { id: "e13", dayIndex: 2, title: "Breakfast", start: "08:00", end: "09:00", variant: "Breakfast" },
  { id: "e14", dayIndex: 2, title: "Generative Models", start: "09:00", end: "10:00", variant: "Short Tutorial", speakers: ["Prof. Alan Torres"] },
  { id: "e15", dayIndex: 2, title: "Model Evaluation", start: "10:00", end: "11:00", variant: "Short Tutorial" },
  { id: "e16", dayIndex: 2, title: "Lunch", start: "12:00", end: "13:00", variant: "Lunch" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentShowcasePage() {
  return (
    <>
      <PageTitle title="COMPONENT SHOWCASE" />

      {/* ── PageHero ──────────────────────────────────────────────────────────── */}
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">

          {/* Section: PageHero */}
          <div className="space-y-4">
            <h2 className="text-byu-navy text-xl font-semibold">PageHero</h2>
            <p className="text-sm text-gray-600">
              Full-width hero image with an optional overlapping card. Supports custom height,
              object-fit, and centred overlay text.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-white shadow-md overflow-hidden">
                <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Default (stacked)
                </p>
                <PageHero
                  title="Welcome to the Conference"
                  subtitle="Three days of tutorials, talks, and networking."
                  height="180px"
                  heroText="ICML 2025"
                  heroSubtext="July 14–17 · Salt Lake City"
                />
              </div>

              <div className="rounded-xl border bg-white shadow-md overflow-hidden">
                <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  With overlap=true
                </p>
                <PageHero
                  title="Keynote Sessions"
                  subtitle="Hear from leading researchers in the field."
                  height="180px"
                  overlap
                />
              </div>
            </div>
          </div>

          {/* Section: PersonPictureBioCard */}
          <div className="space-y-4">
            <h2 className="text-byu-navy text-xl font-semibold">PersonPictureBioCard</h2>
            <p className="text-sm text-gray-600">
              Bio card for a personPictureBio. Cards with a <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">link</code> are
              fully clickable — external URLs open in a new tab, internal paths use the Next.js router.
            </p>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {SAMPLE_SPEAKERS.map((s) => (
                <PersonPictureBioCard key={s.id} personPictureBio={s} />
              ))}
            </div>
          </div>

          {/* Section: Calendar */}
          <div className="space-y-4">
            <h2 className="text-byu-navy text-xl font-semibold">Calendar</h2>
            <p className="text-sm text-gray-600">
              A Mon–Fri time-grid for conference schedules. Events are positioned by{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">dayIndex</code>,{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">start</code>, and{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">end</code> strings.
              Pass <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">showLegend=false</code> to hide the colour key.
            </p>

            <div className="rounded-xl border bg-white p-6 shadow-md overflow-x-auto">
              <Calendar
                days={["Mon", "Tue", "Wed"]}
                start="08:00"
                end="18:30"
                stepMinutes={30}
                events={SAMPLE_EVENTS}
              />
            </div>
          </div>

          {/* Section: Container */}
          <div className="space-y-4">
            <h2 className="text-byu-navy text-xl font-semibold">Container</h2>
            <p className="text-sm text-gray-600">
              Thin wrapper around the project's{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">container-narrow</code> /{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">container-wide</code> layout tokens.
              Centralises the class names so a token rename only needs updating in one place.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-white p-6 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                  Narrow (default)
                </p>
                <Container>
                  <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    Constrained to <code className="text-xs">container-narrow</code>
                  </div>
                </Container>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                  Wide
                </p>
                <Container wide>
                  <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    Constrained to <code className="text-xs">container-wide</code>
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {/* Note on Section component */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <strong>Note — <code>Section</code> component:</strong> This component was omitted from
            the template. At 8 lines it wraps a plain <code>&lt;section&gt;</code> and{" "}
            <code>&lt;h2&gt;</code> with no logic, which adds an import and indirection cost without
            a payoff. Any page can write those two elements directly and keep the markup readable.
          </div>

        </div>
      </div>
    </>
  );
}