# GoCart

GoCart is a Vite-powered React storefront that showcases how AI-assisted commerce can look and feel. It focuses on fast client-side navigation, Tailwind-driven UI polish, and mock APIs that simulate personalization flows without needing a backend.

## Features

- Personalized home feed with rotating hero banners, flash deals that include a live countdown, curated recommendation rails, and featured brand grid.
- Category discovery page with responsive filter sidebar, price/rating/brand filters, multiple sort orders, and simple pagination.
- Product detail view with gallery, pricing callouts, feature/spec sheets, and cart integration backed by a context-based state container.
- Cart workspace with quantity editing, inline totals, empty-state onboarding, and a summarized checkout sidebar.
- Account placeholder that renders mock orders, saved addresses, and tabbed navigation to demonstrate profile flows.
- Client-side mock API (`src/services/api.js`) that wraps rich seed data (`src/data/mockData.js`) and simulates latency for a realistic UX.

## Tech Stack

- React 19 + React Router 7 for the SPA and routing.
- Vite 7 for dev server, HMR, and production builds.
- Tailwind CSS 3 for utility-first styling plus a small set of brand colors defined in `tailwind.config.js`.
- React Icons for lightweight iconography across layout components.

## Getting Started

### Prerequisites

- Node.js 18+ (needed by Vite 7 and React 19).
- npm (ships with Node).

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the printed localhost URL (default `http://localhost:5173`) and begin exploring.

### Production Build

```bash
npm run build   # bundles assets into dist/
npm run preview # serves the production build locally
```

## Project Structure

```
src/
  components/        # Layout chrome, catalog widgets, shared UI primitives
  context/           # Cart provider and hooks
  data/              # Mock catalog, recommendation, and account seed data
  hooks/             # Reusable utilities (e.g., countdown timer)
  layouts/           # Route wrappers (header/footer scaffolding)
  pages/             # Route-level screens (Home, Category, Product, Cart, Auth, Account)
  services/          # Mock API abstraction that simulates network latency
  main.jsx           # App bootstrap with BrowserRouter and CartProvider
```

Tailwind styles are declared in `src/index.css`, while reusable color tokens and font families live in `tailwind.config.js`.

## Mock Data & API Layer

- `src/data/mockData.js` centralizes product catalogs, hero banners, orders, and helper selectors (`getProductById`, `getProductsByCategory`).
- `src/services/api.js` exposes async helpers (`getHeroBanners`, `getProductDetail`, `getAccountOverview`, etc.) that clone the mock data and delay responses to imitate a backend call.

You can extend the experience by adding more seed data, connecting the API layer to a real backend, or swapping the cart context for a server state solution once authentication is introduced.

## Next Ideas

1. Wire forms (login/register/address) to a real API or Supabase/Firebase auth.
2. Persist cart state to `localStorage` or backend sessions for returning users.
3. Add Vitest or Cypress coverage for cart math, filtering, and navigation guard rails.

