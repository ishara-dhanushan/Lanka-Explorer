// src/app/favorites/page.tsx
import type { Metadata } from "next";
import { FavoritesClient } from "./components/FavoritesClient";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Browse your saved Sri Lanka attractions.",
};

export default function FavoritesPage() {
  return (
    <main className="flex flex-col flex-1 min-w-0 h-full">
      <FavoritesClient />
    </main>
  );
}
