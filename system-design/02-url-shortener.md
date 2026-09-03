# URL Shortener System Design

## Overview

A URL shortener converts a long URL into a short, shareable link and redirects users to the original URL. Common examples include Bitly and TinyURL.

## Goals

- Create a unique short URL quickly.
- Redirect requests with low latency.
- Support high read traffic and large numbers of URLs.
- Optionally track clicks, referrers, devices, and locations.

## Functional Requirements

1. Accept a long URL and return a short URL.
2. Redirect a short URL to its original URL.
3. Optionally allow custom aliases and expiration times.
4. Provide click analytics for the link owner.

## Non-Functional Requirements

- Redirects should be highly available and fast.
- Short codes must be unique and difficult to guess when privacy matters.
- The system should be horizontally scalable.
- Analytics must not slow down redirects.

## High-Level Architecture

**Components:**

1. **Client:** Sends a long URL and opens the generated short URL.
2. **API Service:** Validates URLs, creates short codes, and serves redirect requests.
3. **Cache Layer (Redis):** Stores frequently accessed short-code mappings.
4. **Database:** Persists short-code mappings, ownership, and expiration data.
5. **Analytics Queue:** Receives click events asynchronously.
6. **Analytics Workers:** Process events and store aggregated statistics.

## Flow Diagram

```
Create:
[Client] --> [API Service] --> [ID Generator] --> [Database]
                                      |
                                      +--> [Redis Cache]

Redirect:
[Browser] --> [API Service] --> [Redis]
                    |              |
                    | cache miss   +--> original URL
                    v
                [Database] --> [Redis]
                    |
                    +--> [Analytics Queue] --> [Workers]
```

## URL Creation Flow

1. The client sends the long URL to `POST /urls`.
2. The API validates the URL and checks authorization if required.
3. An ID generator creates a unique numeric ID.
4. The ID is encoded using Base62 characters (`a-z`, `A-Z`, `0-9`) to produce a short code.
5. The mapping is stored in the database and cache.
6. The API returns the short URL.

### Example

```text
Numeric ID: 125789
Base62 code: b8K2
Short URL: https://sho.rt/b8K2
```

## Redirect Flow

1. The browser requests `GET /b8K2`.
2. The API checks Redis for `b8K2`.
3. On a cache hit, it immediately returns an HTTP `301` or `302` redirect.
4. On a cache miss, it reads the database, populates Redis, and redirects the browser.
5. A click event is published asynchronously so the redirect remains fast.

Use `301` when the destination is permanent and `302` when links can change or analytics require every request to reach the service.

## Database Schema

### `urls`

| Column        | Type         | Description                         |
| ------------- | ------------ | ----------------------------------- |
| `id`          | BIGINT       | Unique generated identifier         |
| `short_code`  | VARCHAR(12)  | Base62 or custom alias              |
| `long_url`    | TEXT         | Original destination URL             |
| `user_id`     | BIGINT       | Link owner, nullable for anonymous  |
| `created_at`  | TIMESTAMP    | Creation time                        |
| `expires_at`  | TIMESTAMP    | Optional expiration time             |
| `is_active`   | BOOLEAN      | Whether the link can be redirected  |

Create a unique index on `short_code`.

## API Endpoints

| Method | Endpoint       | Description                         |
| ------ | -------------- | ----------------------------------- |
| `POST` | `/urls`         | Create a shortened URL               |
| `GET`  | `/:shortCode`   | Redirect to the original URL         |
| `GET`  | `/urls/:id`     | Get link details and analytics       |
| `DELETE` | `/urls/:id`   | Disable a link                       |

### Create Request

```json
{
  "longUrl": "https://example.com/articles/system-design",
  "customAlias": "design",
  "expiresAt": "2027-01-01T00:00:00Z"
}
```

### Create Response

```json
{
  "id": 125789,
  "shortCode": "b8K2",
  "shortUrl": "https://sho.rt/b8K2"
}
```

## Short-Code Generation Options

### Hashing

Hash the long URL and use a fixed-length prefix. If two URLs produce the same prefix, resolve the collision by adding a salt or retrying with a longer prefix.

### Base62 ID

Generate a unique numeric ID and encode it with Base62. This is fast and guarantees uniqueness when the ID source is unique, but sequential IDs can make links guessable.

### Distributed ID Generator

Use a Snowflake-style generator or a database sequence to create unique IDs across multiple API instances. For privacy-sensitive links, encrypt or randomize the generated value before Base62 encoding.

## Scaling and Reliability

- Put stateless API instances behind a load balancer.
- Use Redis for hot short-code mappings with a TTL aligned to link expiration.
- Add read replicas or sharding when the URL table becomes large.
- Use a durable queue for analytics events.
- Apply rate limits per user and IP address to prevent abuse.
- Replicate the database and back up link mappings regularly.
- Use negative caching for missing or disabled short codes to reduce repeated database lookups.

## Security and Abuse Prevention

- Validate URL schemes and reject unsafe protocols such as `javascript:`.
- Scan destinations for malware and phishing where appropriate.
- Require authentication for link management and analytics.
- Do not expose sequential internal IDs when link privacy is important.
- Rate-limit creation and redirect requests.
- Support link expiration and administrative takedown.

## Bottlenecks and Tradeoffs

| Decision | Benefit | Tradeoff |
| -------- | ------- | -------- |
| Redis cache | Very fast redirects | Cache invalidation and memory cost |
| Base62 IDs | Simple and compact | Can be predictable |
| Random codes | Harder to guess | Collision checks are required |
| Async analytics | Fast redirects | Analytics may be delayed |
| `301` redirect | Better browser caching | Destination changes are harder to apply |
| `302` redirect | More control and tracking | More requests reach the service |

## Future Enhancements

- Custom domains and branded links.
- QR code generation.
- Geographic or device-based redirects.
- Link previews and scheduled activation.
- Real-time analytics dashboards.

## Summary

A scalable URL shortener uses stateless API servers, a unique short-code generator, durable database storage, Redis for fast reads, and asynchronous analytics processing. The redirect path should stay small and cache-friendly because reads are typically much more frequent than URL creation.
