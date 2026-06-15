# Lanka Explorer — Implementation Plan

## Document Purpose

This document defines the recommended build order for Lanka Explorer. The order is designed to reduce rework, keep the app runnable after every phase, and prioritize assignment requirements before optional polish.

Do not create every planned file at the beginning. Add files when the relevant feature is implemented.

---

## 1. Implementation Principles

1. Build a working vertical slice early.
2. Keep the project runnable after each task.
3. Complete required features before visual extras.
4. Match the approved page hierarchy while replacing static design markup with reusable React components.
5. Use JSON-backed API routes from the first data implementation.
6. Keep `page.tsx` files as Server Components.
7. Add light/dark tokens early so dark mode does not become a late rewrite.
8. Test permission-denied and API-failure paths, not only successful paths.
9. Avoid dependencies until a real need is demonstrated.
10. Commit in small, explainable units.

---

# Phase 0 — Repository and Baseline

## Goal

Create a clean Next.js project and establish the documentation and branding.

## Tasks

- [ ] Create repository named `lanka-explorer`.
- [ ] Create the latest stable Next.js App Router project with TypeScript, Tailwind CSS, ESLint, and `src`.
- [ ] Confirm development server runs.
- [ ] Add the `docs` directory and all five documents.
- [ ] Replace default Next.js title and metadata with Lanka Explorer.
- [ ] Remove default demo content.
- [ ] Confirm `.gitignore` excludes generated dependencies and build output.
- [ ] Add initial README separately from these internal docs.
- [ ] Commit the clean baseline.

## Validation

- `npm run dev` starts successfully.
- Home page renders without errors.
- Browser title uses Lanka Explorer.
- No old product name appears.
- No unnecessary packages are installed.

---

# Phase 1 — Design Foundation and Application Shell

## Goal

Build the reusable visual foundation based on the the approved design branding and support light/dark modes from the start.

## Tasks

### 1.1 Fonts and tokens

- [ ] Configure Montserrat for headings.
- [ ] Configure Inter for body/interface text.
- [ ] Define semantic light theme variables.
- [ ] Define semantic dark theme variables.
- [ ] Define radii, spacing, and elevation utilities.
- [ ] Preserve minimum touch targets.

### 1.2 Theme

- [ ] Create `ThemeContext` (`src/contexts/ThemeContext.tsx`).
- [ ] Add `ThemeProvider` to root layout.
- [ ] Configure class-based Light/Dark switching (`.dark` on `<html>`).
- [ ] Support `light`, `dark`, and `system` modes.
- [ ] Persist theme in `localStorage` under key `"theme"`.

### 1.3 Shared shell

- [ ] Build `AppShell`.
- [ ] Build mobile bottom navigation.
- [ ] Build desktop sidebar.
- [ ] Add active route styling.
- [ ] Add shared page container.
- [ ] Ensure main content is not covered by fixed mobile navigation.

### 1.4 Core UI primitives

Create only the primitives needed immediately:

- [ ] Button.
- [ ] IconButton.
- [ ] Input.
- [ ] Badge.
- [ ] Card.
- [ ] Skeleton.
- [ ] EmptyState.
- [ ] ErrorState.

## Validation

- Navigation is usable on narrow and wide layouts.
- Both themes style the shell.
- Active route is visible.
- Keyboard focus is visible.
- No route-specific content has been prematurely moved into shared folders.

---

# Phase 2 — JSON Data and API Routes

## Goal

Establish the required asynchronous data architecture.

## Tasks

### 2.1 Domain types

- [ ] Create attraction types.
- [ ] Create category types.
- [ ] Create API response types.
- [ ] Create weather and location types.

### 2.2 JSON content

- [ ] Create `attractions.json`.
- [ ] Add at least nine attractions.
- [ ] Include at least three items per official category.
- [ ] Add valid local image paths.
- [ ] Include meaningful descriptions.
- [ ] Include coordinates.
- [ ] Mark featured attractions.
- [ ] Create `categories.json`.

