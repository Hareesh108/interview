import BasicDebounce from "./components/debounce/basic";
import OptimizeDebounce from "./components/debounce/optimize";
import BasicThrottle from "./components/throttle/basic";

function App() {
  return (
    <>
      {/* <BasicDebounce />
      <OptimizeDebounce /> */}
      <BasicThrottle/>
    </>
  );
}

export default App;
