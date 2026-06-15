// src/components/shared/DistanceText.tsx
import React from "react";

type DistanceTextProps = {
  distanceKm: number;
  unit: "km" | "mi";
};

export function DistanceText({ distanceKm, unit }: DistanceTextProps) {
  const distance = unit === "mi" ? distanceKm * 0.621371 : distanceKm;
  const formatted = distance.toFixed(1);

  return (
    <div className="flex items-center text-sm text-primary font-medium gap-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M14.5 10a4.5 4.5 0 00-4.284-4.482l-1.073-2.146a.75.75 0 00-1.342 0l-1.073 2.146A4.5 4.5 0 005.5 10c0 1.954 1.252 3.612 3 4.215V17.5a.75.75 0 001.5 0v-3.285a4.5 4.5 0 004.5-4.215zm-4.5 2.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
          clipRule="evenodd"
        />
      </svg>
      <span>
        {formatted} {unit} away
      </span>
    </div>
  );
}
