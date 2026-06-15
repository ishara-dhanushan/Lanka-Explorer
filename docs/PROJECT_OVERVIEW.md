# Lanka Explorer — Project Overview

## Document Purpose

This document describes the product context, goals, boundaries, and success criteria for **Lanka Explorer**. It provides the high-level reference for planning and implementation.

Technical architecture is described in [`ARCHITECTURE.md`](./ARCHITECTURE.md). Detailed page behavior is described in [`PAGES_AND_FEATURES.md`](./PAGES_AND_FEATURES.md). The recommended development order is described in [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md).

---

## 1. Project Identity

| Item                         | Value                                                             |
| ---------------------------- | ----------------------------------------------------------------- |
| Application name             | **Lanka Explorer**                                                |
| Repository name              | `lanka-explorer`                                                  |
| Application type             | Mobile-first responsive travel guide web application              |
| Academic module              | SENG 41293 — Mobile Web Application Development                   |
| Selected assignment track    | Track B — Local Tour & Travel Web Guide                           |
| Institution                  | University of Kelaniya                                            |
| Primary deployment target    | Vercel                                                            |
| Primary implementation style | Frontend-focused Next.js application with thin Next.js API routes |

The product name must always be written as **Lanka Explorer**. Do not introduce alternative application names, aliases, old names, or repository branding in visible application content.

---

## 2. Product Summary

Lanka Explorer helps local and international travelers discover attractions across Sri Lanka using a polished, mobile-first interface.

The core experience allows a visitor to:

1. Browse Sri Lankan attractions.
2. search attractions by name or location.
3. Filter attractions by the assignment categories.
4. Open a detailed attraction page.
5. Save and remove favorite attractions.
6. Allow the browser to detect the visitor's current location.
7. Calculate the distance from the visitor to each attraction.
8. View nearby attractions ordered by distance.
9. Open an attraction directly in Google Maps.
10. View current weather information for a selected attraction.
11. Change between light and dark themes.
12. Save simple local preferences without creating an online account.

The product is a travel discovery companion, not a booking system, social network, or tourism administration platform.

---

## 3. Assignment Alignment

The implementation must clearly demonstrate the following areas:

### 3.1 Mobile-first responsive design

The interface must be designed primarily for mobile use and then adapt cleanly to wider layouts. The approved interface designs contain both mobile and desktop references, but mobile behavior remains the priority.

The implementation must demonstrate:

- Responsive layout reflow.
- Flexible grids and containers.
- Touch-friendly controls.
- Readable typography.
- Stable image sizing.
- No unintended horizontal scrolling.
- Clean behavior while resizing the browser.
- A usable desktop adaptation rather than a separate desktop product.

### 3.2 State management and interaction

The application must include meaningful client-side interaction, including:

- Search input state.
- Category filter state.
- Favorites state.
- Geolocation request and permission states.
- Weather loading and error states.
- Profile preference state.
- Theme state.
- Client-side form validation.

### 3.3 Asynchronous data handling

Static domain data must be stored in JSON files and exposed through simple Next.js API routes.

Required data flow:

```text
JSON data files
    ↓
Next.js Route Handlers
    ↓
fetch("/api/...")
    ↓
Client Components
    ↓
Rendered UI
```

The client must visibly use asynchronous `fetch()` calls rather than importing attraction arrays directly into interactive page components.

Weather must also be loaded asynchronously. The preferred approach is a small internal `/api/weather` Route Handler that calls Open-Meteo and returns a normalized JSON response to the client.

### 3.4 Browser storage

The application must use browser storage to persist user-specific local data, including:

- Favorite attraction IDs.
- Local profile preferences.
- Preferred distance unit.

Theme persistence is handled by `ThemeContext` via `localStorage`.

### 3.5 Browser Web API integration

The application must use the Geolocation API to:

- Request the visitor's current position.
- Handle permission success and failure.
- Calculate attraction distances.
- Sort nearby attractions.

The application must continue to function when geolocation is denied or unavailable.

---

## 4. Product Vision

Lanka Explorer should feel like a focused, modern travel-discovery product rather than a classroom form application.

