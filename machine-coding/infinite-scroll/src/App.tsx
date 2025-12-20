import { useEffect, useState } from "react";
import { Card, type Memes } from "./components/card/card";
import { ShimmerSkeleton } from "./components/shimmer-ui/shimmer-ui";

function App() {
  const [memes, setMemes] = useState<Memes[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(memes);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://meme-api.com/gimme/15");
      const data = await res.json();
      setMemes(data.memes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="w-5xl m-auto mt-4 grid grid-cols-4 gap-4">
      {loading && <ShimmerSkeleton/>}

      {!loading && !!memes.length &&
        memes.map((meme, index) => <Card key={index} meme={meme} />)}
    </div>
  );
}

export default App;
