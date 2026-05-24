import "server-only";
import type { Discovery, Analyse } from "./schema";

/**
 * Stuurt na elke /start submission een notificatie-mail naar
 * hallo@kaelo-consulting.com (of het adres in KAELO_NOTIFY_TO) via
 * Formsubmit.co — een gratis form-to-email proxy.
 *
 * Setup:
 *   1. Eerste keer dat een lead binnenkomt krijgt hallo@kaelo-consulting.com
 *      een bevestigings-mail van Formsubmit ("Confirm your email").
 *   2. Klik die link één keer aan.
 *   3. Vanaf dan komt elke ingevulde /start direct in je inbox.
 *
 * Geen account. Geen API-key. Geen DNS. Geen env vars (KAELO_NOTIFY_TO is optioneel).
 */
export async function sendLeadNotification(d: Discovery, a: Analyse) {
  const target = process.env.KAELO_NOTIFY_TO ?? "hallo@kaelo-consulting.com";

  const payload = {
    _subject: `Nieuwe lead — ${d.bedrijfsnaam} (${d.sector})`,
    _replyto: d.email,
    _template: "table",
    _captcha: "false",

    Naam: `${d.voornaam} ${d.achternaam}`,
    Bedrijf: d.bedrijfsnaam,
    Functie: d.functie,
    Sector: d.sector,
    Email: d.email,
    Telefoon: d.telefoon,

    "1 — Probleem": d.probleem,
    "2 — Wat het probleem nu kost": d.kosten,
    "3 — Wat oplossen oplevert": d.opgelost,
    "4 — Doel": d.doel,

    "AI — Samenvatting": a.samenvatting,
    "Kans 1": fmtKans(a.kansen[0]),
    "Kans 2": fmtKans(a.kansen[1]),
    "Kans 3": fmtKans(a.kansen[2]),
  };

  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(target)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error(
        `[Kaelo] Formsubmit failed (${res.status}):`,
        await res.text().catch(() => "")
      );
      return { ok: false, reason: "api-error" as const };
    }

    return { ok: true } as const;
  } catch (err) {
    console.error("[Kaelo] Formsubmit error:", err);
    return { ok: false, reason: "api-error" as const };
  }
}

function fmtKans(k: Analyse["kansen"][number]): string {
  return `${k.titel} [${k.complexiteit}] — ${k.wat} (impact: ${k.impact})`;
}
