// src/components/ui/Badge.tsx
import React from "react";

type BadgeVariant = "primary" | "secondary" | "tertiary" | "nature";

export type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-container text-on-primary-container",
  secondary: "bg-secondary-container text-on-secondary-container",
  tertiary: "bg-tertiary-container text-on-tertiary-container",
  nature: "bg-nature-green/15 text-nature-green",
};

export function Badge({
  variant = "secondary",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-0.5 rounded-full
        text-xs font-semibold whitespace-nowrap font-sans
        ${variantStyles[variant]}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}
