// src/app/attractions/[id]/components/RelatedAttractions.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AttractionCard } from "@components/shared/AttractionCard";
import { Skeleton } from "@components/ui/Skeleton";
import type { Attraction, AttractionCategoryId } from "@typings/attraction";

type RelatedAttractionsProps = {
  currentId: string;
  category: AttractionCategoryId;
};

export function RelatedAttractions({
  currentId,
  category,
}: RelatedAttractionsProps) {
  const [related, setRelated] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRelated = useCallback(async () => {
    try {
      const res = await fetch("/api/attractions");
      if (!res.ok) return;
      const json = await res.json();
      const all: Attraction[] = json.data || [];
      const filtered = all
        .filter((a) => a.category === category && a.id !== currentId)
        .slice(0, 3);
      setRelated(filtered);
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  }, [category, currentId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRelated();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchRelated]);

  if (!loading && related.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display font-bold text-xl text-ink">
        You May Also Like
      </h2>
      <div className="flex flex-col gap-6">
        {loading ? (
          <>
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
          </>
        ) : (
          related.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))
        )}
      </div>
    </div>
  );
}
