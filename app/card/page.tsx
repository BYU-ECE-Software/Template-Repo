'use client';

import { useState } from 'react';
import PageTitle from '@/components/general/layout/PageTitle';
import Card from '@/components/general/cards/Card';

// Sample images from Unsplash — replace with your own in real dev
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
          {/* ── Text only ──────────────────────────────────────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Text Card</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Just <code className="rounded bg-gray-100 px-1">title</code> and{' '}
                <code className="rounded bg-gray-100 px-1">description</code> — no image needed.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                title="Simple Text Card"
                description="This is the most basic card — just a title and some description text. No image, no tag, no action."
              />
              <Card
                title="With a Tag"
                description="Add a tag chip to categorize the card. Pass a variant to control the color."
                tag={{ label: 'Info', variant: 'info' }}
              />
              <Card
                title="With an Action"
                description="Pass an action to render a button at the bottom of the card."
                tag={{ label: 'Draft', variant: 'gray' }}
                action={{ label: 'View details', onClick: () => setClicked('text-action') }}
              />
            </div>
          </section>

          {/* ── Text with subtitle ─────────────────────────────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Text with Subtitle</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Add a <code className="rounded bg-gray-100 px-1">subtitle</code> between the title
                and description for secondary context like a date, author, or category.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                title="ECE Department Update"
                subtitle="April 24, 2026"
                description="The department has announced new lab hours for the spring semester. All students must register in advance."
                tag={{ label: 'Announcement', variant: 'royal' }}
              />
              <Card
                title="Research Opportunity"
                subtitle="Dr. Sarah Johnson"
                description="Looking for undergraduate students interested in embedded systems research. Prior experience with C preferred."
                tag={{ label: 'Research', variant: 'success' }}
                action={{ label: 'Apply now', onClick: () => setClicked('research') }}
              />
              <Card
                title="Lab Equipment Request"
                subtitle="Submitted by you"
                description="Your request for oscilloscope access has been received and is pending approval from the lab coordinator."
                tag={{ label: 'Pending', variant: 'warning' }}
                action={{ label: 'Check status', onClick: () => setClicked('lab') }}
              />
            </div>
          </section>

          {/* ── Accent / list style ────────────────────────────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Accent Cards</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Pass <code className="rounded bg-gray-100 px-1">accent</code> to add a colored left
                border stripe. Great for lists, feeds, and timeline-style layouts. Control the color
                with <code className="rounded bg-gray-100 px-1">accentColor</code>.
              </p>
            </div>
            <div className="space-y-3">
              <Card
                accent
                accentColor="bg-byu-royal"
                title="Post-Op Forms"
                subtitle="TODAY"
                description="Let your Care Team know how you're doing so they can make any necessary recommendations."
                tag={{ label: 'Prompt', variant: 'info' }}
                action={{ label: 'View', onClick: () => setClicked('prompt') }}
              />
              <Card
                accent
                accentColor="bg-byu-green-bright"
                title="Complete today's to-do list"
                subtitle="TODAY"
                description="Make sure you are up to speed on your daily tasks."
                tag={{ label: 'List', variant: 'success' }}
                action={{ label: 'Open', onClick: () => setClicked('list') }}
              />
              <Card
                accent
                accentColor="bg-byu-yellow-bright"
                title="Upcoming deadline"
                subtitle="DUE FRIDAY"
                description="Lab report for EE 420 is due at midnight. Don't forget to submit on Learning Suite."
                tag={{ label: 'Deadline', variant: 'warning' }}
                action={{ label: 'Go to course', onClick: () => setClicked('deadline') }}
              />
            </div>
          </section>

          {/* ── Image top ──────────────────────────────────────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Image Card (Top)</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Pass <code className="rounded bg-gray-100 px-1">image</code> with{' '}
                <code className="rounded bg-gray-100 px-1">imagePosition="top"</code> (the default)
                to render an image above the card content.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                image={SAMPLE_IMAGES.mountain}
                imageAlt="Mountain landscape"
                title="Mountain Retreat"
                description="A breathtaking view from the summit. Perfect for a weekend getaway."
                tag={{ label: 'Nature', variant: 'success' }}
                action={{ label: 'Learn more', onClick: () => setClicked('mountain') }}
              />
              <Card
                image={SAMPLE_IMAGES.city}
                imageAlt="City skyline"
                title="City Conference"
                subtitle="June 12–14, 2026"
                description="Join us for the annual ECE conference in downtown Salt Lake City."
                tag={{ label: 'Event', variant: 'royal' }}
                action={{ label: 'Register', onClick: () => setClicked('city') }}
              />
              <Card
                image={SAMPLE_IMAGES.forest}
                imageAlt="Forest"
                title="Research Field Trip"
                description="Students will spend the day collecting environmental sensor data in the field."
                tag={{ label: 'Research', variant: 'info' }}
                action={{ label: 'Sign up', onClick: () => setClicked('forest') }}
                secondaryAction={{
                  label: 'Details',
                  variant: 'secondary',
                  onClick: () => setClicked('forest-details'),
                }}
              />
            </div>
          </section>

          {/* ── Image background ───────────────────────────────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Image Card (Background)</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Pass <code className="rounded bg-gray-100 px-1">imagePosition="background"</code> to
                fill the entire card with the image and overlay text on top. Best for hero-style
                cards where the image is the main feature.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                image={SAMPLE_IMAGES.cabin}
                imageAlt="Mountain cabin"
                imagePosition="background"
                title="Swiss Chalet"
                subtitle="4 Night Stay"
                description="Cozy wooden chalet nestled in the Swiss Alps with direct access to ski slopes."
                tag={{ label: 'Guest Favorite', variant: 'gray' }}
                action={{ label: 'Reserve now', onClick: () => setClicked('chalet') }}
              />
              <Card
                image={SAMPLE_IMAGES.mountain}
                imageAlt="Mountain"
                imagePosition="background"
                title="Santorini Villa"
                subtitle="3 Night Stay"
                description="Luxury villa overlooking the Aegean Sea with breathtaking sunset views."
                tag={{ label: 'Top Rated', variant: 'gray' }}
                action={{ label: 'Reserve now', onClick: () => setClicked('villa') }}
                secondaryAction={{
                  label: 'Save',
                  variant: 'secondary',
                  onClick: () => setClicked('villa-save'),
                }}
              />
            </div>
          </section>

          {/* ── Two actions ────────────────────────────────────────────── */}
          <section className="space-y-4">
            <div>
              <h2 className="text-byu-navy text-lg font-semibold">Two Actions</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Pass both <code className="rounded bg-gray-100 px-1">action</code> and{' '}
                <code className="rounded bg-gray-100 px-1">secondaryAction</code> to render two
                buttons side by side.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                title="Delete this record?"
                description="This action cannot be undone. All associated data will be permanently removed."
                tag={{ label: 'Destructive', variant: 'error' }}
                action={{ label: 'Delete', variant: 'danger', onClick: () => setClicked('delete') }}
                secondaryAction={{
                  label: 'Cancel',
                  variant: 'secondary',
                  onClick: () => setClicked('cancel'),
                }}
              />
              <Card
                title="Submit assignment"
                subtitle="EE 420 — Lab Report"
                description="Review your work before submitting. You can resubmit up until the deadline."
                action={{ label: 'Submit', onClick: () => setClicked('submit') }}
                secondaryAction={{
                  label: 'Preview',
                  variant: 'secondary',
                  onClick: () => setClicked('preview'),
                }}
              />
            </div>
          </section>

          {/* Clicked state feedback */}
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

// Text only
<Card title="Title" description="Some description text." />

// With subtitle and tag
<Card
  title="Title"
  subtitle="Subtitle or date"
  description="Description text."
  tag={{ label: 'Info', variant: 'info' }}
/>

// Image top
<Card
  image="/path/to/image.jpg"
  imagePosition="top"   // default
  title="Title"
  description="Description."
  action={{ label: 'Go', onClick: () => {} }}
/>

// Image background (full bleed)
<Card
  image="/path/to/image.jpg"
  imagePosition="background"
  title="Title"
  description="Description."
  action={{ label: 'Reserve', onClick: () => {} }}
/>

// Accent stripe
<Card
  accent
  accentColor="bg-byu-royal"
  title="Title"
  description="Description."
/>`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
