// src/hooks/useProfile.ts
"use client";

import { useState, useEffect, useCallback } from "react";

export type DistanceUnit = "km" | "mi";

export type ProfileData = {
  displayName: string;
  profileImage: string | null;
  distanceUnit: DistanceUnit;
};

const PROFILE_STORAGE_KEY = "lanka-explorer-profile";

const defaultProfile: ProfileData = {
  displayName: "",
  profileImage: null,
  distanceUnit: "km",
};

export function useProfile() {
  const [profile, setProfileState] = useState<ProfileData>(defaultProfile);
  const [isReady, setIsReady] = useState(false);

  const loadProfile = useCallback(() => {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<ProfileData>;
        setProfileState({
          ...defaultProfile,
          ...parsed,
        });
      } catch {
        // Fallback to default if JSON parse fails
        setProfileState(defaultProfile);
      }
    }
    setIsReady(true);
  }, []);

  // Load from local storage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      loadProfile();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadProfile]);

  // Update profile and sync to local storage
  const updateProfile = useCallback((updates: Partial<ProfileData>) => {
    setProfileState((prev) => {
      const nextProfile = { ...prev, ...updates };
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));

      // Dispatch a custom event so other components (like nearby/detail) can re-render immediately
      window.dispatchEvent(
        new CustomEvent("lanka-explorer-profile-updated", {
          detail: nextProfile,
        })
      );

      return nextProfile;
    });
  }, []);

  // Listen for custom events from other hook instances across the app
  useEffect(() => {
    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ProfileData>;
      setProfileState(customEvent.detail);
    };

    window.addEventListener(
      "lanka-explorer-profile-updated",
      handleProfileUpdate
    );
    return () => {
      window.removeEventListener(
        "lanka-explorer-profile-updated",
        handleProfileUpdate
      );
    };
  }, []);

  return {
    profile,
    updateProfile,
    isReady,
  };
}
