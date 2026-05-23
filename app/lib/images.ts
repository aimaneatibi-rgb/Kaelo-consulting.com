/**
 * Curated photo set for the Kaelo site.
 *
 * Source: Unsplash (free for commercial use — credit appreciated but not required).
 * Each entry is a public photo on images.unsplash.com. When changing photos:
 *  1. Pick a photo on unsplash.com
 *  2. Right-click the image, copy the image address (it starts with https://images.unsplash.com/photo-...)
 *  3. Use the part *before* the `?` as `src` here — Next/Image adds optimisation params.
 *
 * Photo selection theme: the bridge between traditional work-floor and software/automation.
 * That is what Kaelo does — and the imagery must show it.
 */

export type Photo = {
  src: string;
  alt: string;
  credit: { name: string; href: string };
  /** Approximate aspect (w/h). Used only as a hint for fallbacks. */
  aspect?: number;
};

export const photos = {
  /** Hero — engineer bedient automatisering via computerinterface (mens + tech + werkvloer). */
  hero: {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Engineer bedient een productie-automatiseringssysteem via een computerinterface.",
    credit: { name: "ThisisEngineering", href: "https://unsplash.com/@thisisengineering" },
    aspect: 1.5,
  },

  /** Full-bleed divider — robotarm laswerk, letterlijk geautomatiseerde productie. */
  divider: {
    src: "https://images.unsplash.com/photo-1567789884554-0b844b597180",
    alt: "Robotarm voert geautomatiseerde lasbewerking uit op een productielijn.",
    credit: { name: "Lenny Kuhne", href: "https://unsplash.com/@lennykuhne" },
    aspect: 1.6,
  },

  /** Oplossing — dashboard met analytics-grafieken op een laptop. */
  oplossing: {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    alt: "Dashboard met analytics-grafieken op een laptopscherm.",
    credit: { name: "Luke Chesser", href: "https://unsplash.com/@lukechesser" },
    aspect: 1.5,
  },

  /** Foundation product-card — live data-monitor. */
  foundation: {
    src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
    alt: "Actief data-monitoringscherm met live-meetwaarden.",
    credit: { name: "Stephen Dawson", href: "https://unsplash.com/@srd844" },
    aspect: 1.5,
  },

  /** Build product-card — code op een laptop. */
  build: {
    src: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    alt: "Code op een laptopscherm — software in ontwikkeling.",
    credit: { name: "Mohammad Rahmani", href: "https://unsplash.com/@afgprogrammer" },
    aspect: 1.5,
  },

  /** Brand product-card — rode tulp tussen gele tulpen, klassieke "stand out / andere richting" metafoor. */
  brand: {
    src: "https://images.unsplash.com/photo-1516659257916-7be846591235",
    alt: "Een rode tulp staat tussen gele tulpen — opvallen tussen de massa.",
    credit: { name: "Rupert Britton", href: "https://unsplash.com/@rupert_britton" },
    aspect: 1.5,
  },

  /** Operate product-card — productielijn met automatische machines. */
  operate: {
    src: "https://images.unsplash.com/photo-1647427060118-4911c9821b82",
    alt: "Productielijn met automatische machines op een fabrieksvloer.",
    credit: { name: "Simon Kadula", href: "https://unsplash.com/@simonkadula" },
    aspect: 1.5,
  },

  /** Klok case (op /werk) — persoon met "STAFF" shirt, past direct bij staffing-platform context. */
  klok: {
    src: "https://images.unsplash.com/photo-1653930351140-d8dca047455e",
    alt: "Een persoon draagt een zwart shirt met de tekst STAFF — de uitzendkracht achter de Klok-flow.",
    credit: { name: "Joao Viegas", href: "https://unsplash.com/@joaopcviegas" },
    aspect: 1.5,
  },

  /** Voor wie — werkvloer-team, blijft als anchor voor menselijke factor. */
  voorwie: {
    src: "https://images.unsplash.com/photo-1652211955967-99c892925469",
    alt: "Een groep mannen in werkkleding op de werkvloer van een fabriek.",
    credit: { name: "Arno Senoner", href: "https://unsplash.com/@arnosenoner" },
    aspect: 1.5,
  },
} satisfies Record<string, Photo>;

/**
 * Build a Unsplash image URL with optimisation params.
 * Next/Image will further optimise via the loader, but this gives a baseline.
 */
export function unsplashUrl(src: string, width = 1600, quality = 80) {
  return `${src}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
