// src/app/attractions/[id]/page.tsx
import type { Metadata } from "next";
import { AttractionDetailClient } from "./components/AttractionDetailClient";

export const metadata: Metadata = {
  title: "Attraction Details",
  description: "Explore detailed information about this Sri Lanka attraction.",
};

type PageProps = { params: Promise<{ id: string }> };

export default async function AttractionDetailPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <main className="flex flex-col flex-1 min-w-0 h-full">
      <AttractionDetailClient id={id} />
    </main>
  );
}
