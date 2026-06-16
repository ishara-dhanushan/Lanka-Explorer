export type DistanceRequest = {
  originLat: number;
  originLng: number;
  destinations: Array<{ id: string; lat: number; lng: number }>;
};

export type DistanceResult = {
  id: string;
  distanceKm: number | null;
};
