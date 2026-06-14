# Lanka Explorer — Pages and Features

## Document Purpose

This document describes the content, behavior, shared interface elements, exclusions, and acceptance criteria for each page in Lanka Explorer.

---

## 1. Application-Wide UI Structure

### 1.1 Mobile shell

The mobile designs share a consistent application structure:

1. Page-specific header or hero controls.
2. Scrollable main content.
3. Fixed bottom navigation.
4. Sufficient bottom padding so content is not hidden behind navigation.

Primary navigation items:

- Explore.
- Favorites.
- Nearby.
- Profile.

The current route must be visually active.

### 1.2 Desktop shell

The desktop the approved design designs use a persistent left-side navigation pattern.

The desktop shell should contain:

- Lanka Explorer branding.
- Explore, Favorites, Nearby, and Profile links.
- Main content area.
- Optional simple top utility area when supported by the design.

Do not implement notifications merely because a notification icon appears in the approved design. Notification functionality is outside Track B scope.

### 1.3 Shared page container

All non-hero content should use consistent:

- Horizontal padding.
- Section spacing.
- Maximum width.
- Responsive grid behavior.

### 1.4 Theme coverage

Every shared shell element must support both light and dark themes:

- Body background.
- Sidebar.
- Bottom navigation.
- Active navigation state.
- Cards.
- Inputs.
- Chips.
- Text.
- Borders.
- Empty states.
- Status cards.

---

## 2. Common UI Elements

### 2.1 Lanka Explorer brand mark/text

Appears in Explore, Favorites, Profile, and desktop navigation.

Implementation rule:

- Use one shared brand component or consistent text treatment.
- Do not introduce another product name.
- The detail page may use a back control instead of the full brand header.

### 2.2 Responsive navigation

Mobile:

- Fixed bottom tab bar.
- Icons and labels.
- Active state.

Desktop:

- Left sidebar.
- Same routes and labels.
- Active state.

Use one navigation configuration so mobile and desktop labels cannot drift.

### 2.3 Attraction card

Appears on:

- Explore.
- Favorites.
- Nearby.
- Related attractions on Detail.

Common card content:

- Image.
- Name.
- Category badge when appropriate.
- Location.
- Optional distance.
- Favorite control.
- Optional map action on Nearby.

The card should adapt through props rather than having four duplicated implementations.

### 2.4 Favorite control

Appears on cards and detail hero.

Required states:

- Not saved.
- Saved.
- Temporarily disabled before favorites hydration if needed.

Required behavior:

- Toggle immediately.
- Persist.
- Accessible text.
- Visible in both themes.

### 2.5 Category filter chips

the design shows horizontally arranged category controls.

Official implementation options:

- All.
- Nature.
- Historical.
- Hotels.

The active chip must be obvious without relying only on subtle color changes.

### 2.6 Search control

Primary location:

- Explore page.

The desktop Favorites design includes a search field, but Favorites search is not required. Do not add it unless all core functionality is complete and the feature is approved.

### 2.7 Empty state

Required on:

- Favorites.
- Explore search/filter results.
- Nearby filtered results.

It should contain:

- Clear title.
- Short explanatory text.
- One useful action.
- Optional simple illustration/icon.

### 2.8 Location status card

Required on Nearby.

States:

- Idle.
- Requesting.
- Detected.
- Permission denied.
- Unsupported.
- Error.

### 2.9 Weather presentation

Required mainly on Attraction Details.

It should show:

- Temperature.
- Condition.
- Small icon or symbolic visual if available.
- Loading or unavailable state without breaking the page.

### 2.10 Theme setting

Required in Profile.

Use a two-option segmented control, radio group, or equivalent:

- Light.
- Dark.

System mode is not required.

---

# 3. Explore Page

## 3.1 Route

```text
/
```

## 3.2 Purpose

The Explore page is the main discovery experience. It introduces Lanka Explorer, presents featured attractions, and allows users to search and filter the complete attraction collection.

## 3.3 Route files

Suggested:

