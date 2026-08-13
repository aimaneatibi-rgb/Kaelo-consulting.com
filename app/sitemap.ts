import type { MetadataRoute } from "next";

const BASE = "https://www.kaelo-consulting.com";

/**
 * Sitemap. `/`, `/portfolio`, de case-pagina's en `/over-ons` worden geserveerd
 * vanuit public/site via de rewrites in next.config.ts — ze bestaan dus niet als
 * app-route, maar moeten hier wél in staan. `/werk` en `/manifest` redirecten
 * en horen daarom niet in de sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-13");

  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/portfolio/klok`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/portfolio/panvia`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/start`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE}/over-ons`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
