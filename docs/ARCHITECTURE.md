# Lanka Explorer — Architecture

## Document Purpose

This document describes the technical architecture of Lanka Explorer, including file placement, component boundaries, data flow, API contracts, browser state, theme implementation, and error handling.

Read [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) before this document.

---

## 1. Architectural Summary

Lanka Explorer uses a frontend-focused Next.js App Router architecture.

```text
Static JSON domain data
          ↓
Next.js Route Handlers
          ↓
Client-side fetch calls
          ↓
Route-specific Client Components
          ↓
Shared presentation components
```

Browser-specific capabilities are handled in Client Components and hooks:

```text
LocalStorage     → favorites and profile preferences
Geolocation API  → current coordinates
ThemeContext     → light/dark theme
Google Maps URL  → external navigation
```

The project does not use a separate backend application or database.

---

## 2. Main Technology Decisions

| Concern               | Decision                               |
| --------------------- | -------------------------------------- |
| Framework             | Next.js App Router                     |
| Language              | TypeScript                             |
| Styling               | Tailwind CSS                           |
| Static data source    | JSON files in `src/data`               |
| Internal data access  | Next.js Route Handlers                 |
| Client data loading   | Native `fetch()`                       |
| Favorites persistence | LocalStorage                           |
| Profile persistence   | LocalStorage                           |
| Theme                 | Custom `ThemeContext`                  |
| Geolocation           | Browser Geolocation API                |
| Distance calculation  | Local Haversine utility                |
| Weather               | Open-Meteo through a Next.js API route |
| Maps                  | Google Maps URL deep links             |
| Hosting               | Vercel                                 |

Avoid adding dependencies when a small native implementation is sufficient.

---

## 3. Target Project Structure

```text
lanka-explorer/
├── docs/
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── PAGES_AND_FEATURES.md
│   ├── IMPLEMENTATION_PLAN.md
│
├── public/
│   ├── icons/
│   └── images/
│       └── attractions/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── attractions/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── categories/
│   │   │   │   └── route.ts
│   │   │   └── weather/
│   │   │       └── route.ts
│   │   │
│   │   ├── attractions/
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── components/
│   │   │           ├── AttractionDetailClient.tsx
│   │   │           ├── AttractionHero.tsx
│   │   │           ├── AttractionOverview.tsx
│   │   │           ├── AttractionQuickInfo.tsx
│   │   │           ├── AttractionLocation.tsx
│   │   │           ├── WeatherSection.tsx
│   │   │           └── RelatedAttractions.tsx
│   │   │
│   │   ├── favorites/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── FavoritesClient.tsx
│   │   │       └── FavoritesGrid.tsx
│   │   │
│   │   ├── nearby/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── NearbyClient.tsx
│   │   │       ├── LocationStatusCard.tsx
│   │   │       └── NearbyAttractionsList.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── ProfileClient.tsx
│   │   │       ├── ProfileForm.tsx
│   │   │       ├── DistanceUnitSetting.tsx
│   │   │       ├── ThemeSetting.tsx
│   │   │       └── ClearFavoritesAction.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── ExploreClient.tsx
│   │       ├── ExploreHeader.tsx
│   │       ├── AttractionSearch.tsx
│   │       ├── FeaturedAttractions.tsx
│   │       └── AttractionsSection.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── AppHeader.tsx
│   │   │   ├── MobileBottomNavigation.tsx
│   │   │   ├── DesktopSidebar.tsx
│   │   │   └── PageContainer.tsx
│   │   │
│   │   ├── providers/
│   │   │   ├── AppProviders.tsx
│   │   │   └── FavoritesProvider.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── AttractionCard.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── FavoriteButton.tsx
│   │   │   └── DistanceText.tsx
│   │   │
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── IconButton.tsx
│   │       ├── Input.tsx
│   │       ├── LoadingState.tsx
│   │       ├── Skeleton.tsx
│   │       └── StatusCard.tsx
│   │
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   │
│   ├── data/
│   │   ├── attractions.json
│   │   └── categories.json
│   │
│   ├── hooks/
│   │   ├── useFavorites.ts
│   │   ├── useLocalStorage.ts
│   │   ├── usePreferences.ts
│   │   ├── useUserLocation.ts
│   │   └── useWeather.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── attractions.ts
│   │   │   ├── categories.ts
│   │   │   └── weather.ts
│   │   ├── distance.ts
│   │   ├── maps.ts
│   │   ├── storage-keys.ts
│   │   └── weather-codes.ts
│   │
│   └── types/
│       ├── api.ts
│       ├── attraction.ts
│       ├── category.ts
│       ├── location.ts
│       ├── preferences.ts
│       └── weather.ts
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

This is a planned structure, not a requirement to create every file before it is needed. Files should be added progressively.

---

## 4. Route-Level Colocation

Route-specific components stay inside a `components/` subfolder of the route that owns them.

Examples:

```text
src/app/favorites/
├── page.tsx
└── components/
    ├── FavoritesClient.tsx
    └── FavoritesGrid.tsx
