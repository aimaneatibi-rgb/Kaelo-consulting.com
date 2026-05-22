import Link from "next/link";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-24">
      <Marquee items={["Wij bouwen het systeem", "10x is makkelijker dan 2x", "Wij komen langs", "Vier weken"]} />
      <div className="mx-auto mt-24 grid max-w-[1600px] grid-cols-1 gap-12 px-6 pb-12 md:grid-cols-4 md:px-12">
        <div className="md:col-span-2">
          <p className="font-display text-3xl tracking-tight md:text-4xl">
            Klaar om te beginnen?
          </p>
          <Link
            href="/start"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-accent hover:opacity-80"
          >
            Start de audit
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Site
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/manifest" className="hover:text-accent">Manifest</Link></li>
            <li><Link href="/werk" className="hover:text-accent">Werk</Link></li>
            <li><Link href="/start" className="hover:text-accent">Audit</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="mailto:hallo@kaelo-consulting.com" className="hover:text-accent">hallo@kaelo-consulting.com</a></li>
            <li><a href="tel:+31621365990" className="hover:text-accent">+31 6 21 36 59 90</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 border-t border-border px-6 py-8 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:items-center md:px-12">
        <p>Kaelo — Nederland</p>
        <p>{new Date().getFullYear()} — Wij bouwen het systeem</p>
      </div>
    </footer>
  );
}
