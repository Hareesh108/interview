# React Interview Questions — Advanced — With Answers

## React Internals

**1. React Fiber**
Fiber is React's reconciliation engine (since React 16), rewriting the old synchronous, recursive "stack reconciler" as an incremental, interruptible unit-of-work model. Each "fiber" is a JS object representing a unit of work for a component, forming a linked-list-like tree that React can pause, resume, abort, or reprioritize — enabling concurrent features like time-slicing and `useTransition`.

**2. Render phase vs commit phase**
The **render phase** builds the new tree and computes what changed (calling components, running hooks) — it's interruptible and may be thrown away/redone (so it must be pure, no side effects). The **commit phase** applies those changes to the real DOM synchronously, then runs side effects (`useLayoutEffect` synchronously, `useEffect` asynchronously after paint) — it cannot be interrupted.

**3. Reconciliation & keys**
React compares the new element tree to the previous one level-by-level: same type at the same position → update in place; different type → tear down and rebuild the subtree. For children arrays, `key` lets React match elements across renders by identity rather than position, so reordering/inserting doesn't wrongly reuse or discard state.

**4. Work scheduling/prioritization**
Fiber assigns priority levels to updates (e.g. user input is high priority, data-driven background updates are low priority via `useTransition`). The scheduler can pause low-priority render work to handle a high-priority update first, then resume, keeping the UI responsive under load.

**5. Concurrent rendering / `useTransition` & `useDeferredValue`**
Concurrent rendering lets React prepare multiple versions of the UI and interrupt in-progress rendering for more urgent updates instead of blocking the main thread until a render finishes. Real use case: typing in a filter input stays instantly responsive while a large filtered list re-render is marked with `useTransition` and rendered without blocking keystrokes.
```jsx
const [isPending, startTransition] = useTransition();
function handleChange(e) {
  setQuery(e.target.value); // urgent
  startTransition(() => setFilteredList(filterBigList(e.target.value))); // non-urgent
}
```

## React 18/19 Features

**6. Automatic batching**
React 18+ batches multiple `setState` calls into a single re-render even inside promises, timeouts, and native event handlers (previously batching only happened inside React event handlers) — reducing unnecessary intermediate renders.

**7. Suspense & streaming SSR**
`<Suspense fallback={...}>` shows a fallback while lazy-loaded components or async data "suspend." React 18's streaming SSR can send HTML in chunks as each Suspense boundary resolves, so the browser can start displaying/hydrating parts of the page before the entire server render finishes.

**8. Server vs Client Components**
Server Components render on the server only, ship no JS to the client, and can directly access backend resources (DB, filesystem) — but can't use state, effects, or browser APIs. Client Components (`"use client"`) run in the browser, support interactivity/hooks, and are the default in plain React (this model is primarily used via frameworks like Next.js's App Router).

**9. `use()` hook (React 19)**
`use(promise)` lets a component read a Promise's value directly during render, suspending the component until it resolves (must be used with a Suspense boundary) — simplifying async data fetching compared to manual `useEffect` + state juggling. It can also read Context conditionally, unlike `useContext`.

**10. Form actions (React 19)**
`<form action={serverOrClientFunction}>` lets forms submit directly to an async action function; `useActionState`/`useFormStatus` manage pending/result state without manually wiring `useState` + `onSubmit` + `preventDefault`, and integrate with progressive enhancement (works before JS hydrates, in frameworks that support it).

**11. Hydration mismatches**
Hydration attaches event listeners/state to server-rendered HTML on the client, assuming the client render produces identical markup. Mismatches happen when the server and client render different output (e.g. using `Date.now()`, `window`-dependent logic, or locale differences directly in render) — React warns and falls back to client-rendering that subtree, hurting performance and sometimes causing a visible flash.

## Architecture at Scale

**12. Frontend architecture for 1M+ daily users**
Discuss: CDN-served static assets, code splitting per route, aggressive caching (HTTP cache headers + client-side query caching), SSR/SSG for fast first paint and SEO, horizontally scalable/stateless API layer behind a load balancer, real-time data via WebSockets with a pub/sub backend, monitoring/observability (RUM, error tracking), and graceful degradation under load.

