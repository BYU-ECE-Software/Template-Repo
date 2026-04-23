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
  // every tab that has a dropdown within it needs its own state and ref. be specific in naming
  const [componentsOpen, setComponentsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const desktopDropdownRefComponents = useRef<HTMLDivElement | null>(null);
  const desktopDropdownRefPages = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRefComponents = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRefPages = useRef<HTMLDivElement | null>(null);

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
  }, [navPadLeft, componentsOpen, pagesOpen]);

  // Close tab dropdowns when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedDesktopDropdown =
        (desktopDropdownRefComponents.current?.contains(target) ?? false) ||
        (desktopDropdownRefPages.current?.contains(target) ?? false);
      const clickedMobileDropdown =
        (mobileDropdownRefComponents.current?.contains(target) ?? false) ||
        (mobileDropdownRefPages.current?.contains(target) ?? false);

      if (!clickedDesktopDropdown && !clickedMobileDropdown) {
        setComponentsOpen(false);
        setPagesOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setComponentsOpen(false);
        setPagesOpen(false);
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
            <div ref={mobileDropdownRefComponents}>
              <button
                type="button"
                onClick={() => {
                  setComponentsOpen((open) => !open);
                  setPagesOpen(false);
                }}
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

                  <Link
                    href="/calendarHeatmap"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Calendar Heatmap
                  </Link>

                  <Link
                    href="/Calendar"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Calendar
                  </Link>

                  <Link
                    href="/Accordion"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Accordion
                  </Link>

                  <Link
                    href="/PageHero"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Page Hero
                  </Link>

                  <Link
                    href="/personPictureBioCard"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Person Picture Bio Card
                  </Link>

                  <Link
                    href="/tag"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Tags
                  </Link>

                  <Link
                    href="/toasts"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Toasts
                  </Link>

                  <Link
                    href="/buttons"
                    onClick={() => {
                      setComponentsOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Buttons
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

            <div ref={mobileDropdownRefPages}>
              <button
                type="button"
                onClick={() => {
                  setPagesOpen((open) => !open);
                  setComponentsOpen(false);
                }}
                className={`flex w-full items-center justify-between px-6 py-4 text-left hover:bg-[#FAFAFA] ${
                  pagesOpen ? 'bg-[#FAFAFA]' : ''
                }`}
              >
                <span>Special Pages</span>
                <FiChevronDown className="text-byu-navy h-4 w-4" aria-hidden="true" />
              </button>

              {pagesOpen && (
                <div className="flex flex-col text-sm">
                  <Link
                    href="/comingSoon"
                    onClick={() => {
                      setPagesOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    Coming Soon
                  </Link>

                  {/* Purposely referencing a link that doesn't exist to trigger a 404 error which redirects automatically to app/not-found.tsx*/}
                  <Link
                    href="/brokenLink"
                    onClick={() => {
                      setPagesOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    404 Error Page
                  </Link>

                  {/* Purposely referencing a page with an error to trigger a 500 error which automatically shows the app/error.tsx page*/}
                  <Link
                    href="/error-test"
                    onClick={() => {
                      setPagesOpen(false);
                      setMobileOpen(false);
                    }}
                    className="text-byu-navy px-10 py-2 text-left hover:bg-[#FAFAFA]"
                  >
                    500 Error Page
                  </Link>
                </div>
              )}
            </div>
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
          <div className="relative" ref={desktopDropdownRefComponents}>
            <button
              type="button"
              onClick={() => {
                setComponentsOpen((open) => !open);
                setPagesOpen(false);
              }}
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

                <Link
                  href="/modals"
                  onClick={() => setComponentsOpen(false)}
                  className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                >
                  Modals
                </Link>

                <Link
                    href="/calendarHeatmap"
                    onClick={() => {
                      setComponentsOpen(false);
                    }}
                    className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                  >
                    Calendar Heatmap
                  </Link>

                  <Link
                    href="/calendar"
                    onClick={() => {
                      setComponentsOpen(false);
                    }}
                    className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                  >
                    Calendar
                  </Link>

                  <Link
                    href="/accordion"
                    onClick={() => {
                      setComponentsOpen(false);
                    }}
                    className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                  >
                    Accordion
                  </Link>

                  <Link
                    href="/pageHero"
                    onClick={() => {
                      setComponentsOpen(false);
                    }}
                    className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                  >
                    Page Hero
                  </Link>

                  <Link
                    href="/personPictureBioCard"
                    onClick={() => {
                      setComponentsOpen(false);
                    }}
                    className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                  >
                    Person Picture Bio Card
                  </Link>

                  <Link
                    href="/tag"
                    onClick={() => {
                      setComponentsOpen(false);
                    }}
                    className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                  >
                    Tags
                  </Link>

                  <Link
                    href="/toasts"
                    onClick={() => {
                      setComponentsOpen(false);
                    }}
                    className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                  >
                    Toasts
                  </Link>
                
                <Link
                  href="/buttons"
                  onClick={() => setComponentsOpen(false)}
                  className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                >
                  Buttons
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

          <div className="relative" ref={desktopDropdownRefPages}>
            <button
              type="button"
              onClick={() => {
                setPagesOpen((open) => !open);
                setComponentsOpen(false);
              }}
              className={`nav-link-hover inline-flex items-center gap-2 px-8 py-4 whitespace-nowrap hover:bg-[#FAFAFA] ${
                pagesOpen ? 'nav-link-active bg-[#FAFAFA]' : ''
              }`}
            >
              <span>Special Pages</span>
              <FiChevronDown className="text-byu-navy h-3 w-3" aria-hidden="true" />
            </button>

            {pagesOpen && (
              <div className="absolute top-full left-0 w-64 border border-gray-200 bg-white shadow-lg">
                <Link
                  href="/comingSoon"
                  onClick={() => setPagesOpen(false)}
                  className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                >
                  Coming Soon
                </Link>

                {/* Purposely referencing a link that doesn't exist to trigger a 404 error which redirects automatically to app/not-found.tsx*/}
                <Link
                  href="/brokenLink"
                  onClick={() => setPagesOpen(false)}
                  className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                >
                  404 Error Page
                </Link>

                {/* Purposely referencing a page with an error to trigger a 500 error which automatically shows the app/error.tsx page*/}
                <Link
                  href="/error-test"
                  onClick={() => setPagesOpen(false)}
                  className="text-byu-navy block w-full px-6 py-3 text-left hover:bg-gray-50"
                >
                  500 Error Page
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile toggle button sits above the white nav */}
      <button type="button" className="sr-only" aria-hidden="true" tabIndex={-1} />
    </>
  );
};

export default NavBar;
