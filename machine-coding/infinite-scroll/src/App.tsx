import { Profiler } from "react";
import Basic from "./components/basic";
import IntersectionObserver from "./components/intersection-observer";

function onRender({
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
}: any) {
  // Aggregate or log render timings...
  console.log("Hii");
  
  console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
}

function App() {
  return (
    <Profiler id="App" onRender={onRender}>
      {/* <Basic /> */}
      <IntersectionObserver />
    </Profiler>
  );
}

export default App;
