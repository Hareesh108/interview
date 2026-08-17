# React Interview Questions — Basic — With Answers

## Core Concepts

**1. `state` vs `props`**
`props` are read-only data passed *into* a component by its parent. `state` is data owned and managed *inside* a component, which can change over time and triggers a re-render when updated.

**2. `React.createElement` vs JSX**
JSX is syntactic sugar compiled (by Babel/the TS compiler) into `React.createElement(type, props, ...children)` calls, which return plain JS objects describing the UI (React elements). JSX is never sent to the browser as-is — it's transpiled at build time.

**3. Virtual DOM**
A lightweight in-memory tree representation of the UI. On state/prop changes, React builds a new virtual tree, diffs it against the previous one (reconciliation), and applies only the minimal set of real DOM mutations needed — avoiding expensive full re-renders of the actual DOM.

**4. `key` prop**
Keys give React a stable identity for list items across renders, so it can correctly match, reorder, add, or remove items instead of re-rendering the whole list. React warns when keys are missing/duplicated because it falls back to index-based matching, which can cause incorrect state association or unnecessary re-renders.

**5. Controlled vs uncontrolled inputs**
Controlled: the input's value is driven by React state (`value` + `onChange`), making React the single source of truth. Uncontrolled: the DOM manages its own state internally, and React reads it on demand via a `ref`.

**6. `React.Children.map` vs `Array.map`**
`React.Children.map` safely handles the `children` prop, which might be a single child, `undefined`, or a nested structure (not guaranteed to be a flat array) — it normalizes and assigns keys automatically. A plain `.map()` would fail if `children` isn't already an array.

**7. `displayName`**
Sets a readable name for a component in React DevTools and error messages — useful for HOCs/dynamically created components where the inferred name would otherwise be unhelpful (e.g. "Anonymous").

**8. Functional vs class components**
Functional components are plain functions returning JSX and use Hooks for state/lifecycle; class components extend `React.Component`, use `this.state`/`this.setState`, and lifecycle methods (`componentDidMount`, etc.). Functional + Hooks is the modern standard; classes are legacy but still supported.

**9. Types of Hooks**
State: `useState`, `useReducer`. Side effects: `useEffect`, `useLayoutEffect`. Context: `useContext`. Performance: `useMemo`, `useCallback`. Refs: `useRef`. Concurrent: `useTransition`, `useDeferredValue`. Plus custom hooks built from these.

**10. `PropTypes`**
A runtime type-checking library for React props — declares expected prop types/required-ness and logs a console warning in development if violated. (TypeScript is the more common compile-time alternative today.)

## Rendering & Data Flow

**11. Render dynamic data**
Map over the data array and return JSX per item, with a unique `key`:
```jsx
{items.map(item => <Item key={item.id} {...item} />)}
```

**12. Parent → child data**
Pass data as a prop: `<Child name={value} />`, read via `props.name` (or destructured function params).

**13. Child → parent method call**
Pass a callback function down as a prop; the child invokes it: `<Child onSave={handleSave} />`, then `props.onSave(data)` inside the child.

**14. Access a DOM element**
```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
// inputRef.current.focus()
```

**15–16. Bind array to dropdown / radio group**
```jsx
<select onChange={e => setValue(e.target.value)}>
  {options.map(o => <option key={o.id} value={o.value}>{o.label}</option>)}
</select>
{options.map(o => (
  <label key={o.id}>
    <input type="radio" name="group" value={o.value}
      checked={selected === o.value} onChange={e => setSelected(e.target.value)} />
    {o.label}
  </label>
))}
```

**17–18. Loop over array / display object entries**
```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
{Object.entries(obj).map(([key, value]) => <div key={key}>{key}: {value}</div>)}
```

**19–21. Conditional rendering & styles**
```jsx
{isVisible && <Component />}
{condition ? <A /> : <B />}
<div style={{ color: isActive ? 'green' : 'gray' }} className={isActive ? 'active' : ''}>
```

## Hooks Basics

**22. `useState` counter**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**23. Run on first render**
```jsx
useEffect(() => {
  fetchData();
}, []); // empty dependency array = run once on mount
```

**24. `useEffect` vs `useLayoutEffect`**
`useEffect` runs asynchronously *after* the browser paints — good for most side effects (data fetching, subscriptions). `useLayoutEffect` runs synchronously *before* paint — use it when you need to measure/mutate the DOM and avoid a visible flicker (e.g. reading layout and adjusting it before the user sees it).

**25. Lifecycle → Hooks mapping**
`componentDidMount` → `useEffect(fn, [])`. `componentDidUpdate` → `useEffect(fn, [deps])`. `componentWillUnmount` → the cleanup function returned from `useEffect`. `shouldComponentUpdate` → `React.memo`/`useMemo`.

**26. Re-render on value change**
Store the value in state; any `setState` call that changes the value triggers a re-render automatically — no manual re-render call needed.

**27. Add to a `useState` array**
```jsx
setItems(prev => [...prev, newItem]); // never mutate prev directly
```

**28. Run code right after a state update**
Use a `useEffect` with that state in its dependency array — `setState` is async/batched, so code immediately after `setState()` in the same function still sees the old value.
```jsx
useEffect(() => { console.log('count changed to', count); }, [count]);
```

## Small Build Exercises

**29. Search filter**
```jsx
function SearchList({ items }) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(i => i.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>
    </>
  );
}
```

**30–31. Counter with `useState` / `useReducer`**
```jsx
// useState
const [count, setCount] = useState(0);

// useReducer
function reducer(state, action) {
  switch (action.type) {
    case 'inc': return state + 1;
    case 'dec': return state - 1;
    default: return state;
  }
}
const [count, dispatch] = useReducer(reducer, 0);
```

**32. Lazy-loaded component**
```jsx
const LazyChart = React.lazy(() => import('./Chart'));
<Suspense fallback={<Spinner />}>
  <LazyChart />
</Suspense>
```

**33. Pure component**
A component that skips re-rendering if its props are shallowly equal to the previous render — `React.memo(Component)` for functional components (equivalent of `PureComponent` for classes).

**34. Controlled vs uncontrolled versions**
```jsx
// Controlled
<input value={value} onChange={e => setValue(e.target.value)} />
// Uncontrolled
<input defaultValue="initial" ref={inputRef} />
```

**35. Display selected value elsewhere**
Lift the selected value into shared state and render it in both places:
```jsx
<select value={selected} onChange={e => setSelected(e.target.value)}>...</select>
<input value={selected} readOnly />
```

**36. Character-remaining counter**
```jsx
function CharCounter({ max = 100 }) {
  const [text, setText] = useState('');
  return (
    <>
      <textarea value={text} onChange={e => setText(e.target.value)} maxLength={max} />
      <span>{max - text.length} characters remaining</span>
    </>
  );
}
// Note: useState (shown) is the idiomatic React approach. A ref-only version would
// read textareaRef.current.value directly on an event and imperatively update a
// separate counter DOM node — occasionally asked specifically to test ref understanding.
```
