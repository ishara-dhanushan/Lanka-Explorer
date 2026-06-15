// src/components/layout/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  /** Segment used to match active state (null = root "/"). */
  segment: string | null;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
};

// Inline SVG icons — no icon library dependency.
function ExploreIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={active ? "stroke-secondary" : "stroke-ink-muted"}
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function FavoritesIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={
        active
          ? "fill-secondary stroke-secondary"
          : "fill-none stroke-ink-muted"
      }
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function NearbyIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={active ? "stroke-secondary" : "stroke-ink-muted"}
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={active ? "stroke-secondary" : "stroke-ink-muted"}
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Explore",
    segment: null,
    icon: <ExploreIcon active={false} />,
    activeIcon: <ExploreIcon active={true} />,
  },
  {
    href: "/favorites",
    label: "Favorites",
    segment: "favorites",
    icon: <FavoritesIcon active={false} />,
    activeIcon: <FavoritesIcon active={true} />,
  },
  {
    href: "/nearby",
    label: "Nearby",
    segment: "nearby",
    icon: <NearbyIcon active={false} />,
    activeIcon: <NearbyIcon active={true} />,
  },
  {
    href: "/profile",
    label: "Profile",
    segment: "profile",
    icon: <ProfileIcon active={false} />,
    activeIcon: <ProfileIcon active={true} />,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  function isActive(item: NavItem): boolean {
    if (item.segment === null) return pathname === "/";
    return pathname.startsWith(`/${item.segment}`);
  }

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-surface-bright border-t border-t-border-subtle shadow-[0_-2px_12px_0_rgba(0,0,0,0.10)]"
    >
      <ul className="flex h-14 items-center justify-around" role="list">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                id={`bottom-nav-${item.label.toLowerCase()}`}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className="flex min-h-12 min-w-12 flex-col items-center justify-center gap-0.5 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md"
              >
                {active ? item.activeIcon : item.icon}
                <span
                  className={`text-xs font-medium leading-none font-sans ${
                    active ? "text-secondary" : "text-ink-muted"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
