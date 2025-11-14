import * as z from "zod";
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (data: any) => {
    console.log("data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex items-center justify-center min-h-screen bg-gray-50"
    >
      <div className="flex flex-col gap-6 w-80 bg-white shadow-xl p-8 rounded-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          User Details
        </h2>

        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="age"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age")}
            onWheel={(e) => e.currentTarget.blur()}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default App;
