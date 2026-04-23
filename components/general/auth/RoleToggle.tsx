// Good for early development when auth hasn't been set up.
// This toggle can be placed in the header to simulate an authenticated environment and set up what components and pages are restricted

'use client';

import { useRole } from '@/app/providers/TestingRoleProvider';
import ToggleSwitch from '@/components/general/actions/ToggleSwitch';

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

      <ToggleSwitch checked={isAdmin} onChange={(val) => setRole(val ? 'admin' : 'student')} />
    </div>
  );
}