The visual direction from the approved design is described as **Premium Discovery**:

- Large travel photography.
- Clean surfaces and generous spacing.
- Deep ocean blue as the main brand anchor.
- Tropical teal and nature green as supporting colors.
- Warm amber/orange for selective emphasis.
- Rounded cards and controls.
- Soft elevation rather than harsh borders.
- Montserrat for major headings.
- Inter for body and interface text.

The visual experience may take inspiration from polished travel products, but the implementation must remain realistic for an individual academic project.

The priority is not the number of features. The priority is that the required features are complete, understandable, responsive, stable, and defensible during the viva.

---

## 5. Target Users

### 5.1 Primary user

A traveler who wants to discover destinations in Sri Lanka from a mobile browser.

The user may be:

- A local traveler.
- An international tourist.
- A student planning a trip.
- A traveler already near an attraction.
- A person comparing destinations before visiting.

### 5.2 Account model

There are no online user accounts.

The user is an anonymous local browser user. Preferences are saved only on the current browser/device.

The application must not imply that local data is synchronized across devices.

---

## 6. Core User Journeys

### 6.1 Discover an attraction

1. User opens Lanka Explorer.
2. Explore page loads attraction data from `/api/attractions`.
3. Category data loads from `/api/categories`.
4. User browses featured and regular attraction cards.
5. User searches or filters the list.
6. User opens an attraction detail page.

### 6.2 Save a favorite

1. User taps the favorite control on a card or detail page.
2. The attraction ID is added to local favorites state.
3. Favorites are persisted to LocalStorage.
4. The favorite icon updates everywhere that consumes the shared favorites state.
5. User opens the Favorites page to view saved attractions.

### 6.3 Discover nearby attractions

1. User opens the Nearby page.
2. User grants location permission after an explicit request or page action.
3. Browser returns coordinates.
4. App calculates straight-line distance to every attraction.
5. Attractions are ordered nearest first.
6. User opens a nearby attraction or opens it in Google Maps.

### 6.4 Check attraction weather

1. User opens an attraction detail page.
2. Attraction details load from `/api/attractions/[id]`.
3. The detail client requests `/api/weather` with the attraction coordinates.
4. Current temperature and a simple condition are displayed.
5. If the weather service fails, the rest of the detail page remains usable.

### 6.5 Change theme

1. User opens Profile.
2. User selects Light or Dark.
3. Theme changes immediately.
4. Theme remains selected after reload.
5. All pages and shared components remain readable in both modes.

### 6.6 Save local profile settings

1. User opens Profile.
2. User edits the local display name.
3. Client-side validation checks the value.
4. Valid settings are saved locally.
5. Preferred distance unit is applied when distances are displayed.

---

## 7. Required Feature Scope

The following features are required for the planned product.

### 7.1 Explore

- App identity and page heading.
- Search attractions.
- Category filters.
- Featured attraction presentation.
- Attraction cards.
- Favorite controls.
- Navigation to attraction details.
- Loading, error, and no-results states.

### 7.2 Attraction Details

- Hero image.
- Back navigation.
- Favorite control.
- Name, category, location, and description.
- Opening hours when present in JSON.
- Recommended visit duration when present in JSON.
- User distance when location is available.
- Weather summary.
- Google Maps action.
- Nearby/related attraction suggestions when practical.

### 7.3 Favorites

- Display saved attractions.
- Remove favorites.
- Persist favorite IDs.
- Empty favorites state.
- Link back to Explore.

### 7.4 Nearby

- Geolocation status.
- Retry or enable-location action.
- Distance calculation.
- Nearest-first sorting.
- Category filter if it can reuse the shared category filter cleanly.
- Open details.
- Open Google Maps.
- Permission-denied and unsupported-browser states.

### 7.5 Profile

- Local display name.
- Client-side validation.
- Preferred distance unit.
- Light/dark theme selection.
- Clear all favorites.
- Local-data explanation.

### 7.6 Responsive application shell

- Mobile app header where appropriate.
- Fixed mobile bottom navigation.
- Desktop sidebar or equivalent wider navigation.
- Shared page container.
- Responsive content grid.
- Active route state.

