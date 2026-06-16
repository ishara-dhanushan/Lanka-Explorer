// src/app/attractions/[id]/components/AttractionHero.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconButton } from "@components/ui/IconButton";
import { FavoriteButton } from "@components/shared/FavoriteButton";

type AttractionHeroProps = {
  imageUrl: string;
  attractionName: string;
  attractionId: string;
};

export function AttractionHero({
  imageUrl,
  attractionName,
  attractionId,
}: AttractionHeroProps) {
  const router = useRouter();

  return (
    <>
      {/* Sticky floating header */}
      <div className="sticky top-0 z-50 w-full h-0 pointer-events-none">
        {/* Back button */}
        <div className="absolute top-4 left-4 pointer-events-auto">
          <IconButton
            aria-label="Go back"
            onClick={() => router.back()}
            className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                clipRule="evenodd"
              />
            </svg>
          </IconButton>
        </div>

        {/* Favorite button */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <FavoriteButton
            attractionId={attractionId}
            className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 hover:text-primary-light"
          />
        </div>
      </div>

      <div className="relative h-72 w-full shrink-0">
        <Image
          src={imageUrl}
          alt={attractionName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 448px"
          className="object-cover"
        />
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/20" />
      </div>
    </>
  );
}