```text
src/app/
├── page.tsx
├── ExploreClient.tsx
├── ExploreHeader.tsx
├── AttractionSearch.tsx
├── FeaturedAttractions.tsx
└── AttractionsSection.tsx
```

`page.tsx` remains a Server Component and exports metadata.

`ExploreClient.tsx` owns data-fetch state, search state, category state, and derived filtered results.

## 3.4 Mobile layout

Recommended order:

1. Brand/header.
2. Greeting or concise page introduction.
3. Main heading such as “Explore Sri Lanka”.
4. Search input.
5. Category chips.
6. Featured section.
7. Remaining attractions section.
8. Bottom navigation.

The design text “Good Morning, Traveler” may be used as static supporting copy, but it must not depend on authentication.

## 3.5 Desktop layout

Recommended behavior:

- Sidebar navigation.
- Larger discovery heading.
- Search control in the main content area.
- Category controls.
- Featured cards in a wider grid.
- Remaining attractions in a multi-column grid.

The desktop page must use the same data and features as mobile.

## 3.6 Data requests

On client mount:

```text
GET /api/attractions
GET /api/categories
```

The requests may run in parallel.

Required states:

- Loading.
- Success.
- Partial failure.
- Error.
- Empty.

If categories fail but attractions load, the page may still display an `All` view and an explanatory fallback.

## 3.7 Search behavior

Search should match:

- Attraction name.
- Location name.
- District.
- Province.

Recommended behavior:

- Case-insensitive.
- Trim leading/trailing whitespace.
- Update as the user types.
- No backend request for every keystroke.
- No submit button required.
- Clear control when text exists.

Search is applied together with category filtering.

Example:

```text
Visible attractions =
  attractions matching selected category
  AND attractions matching normalized search query
```

## 3.8 Category filter behavior

Default:

```text
all
```

When `nature`, `historical`, or `hotels` is selected, show only that category.

Filters should not mutate the original attraction array.

## 3.9 Featured section

Source:

- Attractions where `featured` is `true`.

If no record is featured:

- Hide the section rather than rendering an empty heading.

Mobile presentation:

- Horizontal carousel or one prominent card followed by swipeable cards.

Desktop presentation:

- Larger grid or highlighted cards.

Do not add a complex carousel library. Native horizontal overflow is sufficient.

## 3.10 Attraction card behavior

Tapping the card navigates to:

```text
/attractions/{id}
```

The favorite button toggles the favorite without unintentionally opening the detail route.

Card content:

- Card image.
- Name.
- Category.
- Location.
- Favorite control.

Optional on Explore:

- Distance only when location is already available in shared state.
- Do not trigger geolocation solely to populate Explore cards.
- Do not fetch weather for each card.

## 3.11 Explore states

### Loading

Use skeleton cards matching final dimensions.

### API error

Show:

- “Attractions could not be loaded.”
- Retry action.

### No search/filter results

Show:

- “No attractions found.”
- Explanation.
- Clear search/filter action.

### Empty dataset

Show a controlled empty state, not a blank page.

## 3.12 Explore acceptance criteria

- [ ] Attractions are fetched asynchronously.
- [ ] Categories are fetched asynchronously.
- [ ] Search matches name and location fields.
- [ ] Official category filters work.
- [ ] Search and category filters combine correctly.
- [ ] Featured records display separately.
- [ ] Card navigation works.
- [ ] Favorite toggling works.
- [ ] No weather request is made per card.
- [ ] Loading, error, and no-results states exist.
- [ ] Mobile and desktop layouts match the same content model.
- [ ] Light and dark modes remain readable.

---

# 4. Attraction Detail Page

## 4.1 Route

```text
/attractions/[id]
```

## 4.2 Purpose

The detail page provides rich information about one attraction and exposes the primary travel actions: save, check weather, understand distance, and open maps.

## 4.3 Route files

Suggested:

```text
src/app/attractions/[id]/
├── page.tsx
├── AttractionDetailClient.tsx
├── AttractionHero.tsx
├── AttractionOverview.tsx
├── AttractionQuickInfo.tsx
├── AttractionLocation.tsx
├── WeatherSection.tsx
└── RelatedAttractions.tsx
```

