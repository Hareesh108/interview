# Frontend System Design (HLD) Questions — With Answers

## How to Approach Any Frontend System Design Round

A strong answer walks through these layers explicitly, in roughly this order, rather than jumping straight to a component tree:

1. **Clarify requirements & scale** — who are the users, how many concurrent, real-time or not, read-heavy or write-heavy.
2. **API layer** — what endpoints/contracts are needed, REST vs GraphQL, pagination/versioning.
3. **Rendering strategy** — CSR / SSR / SSG / hybrid, chosen per page based on SEO and freshness needs.
4. **Real-time data** (if applicable) — polling vs WebSockets vs SSE, and the trade-off between them.
5. **State management** — what's local UI state vs shared app state vs server/cache state.
6. **Performance** — virtualization, caching, code splitting, lazy loading, minimizing re-renders.
7. **Scalability & reliability** — CDN, graceful degradation, offline/error handling, monitoring.

**Rendering strategy trade-offs:** CSR is cheapest to host and best for logged-in, non-indexed, highly interactive views (dashboards); SSR gives fresh, SEO-friendly HTML per request at the cost of server load/latency; SSG/ISR gives the fastest, cheapest delivery for content that doesn't need to be real-time-fresh. A real product usually mixes all three by route.

**Real-time trade-offs:** Polling is simplest to build and debug but wastes bandwidth/has latency proportional to interval; SSE is simple, works over plain HTTP, and is great for one-directional server→client streams (e.g. live scores) but isn't bidirectional; WebSockets give full-duplex, low-latency communication, ideal for chat or continuously two-way data, at the cost of more complex infrastructure (connection management, scaling with sticky sessions or a pub/sub backend like Redis).

## Common System Prompts

### 1. Real-time chat application (WhatsApp/Slack/Discord-style)
**Key points:** WebSocket connection per client to a gateway service; messages published through a message broker/pub-sub (e.g. Redis pub/sub or Kafka) so any connected server instance can deliver to any user regardless of which server they're connected to; optimistic UI (show the message immediately, reconcile with server ack); delivery receipts via separate lightweight events (`delivered`, `read`); typing indicators as debounced ephemeral events (not persisted); offline support via a local message queue that flushes on reconnect; end-to-end encryption means the server only relays ciphertext, keys are exchanged/stored client-side.

### 2. Real-time stock/trading dashboard
**Key points:** WebSocket (or SSE) feed for continuously changing prices rather than polling, since polling can't keep up with sub-second price changes without excessive requests; throttle UI updates (e.g. batch price ticks and re-render at most every 100–250ms) so a flood of ticks doesn't overwhelm React's render cycle; virtualize the watchlist/table if it has many rows; use SSR/SSG for the static shell (layout, historical charts) and CSR/WebSocket only for the live-updating parts; be explicit that raw per-tick re-renders of a large table would blow the frame budget, hence batching/throttling.

### 3. Video streaming / on-demand platform (Netflix/YouTube-style)
**Key points:** videos served via a CDN close to the user; adaptive bitrate streaming (HLS/DASH) so the client switches quality based on measured bandwidth, avoiding buffering; the player is a thin client that requests manifest + segment files, not the whole video at once; browse/search pages use SSR or SSG for the catalog with CSR for personalized recommendations; aggressive caching of thumbnails/metadata; prefetch the next likely segment for smooth playback.

### 4. News feed / social timeline (Instagram/Twitter-style)
**Key points:** feed generation is mostly a backend concern (fan-out-on-write vs fan-out-on-read trade-off), but the frontend needs: infinite scroll with virtualization for a long feed, optimistic updates for likes/comments, image lazy loading, and a "new posts available" banner pattern (poll or WebSocket-notify, then let the user pull to refresh rather than silently reordering content underneath them, which is jarring).

### 5. E-commerce storefront
**Key points:** product listing pages benefit from SSR/ISR for SEO and fast first paint; product detail pages similarly; cart state needs to persist across sessions (localStorage sync + server sync once logged in) and stay consistent if the same cart is open in multiple tabs (a `storage` event listener can sync tabs); checkout should validate inventory just-in-time to avoid selling out-of-stock items, and use idempotency keys on the payment submission to avoid duplicate charges on retry/double-click.

