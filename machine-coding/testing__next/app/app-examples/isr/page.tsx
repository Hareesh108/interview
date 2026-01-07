export const revalidate = 10; // seconds

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', { next: { revalidate: 10 } });
  return res.json();
}

export default async function ISRPage() {
  const posts = await getPosts();
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>ISR (App Router)</h1>
      <p>This page uses ISR: revalidated every 10 seconds.</p>
      <ul>
        {posts.map((p: any) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      <p><a href="/examples">← Back to examples</a></p>
    </main>
  );
}
