import type { MetadataRoute } from "next";

const BASE = "https://www.kaelo-consulting.com";

/**
 * Sitemap. `/` en `/portfolio` worden geserveerd vanuit public/site via de
 * rewrites in next.config.ts — ze bestaan dus niet als app-route, maar moeten
 * hier wél in staan. `/werk` en de losse cases redirecten naar /portfolio en
 * horen daarom niet in de sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-04");

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
      url: `${BASE}/start`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE}/manifest`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
