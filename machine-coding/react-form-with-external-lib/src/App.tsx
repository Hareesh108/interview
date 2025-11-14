import * as z from "zod";
import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.coerce.number().min(1, "Age is required."),
});

function App() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  console.log("errors:", errors);

  const values = watch();
  console.log("values:", values);

  const handleFormSubmit = (data: any) => {
    console.log("data:", data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <label htmlFor="name" style={{ width: 80 }}>
            Name
          </label>
          <input type="text" id="name" {...register("name")} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <label htmlFor="age" style={{ width: 80 }}>
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age")}
            onWheel={(e) => e.currentTarget.blur()}
          />
        </div>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default App;
