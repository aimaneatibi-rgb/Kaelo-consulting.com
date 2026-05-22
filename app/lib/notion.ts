import "server-only";
import { Client } from "@notionhq/client";
import type { Discovery, Analyse } from "./schema";

/**
 * Schrijft een nieuwe lead naar de bestaande Kaelo Notion-CRM:
 * → Database "🌱 Leads" (a3c6f81a-23b3-4984-bcd0-ed033a2bc0a1)
 *
 * Mapt onze /start-formulier velden op de bestaande Leads-properties zodat
 * hot-leads / funnel / inbox views direct werken.
 *
 * Vereist twee env vars:
 *   NOTION_API_KEY          — internal integration token
 *   NOTION_LEADS_DATABASE_ID — database id (default als ENV ontbreekt: geen schrijven)
 */
export async function saveLeadToNotion(d: Discovery, a: Analyse) {
  const token = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;

  if (!token || !databaseId) {
    console.warn("[Kaelo] Notion env vars ontbreken — lead niet opgeslagen.");
    return { ok: false, reason: "missing-env" as const };
  }

  const notion = new Client({ auth: token });
  const now = new Date().toISOString();

  const verhaal = [
    `Sector: ${d.sector}`,
    "",
    "Wat het probleem nu kost:",
    d.kosten,
    "",
    "Wat oplossen oplevert:",
    d.opgelost,
    "",
    "Doel:",
    d.doel,
  ]
    .join("\n")
    .slice(0, 1900);

  try {
    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Naam: {
          title: [
            {
              text: {
                content: `${d.voornaam} ${d.achternaam} — ${d.bedrijfsnaam}`,
              },
            },
          ],
        },
        Email: { email: d.email },
        Telefoon: { phone_number: d.telefoon },
        "Bedrijf (ruw)": {
          rich_text: [{ text: { content: d.bedrijfsnaam } }],
        },
        Functie: { rich_text: [{ text: { content: d.functie } }] },
        "Houdt mij wakker": {
          rich_text: [{ text: { content: d.probleem.slice(0, 1900) } }],
        },
        Verhaal: { rich_text: [{ text: { content: verhaal } }] },
        "Verdieping antwoorden": {
          rich_text: [{ text: { content: a.samenvatting.slice(0, 1900) } }],
        },
        Aanmelddatum: { date: { start: now } },
        "Lead bron": { select: { name: "🌱 Website Onboarding" } },
        "Lead status": { select: { name: "🆕 Nieuw" } },
        "Form Type": { select: { name: "onboarding" } },
        "Source URL": {
          url: "https://www.kaelo-consulting.com/start",
        },
      },
      children: [
        block("heading_2", "Probleem"),
        block("paragraph", d.probleem),
        block("heading_2", "Wat het probleem nu kost"),
        block("paragraph", d.kosten),
        block("heading_2", "Wat het oplossen oplevert"),
        block("paragraph", d.opgelost),
        block("heading_2", "Doel van het bedrijf"),
        block("paragraph", d.doel),
        block("heading_2", "AI-analyse — Samenvatting"),
        block("paragraph", a.samenvatting),
        block("heading_2", "AI-analyse — Drie kansen"),
        ...a.kansen.flatMap((k) => [
          block("heading_3", `${k.titel} — ${k.complexiteit}`),
          block("paragraph", `${k.wat}\n\nVerwachte impact: ${k.impact}`),
        ]),
      ],
    });
    return { ok: true, id: page.id } as const;
  } catch (err) {
    console.error("[Kaelo] Notion schrijven mislukt:", err);
    return { ok: false, reason: "api-error" as const };
  }
}

function block(
  type: "heading_2" | "heading_3" | "paragraph",
  text: string
) {
  const rich_text = [{ type: "text" as const, text: { content: text } }];
  switch (type) {
    case "heading_2":
      return { object: "block" as const, type, heading_2: { rich_text } };
    case "heading_3":
      return { object: "block" as const, type, heading_3: { rich_text } };
    case "paragraph":
      return { object: "block" as const, type, paragraph: { rich_text } };
  }
}
