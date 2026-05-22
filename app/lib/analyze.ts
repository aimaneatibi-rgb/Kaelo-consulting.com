import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { Discovery, Analyse, AnalyseSchema } from "./schema";

const SYSTEM_PROMPT = `Je bent een senior strategist bij Kaelo, een Nederlands AI-build studio dat MKB-bedrijven helpt om werk weg te halen via custom software en AI-systemen.

Je krijgt het verhaal van een prospect via een korte intake. Jouw taak: lees het verhaal scherp en bedenk drie concrete kansrichtingen waar Kaelo direct mee aan de slag zou kunnen.

Richtlijnen:
- Schrijf in het Nederlands.
- Wees concreet en specifiek — niet "we kunnen processen optimaliseren" maar "we bouwen een planning-dashboard dat monteurs zelf hun routes laat plannen op basis van postcodes en spoedmeldingen".
- Wees eerlijk. Als iets pas in fase 2 kan, zeg dat.
- Geen marketingtaal, geen buzzwords, geen uitroeptekens.
- Tijdsbesparing: schat realistisch in uren per week of percentage administratieve last. Mag een range zijn ("ca. 6–10 uur per week").
- Complexiteit: "Foundation" = standaard bouwsteen (CRM/dashboard/workflow); "Build" = custom software/AI-agent.

Output formaat: geldige JSON die exact dit schema volgt:
{
  "samenvatting": "Eén tot twee zinnen die in plain Nederlands samenvatten waar dit bedrijf staat en wat de grootste kans is.",
  "kansen": [
    {
      "titel": "Korte naam van de kans (max 6 woorden)",
      "wat": "Eén heldere zin over wat we zouden bouwen.",
      "tijdsbesparing": "ca. X uur/week, of: X% minder administratie",
      "complexiteit": "Foundation" | "Build"
    },
    ... (precies 3)
  ]
}

Retourneer ALLEEN de JSON, geen omhullende tekst.`;

function fallbackAnalyse(d: Discovery): Analyse {
  return {
    samenvatting: `${d.bedrijfsnaam} is actief in ${d.sector}. Op basis van het verhaal liggen er meerdere kansen om handmatig werk te automatiseren en het team te ontzorgen.`,
    kansen: [
      {
        titel: "Centraal werkdashboard",
        wat: "Eén plek waar bedrijfsinformatie, taken en planning samenkomen — gekoppeld aan jullie bestaande systemen.",
        tijdsbesparing: "ca. 5–8 uur/week",
        complexiteit: "Foundation",
      },
      {
        titel: "Geautomatiseerde mailflows",
        wat: "Klantcommunicatie en interne notificaties die automatisch lopen op de juiste momenten in jullie proces.",
        tijdsbesparing: "ca. 3–6 uur/week",
        complexiteit: "Foundation",
      },
      {
        titel: "AI-agent voor terugkerend werk",
        wat: "Custom agent die het meest tijdrovende stuk uit jullie dagelijkse routine overneemt en aan jullie team teruggeeft.",
        tijdsbesparing: "ca. 8–15 uur/week",
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
Omvang: ${d.omvang}

Wat doen ze:
${d.bedrijf}

Wat kost ze nu het meeste tijd:
${d.tijdvreter}

Waar willen ze over 12 maanden staan:
${d.doel}

Wat hebben ze al geprobeerd:
${d.geprobeerd}`;

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
