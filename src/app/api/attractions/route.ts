// src/app/api/attractions/route.ts
import { NextResponse } from "next/server";
import type { Attraction } from "@typings/attraction";
import type { ApiResponse } from "@typings/api";
import rawData from "@data/attractions.json";

const attractionsData = rawData as Attraction[];

export async function GET(): Promise<NextResponse<ApiResponse<Attraction[]>>> {
  try {
    return NextResponse.json({ success: true, data: attractionsData });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "ATTRACTIONS_UNAVAILABLE",
          message: "Attraction data could not be loaded.",
        },
      },
      { status: 500 }
    );
  }
}
