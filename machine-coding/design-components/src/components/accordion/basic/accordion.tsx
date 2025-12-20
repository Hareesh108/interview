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
  index: number;
  onChange: (item: number) => void;
};

function AccordionItem({ item, open, index, onChange }: Readonly<Props>) {
  return (
    <div className="w-2xl m-auto mt-3 border">
      <div className="bg-pink-300 p-2 flex justify-between">
        <h1 className="font-bold">{item.title}</h1>
        <ListChevronsDownUp
          className="h-4 w-4 cursor-pointer"
          onClick={() => onChange(index)}
        />
      </div>
      {open && <div className="p-2">{item.description}</div>}
    </div>
  );
}

export function AccordionBasic() {
  const [latestView, setLatestView] = useState(0);

  return (
    <div>
      {list.map((item, index) => (
        <AccordionItem
          key={item.title}
          item={item}
          index={index}
          open={latestView === index}
          onChange={(index) => {
            if (index === latestView) {
              setLatestView(-1);
            } else {
              setLatestView(index);
            }
          }}
        />
      ))}
    </div>
  );
}
