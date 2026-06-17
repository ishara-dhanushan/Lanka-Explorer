"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Persist dismissal state in-memory during client-side navigation
// but reset on full page reload
let hasDismissedThisSession = false;

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (hasDismissedThisSession) {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Update UI notify the user they can install the PWA after 3 seconds
      timeoutId = setTimeout(() => {
        if (!hasDismissedThisSession) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // If the app is already installed, this event won't fire.
    // Also, we don't want to annoy the user, so in a real app we might check localStorage
    // to see if they've dismissed it previously.

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    await deferredPrompt.userChoice;

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
    hasDismissedThisSession = true;
  };

  const handleClose = () => {
    setShowPrompt(false);
    hasDismissedThisSession = true;
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          className="fixed bottom-20 left-4 right-4 z-50 bg-surface border border-surface-container-high rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-md mx-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center shrink-0 relative">
              <Image
                src="/icons/favicon.png"
                alt="App Icon"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-ink font-bold font-montserrat text-sm">
                Install Lanka Explorer
              </h3>
              <p className="text-ink/70 text-xs mt-0.5">
                Add to home screen for offline access and a better experience.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleClose}
              className="flex-1 sm:flex-none px-4 py-2 text-ink/70 text-sm font-medium hover:bg-surface-container rounded-full! transition-colors"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 sm:flex-none px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-full! hover:bg-primary/90 transition-colors shadow-sm"
            >
              Install
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
