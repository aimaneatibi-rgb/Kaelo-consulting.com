import { z } from "zod";

export const DiscoverySchema = z.object({
  bedrijf: z.string().min(2, "Geef in één zin door wat jullie doen."),
  sector: z.string().min(2, "Kies een sector."),
  omvang: z.string().min(1, "Geef de bedrijfsomvang door."),
  tijdvreter: z.string().min(10, "Beschrijf wat tijd kost."),
  doel: z.string().min(10, "Waar willen jullie naartoe?"),
  geprobeerd: z.string().min(2, "Vertel wat jullie al geprobeerd hebben."),
  voornaam: z.string().min(1),
  achternaam: z.string().min(1),
  bedrijfsnaam: z.string().min(1),
  email: z.string().email("Geef een geldig e-mailadres door."),
  telefoon: z.string().min(6),
});

export type Discovery = z.infer<typeof DiscoverySchema>;

export const KansSchema = z.object({
  titel: z.string(),
  wat: z.string(),
  tijdsbesparing: z.string(),
  complexiteit: z.enum(["Foundation", "Build"]),
});

export type Kans = z.infer<typeof KansSchema>;

export const AnalyseSchema = z.object({
  samenvatting: z.string(),
  kansen: z.array(KansSchema).length(3),
});

export type Analyse = z.infer<typeof AnalyseSchema>;
