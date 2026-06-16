// src/app/components/ExploreHeader.tsx
import React from "react";

export function ExploreHeader() {
  return (
    <div className="px-6 pt-10 pb-6 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <h1 className="font-display font-bold text-2xl text-ink">
          Lanka Explorer
        </h1>
      </div>
      <p className="font-sans text-sm text-ink-muted">Good Morning, Traveler</p>
    </div>
  );
}
