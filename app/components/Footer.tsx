import Link from "next/link";

/**
 * Footer in de pink huisstijl — zwart vlak met het roze mega-wordmark,
 * gelijk aan de statische pagina's in public/site.
 */
export default function Footer() {
  return (
    <footer className="overflow-hidden bg-foreground px-5 pb-10 pt-20 text-white md:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="select-none text-center font-display font-black leading-[0.9] tracking-[-0.04em] text-accent text-[clamp(52px,15vw,220px)]">
          kaelo®
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-7 md:flex-row md:items-center">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.06em]">
            Kaelo ©2026 — AI Build Studio
          </p>
          <nav className="flex flex-wrap gap-6">
            <FooterLink href="/#aanpak">Aanpak</FooterLink>
            <FooterLink href="/#systemen">Systemen</FooterLink>
            <FooterLink href="/portfolio">Portfolio</FooterLink>
            <FooterLink href="/manifest">Manifest</FooterLink>
            <FooterLink href="/start">Audit</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
          </nav>
          <div className="text-[12px] font-semibold text-white/50">
            <a href="mailto:hallo@kaelo-consulting.com" className="hover:text-accent">
              hallo@kaelo-consulting.com
            </a>
            <span className="mx-2">·</span>
            <a href="tel:+31621365990" className="hover:text-accent">
              +31 6 21 36 59 90
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] font-bold uppercase tracking-[0.06em] text-white/70 transition hover:text-accent"
    >
      {children}
    </Link>
  );
}