## 4.4 Page metadata

The route page must remain a Server Component and export metadata.

Generic detail metadata is acceptable:

```text
Attraction Details | Lanka Explorer
```

Dynamic metadata may be added later only if it remains simple.

## 4.5 Data request

The Client Component receives the route ID and requests:

```text
GET /api/attractions/[id]
```

After attraction coordinates are available, request:

```text
GET /api/weather?latitude={latitude}&longitude={longitude}
```

Weather loading must not block attraction content.

## 4.6 Mobile layout

Based on the approved design, recommended order:

1. Hero image.
2. Floating back control.
3. Floating favorite control.
4. Category badge.
5. Weather summary.
6. Attraction name.
7. Location and optional user distance.
8. Quick information cards.
9. About/description.
10. Location summary.
11. Open in Google Maps action.
12. Nearby/related attractions.

## 4.7 Desktop layout

Based on the approved design:

- Desktop navigation shell.
- Larger hero/gallery region.
- Main attraction title and actions.
- About section.
- Quick information panel.
- Weather/location/action content arranged in columns.
- Related attractions below.

The design includes rating/review text. The product does not implement reviews.

A static rating summary may be omitted. If retained, it must come from JSON and remain display-only.

## 4.8 Hero section

Required:

- Hero image.
- Back button.
- Favorite button.

Optional:

- Small gallery count if gallery images exist.
- Additional gallery thumbnails.

No image-upload capability.

## 4.9 Overview section

Required:

- Attraction name.
- Category label.
- Main location.
- Description.

Optional fields displayed only when present:

- Opening hours.
- Recommended duration.

Do not render empty labels for missing optional fields.

## 4.10 Distance behavior

If current user coordinates are available in memory:

- Calculate and display distance.

If coordinates are unavailable:

- Do not automatically interrupt the user with a location prompt on the detail page.
- Show a subtle link/action to open Nearby or request location if appropriate.
- Maps navigation remains available using attraction coordinates.

## 4.11 Weather behavior

Display:

- Current temperature.
- Unit.
- Normalized condition.

States:

- Loading.
- Success.
- Unavailable.

Do not show a large disruptive error panel for weather failure. Use a compact fallback such as “Current weather unavailable.”

## 4.12 Google Maps behavior

Primary CTA:

```text
Open in Google Maps
```

Use a standard link generated from coordinates.

The action should open a new tab and include safe external-link attributes.

## 4.13 Related attractions

Related items may be selected by:

1. Same category.
2. Exclude current attraction.
3. Limit to a small number such as 2–3.

This calculation may happen client-side from a second `/api/attractions` request or from cached attraction data if the hook already provides it.

Do not create a separate recommendation engine.

## 4.14 Detail states

### Loading

Skeleton hero and text blocks.

### Not found

Friendly message:

- Attraction not found.
- Return to Explore action.

### General API error

- Could not load attraction.
- Retry and return actions.

### Weather error

Compact non-blocking fallback.

## 4.15 Detail acceptance criteria

- [ ] The route ID controls the requested record.
- [ ] Attraction data comes from the API.
- [ ] Missing IDs produce a controlled 404-style state.
- [ ] Favorite control matches global favorites state.
- [ ] Optional quick information is conditionally rendered.
- [ ] Weather loads independently.
- [ ] Maps link uses correct coordinates.
- [ ] Description is readable on mobile.
- [ ] The hero remains stable during loading.
- [ ] Both themes support overlay controls and text contrast.

---

# 5. Favorites Page

## 5.1 Route

```text
/favorites
```

## 5.2 Purpose

The Favorites page displays attractions the user saved on the current device.

## 5.3 Route files

```text
src/app/favorites/
├── page.tsx
├── FavoritesClient.tsx
└── FavoritesGrid.tsx
```

## 5.4 Data sources

- Favorite IDs from FavoritesProvider.
- All attraction records from `/api/attractions`.

Derived data:

```text
favorite attractions =
  attractions whose id exists in favoriteIds
```

Preserve a predictable order. Acceptable options:

- Order of favorite IDs.
- Attraction source order.

