import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState();

  const fetchDate = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      console.log('data', data);

      setList(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  console.log(list);

  const onClick = (item) => {
    setList((prev) => prev.filter((todo) => todo.brand !== item.brand));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>brand</th>
            <th>category</th>
            <th>stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list?.map((item) => (
              <tr>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>
                  <button onClick={() => onClick(item)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
