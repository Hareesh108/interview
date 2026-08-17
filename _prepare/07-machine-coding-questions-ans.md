# Machine Coding Questions (Frontend / React) — With Answers

Each item includes the key implementation approach; full working code is given for the most frequently-asked ones. Evaluators generally look for: correct state ownership, edge-case handling, cleanup (timers/listeners), and avoiding unnecessary re-renders.

## Data Display & Lists

### Accordion — dynamic from JSON (`{ id, name, strings[] }`)
**Key idea:** the parent owns which section(s) are open; each item is a dumb, controlled child.
```jsx
function Accordion({ data, allowMultiple = false }) {
  const [openIds, setOpenIds] = useState(new Set());
  const toggle = (id) => {
    setOpenIds(prev => {
      const next = allowMultiple ? new Set(prev) : new Set();
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  return data.map(({ id, name, strings }) => (
    <div key={id}>
      <button onClick={() => toggle(id)} aria-expanded={openIds.has(id)}>{name}</button>
      {openIds.has(id) && <ul>{strings.map((s, i) => <li key={i}>{s}</li>)}</ul>}
    </div>
  ));
}
```
**Nested/grouped accordion:** same pattern recursively — each level owns its own `openIds` state; a group of independent accordions just renders multiple `<Accordion>` instances.

### Data table fetching from an API
**Approach:** `useEffect` fetch on mount (and on dependency changes like page/sort/filter) → track `loading`/`error`/`data` state → render a table with a loading skeleton and error/retry UI. Add an `AbortController` in cleanup to avoid setting state after unmount.

### Render millions of rows / virtualized list from scratch
**Approach:** see the React-Advanced answers file (#22) — only render the rows visible in the scroll viewport (+ a small overscan buffer) as absolutely-positioned elements inside a container sized to the *total* content height, recomputing the visible slice on scroll.

### File explorer / file tree with nested create
**Approach:** model the tree as `{ id, name, type: 'file'|'folder', children: [] }`; render recursively — a `TreeNode` component that renders itself for each child if `type === 'folder'`. "Create" mutates the tree immutably by finding the target node's path and returning a new tree (don't mutate `children` arrays directly, so React detects the change).

### Nested comments
**Approach:** same recursive-tree pattern as the file explorer — each `Comment` renders its own replies via `<Comment>` recursively, indented by depth. Reply/add mutates the tree immutably by matching on comment `id`.

### Grid component / N×N grid with per-cell updates
```jsx
function Grid({ size }) {
  const [cells, setCells] = useState(() => Array(size * size).fill(0));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {cells.map((val, i) => (
        <div key={i} onClick={() =>
          setCells(prev => prev.map((v, idx) => idx === i ? v + 1 : v))}>
          {val}
        </div>
      ))}
    </div>
  );
}
```

## Forms & Input

### Multi-step form / stepper
**Approach:** parent owns `currentStep` and the full `formData` object; each step is a controlled child receiving a slice of `formData` and an `onChange`/`onNext` callback. Validate the current step before advancing.

### Two-step login form
**Approach:** step 1 collects email, step 2 (shown after step 1 validates) collects password/OTP — same stepper pattern with two steps, parent holds combined state.