**13. Structuring a large-scale codebase**
Organize by feature/domain rather than by file type (co-locate a feature's components, hooks, tests, styles), enforce clear module boundaries with a shared design-system/component library, centralize cross-cutting concerns (auth, API client, error handling), and use linting/type-checking to keep contracts explicit.

**14. Component library for reuse**
Design components to be unstyled-by-default or theme-driven (design tokens), keep APIs minimal and composable (compound components over giant prop lists), version and publish independently (e.g. via a monorepo with Changesets), and document with something like Storybook plus visual regression tests.

**15. Global state at scale**
Local component state for UI-only concerns; Context for simple, low-frequency-update shared state (theme, auth user); Redux Toolkit/Zustand for complex, frequently-updated, cross-cutting app state with predictable update patterns and dev-tooling; React Query/SWR specifically for *server* state (caching, revalidation, background refetch) rather than reinventing that in a general store.

**16. Managing derived state**
Prefer computing derived values during render (optionally memoized with `useMemo`) rather than storing them in separate state and syncing with effects — syncing derived state via `useEffect` is a common source of bugs and extra re-renders.

**17. Caching, retries, error boundaries system**
Wrap data fetching in a layer (or use React Query/SWR) that caches by key, dedupes in-flight requests, retries with backoff on failure, and exposes loading/error states; pair with an `ErrorBoundary` per major UI region so one section's failure doesn't crash the whole app, plus a global fallback boundary at the root.

**18. Migrating legacy JS to TypeScript**
Enable `allowJs` + `checkJs` incrementally, convert leaf/utility files first (fewer dependents), use `any`/`unknown` as an escape hatch initially with a plan to tighten later, add types to shared/critical modules first, and enforce `strict` mode only once the bulk of the codebase is converted.

**19. Gradual class → functional migration**
Both component types can coexist and be nested freely, so migrate incrementally: convert leaf components first, extract shared logic into custom hooks that both old classes (via wrapper components) and new functional components can eventually use, and prioritize components under active development.

**20. Micro-frontends & Module Federation**
Micro-frontends split a large app into independently built/deployed pieces owned by different teams, composed at runtime or build time. Webpack's Module Federation lets one deployed app dynamically load code from another at runtime without a shared build step. "Application federation" typically means composing whole independently-deployed apps/shells; "component federation" means sharing individual components/libraries across apps via Module Federation — the latter is more granular and requires tighter version/contract coordination.

## Performance at Scale

**21. Rendering 10,000+ rows efficiently**
Virtualize (render only visible rows via `react-window`/`react-virtualized`), memoize row components, avoid inline object/function props that break memoization, and consider windowed pagination or server-side filtering/sorting so the full dataset never needs to be in the DOM.

**22. Virtualized list from scratch**
Core idea: track scroll position, compute which item indices fall in the visible viewport (+ a small buffer), render only those as absolutely-positioned elements inside a container sized to the *total* list height (via `itemHeight * itemCount`) so the scrollbar behaves correctly.
```jsx
function VirtualList({ items, itemHeight, height }) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight) + 1;
  const endIndex = Math.min(items.length, startIndex + visibleCount);
  return (
    <div style={{ height, overflowY: 'auto' }} onScroll={e => setScrollTop(e.target.scrollTop)}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {items.slice(startIndex, endIndex).map((item, i) => (
          <div key={startIndex + i} style={{
            position: 'absolute', top: (startIndex + i) * itemHeight, height: itemHeight,
          }}>{item}</div>
        ))}
      </div>
    </div>
  );
}
```

**23. Code splitting & bundle size**
Split by route (`React.lazy` + dynamic `import()`), split heavy third-party libraries into separate chunks loaded on demand, analyze the bundle (`webpack-bundle-analyzer`) to find outsized dependencies, tree-shake unused code, and prefer smaller alternatives for rarely-needed heavy libraries.

**24. Web Vitals**
**LCP** (Largest Contentful Paint) — time to render the largest visible element; improve via faster server response, preloading critical resources, optimizing images. **CLS** (Cumulative Layout Shift) — unexpected layout movement; caused by images/ads without reserved dimensions, web fonts causing FOIT/FOUT, or content injected above existing content; fix by reserving space (width/height or `aspect-ratio`) and using `font-display` carefully. **INP** (Interaction to Next Paint, replaced FID) — responsiveness of interactions; improve by breaking up long JS tasks, deferring non-critical work, and reducing main-thread blocking.

**25. Performance profiling**
Use the browser's Performance tab and React DevTools Profiler to identify actual bottlenecks (long tasks, excessive re-renders) *before* optimizing — premature optimization without measurement often targets the wrong code.

**26. Optimistic UI**
Update the UI immediately assuming a mutation will succeed (e.g. show a new comment right away), then reconcile with the server response — roll back and show an error if the request actually fails. Improves perceived responsiveness for actions that usually succeed.

## Accessibility & Quality at Scale

**27. Accessible data table with sorting/pagination**
Use semantic `<table>` markup with `<th scope="col">`, make sortable headers actual buttons with `aria-sort` reflecting current state, ensure full keyboard operability (sorting, pagination controls reachable/operable via Tab+Enter), and announce page/sort changes to screen readers via an `aria-live` region.

**28. WCAG compliance**
Semantic HTML first, sufficient color contrast, full keyboard navigability with visible focus states, meaningful `alt` text and ARIA only where semantic HTML isn't enough, and testing with screen readers plus automated tools (axe, Lighthouse) as a baseline — not a substitute for manual testing.

**29. i18n/l10n in a large app**
Externalize all user-facing strings into locale resource files (e.g. via `react-intl`/`i18next`), handle pluralization/date/number formatting via the `Intl` API rather than manual logic, support RTL layouts with logical CSS properties, and load locale bundles lazily per-locale rather than shipping all languages.

**30. Testing strategy**
Unit tests for pure logic/utilities and hooks (Jest), integration tests for components interacting together and user flows within a page (React Testing Library, favoring behavior over implementation detail), and E2E tests (Playwright/Cypress) for critical cross-page user journeys — following a testing pyramid so most tests are fast unit/integration tests, with fewer, slower E2E tests.
