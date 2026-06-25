// src/components/providers/FavoritesProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const FAVORITES_STORAGE_KEY = "lanka-explorer-favorites";

type FavoritesContextValue = {
  favoriteIds: string[];
  isReady: boolean;
  isFavorite: (attractionId: string) => boolean;
  toggleFavorite: (attractionId: string) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  const initFavorites = useCallback(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavoriteIds(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse favorites from local storage", e);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([]));
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      initFavorites();
    }, 0);
    return () => clearTimeout(timer);
  }, [initFavorites]);

  const persistFavorites = (newFavorites: string[]) => {
    setFavoriteIds(newFavorites);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Failed to save favorites to local storage", e);
    }
  };

  const isFavorite = (attractionId: string) =>
    favoriteIds.includes(attractionId);

  const toggleFavorite = (attractionId: string) => {
    if (favoriteIds.includes(attractionId)) {
      persistFavorites(favoriteIds.filter((id) => id !== attractionId));
    } else {
      persistFavorites([...favoriteIds, attractionId]);
    }
  };

  const clearFavorites = () => {
    persistFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isReady,
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
}
