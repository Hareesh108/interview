# Frontend System Design (HLD) Questions

## How to Approach Any Frontend System Design Round
Typical areas interviewers probe, regardless of the specific product:
- API layer design and request/response contracts
- Rendering strategy (CSR / SSR / SSG / hybrid) and why, per page/use case
- Real-time data delivery (polling vs WebSockets vs Server-Sent Events) and the trade-offs
- Performance: virtualization, caching, pagination, code splitting, lazy loading, minimizing re-renders
- State management approach at scale
- Scalability & reliability for large numbers of concurrent users and fast-changing data

## Common System Prompts
1. **Real-time chat application** (like WhatsApp/Slack/Discord) — WebSockets, message queues,
   delivery receipts, presence, end-to-end encryption
2. **Real-time stock/trading dashboard** — WebSockets vs polling vs SSE for continuously
   changing prices, and rendering strategy per page
3. **Video streaming / on-demand platform** (Netflix/YouTube-style) — CDN, adaptive bitrate
   streaming, caching, storage
4. **News feed / social timeline** (Instagram/Twitter-style) — fan-out (push vs pull),
   timeline generation, ranking, sharding
5. **E-commerce storefront** — cart, inventory locking, search, recommendations, payment flow
6. **Ride-hailing / live location app** — real-time GPS updates, map rendering
7. **Food delivery tracking** — real-time order tracking, order state machine, ETA display
8. **File storage / sync client** (Drive/Dropbox-style) — chunked uploads, conflict resolution,
   metadata sync UI
9. **Notification system (client side)** — fan-out to UI, read/unread state, rate limiting display
10. **Booking system** (BookMyShow/Airbnb-style) — seat/slot locking UX, handling concurrent booking attempts
11. **Calendar application** (Google Calendar-style) — event rendering, recurring events, drag-to-reschedule
12. **Delivery/logistics tracking system** — end-to-end frontend architecture
13. **Design a frontend architecture for a high-traffic application** — 1M+ daily users,
    continuously changing data, responsive UI under load

## Deep-Dive Topics to Prepare
- Virtualization for large lists
- Efficient global state management (Context vs Redux Toolkit vs Zustand)
- Caching strategy (client + server, stale-while-revalidate)
- Pagination vs infinite scroll trade-offs
- Code splitting and lazy loading
- Debouncing/throttling for high-frequency events
- Optimistic UI updates
- Error boundaries and graceful degradation
- Accessibility and cross-device consistency
