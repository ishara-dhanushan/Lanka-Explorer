// src/app/favorites/components/FavoritesClient.tsx
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { CategoryFilter } from "@components/shared/CategoryFilter";
import { AttractionCard } from "@components/shared/AttractionCard";
import type { Attraction } from "@typings/attraction";
import type { Category } from "@typings/category";
import { Input } from "@components/ui/Input";
import { EmptyState } from "@components/ui/EmptyState";
import { ErrorState } from "@components/ui/ErrorState";
import { Skeleton } from "@components/ui/Skeleton";
import { useFavoritesContext } from "@/components/providers/FavoritesProvider";
import Link from "next/link";

export function FavoritesClient() {
  const { favoriteIds, isReady } = useFavoritesContext();

  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingAttractions, setLoadingAttractions] = useState(true);
  const [errorAttractions, setErrorAttractions] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAttractions = useCallback(async () => {
    try {
      setLoadingAttractions(true);
      const res = await fetch("/api/attractions");
      if (!res.ok) throw new Error("Failed to load attractions");
      const json = await res.json();
      setAttractions(json.data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorAttractions(err.message);
      } else {
        setErrorAttractions("An unexpected error occurred");
      }
    } finally {
      setLoadingAttractions(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to load categories");
      const json = await res.json();
      setCategories(json.data || []);
    } catch (err: unknown) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAttractions();
      fetchCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAttractions, fetchCategories]);

  // Filter: only favorited attractions
  const favoriteAttractions = useMemo(() => {
    return attractions.filter((a) => favoriteIds.includes(a.id));
  }, [attractions, favoriteIds]);

  // Apply search + category filters on top of favorites
  const filteredAttractions = useMemo(() => {
    return favoriteAttractions.filter((attraction) => {
      const matchesCategory = activeCategoryId
        ? attraction.category === activeCategoryId
        : true;
      const normalizedQuery = searchQuery.trim().toLowerCase();

      let matchesSearch = true;
      if (normalizedQuery) {
        const nameMatch = attraction.name.toLowerCase().includes(normalizedQuery);
        const locNameMatch = attraction.location.name.toLowerCase().includes(normalizedQuery);
        const locDistrictMatch = attraction.location.district.toLowerCase().includes(normalizedQuery);
        const locProvinceMatch = attraction.location.province.toLowerCase().includes(normalizedQuery);
        matchesSearch = nameMatch || locNameMatch || locDistrictMatch || locProvinceMatch;
      }

      return matchesCategory && matchesSearch;
    });
  }, [favoriteAttractions, activeCategoryId, searchQuery]);

  const isLoading = !isReady || loadingAttractions;

  if (errorAttractions) {
    return (
      <div className="flex flex-col w-full pb-20 pt-10">
        <ErrorState
          message={errorAttractions}
          onRetry={() => {
            setErrorAttractions(null);
            fetchAttractions();
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </span>
          <h1 className="font-display font-bold text-2xl text-ink">My Favorites</h1>
        </div>
        <p className="font-sans text-sm text-ink-muted">
          {isReady && !isLoading
            ? favoriteAttractions.length === 0
              ? "Save places you love to find them here"
              : `${favoriteAttractions.length} saved ${favoriteAttractions.length === 1 ? "place" : "places"}`
            : "Loading your saved places…"}
        </p>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <Input
          type="search"
          placeholder="Search your favorites..."
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

      {/* Category Filter */}
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

      {/* Content */}
      <div className="px-6 mt-6 flex flex-col gap-6">
        {isLoading ? (
          <>
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
          </>
        ) : favoriteAttractions.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              heading="No favorites yet"
              description="Tap the heart on any attraction to save it here."
            >
              <Link
                href="/"
                className="mt-4 inline-block px-6 py-3 bg-primary text-on-primary rounded-2xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Explore Attractions
              </Link>
            </EmptyState>
          </div>
        ) : filteredAttractions.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              heading="No matches found"
              description="Try adjusting your search or category filter."
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
          <div className="flex flex-col gap-6">
            {filteredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
