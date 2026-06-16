// src/app/attractions/[id]/components/AttractionOverview.tsx
import React from "react";
import { Badge } from "@components/ui/Badge";
import type { Attraction } from "@typings/attraction";

type AttractionOverviewProps = {
  attraction: Attraction;
};

export function AttractionOverview({ attraction }: AttractionOverviewProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Category badge */}
      <div>
        <Badge variant="primary">{attraction.category}</Badge>
      </div>

      {/* Name */}
      <h1 className="font-display font-bold text-2xl text-ink leading-tight">
        {attraction.name}
      </h1>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-ink-muted text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 shrink-0 text-primary"
        >
          <path
            fillRule="evenodd"
            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          {attraction.location.name}, {attraction.location.district},{" "}
          {attraction.location.province}
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-sm text-ink-muted leading-relaxed">
        {attraction.description}
      </p>

      {/* Optional quick info */}
      {(attraction.openingHours || attraction.recommendedDuration) && (
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant">
          {attraction.openingHours && (
            <div className="flex items-center gap-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 shrink-0 text-ink-muted"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-ink-muted font-sans">
                <span className="font-semibold text-ink">Opening hours: </span>
                {attraction.openingHours}
              </span>
            </div>
          )}
          {attraction.recommendedDuration && (
            <div className="flex items-center gap-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 shrink-0 text-ink-muted"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-3a.75.75 0 0 1 .75.75v2.59l1.95 1.95a.75.75 0 1 1-1.06 1.06l-2.25-2.25A.75.75 0 0 1 9.25 10V7.75A.75.75 0 0 1 10 7Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-ink-muted font-sans">
                <span className="font-semibold text-ink">Recommended: </span>
                {attraction.recommendedDuration}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