### 2.3 Images

- [ ] Place images under `public/images/attractions`.
- [ ] Confirm every JSON path resolves.
- [ ] Use sensible card/hero aspect ratios.
- [ ] Add useful image alt information through record names/context.

### 2.4 API routes

- [ ] Implement `GET /api/attractions`.
- [ ] Implement `GET /api/attractions/[id]`.
- [ ] Implement `GET /api/categories`.
- [ ] Add normalized success/error responses.
- [ ] Add 404 for unknown attraction.
- [ ] Add basic route error handling.

### 2.5 Client helpers/hooks

- [ ] Implement typed API helpers.
- [ ] Implement `useAttractions`.
- [ ] Implement `useAttraction`.
- [ ] Implement `useCategories`.
- [ ] Handle abort on unmount.

## Validation

- Open API routes directly in browser.
- Responses are valid JSON.
- Unknown ID returns 404.
- No page imports a hardcoded attraction array.
- Client fetch can render one simple test list.

---

# Phase 3 — Explore Page

## Goal

Complete the main attraction discovery experience.

## Tasks

### 3.1 Route page

- [ ] Keep root `page.tsx` as a Server Component.
- [ ] Add metadata.
- [ ] Render `ExploreClient`.

### 3.2 Route-specific UI

- [ ] Implement Explore header.
- [ ] Implement search input.
- [ ] Implement category filters.
- [ ] Implement featured section.
- [ ] Implement remaining attractions section.

### 3.3 Shared attraction card

- [ ] Build one reusable AttractionCard.
- [ ] Add image, name, category, and location.
- [ ] Add navigation to detail.
- [ ] Add FavoriteButton placeholder/provider integration.
- [ ] Ensure icon action does not trigger card navigation.

### 3.4 Search and filtering

- [ ] Normalize search text.
- [ ] Search name and location.
- [ ] Apply selected category.
- [ ] Combine search and category.
- [ ] Add clear action.
- [ ] Add no-results state.

### 3.5 Data states

- [ ] Skeleton loading.
- [ ] API error with retry.
- [ ] Empty dataset.
- [ ] Category failure fallback.

## Validation

- Search and filters work simultaneously.
- Featured items are not duplicated accidentally unless intentional.
- No weather request occurs for cards.
- Explore works in both themes.
- Explore matches mobile and desktop approved page hierarchy.

---

# Phase 4 — Favorites

## Goal

Implement persistent shared favorites across routes.

## Tasks

### 4.1 Favorites provider

- [ ] Create FavoritesProvider.
- [ ] Add provider to AppProviders.
- [ ] Load LocalStorage after mount.
- [ ] Validate stored IDs.
- [ ] Add toggle, clear, and lookup functions.
- [ ] Persist updates.
- [ ] Handle invalid JSON.

### 4.2 Favorite button

- [ ] Connect shared FavoriteButton to context.
- [ ] Add selected/unselected icons.
- [ ] Add accessible labels.
- [ ] Handle pre-hydration state.

### 4.3 Favorites page

- [ ] Keep `page.tsx` as Server Component.
- [ ] Add metadata.
- [ ] Fetch attractions.
- [ ] Resolve saved IDs.
- [ ] Render shared cards.
- [ ] Implement empty state.
- [ ] Implement removal.

## Validation

- Favorite on Explore appears on Favorites.
- Detail and card controls stay synchronized.
- Reload preserves saved IDs.
- Removing last favorite shows empty state.
- Invalid LocalStorage does not crash.

---

# Phase 5 — Attraction Detail

## Goal

Complete the rich detail flow and map navigation.

## Tasks

### 5.1 Route

- [ ] Keep dynamic `page.tsx` as Server Component.
- [ ] Add metadata.
- [ ] Pass ID to `AttractionDetailClient`.

### 5.2 Detail request

