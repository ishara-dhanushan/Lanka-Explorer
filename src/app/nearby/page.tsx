// src/app/nearby/page.tsx
import type { Metadata } from "next";
import { NearbyClient } from "./components/NearbyClient";

export const metadata: Metadata = {
  title: "Nearby Attractions",
  description:
    "Find Sri Lanka attractions sorted by distance from your current location.",
};

export default function NearbyPage() {
  return (
    <main className="flex flex-col flex-1 min-w-0 h-full">
      <NearbyClient />
    </main>
  );
}
