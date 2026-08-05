import Link from "next/link";

/**
 * Nav in de pink huisstijl — zelfde opbouw als de statische pagina's in
 * public/site: roze balk, Unbounded-wordmark, zwarte CTA-pill.
 */
export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-accent">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-black tracking-tight text-foreground"
        >
          kaelo<sup className="text-[10px] font-bold">®</sup>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink href="/portfolio">Portfolio</NavLink>
          <NavLink href="/manifest">Manifest</NavLink>
          <NavLink href="/#systemen">Systemen</NavLink>
        </nav>

        <Link
          href="/start"
          className="rounded-full bg-foreground px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.05em] text-white transition hover:-rotate-2 hover:scale-105 hover:bg-accent-2 hover:text-foreground md:px-6"
        >
          Start de audit ↗
        </Link>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.05em] text-foreground transition hover:bg-foreground hover:text-accent"
    >
      {children}
    </Link>
  );
}
