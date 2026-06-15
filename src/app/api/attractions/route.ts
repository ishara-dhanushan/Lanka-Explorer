import { NextResponse } from "next/server";
import type { Attraction } from "@/types/attraction";
import type { ApiResponse } from "@/types/api";
import rawData from "@/data/attractions.json";

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
