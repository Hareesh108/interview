import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

type Props = { posts: any[] };

export default function SSR({ posts }: Props) {
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>SSR Example (getServerSideProps)</h1>
      <p>Fetched on each request from jsonplaceholder.typicode.com</p>
      <ul>
        {posts.map((p: any) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/examples">← Back to examples</Link>
      </p>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();
  return { props: { posts } };
};
