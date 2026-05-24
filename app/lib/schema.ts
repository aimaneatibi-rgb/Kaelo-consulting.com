import { z } from "zod";

/**
 * Discovery: het audit-formulier op /start.
 * Volgorde matcht de stappen in StartForm.tsx.
 */
export const DiscoverySchema = z.object({
  probleem: z.string().min(1, "Vul iets in."),
  sector: z.string().min(1, "Vul iets in."),
  kosten: z.string().min(1, "Vul iets in."),
  opgelost: z.string().min(1, "Vul iets in."),
  doel: z.string().min(1, "Vul iets in."),

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
