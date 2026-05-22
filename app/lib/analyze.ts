import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { Discovery, Analyse, AnalyseSchema } from "./schema";

const SYSTEM_PROMPT = `Je bent een senior strategist bij Kaelo, een Nederlandse AI-build studio dat MKB-bedrijven en startups helpt om werk weg te halen via custom software, web, branding en AI-systemen.

Je krijgt een korte intake. Daarin staat:
- het probleem waar het bedrijf het meest mee worstelt
- de sector
- wat dat probleem op dit moment kost (tijd, geld, frustratie)
- wat het zou opleveren als het opgelost is
- waar het bedrijf als geheel naartoe wil

Jouw taak: lees scherp en bedenk drie concrete kansrichtingen waar Kaelo direct mee aan de slag zou kunnen om dit probleem op te lossen en het bedrijf richting hun doel te brengen.

Richtlijnen:
- Schrijf in het Nederlands.
- Wees concreet en specifiek — niet "we optimaliseren processen" maar "we bouwen een planning-dashboard dat monteurs zelf hun route plannen op basis van postcode en spoedmeldingen".
- Wees eerlijk. Als iets pas in fase 2 kan, zeg dat.
- Geen marketingtaal, geen buzzwords, geen uitroeptekens.
- Impact: vertaal naar concrete waarde — "ca. 6–10 uur/week minder admin" of "30% snellere offertes" of "team kan zich richten op klantcontact in plaats van planning".
- Complexiteit: kies één van:
  - "Foundation" = standaard bouwsteen (CRM/dashboard/workflow/portal)
  - "Web" = website, landing page, klantportaal of brand-driven webexperience
  - "Brand" = positionering / brandbook / brand-workflow
  - "Build" = custom software, custom AI-agent, SaaS, integratielaag

Output formaat: geldige JSON die exact dit schema volgt:
{
  "samenvatting": "Eén tot twee zinnen die in plain Nederlands samenvatten waar dit bedrijf staat, wat het probleem in essentie is, en wat de grootste kans is.",
  "kansen": [
    {
      "titel": "Korte naam van de kans (max 6 woorden)",
      "wat": "Eén heldere zin over wat we zouden bouwen, gericht op het probleem.",
      "impact": "Concrete waarde — uren per week, % sneller, of wat het team teruggeeft.",
      "complexiteit": "Foundation" | "Web" | "Brand" | "Build"
    },
    ... (precies 3)
  ]
}

Retourneer ALLEEN de JSON, geen omhullende tekst.`;

function fallbackAnalyse(d: Discovery): Analyse {
  return {
    samenvatting: `${d.bedrijfsnaam} (${d.sector}) heeft een concreet probleem waar nu tijd en aandacht naar gaat. Op basis van het verhaal zien we drie kansen om dat weg te halen en richting jullie doel te bewegen.`,
    kansen: [
      {
        titel: "Centraal werkdashboard",
        wat: "Eén plek waar bedrijfsinformatie, taken en planning samenkomen — gekoppeld aan jullie bestaande systemen.",
        impact: "ca. 5–8 uur/week minder admin",
        complexiteit: "Foundation",
      },
      {
        titel: "Geautomatiseerde mailflows",
        wat: "Klantcommunicatie en interne notificaties die automatisch lopen op de juiste momenten in jullie proces.",
        impact: "ca. 3–6 uur/week, minder gemiste opvolging",
        complexiteit: "Foundation",
      },
      {
        titel: "AI-agent voor terugkerend werk",
        wat: "Custom agent die het meest tijdrovende stuk uit jullie dagelijkse routine overneemt.",
        impact: "ca. 8–15 uur/week, team kan zich richten op klantwerk",
        complexiteit: "Build",
      },
    ],
  };
}

export async function analyseDiscovery(d: Discovery): Promise<Analyse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return fallbackAnalyse(d);
  }

  const client = new Anthropic({ apiKey });

  const userPrompt = `Bedrijf: ${d.bedrijfsnaam}
Sector: ${d.sector}
Contactpersoon: ${d.voornaam} ${d.achternaam} (${d.functie})

Probleem:
${d.probleem}

Wat kost dit probleem nu:
${d.kosten}

Wat zou het opleveren als opgelost:
${d.opgelost}

Doel van het bedrijf:
${d.doel}`;

  try {
    const res = await client.messages.create({
      model: process.env.KAELO_ANALYSE_MODEL ?? "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = res.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");

    const cleaned = text
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/g, "")
      .trim();

    const parsed = AnalyseSchema.safeParse(JSON.parse(cleaned));
    if (parsed.success) return parsed.data;
    return fallbackAnalyse(d);
  } catch (err) {
    console.error("[Kaelo] Claude analyse mislukt, fallback gebruikt:", err);
    return fallbackAnalyse(d);
  }
}
