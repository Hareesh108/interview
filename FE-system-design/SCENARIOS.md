# React System Design Scenarios 

This document includes **scenario-based React architecture questions** along with **senior-level spoken-style answers** for practical interview preparation.

---

## ## Scenario 1 — Large List (10,000 Items) Causing Janky Scrolling

### **Question**

You have a very large page showing 10,000 items. Scrolling becomes janky. How would you redesign it?

### **Spoken Answer**

*“If I see jank with around 10,000 items, my first assumption is that we’re simply rendering way more DOM than the user can actually see at a time.

My first step would be to switch to a **virtualized list** instead of rendering everything. I’d use something like `react-window` or `react-virtualized` so that only the items inside or near the viewport are mounted, and the rest are just placeholders. That alone usually gives a massive performance boost because the DOM size drops from thousands of nodes to maybe a few dozen.

At the same time, I’d make sure we’re using **stable keys** and not re-mounting items unnecessarily when the list changes. If each row has some complex children, I’d wrap them in `React.memo` so that they only re-render when their own props change, not on every scroll.

If there’s heavy logic per row—like expensive formatting or calculations—I’d memoize that as well, or pre-compute on the server or in a worker, so the render function stays cheap.

So in short: I’d virtualize the list, stabilize keys, memoize row components and expensive logic, and only do work for the portion of the list the user can actually see.”*

---

## Scenario 6 — Huge Form (50+ Fields) With Laggy Typing

### **Question**

You have a huge dynamic form with 50+ fields. Users complain that typing feels slow. What would you do?

### **Spoken Answer**

*“When typing in a form feels laggy in React, it usually means too much is re-rendering on every keystroke.

First, I’d **split the form into smaller, focused components** – for example: personal info, address, preferences – and make each section a memoized component. That way, typing in one field doesn’t cause the entire form to re-render.

I’d also strongly consider using a **form library that is optimized for performance**, like `react-hook-form`, which leans on uncontrolled inputs and refs internally. That dramatically reduces the amount of React state updates compared to fully controlled inputs.

For any complex validations—like cross-field validation or heavy schema checks—I’d avoid running them on every keypress. Instead, I’d either debounce them, run them on blur, or mark them as non-urgent: for example, wrap a heavy validation or recalculation in `startTransition` so that the UI stays responsive while the expensive part runs as a lower-priority update.

Finally, I’d check that I’m not putting the entire form state into a global store or a high-level context that forces the whole tree to re-render. Field-level or section-level state is usually much more efficient.

So my approach is: break it into smaller components, use a performant form library, avoid global re-renders, and make heavy validation work asynchronous or lower-priority.”*

---

## Scenario 8 — Memory Usage Increasing in a Long-Running Dashboard

### **Question**

In a React-based dashboard that stays open all day, memory keeps growing over time. How would you approach and fix this?

### **Spoken Answer**

*“If memory usage keeps growing in a long-running React dashboard, I treat it as a potential leak in either React code or integrations around it.

I’d start by using the **browser’s Performance/Memory tools** to take a couple of heap snapshots over time and compare them. I’d look specifically for detached DOM nodes, event listeners, or large data structures that never get freed.

On the React side, one common culprit is **effects that don’t clean up**. So I’d review `useEffect` hooks and make sure we always return a cleanup function to remove subscriptions, clear timers, and detach event listeners. For example, if there’s a WebSocket, an interval, or a `window.addEventListener`, I’d verify the corresponding `close`, `clearInterval`, or `removeEventListener` is called on unmount.

Another pattern I watch for is storing big objects—like entire API responses or huge arrays—in long-lived global state or context. In a dashboard, if we keep pushing data into arrays without trimming or paging them, memory usage will naturally grow. In that case, I’d either paginate, limit history, or store only the data that’s needed to render.

If metrics updates are very frequent, I’d also check that we’re not creating new functions or objects unnecessarily in render, which can keep references alive longer than needed.

So overall, my approach is: profile with heap snapshots, fix missing effect cleanups, avoid unbounded growth in global state or caches, and be careful about subscriptions and listeners that persist longer than the component tree that created them.”*

---

## Scenario 11 — Designing Micro-Frontend Architecture in React

### **Question**

How would you design a micro-frontend architecture using React, with multiple teams working on different parts of the same product?

### **Spoken Answer**

*“If I were designing a React-based micro-frontend architecture, I’d start by deciding how independent each team’s slice needs to be in terms of deployability and tech stack.

A modern approach I like is **Webpack Module Federation**. I’d have a shell application that owns the global layout, routing, and cross-cutting concerns like auth and theming. Each team would build a separate React bundle as a remote module, exposing their top-level entry components. The shell dynamically loads those remotes at runtime, so each team can deploy independently as long as we respect some agreed contracts.

We’d share core libraries like `react`, `react-dom`, and the design system via Module Federation’s `shared` configuration to avoid version conflicts and duplicated bundles. The design system would live in a shared package, so all micro-frontends look consistent and reuse the same primitives.

For routing, there are two common models: either the shell owns the global router and mounts micro-frontends in route segments, or each micro-frontend has its own internal routing under a base path. I usually prefer the shell owning the top-level routing for consistency.

If we need stricter isolation—for example, untrusted code or very different tech stacks—we could also go with **iframes** and communicate via postMessage, but that’s a trade-off: better isolation but more complex integration and UX constraints.

So my default architecture would be: a shell React app with shared auth, layout, routing, and design system; teams shipping federated React micro-frontends; shared core libraries; and clear contracts for navigation and data exchange between them.”*

---

End of document.
