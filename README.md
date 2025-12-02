# GoCart

GoCart is a Vite-powered React storefront that now ships with an Express + MySQL + JWT starter API. The frontend focuses on fast client-side navigation, Tailwind-driven UI polish, and consumes the real Express/MySQL API out of the box.

## Features

- Personalized home feed with rotating hero banners, flash deals that include a live countdown, curated recommendation rails, and featured brand grid.
- Category discovery page with responsive filter sidebar, price/rating/brand filters, multiple sort orders, and simple pagination.
- Product detail view with gallery, pricing callouts, feature/spec sheets, and cart integration backed by a context-based state container.
- Cart workspace with quantity editing, inline totals, empty-state onboarding, and a summarized checkout sidebar.
- Account screen that renders orders and saved addresses from the API once data is present.
- Client-side API wrapper (`src/services/api.js`) that talks to the Express/MySQL backend.
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
  data/              # (empty by default; add fixtures here if you need static data)
  hooks/             # Reusable utilities (e.g., countdown timer)
  layouts/           # Route wrappers (header/footer scaffolding)
  pages/             # Route-level screens (Home, Category, Product, Cart, Auth, Account)
  services/          # API abstraction that calls the Express backend
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

## Backend data flow

`src/services/api.js` calls the Express routes under `/api/*` (see “API surface”). All storefront content (banners, categories, products, recommendations, notification bar, account, wishlist) comes from the database tables in `server/schema.sql`.

### Seeding sample data

After creating the schema, insert some starter records so the UI has content:

```sql
-- Categories and brands
INSERT INTO categories (id, name) VALUES ('laptops', 'Laptops'), ('audio', 'Audio');
INSERT INTO brands (id, name, image_url) VALUES ('acme', 'Acme', NULL), ('sonitus', 'Sonitus', NULL);

-- Products
INSERT INTO products (id, title, description, price, old_price, rating, review_count, category_id, brand_id, image_url, inventory_status, discount, features, specs)
VALUES
('lap-1', 'Acme Ultrabook 14"', 'Featherweight performance laptop', 999.00, 1199.00, 4.7, 124, 'laptops', 'acme', 'https://picsum.photos/seed/lap1/600/400', 'In Stock', 17, JSON_ARRAY('14\" display', '512GB SSD'), JSON_OBJECT('cpu', 'i7', 'ram', '16GB')),
('aud-1', 'Sonitus Wireless Earbuds', 'ANC, wireless charging case', 149.00, 199.00, 4.5, 342, 'audio', 'sonitus', 'https://picsum.photos/seed/aud1/600/400', 'In Stock', 25, JSON_ARRAY('ANC', 'Bluetooth 5.3'), JSON_OBJECT('battery', '30h'));

-- Hero banners
INSERT INTO hero_banners (id, title, subtitle, cta, image_url, background)
VALUES ('banner-1', 'Spring Sale', 'Up to 25% off tech essentials', 'Shop now', 'https://picsum.photos/seed/banner1/1200/500', '#0EA5E9');

-- Flash deals (links to products above)
INSERT INTO flash_deals (product_id, claimed, starts_at, ends_at)
VALUES ('aud-1', 18, NOW(), DATE_ADD(NOW(), INTERVAL 2 DAY));

-- Recommendation rails
INSERT INTO recommendation_sections (id, title) VALUES ('featured', 'Featured Picks');
INSERT INTO recommendation_items (section_id, product_id, position)
VALUES ('featured', 'lap-1', 1), ('featured', 'aud-1', 2);

-- Notification bar content
INSERT INTO site_content (content_key, content_value) VALUES ('notification', 'Free shipping on orders over Rs. 5000');
```

Run the inserts from your MySQL client or via `mysql -u root gocart < seed.sql` if you save them to a file. Once seeded, the frontend will render real data from the API.

## Next Ideas

1. Wire forms (login/register/address) to a real API or Supabase/Firebase auth.
2. Persist cart state to `localStorage` or backend sessions for returning users.
3. Add Vitest or Cypress coverage for cart math, filtering, and navigation guard rails.
