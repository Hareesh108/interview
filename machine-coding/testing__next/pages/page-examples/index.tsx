import Link from 'next/link';
import React from 'react';

export default function Examples() {
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js Data Fetching Examples</h1>
      <p>Demonstrations using a dummy API: <code>jsonplaceholder.typicode.com</code></p>
      <ul>
        <li>
          <Link href="/examples/ssr">SSR (getServerSideProps)</Link>
        </li>
        <li>
          <Link href="/examples/ssg">SSG (getStaticProps)</Link>
        </li>
        <li>
          <Link href="/examples/isr">ISR (getStaticProps + revalidate)</Link>
        </li>
      </ul>
    </main>
  );
}
