import { useCallback, useEffect, useState } from "react";
import { Card, type Memes } from "./card/card";
import { ShimmerSkeleton } from "./shimmer-ui/shimmer-ui";

function Basic() {
  const [memes, setMemes] = useState<Memes[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://meme-api.com/gimme/35");
      const data = await res.json();
      setMemes((prev) => [...prev, ...data.memes]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    console.log("scrolling....");

    const next = document.body.scrollHeight <= scrollY + innerHeight;

    if (next) fetchMemes();
  }, []);

  useEffect(() => {
    fetchMemes();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-5xl m-auto mt-4 grid grid-cols-4 gap-4">
      {!loading &&
        !!memes.length &&
        memes.map((meme, index) => <Card key={index} meme={meme} />)}

      {loading && <ShimmerSkeleton />}
    </div>
  );
}

export default Basic;
