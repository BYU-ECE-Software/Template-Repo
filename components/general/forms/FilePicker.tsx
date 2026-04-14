'use client';
import { useRef } from 'react';

type FilePickerProps = {
  value: File | string | null | undefined;
  accept?: string;
  onChange: (file: File | null) => void;
  chooseLabel?: string;
  changeLabel?: string;
  emptyText?: string;
  className?: string;
};

export default function FilePicker({
  value,
  accept,
  onChange,
  chooseLabel = 'Choose file',
  changeLabel = 'Change file',
  emptyText = 'No file selected',
  className = '',
}: FilePickerProps) {
  const isFileObject = value instanceof File;
  const hasValue = isFileObject || Boolean(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const displayText = isFileObject ? value.name : value ? String(value).split('/').pop() : null;

  return (
    <div className={`text-left ${className}`}>
      <div
        className="group hover:border-byu-royal flex w-full cursor-pointer items-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-blue-50/40"
        onClick={openFilePicker}
      >
        {/* Upload icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:text-byu-royal h-4 w-4 shrink-0 text-gray-400 transition-colors"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>

        {/* Filename or placeholder */}
        <span className="flex-1 truncate text-sm">
          {displayText ? (
            <span className="text-gray-800">{displayText}</span>
          ) : (
            <span className="text-gray-400">{emptyText}</span>
          )}
        </span>

        {/* Trash button — only when a file is selected */}
        {hasValue && (
          <button
            type="button"
            aria-label="Remove file"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
            className="shrink-0 cursor-pointer rounded p-1 text-gray-400 transition-colors hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Pill button */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            openFilePicker();
          }}
          className="bg-byu-navy group-hover:bg-byu-royal shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-white transition-colors"
        >
          {hasValue ? changeLabel : chooseLabel}
        </span>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}