Do not sort unpredictably on every render.

## 5.5 Mobile layout

Based on the approved design:

1. Page header.
2. “Saved Places” heading.
3. Saved attraction cards.
4. Discover-more action.
5. Empty state when no favorites.
6. Bottom navigation.

## 5.6 Desktop layout

- Desktop sidebar.
- Page title and short description.
- Attraction grid.
- Empty state if needed.

The approved desktop design contains filter/search controls and richer content. These are optional and not required.

## 5.7 Favorite removal

The user can remove an attraction directly from this page.

Expected behavior:

- Card disappears immediately.
- LocalStorage updates.
- Empty state appears if the final favorite is removed.
- No confirmation modal required for removing one favorite.

## 5.8 Empty state

Required copy concept:

- Title: “No favorites yet”.
- Text: Explain how to save places.
- Action: “Explore attractions”.

## 5.9 Invalid favorite IDs

If LocalStorage contains an ID no longer present in JSON:

- Ignore it in display.
- The provider may clean invalid IDs after attraction data is known.
- Do not crash.

## 5.10 Favorites acceptance criteria

- [ ] Favorite IDs persist after reload.
- [ ] Full objects are not stored.
- [ ] Saved cards resolve from current API data.
- [ ] Removal updates immediately.
- [ ] Empty state is implemented.
- [ ] Invalid IDs are handled.
- [ ] Explore action works.
- [ ] Shared attraction cards are reused.
- [ ] Light/dark styles are complete.

---

# 6. Nearby Page

## 6.1 Route

```text
/nearby
```

## 6.2 Purpose

The Nearby page is the clearest demonstration of browser Geolocation integration. It shows the user's location status and sorts attractions by calculated distance.

## 6.3 Route files

```text
src/app/nearby/
├── page.tsx
├── NearbyClient.tsx
├── LocationStatusCard.tsx
└── NearbyAttractionsList.tsx
```

## 6.4 Data sources

- Attractions from `/api/attractions`.
- Categories from `/api/categories` if category filtering is included.
- Coordinates from `useUserLocation`.
- Distance unit from local profile preferences.

## 6.5 Location request flow

Initial state:

- Explain that location is needed to calculate nearby distances.
- Show “Use my location”.

On click:

1. Set status to requesting.
2. Call `navigator.geolocation.getCurrentPosition`.
3. On success, store coordinates in memory.
4. Calculate distance to every attraction.
5. Sort ascending.
6. Render results.

Do not store coordinates in LocalStorage.

## 6.6 Success status card

Based on the approved design, show:

- Location detected.
- Browser-reported coordinates or a generic “Current location”.
- Refresh/retry action.

Do not claim a city name unless the app has reverse-geocoded it. Reverse geocoding is not in scope.

Therefore, avoid hardcoded statements such as “Colombo, Sri Lanka” unless the demo intentionally uses known simulated coordinates and the text is clearly static. Coordinates are the honest default.

## 6.7 Distance calculation

For every attraction:

```text
distanceKm = Haversine(userCoordinates, attractionCoordinates)
```

Sort:

```text
ascending distanceKm
```

Format according to profile preference:

- Kilometers.
- Miles.

## 6.8 Nearby filters

A shared category filter may be used:

- All.
- Nature.
- Historical.
- Hotels.

The design's Temples, Parks, Museums, and Dining chips are not part of the official category model and should not be implemented as separate categories.

Distance-radius filtering such as “Within 2 km” is optional. Do not add it before the core nearest-first list works.

## 6.9 Nearby card behavior

Required:

- Image.
- Name.
- Location.
- Distance.
- Favorite.
- Open details.
- Open Maps.

The map action should be clearly separated from card navigation.

## 6.10 Location failure states

### Permission denied

- Explain that permission was denied.
- Explain that browsing still works.
- Provide a retry action.
- Do not repeatedly trigger the permission prompt automatically.

### Unsupported

- Explain the browser does not support geolocation.
- Show normal attraction browsing without distances if useful.

### Timeout or unavailable

- Show controlled error.
- Retry action.
- Keep previously fetched attraction data visible.