---

## 8. Supporting Feature Scope

The following features support the core experience but must remain simple:

- Static rating summaries may be shown only when supplied by JSON, but users cannot submit reviews.
- A small image gallery may be added to the detail page if the supplied design assets support it.
- Related attractions may be calculated from the same category or nearest coordinates.
- A static notification icon from the approved interface design should be omitted unless it has a real, accessible purpose.
- Desktop presentation may expand card grids and move navigation to a sidebar.
- A simple browser manifest may be added later, but custom offline service-worker behavior is not required.

---

## 9. Explicitly Out of Scope

The following features are outside the project scope and should not be added without first revising the project requirements.

### 9.1 Authentication and accounts

- Login.
- Registration.
- Passwords.
- Password recovery.
- Social sign-in.
- JWT handling.
- Sessions.
- Protected routes.
- Cloud user profiles.

### 9.2 Full backend and databases

- Separate Node.js/Express application.
- NestJS or Fastify backend.
- MongoDB.
- PostgreSQL.
- MySQL.
- Prisma.
- Drizzle.
- Supabase database.
- Firebase database.
- Database migrations.
- Server-side user persistence.

### 9.3 CRUD administration

- Create attraction.
- Edit attraction.
- Delete attraction.
- Admin dashboard.
- Content moderation.
- Role management.

### 9.4 Commerce and booking

- Hotel booking.
- Ticket booking.
- Availability management.
- Shopping cart.
- Checkout.
- Payment processing.
- Coupons.

### 9.5 Social/community functionality

- User reviews.
- Review submission.
- Comments.
- Chat.
- Messaging.
- Social feed.
- Follower system.
- User-uploaded photos.

### 9.6 Unnecessary technical complexity

- Redux unless specifically approved.
- React Query/TanStack Query unless a real need appears.
- GraphQL.
- Microservices.
- Complex state machines.
- Custom service worker and background sync.
- Embedded interactive map SDK.
- Dynamic imports used as a workaround for architecture problems.
- Large UI frameworks that replace the approved interface design language.

---

## 10. Design Reference

The approved interface design is the visual reference for:

- Page composition.
- Brand direction.
- Spacing rhythm.
- Typography hierarchy.
- Card shapes.
- Mobile bottom navigation.
- Desktop navigation adaptation.
- Empty states.
- Location-status presentation.
- Profile setting groups.
- Attraction detail hierarchy.

However, the approved interface designs contain some elements that exceed the approved assignment scope.

### 10.1 Design elements to retain

- Explore, Favorites, Nearby, Profile, and Attraction Detail page concepts.
- Immersive attraction cards.
- Search and category filtering.
- Mobile bottom navigation.
- Desktop sidebar adaptation.
- Location status card.
- Theme settings.
- Distance-unit settings.
- Favorite buttons.
- Google Maps actions.
- Light surfaces, rounded cards, and travel photography.
- Dark-mode equivalents of all visual tokens.

### 10.2 Design elements to simplify or exclude

- Review creation and full reviews UI.
- Verified traveler status.
- Explorer level/gamification.
- Places-visited statistics.
- Photos-shared statistics.
- Currency and language account settings.
- Notification management.
- Embedded map view.
- Numerous extra category types beyond the assignment categories.
- Any booking-style conversion flow.

The mobile Profile design is the main reference for scope. The richer desktop Profile design is a visual reference only and must not expand the functional requirements.

---

## 11. Official Categories

The assignment-aligned categories are:

- `nature`
- `historical`
- `hotels`

The UI also includes an `all` option, but `all` is a filter state rather than an attraction category stored on each item.

Do not add unrelated categories such as Temples, Parks, Museums, Dining, Wildlife, or Beaches as separate domain categories unless the category model is explicitly changed later.

An attraction may visually represent a beach, temple, park, or museum while still belonging to one of the three official assignment categories.

---

## 12. Static Data Strategy

All static domain data must be represented as valid JSON objects.

Required data files:

```text
src/data/attractions.json
src/data/categories.json
```

Optional static configuration may be added only when genuinely useful:

```text
src/data/app-content.json
```

