"use client";

import PageTitle from "@/components/general/layout/PageTitle";
import PageHero from "@/components/general/layout/PageHero";


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentShowcasePage() {
  return (
    <>
      <PageTitle title="PAGE HERO" />

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

        </div>
      </div>
    </>
  );
}