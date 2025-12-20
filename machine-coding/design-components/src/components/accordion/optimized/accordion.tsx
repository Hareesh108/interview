import { ListChevronsDownUp } from "lucide-react";
import { useState } from "react";

const list = [
  {
    title: "Accordion 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae omnis in dolorem commodi expedita labore enim eos porro quo rem etlaboriosam architecto ex qui vitae, quaerat veniam ratione. Officia.Corrupti cumque mollitia",
  },
  {
    title: "Accordion 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae omnis in dolorem commodi expedita labore enim eos porro quo rem etlaboriosam architecto ex qui vitae, quaerat veniam ratione. Officia.Corrupti cumque mollitia",
  },
  {
    title: "Accordion 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae omnis in dolorem commodi expedita labore enim eos porro quo rem etlaboriosam architecto ex qui vitae, quaerat veniam ratione. Officia.Corrupti cumque mollitia",
  },
];

type Item = { title: string; description: string };

type Props = {
  item: Item;
  open: boolean;
  onToggle: () => void;
};

function AccordionItem({ item, open, onToggle }: Readonly<Props>) {
  return (
    <div className="w-2xl m-auto mt-3 border">
      <div className="bg-pink-300 p-2 flex justify-between">
        <h1 className="font-bold">{item.title}</h1>
        <ListChevronsDownUp
          className="h-4 w-4 cursor-pointer"
          onClick={onToggle}
        />
      </div>
      {open && <div className="p-2">{item.description}</div>}
    </div>
  );
}

export function AccordionOptimized() {
  const [latestView, setLatestView] = useState<number | undefined>(undefined);

  const onToggle = (index: number) => {
    setLatestView((prev) => (prev === index ? undefined : index));
  };

  return (
    <div>
      {list.map((item, index) => (
        <AccordionItem
          key={item.title}
          item={item}
          open={latestView === index}
          onToggle={() => onToggle(index)}
        />
      ))}
    </div>
  );
}
