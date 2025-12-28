import { Check, Trash } from "lucide-react";
import React, { useState } from "react";

type Todos = {
  id: number;
  title: string;
  idCompleted: boolean;
};

const Better = () => {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState<Todos[]>([]);

  console.log(notes);

  console.log(text);

  const handleAdd = () => {
    const newNote = {
      id: Date.now(),
      title: text,
      idCompleted: false,
    };
    setNotes((prev) => [...prev, newNote]);
    setText("");
  };

  const handleRemove = (id: number) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDone = (id: number) => {
    setNotes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, idCompleted: true } : item
      )
    );
  };

  return (
    <div className="max-w-lg p-5 mx-auto my-10 flex flex-col gap-4">
      <div className="flex gap-3">
        <input
          type="text"
          name="title"
          className="border"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="cursor-pointer" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between gap-2 border px-4 py-2"
          >
            <div>
              <h3 className={`${note.idCompleted && "line-through"}`}>
                {note.title}
              </h3>
              <h6>{note.idCompleted ? "Yes" : "No"}</h6>
            </div>

            <div className="flex gap-2">
              {!note.idCompleted && (
                <button
                  className="cursor-pointer"
                  onClick={() => handleDone(note.id)}
                >
                  <Check />
                </button>
              )}
              <button
                className="cursor-pointer"
                onClick={() => handleRemove(note.id)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Better;
