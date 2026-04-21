'use client';

import PageTitle from '@/components/general/layout/PageTitle';
import PersonPictureBioCard from '@/components/general/cards/pictureBio';
import type { PersonPictureBio } from '@/types/PersonPictureBio';

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_SPEAKERS: PersonPictureBio[] = [
  {
    id: 'speaker-1',
    name: 'Roman Vish',
    affiliation: 'BYU ECE',
    bio: 'Roman manages the software and infrastructure team in the ECE department at BYU',
    image: '/images/Cosmo.jpg',
    link: 'https://resume.romanvish.com/',
  },
  {
    id: 'speaker-2',
    name: 'Lara Allen',
    affiliation: 'BYU IS',
    bio: 'Lara built all the components on this website',
    image: '/images/Cosmo.jpg',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PersonPictureBioCardPage() {
  return (
    <>
      <PageTitle title="Person Picture Bio Card" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Section: Person Picture Bio Card */}
          <div className="space-y-4">
            <h2 className="text-byu-navy text-xl font-semibold">Person Picture Bio Card</h2>
            <p className="text-sm text-gray-600">
              Bio card for a speaker. Cards with a{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">link</code> are fully
              clickable — external URLs open in a new tab, internal paths use the Next.js router.
            </p>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {SAMPLE_SPEAKERS.map((s) => (
                <PersonPictureBioCard key={s.id} personPictureBio={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
