import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 md:top-6 md:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-border bg-background/70 px-5 py-3 backdrop-blur-xl">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight"
        >
          Kaelo<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-widest md:flex">
          <Link
            href="/manifest"
            className="text-muted-foreground transition hover:text-foreground"
          >
            Manifest
          </Link>
          <Link
            href="/werk"
            className="text-muted-foreground transition hover:text-foreground"
          >
            Werk
          </Link>
          <Link
            href="/start"
            className="rounded-full bg-accent px-4 py-2 text-accent-foreground shadow-[0_0_24px_rgba(124,108,255,0.35)] transition hover:opacity-90"
          >
            Start de audit →
          </Link>
        </nav>
        <Link
          href="/start"
          className="rounded-full bg-accent px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent-foreground md:hidden"
        >
          Start →
        </Link>
      </div>
    </header>
  );
}
