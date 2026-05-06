'use client';

import { useEffect } from 'react';
import { useRole } from '@/components/dev/TestingRoleProvider';
import { useRouter } from 'next/navigation';

export default function AdminOnly() {
  // middleware.ts handles unauthorized access to the page if trying to access from a different page

  // page only available to admin. redirect to 403 (unauthorized) page if you revoke admin access while on the page
  const { isAdmin } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/unauthorized');
    }
  }, [isAdmin, router]);

  return (
    <main className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-center bg-linear-to-br from-red-50 via-white to-red-100 px-4 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-100 px-4 py-1 text-xs font-semibold tracking-widest text-red-700 uppercase shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        Restricted Access
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-tight text-red-700 sm:text-5xl">
        🔓 TOP SECRET
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg font-medium text-gray-700">Admin clearance granted</p>

      {/* Fun message */}
      <p className="mt-4 max-w-md text-sm text-gray-500">
        Congratulations. If you can see this page, you have been entrusted with highly classified
        powers. Please use them wisely. 😎
      </p>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-red-400">
        <div className="h-px w-12 bg-red-300" />
        ⚠️
        <div className="h-px w-12 bg-red-300" />
      </div>

      {/* Optional extra flair */}
      <div className="text-xs text-gray-400 italic">
        (Unauthorized access will result in… absolutely nothing, this is a demo 😄)
      </div>
    </main>
  );
}
