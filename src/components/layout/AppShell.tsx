// src/components/layout/AppShell.tsx
"use client";

import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 min-w-0 pb-14" id="main-content">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
