---
name: Lanka Explorer Digital Branding
colors:
  surface: '#f9f9fe'
  surface-dim: '#dad9de'
  surface-bright: '#f9f9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf2'
  surface-container-high: '#e8e8ed'
  surface-container-highest: '#e2e2e7'
  on-surface: '#1a1c1f'
  on-surface-variant: '#43474f'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#90efef'
  on-secondary-container: '#006e6e'
  tertiary: '#381300'
  on-tertiary: '#ffffff'
  tertiary-container: '#592300'
  on-tertiary-container: '#d8885c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#93f2f2'
  secondary-fixed-dim: '#76d6d5'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f4f'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#723610'
  background: '#f9f9fe'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e7'
  nature-green: '#2E8B57'
  sunset-amber: '#FFBF00'
  warm-orange: '#FF8C00'
  surface-soft: '#F8F9FA'
  border-subtle: '#E9ECEF'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  touch-target-min: 48px
  margin-mobile: 1.25rem
  gutter-md: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system for the product focuses on a **Premium Discovery** aesthetic, blending high-end travel utility with the vibrant natural beauty of Sri Lanka. It targets international and local travelers seeking an organized, visually immersive experience. 

The visual style is **Modern Corporate with a Lifestyle lean**, emphasizing:
- **Immersive Visuals:** Large-scale photography and subtle gradients to evoke a sense of place.
- **High Clarity:** A clean, spacious layout that minimizes cognitive load during active travel.
- **Premium Tactility:** Soft shadows and significant border radii that make the interface feel approachable yet polished.

By combining the structural reliability of a professional booking platform with the warmth of a lifestyle app, the design system ensures the user feels both informed and inspired.

## Colors

The palette is rooted in the natural geography of the island. **Deep Ocean Blue** serves as the primary anchor for navigation and primary actions, providing a sense of stability and institutional trust. **Tropical Teal** and **Nature Green** are used for success states and secondary UI accents to reinforce the "Explorer" theme.

**Accents:**
- **Sunset Amber & Warm Orange:** Reserved for high-priority call-to-actions (CTAs), rating stars, and weather-related highlights. These colors contrast sharply against the blues to guide the eye toward conversion points.

**Neutrals:**
- The system uses a "Soft White" approach. Backgrounds utilize `#F8F9FA` to reduce screen glare and provide a more sophisticated feel than pure white, while `#E9ECEF` defines thin, unobtrusive borders.

## Typography

The typography system pairs **Montserrat** for headlines with **Inter** for functional text. 

- **Montserrat** provides a geometric, confident character for attraction titles and screen headers.
- **Inter** ensures maximum legibility for descriptions, reviews, and technical data.

Scale hierarchy is strictly enforced to maintain a "spacious" feel. Headers use a tight letter-spacing to appear more modern, while body text maintains standard tracking for better readability on mobile screens under various lighting conditions.

## Layout & Spacing

This design system follows a **Mobile-First Fluid Grid** model. On mobile viewports, a standard 4-column grid is used with 20px (`1.25rem`) side margins to ensure content doesn't feel cramped.

**Spacing Rhythm:**
- **Vertical Stack:** Uses a 8px-based scale. Components are separated by `stack-lg` (32px) for distinct sections and `stack-md` (16px) for related elements.
- **Touch Targets:** All interactive elements (buttons, chips, icons) must adhere to a minimum size of 48x48px to satisfy accessibility and PWA usability standards.
- **Reflow:** On desktop, the layout centers with a max-width of 1200px, expanding to a 12-column grid.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**. 

1.  **Low Elevation (Level 1):** Subtle 4px blur shadows used for cards and chips. This makes them feel "interactive" without cluttering the screen.
2.  **High Elevation (Level 2):** 12px blur shadows used for floating action buttons and the fixed bottom navigation bar.
3.  **Tonal Depth:** Surfaces use the `#F8F9FA` background to let pure white (`#FFFFFF`) card elements "pop" forward visually. 

Avoid harsh borders; instead, use the `border-subtle` color for secondary containers where shadow-based depth is unnecessary.

## Shapes

The design system utilizes **Rounded** geometry to evoke a friendly, modern travel vibe.

- **Standard Elements:** 8px (`0.5rem`) for input fields and small buttons.
- **Containers/Cards:** 16px (`1rem`) for attraction cards and modals to create a "contained" and premium feel.
- **Interactive Chips:** Fully rounded (pill-shaped) to distinguish them from square-cornered content blocks.

## Components

### Buttons
- **Primary:** Deep Ocean Blue background, white text, 16px rounded corners, 48px height.
- **Secondary:** Outlined Tropical Teal with a 1px border.
- **Shadow:** Small ambient shadow to suggest clickability.

### Immersive Image Cards
- **Structure:** Full-bleed image with a 15% dark overlay at the bottom for text legibility.
- **Details:** Title (Montserrat 18px) and location (Inter 14px) overlaid in white. 
- **Roundedness:** 16px corner radius.

### Horizontal Category Chips
- **Style:** Pill-shaped, light gray background (`#E9ECEF`) with 12px horizontal padding.
- **Active State:** Tropical Teal background with white text.
- **Behavior:** `overflow-x: auto` with hidden scrollbars for a clean mobile carousel.

### Bottom Tab Navigation
- **Fixed Position:** Always at the bottom of the viewport.
- **Visuals:** White background, Level 2 shadow, active icon in Deep Ocean Blue.
- **Target:** 56px height minimum for comfortable thumb reach.

### Modern Search Bar
- **Visuals:** Pure white background, subtle 1px border, left-aligned search icon.
- **Placeholder:** "Where to next?" in soft gray text.

### Feedback & Loading
- **Skeleton Loaders:** Soft gray pulses (`#E9ECEF`) mirroring the card shapes.
- **Empty States:** Centered, minimalist line-art illustrations in Nature Green tones.