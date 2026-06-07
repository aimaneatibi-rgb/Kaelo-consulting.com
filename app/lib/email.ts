import "server-only";
import { Resend } from "resend";
import type { Discovery, Analyse } from "./schema";

/**
 * Mail-transport voor de Kaelo-site via Resend.
 * Werkt voor ALLE formulieren op de site — /start (audit) en eventuele
 * toekomstige contactformulieren — zodat alles in hallo@kaelo-consulting.com
 * (en dus in de gekoppelde Gmail) terechtkomt.
 *
 * Env vars (in Vercel):
 *   RESEND_API_KEY      — verplicht. Account: https://resend.com (free 100/dag)
 *   KAELO_NOTIFY_FROM   — optioneel, default: "Kaelo <onboarding@resend.dev>"
 *                         werkt direct, zonder DNS. Voor mooi from-adres:
 *                         verifieer kaelo-consulting.com in Resend dashboard,
 *                         daarna: "Kaelo Leads <hallo@kaelo-consulting.com>"
 *   KAELO_NOTIFY_TO     — optioneel, default: "hallo@kaelo-consulting.com"
 */

let cachedClient: Resend | null = null;
function getClient(): Resend | null {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  cachedClient = new Resend(apiKey);
  return cachedClient;
}

function envFrom() {
  return process.env.KAELO_NOTIFY_FROM ?? "Kaelo <onboarding@resend.dev>";
}
function envTo() {
  return process.env.KAELO_NOTIFY_TO ?? "hallo@kaelo-consulting.com";
}

type SendResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "missing-env" | "api-error" };

/* -------------------------------------------------------------------------- */
/* /start — audit lead-notificatie                                             */
/* -------------------------------------------------------------------------- */

