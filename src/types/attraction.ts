// Attraction domain types. Must align with src/data/attractions.json.

/** The three official assignment-aligned category IDs. */
export type AttractionCategoryId = "nature" | "historical" | "hotels";

export type AttractionLocation = {
  name: string;
  district: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
};

/** All paths are relative to /public. */
export type AttractionImages = {
  card: string;
  hero: string;
  gallery: string[];
};

export type Attraction = {
  /** Stable, URL-safe slug (e.g. "sigiriya-rock-fortress"). */
  id: string;
  name: string;
  category: AttractionCategoryId;
  /** One-sentence summary used on cards. */
  shortDescription: string;
  description: string;
  location: AttractionLocation;
  images: AttractionImages;
  openingHours?: string;
  recommendedDuration?: string;
  featured: boolean;
};
