import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-tight text-white"
        >
          Kaelo<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-white md:flex">
          <Link href="/manifest" className="hover:text-accent transition">
            Manifest
          </Link>
          <Link href="/werk" className="hover:text-accent transition">
            Werk
          </Link>
          <Link
            href="/start"
            className="rounded-full border border-white px-4 py-2 hover:border-accent hover:text-accent transition"
          >
            Start de audit →
          </Link>
        </nav>
        <Link
          href="/start"
          className="md:hidden font-mono text-xs uppercase tracking-widest text-white"
        >
          Start →
        </Link>
      </div>
    </header>
  );
}