```

```text
src/app/attractions/[id]/
├── page.tsx
└── components/
    ├── AttractionDetailClient.tsx
    ├── AttractionHero.tsx
    └── WeatherSection.tsx
```

A component should move to `src/components/shared/` only when it is genuinely used by multiple routes or represents a global application concern.

### 4.1 Global shared examples

- App shell.
- Mobile bottom navigation.
- Desktop sidebar.
- Attraction card.
- Favorite button.
- Category filter if used on both Explore and Nearby.
- Generic Button, Input, Skeleton, EmptyState, and ErrorState.
- Providers.

### 4.2 Route-specific examples

- Explore hero.
- Favorites grid.
- Location status card.
- Attraction quick information.
- Profile form.
- Theme settings group.

Do not place every component in a global folder. Avoid a large, unstructured `components` directory.

---

## 5. Server Component Rules

All route-level `page.tsx` files must remain Server Components.

Required route pages:

```text
src/app/page.tsx
src/app/attractions/[id]/page.tsx
src/app/favorites/page.tsx
src/app/nearby/page.tsx
src/app/profile/page.tsx
```

Do not add `"use client"` to these files.

Their responsibilities are:

- Export page metadata.
- Receive route parameters.
- Compose route-specific Client Components.
- Provide server-rendered page structure when useful.
- Avoid browser-only APIs.

A page may be intentionally small:

```tsx
import type { Metadata } from "next";
import { FavoritesClient } from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Favorites | Lanka Explorer",
  description: "View the Sri Lankan attractions saved on this device.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
```

The exact export style may follow the project convention, but the architectural boundary must remain.

---

## 6. Page Metadata Rules

Every route-level page must provide meaningful metadata.

Minimum metadata:

- `title`
- `description`

Recommended titles:

| Route               | Title                  |
| ------------------- | ---------------------- | --------------- |
| `/`                 | `Explore Sri Lanka     | Lanka Explorer` |
| `/attractions/[id]` | `Attraction Details    | Lanka Explorer` |
| `/favorites`        | `Favorites             | Lanka Explorer` |
| `/nearby`           | `Nearby Attractions    | Lanka Explorer` |
| `/profile`          | `Profile & Preferences | Lanka Explorer` |

The dynamic detail route may initially use generic static metadata. Dynamic metadata is optional and should not introduce complicated self-fetching or duplicate data access.

Root layout metadata should define:

- Default title.
- Title template.
- General description.
- Application name.
- Icons when available.

---

## 7. Client Component Rules

A component needs `"use client"` only when it uses one or more of the following:

- React state.
- React effects.
- Event handlers.
- Context that depends on browser state.
- LocalStorage.
- `window`.
- `document`.
- `navigator`.
- Geolocation.
- Theme switching.
- Interactive search and filtering.
- Client-side fetch lifecycle.
- Client-only form validation.

Use Client Components at the lowest practical level. Do not convert a whole route page into a Client Component just because one child needs interaction.

All imports must be static and placed at the top of the file. Do not use dynamic imports.

---

## 8. Providers

The root Server Component layout may render a Client Component provider wrapper.

Recommended structure:

```text
layout.tsx
  └── AppProviders
       ├── ThemeProvider
       └── FavoritesProvider
