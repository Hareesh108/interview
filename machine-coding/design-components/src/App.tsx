import { AccordionOptimized } from "./components/accordion/optimized/accordion";
import { AccordionBasic } from "./components/accordion/basic/accordion";
import { Accordion } from "./components/accordion/generic/accordion";
import { accordionData } from "./components/accordion/generic/utils";

function App() {
  return (
    <div className="flex flex-col gap-10">
      <AccordionBasic />
      <AccordionOptimized />
      <div className="w-2xl m-auto mt-3">
        <Accordion items={accordionData} allowMultiple  />
      </div>
    </div>
  );
}

export default App;
