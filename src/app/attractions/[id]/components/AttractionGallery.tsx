// src/app/attractions/[id]/components/AttractionGallery.tsx
import React from "react";
import Image from "next/image";

type AttractionGalleryProps = {
  images: string[];
  attractionName: string;
};

export function AttractionGallery({ images, attractionName }: AttractionGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display font-bold text-xl text-ink px-6">Gallery</h2>
      {/* Full-bleed horizontal scroll container */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide">
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className="relative h-40 w-64 shrink-0 snap-center rounded-2xl overflow-hidden shadow-sm"
          >
            <Image
              src={imgSrc}
              alt={`${attractionName} gallery image ${index + 1}`}
              fill
              sizes="256px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
