# Front-End Networking (Overview)

This document summarizes the networking concepts, trade-offs, and best practices that front-end engineers should know when designing scalable, secure, and fast web applications. It focuses on the HTTP/web ecosystem, delivery optimizations, real-time options, security considerations, and observability.

## Quick contract
- Inputs: browser HTTP(S) requests initiated by users or client apps.
- Outputs: fast, correct responses and predictable real-time behavior; measurable observability (logs/metrics/traces).
- Error modes: network latency, partial failures (e.g. upstream), connection resets, misconfigured CORS, TLS errors.

## High-level concepts

- Transport vs Application: The transport layer (TCP/UDP/QUIC) handles packet delivery; the application layer (HTTP, WebSocket) defines request/response semantics.
- Latency vs Throughput: Low latency improves perceived responsiveness; throughput matters for bulk transfers (assets, video).
- CDN/Edge: Push content close to the user for lower latency and lower origin load.

## DNS and connection setup

- DNS resolves hostnames to IP addresses. DNS lookups add latency (use caching, low TTLs only when needed).
- Typical request setup: DNS lookup -> TCP handshake -> TLS handshake -> (HTTP request)
- Optimization: connection reuse (HTTP Keep-Alive / persistent connections), use of HTTP/2 or HTTP/3 to reduce handshake or multiplex requests.

## TLS / HTTPS

- Always serve production traffic over HTTPS.
- TLS handshake adds RTTs — TLS session resumption and TLS 1.3 (fewer RTTs) mitigate this.
- Certificates: use automated cert management (Let’s Encrypt or managed TLS in cloud/CDN). Protect private keys.

## HTTP basics and headers front-end engineers must know

- Methods: GET, POST, PUT, DELETE, PATCH — choose meaningfully.
- Status codes: 2xx (success), 3xx (redirects), 4xx (client errors), 5xx (server errors). Use appropriate codes.
- Important headers:
	- Cache-Control, Expires, ETag, Last-Modified — control caching.
	- Content-Type, Content-Encoding — content format & compression.
	- Set-Cookie, Cookie — state and session (careful with security flags).
	- CORS headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials.

## CORS (Cross-Origin Resource Sharing)

- Browsers enforce same-origin policy. Use CORS response headers on the server to allow cross-origin requests.
- When credentials (cookies/Authorization header) are used, set Access-Control-Allow-Credentials: true and avoid wildcard origins.
- Preflight (OPTIONS) requests occur for non-simple requests and add latency — minimize by using simple requests or caching the preflight response (Access-Control-Max-Age).

# Front-End Networking (Overview)

This document summarizes the networking concepts, trade-offs, and best practices that front-end engineers should know when designing scalable, secure, and fast web applications. It focuses on the HTTP/web ecosystem, delivery optimizations, real-time options, security considerations, and observability.

## Quick contract

- Inputs: browser HTTP(S) requests initiated by users or client apps.
- Outputs: fast, correct responses and predictable real-time behavior; measurable observability (logs/metrics/traces).
- Error modes: network latency, partial failures (e.g. upstream), connection resets, misconfigured CORS, TLS errors.

## High-level concepts

- Transport vs Application: The transport layer (TCP/UDP/QUIC) handles packet delivery; the application layer (HTTP, WebSocket) defines request/response semantics.
- Latency vs Throughput: Low latency improves perceived responsiveness; throughput matters for bulk transfers (assets, video).
- CDN/Edge: Push content close to the user for lower latency and lower origin load.

## DNS and connection setup

- DNS resolves hostnames to IP addresses. DNS lookups add latency (use caching, low TTLs only when needed).
- Typical request setup: DNS lookup -> TCP handshake -> TLS handshake -> (HTTP request)
- Optimization: connection reuse (HTTP Keep-Alive / persistent connections), use of HTTP/2 or HTTP/3 to reduce handshake or multiplex requests.

## TLS / HTTPS

- Always serve production traffic over HTTPS.
- TLS handshake adds RTTs — TLS session resumption and TLS 1.3 (fewer RTTs) mitigate this.
- Certificates: use automated cert management (Let’s Encrypt or managed TLS in cloud/CDN). Protect private keys.

## HTTP basics and headers front-end engineers must know

- Methods: GET, POST, PUT, DELETE, PATCH — choose meaningfully.
- Status codes: 2xx (success), 3xx (redirects), 4xx (client errors), 5xx (server errors). Use appropriate codes.
- Important headers:
  - Cache-Control, Expires, ETag, Last-Modified — control caching.
  - Content-Type, Content-Encoding — content format & compression.
  - Set-Cookie, Cookie — state and session (careful with security flags).
  - CORS headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials.

## CORS (Cross-Origin Resource Sharing)

- Browsers enforce same-origin policy. Use CORS response headers on the server to allow cross-origin requests.
- When credentials (cookies/Authorization header) are used, set Access-Control-Allow-Credentials: true and avoid wildcard origins.
- Preflight (OPTIONS) requests occur for non-simple requests and add latency — minimize by using simple requests or caching the preflight response (Access-Control-Max-Age).

## Cookies, localStorage, and auth

- Use HttpOnly, Secure and SameSite flags on cookies to mitigate XSS/CSRF.
- Prefer access tokens in Authorization headers for APIs, and refresh tokens stored securely (Prefer secure HTTP-only storage for refresh tokens).
- Use short-lived access tokens and rotate/refresh them.

## Caching strategies