- [ ] Fetch `/api/attractions/[id]`.
- [ ] Add loading skeleton.
- [ ] Add not-found state.
- [ ] Add general retry state.

### 5.3 Detail UI

- [ ] Hero image.
- [ ] Back control.
- [ ] Favorite control.
- [ ] Category badge.
- [ ] Name and location.
- [ ] Description.
- [ ] Quick information.
- [ ] Location section.
- [ ] Maps action.
- [ ] Related attractions.

### 5.4 Maps utility

- [ ] Create typed Google Maps URL utility.
- [ ] Use anchor link rather than `window.open`.
- [ ] Validate link in mobile and desktop browsers.

## Validation

- Every attraction route loads correctly.
- Unknown ID is controlled.
- Maps opens correct coordinates.
- Detail supports both themes.
- Optional JSON fields do not leave broken gaps.

---

# Phase 6 — Geolocation and Nearby

## Goal

Implement the assignment's key browser hardware/API feature.

## Tasks

### 6.1 Geolocation hook

- [ ] Implement `useUserLocation`.
- [ ] Add explicit statuses.
- [ ] Add permission success.
- [ ] Add permission denied.
- [ ] Add unsupported browser.
- [ ] Add timeout/unavailable error.
- [ ] Add retry.

### 6.2 Distance utilities

- [ ] Implement Haversine distance.
- [ ] Add kilometer-to-mile conversion.
- [ ] Add formatting helper.
- [ ] Test known coordinate examples.

### 6.3 Nearby route

- [ ] Keep `page.tsx` as Server Component.
- [ ] Add metadata.
- [ ] Fetch attractions.
- [ ] Render initial enable-location state.
- [ ] Render detected location state.
- [ ] Calculate all distances.
- [ ] Sort nearest first.
- [ ] Render shared cards with distance and maps action.
- [ ] Add official category filters if included.

### 6.4 Detail distance

- [ ] Reuse location/distance state when available.
- [ ] Do not force location permission on detail load.

## Validation

Test all browser states:

- Successful location.
- Permission denied.
- Position unavailable.
- Timeout.
- Unsupported API simulation.
- Retry.

Confirm no coordinates are persisted.

---

# Phase 7 — Profile Preferences and Theme Control

## Goal

Complete local preferences, client-side validation, and user-visible theme selection.

## Tasks

### 7.1 Profile storage

- [ ] Create storage key constant.
- [ ] Implement safe preference parsing.
- [ ] Store display name and distance unit.
- [ ] Provide default values.

### 7.2 Profile form

- [ ] Keep route `page.tsx` as Server Component.
- [ ] Add metadata.
- [ ] Create controlled display-name form.
- [ ] Validate required, min, max, and trimmed content.
- [ ] Add accessible error state.
- [ ] Add saved feedback.

### 7.3 Distance unit

- [ ] Add `km` and `mi` control.
- [ ] Apply preference in Nearby.
- [ ] Apply preference on Detail distance.

### 7.4 Theme setting

- [ ] Add Light/Dark setting.
- [ ] Connect to `useTheme()` from `ThemeContext`.
- [ ] Prevent incorrect hydration UI.
- [ ] Verify every route in both modes.

### 7.5 Clear favorites

- [ ] Add deliberate confirmation.
- [ ] Clear only favorites.
- [ ] Keep profile and theme.
- [ ] Show success feedback.

## Validation

- Form does not save invalid names.
- Settings survive reload.
- Distance unit updates actual displayed values.
- Theme survives reload.
- Clear favorites works without clearing other preferences.

---

# Phase 8 — Weather

## Goal

Add resilient current weather to attraction details.

## Tasks

### 8.1 Internal API

- [ ] Implement `/api/weather`.
- [ ] Validate latitude and longitude.
- [ ] Call Open-Meteo.
- [ ] Normalize response.
- [ ] Map weather codes.
- [ ] Handle upstream error and timeout.

### 8.2 Client hook

