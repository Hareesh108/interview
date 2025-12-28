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
const SIBLING_COUNT = 1;

/**
 * Returns a pagination range like:
 * 1 ... 49 50 51 ... 100
 */
type PageItem = number | "...";

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = SIBLING_COUNT
): PageItem[] {
  if (totalPages <= 1) return [1];

  const range: PageItem[] = [];

  const start = Math.max(2, currentPage - siblingCount);
  const end = Math.min(totalPages - 1, currentPage + siblingCount);

  // Always show first page
  range.push(1);

  // Left ellipsis
  if (start > 2) {
    range.push("...");
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  // Right ellipsis
  if (end < totalPages - 1) {
    range.push("...");
  }

  // Always show last page
  range.push(totalPages);

  return range;
}

export default function NumberedBetterEllipsis() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  // Posts for current page
  const visiblePosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, currentPage]);

  // Pagination window
  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <div className="max-w-6xl mx-auto border my-10 p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Production-Level Pagination
      </h2>

      {!posts.length && <p className="text-center">Loading posts...</p>}

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-center my-6 items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
          className="disabled:opacity-50"
          aria-label="Previous page"
        >
          <ArrowLeftToLine />
        </button>

        {paginationRange.map((item, index) =>
          item === "..." ? (
            <span key={index} className="px-3 py-1 select-none">
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              aria-current={item === currentPage ? "page" : undefined}
              className={`px-3 py-1 border rounded ${
                item === currentPage
                  ? "bg-pink-300 font-bold"
                  : "hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
          className="disabled:opacity-50"
          aria-label="Next page"
        >
          <ArrowRightFromLine />
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-4 gap-4">
        {visiblePosts.map(post => (
          <div key={post.id} className="border p-3 rounded">
            <h3 className="font-semibold mb-1">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
