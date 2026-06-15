// src/app/api/attractions/[id]/route.ts
import { NextResponse } from "next/server";
import type { Attraction } from "@typings/attraction";
import type { ApiResponse } from "@typings/api";
import rawData from "@data/attractions.json";

const attractionsData = rawData as Attraction[];

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(
  _request: Request,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<Attraction>>> {
  try {
    const { id } = await params;
    const attraction = attractionsData.find((a) => a.id === id);

    if (!attraction) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ATTRACTION_NOT_FOUND",
            message: "The requested attraction was not found.",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: attraction });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "ATTRACTION_ERROR",
          message: "An error occurred while loading the attraction.",
        },
      },
      { status: 500 }
    );
  }
}
