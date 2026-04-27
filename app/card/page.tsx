'use client';

import { useState } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import Card from '@/components/general/cards/Card';

// Sample images from Unsplash — swap these out for your own images in real dev
const SAMPLE_IMAGES = {
  mountain: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  cabin: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
};

export default function CardDemoPage() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <>
      <PageTitle title="CARD" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* ── Text only ─────────────────────────────────────────────────
              No image needed — title and description are enough for simple info cards */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Text Only</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                The simplest form — title and description, nothing else. No tag, no button, no
                image.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card title="Title only" />
              <Card
                title="Title and description"
                description="Just a title and description. The most minimal content card."
              />
              {/* subtitle sits between title and description — good for dates, authors, or categories */}
              <Card
                title="With a subtitle"
                subtitle="April 24, 2026"
                description="Subtitle sits between the title and description — good for dates, authors, or categories."
              />
            </div>
          </section>

          {/* ── Text + tag ────────────────────────────────────────────────
              Tags float in the top right — pick the variant that matches the meaning */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Text + Tag</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Tags sit in the top right and don't affect the layout. Any tag variant works.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                title="Royal tag"
                description="Use royal for primary brand categorization."
                tag={{ label: 'Featured', variant: 'royal' }}
              />
              <Card
                title="Status tag"
                description="Use success, warning, or error for status-driven content."
                tag={{ label: 'Live', variant: 'success' }}
              />
              <Card
                title="Neutral tag"
                description="Gray works well for drafts, archived items, or secondary labels."
                tag={{ label: 'Draft', variant: 'gray' }}
              />
              <Card
                title="Info tag"
                description="Info is good for categorization without implying a status."
                tag={{ label: 'Research', variant: 'info' }}
              />
              <Card
                title="Warning tag"
                subtitle="Due Friday"
                description="Warning draws attention to deadlines or items that need action soon."
                tag={{ label: 'Urgent', variant: 'warning' }}
              />
              <Card
                title="Error tag"
                description="Use error sparingly — only for truly destructive or failed states."
                tag={{ label: 'Failed', variant: 'error' }}
              />
            </div>
          </section>

          {/* ── Text + actions ────────────────────────────────────────────
              One action fills the width by default. Two actions share the space. */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Text + Actions</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                One or two actions. The primary action fills the width when alone, shares space when
                paired with a secondary.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                title="Single action"
                description="One action fills the full width of the card footer."
                action={{ label: 'View details', onClick: () => setClicked('single') }}
              />
              <Card
                title="Two actions"
                description="Secondary action sits to the left of the primary."
                action={{ label: 'Submit', onClick: () => setClicked('submit') }}
                secondaryAction={{ label: 'Cancel', onClick: () => setClicked('cancel') }}
              />
              <Card
                title="Danger action"
                description="Use the danger variant for destructive actions like delete or remove."
                tag={{ label: 'Destructive', variant: 'error' }}
                action={{ label: 'Delete', variant: 'danger', onClick: () => setClicked('delete') }}
                secondaryAction={{ label: 'Cancel', onClick: () => setClicked('cancel') }}
              />
              <Card
                title="Tag and action together"
                subtitle="Dr. Sarah Johnson"
                description="Tags and actions coexist — tag floats top right, action pins to the bottom."
                tag={{ label: 'Research', variant: 'success' }}
                action={{ label: 'Apply now', onClick: () => setClicked('apply') }}
              />
              {/* actionSize="auto" shrinks the button to fit its label instead of stretching full width */}
              <Card
                title="Smaller action button"
                description="Pass actionSize='auto' to size the button to its label instead of stretching full width."
                action={{
                  label: 'View report',
                  variant: 'navy',
                  onClick: () => setClicked('navy'),
                }}
                actionSize="auto"
              />
              <Card
                title="Subtle action"
                description="Subtle is a soft blue — good for less prominent CTAs."
                action={{
                  label: 'Learn more',
                  variant: 'subtle',
                  onClick: () => setClicked('subtle'),
                }}
              />
            </div>
          </section>

          {/* ── Accent cards ──────────────────────────────────────────────
              Pass accent={true} and accentColor to add a left stripe in any BYU color */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Accent Cards</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                The accent stripe works with or without tags and actions. Great for feeds and
                timelines.
              </p>
            </div>
            <div className="space-y-3">
              <Card
                accent
                accentColor="bg-byu-navy"
                title="Accent only — no tag or action"
                subtitle="MARCH 1, 2026"
                description="The stripe alone is enough to create visual rhythm in a list without adding any interactive elements."
              />
              <Card
                accent
                accentColor="bg-byu-royal"
                title="Accent with tag"
                subtitle="TODAY"
                description="Tag adds categorization without requiring any user action."
                tag={{ label: 'Announcement', variant: 'royal' }}
              />
              <Card
                accent
                accentColor="bg-byu-green-bright"
                title="Accent with action"
                subtitle="TODAY"
                description="Adding an action turns a passive card into an interactive one."
                action={{ label: 'Complete', onClick: () => setClicked('complete') }}
              />
              <Card
                accent
                accentColor="bg-byu-yellow-bright"
                title="Accent with tag and action"
                subtitle="DUE FRIDAY"
                description="All three together — stripe, tag, and action — for the most information-dense list item."
                tag={{ label: 'Deadline', variant: 'warning' }}
                action={{ label: 'Go to course', onClick: () => setClicked('deadline') }}
              />
              <Card
                accent
                accentColor="bg-byu-royal"
                title="Accent with smaller action button"
                description="actionSize='auto' works on accent cards too."
                tag={{ label: 'Tag' }}
                action={{ label: 'Action', onClick: () => setClicked('action') }}
                actionSize="auto"
              />
              <Card
                accent
                accentColor="bg-byu-red-bright"
                title="Accent with two actions"
                subtitle="REQUIRES ATTENTION"
                description="Two actions on an accent card — the secondary sits left, primary right."
                tag={{ label: 'Urgent', variant: 'error' }}
                action={{
                  label: 'Resolve',
                  variant: 'danger',
                  onClick: () => setClicked('resolve'),
                }}
                secondaryAction={{ label: 'Dismiss', onClick: () => setClicked('dismiss') }}
              />
            </div>
          </section>

          {/* ── Image top ─────────────────────────────────────────────────
              Image renders above the content — imagePosition="top" is the default */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Image Top</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Image sits above the content. Works with and without tags, subtitles, and actions.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card image={SAMPLE_IMAGES.forest} imageAlt="Forest" title="Image and title only" />
              <Card
                image={SAMPLE_IMAGES.mountain}
                imageAlt="Mountain"
                title="Image with tag"
                description="Tag sits top right over the content area."
                tag={{ label: 'Nature', variant: 'success' }}
              />
              <Card
                image={SAMPLE_IMAGES.city}
                imageAlt="City"
                title="City Conference"
                subtitle="June 12–14, 2026"
                description="Subtitle, description, and a single action."
                action={{ label: 'Register', onClick: () => setClicked('register') }}
              />
              {/* Most complete version of a top-image card */}
              <Card
                image={SAMPLE_IMAGES.cabin}
                imageAlt="Cabin"
                title="Full featured image card"
                subtitle="3 Night Stay"
                description="Tag, subtitle, description, and two actions — the most complete top-image card."
                tag={{ label: 'Popular', variant: 'royal' }}
                action={{ label: 'Book now', onClick: () => setClicked('book') }}
                secondaryAction={{ label: 'Save', onClick: () => setClicked('save') }}
              />
            </div>
          </section>

          {/* ── Image background ──────────────────────────────────────────
              Pass imagePosition="background" — gradient overlay keeps text readable */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Image Background</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Full bleed image with a dark gradient overlay. Text and buttons are always white.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                image={SAMPLE_IMAGES.mountain}
                imageAlt="Mountain"
                imagePosition="background"
                title="Title only on background"
              />
              <Card
                image={SAMPLE_IMAGES.forest}
                imageAlt="Forest"
                imagePosition="background"
                title="With a tag"
                tag={{ label: 'Featured', variant: 'gray' }}
              />
              <Card
                image={SAMPLE_IMAGES.cabin}
                imageAlt="Cabin"
                imagePosition="background"
                title="Swiss Chalet"
                subtitle="4 Night Stay"
                description="Cozy wooden chalet nestled in the Swiss Alps with direct access to ski slopes."
                tag={{ label: 'Guest Favorite', variant: 'gray' }}
                action={{ label: 'Reserve now', onClick: () => setClicked('chalet') }}
              />
              {/* Secondary button auto-switches to a white ghost style on dark backgrounds */}
              <Card
                image={SAMPLE_IMAGES.city}
                imageAlt="City"
                imagePosition="background"
                title="City Retreat"
                subtitle="2 Night Stay"
                description="Modern city apartment with stunning skyline views and rooftop access."
                tag={{ label: 'New', variant: 'info' }}
                action={{ label: 'Reserve now', onClick: () => setClicked('city-bg') }}
                secondaryAction={{ label: 'Save', onClick: () => setClicked('city-save') }}
              />
            </div>
          </section>

          {clicked && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-600">
              Last action: <span className="text-byu-navy font-medium">{clicked}</span>
              <button
                className="ml-3 text-xs text-gray-400 hover:text-gray-600"
                onClick={() => setClicked(null)}
              >
                clear
              </button>
            </div>
          )}

          {/* Usage snippet */}
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <h2 className="text-byu-navy mb-1 text-lg font-semibold">Usage</h2>
            <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-relaxed text-gray-800">
              {`import Card from '@/components/general/data-display/Card';

// Bare minimum
<Card title="Title" />

// Text with all content
<Card
  title="Title"
  subtitle="Subtitle or date"
  description="Description text."
  tag={{ label: 'Info', variant: 'info' }}
  action={{ label: 'Go', onClick: () => {} }}
  secondaryAction={{ label: 'Cancel', onClick: () => {} }}
/>

// Accent stripe
<Card
  accent
  accentColor="bg-byu-royal"
  title="Title"
  description="Description."
/>

// Image top (default)
<Card
  image="/path/to/image.jpg"
  title="Title"
  action={{ label: 'Go', onClick: () => {} }}
/>

// Image background (full bleed)
<Card
  image="/path/to/image.jpg"
  imagePosition="background"
  title="Title"
  action={{ label: 'Reserve', onClick: () => {} }}
/>

// Smaller action button
<Card
  title="Title"
  action={{ label: 'Go', onClick: () => {} }}
  actionSize="auto"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
