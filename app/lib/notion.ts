import "server-only";
import { Client } from "@notionhq/client";
import type { Discovery, Analyse } from "./schema";

export async function saveLeadToNotion(d: Discovery, a: Analyse) {
  const token = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    console.warn("[Kaelo] Notion env vars ontbreken — lead niet opgeslagen.");
    return { ok: false, reason: "missing-env" as const };
  }

  const notion = new Client({ auth: token });

  try {
    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Naam: {
          title: [{ text: { content: `${d.voornaam} ${d.achternaam} — ${d.bedrijfsnaam}` } }],
        },
        Email: { email: d.email },
        Telefoon: { phone_number: d.telefoon },
        Bedrijf: { rich_text: [{ text: { content: d.bedrijfsnaam } }] },
        Sector: { rich_text: [{ text: { content: d.sector } }] },
        Omvang: { rich_text: [{ text: { content: d.omvang } }] },
        Samenvatting: { rich_text: [{ text: { content: a.samenvatting.slice(0, 1900) } }] },
        Status: { select: { name: "Nieuw" } },
      },
      children: [
        block("heading_2", "Wat doen ze"),
        block("paragraph", d.bedrijf),
        block("heading_2", "Tijdvreter"),
        block("paragraph", d.tijdvreter),
        block("heading_2", "Doel over 12 maanden"),
        block("paragraph", d.doel),
        block("heading_2", "Wat hebben ze al geprobeerd"),
        block("paragraph", d.geprobeerd),
        block("heading_2", "AI-analyse — Drie kansen"),
        ...a.kansen.flatMap((k) => [
          block("heading_3", `${k.titel} — ${k.complexiteit}`),
          block("paragraph", `${k.wat}\nGeschatte tijdsbesparing: ${k.tijdsbesparing}`),
        ]),
      ],
    });
    return { ok: true, id: page.id } as const;
  } catch (err) {
    console.error("[Kaelo] Notion schrijven mislukt:", err);
    return { ok: false, reason: "api-error" as const };
  }
}

function block(type: "heading_2" | "heading_3" | "paragraph", text: string) {
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
