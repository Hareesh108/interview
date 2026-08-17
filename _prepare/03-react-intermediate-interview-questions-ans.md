# React Interview Questions — Intermediate — With Answers

## Patterns & Composition

**1. HOC vs custom hook**
A Higher-Order Component is a function that takes a component and returns a new, enhanced component (`withAuth(Component)`) — it adds a wrapper layer in the tree, which can cause "wrapper hell" and prop-name collisions. A custom hook is a function starting with `use` that extracts and reuses *stateful logic* without adding to the component tree. Custom hooks are generally preferred today for logic reuse; HOCs are still used for cross-cutting concerns that need to inject/wrap rendering itself (e.g. route guards).
```jsx
function withAuth(Component) {
  return function Wrapped(props) {
    const user = useAuth();
    if (!user) return <Login />;
    return <Component {...props} user={user} />;
  };
}
```

**2. Render props pattern**
A component accepts a function as a prop (or as `children`) and calls it with internal state, letting the caller decide how to render it. Still useful when the *rendering* needs to vary more than a hook alone can express, though largely superseded by hooks for pure logic sharing.
```jsx
<DataFetcher url="/api/user" render={data => <Profile data={data} />} />
```

**3. Custom hooks: `useDebounce` / `usePrevious`**
```jsx
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; }, [value]);
  return ref.current; // holds the *previous* render's value
}
```

**4. `forwardRef` and portals**
`React.forwardRef` lets a parent attach a `ref` to a DOM node/imperative handle inside a child component (refs don't pass through props by default). `createPortal(children, domNode)` renders children into a DOM node outside the parent's DOM hierarchy (e.g. `document.body`) while keeping them in the React tree for context/event bubbling — used for modals, tooltips, dropdowns that must escape `overflow: hidden`/z-index stacking contexts.

**5. Sharing state without Redux**
`useContext` + a Provider at a common ancestor lets any descendant read/update shared state without prop drilling, avoiding a third-party library for simple to moderate app-wide state.

**6. Prop drilling vs Context**
Prop drilling passes data through many intermediate components that don't need it, just to reach a deeply nested consumer — tedious and brittle. Context lets the provider expose the value directly to any consumer in its subtree, skipping the intermediates.

## Hooks in Depth

**7. `useMemo` vs `useCallback`**
`useMemo(fn, deps)` memoizes the *return value* of an expensive computation, recomputing only when deps change. `useCallback(fn, deps)` memoizes the *function reference itself*, useful for passing stable callbacks to memoized children so they don't re-render unnecessarily. `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

**8. `useTransition` vs `useDeferredValue`**
`useTransition` marks a *state update* as non-urgent, letting React interrupt it for more urgent updates (e.g. typing stays responsive while a big list re-render happens in the background) and exposes an `isPending` flag. `useDeferredValue` takes a *value* and returns a version that "lags behind" during urgent updates — useful when you don't control the state update itself (e.g. a value from props/context).

**9. `useState` vs `useRef`**
`useState` triggers a re-render when updated and its value is part of the render output. `useRef` gives a mutable `.current` box that persists across renders *without* causing a re-render when changed — used for DOM references or tracking values that shouldn't affect rendering (e.g. a timer ID, previous value, render count).

**10–11. `useEffect` mistakes & state updates inside it**
Common mistakes: missing dependencies (stale closures), missing cleanup (leaked subscriptions/timers), causing infinite loops by updating a dependency the effect itself depends on. Updating state inside `useEffect` schedules another render; if that state is also in the dependency array without a stable exit condition, it creates an infinite loop.

## Performance & Correctness

**12. Preventing unnecessary re-renders**
Wrap the component in `React.memo` (shallow prop comparison), keep prop references stable with `useCallback`/`useMemo`, avoid creating new object/array/function literals inline in JSX, and split state so unrelated updates don't force a shared ancestor (and its whole subtree) to re-render.

**13. Fixing an infinite re-render loop**
Typical cause: calling `setState` unconditionally during render, or a `useEffect` whose dependency array includes a value the effect itself updates (e.g. a new object/array created every render). Fix by adding a proper dependency array, using a functional state update to avoid needing the value as a dependency, or memoizing the object/array so its reference is stable.

**14. Reconciliation & keys**
React diffs the new element tree against the old one type-by-type at each level. For lists, `key` tells React which child in the new array corresponds to which in the old array, so it can reuse/move DOM nodes and their state instead of destroying and recreating them. Using array index as key is problematic when items are reordered/inserted, since it can misassign state to the wrong item.

**15. Testing `useEffect` with RTL**
Render the component, then use `screen`/`waitFor` from React Testing Library to assert on the *result* of the effect (e.g. text that appears after a fetch resolves) rather than the effect itself — RTL encourages testing observable behavior, not implementation details. Mock network calls (e.g. with `msw` or `jest.fn()`).

**16. Lazy loading without breaking SEO**
Combine `React.lazy`/dynamic `import()` for code-splitting with server-side rendering (SSR) or static generation for the initial HTML, so crawlers see fully rendered content; the lazy-loaded JS then hydrates on the client. Purely client-side lazy loading without SSR can leave crawlers seeing an empty shell.

## Common Build Tasks

**17. Debounced search filter** — see JS file's `debounce` combined with the basic-file search example; typically implemented with a `useDebounce` custom hook (shown above) wrapping the query state before it's used to filter/fetch.

**18. Pagination component**
```jsx
function Pagination({ totalItems, pageSize, page, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <div>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
}
```

**19. Error Boundary**
Only class components can be error boundaries (no Hook equivalent exists as of React 18/19).
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logErrorToService(error, info); }
  render() {
    if (this.state.hasError) return this.props.fallback ?? <h2>Something went wrong.</h2>;
    return this.props.children;
  }
}
```

**20. Dynamic form from JSON schema**
Map over a schema array and render the matching input type per field, storing values in a single form-state object keyed by field name:
```jsx
function DynamicForm({ schema }) {
  const [values, setValues] = useState({});
  return schema.map(field => (
    <input key={field.name} type={field.type} name={field.name}
      value={values[field.name] ?? ''}
      onChange={e => setValues(v => ({ ...v, [field.name]: e.target.value }))} />
  ));
}
```

**21. Todo app, minimal re-renders**
Keep the list in a parent's state, but extract `TodoItem` as its own `React.memo`-wrapped component receiving only the props it needs (item data + stable callbacks via `useCallback`), so updating one item doesn't re-render every row.

**22. Detect click outside an element**
```jsx
function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutsideClick();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onOutsideClick]);
}
```

**23. Modal with focus trap and ESC close**
```jsx
function Modal({ onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    ref.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return createPortal(
    <div className="overlay" onMouseDown={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true"
        onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
// A full focus trap additionally intercepts Tab/Shift+Tab to cycle focus
// only among the modal's focusable elements.
```
