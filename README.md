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

`/api/discovery` schrijft naar een Notion-database met deze property-namen (case sensitive):

- `Naam` — title
- `Email` — email
- `Telefoon` — phone_number
- `Bedrijf` — rich_text
- `Functie` — rich_text
- `Sector` — rich_text
- `Samenvatting` — rich_text
- `Status` — select (met optie `Nieuw`)

Page-body krijgt automatisch de uitgewerkte intake (probleem, kosten, opgelost, doel)
plus de AI-analyse met de drie kansen.

Mailing-workflows zijn losgekoppeld — ze triggeren op `Status` in Notion zelf.