- [ ] Implement `useWeather`.
- [ ] Request only with valid attraction coordinates.
- [ ] Abort on unmount.
- [ ] Expose loading/error/data.

### 8.3 Detail UI

- [ ] Add compact WeatherSection.
- [ ] Add loading state.
- [ ] Add unavailable state.
- [ ] Do not block detail rendering.

## Validation

- Weather appears for valid attractions.
- Network failure leaves detail usable.
- No weather calls occur on every Explore/Favorites/Nearby card.
- No API key is required.

---

# Phase 9 — Responsive and Design Polish

## Goal

Bring the implementation into close visual alignment with the approved design while preserving scope and accessibility.

## Tasks

- [ ] Refine mobile spacing.
- [ ] Refine desktop sidebar and grid.
- [ ] Verify fixed bottom navigation.
- [ ] Ensure no horizontal overflow.
- [ ] Apply Montserrat/Inter hierarchy.
- [ ] Refine image overlays.
- [ ] Refine card elevations.
- [ ] Refine chips and active states.
- [ ] Complete dark-mode tokens.
- [ ] Add reduced-motion-friendly transitions.
- [ ] Confirm touch-target sizing.
- [ ] Confirm focus styles.
- [ ] Confirm all icon buttons have accessible names.

## Validation

Check:

- Narrow phone portrait.
- Larger phone.
- Tablet-sized width.
- Desktop width.
- Light theme.
- Dark theme.
- Zoomed text.
- Long attraction names.
- Long profile name.
- Empty states.

Specific hardcoded viewport numbers do not need to appear in the public README; they belong to testing notes only.

---

# Phase 10 — Final Testing and Deployment

## Goal

Prepare for submission and viva.

## Functional checklist

- [ ] All routes work through direct URL navigation.
- [ ] Search works.
- [ ] Filters work.
- [ ] Favorites persist.
- [ ] Detail 404 works.
- [ ] Geolocation success works.
- [ ] Geolocation denial works.
- [ ] Distance unit works.
- [ ] Google Maps works.
- [ ] Weather fallback works.
- [ ] Theme persists.
- [ ] Profile validation works.
- [ ] Clear favorites works.

## Technical checklist

- [ ] No TypeScript errors.
- [ ] No ESLint errors.
- [ ] Production build succeeds.
- [ ] No console errors.
- [ ] No hydration warnings.
- [ ] No broken images.
- [ ] API errors are controlled.
- [ ] JSON is valid.
- [ ] No secrets committed.
- [ ] No unused large dependencies.

## Deployment checklist

- [ ] Push final code to GitHub.
- [ ] Connect repository to Vercel.
- [ ] Confirm production build.
- [ ] Test geolocation through HTTPS.
- [ ] Test all routes on deployed URL.
- [ ] Confirm API routes work on Vercel.
- [ ] Confirm external maps links.
- [ ] Confirm Open-Meteo route.
- [ ] Add deployed URL to repository.
- [ ] Prepare submission text file if using link submission.

---

# Recommended Commit Sequence

Examples:

```text
chore(init): bootstrap Lanka Explorer Next.js application
docs(project): add product and architecture specifications
feat(theme): add light and dark theme foundation
feat(layout): implement responsive application shell
feat(data): add JSON attraction data and API routes
feat(explore): implement attraction discovery and filters
feat(favorites): add persistent local favorites
feat(attractions): implement attraction detail pages
feat(nearby): add geolocation and distance sorting
feat(profile): add local preferences and theme controls
feat(weather): add Open-Meteo current weather
fix(ui): resolve responsive and dark mode issues
docs(readme): add setup and deployment instructions
```

Commit messages should reflect actual changes and should not claim unfinished functionality.

---

# Definition of Done

A phase is done only when:

- Its success and failure states work.
- It works in light and dark modes where relevant.
- It is responsive.
- It introduces no console errors.
- It follows colocation rules.
- It does not add out-of-scope features.
- The developer can explain it during the viva.