### 6. Ride-hailing / live-location app
**Key points:** live position updates over WebSockets, rendered on a map (e.g. via a mapping SDK); throttle position updates rendered to the map (e.g. every 1–2s) rather than every raw GPS tick, and interpolate movement smoothly between updates on the client rather than snapping the marker; batch/debounce re-geocoding as the user drags the pickup pin.

### 7. Food delivery tracking
**Key points:** an order state machine (`placed → confirmed → preparing → out_for_delivery → delivered`) drives which UI is shown; live location similar to ride-hailing; ETA is typically computed server-side and just displayed/countdown-refreshed client-side; push notifications (or in-app polling/WebSocket) for state transitions so the user doesn't have to keep the app open.

### 8. File storage / sync client (Drive/Dropbox-style)
**Key points:** large uploads are chunked (so a failed upload only needs to retry the failed chunk, not the whole file) with a resumable-upload protocol; conflict resolution when the same file changes in two places — typically "last write wins" with a visible conflict-copy fallback, or operational-transform/CRDT for real-time collaborative documents; the file tree UI needs virtualization for folders with many items, and optimistic UI for rename/move/delete with rollback on failure.

### 9. Notification system (client side)
**Key points:** a bell icon with unread count driven by either a WebSocket push or periodic polling; notifications list is paginated/virtualized; mark-as-read should be optimistic; consider rate-limiting how often the UI re-renders the badge if notifications arrive in a burst (batch them).

### 10. Booking system (BookMyShow/Airbnb-style)
**Key points:** the critical frontend UX problem is *seat/slot locking* — when a user selects a seat/date, the UI should reflect a temporary hold (with a visible countdown) so the same slot isn't double-booked, while the backend enforces the real lock; poll or WebSocket-subscribe to seat-map availability so other users' selections show as taken in near-real-time; handle the "hold expired" case gracefully (release selection, notify the user) rather than letting checkout fail silently.

### 11. Calendar application (Google Calendar-style)
**Key points:** rendering a month/week/day grid efficiently means computing which events fall in which visible cells without re-scanning the entire event list on every render (index events by date up front); drag-to-reschedule needs optimistic updates with rollback on failure; recurring events are expanded into individual occurrences for a given visible range only (not materialized indefinitely) to keep rendering bounded.

### 12. Delivery/logistics tracking system
**Key points:** combines the real-time location pattern (#6/#7) with a dashboard for many simultaneous deliveries — for the dispatcher view, virtualize the list of active deliveries, throttle map marker updates, and consider clustering markers when zoomed out to avoid rendering hundreds of overlapping pins at once.

### 13. Frontend architecture for a high-traffic application (1M+ daily users)
**Key points:** static assets behind a CDN; SSR/SSG for fast, cacheable first paint on public pages; a stateless, horizontally-scalable API layer behind a load balancer; client-side caching (React Query/SWR) to reduce redundant requests; code splitting so users only download what the current route needs; real-time features backed by a pub/sub layer that can fan out across multiple server instances; graceful degradation (skeleton states, retry with backoff) so transient backend issues don't crash the UI; monitoring via Real User Monitoring (RUM) and error tracking to catch regressions in production, not just in staging.

## Deep-Dive Topics to Prepare (Reference)

- **Virtualization:** render only visible list/grid items — see the Machine Coding and React-Advanced answer files for implementation.
- **State management:** local `useState` for UI-only state, Context for low-frequency shared state, Redux Toolkit/Zustand for complex cross-cutting state, React Query/SWR specifically for server-state caching.
- **Caching:** HTTP cache headers for static/API responses, CDN caching, and client-side query caching (stale-while-revalidate) to avoid redundant network calls.
- **Pagination vs infinite scroll:** pagination gives users a sense of total size and easy "jump to page"; infinite scroll is smoother for casual browsing but loses a fixed scroll position/bookmarkability unless URLs are updated per "page" loaded.
- **Code splitting/lazy loading:** split per route and per rarely-used heavy feature (e.g. a chart library only needed on one page).
- **Debouncing/throttling:** debounce for "wait until the user pauses" (search-as-you-type), throttle for "cap the rate regardless of frequency" (scroll/resize handlers, live position updates).
- **Optimistic UI:** update local state immediately assuming success, roll back and surface an error if the server rejects it.
- **Error boundaries:** scope them around independent UI regions so one section's failure doesn't take down the whole page.
- **Accessibility & cross-device consistency:** semantic HTML, keyboard operability, and responsive layouts as first-class requirements, not an afterthought.
