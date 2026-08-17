# React Interview Questions — Scenario-Based — With Answers

Real-world "how would you fix/handle this" prompts, common for 4–10+ years of experience.

### 1. An API is called on every keystroke in a search box
**Answer:** Debounce the input so the API only fires after the user pauses typing, and cancel any in-flight request when a new one starts to avoid race conditions.
```jsx
function useSearch(query) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (!query) return setResults([]);
    const controller = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search?q=${query}`, { signal: controller.signal })
        .then(r => r.json()).then(setResults)
        .catch(err => { if (err.name !== 'AbortError') console.error(err); });
    }, 300);
    return () => { clearTimeout(t); controller.abort(); };
  }, [query]);
  return results;
}
```

### 2. A component re-renders even when its props don't change
**Answer:** Wrap it in `React.memo`, which does a shallow prop comparison. If it's *still* re-rendering, the cause is usually an unstable reference being passed down — wrap callback props in `useCallback` and object/array props in `useMemo` in the parent, since new literals are created every render otherwise and fail the shallow-equality check.

### 3. The same API is called independently by multiple components
**Answer:** Three options, in order of typical preference: (a) use a data-fetching library like React Query/SWR, which dedupes and caches requests by key automatically; (b) lift the fetch/state to a common parent and pass data down; (c) share it via Context if many distant components need it without prop drilling.

### 4. A user navigates quickly and old API responses should not overwrite new state
**Answer:** Cancel the previous request in the `useEffect` cleanup function using `AbortController`, so a stale response's `.then` never fires (or is ignored via the abort error), preventing the race condition.

### 5. A large list (5,000+ items) causes UI lag
**Answer:** Render only the visible rows with list virtualization (`react-window`), memoize each row component with `React.memo`, avoid creating new inline functions/objects per row in the parent's render, and paginate or filter server-side if the full dataset isn't actually needed client-side.

### 6. You suspect a memory leak in a React app
**Answer:** Check for: `setInterval`/`setTimeout` not cleared in `useEffect` cleanup, event listeners added but never removed, subscriptions (WebSocket, observable) not unsubscribed on unmount, and closures in long-lived callbacks holding references to large/stale state. Use the browser's Memory tab to take heap snapshots before/after mount-unmount cycles and compare retained objects.

### 7. A complex dashboard lags when users apply filters
**Answer:** Profile first with the React DevTools Profiler to find what's actually re-rendering and how long it takes. Common fixes: memoize expensive filter/aggregation computations with `useMemo`, debounce filter inputs, virtualize any resulting large lists/tables, and use `useTransition` to keep filter controls responsive while the heavier re-render happens in the background.

### 8. Implement dynamic theming (light/dark) without performance issues
**Answer:** Prefer CSS custom properties (variables) toggled via a `data-theme` attribute or class on `<html>`/`<body>`, so the browser handles the visual update via CSS alone — no React re-render of the whole tree needed. If theme must live in React state/Context for component logic, keep the Context value minimal (just the theme name) so consumers re-render cheaply, and avoid putting theme in a Context that also holds frequently-changing unrelated data.

### 9. A production build shipped a UI-breaking bug
**Answer:** Immediate response: roll back to the last known-good deployment or use a feature flag to disable the broken path, then root-cause via error monitoring (Sentry/similar) and the specific error boundary that caught it (or didn't). Prevention: canary/staged rollouts, better E2E coverage on critical flows, and stricter CI checks (type-checking, visual regression) before merge.

### 10. Reduce a React app's initial page load time by ~40%
**Answer:** Concrete levers: route-based code splitting, lazy-load below-the-fold components, defer/async non-critical third-party scripts, compress and lazy-load images (WebP/AVIF + `loading="lazy"`), enable HTTP caching and a CDN for static assets, switch to SSR/SSG for faster first paint, and audit the bundle for large unused dependencies via `webpack-bundle-analyzer`.

### 11. Ensure consistent rendering and layout across browsers and devices
**Answer:** Use a CSS reset/normalize, prefer flexbox/grid over legacy float layouts, test against actual target browsers (not just guess), use vendor-prefixed properties via Autoprefixer, apply responsive units (`rem`, `%`, viewport units) with defined breakpoints, and feature-detect (not browser-sniff) before using newer APIs, with graceful fallbacks.

### 12. Structure and optimize a large-scale React codebase
**Answer:** Organize by feature/domain instead of by file type, keep a shared UI component library with a single source of design tokens, centralize API/data-fetching logic (e.g. one React Query setup) instead of ad hoc fetches per component, enforce boundaries with linting (e.g. restricting cross-feature imports), and keep components small and composable rather than monolithic "god components."
