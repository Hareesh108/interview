export const dynamic = 'force-static';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  return res.json();
}

export default async function SSGPage() {
  const posts = await getPosts();
  console.log(posts);
  
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>SSG (App Router)</h1>
      <p>This page is statically generated at build time.</p>
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
