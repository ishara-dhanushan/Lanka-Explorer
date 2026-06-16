// src/app/profile/components/ProfileClient.tsx
"use client";

import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/contexts/ThemeContext";
import { useFavoritesContext } from "@/components/providers/FavoritesProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
      />
    </svg>
  );
}

export function ProfileClient() {
  const { profile, updateProfile, isReady } = useProfile();
  const { theme, setTheme } = useTheme();
  const { clearFavorites } = useFavoritesContext();

  const [nameInput, setNameInput] = useState(profile.displayName);
  const [nameError, setNameError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when hook is ready
  React.useEffect(() => {
    if (isReady) {
      setNameInput(profile.displayName);
    }
  }, [isReady, profile.displayName]);

  // Handle escape key to close modal
  React.useEffect(() => {
    if (!showClearModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowClearModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showClearModal]);

  if (!isReady) return null;

  const handleNameSave = () => {
    const trimmed = nameInput.trim();
    if (trimmed.length < 2 || trimmed.length > 40) {
      setNameError("Name must be between 2 and 40 characters.");
      return;
    }
    setNameError(null);
    updateProfile({ displayName: trimmed });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateProfile({ profileImage: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleClearFavorites = () => {
    setShowClearModal(true);
  };

  const confirmClearFavorites = () => {
    clearFavorites();
    setShowClearModal(false);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Page Header */}
      <div className="px-6 pt-10 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-primary">
            <UserIcon className="w-6 h-6" />
          </span>
          <h1 className="font-display font-bold text-2xl text-ink">
            Profile Settings
          </h1>
        </div>
        <p className="font-sans text-sm text-ink-muted">
          Manage your local preferences and profile information
        </p>
      </div>

      {/* Main Content Container */}
      <div className="px-6 flex flex-col gap-6 max-w-2xl w-full mx-auto">
        {/* Card 1: Personal Info */}
        <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-5 sm:p-6 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-outline-variant/60">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full! overflow-hidden bg-surface-container border-2 border-outline-variant flex items-center justify-center text-ink-muted shadow-sm">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-12 h-12" />
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full! shadow-md hover:scale-105 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Upload profile picture"
              >
                <CameraIcon className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="text-center">
              <h2 className="font-display font-semibold text-lg text-ink">
                {profile.displayName || "Explorer"}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="displayName"
              className="font-semibold text-sm text-ink"
            >
              Display Name
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <Input
                  id="displayName"
                  type="text"
                  value={nameInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNameInput(e.target.value);
                    if (nameError) setNameError(null);
                    if (saveSuccess) setSaveSuccess(false);
                  }}
                  placeholder="Enter your name"
                  maxLength={40}
                  className={nameError ? "border-error! focus:ring-error!" : ""}
                />
                {nameError && (
                  <p className="text-xs text-error font-medium pl-2">
                    {nameError}
                  </p>
                )}
                {saveSuccess && (
                  <p className="text-xs text-nature-green font-semibold pl-2">
                    Name updated successfully!
                  </p>
                )}
              </div>
              <Button
                variant="primary"
                onClick={handleNameSave}
                disabled={
                  nameInput.trim() === profile.displayName ||
                  nameInput.trim() === ""
                }
                className="sm:w-auto w-full h-12 shrink-0"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Card 2: Preferences */}
        <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-5 sm:p-6 flex flex-col gap-6">
          <h3 className="font-display font-semibold text-base text-ink mb-1">
            Preferences
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/60">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm text-ink">
                Distance Unit
              </span>
              <span className="text-xs text-ink-muted">
                Show distances in kilometers or miles.
              </span>
            </div>
            <div className="flex p-1 bg-surface-container rounded-full! border border-outline-variant/30 self-start sm:self-auto shrink-0 w-full sm:w-auto">
              {(["km", "mi"] as const).map((unit) => {
                const isActive = profile.distanceUnit === unit;
                return (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => updateProfile({ distanceUnit: unit })}
                    className={`relative flex-1 sm:flex-none px-5 py-2 rounded-full! text-sm font-semibold transition-all ${
                      isActive
                        ? "text-on-primary"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="distanceUnitToggle"
                        className="absolute inset-0 bg-primary rounded-full! shadow-sm z-0"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {unit === "km" ? "Kilometers" : "Miles"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm text-ink">App Theme</span>
              <span className="text-xs text-ink-muted">
                Customize the visual appearance.
              </span>
            </div>
            <div className="flex p-1 bg-surface-container rounded-full! border border-outline-variant/30 self-start sm:self-auto shrink-0 w-full sm:w-auto">
              {(["system", "light", "dark"] as const).map((t) => {
                const isActive = theme === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={`relative flex-1 sm:flex-none px-4 py-2 rounded-full! text-sm font-semibold capitalize transition-all ${
                      isActive
                        ? "text-on-primary"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="themeToggle"
                        className="absolute inset-0 bg-primary rounded-full! shadow-sm z-0"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{t}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 3: Danger Zone */}
        <div className="bg-error/5 border border-error/20 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
          <h3 className="font-display font-semibold text-base text-error mb-1">
            Danger Zone
          </h3>

          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm text-ink">
                Clear Favorites
              </span>
              <span className="text-xs text-ink-muted">
                Permanently delete all saved attractions.
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={handleClearFavorites}
              className="shrink-0 font-semibold transition-all text-error! border-error/30! hover:bg-error/10!"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showClearModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-sm p-6"
                onClick={() => setShowClearModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-display font-semibold text-lg text-ink">
                    Clear Favorites
                  </h3>
                  <p className="font-sans text-sm text-ink-muted">
                    Are you sure you want to permanently delete all your saved
                    attractions? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-end mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => setShowClearModal(false)}
                      className="flex-1 sm:flex-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={confirmClearFavorites}
                      className="flex-1 sm:flex-none bg-error! text-on-error! hover:bg-error/90!"
                    >
                      Confirm
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
