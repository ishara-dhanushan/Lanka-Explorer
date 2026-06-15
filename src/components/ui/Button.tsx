// src/components/ui/Button.tsx
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary border-none",
  secondary: "bg-transparent text-secondary border-[1.5px] border-secondary",
  ghost: "bg-transparent text-ink border border-border-subtle",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm min-h-9",
  md: "px-5 py-2.5 text-sm min-h-12",
  lg: "px-6 py-3 text-base min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        rounded-2xl cursor-pointer transition-opacity
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:opacity-85 font-sans
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `.trim()}
      {...rest}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          />
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