## 6.11 Embedded map decision

The approved desktop design suggests map/list controls.

An embedded map is out of scope.

Use:

- Nearby list.
- Google Maps links.

Do not add Leaflet, Google Maps JavaScript SDK, or another map library.

## 6.12 Nearby acceptance criteria

- [ ] Location is requested through a clear user flow.
- [ ] Success, requesting, denied, unsupported, and error states exist.
- [ ] Coordinates are not persisted.
- [ ] Distances are calculated locally.
- [ ] Results sort nearest first.
- [ ] Unit preference is applied.
- [ ] Official category filters work if included.
- [ ] Maps links work.
- [ ] App remains usable without location.
- [ ] No embedded map library is used.

---

# 7. Profile Page

## 7.1 Route

```text
/profile
```

## 7.2 Purpose

The Profile page is a lightweight local-settings screen. It does not represent an online account.

It supports:

- Display name.
- Distance unit.
- Theme.
- Clearing favorites.
- Local-data explanation.

## 7.3 Route files

```text
src/app/profile/
├── page.tsx
├── ProfileClient.tsx
├── ProfileForm.tsx
├── DistanceUnitSetting.tsx
├── ThemeSetting.tsx
└── ClearFavoritesAction.tsx
```

## 7.4 Mobile design source

Use the simpler mobile the approved design design as the functional source:

- User name.
- “Travel Enthusiast” supporting label.
- Preferred distance unit.
- Theme.
- Clear all favorites.
- Local data notice.

## 7.5 Desktop design simplification

Do not implement these desktop design elements:

- Verified traveler.
- Explorer levels.
- Places visited.
- Reviews left.
- Saved spot statistics beyond actual favorite count.
- Photos shared.
- Currency.
- Language.
- Notification preferences.
- Account sharing.

The desktop page should responsively arrange the same mobile settings.

## 7.6 Display name form

This form demonstrates client-side validation.

Rules:

- Required.
- Trim whitespace.
- 2–40 characters.
- Whitespace-only is invalid.
- Save only valid values.

Required states:

- Default/current value.
- Dirty state.
- Validation error.
- Saved confirmation.

Do not submit to a server.

## 7.7 Distance unit setting

Options:

- Kilometers (`km`).
- Miles (`mi`).

The selected option must affect distance rendering on Nearby and Detail where distance appears.

## 7.8 Theme setting

Options:

- Light.
- Dark.

Required behavior:

- Update immediately.
- Persist after reload.
- Selected state visible.
- Keyboard accessible.
- No system option required.

## 7.9 Clear favorites action

This is a destructive local action.

Recommended behavior:

- Ask for simple confirmation because it removes the complete saved list.
- Clear FavoritesProvider state.
- Clear saved IDs from LocalStorage.
- Show success feedback.

Do not clear profile or theme settings.

## 7.10 Local-data notice

Required concept:

```text
Your profile preferences and favorites are stored locally on this device.
```

Do not imply cloud synchronization.

## 7.11 Profile acceptance criteria

- [ ] Profile page contains no login/account flow.
- [ ] Name validation is client-side and accessible.
- [ ] Valid profile data persists locally.
- [ ] Distance unit changes display formatting.
- [ ] Light/dark theme changes immediately.
- [ ] Theme persists.
- [ ] Clear favorites requires deliberate action.
- [ ] Local-data explanation is visible.
- [ ] Desktop adds layout, not extra account features.

---

# 8. Theme Feature

## 8.1 Functional requirement

The entire app must support light and dark modes.

## 8.2 Control location

Primary location:

- Profile page.

An additional quick toggle in a global header is not required.

## 8.3 Light mode direction

Use the the approved brand colors:

- Soft near-white background.
- White or elevated cards.
- Deep ocean blue primary.
- Teal secondary.
- Dark readable text.
- Subtle borders and shadows.

## 8.4 Dark mode direction

Create semantic dark equivalents:

- Deep neutral/navy page background.
- Slightly lighter card surfaces.
- High-contrast primary text.
- Muted secondary text.
- Light or vivid brand accents.
- Visible but subtle borders.
- Controlled shadows.
- Image overlays that preserve text legibility.