export async function sendLeadNotification(
  d: Discovery,
  a: Analyse
): Promise<SendResult> {
  const client = getClient();
  if (!client) {
    console.warn("[Kaelo] RESEND_API_KEY ontbreekt — lead-mail overgeslagen.");
    return { ok: false, reason: "missing-env" };
  }

  try {
    const result = await client.emails.send({
      from: envFrom(),
      to: envTo(),
      replyTo: d.email,
      subject: `🌱 Nieuwe lead — ${d.bedrijfsnaam} (${d.sector})`,
      html: leadHtml(d, a),
      text: leadText(d, a),
    });
    if (result.error) {
      console.error("[Kaelo] Resend lead-mail error:", result.error);
      return { ok: false, reason: "api-error" };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    console.error("[Kaelo] Resend lead-mail mislukt:", err);
    return { ok: false, reason: "api-error" };
  }
}

/* -------------------------------------------------------------------------- */
/* /start — auto-bedankje naar de prospect zelf                                */
/* -------------------------------------------------------------------------- */

export async function sendThankYouToLead(d: Discovery): Promise<SendResult> {
  const client = getClient();
  if (!client) {
    console.warn("[Kaelo] RESEND_API_KEY ontbreekt — thank-you mail overgeslagen.");
    return { ok: false, reason: "missing-env" };
  }

  try {
    const result = await client.emails.send({
      from: envFrom(),
      to: d.email,
      // Replies van de prospect gaan naar Kaelo's inbox
      replyTo: envTo(),
      subject: `Bedankt, ${d.voornaam} — we lezen je verhaal`,
      html: thankYouHtml(d),
      text: thankYouText(d),
    });
    if (result.error) {
      console.error("[Kaelo] Resend thank-you error:", result.error);
      return { ok: false, reason: "api-error" };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    console.error("[Kaelo] Resend thank-you mislukt:", err);
    return { ok: false, reason: "api-error" };
  }
}

/* -------------------------------------------------------------------------- */
/* Generiek — voor /contact en andere formulieren                              */
/* -------------------------------------------------------------------------- */

export type ContactMessage = {
  /** Onderwerp dat in de inbox verschijnt. Krijgt 💬 prefix. */
  subject: string;
  /** Naam van de afzender. */
  naam: string;
  /** Email van de afzender (gebruikt als reply-to). */
  email: string;
  /** Optionele velden voor extra context. */
  bedrijf?: string;
  telefoon?: string;
  /** Hoofdtekst van het bericht. */
  bericht: string;
  /** Optioneel — waar op de site is dit ingevuld (bv. "/contact"). */
  bron?: string;
};

export async function sendContactMessage(
  m: ContactMessage
): Promise<SendResult> {
  const client = getClient();
  if (!client) {
    console.warn("[Kaelo] RESEND_API_KEY ontbreekt — contact-mail overgeslagen.");
    return { ok: false, reason: "missing-env" };
  }

  try {
    const result = await client.emails.send({
      from: envFrom(),
      to: envTo(),
      replyTo: m.email,
      subject: `💬 ${m.subject} — ${m.naam}`,
      html: contactHtml(m),
      text: contactText(m),
    });
    if (result.error) {
      console.error("[Kaelo] Resend contact-mail error:", result.error);
      return { ok: false, reason: "api-error" };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    console.error("[Kaelo] Resend contact-mail mislukt:", err);
    return { ok: false, reason: "api-error" };
  }
}

/* -------------------------------------------------------------------------- */
/* HTML + text bodies                                                          */
/* -------------------------------------------------------------------------- */

function leadHtml(d: Discovery, a: Analyse): string {
  const kansenHtml = a.kansen
    .map(
      (k, i) => `
    <div style="border-left:2px solid #e5ff00;padding:4px 0 4px 16px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#999;">${i + 1}. ${esc(k.complexiteit)}</div>
      <div style="font-size:17px;font-weight:600;margin-top:6px;color:#f5f5f5;">${esc(k.titel)}</div>
      <div style="color:#c5c5c5;margin-top:8px;line-height:1.5;">${esc(k.wat)}</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#e5ff00;margin-top:8px;">→ ${esc(k.impact)}</div>
    </div>`
    )
    .join("");

  return wrap(
    `Nieuwe lead via /start`,
    `${esc(d.voornaam)} ${esc(d.achternaam)} — ${esc(d.bedrijfsnaam)}`,
    `
    <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
      ${metaRow("Sector", esc(d.sector))}
      ${metaRow("Functie", esc(d.functie))}
      ${metaRow("Email", `<a href="mailto:${esc(d.email)}" style="color:#e5ff00;text-decoration:none;">${esc(d.email)}</a>`)}
      ${metaRow("Tel", `<a href="tel:${esc(d.telefoon)}" style="color:#e5ff00;text-decoration:none;">${esc(d.telefoon)}</a>`)}
    </table>

    ${section("Probleem", d.probleem)}
    ${section("Wat het probleem nu kost", d.kosten)}
    ${section("Wat oplossen oplevert", d.opgelost)}
    ${section("Doel", d.doel)}

    <hr style="border:none;border-top:1px solid #1f1f1f;margin:32px 0;" />

    <h2 style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#8a8a8a;margin:0 0 8px;">AI-analyse — samenvatting</h2>
    <p style="margin:0 0 24px;color:#f5f5f5;font-style:italic;">${esc(a.samenvatting)}</p>

    <h2 style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#8a8a8a;margin:0 0 16px;">Drie kansrichtingen</h2>
    ${kansenHtml}

    <hr style="border:none;border-top:1px solid #1f1f1f;margin:32px 0;" />

    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8a8a8a;">
      → Reply op deze mail om direct ${esc(d.voornaam)} terug te mailen.<br />
      Of bel: <a href="tel:${esc(d.telefoon)}" style="color:#e5ff00;text-decoration:none;">${esc(d.telefoon)}</a>
    </p>
  `
  );
}

function leadText(d: Discovery, a: Analyse): string {
  const kansen = a.kansen
    .map(
      (k, i) =>
        `${i + 1}. ${k.titel}  (${k.complexiteit})\n   ${k.wat}\n   → ${k.impact}`
    )
    .join("\n\n");

  return `NIEUWE LEAD VIA /start

${d.voornaam} ${d.achternaam} — ${d.bedrijfsnaam}

Sector:   ${d.sector}
Functie:  ${d.functie}
Email:    ${d.email}
Tel:      ${d.telefoon}

PROBLEEM
${d.probleem}

WAT HET PROBLEEM NU KOST
${d.kosten}

WAT OPLOSSEN OPLEVERT
${d.opgelost}

DOEL
${d.doel}

---

AI-ANALYSE
${a.samenvatting}

DRIE KANSRICHTINGEN

${kansen}

---

Reply om direct ${d.voornaam} te mailen, of bel: ${d.telefoon}
`;
}

function thankYouHtml(d: Discovery): string {
  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Bedankt — Kaelo</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f5f5f5;line-height:1.55;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">

    <!-- Kaelo wordmark -->
    <div style="margin-bottom:40px;">
      <span style="font-size:36px;font-weight:600;letter-spacing:-0.04em;color:#f5f5f5;">Kaelo</span><span style="font-size:36px;font-weight:600;color:#e5ff00;">.</span>
    </div>

    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8a8a8a;margin:0 0 16px;">
      We hebben je verhaal binnen
    </p>

    <h1 style="font-size:36px;margin:0 0 24px;color:#f5f5f5;line-height:1.15;letter-spacing:-0.02em;">
      Bedankt, ${esc(d.voornaam)}<span style="color:#e5ff00;">.</span>
    </h1>

    <p style="font-size:17px;color:#c5c5c5;margin:0 0 16px;">
      We hebben je verhaal over <strong style="color:#f5f5f5;">${esc(d.bedrijfsnaam)}</strong> goed ontvangen. We lezen het rustig door.
    </p>

    <p style="font-size:17px;color:#c5c5c5;margin:0 0 32px;">
      <strong style="color:#f5f5f5;">Binnen één werkdag</strong> nemen we persoonlijk contact op met de drie richtingen waar wij voor jullie zouden beginnen — en hoe we dat concreet aanpakken.
    </p>

    <hr style="border:none;border-top:1px solid #1f1f1f;margin:32px 0;" />

    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#e5ff00;margin:0 0 12px;">
      Vragen tussendoor?
    </p>
    <p style="font-size:15px;color:#c5c5c5;margin:0 0 8px;">
      Mail rechtstreeks: <a href="mailto:hallo@kaelo-consulting.com" style="color:#e5ff00;text-decoration:none;">hallo@kaelo-consulting.com</a>
    </p>
    <p style="font-size:15px;color:#c5c5c5;margin:0 0 32px;">
      Of bel: <a href="tel:+31621365990" style="color:#e5ff00;text-decoration:none;">+31 6 21 36 59 90</a>
    </p>

    <hr style="border:none;border-top:1px solid #1f1f1f;margin:32px 0;" />

    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#5a5a5a;margin:0;">
      Kaelo · Wij bouwen het systeem.
    </p>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.15em;color:#5a5a5a;margin:8px 0 0;">
      <a href="https://www.kaelo-consulting.com" style="color:#5a5a5a;text-decoration:none;">kaelo-consulting.com</a>
    </p>
  </div>
</body>
</html>`;
}

function thankYouText(d: Discovery): string {
  return `Bedankt, ${d.voornaam}.

We hebben je verhaal over ${d.bedrijfsnaam} goed ontvangen. We lezen het rustig door.

Binnen één werkdag nemen we persoonlijk contact op met de drie richtingen waar wij voor jullie zouden beginnen — en hoe we dat concreet aanpakken.

---

Vragen tussendoor?
Mail rechtstreeks: hallo@kaelo-consulting.com
Of bel: +31 6 21 36 59 90

---

Kaelo · Wij bouwen het systeem.
kaelo-consulting.com
`;
}

function contactHtml(m: ContactMessage): string {
  return wrap(
    `Nieuw bericht${m.bron ? ` via ${esc(m.bron)}` : ""}`,
    `${esc(m.naam)}${m.bedrijf ? ` — ${esc(m.bedrijf)}` : ""}`,
    `
    <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
      ${metaRow("Onderwerp", esc(m.subject))}
      ${m.bedrijf ? metaRow("Bedrijf", esc(m.bedrijf)) : ""}
      ${metaRow("Email", `<a href="mailto:${esc(m.email)}" style="color:#e5ff00;text-decoration:none;">${esc(m.email)}</a>`)}
      ${m.telefoon ? metaRow("Tel", `<a href="tel:${esc(m.telefoon)}" style="color:#e5ff00;text-decoration:none;">${esc(m.telefoon)}</a>`) : ""}
      ${m.bron ? metaRow("Bron", esc(m.bron)) : ""}
    </table>

    ${section("Bericht", m.bericht)}

    <hr style="border:none;border-top:1px solid #1f1f1f;margin:32px 0;" />

    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8a8a8a;">
      → Reply op deze mail om direct ${esc(m.naam)} terug te mailen.
    </p>
  `
  );
}

function contactText(m: ContactMessage): string {
  return `NIEUW BERICHT${m.bron ? ` VIA ${m.bron}` : ""}

${m.naam}${m.bedrijf ? ` — ${m.bedrijf}` : ""}

Onderwerp: ${m.subject}
Email:     ${m.email}
${m.telefoon ? `Tel:       ${m.telefoon}\n` : ""}${m.bron ? `Bron:      ${m.bron}\n` : ""}
BERICHT
${m.bericht}

---

Reply om direct ${m.naam} te mailen.
`;
}

/* -------------------------------------------------------------------------- */
/* shared helpers                                                              */
/* -------------------------------------------------------------------------- */

function wrap(eyebrow: string, title: string, body: string): string {
  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(eyebrow)}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f5f5f5;line-height:1.55;">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px;">
    <div style="border-left:4px solid #e5ff00;padding-left:16px;margin-bottom:32px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8a8a8a;margin:0;">${eyebrow}</p>
      <h1 style="font-size:28px;margin:8px 0 0;color:#f5f5f5;line-height:1.2;">
        ${title}<span style="color:#e5ff00;">.</span>
      </h1>
    </div>
    ${body}
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#5a5a5a;margin-top:24px;">
      Kaelo · Wij bouwen het systeem.
    </p>
  </div>
</body>
</html>`;
}

function metaRow(label: string, valueHtml: string): string {
  return `<tr><td style="padding:4px 12px 4px 0;color:#8a8a8a;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;vertical-align:top;width:90px;">${esc(label)}</td><td style="padding:4px 0;">${valueHtml}</td></tr>`;
}

function section(title: string, body: string): string {
  return `
    <h2 style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#e5ff00;margin:24px 0 8px;">${esc(title)}</h2>
    <p style="margin:0;color:#c5c5c5;white-space:pre-wrap;">${esc(body)}</p>`;
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
