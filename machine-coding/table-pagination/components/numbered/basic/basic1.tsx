'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';

type Posts = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

export default function NumberedBasic() {
  const [posts, setPosts] = useState<Posts[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log(currentPage);

  console.log('posts', posts);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');

      const json: Posts[] = await res.json();
      setPosts(json);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const MaxNum = 10;
  const Total = posts?.length ?? 0;

  const noOfPages = Math.floor(Total / MaxNum);

  const latest = () => {
    const start = currentPage * MaxNum;
    const end = start + MaxNum;

    return posts?.slice(start, end);
  };

  return (
    <div className="max-w-6xl mx-auto border my-10">
      {!posts?.length && <div>No Post found.</div>}

      <div className="flex gap-2 justify-center my-5">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <ArrowLeftToLine className="h-10 w-10 cursor-pointer" />
        </button>

        {[...Array(noOfPages).keys()].map((p) => {
          return (
            <>
              {currentPage - 1 === p && (
                <button
                  key={p}
                  onClick={() => handlePage(p + 1)}
                  className="px-4 py-2 border-2 cursor-pointer bg-pink-300"
                >
                  {p + 1}
                </button>
              )}
              {currentPage - 1 !== p && (
                <button
                  key={p}
                  onClick={() => handlePage(p + 1)}
                  className="px-4 py-2 border-2 cursor-pointer"
                >
                  {p + 1}
                </button>
              )}
            </>
          );
        })}

        <button onClick={handleNextPage} disabled={noOfPages === currentPage}>
          <ArrowRightFromLine className="h-10 w-10 cursor-pointer" />
        </button>
      </div>

      <div className="p-2 grid grid-cols-4 gap-3">
        {latestList?.map((post) => (
          <div key={post.id} className="p-2  border-2">
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
