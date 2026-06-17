// src/app/profile/page.tsx
import React from "react";
import { ProfileClient } from "./components/ProfileClient";

export const metadata = {
  title: "Profile",
  description:
    "Manage your local profile settings, favorites, and preferences.",
};

export default function ProfilePage() {
  return (
    <main className="flex flex-col flex-1 min-w-0 h-full">
      <ProfileClient />
    </main>
  );
}
