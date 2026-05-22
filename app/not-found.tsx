import Link from "next/link";
import Nav from "./components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[100svh] flex-col items-start justify-center px-6 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-6 font-display text-[clamp(3rem,12vw,12rem)] font-medium leading-[0.9] tracking-[-0.03em]">
          Deze pagina<br />
          bestaat niet<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
          Maar het systeem dat jullie nodig hebben wel.
        </p>
        <Link
          href="/start"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground transition hover:opacity-90"
        >
          Start de audit <span aria-hidden>→</span>
        </Link>
      </main>
    </>
  );
}
