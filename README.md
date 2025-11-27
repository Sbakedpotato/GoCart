# GoCart

GoCart is a Vite-powered React storefront that now ships with an Express + MySQL + JWT starter API. The frontend focuses on fast client-side navigation, Tailwind-driven UI polish, and rich mock data; the backend adds a real auth surface you can extend with products, carts, and orders.

## Features

- Personalized home feed with rotating hero banners, flash deals that include a live countdown, curated recommendation rails, and featured brand grid.
- Category discovery page with responsive filter sidebar, price/rating/brand filters, multiple sort orders, and simple pagination.
- Product detail view with gallery, pricing callouts, feature/spec sheets, and cart integration backed by a context-based state container.
- Cart workspace with quantity editing, inline totals, empty-state onboarding, and a summarized checkout sidebar.
- Account placeholder that renders mock orders, saved addresses, and tabbed navigation to demonstrate profile flows.
- Client-side mock API (`src/services/api.js`) that wraps rich seed data (`src/data/mockData.js`) and simulates latency for a realistic UX.
- New Express backend scaffold (`server/`) with JWT-based auth, MySQL connection pooling, and health checks.

## Tech Stack

- React 19 + React Router 7 for the SPA and routing.
- Vite 7 for dev server, HMR, and production builds.
- Tailwind CSS 3 for utility-first styling plus a small set of brand colors defined in `tailwind.config.js`.
- React Icons for lightweight iconography across layout components.
- Express 4 + MySQL2 for the API layer, JWT for stateless auth, and bcrypt for password hashing.

## Getting Started

### Prerequisites

- Node.js 18+ (needed by Vite 7 and React 19).
- npm (ships with Node).
- XAMPP MySQL (or any MySQL 8+ instance).

### Install dependencies

```bash
npm install
```

### Configure the API

1. Copy the sample environment file and fill in your settings:
   ```bash
   cp server/.env.example server/.env
   ```
2. Start MySQL (e.g., via XAMPP) and create the database/tables:
   ```sql
   -- From MySQL CLI or phpMyAdmin
   SOURCE server/schema.sql;
   ```
   The defaults assume `root` with no password on `localhost:3306`; update `server/.env` if yours differ.
3. (Optional) Change `CLIENT_ORIGIN` in `server/.env` if your frontend dev server is not `http://localhost:5173`.

### Run the app

Terminal 1 (API):
```bash
npm run server    # starts Express on PORT from server/.env (default 4000)
```

Terminal 2 (frontend):
```bash
npm run dev       # starts Vite on 5173
```

Open the printed URLs to develop against both services.

If your API runs on a different host/port, create `./.env` (frontend) with:
```
VITE_API_URL=http://localhost:4000/api
```

### Production Build

```bash
npm run build   # bundles assets into dist/
npm run preview # serves the production build locally
```

### API surface (for Postman)
- `POST /api/auth/register` `{ name, email, password }` → `{ token, user }`
- `POST /api/auth/login` `{ email, password }` → `{ token, user }`
- `GET /api/auth/me` (Bearer token)
- `GET /api/account/me` (Bearer token) → `{ user, orders, addresses }`
- `GET /api/catalog/hero-banners`
- `GET /api/catalog/categories`
- `GET /api/catalog/brands`
- `GET /api/catalog/flash-deals`
- `GET /api/catalog/recommendations`
- `GET /api/catalog/notification`
- `GET /api/products`
- `GET /api/products/category/:categoryId`
- `GET /api/products/:productId`
- `POST /api/orders/checkout` (Bearer token) `{ items:[{productId,quantity}], shipping:{recipient,line1,city,phone,label?,addressId?} }`
- `GET /api/wishlist` (Bearer token)
- `POST /api/wishlist` (Bearer token) `{ productId }`
- `DELETE /api/wishlist/:productId` (Bearer token)

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

server/
  index.js           # Express bootstrap and route registration
  config/            # Env loader and MySQL pool
  routes/            # Route modules (auth, account, catalog, products)
  middleware/        # Auth helpers (JWT verification)
  schema.sql         # Database bootstrap (users, products, content, orders, addresses)
  .env.example       # Sample server configuration
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
