// src/app/attractions/[id]/components/AttractionLocation.tsx
import React from "react";
import type { AttractionLocation as LocationType } from "@typings/attraction";

type AttractionLocationProps = {
  location: LocationType;
};

export function AttractionLocation({ location }: AttractionLocationProps) {
  const mapsUrl =
    location.googleMapsUrl && location.googleMapsUrl !== "#"
      ? location.googleMapsUrl
      : `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
      <h2 className="font-display font-bold text-base text-ink">Location</h2>

      <div className="flex flex-col gap-1 text-sm font-sans text-ink-muted">
        <p className="font-semibold text-ink">{location.name}</p>
        <p>
          {location.district}, {location.province}
        </p>
        <p>{location.country}</p>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl! bg-primary text-on-primary font-semibold font-sans text-sm transition-colors hover:bg-primary-dark active:scale-[0.98]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
            clipRule="evenodd"
          />
        </svg>
        Open in Google Maps
      </a>
    </div>
  );
}
