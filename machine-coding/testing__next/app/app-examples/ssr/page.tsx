export const dynamic = 'force-dynamic';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', { cache: 'no-store' });
  return res.json();
}

export default async function SSRPage() {
  const posts = await getPosts();
  console.log(posts);
  
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>SSR (App Router)</h1>
      <p>This page fetches on each request (server rendering).</p>
      <ul>
        {posts.map((p: any) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      <p><a href="/app-examples">← Back to examples</a></p>
    </main>
  );
}
