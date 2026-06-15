// src/components/ui/IconButton.tsx
import React from "react";

export type IconButtonProps = {
  "aria-label": string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">;

export function IconButton({
  children,
  className = "",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`
        inline-flex items-center justify-center
        min-h-12 min-w-12 rounded-full
        transition-colors cursor-pointer
        hover:bg-surface-container
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
