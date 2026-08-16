# React Interview Questions — Intermediate

## Patterns & Composition
1. Higher-Order Component (HOC) vs custom hook — when to use which
2. Render props pattern — implementation and when it's still useful
3. Building and using custom hooks (e.g. `useDebounce`, `usePrevious`) to abstract logic
4. `forwardRef` and portals — rendering outside the parent DOM hierarchy
5. Sharing state between unrelated components without Redux (Context API)
6. Prop drilling vs Context API

## Hooks in Depth
7. `useMemo` vs `useCallback` — what each memoizes and why it matters
8. `useTransition` vs `useDeferredValue`
9. `useState` vs `useRef` — when state changes should/shouldn't trigger a re-render
10. Common `useEffect` mistakes and cleanup patterns
11. What happens when you update state inside `useEffect`?

## Performance & Correctness
12. Preventing unnecessary re-renders in a component (`React.memo`, stable references)
13. Diagnosing and fixing an infinite re-render loop caused by `useEffect`
14. Reconciliation — how React updates the DOM efficiently, and how keys affect it
15. Testing a component that uses `useEffect` with React Testing Library
16. Implementing lazy loading without breaking SEO

## Common Build Tasks
17. Search filter with debouncing
18. Pagination component (internal logic, edge cases, loading states)
19. Error Boundary component
20. Generate a dynamic form from a JSON schema
21. Todo app with add/edit/delete, optimized to avoid unnecessary re-renders
22. Detect a click outside a given element
23. Modal built from scratch (focus trap, ESC to close)
