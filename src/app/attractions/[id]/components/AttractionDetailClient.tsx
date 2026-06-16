// src/app/attractions/[id]/components/AttractionDetailClient.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import type { Attraction } from "@typings/attraction";
import { Skeleton } from "@components/ui/Skeleton";
import { EmptyState } from "@components/ui/EmptyState";
import { ErrorState } from "@components/ui/ErrorState";
import { AttractionHero } from "./AttractionHero";
import { AttractionOverview } from "./AttractionOverview";
import { AttractionGallery } from "./AttractionGallery";
import { AttractionLocation } from "./AttractionLocation";
import { RelatedAttractions } from "./RelatedAttractions";
import Link from "next/link";

type AttractionDetailClientProps = {
  id: string;
};

export function AttractionDetailClient({ id }: AttractionDetailClientProps) {
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttraction = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setNotFound(false);
      const res = await fetch(`/api/attractions/${id}`);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error("Failed to load attraction details.");
      const json = await res.json();
      setAttraction(json.data || null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAttraction();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAttraction]);

  if (loading) {
    return (
      <div className="flex flex-col w-full pb-20">
        {/* Hero skeleton */}
        <Skeleton width="100%" height="18rem" rounded="rounded-none" />
        <div className="px-6 pt-6 flex flex-col gap-4">
          <Skeleton width="40%" height="1.5rem" rounded="rounded-full" />
          <Skeleton width="75%" height="2rem" rounded="rounded-lg" />
          <Skeleton width="55%" height="1rem" rounded="rounded-full" />
          <Skeleton width="100%" height="5rem" rounded="rounded-xl" />
          <Skeleton width="100%" height="8rem" rounded="rounded-2xl" />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center w-full pb-20">
        <EmptyState
          heading="Attraction not found"
          description="This place may have been removed or the link is incorrect."
        >
          <Link
            href="/"
            className="mt-4 inline-block px-6 py-3 bg-primary text-on-primary rounded-2xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Back to Explore
          </Link>
        </EmptyState>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center w-full pb-20">
        <ErrorState
          message={error}
          onRetry={fetchAttraction}
        />
      </div>
    );
  }

  if (!attraction) return null;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero */}
      <AttractionHero
        imageUrl={attraction.images.card}
        attractionName={attraction.name}
        attractionId={attraction.id}
      />

      {/* Overview */}
      <div className="px-6 pt-6">
        <AttractionOverview attraction={attraction} />
      </div>

      {/* Gallery (Full Bleed) */}
      <div className="pt-6">
        <AttractionGallery
          images={attraction.images.gallery}
          attractionName={attraction.name}
        />
      </div>

      {/* Content Bottom */}
      <div className="px-6 pt-6 flex flex-col gap-6">
        {/* Divider */}
        <hr className="border-outline-variant" />

        {/* Location card + Maps CTA */}
        <AttractionLocation location={attraction.location} />

        {/* Related attractions */}
        <RelatedAttractions
          currentId={attraction.id}
          category={attraction.category}
        />
      </div>
    </div>
  );
}
