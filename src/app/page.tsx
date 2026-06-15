// src/app/page.tsx — Explore page placeholder.
// This is a Server Component. Interactive content will be delegated to ExploreClient.
// TODO (Step 2): Replace placeholder with ExploreClient.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Browse Sri Lanka's top attractions — nature, historical sites, and hotels.",
};

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <h1
        className="text-3xl font-bold tracking-tight"
        style={{
          fontFamily: "var(--font-montserrat)",
          color: "var(--color-primary)",
        }}
      >
        Explore Sri Lanka
      </h1>
      <p
        className="text-base max-w-sm"
        style={{
          fontFamily: "var(--font-inter)",
          color: "var(--color-ink-muted)",
        }}
      >
        Discover hidden waterfalls, ancient ruins, and pristine beaches. The
        explore feed is coming in Step 2.
      </p>
    </div>
  );
}
