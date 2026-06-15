// src/components/shared/FavoriteButton.tsx
"use client";

import React from "react";
import { useFavoritesContext } from "@/components/providers/FavoritesProvider";
import { IconButton } from "@/components/ui/IconButton";

type FavoriteButtonProps = {
  attractionId: string;
  className?: string;
};

export function FavoriteButton({
  attractionId,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isReady } = useFavoritesContext();

  const active = isReady && isFavorite(attractionId);

  return (
    <IconButton
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(attractionId);
      }}
      className={`
        ${active ? "text-primary hover:text-primary-dark" : "text-ink hover:text-ink-muted"}
        transition-colors
        ${className || ""}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </IconButton>
  );
}
