import React, { useState, useCallback, memo } from "react";

/* ------------------ Types ------------------ */

export type AccordionItemData = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItemData[];
  allowMultiple?: boolean;

  // controlled
  value?: string[];
  onChange?: (ids: string[]) => void;
};

/* ------------------ Accordion ------------------ */

export function Accordion({
  items,
  allowMultiple = false,
  value,
  onChange,
}: Readonly<AccordionProps>) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>([]);
  
  const openItems = isControlled ? value : internalValue;

  const toggleItem = useCallback(
    (id: string) => {
      const isOpen = openItems.includes(id);

      let next: string[];

      if (allowMultiple) {
        next = isOpen ? openItems.filter((i) => i !== id) : [...openItems, id];
      } else {
        next = isOpen ? [] : [id];
      }

      if (!isControlled) {
        setInternalValue(next);
      }

      onChange?.(next);
    },
    [allowMultiple, isControlled, onChange, openItems]
  );

  return (
    <div>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

/* ------------------ Item ------------------ */

type AccordionItemProps = {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionItem = memo(function AccordionItem({
  item,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border mb-2">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full flex justify-between items-center p-3 font-semibold"
      >
        {item.title}
        <span className="cursor-pointer">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && <div className="p-3 border-t">{item.content}</div>}
    </div>
  );
});
