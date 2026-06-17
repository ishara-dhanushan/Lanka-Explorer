// src/app/nearby/components/NearbyClient.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useProfile } from "@/hooks/useProfile";
import { calculateDistanceKm } from "@/utils/distance";
import type { Attraction } from "@typings/attraction";
import type { DistanceResult } from "@typings/distance";
import { AttractionCard } from "@components/shared/AttractionCard";
import { Button } from "@components/ui/Button";
import { EmptyState } from "@components/ui/EmptyState";
import { ErrorState } from "@components/ui/ErrorState";
import { Skeleton } from "@components/ui/Skeleton";

const NEARBY_LIMIT = 15;
const SESSION_CACHE_KEY = "nearby_backup";

function LocationPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.678-5.092 3.678-9.066 0-4.802-3.845-8.511-8.5-8.511S3 4.449 3 9.25c0 3.974 1.734 6.987 3.678 9.066a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742l.036.02zM12 13.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type LocationStatusCardProps = {
  status: ReturnType<typeof useUserLocation>["status"];
  city: string | null;
  errorMessage: string | null;
  onRequest: () => void;
};

function LocationStatusCard({
  status,
  city,
  errorMessage,
  onRequest,
}: LocationStatusCardProps) {
  const isRequesting = status === "requesting";

  const statusText = (() => {
    switch (status) {
      case "success":
        return city ? `Near ${city}` : "Detecting city…";
      case "requesting":
        return "Detecting your location…";
      case "denied":
        return "Permission denied. Enable location in your browser settings.";
      case "unsupported":
        return "Geolocation is not supported by your browser.";
      case "error":
        return errorMessage ?? "Unable to detect location.";
      default:
        return "Allow location access to discover nearby attractions.";
    }
  })();

  const buttonLabel = (() => {
    if (isRequesting) return "Locating…";
    if (status === "success") return "Refresh Location";
    return "Use My Location";
  })();

  return (
    <div className="rounded-2xl bg-surface-container-low border border-outline-variant p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <LocationPinIcon
          className={`w-5 h-5 mt-0.5 shrink-0 ${
            status === "success"
              ? "text-primary"
              : status === "denied" || status === "error"
                ? "text-error"
                : "text-ink-muted"
          }`}
        />
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold text-sm text-ink">Your Location</p>
          <p className="text-sm text-ink-muted">{statusText}</p>
        </div>
      </div>

      {status !== "unsupported" && (
        <Button
          variant={status === "success" ? "secondary" : "primary"}
          size="sm"
          disabled={isRequesting}
          loading={isRequesting}
          onClick={onRequest}
          className="self-center"
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}

type AttractionWithDistance = Attraction & { distanceKm: number };

export function NearbyClient() {
  const { status, coordinates, city, errorMessage, requestLocation } =
    useUserLocation();
  const { profile } = useProfile();

  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loadingAttractions, setLoadingAttractions] = useState(true);
  const [errorAttractions, setErrorAttractions] = useState<string | null>(null);

  // Top-N attractions enriched with their final distances (road or Haversine fallback)
  const [nearbyAttractions, setNearbyAttractions] = useState<
    AttractionWithDistance[]
  >([]);
  const [loadingDistances, setLoadingDistances] = useState(false);

  // Caching Layer
  const [isRestoredFromCache, setIsRestoredFromCache] = useState(false);
  const [hasCheckedCache, setHasCheckedCache] = useState(false);
  const [cachedCity, setCachedCity] = useState<string | null>(null);
  const [cachedCoordinates, setCachedCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const initCache = useCallback(() => {
    try {
      const backup = sessionStorage.getItem(SESSION_CACHE_KEY);
      if (backup) {
        const parsed = JSON.parse(backup);
        if (parsed.nearbyAttractions && parsed.nearbyAttractions.length > 0) {
          setNearbyAttractions(parsed.nearbyAttractions);
          setCachedCity(parsed.city);
          setCachedCoordinates(parsed.coordinates);
          setIsRestoredFromCache(true);
          setLoadingAttractions(false);
        }
      }
    } catch (err) {
      console.error("Failed to parse nearby backup", err);
    } finally {
      setHasCheckedCache(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      initCache();
    }, 0);
    return () => clearTimeout(timer);
  }, [initCache]);

  const effectiveStatus = isRestoredFromCache ? "success" : status;
  const effectiveCity = isRestoredFromCache ? cachedCity : city;
  const effectiveCoordinates = isRestoredFromCache
    ? cachedCoordinates
    : coordinates;
  const effectiveErrorMessage = isRestoredFromCache ? null : errorMessage;

  const handleRequestLocation = useCallback(() => {
    if (isRestoredFromCache) {
      setIsRestoredFromCache(false);
      setNearbyAttractions([]);
      setCachedCity(null);
      setCachedCoordinates(null);
      try {
        sessionStorage.removeItem(SESSION_CACHE_KEY);
      } catch (err) {
        console.error("Failed to remove session cache", err);
      }
    }
    requestLocation();
  }, [isRestoredFromCache, requestLocation]);
  // Persist to cache whenever we have a fully processed list
  useEffect(() => {
    if (isRestoredFromCache) return;
    if (nearbyAttractions.length > 0 && effectiveCoordinates) {
      try {
        sessionStorage.setItem(
          SESSION_CACHE_KEY,
          JSON.stringify({
            city: effectiveCity,
            coordinates: effectiveCoordinates,
            nearbyAttractions,
          })
        );
      } catch (err) {
        console.error("Failed to backup to session storage", err);
      }
    }
  }, [
    nearbyAttractions,
    effectiveCoordinates,
    effectiveCity,
    isRestoredFromCache,
  ]);

  // If data is not cached, fetch all attractions
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

  // Strict Mode-safe fetch: setTimeout prevents the double-call from React 18
  useEffect(() => {
    if (!hasCheckedCache) return;
    if (isRestoredFromCache) {
      return;
    }

    const timer = setTimeout(() => {
      fetchAttractions();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAttractions, hasCheckedCache, isRestoredFromCache]);

  // Two-pass distance calculation whenever both attractions and coordinates are ready
  useEffect(() => {
    if (isRestoredFromCache) return;
    if (!effectiveCoordinates || attractions.length === 0) return;

    const run = async () => {
      setLoadingDistances(true);

      // Pass 1: Haversine for all attractions, take the top NEARBY_LIMIT closest
      const withHaversine: AttractionWithDistance[] = attractions
        .map((a) => ({
          ...a,
          distanceKm: calculateDistanceKm(
            effectiveCoordinates.latitude,
            effectiveCoordinates.longitude,
            a.location.latitude,
            a.location.longitude
          ),
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, NEARBY_LIMIT);

      // Pass 2: Upgrade with real road distances from Google Maps via our secure API route
      try {
        const res = await fetch("/api/distance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            originLat: effectiveCoordinates.latitude,
            originLng: effectiveCoordinates.longitude,
            destinations: withHaversine.map((a) => ({
              id: a.id,
              lat: a.location.latitude,
              lng: a.location.longitude,
            })),
          }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            const roadDistances: Array<DistanceResult> = json.data || [];

            // Build a lookup map for quick access
            const roadMap = new Map(
              roadDistances.map((r) => [r.id, r.distanceKm])
            );

            // Merge: use road distance if available, otherwise keep Haversine
            const merged = withHaversine.map((a) => {
              const road = roadMap.get(a.id);
              return {
                ...a,
                distanceKm:
                  road !== null && road !== undefined ? road : a.distanceKm,
              };
            });

            // Re-sort by the final distances after merging
            setNearbyAttractions(
              merged.sort((a, b) => a.distanceKm - b.distanceKm)
            );
          } else {
            // API returned an error payload
            setNearbyAttractions(withHaversine);
          }
        } else {
          // HTTP error — fall back to Haversine top list
          setNearbyAttractions(withHaversine);
        }
      } catch {
        // Network error — fall back gracefully to Haversine
        setNearbyAttractions(withHaversine);
      } finally {
        setLoadingDistances(false);
      }
    };

    run();
  }, [effectiveCoordinates, attractions, isRestoredFromCache]);

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

  const isLoadingList = loadingAttractions || loadingDistances;
  const displayCount = nearbyAttractions.length;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-primary">
            <LocationPinIcon className="w-6 h-6" />
          </span>
          <h1 className="font-display font-bold text-2xl text-ink">Nearby</h1>
        </div>
        <p className="font-sans text-sm text-ink-muted">
          {effectiveStatus === "success" && !isLoadingList
            ? `${displayCount} attraction${displayCount !== 1 ? "s" : ""} sorted by distance`
            : "Discover attractions close to you"}
        </p>
      </div>

      {/* Location status card */}
      <div className="px-6 mb-6">
        <LocationStatusCard
          status={effectiveStatus}
          city={effectiveCity}
          errorMessage={effectiveErrorMessage}
          onRequest={handleRequestLocation}
        />
      </div>

      {/* Attractions list */}
      <div className="px-6 flex flex-col gap-6">
        {isLoadingList ? (
          <>
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
            <Skeleton width="100%" height="12rem" rounded="rounded-2xl" />
          </>
        ) : effectiveStatus !== "success" ? (
          <EmptyState
            heading="Enable Location to Sort by Distance"
            description="Tap 'Use My Location' above to see the closest attractions first."
          />
        ) : nearbyAttractions.length === 0 ? (
          <EmptyState
            heading="No Attractions Found"
            description="We couldn't find any attractions in our database."
          />
        ) : (
          nearbyAttractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              distanceKm={attraction.distanceKm}
              distanceUnit={profile.distanceUnit}
            />
          ))
        )}
      </div>
    </div>
  );
}
