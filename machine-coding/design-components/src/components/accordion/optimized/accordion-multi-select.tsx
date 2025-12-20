import { ListChevronsDownUp } from "lucide-react";
import { useState } from "react";

const list = [
  {
    id: 1,
    title: "Accordion 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae omnis in dolorem commodi expedita labore enim eos porro quo rem etlaboriosam architecto ex qui vitae, quaerat veniam ratione. Officia.Corrupti cumque mollitia",
  },
  {
    id: 2,
    title: "Accordion 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae omnis in dolorem commodi expedita labore enim eos porro quo rem etlaboriosam architecto ex qui vitae, quaerat veniam ratione. Officia.Corrupti cumque mollitia",
  },
  {
    id: 3,
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

export function AccordionOptimizedMultiSelect() {
  const [latestView, setLatestView] = useState<number[]>([]);

  const onToggle = (id: number) => {
    if (latestView.includes(id)) {
      setLatestView((prevItems) => prevItems.filter((i) => i !== id));
    } else {
      setLatestView([...latestView, id]);
    }
  };

  return (
    <div>
      {list.map((item) => (
        <AccordionItem
          key={item.title}
          item={item}
          open={latestView.includes(item.id)}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}
