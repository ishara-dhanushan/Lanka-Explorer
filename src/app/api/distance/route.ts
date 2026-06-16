// src/app/api/distance/route.ts
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@typings/api";
import type { DistanceRequest, DistanceResult } from "@typings/distance";

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<DistanceResult[]>>> {
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVICE_UNCONFIGURED",
          message: "Distance service is not configured.",
        },
      },
      { status: 503 }
    );
  }

  let body: DistanceRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INVALID_REQUEST", message: "Invalid request body." },
      },
      { status: 400 }
    );
  }

  const { originLat, originLng, destinations } = body;

  if (
    typeof originLat !== "number" ||
    typeof originLng !== "number" ||
    !Array.isArray(destinations) ||
    destinations.length === 0
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "MISSING_PARAMETERS",
          message: "Missing or invalid parameters.",
        },
      },
      { status: 400 }
    );
  }

  // Build a single pipe-separated destinations string for the Distance Matrix API
  const destinationsParam = destinations
    .map((d) => `${d.lat},${d.lng}`)
    .join("|");

  const url = new URL(
    "https://maps.googleapis.com/maps/api/distancematrix/json"
  );
  url.searchParams.set("origins", `${originLat},${originLng}`);
  url.searchParams.set("destinations", destinationsParam);
  url.searchParams.set("mode", "driving");
  url.searchParams.set("units", "metric");
  url.searchParams.set("key", apiKey);

  const googleRes = await fetch(url.toString());
  if (!googleRes.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UPSTREAM_ERROR",
          message: "Distance service request failed.",
        },
      },
      { status: 502 }
    );
  }

  const data = await googleRes.json();

  if (data.status !== "OK") {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DISTANCE_MATRIX_ERROR",
          message: `Distance Matrix API error: ${data.status}`,
        },
      },
      { status: 502 }
    );
  }

  // Map each result element back to its attraction ID
  const results: DistanceResult[] = destinations.map((dest, index) => {
    const element = data.rows?.[0]?.elements?.[index];
    const distanceMeters =
      element?.status === "OK" ? element.distance?.value : null;

    return {
      id: dest.id,
      // Convert meters → kilometers, or null if the route could not be resolved
      distanceKm:
        distanceMeters !== null && distanceMeters !== undefined
          ? distanceMeters / 1000
          : null,
    };
  });

  return NextResponse.json({ success: true, data: results });
}
