// src/components/shared/AttractionCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Attraction } from "@/types/attraction";
import { Badge } from "@/components/ui/Badge";
import { FavoriteButton } from "./FavoriteButton";
import { DistanceText } from "./DistanceText";

type AttractionCardProps = {
  attraction: Attraction;
  distanceKm?: number;
  distanceUnit?: "km" | "mi";
  showFavorite?: boolean;
};

export function AttractionCard({
  attraction,
  distanceKm,
  distanceUnit = "km",
  showFavorite = true,
}: AttractionCardProps) {
  return (
    <Link href={`/attractions/${attraction.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-low transition-all hover:shadow-elevation-2 active:scale-[0.98]">
        <div className="relative h-48 w-full">
          <Image
            src={attraction.images.card}
            alt={attraction.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

          <div className="absolute top-3 left-3">
            <Badge variant="primary">{attraction.category}</Badge>
          </div>

          {showFavorite && (
            <div className="absolute top-2 right-2">
              <FavoriteButton
                attractionId={attraction.id}
                className="text-white hover:text-primary-light"
              />
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1">
            <h3 className="font-display font-bold text-white text-lg leading-tight line-clamp-1">
              {attraction.name}
            </h3>
            <div className="flex items-center text-white/90 text-sm gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="line-clamp-1 truncate">
                {attraction.location.name}, {attraction.location.district}
              </span>
            </div>
          </div>
        </div>

        {distanceKm !== undefined && (
          <div className="px-4 py-3 border-t border-outline-variant">
            <DistanceText distanceKm={distanceKm} unit={distanceUnit} />
          </div>
        )}
      </div>
    </Link>
  );
}
