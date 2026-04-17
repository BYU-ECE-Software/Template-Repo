'use client';

import React from 'react';

export type PaginationProps = {
  currentPage: number; // 1-based
  totalPages: number; // 1-based
  onPageChange: (page: number) => void;

  pageSize: number;
  setPageSize: (size: number) => void;

  itemLabel?: string; // e.g. "Orders", "Items", "Equipment"
  pageSizeOptions?: number[]; // optional override
  delta?: number; // pages shown on each side of current
  className?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  setPageSize,
  itemLabel = 'Items',
  pageSizeOptions = [10, 25, 50, 100],
  delta = 1,
  className = '',
}: PaginationProps) {
  const [inputPage, setInputPage] = React.useState('');

  const safeTotalPages = Math.max(1, totalPages);

  const clamp = (n: number) => Math.max(1, Math.min(safeTotalPages, n));

  const goTo = (page: number) => {
    if (!Number.isFinite(page)) return;
    const p = clamp(page);
    if (p !== currentPage) onPageChange(p);
  };

  const handlePrev = () => goTo(currentPage - 1);
  const handleNext = () => goTo(currentPage + 1);

  const commitInput = () => {
    if (!inputPage.trim()) return;
    const n = Number(inputPage);
    if (!Number.isFinite(n)) return;
    goTo(n);
    setInputPage('');
  };

  const renderPageNumbers = () => {
    const items: React.ReactNode[] = [];
    let lastWasEllipsis = false;

    for (let i = 1; i <= safeTotalPages; i++) {
      const isEdge = i === 1 || i === safeTotalPages;
      const isNear = i >= currentPage - delta && i <= currentPage + delta;

      if (isEdge || isNear) {
        lastWasEllipsis = false;
        items.push(
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-current={currentPage === i ? 'page' : undefined}
            className={`cursor-pointer rounded-md border px-3 py-1 text-sm whitespace-nowrap transition ${
              currentPage === i
                ? 'bg-byu-navy border-byu-navy font-semibold text-white'
                : 'border-byu-navy text-byu-navy hover:bg-byu-navy bg-white hover:text-white'
            }`}
          >
            {i}
          </button>,
        );
      } else if (!lastWasEllipsis) {
        lastWasEllipsis = true;
        items.push(
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">
            ...
          </span>,
        );
      }
    }

    return items;
  };

  return (
    <div
      className={`mt-6 flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row ${className}`}
    >
      {safeTotalPages > 1 && (
        <>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="border-byu-navy text-byu-navy hover:bg-byu-navy disabled:hover:text-byu-navy cursor-pointer rounded-md border bg-white px-3 py-1 text-sm transition hover:text-white disabled:opacity-40 disabled:hover:bg-white"
            >
              Previous
            </button>

            {renderPageNumbers()}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === safeTotalPages}
              className="border-byu-navy text-byu-navy hover:bg-byu-navy disabled:hover:text-byu-navy cursor-pointer rounded-md border bg-white px-3 py-1 text-sm transition hover:text-white disabled:opacity-40 disabled:hover:bg-white"
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="goToPage" className="text-byu-navy text-sm">
              Go to page:
            </label>
            <input
              id="goToPage"
              type="number"
              min={1}
              max={safeTotalPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onBlur={commitInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitInput();
                if (e.key === 'Escape') setInputPage('');
              }}
              className="border-byu-navy text-byu-navy focus:ring-byu-navy w-20 rounded border px-2 py-1 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
        </>
      )}

      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-byu-navy text-sm font-normal">
          {itemLabel} per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            onPageChange(1);
          }}
          className="border-byu-navy text-byu-navy focus:ring-byu-navy rounded border bg-white px-3 py-1 text-sm transition focus:ring-2 focus:outline-none"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
