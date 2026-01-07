import Link from 'next/link';

export default function ExamplesPage() {
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js App Router: Data Fetching Examples</h1>
      <p>Demonstrations using a dummy API: <code>jsonplaceholder.typicode.com</code></p>
      <ul>
        <li>
          <Link href="/examples/ssr">SSR (server, fetch per request)</Link>
        </li>
        <li>
          <Link href="/examples/ssg">SSG (static at build)</Link>
        </li>
        <li>
          <Link href="/examples/isr">ISR (revalidate / incremental)</Link>
        </li>
      </ul>
    </main>
  );
}
