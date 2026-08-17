# Next.js Interview Questions — With Answers

**1. Key features / why Next.js over a plain SPA**
File-based routing, built-in SSR/SSG/ISR rendering strategies, automatic code splitting per route, image/font optimization, API routes for backend logic in the same project, and strong SEO support out of the box — a plain React SPA gives you none of this without significant manual setup (routing library, bundler config, a separate server for SSR, etc.).

**2. CSR vs SSR vs SSG vs ISR**
- **CSR** (Client-Side Rendering): HTML shell ships nearly empty, JS renders content in the browser — fast to build, weaker for SEO/first paint, good for highly interactive, non-indexed pages (dashboards behind auth).
- **SSR** (Server-Side Rendering): HTML is rendered per-request on the server — always fresh, good SEO, but adds server load and latency per request. Good for personalized or frequently-changing pages.
- **SSG** (Static Site Generation): HTML is rendered once at build time and served from a CDN — fastest and cheapest, but content only updates on rebuild. Good for marketing pages, blogs.
- **ISR** (Incremental Static Regeneration): Statically generated like SSG, but pages can be regenerated in the background after a configured interval or on-demand — combines SSG's speed with near-fresh content, good for product listings/catalogs.

**3. App Router vs Pages Router**
The **Pages Router** (`pages/`) is the original file-based router, using `getStaticProps`/`getServerSideProps` for data fetching and client components by default. The **App Router** (`app/`, current default) is built on React Server Components, supports nested layouts, streaming, and colocated data fetching directly in async Server Components via `fetch`, with more granular caching control.

**4. Server Components vs Client Components**
Server Components (default in the App Router) render on the server, ship no JS to the client, and can access backend resources directly — but can't use state/effects/browser APIs. Client Components (marked `"use client"`) run in the browser and support interactivity, hooks, and event handlers. The pattern is to keep as much as possible as Server Components and push `"use client"` down to the smallest interactive leaf components.

**5. Data fetching per strategy**
App Router: `fetch()` inside an `async` Server Component, with caching controlled via `{ cache: 'force-cache' | 'no-store' }` or `next: { revalidate: N }`. Pages Router: `getStaticProps` (SSG), `getServerSideProps` (SSR), `getStaticPaths` for dynamic SSG routes, or client-side fetching (`useEffect`/SWR) for CSR-only data.

**6. Streaming and Suspense**
Wrapping a slow part of a Server Component tree in `<Suspense fallback={...}>` lets Next.js stream that section's HTML to the browser as soon as it's ready, instead of blocking the entire page response on the slowest piece of data — improving perceived load time (users see the shell + fast content immediately).

**7. File-based routing & dynamic routes**
A file/folder under `app/` (or `pages/`) maps directly to a URL route. Dynamic segments use bracket syntax: `app/blog/[slug]/page.js` matches `/blog/my-post`; `[...slug]` catches multiple segments (catch-all); `[[...slug]]` makes the catch-all optional.

**8. API / Route Handlers**
Files like `app/api/users/route.js` exporting functions named after HTTP methods (`GET`, `POST`, etc.) become serverless/edge API endpoints colocated with the frontend code — no separate backend service needed for simple APIs.

**9. Middleware**
Code in `middleware.js` that runs before a request completes, at the edge — used for auth redirects, A/B testing, geolocation-based rewrites, or modifying request/response headers, without touching individual page logic.

**10. Image/font optimization**
`next/image` automatically serves responsive, lazily-loaded, modern-format (WebP/AVIF) images with layout-shift prevention via required width/height. `next/font` self-hosts and preloads Google/local fonts at build time, avoiding a render-blocking external font request and layout shift from FOUT/FOIT.

**11. Metadata & SEO**
The App Router's `metadata` export (or `generateMetadata` for dynamic values) sets `<title>`, meta description, Open Graph tags, etc. per route at build/request time — replacing manual `<Head>` management and ensuring crawlers/social previews get correct, server-rendered metadata.

**12. Caching and revalidation**
Next.js caches `fetch` calls, rendered route segments, and full pages by default (App Router), controllable via `revalidate` (time-based ISR) or `revalidatePath`/`revalidateTag` (on-demand revalidation after a mutation, e.g. after a CMS update via webhook).

**13. Hydration mismatches**
Occur when server-rendered HTML differs from what the client renders on first hydration pass — common causes: using `Date.now()`/`Math.random()` directly in render, browser-only APIs (`window`, `localStorage`) accessed during server render, or locale/timezone differences. Fix by moving such logic into `useEffect` (client-only) or guarding with a mounted-check, so the server and initial client render match exactly.

**14. Optimizing a Next.js e-commerce app**
ISR for product listing/detail pages (fresh-enough, still fast), `next/image` for product photos, edge caching for the storefront, SSR only for personalized pages (cart, checkout), code-split rarely-used flows (e.g. reviews modal), and use route-level loading UI (`loading.js`) + streaming so slow data (e.g. recommendations) doesn't block the whole page.