Do not reuse light surface colors in dark mode.

## 8.5 Theme acceptance criteria

- [ ] Theme applies before or immediately after hydration without distracting flash.
- [ ] No hydration warnings.
- [ ] All routes support both modes.
- [ ] Inputs, chips, cards, navigation, and empty states are covered.
- [ ] Image overlays remain readable.
- [ ] Selected theme persists.
- [ ] Only Light and Dark are exposed.

---

# 9. Weather Feature

## 9.1 Scope

Weather is a supporting feature on Attraction Detail.

## 9.2 Required information

- Current temperature.
- Temperature unit.
- Plain-language condition.

## 9.3 Data source

Client calls internal API:

```text
GET /api/weather
```

The internal route calls Open-Meteo.

## 9.4 Non-goals

- Multi-day forecast.
- Hourly forecast.
- Weather alerts.
- Weather on every attraction card.
- API key management.
- Weather history.

## 9.5 Acceptance criteria

- [ ] Weather request begins only after coordinates exist.
- [ ] Weather failure does not break detail content.
- [ ] Upstream response is normalized.
- [ ] Loading and unavailable states exist.
- [ ] No API key is hardcoded.

---

# 10. LocalStorage Feature

## 10.1 Keys

```text
lanka-explorer-favorites
lanka-explorer-profile
```

Theme storage is controlled by `next-themes`.

## 10.2 Required safeguards

- Client-only access.
- JSON parse protection.
- Default fallback.
- No full attraction object persistence.
- No location persistence.
- No sensitive data.

## 10.3 Cross-page consistency

Favorites must remain consistent across all routes.

Profile distance preference must be read wherever distance is formatted.

---

# 11. Loading and Feedback Requirements

## 11.1 Skeletons

Required for:

- Explore attraction list.
- Detail hero/content.
- Favorites while data resolves.
- Nearby attraction data.
- Weather summary.

## 11.2 Small loading indicators

Appropriate for:

- Location request.
- Save profile action if a brief simulated state is used.
- Weather.

## 11.3 Toasts/status feedback

A full toast library is not required.

Inline or temporary status messages are sufficient for:

- Profile saved.
- Favorites cleared.
- Weather unavailable.
- Retry failures.

---

# 12. Accessibility Requirements

Every page must include:

- One clear main heading.
- Semantic main content.
- Proper labels.
- Accessible icon buttons.
- Keyboard-operable controls.
- Visible focus.
- Text alternatives.
- Error text.
- Appropriate external-link indication.
- Touch-friendly targets.
- No critical information conveyed only by color.

Bottom navigation must use semantic navigation markup and route links.

---

# 13. Design-Fidelity Rules

The goal is to implement the approved interface design language, not mechanically copy static design markup.

Retain:

- Overall page hierarchy.
- Brand colors.
- Rounded card system.
- Mobile bottom nav.
- Desktop sidebar.
- Typography hierarchy.
- Immersive travel imagery.
- Spacing rhythm.
- Search and chips.
- Empty-state tone.

Improve where needed:

- Accessibility.
- Semantic HTML.
- Reusability.
- Dark mode.
- Real data states.
- Responsive transitions.
- Scope discipline.

Generated static design markup is a visual reference, not production React code.

---

# 14. End-to-End Feature Acceptance

The full page set is accepted when:

- [ ] Navigation works between all routes.
- [ ] Every page has metadata.
- [ ] Explore fetches and displays JSON-backed data.
- [ ] Search and filters work together.
- [ ] Detail loads by ID and handles not-found.
- [ ] Favorite state is shared and persistent.
- [ ] Nearby calculates and sorts distance.
- [ ] Weather is isolated and resilient.
- [ ] Google Maps links are correct.
- [ ] Profile validation and preferences work.
- [ ] Light and dark modes work globally.
- [ ] Mobile and desktop layouts follow the approved design.
- [ ] Out-of-scope the approved design features are not implemented.
- [ ] No runtime or hydration errors remain.
