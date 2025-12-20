import { AccordionOptimized } from "./components/accordion/optimized/accordion";
import { AccordionBasic } from "./components/accordion/basic/accordion";

function App() {
  return (
    <div className="flex flex-col gap-10">
      <AccordionBasic />
      <AccordionOptimized />
    </div>
  );
}

export default App;
