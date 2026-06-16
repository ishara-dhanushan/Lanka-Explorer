// src/app/not-found.tsx
import Link from "next/link";
import { EmptyState } from "@components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <EmptyState
        heading="Lost in the jungle?"
        description="We couldn't find the page you're looking for. It might have been moved or deleted."
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-opacity hover:opacity-85 font-sans h-12 px-6 text-base bg-primary text-on-primary border-none"
        >
          Back to Explore
        </Link>
      </EmptyState>
    </div>
  );
}
