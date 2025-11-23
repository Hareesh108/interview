import "./App.css";


function getFormValues<T extends object>(formData: FormData): T {
  return Object.fromEntries(formData.entries()) as T;
}

type FormValues = {
  name: string;
  age: string; 
};

function App() {
  async function handleForm(formData: FormData) {
    const data = getFormValues<FormValues>(formData);
    console.log("Typed:", data);
  }

  return (
    <form action={handleForm}>
      <input name="name" />
      <input name="age" />
      <button type="submit">Submit</button>
    </form>
  );
}


export default App;
