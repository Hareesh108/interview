# 🚀 React Performance at Scale: It’s not about the API

We often blame the backend for slowness, but in my experience, the bottleneck is usually unnecessary re-renders on the client.
To fix this, I follow 4 core principles:

- Colocation is King State placement matters more than memoization. If a button click re-renders the entire page, move that state down.
- React.memo isn't Magic It only works if your props are referentially stable. If you are passing inline objects or functions without useCallback, memo does nothing but add memory overhead.
- Intentional Hooks Use useMemo and useCallback to preserve references, not just to "optimize." Overusing them makes code harder to read with diminishing returns.
- The Next.js Factor Inefficient renders now impact SEO and Server Costs (via CPU usage). Optimization is now a business requirement, not just a nice-to-have.
Summary: optimizing the "render cycle" is often more effective than optimizing the "fetch cycle."

## I realised that frontend performance isn’t about writing more code- it’s about writing less of the wrong code. Here , I documented my learnings on

- Bundle Splitting: loading only what the user needs first instead of shipping one massive JS file
- Critical CSS : rendering above-the-fold content instantly by eliminating render-blocking styles
- Essential State: identifying the minimum state required and deriving everything else
- Reducer Pattern: managing complex UI updates with predictable, centralised state logic
- Windowing: rendering only visible items to keep large lists fast and responsive
All focused on real-world browser behaviour, Core Web Vitals, and scalable UI design. Go through the link to learn more in detail.
- <https://www.notion.so/Frontend-Fundamentals-part-2-2d053219a1e4800b8e82e8682c46ceaf>
