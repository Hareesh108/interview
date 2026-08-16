# React Interview Questions — Advanced

## React Internals
1. React Fiber architecture — what it is and what problems it solves
2. Render phase vs commit phase
3. Reconciliation in detail — how keys affect it
4. How React prioritizes and schedules work (concurrent features)
5. What is concurrent rendering, and what's a real use case for `useTransition`/`useDeferredValue`?

## React 18/19 Features
6. Automatic batching
7. Suspense improvements and streaming SSR
8. Server Components vs Client Components
9. The `use()` hook in React 19 and how it changes data-fetching patterns
10. Form actions in React 19 — what replaces manual `useState` for form state
11. Hydration of server-rendered components with async data — causes of hydration mismatches

## Architecture at Scale
12. Designing a frontend architecture for a high-traffic application (1M+ daily users)
13. Structuring and optimizing a large-scale React codebase for scalability and readability
14. Designing a component library for reuse across multiple teams/projects
15. Global state management strategy in a large app with multiple contributing teams
   (Context API vs Redux Toolkit vs Zustand — when to choose each)
16. Managing derived state efficiently
17. Designing a system for client-side caching, API retries, and graceful error boundaries
18. Migrating a large legacy JavaScript codebase to TypeScript — approach
19. Designing a React architecture that allows gradual migration from class to functional components
20. Micro-frontend architecture, Module Federation, application federation vs component federation

## Performance at Scale
21. Rendering 10,000+ DOM nodes/rows efficiently (beyond basic virtualization)
22. Implementing a virtualized list from scratch (DOM recycling, scroll throttling)
23. Code splitting and bundle size optimization strategy
24. Web Vitals — LCP, CLS, INP: what causes them and how to improve them
25. Core Web Vitals and performance profiling methodology (measure before optimizing)
26. Optimistic UI updates

## Accessibility & Quality at Scale
27. Implementing a fully accessible data table with sorting and pagination
28. Ensuring accessibility (a11y) and WCAG compliance across a frontend application
29. Internationalization (i18n) and localization (l10n) in a large app
30. Testing strategy for frontend apps — unit, integration, and E2E (Jest, RTL, Playwright)
