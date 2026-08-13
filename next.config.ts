import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },

  // Rebrand "Pink" (2026-08-04): homepage en portfolio worden geserveerd vanuit
  // de statische bestanden in public/site. beforeFiles gaat vóór de filesystem-
  // routes, zodat deze de oude app/page.tsx overrulen. De oude pagina blijft in
  // de repo staan als terugvalpad — rewrites weghalen = oude site weer live.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/site/index.html" },
        { source: "/portfolio", destination: "/site/portfolio.html" },
        { source: "/portfolio/klok", destination: "/site/klok.html" },
        { source: "/portfolio/panvia", destination: "/site/panvia.html" },
        { source: "/over-ons", destination: "/site/over-ons.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // De cases staan nu op de portfolio-pagina i.p.v. losse /werk-routes.
  async redirects() {
    return [
      { source: "/manifest", destination: "/over-ons", permanent: false },
      { source: "/werk", destination: "/portfolio", permanent: false },
      { source: "/werk/klok", destination: "/portfolio/klok", permanent: false },
      { source: "/werk/panvia", destination: "/portfolio/panvia", permanent: false },
    ];
  },
};

export default nextConfig;
