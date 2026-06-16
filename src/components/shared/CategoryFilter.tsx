// src/components/shared/CategoryFilter.tsx
import React from "react";
import type { Category } from "@/types/category";

type CategoryFilterProps = {
  categories: Category[];
  activeCategoryId: string | null;
  onCategorySelect: (id: string | null) => void;
};

export function CategoryFilter({
  categories,
  activeCategoryId,
  onCategorySelect,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-6 py-4">
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          activeCategoryId === null
            ? "bg-primary text-on-primary"
            : "bg-surface-container text-ink-muted hover:bg-surface-container-high hover:text-ink"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategorySelect(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategoryId === cat.id
              ? "bg-primary text-on-primary"
              : "bg-surface-container text-ink-muted hover:bg-surface-container-high hover:text-ink"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
