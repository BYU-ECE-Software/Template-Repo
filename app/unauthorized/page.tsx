// Manually redirect to this page from any protected route the user doesn't have access to

import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="flex min-h-[calc(100vh-125px)] flex-col items-center justify-center bg-white px-4 font-mono">
      <div className="w-full max-w-lg">
        {/* Big 403 */}
        <h1 className="text-byu-navy mb-0 text-center text-8xl font-black tracking-tight">403</h1>
        <p className="text-byu-navy mb-8 text-center text-lg">
          You don&apos;t have permission to access this resource.
        </p>

        {/* Badge reader device */}
        <div className="mx-auto mb-8 w-64 rounded-2xl border-2 border-gray-300 bg-gray-100 p-5 shadow-lg">
          {/* Fake screen */}
          <div className="mb-4 rounded-lg bg-gray-900 px-3 py-3 text-center shadow-inner">
            <p className="mb-1 text-[10px] tracking-widest text-green-500 uppercase">
              BYU ECE SECURE SYSTEM v2.4
            </p>
            <p className="text-lg font-bold text-green-400">● SCANNING...</p>
            <p className="mt-1 text-[10px] text-green-600">place badge on reader</p>
          </div>

          {/* Card slot */}
          <div className="mb-4 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 bg-white py-4">
            <span className="text-2xl">💳</span>
            <span className="text-[10px] tracking-widest text-gray-300 uppercase">
              Insert Badge
            </span>
          </div>

          {/* Status bar */}
          <div className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-red-600 py-3 shadow">
            <span className="h-3 w-3 animate-pulse rounded-full bg-red-200 shadow shadow-red-300" />
            <span className="text-sm font-bold tracking-widest text-white uppercase">
              Access Denied
            </span>
            <span className="h-3 w-3 animate-pulse rounded-full bg-red-200 shadow shadow-red-300" />
          </div>

          {/* Details */}
          <div className="space-y-1 rounded-lg bg-gray-800 px-3 py-2 text-[10px]">
            <div className="flex justify-between">
              <span className="text-gray-500">user:</span>
              <span className="text-gray-300">you</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">clearance:</span>
              <span className="text-red-400">INSUFFICIENT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">attempts:</span>
              <span className="text-yellow-400">1 ⚠ logged</span>
            </div>
          </div>

          {/* Beep */}
          <p className="mt-3 text-center text-[10px] tracking-widest text-gray-400 uppercase">
            ❌ &nbsp; beep boop &nbsp; ❌
          </p>
        </div>

        {/* Home button */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="bg-byu-navy inline-block rounded-lg px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            recommended_action: go home
          </Link>
        </div>
      </div>
    </div>
  );
}
