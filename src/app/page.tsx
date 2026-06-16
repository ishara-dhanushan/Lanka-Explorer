// src/app/page.tsx
import type { Metadata } from "next";
import { ExploreClient } from "./components/ExploreClient";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Browse Sri Lanka's top attractions — nature, historical sites, and hotels.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1 min-w-0 h-full">
      <ExploreClient />
    </main>
  );
}
