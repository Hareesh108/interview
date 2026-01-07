import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black sm:items-start">
        <header className="w-full flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={80}
              height={18}
              priority
            />
            <h2 className="text-lg font-semibold">Learning Next.js — App Router</h2>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/examples" className="rounded-md px-3 py-2 text-sm font-medium bg-black text-white">Examples</Link>
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="rounded-md px-3 py-2 text-sm font-medium border">Docs</a>
          </nav>
        </header>

        <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
            Practical examples: SSR, SSG & ISR
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Explore server rendering and static generation patterns using the App Router. Click "Examples" to view live pages that fetch data from a dummy API so they feel real.
          </p>

          <div className="flex w-full max-w-lg gap-3">
            <Link href="/app-examples" className="flex-1 rounded-full bg-black px-4 py-3 text-center text-white">Open Examples</Link>
            <Link href="/app-examples/ssr" className="rounded-full border px-4 py-3 text-center">SSR</Link>
            <Link href="/app-examples/ssg" className="rounded-full border px-4 py-3 text-center">SSG</Link>
            <Link href="/app-examples/isr" className="rounded-full border px-4 py-3 text-center">ISR</Link>
          </div>
        </section>

        <footer className="w-full text-center text-sm text-zinc-500 py-8">
          Built for learning — edit <code>app/page.tsx</code> to customize this landing page.
        </footer>
      </main>
    </div>
  );
}
