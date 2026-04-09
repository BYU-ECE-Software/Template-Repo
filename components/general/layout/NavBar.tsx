'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import SignInSignOut from '../auth/SignInSignOut';
import { useRole } from '@/app/providers/TestingRoleProvider';

type NavBarProps = {
  navPadLeft?: number;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = ({ navPadLeft = 128, mobileOpen, setMobileOpen }: NavBarProps) => {
  // every tab that has a dropdown within it needs its own state
  const [componentsOpen, setComponentsOpen] = useState(false);

  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

  const [navSize, setNavSize] = useState<'base' | 'sm' | 'xs'>('base');

  const { role } = useRole();
  const isAdmin = role === 'admin';

  // Shrink desktop nav text if the row gets too wide.
  useLayoutEffect(() => {
    const el = desktopNavRef.current;
    if (!el) return;

    const fits = () => el.scrollWidth <= el.clientWidth;

    const update = () => {
      setNavSize('base');

      requestAnimationFrame(() => {
        if (fits()) return;

        setNavSize('sm');

        requestAnimationFrame(() => {
          if (fits()) return;
          setNavSize('xs');
        });
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [navPadLeft, componentsOpen]);

  // Close tab dropdowns when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedDesktopDropdown = desktopDropdownRef.current?.contains(target) ?? false;
      const clickedMobileDropdown = mobileDropdownRef.current?.contains(target) ?? false;

      if (!clickedDesktopDropdown && !clickedMobileDropdown) {
        setComponentsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setComponentsOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // ******* There is code for the mobile view of the nav bar and the desktop view. If you had a tab to the nav bar, make sure you add it to both mobile and desktop ********

  return (
    <>
      {/* ------ Mobile nav bar ------ */}
      {mobileOpen && (
        <div id="mobile-menu" className="text-byu-navy w-full border-t bg-white shadow md:hidden">
          <nav className="flex flex-col py-2 text-base font-medium">
            {/* Example of a normal tab */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-4 text-left hover:bg-[#FAFAFA]"
            >
              Home
            </Link>

            {/* Example of a dropdown tab */}
            <div ref={mobileDropdownRef}>
              <button
                type="button"
                onClick={() => setComponentsOpen((open) => !open)}
                className={`flex w-full items-center justify-between px-6 py-4 text-left hover:bg-[#FAFAFA] ${
                  componentsOpen ? 'bg-[#FAFAFA]' : ''
                }`}
              >
                <span>Components</span>
                <FiChevronDown className="text-byu-navy h-4 w-4" aria-hidden="true" />
              </button>

              {componentsOpen && (
                <div className="flex flex-col text-sm">
                  <Link
                    href="/dataTable"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Data Table
                  </Link>

                  <Link
                    href="/fullPageForm"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Full Page Form
                  </Link>
                </div>
              )}
            </div>

            {/* Example of an admin only tab */}
            {isAdmin && (
              <Link
                href="/adminOnly"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-4 text-left hover:bg-[#FAFAFA]"
              >
                Top Secret (Admin Only)
              </Link>
            )}

            <Link
              href="/comingSoon"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-4 text-left hover:bg-[#FAFAFA]"
            >
              Coming Soon
            </Link>
          </nav>

          <div className="border-t border-gray-200">
            <SignInSignOut variant="mobile" onAction={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* ------ Desktop nav bar ------ */}
      <nav className="text-byu-navy hidden w-full bg-white shadow md:block">
        <div
          ref={desktopNavRef}
          className={`flex px-6 font-medium ${
            navSize === 'base' ? 'text-base' : navSize === 'sm' ? 'text-sm' : 'text-xs'
          }`}
          style={{ paddingLeft: navPadLeft }}
        >
          {/* Example of a normal tab */}
          <Link href="/" className="nav-link-hover px-8 py-4 whitespace-nowrap hover:bg-[#FAFAFA]">
            Home
          </Link>

          {/* Example of a dropdown tab */}
          <div className="relative" ref={desktopDropdownRef}>
            <button
              type="button"
              onClick={() => setComponentsOpen((open) => !open)}
              className={`nav-link-hover inline-flex items-center gap-2 px-8 py-4 whitespace-nowrap hover:bg-[#FAFAFA] ${
                componentsOpen ? 'nav-link-active bg-[#FAFAFA]' : ''
              }`}
            >
              <span>Components</span>
              <FiChevronDown className="text-byu-navy h-3 w-3" aria-hidden="true" />
            </button>

            {componentsOpen && (
              <div className="absolute top-full left-0 w-64 border border-gray-200 bg-white shadow-lg">
                <Link
                  href="/dataTable"
                  onClick={() => setComponentsOpen(false)}
                  className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                >
                  Data Table
                </Link>

                <Link
                  href="/fullPageForm"
                  onClick={() => setComponentsOpen(false)}
                  className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                >
                  Full Page Form
                </Link>
              </div>
            )}
          </div>

          {/* Example of an admin only tab */}
          {isAdmin && (
            <Link
              href="/adminOnly"
              className="nav-link-hover px-8 py-4 whitespace-nowrap hover:bg-[#FAFAFA]"
            >
              Top Secret (Admin Only)
            </Link>
          )}

          <Link
            href="/comingSoon"
            className="nav-link-hover px-8 py-4 whitespace-nowrap hover:bg-[#FAFAFA]"
          >
            Coming Soon
          </Link>
        </div>
      </nav>

      {/* Mobile toggle button sits above the white nav */}
      <button type="button" className="sr-only" aria-hidden="true" tabIndex={-1} />
    </>
  );
};

export default NavBar;
