import "./App.css";


function getFormValues<T extends object>(formData: FormData): T {
  return Object.fromEntries(formData.entries()) as T;
}

type FormValues = {
  name: string;
  age: string; 
};

async function handleForm(formData: FormData) {
  const data = getFormValues<FormValues>(formData);
  console.log("Typed:", data);
  console.log("Typed:", data);
}

function App() {

  return (
    <form action={handleForm}>
      <input name="name" />
      <input name="age" />
      <button type="submit">Submit</button>
    </form>
  );
}


export default App;
