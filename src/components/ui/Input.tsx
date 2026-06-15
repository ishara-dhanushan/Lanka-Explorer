// src/components/ui/Input.tsx
import React, { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", leftIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full h-12 rounded-full border border-outline-variant bg-surface-container-low px-4 text-base text-ink placeholder:text-ink-muted
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
            transition-colors
            ${leftIcon ? "pl-11" : ""}
            ${className}
          `.trim()}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
