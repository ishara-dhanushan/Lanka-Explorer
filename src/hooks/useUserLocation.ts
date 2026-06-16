// src/hooks/useUserLocation.ts
"use client";

import { useState, useCallback } from "react";
import { reverseGeocode } from "@/utils/reverseGeocode";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

/**
 * All possible states the geolocation flow can be in.
 * idle        – user has not yet interacted.
 * requesting  – navigator.geolocation call in progress.
 * success     – coordinates available.
 * denied      – user explicitly blocked permission.
 * unsupported – browser does not expose navigator.geolocation.
 * error       – position unavailable or timed out.
 */
export type LocationStatus =
  | "idle"
  | "requesting"
  | "success"
  | "denied"
  | "unsupported"
  | "error";

export type LocationState = {
  status: LocationStatus;
  coordinates: Coordinates | null;
  /** Nearest city name resolved via reverse geocoding. Null until resolved. */
  city: string | null;
  errorMessage: string | null;
};

export function useUserLocation() {
  const [state, setState] = useState<LocationState>({
    status: "idle",
    coordinates: null,
    city: null,
    errorMessage: null,
  });

  const requestLocation = useCallback(() => {
    // Guard: browser does not support geolocation
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setState({
        status: "unsupported",
        coordinates: null,
        city: null,
        errorMessage: "Geolocation is not supported by your browser.",
      });
      return;
    }

    setState({
      status: "requesting",
      coordinates: null,
      city: null,
      errorMessage: null,
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Set success state immediately with coordinates; city resolves asynchronously
        setState({
          status: "success",
          coordinates: coords,
          city: null,
          errorMessage: null,
        });

        // Resolve city name in the background — failure must not affect core functionality
        reverseGeocode(coords.latitude, coords.longitude).then(
          (resolvedCity) => {
            setState((prev) =>
              prev.status === "success" ? { ...prev, city: resolvedCity } : prev
            );
          }
        );
      },
      (error) => {
        let status: LocationStatus = "error";
        let message =
          "An unknown error occurred while detecting your location.";

        // Map the GeolocationPositionError code to a friendly state/message
        switch (error.code) {
          case error.PERMISSION_DENIED:
            status = "denied";
            message =
              "Location permission was denied. Please allow access in your browser settings and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is currently unavailable.";
            break;
          case error.TIMEOUT:
            message = "The request to detect your location timed out.";
            break;
        }

        setState({
          status,
          coordinates: null,
          city: null,
          errorMessage: message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { ...state, requestLocation };
}
