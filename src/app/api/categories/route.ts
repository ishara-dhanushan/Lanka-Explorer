// src/app/api/categories/route.ts
import { NextResponse } from "next/server";
import type { Category } from "@typings/category";
import type { ApiResponse } from "@typings/api";
import rawData from "@data/categories.json";

const categoriesData = rawData as Category[];

export async function GET(): Promise<NextResponse<ApiResponse<Category[]>>> {
  try {
    return NextResponse.json({ success: true, data: categoriesData });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CATEGORIES_UNAVAILABLE",
          message: "Category data could not be loaded.",
        },
      },
      { status: 500 }
    );
  }
}