```

### 8.1 AppProviders

`AppProviders.tsx` is a Client Component that combines application-level providers.

It should not contain route UI.

### 8.2 ThemeProvider

Use the custom `ThemeContext` from `src/contexts/ThemeContext.tsx`.

Behavior:

- Class-based theme switching (adds `.dark` to `<html>`).
- Light default.
- System theme supported via `"system"` mode.
- Theme persisted in `localStorage` under the key `"theme"`.
- Exposes `theme`, `resolvedTheme`, and `setTheme` via `useTheme()` hook.

The root `<html>` element uses `suppressHydrationWarning` because the theme class is determined on the client.

### 8.3 FavoritesProvider

Favorites are used across Explore, Details, Favorites, and Nearby. A provider avoids multiple independent copies of favorite state.

Responsibilities:

- Load favorite IDs after client mount.
- Validate the stored value.
- Add/remove IDs.
- Expose `isFavorite`.
- Clear all favorites.
- Persist changes.
- Avoid rendering misleading favorite state before hydration.

Suggested context shape:

```ts
type FavoritesContextValue = {
  favoriteIds: string[];
  isReady: boolean;
  isFavorite: (attractionId: string) => boolean;
  toggleFavorite: (attractionId: string) => void;
  clearFavorites: () => void;
};
```

---

## 9. Static JSON Data

### 9.1 Required files

```text
src/data/attractions.json
src/data/categories.json
```

Do not store JavaScript functions, comments, `undefined`, dates, JSX, or imported values in JSON.

### 9.2 Attraction JSON shape

Recommended example:

```json
[
  {
    "id": "sigiriya-rock-fortress",
    "name": "Sigiriya Rock Fortress",
    "category": "historical",
    "shortDescription": "An ancient rock fortress rising above Sri Lanka's Central Province.",
    "description": "A longer attraction description written for the detail page.",
    "location": {
      "name": "Sigiriya",
      "district": "Matale",
      "province": "Central Province",
      "country": "Sri Lanka",
      "latitude": 7.957,
      "longitude": 80.7603
    },
    "images": {
      "card": "/images/attractions/sigiriya-card.jpg",
      "hero": "/images/attractions/sigiriya-hero.jpg",
      "gallery": []
    },
    "openingHours": "7:00 AM - 5:00 PM",
    "recommendedDuration": "3 - 4 hours",
    "featured": true
  }
]
```

### 9.3 Category JSON shape

```json
[
  {
    "id": "nature",
    "label": "Nature"
  },
  {
    "id": "historical",
    "label": "Historical"
  },
  {
    "id": "hotels",
    "label": "Hotels"
  }
]
```

The `All` filter is created by the UI and does not need to be stored as a domain category.

### 9.4 Data quantity

Use enough records to demonstrate all features without creating maintenance overhead.

Recommended minimum:

- 3 Nature records.
- 3 Historical records.
- 3 Hotel records.
- At least 9 total attractions.

Featured records should be distributed across categories where practical.

---

## 10. TypeScript Domain Types

JSON is the runtime source of data. TypeScript types define the expected shape.

Recommended attraction types:

```ts
export type AttractionCategoryId = "nature" | "historical" | "hotels";

