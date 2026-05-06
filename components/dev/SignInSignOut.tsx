// Component for signing in/signing out buttons in the top right of the
// screen. In early dev stages, this button does nothing. But it can be
// hooked up to BYU sign in later. TestingAuthProvider controls the
// "authentication status" which affects which version of the button is
// displayed.

'use client';

import { useEffect, useRef, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/components/dev/TestingAuthProvider';

type SignInProps = {
  className?: string;
  preferredName?: string;
  variant?: 'desktop' | 'mobile';
  onAction?: () => void;
};

export default function SignInSignOut({
  className = '',
  preferredName,
  variant = 'desktop',
  onAction,
}: SignInProps) {
  const { isAuthenticated, user, signIn, signOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const displayName = preferredName || user?.name || 'Signed In';
  const isMobile = variant === 'mobile';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignIn = () => {
    signIn();
    setMenuOpen(false);
    onAction?.();
  };

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
    onAction?.();
  };

  {
    /* Mobile Version - appears in the dropdown nav bar */
  }
  if (isMobile) {
    return (
      <div ref={containerRef} className={`px-6 py-3 ${className}`}>
        {!isAuthenticated ? (
          <button
            type="button"
            onClick={handleSignIn}
            className="text-byu-navy inline-flex items-center gap-2 py-2 text-sm font-medium"
          >
            <FaUserCircle className="h-4 w-4" />
            Sign In
          </button>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-byu-navy inline-flex items-center gap-2 px-1 py-2 text-sm font-medium"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <FaUserCircle className="h-4 w-4" />
              <span>{displayName}</span>
              <span
                className={`text-xs transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            {menuOpen && (
              <div
                className="absolute left-0 z-10 mt-1 w-40 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
                role="menu"
              >
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  role="menuitem"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  {
    /* Desktop Version - appears on the right side of the top header */
  }
  return (
    <div ref={containerRef} className={`hidden items-center sm:flex ${className}`}>
      {!isAuthenticated ? (
        <button
          type="button"
          onClick={handleSignIn}
          className="inline-flex cursor-pointer items-center px-3 font-medium text-white hover:underline"
        >
          Sign In
        </button>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 px-3"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="font-medium text-white">{displayName}</span>
            <span
              className={`text-xs transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              ▼
            </span>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
              role="menu"
            >
              <button
                type="button"
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