- Browser caching (Cache-Control, ETag/If-None-Match): reduces repeated downloads.
- CDN caching: cache static assets and cacheable API responses at edge.
- Stale-while-revalidate and stale-if-error trade freshness for availability.
- Cache busting: include content hashes in filenames for static assets (e.g., app.abc123.js).

Practical example (Cache-Control):

```bash
# static assets served with far-future expiry and content-hash in filename
Cache-Control: public, max-age=31536000, immutable

# API JSON response that may be revalidated
Cache-Control: public, max-age=60, stale-while-revalidate=300
```

## Compression and payload size

- Use gzip, Brotli or zstd where supported to reduce payload size. Brotli usually yields better compression for text assets.
- Minify and tree-shake JS/CSS. Serve only the code needed (code-splitting, dynamic imports).

## HTTP/2 and HTTP/3

- HTTP/2: single TCP connection, multiplexed streams, header compression (HPACK), server push (rarely used now).
- HTTP/3 (over QUIC/UDP): less head-of-line blocking, faster connection establishment (especially on lossy networks).
- Prefer HTTP/2 or HTTP/3 where possible — CDNs and modern browsers support both.

## Persistent connections and multiplexing

- Keep-Alive avoids repeated TCP/TLS handshakes.
- HTTP/2 and HTTP/3 allow many concurrent requests over one connection, reducing connection churn.

## Resource loading and performance

- Critical Rendering Path: prioritize CSS and critical JS. Defer non-critical scripts and use async/defer attributes.
- Resource hints: preconnect, dns-prefetch, preload, prefetch to prepare the browser for upcoming requests.
- Image optimizations: responsive images (srcset), AVIF/WebP formats, lazy-loading, proper width/height attributes.
- Bundling vs HTTP/2: with HTTP/2 smaller files are OK; still prefer logical bundling and caching.

Example resource hints:

```html
<link rel="preconnect" href="https://api.example.com">
<link rel="preload" href="/static/main.abc123.css" as="style">
```

## Real-time & long-lived connections

- WebSockets: full-duplex communication suitable for interactive apps (chat, collaborative editors). Works over ws/wss.
- Server-Sent Events (SSE): unidirectional streaming from server to client; simpler than WebSockets for event streams.
- Long polling: fallback when persistent connections not available; less efficient.

Design notes:

- Use WebSockets when clients must send frequent updates.
- Use SSE for broadcast/stream scenarios (live feeds) where client mainly receives updates.

## Proxies, load balancers and CDNs

- Load balancers distribute incoming requests to backend instances (supports health checks, sticky sessions, TLS termination).
- Reverse proxies (NGINX, Envoy) can handle caching, compression, rate-limiting, and authentication.
- CDNs cache static content at the edge; many offer dynamic content acceleration and TLS termination.

## Rate limiting, retries, and backoff

- Apply rate limiting at the edge or API gateway to protect origin services.
- Implement idempotency for retries (POSTs should be idempotent when retried or use idempotency keys).
- Use exponential backoff with jitter for client retries to avoid synchronized retry storms.

Example retry policy (pseudocode):

```text
retryDelay = base * 2^attempt + randomJitter()
maxAttempts = 5
```

## Observability: logging, metrics, and tracing

- Client-side: capture performance metrics (TTFB, FCP, LCP), error logs, and network failure events. Use RUM (Real User Monitoring).
- Server/edge: collect request metrics, response times, error rates. Correlate with distributed traces (trace IDs propagated in headers).
- Useful headers to propagate: X-Request-ID, traceparent (W3C Trace Context).

## Security considerations

- Use Content Security Policy (CSP) to mitigate XSS.
- Protect against CSRF: SameSite cookies, anti-CSRF tokens for state-changing endpoints.
- Avoid exposing sensitive data in URLs, use POST or Authorization headers instead.
- Validate and sanitize inputs at the server — never trust client data.

## Common failure modes and troubleshooting

- DNS misconfiguration: domain doesn't resolve or TTL too high after changes.
- Mixed content: loading HTTP resources from HTTPS pages blocks or warns.
- CORS errors: misconfigured allowed origin or credentials settings.
- TLS issues: expired certificates, hostname mismatch.

Quick troubleshooting commands:

```bash
# DNS lookup
dig +short example.com

# Check TLS cert
openssl s_client -connect example.com:443 -servername example.com

# Simple request and headers
curl -v https://example.com/api/endpoint
```

## Best practices checklist

- Serve everything over HTTPS.
- Use CDN for static assets and for caching where appropriate.
- Add content-hash to static filenames for long cache lifetimes.
- Use HTTP/2/3 and connection reuse; minimize new TCP/TLS handshakes.
- Minimize critical payloads and prioritize critical resources.
- Implement robust retry/backoff and idempotency keys.
- Enforce CSP, secure cookies, and proper CORS policies.
- Collect RUM and server-side metrics and traces; establish SLIs/SLOs.

## Further reading and references

- MDN Web Docs: HTTP, CORS, caching, and security guides.
- Google Web Fundamentals: performance, resource loading, and critical rendering path.
- W3C: HTTP/2, HTTP/3, and Trace Context specs.
- Cloud/CDN docs (Cloudflare, Fastly, Akamai) for provider-specific features.

## Next steps (for this repo)

- Add diagram assets showing request setup (DNS -> TCP/TLS -> HTTP) and an example of CDN + origin flow.
- Add small examples demonstrating setting appropriate cache headers from a typical Node/Express server and configuring CORS.

---

If you'd like, I can also:

- add diagram images into this folder and reference them, or
- create small runnable examples (Node + Express) for cache/CORS configuration and a simple WebSocket server — tell me which you'd prefer and I'll implement it.