Visible interactive pages must not import static attraction arrays directly. They must use the API routes.

Recommended API endpoints:

```text
GET /api/attractions
GET /api/attractions/[id]
GET /api/categories
GET /api/weather?latitude={value}&longitude={value}
```

Static JSON is the authoritative reference for attraction and category content.

Runtime data is not part of static JSON:

- Current geolocation.
- Current weather response.
- Favorite IDs.
- Local profile settings.
- Active theme.
- Search input.
- Selected category.

---

## 13. Data Persistence Boundaries

| Data                    | Storage                                           |
| ----------------------- | ------------------------------------------------- |
| Attractions             | JSON file, exposed through API route              |
| Categories              | JSON file, exposed through API route              |
| Current weather         | External Open-Meteo data, normalized by API route |
| Current location        | In-memory browser state                           |
| Favorite IDs            | LocalStorage                                      |
| Display name            | LocalStorage                                      |
| Preferred distance unit | LocalStorage                                      |
| Light/dark theme        | `ThemeContext` — `localStorage` persistence       |
| Search/filter state     | In-memory route state                             |

No private or sensitive data is collected.

---

## 14. Theme Requirements

Lanka Explorer must support:

- Light mode.
- Dark mode.

The implementation uses a custom `ThemeContext` (`src/contexts/ThemeContext.tsx`).

Required behavior:

- The theme can be changed from Profile.
- The default resolves from system preference on first visit.
- Supports `light`, `dark`, and `system` modes.
- Theme persistence is handled by `ThemeContext` via `localStorage`.
- The theme control must avoid hydration mismatch.
- Text, cards, overlays, navigation, images, borders, inputs, status messages, and empty states must remain readable in both themes.
- Dark mode must use designed semantic tokens rather than simply inverting colors.

---

## 15. Quality Goals

The finished product should satisfy the following quality goals:

### 15.1 Usability

- A first-time user understands the main navigation.
- Search and category filters are obvious.
- Favorite state is recognizable.
- Location permission is requested clearly.
- Denying location does not block browsing.
- Maps actions are clearly labeled.
- Theme selection is easy to find.

### 15.2 Reliability

- No uncaught runtime errors.
- No hydration warnings.
- No missing-key warnings.
- No layout breakage during loading.
- API failures produce controlled fallback states.
- Invalid attraction IDs produce a friendly not-found state.
- LocalStorage parsing failure falls back safely.

### 15.3 Performance

- Images are optimized.
- Weather is not requested for every attraction card.
- No heavy embedded map library.
- Static JSON responses are small.
- Repeated client requests are minimized.
- The page remains responsive while filtering and sorting.

### 15.4 Accessibility

- Touch targets are at least approximately 48 × 48 pixels.
- Buttons have meaningful accessible names.
- Images have useful alt text.
- Focus styles are visible.
- Text contrast works in both themes.
- Empty and error states are conveyed in text.
- Icon-only controls include labels.
- Form errors are associated with inputs.

### 15.5 Maintainability

- Route-specific components are colocated.
- Only genuinely shared components are global.
- Types are centralized.
- Data access contracts are documented.
- No duplicate favorite logic.
- No duplicate distance calculations.
- No duplicate theme persistence logic.

---

## 16. Product Completion Definition

Lanka Explorer is considered product-complete when:

1. All five planned screens exist and are navigable.
2. Attraction and category data come from JSON-backed Next.js API routes.
3. Explore supports search, filtering, details navigation, and favorites.
4. Favorites persist after reload.
5. Nearby handles location success, denial, unsupported browsers, and errors.
6. Distances are calculated correctly and can be shown in the selected unit.
7. Attraction details display weather without making the page dependent on weather success.
8. Google Maps links open the correct attraction coordinates.
9. Light and dark themes work across the entire UI.
10. Profile settings validate and persist locally.
11. Mobile navigation and desktop adaptation follow the approved design direction.
12. Route-level `page.tsx` files remain Server Components with metadata.
13. No full backend, authentication, database, CRUD admin, booking, or payment features exist.
14. Browser console is free of runtime errors and hydration warnings.
15. The app can be run locally and deployed to Vercel.
