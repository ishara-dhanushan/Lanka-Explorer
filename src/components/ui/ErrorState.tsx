// src/components/ui/ErrorState.tsx

import { Button } from "./Button";

export type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

function ErrorIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="stroke-error"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center"
    >
      <ErrorIcon />
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold font-display text-ink">
          Something went wrong
        </p>
        <p className="text-sm max-w-xs font-sans text-ink-muted">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
