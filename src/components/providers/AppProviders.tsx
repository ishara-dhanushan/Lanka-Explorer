// src/components/providers/AppProviders.tsx
"use client";

import React from "react";
import { ThemeProvider } from "@contexts/ThemeContext";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ThemeProvider>
  );
}
