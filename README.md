# Kaelo

> Wij bouwen het systeem.

De marketing- en sales-site voor [Kaelo](https://www.kaelo-consulting.com) — een AI-build studio voor traditionele bedrijven met een werkvloer.

## Stack

- **Next.js 16** (App router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (CSS-first config via `@theme inline`)
- **Framer Motion** + **Lenis** voor scroll & reveals
- **Anthropic SDK** voor de live AI-discovery
- **Notion SDK** voor lead-opslag in de CRM
- **Zod** voor schema-validatie

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # en vul de keys
npm run dev
```

Site draait op http://localhost:3000.

## Belangrijke routes

| Route | Wat |
|---|---|
| `/` | Homepage — alles in één lange scroll |
| `/start` | AI-discovery formulier (de hoofdconversie) |
| `/manifest` | Founder-stem, waarom Kaelo bestaat |
| `/werk` | Cases (placeholder tot eerste cases af zijn) |
| `/api/discovery` | POST endpoint — leest Discovery, vraagt Claude om 3 kansen, schrijft naar Notion |

## Copy

Alle definitieve copy van de site staat in [`COPY.md`](./COPY.md). Wijzigingen daar = wijzigingen op de site.

## Deploy

Push naar `main` → Vercel deployt automatisch. Zet de env vars uit `.env.example` ook in het Vercel project.

## Notion CRM

De site sluit aan op de **bestaande Kaelo CRM-workspace** in Notion. Geen nieuwe
databases — we schrijven direct in jouw `🌱 Leads` database zodat de Hot Leads / Inbox /
Funnel views meteen werken.

### Setup (eenmalig)
1. Ga naar https://www.notion.so/profile/integrations en maak een **internal
   integration** (kies de workspace waar de Kaelo CRM in staat).
2. Kopieer het **Internal Integration Token** → zet als `NOTION_API_KEY` in `.env.local`
   (en in Vercel project settings).
3. Open de **📊 Kaelo CRM** page in Notion, klik `...` rechtsboven → **Connections** →
   voeg jouw integration toe. Permission inherit dan naar alle child-databases.

### Property-mapping (`/api/discovery` → 🌱 Leads)
- `Naam` (title) ← `${voornaam} ${achternaam} — ${bedrijfsnaam}`
- `Email` ← email
- `Telefoon` ← telefoon
- `Bedrijf (ruw)` ← bedrijfsnaam (raw — gekoppeld bedrijf via Notion-relation komt later)
- `Functie` ← functie
- `Houdt mij wakker` ← probleem
- `Verhaal` ← sector + kosten + opgelost + doel (gecombineerd)
- `Verdieping antwoorden` ← AI-samenvatting
- `Aanmelddatum` ← server timestamp
- `Lead bron` ← `🌱 Website Onboarding`
- `Lead status` ← `🆕 Nieuw`
- `Form Type` ← `onboarding`
- `Source URL` ← https://www.kaelo-consulting.com/start

De page-body krijgt automatisch nette secties: Probleem / Wat het kost /
Wat oplossen oplevert / Doel / AI-samenvatting / Drie kansen.

### Workflow
Nieuwe leads landen automatisch in **🆕 Inbox** + **📊 Funnel** (kolom "🆕 Nieuw").
Hot leads filterview pakt ze op op basis van **Lead Score**.
Bij conversie: maak handmatig een Deal aan (relation gaat automatisch via
`Converted Deal`), en daarna een **🚀 Projecten** record met Lead/Deal/Klant gelinkt.