### Dynamic form from JSON schema
**Approach:** see React-Intermediate answers file (#20) — map each schema field to an input type and store all values in one keyed state object.

### Switch-case / feature-flag component
```jsx
function Switch({ value, children }) {
  const match = React.Children.toArray(children)
    .find(child => child.props.case === value || child.props.default);
  return match ?? null;
}
// <Switch value={status}>
//   <Case case="loading">...</Case>
//   <Case case="error">...</Case>
//   <Case default>...</Case>
// </Switch>
```
**Feature flag:** simplest form is `flags[flagName] ? <NewUI /> : <OldUI />`, with flags sourced from context/config so they can be toggled centrally (LaunchDarkly-style, or a simple JSON config for interviews).

### Search with pagination / autocomplete / autosuggestion
**Approach:** combine the debounced-search hook (scenario file #1) with the pagination component (React-Intermediate #18); autocomplete additionally needs keyboard navigation (Arrow keys to move a highlighted-index state, Enter to select) and `aria-activedescendant` for accessibility.

## Navigation, Layout & Interaction

### Tab component (with lazy loading)
```jsx
function Tabs({ tabs }) { // tabs: [{ id, label, Component }]
  const [active, setActive] = useState(tabs[0].id);
  const ActiveComponent = tabs.find(t => t.id === active).Component;
  return (
    <>
      <div role="tablist">
        {tabs.map(t => (
          <button key={t.id} role="tab" aria-selected={active === t.id}
            onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>
      <Suspense fallback={<Spinner />}>
        <ActiveComponent />
      </Suspense>
    </>
  );
}
// Lazy loading: define each tab's Component via React.lazy(() => import('./TabX'))
// so its code only downloads when that tab is first activated.
```

### Modal / modal with priority / modal management system
**Approach:** the base modal is shown in React-Intermediate answers (#23 — portal + focus + ESC). A **modal management system** adds a stack: a `ModalProvider` holds an array of open modals (each with an id/priority), exposes `openModal`/`closeModal` via Context, and renders only the top of the stack (or all of them layered by z-index/priority) via a single portal at the root.

### Toggle switch
```jsx
function Toggle({ checked, onChange }) {
  return (
    <button role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
      className={checked ? 'on' : 'off'}>
      <span className="thumb" />
    </button>
  );
}
```

### Drag-and-drop sortable list
**Approach:** track item order in state as an array; on `dragstart` store the dragged index, on `dragover` (with `preventDefault`) compute the hovered index and reorder the array in state, on `drop` finalize. Libraries (`dnd-kit`, `react-beautiful-dnd`-successors) handle accessibility/touch — worth mentioning if not building fully from scratch.

### Editable todo list with tabs and expiry
**Approach:** combine the Tabs pattern (filter: All/Active/Expired) with a Todo list where each item has an `expiresAt` timestamp; a derived (memoized) filter checks `Date.now() > item.expiresAt` per tab.

### Scroll indicator
```jsx
function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div style={{ width: `${progress * 100}%` }} className="progress-bar" />;
}
```

### Stacked snackbar
**Approach:** a `SnackbarProvider` (Context) holds a queue array; `addSnackbar(msg)` pushes with a generated id, each snackbar auto-removes itself via `setTimeout` in a `useEffect` cleanup on mount; render the queue stacked with `position: fixed` and offset by index.

### File tree drag-and-drop
Same as "drag-and-drop sortable list," but reordering also needs to support *reparenting* — on drop, determine target node and either insert as a sibling or as a new child depending on drop position.

## Media, Animation & Visual

### Slideshow gallery / image carousel
```jsx
function Carousel({ images, intervalMs = 3000 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % images.length), intervalMs);
    return () => clearInterval(t);
  }, [images.length, intervalMs]);
  return <img src={images[index]} alt="" />;
}
```

### Lightbox / modal image gallery
**Approach:** grid of thumbnails; clicking one opens the Modal component (above) showing the full image with Prev/Next controls that update an `activeIndex` state, plus arrow-key navigation via a `keydown` listener while open.

### Image comparison slider
**Approach:** two stacked images; the top one is clipped via `clip-path: inset(0 ${100 - percent}% 0 0)` where `percent` is driven by a range input or drag position, so dragging reveals more/less of the top image.

### Preview color/zoomed image on hover
**Approach:** `onMouseEnter`/`onMouseLeave` toggle a preview state; for zoom, track `onMouseMove` to compute cursor position as a percentage and use it as `background-position` on a larger version of the image (classic magnifier technique).

### Animate elements in sequence
**Approach:** apply a CSS `animation-delay` proportional to each element's index (`style={{ animationDelay: `${i * 100}ms` }}`), or drive it with `useEffect` + a sequential `setTimeout` chain / the Web Animations API for JS-controlled sequencing.

### Draw circle w/ undo/redo/reset
**Approach:** capture `onMouseDown`/`onMouseUp` on a `<canvas>` (or SVG) to get start/end coordinates and compute a radius; push each shape into a `history` array plus a separate `redoStack`. Undo pops from `history` onto `redoStack`; redo does the reverse; reset clears both.

### Change color of squares in click order
**Approach:** an array of squares in state; on click, compute the next color from a fixed palette indexed by `clickCount`, increment `clickCount`, and update that square's color in state immutably.

### Detect overlapping circles
**Approach:** two circles overlap if the distance between centers is less than the sum of their radii: `Math.hypot(x1-x2, y1-y2) < r1 + r2`.

## Async, State & Real-Time

### Todo app (add/edit/delete, optimized)
**Approach:** see React-Intermediate answers (#21) — memoized `TodoItem` rows plus stable callbacks via `useCallback`.

### Counter (start/pause/reset) & Stopwatch
```jsx
function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const start = Date.now() - elapsed;
    const id = setInterval(() => setElapsed(Date.now() - start), 100);
    return () => clearInterval(id);
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <span>{(elapsed / 1000).toFixed(1)}s</span>
      <button onClick={() => setRunning(r => !r)}>{running ? 'Pause' : 'Start'}</button>
      <button onClick={() => { setRunning(false); setElapsed(0); }}>Reset</button>
    </>
  );
}
```

### Timer state across page navigation
**Approach:** lift the timer's state/interval to a context/store at the app root (above the router) rather than inside the page component — so unmounting the page doesn't unmount the timer. Alternatively persist `startTimestamp` to `localStorage`/URL and recompute elapsed time on remount instead of keeping a running interval per page.

### Task queue with controlled concurrency (K parallel tasks)
```js
class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  add(task) { // task: () => Promise
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._next();
    });
  }
  _next() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;
    const { task, resolve, reject } = this.queue.shift();
    this.running++;
    task().then(resolve, reject).finally(() => {
      this.running--;
      this._next();
    });
  }
}
```

### Batch API calls in sequence
```js
async function callInSequence(calls) {
  const results = [];
  for (const call of calls) results.push(await call());
  return results;
}
```

### Infinite scroll (batches, race conditions)
```jsx
function useInfiniteScroll(fetchPage) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) loadMore();
    });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadMore() {
    setLoading(true);
    const requestedPage = page;
    const newItems = await fetchPage(requestedPage);
    setItems(prev => (requestedPage === page ? [...prev, ...newItems] : prev));
    setPage(p => p + 1);
    setLoading(false);
  }
  return { items, sentinelRef, loading };
}
```
Race-condition guard: capture the requested page before the async call and only apply the result if it still matches (or use an `AbortController`/request-id pattern for cancel-based safety).

### Viewport-visible item on scroll stop
**Approach:** debounce/throttle the scroll handler; on each fire, use `IntersectionObserver` (preferred) or `getBoundingClientRect()` on candidate items to find which one is most centered in the viewport, then record it once scrolling has paused (detected via a debounce timer that resets on every scroll event).

### Typing test with invalid-character highlighting
**Approach:** compare each typed character to the target string at the same index in real time; render each character span with a class based on `untyped | correct | incorrect`, computed from comparing `typed[i] === target[i]`.

### Typing effect / highlight text on selection
**Typing effect:** `useEffect` with a `setInterval` that appends one character of the target string to displayed state per tick, clearing the interval when done.
**Highlight on selection:** listen for `onMouseUp`/`selectionchange`, read `window.getSelection()`, and wrap the selected range (e.g. via the Selection/Range API) or simply record the selected text in state to display/act on.

## Auth & Real-World Systems

### Authentication with JWT and OAuth
**Approach:** on login, store the JWT (prefer an `HttpOnly` cookie set by the server over `localStorage`, to reduce XSS token-theft risk), attach it via an `Authorization: Bearer` header (or rely on the cookie automatically) on API calls, decode/check expiry client-side to know when to refresh, and use an Axios/fetch interceptor to refresh the token transparently on a 401 and retry the original request. OAuth typically redirects to the provider, which returns an authorization code exchanged (server-side, to keep the client secret safe) for tokens.

### Calendar application
**Approach:** model events as `{ id, start, end, title }`; render a grid (month/week/day view) computed from date-fns/day.js utilities; place events in the correct day/time cell by comparing their `start`/`end` against each cell's date range; support drag-to-reschedule by tracking drag state and recomputing the event's `start`/`end` on drop.

### Website walkthrough / product tour
**Approach:** define a list of steps `{ targetSelector, content }`; on each step, use `getBoundingClientRect()` on the target element to position a tooltip/overlay near it, and dim the rest of the page with an overlay that has a "cutout" (via a mask or an SVG with a hole) around the target.

## Component Library Basics

### Reusable select/dropdown with search (single & multi-select)
**Approach:** an `<input>` filters an `options` list by substring match (case-insensitive) into a `filteredOptions` state; a `<ul>` of filtered options renders below on focus; single-select sets the value and closes on click; multi-select toggles membership in a `Set`/array of selected values and keeps the dropdown open, showing selected items as removable chips.

### Number increment counter — see Stopwatch/Counter above.

### Spinner with CSS only
```css
.spinner {
  width: 24px; height: 24px;
  border: 3px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```
