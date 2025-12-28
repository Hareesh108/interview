"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftToLine, ArrowRightFromLine } from "lucide-react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PAGE_SIZE = 10;

export default function NumberedBasicOptimized() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await res.json();
      setPosts(data);
    })();
  }, []);

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  const visiblePosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, currentPage]);

  return (
    <div className="max-w-6xl mx-auto border my-10 p-4">
      {!posts.length && <p>No posts found</p>}

      {/* Pagination */}
      <div className="flex gap-2 justify-center my-5">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="disabled:opacity-50"
        >
          <ArrowLeftToLine />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border ${
              page === currentPage ? "bg-pink-300" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="disabled:opacity-50"
        >
          <ArrowRightFromLine />
        </button>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-4 gap-3">
        {visiblePosts.map((post) => (
          <div key={post.id} className="border p-2">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
