import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const { handleSubmit, register, watch } = useForm();

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
            type="number"
            id="age"
            {...register("age", { required: true })}
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default App;
