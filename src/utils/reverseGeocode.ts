// src/utils/reverseGeocode.ts

type BigDataCloudResponse = {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
};

/**
 * Resolves a set of GPS coordinates to the nearest city name using the
 * BigDataCloud free reverse geocoding API. No API key required.
 *
 * Returns the city/locality name, or "Current location" if the call fails
 * or returns no usable name.
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    if (!res.ok) return "Current location";

    const data: BigDataCloudResponse = await res.json();

    // Prefer city → locality → principalSubdivision (state/province)
    return (
      data.city ||
      data.locality ||
      data.principalSubdivision ||
      "Current location"
    );
  } catch {
    // Network failure or parse error — fail silently and use the fallback
    return "Current location";
  }
}
