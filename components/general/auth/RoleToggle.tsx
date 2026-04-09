// Good for early development when auth hasn't been set up.
// This toggle can be placed in the header to simulate an authenticated environment and set up what components and pages are restricted

'use client';

import { useRole } from '@/app/providers/TestingRoleProvider';

type RoleToggleProps = {
  className?: string;
};

export default function RoleToggle({ className = '' }: RoleToggleProps) {
  const { role, setRole } = useRole();

  const isAdmin = role === 'admin';

  return (
    <div className={`hidden items-center gap-3 text-white/80 sm:flex ${className}`}>
      <span>
        <span className="font-medium text-white">{isAdmin ? 'Admin' : 'Student'}</span> View
      </span>

      <button
        type="button"
        onClick={() => setRole(isAdmin ? 'student' : 'admin')}
        className="relative inline-flex h-6 w-12 items-center rounded-full bg-white/25 transition hover:bg-white/30 focus:ring-2 focus:ring-white/40 focus:outline-none"
        aria-label="Toggle role"
        aria-pressed={isAdmin}
      >
        <span className="sr-only">Toggle between Student and Admin view</span>
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            isAdmin ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
