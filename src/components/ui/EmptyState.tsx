// src/components/ui/EmptyState.tsx
import React from "react";

export type EmptyStateProps = {
  heading: string;
  description?: string;
  children?: React.ReactNode;
};

function LeafIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="stroke-nature-green"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export function EmptyState({
  heading,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center"
      role="status"
      aria-label={heading}
    >
      <LeafIcon />
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold font-display text-ink">{heading}</p>
        {description && (
          <p className="text-sm max-w-xs font-sans text-ink-muted">
            {description}
          </p>
        )}
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
