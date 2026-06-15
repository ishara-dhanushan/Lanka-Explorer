// src/app/components/ExploreClient.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ExploreHeader } from "./ExploreHeader";
import { CategoryFilter } from "@components/shared/CategoryFilter";
import { AttractionCard } from "@components/shared/AttractionCard";
import type { Attraction } from "@typings/attraction";
import type { Category } from "@typings/category";
import { Input } from "@components/ui/Input";
import { EmptyState } from "@components/ui/EmptyState";
import { Skeleton } from "@components/ui/Skeleton";

export function ExploreClient() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingAttractions, setLoadingAttractions] = useState(true);
  const [errorAttractions, setErrorAttractions] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAttractions = async () => {
    try {
      setLoadingAttractions(true);
      const res = await fetch("/api/attractions");
      if (!res.ok) throw new Error("Failed to load attractions");
      const json = await res.json();
      setAttractions(json.data || []);
    } catch (err: any) {
      setErrorAttractions(err.message || "An unexpected error occurred");
    } finally {
      setLoadingAttractions(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to load categories");
      const json = await res.json();
      setCategories(json.data || []);
    } catch (err: any) {
      setErrorCategories(err.message || "An unexpected error occurred");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchAttractions();
    fetchCategories();
  }, []);

  const filteredAttractions = useMemo(() => {
    return attractions.filter((attraction) => {
      const matchesCategory = activeCategoryId
        ? attraction.category === activeCategoryId
        : true;
      const normalizedQuery = searchQuery.trim().toLowerCase();

      let matchesSearch = true;
      if (normalizedQuery) {
        const nameMatch = attraction.name
          .toLowerCase()
          .includes(normalizedQuery);
        const locNameMatch = attraction.location.name
          .toLowerCase()
          .includes(normalizedQuery);
        const locDistrictMatch = attraction.location.district
          .toLowerCase()
          .includes(normalizedQuery);
        const locProvinceMatch = attraction.location.province
          .toLowerCase()
          .includes(normalizedQuery);

        matchesSearch =
          nameMatch || locNameMatch || locDistrictMatch || locProvinceMatch;
      }

      return matchesCategory && matchesSearch;
    });
  }, [attractions, activeCategoryId, searchQuery]);

  const featuredAttractions = useMemo(() => {
    return filteredAttractions.filter((a) => a.featured);
  }, [filteredAttractions]);

  const nonFeaturedAttractions = useMemo(() => {
    return filteredAttractions.filter((a) => !a.featured);
  }, [filteredAttractions]);

  if (errorAttractions) {
    return (
      <div className="flex flex-col w-full pb-20 pt-10 px-6">
        <EmptyState
          heading="Attractions could not be loaded."
          description={errorAttractions}
        >
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-primary text-on-primary rounded-2xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-20">
      <ExploreHeader />

      <div className="px-6 mb-4">
        <Input
          type="search"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-ink-muted"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      </div>

      {loadingCategories ? (
        <div className="px-6 flex gap-3 overflow-x-hidden pb-2 w-full">
          <Skeleton width="22%" height="2.5rem" rounded="rounded-full" />
          <Skeleton width="28%" height="2.5rem" rounded="rounded-full" />
          <Skeleton width="28%" height="2.5rem" rounded="rounded-full" />
          <Skeleton width="22%" height="2.5rem" rounded="rounded-full" />
        </div>
      ) : (
        <CategoryFilter
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategorySelect={setActiveCategoryId}
        />
      )}

      <div className="px-6 mt-6 flex flex-col gap-8">
        {loadingAttractions ? (
          <div className="flex flex-col gap-6">
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
          </div>
        ) : filteredAttractions.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              heading="No attractions found"
              description="Try adjusting your search or category filter to discover more places."
            >
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategoryId(null);
                }}
                className="mt-4 px-6 py-3 bg-primary text-on-primary rounded-2xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Clear Filters
              </button>
            </EmptyState>
          </div>
        ) : (
          <>
            {featuredAttractions.length > 0 && (
              <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold font-display text-ink">
                  Featured Destinations
                </h2>
                <div className="flex flex-col gap-6">
                  {featuredAttractions.map((attraction) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                    />
                  ))}
                </div>
              </section>
            )}

            {nonFeaturedAttractions.length > 0 && (
              <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold font-display text-ink">
                  All Destinations
                </h2>
                <div className="flex flex-col gap-6">
                  {nonFeaturedAttractions.map((attraction) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
