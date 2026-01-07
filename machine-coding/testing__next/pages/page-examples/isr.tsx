import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';

type Props = { posts: any[] };

export default function ISR({ posts }: Props) {
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>ISR Example (getStaticProps + revalidate)</h1>
      <p>Built at first, then revalidated every 10 seconds.</p>
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();
  return { props: { posts }, revalidate: 10 };
};
