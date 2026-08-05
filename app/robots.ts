import type { MetadataRoute } from "next";

const BASE = "https://www.kaelo-consulting.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // De API is geen content en hoort niet in de index.
      disallow: ["/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
