import { z } from "zod";

/**
 * Discovery: het audit-formulier op /start.
 * Volgorde matcht de stappen in StartForm.tsx.
 */
export const DiscoverySchema = z.object({
  probleem: z.string().min(10, "Beschrijf kort het probleem."),
  sector: z.string().min(2, "Geef je sector door."),
  kosten: z.string().min(10, "Wat kost dit probleem op dit moment?"),
  opgelost: z.string().min(10, "Wat zou het opleveren als opgelost?"),
  doel: z.string().min(10, "Waar willen jullie naartoe?"),

  voornaam: z.string().min(1),
  achternaam: z.string().min(1),
  bedrijfsnaam: z.string().min(1),
  functie: z.string().min(1, "Wat is je functie?"),
  email: z.string().email("Geef een geldig e-mailadres door."),
  telefoon: z.string().min(6),
});

export type Discovery = z.infer<typeof DiscoverySchema>;

export const KansSchema = z.object({
  titel: z.string(),
  wat: z.string(),
  impact: z.string(),
  complexiteit: z.enum(["Foundation", "Web", "Brand", "Build"]),
});

export type Kans = z.infer<typeof KansSchema>;

export const AnalyseSchema = z.object({
  samenvatting: z.string(),
  kansen: z.array(KansSchema).length(3),
});

export type Analyse = z.infer<typeof AnalyseSchema>;
