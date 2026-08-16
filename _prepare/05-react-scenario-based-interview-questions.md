# React Interview Questions — Scenario-Based

Real-world "how would you fix/handle this" prompts, common for 4–10+ years of experience.

### 1. An API is called on every keystroke in a search box
Use debouncing (via `setTimeout` or a library), trigger the call inside `useEffect`, and cancel the previous in-flight request with `AbortController`.

### 2. A component re-renders even though its props haven't changed
Wrap the component in `React.memo`; stabilize function props with `useCallback` and derived values with `useMemo` so referential identity doesn't change on every render.

### 3. The same API is called independently by multiple components
Lift the state up to a common parent, share it via Context/Redux/Zustand, or cache the request with React Query / SWR so it's fetched once and reused.

### 4. A user navigates quickly and stale API responses arrive out of order
Cancel the previous request with `AbortController` inside the `useEffect` cleanup function to avoid race conditions and memory leaks.

### 5. A large list (5,000+ items) causes UI lag
Use list virtualization (`react-window` / `react-virtualized`), memoize row components, and avoid inline function/object creation inside the render path.

### 6. You suspect a memory leak in a React app
Walk through diagnosing it: uncleared timers/intervals, dangling event listeners, unresolved subscriptions, and missing `useEffect` cleanup functions.

### 7. A complex dashboard lags when users apply filters
Profile with React DevTools/Performance tab first, then address the bottleneck — likely unnecessary re-renders, expensive recalculations, or unmemoized derived data.

### 8. Implement dynamic theming (light/dark mode) without performance issues
Discuss CSS variables vs Context-driven re-renders, and how to avoid re-rendering the whole tree on theme toggle.

### 9. A production build shipped a UI-breaking bug
Describe your incident response: rollback/hotfix strategy, root-causing via error boundaries/monitoring, and prevention (canary releases, better test coverage).

### 10. Reduce a React app's initial page load time by ~40%
Code splitting, lazy loading routes/components, image optimization, tree shaking, deferring non-critical JS, and reducing bundle size.

### 11. Ensure consistent rendering and layout across browsers and devices
Cover CSS resets/normalize, feature detection vs browser sniffing, responsive design, and graceful degradation.

### 12. Structure and optimize a large-scale React codebase
Discuss folder/module boundaries, colocation, shared component libraries, and enforcing consistency across teams.
