# Lanka Explorer

Lanka Explorer is a mobile-first travel guide web application designed to help users discover attractions across Sri Lanka through an intuitive and responsive experience.

The application allows users to browse attractions, filter destinations by category, view detailed attraction information, save favorites, calculate real-time distances using geolocation, view weather information, and navigate directly to locations using Google Maps.

## Features

### Explore Attractions

Browse a collection of attractions across Sri Lanka with rich imagery and categorized content.

### Category Filtering

Filter attractions by category:

- Nature
- Historical
- Hotels

### Attraction Details

View detailed information for each attraction, including:

- Images
- Description
- Location information
- Distance from the user's location
- Weather information

### Favorites

Save attractions to favorites and access them later.

Favorites are stored locally in the browser and persist across sessions.

### Nearby Attractions

Use the browser's Geolocation API to calculate distances and discover nearby attractions.

### Maps Integration

Open attractions directly in Google Maps for navigation.

### Weather Information

View current weather information for attraction locations using Open-Meteo.

### Search & Discovery

Search for attractions by name or location to quickly find specific destinations.

### Profile & Preferences

Manage your user preferences locally, including:

- **Theme Selection:** Toggle between Light and Dark mode.
- **Distance Units:** Choose between Kilometers and Miles for nearby calculations.

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Browser APIs

- Geolocation API
- LocalStorage API

### External Services

- Open-Meteo API
- Google Maps Deep Links

### Deployment

- Vercel

## Project Structure

```text
Lanka-Explorer/
├── docs/                # Project documentation (Architecture, Implementation Plan, Overview)
├── public/              # Static assets
├── src/                 # Source code
│   ├── app/             # Next.js app directory (routes, api, layouts, pages)
│   │   ├── api/         # API routes
│   │   ├── attractions/ # Attractions page route
│   │   ├── favorites/   # Favorites page route
│   │   ├── nearby/      # Nearby attractions page route
│   │   └── profile/     # User profile page route
│   ├── components/      # Global reusable React components
│   ├── contexts/        # React Context providers (e.g., FavoritesProvider)
│   ├── data/            # Static application data
│   ├── hooks/           # Custom React hooks (e.g., geolocation)
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions and helpers
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration (if applicable)
└── package.json         # Project metadata, dependencies, and scripts
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/ishara-dhanushan/Lanka-Explorer.git
```

Navigate to the project directory:

```bash
cd lanka-explorer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Deployment

The application is designed for deployment on Vercel.

## Academic Information

**Module:** SENG 41293 – Mobile Web Application Development

**Project Track:** Track B – Local Tour & Travel Web Guide

**Institution:** University of Kelaniya

## License

This project was developed for educational purposes.