export type AttractionLocation = {
  name: string;
  district: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type AttractionImages = {
  card: string;
  hero: string;
  gallery: string[];
};

export type Attraction = {
  id: string;
  name: string;
  category: AttractionCategoryId;
  shortDescription: string;
  description: string;
  location: AttractionLocation;
  images: AttractionImages;
  openingHours?: string;
  recommendedDuration?: string;
  featured: boolean;
};
```

Do not duplicate the type inside individual route folders.

Runtime schema-validation libraries are not required for this assignment. API routes should still perform basic defensive checks where useful.

---

## 11. Internal API Routes

### 11.1 `GET /api/attractions`

Returns all attraction records.

Success response:

```json
{
  "success": true,
  "data": []
}
```

Failure response:

```json
{
  "success": false,
  "error": {
    "code": "ATTRACTIONS_UNAVAILABLE",
    "message": "Attraction data could not be loaded."
  }
}
```

Search and category filtering should normally happen in the client after one request because the dataset is small. Do not add complex query parsing unless needed.

### 11.2 `GET /api/attractions/[id]`

Returns one attraction matching the requested ID.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Not found:

```json
{
  "success": false,
  "error": {
    "code": "ATTRACTION_NOT_FOUND",
    "message": "The requested attraction was not found."
  }
}
```

Use an appropriate 404 status for missing data.

### 11.3 `GET /api/categories`

Returns official category records.

### 11.4 `GET /api/weather`

Expected query:

```text
/api/weather?latitude=7.957&longitude=80.7603
```

Responsibilities:

- Validate coordinates.
- Call Open-Meteo.
- Normalize the response.
- Return only the fields required by the UI.
- Return controlled errors.

Normalized success shape:

```json
{
  "success": true,
  "data": {
    "temperature": 28,
    "temperatureUnit": "°C",
    "weatherCode": 1,
    "condition": "Mainly clear"
  }
}
```

Do not send the entire upstream response to the client.

---

## 12. API Client Helpers

Client-side requests may be centralized in `src/lib/api`.

Benefits:

- Consistent response parsing.
- Shared error handling.
- Typed return values.
- Easier route components.

Example responsibilities:

```text
getAttractions()
getAttractionById(id)
getCategories()
getWeather(latitude, longitude)
```

The helpers should use native `fetch()`.

Do not hide data loading behind unnecessary abstraction. The helper should remain a small typed wrapper.

---

## 13. Client Data Hooks

Shared hooks are appropriate because multiple routes need the same patterns. Simple data fetching should be inlined in components unless reused heavily.

### 13.1 `useWeather`

Responsibilities:

- Accept coordinates.
- Avoid a request until coordinates are valid.
- Fetch `/api/weather`.
- Expose loading and error.
- Allow the detail page to continue without weather.

Hooks must not call APIs during server rendering.

---

## 14. Favorites Architecture

### 14.1 Storage key

```text
lanka-explorer-favorites
```

### 14.2 Stored value

Store attraction IDs only:

```json
["sigiriya-rock-fortress", "galle-fort"]
```

Do not store full attraction objects because:

- JSON content can change.
- Full objects duplicate source data.
- IDs are sufficient to resolve current records.

### 14.3 Failure behavior

If LocalStorage contains invalid JSON:

- Catch parsing failure.
- Reset to an empty array.
- Do not crash.
- Optionally replace invalid storage with a valid empty array.

### 14.4 Hydration behavior

Do not read LocalStorage in module scope or Server Components.

Load it in a Client Component/provider after mount.

Until ready, favorite controls may render a neutral non-animated state or a small skeleton. Avoid briefly showing a false active state.

---

## 15. Profile Preferences Architecture

### 15.1 Storage key

```text
lanka-explorer-profile
```

### 15.2 Suggested stored shape

```json
{
  "displayName": "Traveler",
  "distanceUnit": "km"
}
```

### 15.3 Validation

Display name:

- Trim whitespace.
- Required.
- Minimum 2 characters.
- Maximum 40 characters.
- Do not accept whitespace-only input.

Distance unit:

- `km`
- `mi`

Use one validated object rather than several unrelated storage keys.

---

## 16. Theme Architecture

### 16.1 Required modes

- `light`
- `dark`

### 16.2 Library

Use the custom `ThemeContext` (`src/contexts/ThemeContext.tsx`).

Behavior:

- `resolvedTheme` drives a `.dark` class on `<html>`.
- Default resolves to system preference on first visit.
- Persisted in `localStorage` as `"theme"`.

### 16.3 Theme control

The control lives on the Profile page.

It should:

- Show both choices.
- Indicate the selected choice.
- Be keyboard accessible.
- Avoid rendering the incorrect selection during hydration.
- Apply the theme immediately.

### 16.4 Token strategy

Use semantic CSS variables or Tailwind theme utilities for:

- Page background.
- Card surface.
- Elevated surface.
- Primary text.
- Secondary text.
- Border.
- Primary action.
- Secondary action.
- Error.
- Success/location state.
- Overlay.

Do not hardcode light-only colors throughout individual components.

---

## 17. Geolocation Architecture

### 17.1 Hook

`useUserLocation` is a Client-side hook.

Suggested state:

```ts
type LocationStatus =
  | "idle"
  | "requesting"
  | "success"
  | "denied"
  | "unsupported"
  | "error";
```

Suggested returned value:

```ts
type UseUserLocationResult = {
  coordinates: UserCoordinates | null;
  status: LocationStatus;
  errorMessage: string | null;
  requestLocation: () => void;
};
```

### 17.2 Request timing

Do not request geolocation globally on every page load.

Preferred behavior:

- Request on the Nearby page after a clear user action, or
- Request when the Nearby page opens if the UI explains why.

An explicit action is easier to defend and avoids surprising the user.

### 17.3 Options

Reasonable browser options:

- Do not require high accuracy.
- Use a timeout.
- Allow a short cached position.

Exact values should remain simple and documented in code.

### 17.4 Failure handling

The UI must distinguish:

- Permission denied.
- Position unavailable.
- Timeout.
- Unsupported browser.
- General error.

All states must still allow normal attraction browsing.

---

## 18. Distance Architecture

Use a shared utility:

```text
src/lib/distance.ts
```

Core function:

```ts
calculateDistanceKm(
  startLatitude: number,
  startLongitude: number,
  endLatitude: number,
  endLongitude: number
): number
```

Use the Haversine formula.

Additional helper:

```ts
formatDistance(distanceKm: number, unit: "km" | "mi"): string
```

Expected examples:

```text
0.8 km away
12.4 km away
7.7 mi away
```

Do not call an external distance API. The assignment only requires real-time distance from simulated/current coordinates, and straight-line distance is sufficient.

---

## 19. Google Maps Architecture

Use a shared utility:

```text
src/lib/maps.ts
```

Recommended URL:

```text
https://www.google.com/maps/search/?api=1&query={latitude},{longitude}
```

The utility should:

- Validate numeric coordinates.
- URL-encode values when needed.
- Return a string.
- Avoid direct `window` usage where a normal anchor can be used.

Prefer an accessible `<a>` with:

- `target="_blank"`
- `rel="noreferrer"`

This is simpler and more accessible than calling `window.open()`.

---

## 20. Weather Architecture

Weather is primarily displayed on the detail page.

Do not request weather for every card.

Flow:

```text
Attraction detail loaded
        ↓
Coordinates available
        ↓
GET /api/weather
        ↓
Normalized weather model
        ↓
WeatherSection renders
```

Weather failure must be isolated. The attraction page remains fully usable.

A small map from Open-Meteo weather codes to plain-language labels should live in:

```text
src/lib/weather-codes.ts
```

Do not add a large icon package only for weather if the existing icon strategy is sufficient.

---

## 21. Responsive Layout Architecture

### 21.1 Mobile

- Fixed bottom navigation.
- Content padded above the bottom navigation.
- Single-column primary flow.
- Horizontally scrollable filter chips when needed.
- Large image cards.
- 20px-style side margin consistent with the design reference.
- Minimum 48px interactive targets.

### 21.2 Desktop

- Sidebar navigation or equivalent stable desktop navigation.
- Centered content with a practical max width around the design reference.
- Multi-column attraction grids.
- Detail page may use two-column content sections.
- Do not create a separate feature set for desktop.

### 21.3 Shared shell

`AppShell` should handle the overall responsive frame.

It may render:

- `DesktopSidebar`.
- Main content.
- `MobileBottomNavigation`.

The detail page may use a route-specific overlay header while remaining inside the same shell.

---

## 22. UI Component Boundaries

### 22.1 Shared attraction card

Used by:

- Explore.
- Favorites.
- Nearby.

It should accept data and presentation flags rather than route-specific business logic.

Possible props:

```ts
type AttractionCardProps = {
  attraction: Attraction;
  distanceKm?: number;
  distanceUnit?: "km" | "mi";
  showFavorite?: boolean;
  showMapAction?: boolean;
};
```

The component should not fetch attraction data itself.

### 22.2 Favorite button

- Reads favorites context.
- Uses an accessible label.
- Stops propagation if placed inside a linked card.
- Minimum touch target.
- Visible selected/unselected state in both themes.

### 22.3 Category filter

- Receives categories.
- Receives selected category.
- Calls a change callback.
- Handles the UI-only `all` state.
- Supports horizontal mobile scrolling.

### 22.4 Generic UI components

Generic primitives must not contain page-specific copy or data fetching.

---

## 23. Loading, Empty, and Error Strategy

Each asynchronous feature must define all three states.

### 23.1 Loading

Use skeletons that approximate final layout to reduce movement.

### 23.2 Empty

Examples:

- No attractions match search/filter.
- No favorites.
- No nearby attractions after filtering.

### 23.3 Error

Examples:

- Attraction API failed.
- Detail not found.
- Categories unavailable.
- Weather failed.
- Geolocation unavailable.
- LocalStorage invalid.

Errors should include a useful next action when practical:

- Retry.
- Clear search.
- Explore attractions.
- Enable location.
- Return to Explore.

Do not expose raw technical stack traces or upstream API messages.

---

## 24. Image Architecture

Use local images in:

```text
public/images/attractions/
```

Store public paths in JSON.

Use the Next.js Image component where practical.

Requirements:

- Meaningful `alt` text.
- Stable dimensions or aspect ratios.
- `object-cover` behavior for cards.
- Priority only for the most important above-the-fold image.
- Avoid loading every gallery image eagerly.
- Use a dark gradient overlay only where text sits on photography.

No external image-domain configuration is needed when images are local.

---

## 25. Form Architecture

The Profile form provides the required client-side validation example.

Requirements:

- Controlled Client Component input.
- Visible label.
- Inline error message.
- `aria-invalid` when invalid.
- Error association through `aria-describedby`.
- Save action disabled or blocked when invalid.
- Confirmation state after successful save.
- No server submission.

Search is a filter control, not a submitted form.

---

## 26. Import and Code Organization Rules

- Use static imports at the top of files.
- Do not use dynamic imports.
- Do not remove existing useful comment blocks.
- Add comments only where they clarify non-obvious logic.
- Use absolute alias imports for cross-feature shared modules.
- Use relative imports for files within the same route folder when clear.
- Avoid circular dependencies.
- Keep components focused.
- Move repeated logic to hooks or utilities only after real reuse appears.

---

## 27. API and Runtime Error Handling

Route Handlers must:

- Use `NextResponse.json`.
- Return appropriate HTTP statuses.
- Validate route parameters and weather coordinates.
- Catch upstream weather errors.
- Return normalized error payloads.
- Avoid leaking internal error details.

Client helpers must:

- Check `response.ok`.
- Validate the expected success field.
- Throw or return a controlled application error.
- Allow components to display user-friendly messages.

---

## 28. Caching Guidance

The attraction JSON is static, but complexity should remain low.

Acceptable behavior:

- Route Handler returns static data.
- Client fetches once per mounted route.
- Browser caching may use normal defaults or a simple explicit strategy.
- Weather should not be permanently cached.

Do not add a dedicated caching library.

If fetch caching behavior becomes relevant, document it clearly rather than relying on accidental defaults.

---

## 29. Security and Privacy Boundaries

- No secrets are required for Open-Meteo.
- Do not commit unrelated environment variables.
- Do not collect precise location on a server.
- Current coordinates should remain in browser state except when sent as query values to the internal weather route or included in a Google Maps URL.
- Do not log user coordinates in production.
- Do not store geolocation in LocalStorage.
- Explain that profile/favorites data is local to the device.

---

## 30. Architectural Acceptance Checklist

- [ ] All `page.tsx` files are Server Components.
- [ ] Every page exports metadata.
- [ ] Route-specific components are colocated.
- [ ] Only reusable components live in `src/components`.
- [ ] Attraction/category content is valid JSON.
- [ ] Interactive pages fetch through Next.js API routes.
- [ ] No route imports static attraction arrays for visible UI rendering.
- [ ] Favorites store IDs only.
- [ ] Geolocation is isolated in a Client hook.
- [ ] Weather is loaded only when needed.
- [ ] Theme uses custom `ThemeContext` with light and dark modes.
- [ ] No dynamic imports are used.
- [ ] No database or separate backend exists.
- [ ] Errors, empty states, and loading states are implemented.
- [ ] The browser console has no hydration or runtime errors.
