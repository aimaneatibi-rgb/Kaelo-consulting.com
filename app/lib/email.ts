import "server-only";
import { Resend } from "resend";
import type { Discovery, Analyse } from "./schema";

/**
 * Stuurt na elke /start submission een notificatie-mail naar
 * KAELO_NOTIFY_TO (default: hallo@kaelo-consulting.com) zodat Kaelo
 * direct weet dat er een lead is.
 *
 * Werkt out-of-the-box met de Resend-sandbox afzender (geen DNS nodig).
 * Voor een professioneel from-adres: verifieer kaelo-consulting.com in
 * je Resend dashboard en overschrijf KAELO_NOTIFY_FROM in Vercel.
 *
 * Env:
 *   RESEND_API_KEY      — verplicht, anders skip (geen error)
 *   KAELO_NOTIFY_FROM   — default: "Kaelo <onboarding@resend.dev>"
 *   KAELO_NOTIFY_TO     — default: "hallo@kaelo-consulting.com"
 */
export async function sendLeadNotification(d: Discovery, a: Analyse) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[Kaelo] RESEND_API_KEY ontbreekt — geen mail-notificatie verstuurd."
    );
    return { ok: false, reason: "missing-env" as const };
  }

  const from =
    process.env.KAELO_NOTIFY_FROM ?? "Kaelo <onboarding@resend.dev>";
  const to = process.env.KAELO_NOTIFY_TO ?? "hallo@kaelo-consulting.com";

  const resend = new Resend(apiKey);
  const subject = `🌱 Nieuwe lead — ${d.bedrijfsnaam} (${d.sector})`;

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html: htmlBody(d, a),
      text: textBody(d, a),
      replyTo: d.email,
    });

    if (result.error) {
      console.error("[Kaelo] Resend send error:", result.error);
      return { ok: false, reason: "api-error" as const };
    }

    return { ok: true, id: result.data?.id } as const;
  } catch (err) {
    console.error("[Kaelo] Resend send mislukt:", err);
    return { ok: false, reason: "api-error" as const };
  }
}

/* -------------------------------------------------------------------------- */
/* HTML + plain text bodies                                                    */
/* -------------------------------------------------------------------------- */

function htmlBody(d: Discovery, a: Analyse): string {
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

  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Nieuwe Kaelo lead</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f5f5f5;line-height:1.55;">
  <div style="max-width:640px;margin:0 auto;padding:32px 24px;">

    <!-- header -->
    <div style="border-left:4px solid #e5ff00;padding-left:16px;margin-bottom:32px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#8a8a8a;margin:0;">Nieuwe lead via /start</p>
      <h1 style="font-size:28px;margin:8px 0 0;color:#f5f5f5;line-height:1.2;">
        ${esc(d.voornaam)} ${esc(d.achternaam)} — ${esc(d.bedrijfsnaam)}<span style="color:#e5ff00;">.</span>
      </h1>
    </div>

    <!-- meta table -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
      <tr><td style="padding:4px 12px 4px 0;color:#8a8a8a;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;vertical-align:top;width:90px;">Sector</td><td style="padding:4px 0;">${esc(d.sector)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#8a8a8a;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Functie</td><td style="padding:4px 0;">${esc(d.functie)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#8a8a8a;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(d.email)}" style="color:#e5ff00;text-decoration:none;">${esc(d.email)}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#8a8a8a;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Tel</td><td style="padding:4px 0;"><a href="tel:${esc(d.telefoon)}" style="color:#e5ff00;text-decoration:none;">${esc(d.telefoon)}</a></td></tr>
    </table>

    <!-- intake content -->
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

    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#5a5a5a;margin-top:24px;">
      Kaelo · Wij bouwen het systeem.
    </p>
  </div>
</body>
</html>`;
}

function section(title: string, body: string): string {
  return `
    <h2 style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#e5ff00;margin:24px 0 8px;">${esc(title)}</h2>
    <p style="margin:0;color:#c5c5c5;white-space:pre-wrap;">${esc(body)}</p>`;
}

function textBody(d: Discovery, a: Analyse): string {
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

Reply op deze mail om direct ${d.voornaam} terug te mailen, of bel: ${d.telefoon}
`;
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
