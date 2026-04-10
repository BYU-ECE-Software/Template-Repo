'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type FormButtonProps = {
  label?: string;
  icon?: ReactNode;
  bgClass?: string; // SAME as PrimaryButton
  hoverBgClass?: string; // SAME as PrimaryButton
  loading?: boolean;
  loadingLabel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormButton({
  label,
  icon,
  bgClass = 'bg-byu-royal text-white',
  hoverBgClass = 'hover:bg-[#003C9E]',
  loading = false,
  loadingLabel = 'Saving…',
  disabled,
  type = 'submit',
  children,
  className = '',
  ...rest
}: FormButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 shadow-sm transition enabled:cursor-pointer ${bgClass} ${hoverBgClass} disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${className}`}
      {...rest}
    >
      {/* Optional icon */}
      {icon && <span className="flex items-center">{icon}</span>}

      {/* Loading / label logic */}
      {loading ? <span>{loadingLabel}</span> : label ? <span>{label}</span> : children}
    </button>
  );
}
