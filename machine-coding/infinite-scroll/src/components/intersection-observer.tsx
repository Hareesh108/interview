import { useEffect, useRef, useState } from "react";
import { Card, type Memes } from "./card/card";
import { ShimmerSkeleton } from "./shimmer-ui/shimmer-ui";

function IntersectionObserverDemo() {
  const [memes, setMemes] = useState<Memes[]>([]);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async (count = 35) => {
    setLoading(true);
    try {
      const res = await fetch(`https://meme-api.com/gimme/${count}`);
      const data = await res.json();
      setMemes((prev) => [...prev, ...data.memes]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const target = observerRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry, ob]) => {
        console.log("entry:", entry);
        console.log("ob:", ob);

        if (entry.isIntersecting) {
          fetchMemes();
        }
      },
      {
        rootMargin: "200px",
      }
    );
    console.log("target:", target);

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-5xl m-auto mt-4 grid grid-cols-4 gap-4">
      {!loading &&
        !!memes.length &&
        memes.map((meme, index) => <Card key={index} meme={meme} />)}

      {loading && <ShimmerSkeleton />}

      <div ref={observerRef} className="h-1"></div>
    </div>
  );
}

export default IntersectionObserverDemo;
