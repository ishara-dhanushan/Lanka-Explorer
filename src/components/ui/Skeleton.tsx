// src/components/ui/Skeleton.tsx
export type SkeletonProps = {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
};

export function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = "rounded-md",
  className = "",
}: SkeletonProps) {
  return (
    <span
      role="status"
      aria-label="Loading…"
      className={`block animate-pulse bg-surface-container ${rounded} ${className}`}
      style={{ width, height }}
    />
  );
}
