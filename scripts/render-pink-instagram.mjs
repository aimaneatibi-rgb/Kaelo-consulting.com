/**
 * 12 Instagram-posts in de pink huisstijl — 1080×1350 (4:5).
 * Vier daarvan zijn carrousels; die leveren meerdere slides op.
 *
 * Run met:  node scripts/render-pink-instagram.mjs
 * Output:   Desktop\Kaelo Brandpack\02 Instagram\
 */

import { chromium } from "playwright";
import path from "node:path";
import os from "node:os";
import { mkdir, writeFile } from "node:fs/promises";

const OUT = path.join(os.homedir(), "Desktop", "Kaelo Brandpack", "02 Instagram");
await mkdir(OUT, { recursive: true });

const W = 1080;
const H = 1350;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Unbounded:wght@500;700;900&family=JetBrains+Mono:wght@500;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:${W}px;height:${H}px;overflow:hidden;}
body{font-family:'Archivo',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
  color:#0B0B0D;background:#FF2EB2;display:flex;flex-direction:column;}
:root{--pink:#FF2EB2;--ink:#0B0B0D;--paper:#FFF4FA;--blue:#2E4EFF;--mint:#8FF5C6;--yellow:#F2FF3D;--lilac:#E4C6FF;}
.pad{padding:76px 72px;flex:1;display:flex;flex-direction:column;}
.top{display:flex;justify-content:space-between;align-items:center;}
.logo{font-family:'Unbounded';font-weight:900;font-size:34px;letter-spacing:-.02em;}
.logo sup{font-size:13px;vertical-align:super;}
.pill{display:inline-flex;align-items:center;gap:10px;font-size:19px;font-weight:800;letter-spacing:.1em;
  text-transform:uppercase;padding:12px 26px;border-radius:999px;background:var(--mint);border:3px solid var(--ink);}
.pill.y{background:var(--yellow);}
.pill.p{background:var(--pink);color:#fff;}
.pill.w{background:#fff;}
h1{font-weight:900;text-transform:uppercase;letter-spacing:-.035em;line-height:.92;font-size:108px;}
h1.sm{font-size:84px;}
h1.xs{font-size:68px;}
.tilt{display:inline-block;background:var(--yellow);padding:0 16px;border-radius:16px;
  transform:rotate(-2.5deg);box-shadow:9px 9px 0 var(--ink);}
.outline{color:transparent;-webkit-text-stroke:4px var(--ink);}
.sub{font-size:30px;font-weight:600;line-height:1.45;margin-top:34px;max-width:820px;}
.foot{display:flex;justify-content:space-between;align-items:center;font-size:20px;font-weight:800;
  text-transform:uppercase;letter-spacing:.1em;}
.bar{background:var(--ink);color:#fff;padding:30px 72px;display:flex;gap:26px;align-items:center;
  font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:.09em;white-space:nowrap;}
.dot{width:14px;height:14px;border-radius:50%;background:var(--pink);flex:none;}
.card{background:#fff;border:4px solid var(--ink);border-radius:30px;padding:38px 36px;box-shadow:11px 11px 0 var(--ink);}
/* Kaartenstapel die de beschikbare hoogte vult i.p.v. een blokje in het midden */
.stack{flex:1;display:flex;flex-direction:column;gap:22px;padding:44px 0 20px;}
.stack .card{flex:1;display:flex;flex-direction:column;justify-content:center;}
.swipe{position:absolute;right:56px;bottom:150px;background:var(--ink);color:#fff;border-radius:999px;
  padding:16px 32px;font-size:21px;font-weight:900;text-transform:uppercase;letter-spacing:.09em;
  display:flex;align-items:center;gap:12px;}
.num{font-family:'Unbounded';font-weight:900;font-size:150px;line-height:.85;letter-spacing:-.04em;}
.mono{font-family:'JetBrains Mono',monospace;}
`;

const shell = (body, bodyStyle = "") =>
  `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>${CSS}</style></head>
   <body style="${bodyStyle}">${body}</body></html>`;

const head = (pill, pillClass = "") =>
  `<div class="top"><div class="logo">kaelo<sup>®</sup></div><span class="pill ${pillClass}">${pill}</span></div>`;

const foot = (l, r = "kaelo-consulting.com") =>
  `<div class="foot"><span>${l}</span><span>${r}</span></div>`;

/* ------------------------------------------------------------------ */
/* De 12 posts — carrousels hebben meerdere slides                     */
/* ------------------------------------------------------------------ */

const posts = [
  {
    id: "01-wij-bouwen-het-systeem",
    caption:
      "Wij bouwen het systeem. Software die werk weghaalt bij MKB en startups — eigen code, vaste prijs, vaste datum.\n\nGeen advertenties. Geen rapporten. Alleen systemen die draaien.\n\n#aibuildstudio #mkbnederland #automatisering #maatwerksoftware",
    slides: [
      shell(`<div class="pad">
        ${head("AI Build Studio")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1>Wij bouwen<br><span class="tilt">het</span> <span class="outline">systeem.</span></h1>
          <p class="sub">Software die het saaie werk doet. Eigen code, vaste prijs, vaste datum.</p>
        </div>
        ${foot("Est. 2025 · NL & BE")}
      </div>
      <div class="bar"><span>Eigen code</span><span class="dot"></span><span>Vaste prijs</span><span class="dot"></span><span>Vaste datum</span></div>`),
    ],
  },

  {
    id: "02-carrousel-2x-vs-10x",
    carousel: true,
    caption:
      "2x is moeilijker dan 10x. Klinkt gek, tot je ziet hoe de meeste bedrijven hun 2x proberen te halen: meer mensen, meer uren, meer rapporten.\n\n10x vraagt juist minder werk. Niet stapelen — weghalen. Swipe voor de rekensom. →\n\n#10x #procesoptimalisatie #ondernemen #mkb",
    slides: [
      shell(`<div class="pad">
        ${head("01 / 05", "y")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1>2x is<br><span class="outline">moeilijker</span><br>dan <span class="tilt">10x</span>.</h1>
        </div>
        ${foot("Swipe →")}
      </div>`),
      shell(`<div class="pad" style="background:var(--ink);color:#fff;">
        ${head("02 / 05", "p")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1 class="sm" style="color:#fff;">Zo probeert<br>iedereen<br><span style="color:var(--pink);">zijn 2x.</span></h1>
          <p class="sub" style="color:rgba(255,255,255,.8);">Meer mensen. Meer uren. Meer rapporten.<br>En precies zó haal je je 10x nooit.</p>
        </div>
        ${foot("Swipe →")}
      </div>`, "background:#0B0B0D;"),
      shell(`<div class="pad" style="background:var(--lilac);">
        ${head("03 / 05", "w")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:26px;">
          <h1 class="sm">Niet<br>stapelen.</h1>
          <h1 class="sm" style="color:#F618A6;">Weghalen.</h1>
        </div>
        ${foot("Swipe →")}
      </div>`, "background:#E4C6FF;"),
      shell(`<div class="pad" style="background:var(--paper);">
        ${head("04 / 05", "y")}
        <div class="stack">
          <div class="card"><div class="num" style="color:#F618A6;">8</div><div style="font-size:26px;font-weight:800;margin-top:10px;">mensen met repetitief werk</div></div>
          <div class="card" style="background:var(--yellow);"><div class="num">2.208</div><div style="font-size:26px;font-weight:800;margin-top:10px;">uur per jaar aan saai werk</div></div>
          <div class="card" style="background:var(--ink);color:#fff;"><div class="num" style="color:var(--mint);">€ 99k</div><div style="font-size:26px;font-weight:800;margin-top:10px;">loonkosten, elk jaar opnieuw</div></div>
        </div>
        ${foot("Swipe →")}
      </div>`, "background:#FFF4FA;"),
      shell(`<div class="pad">
        ${head("05 / 05", "y")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1 class="sm">Dat werk<br>doet zichzelf.<br><span class="outline">Als je het</span><br><span class="tilt">bouwt.</span></h1>
          <p class="sub">Start de gratis audit op kaelo-consulting.com</p>
        </div>
        ${foot("Link in bio")}
      </div>`),
    ],
  },

  {
    id: "03-wat-wij-niet-doen",
    caption:
      "Wat wij niet doen: advertenties, photoshoots, rapporten, powerpoints, uurtje-factuurtje, scope-creep, no-code plakwerk.\n\nAlles wat daar staat leidt af van het enige dat telt: werkende software die werk weghaalt.\n\n#focus #softwareontwikkeling #mkb",
    slides: [
      shell(`<div class="pad" style="background:var(--yellow);">
        ${head("Wat wij niet doen", "w")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;font-weight:900;
                    font-size:60px;text-transform:uppercase;letter-spacing:-.02em;">
          <div style="text-decoration:line-through;">✕ Advertenties</div>
          <div style="text-decoration:line-through;">✕ Photoshoots</div>
          <div style="text-decoration:line-through;">✕ Rapporten</div>
          <div style="text-decoration:line-through;">✕ Powerpoints</div>
          <div style="text-decoration:line-through;">✕ Uurtje-factuurtje</div>
          <div style="text-decoration:line-through;">✕ Scope-creep</div>
          <div style="text-decoration:line-through;">✕ No-code plakwerk</div>
        </div>
        ${foot("Alleen werkende software")}
      </div>`, "background:#F2FF3D;"),
    ],
  },

  {
    id: "04-carrousel-klok-case",
    carousel: true,
    caption:
      "Case: KLOK Works. Uitzendbureaus pakken 25 tot 30% marge op ieder gewerkt uur. Wij bouwden de marktplaats die daar tussenuit gaat.\n\nVacatures en shifts, direct tussen werkgever en werknemer. Voor werknemers gratis — voor altijd. Swipe. →\n\n#case #marktplaats #nextjs #klokworks",
    slides: [
      shell(`<div class="pad" style="background:var(--yellow);">
        ${head("Case 01", "w")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <div class="mono" style="font-size:24px;font-weight:700;margin-bottom:26px;">klokworks.nl · live</div>
          <h1 style="font-size:150px;font-family:'Unbounded';">KLOK</h1>
          <p class="sub" style="font-weight:800;text-transform:uppercase;font-size:32px;">De marktplaats voor werk.<br>Niets meer.</p>
        </div>
        ${foot("Swipe →")}
      </div>`, "background:#F2FF3D;"),
      shell(`<div class="pad" style="background:var(--ink);color:#fff;">
        ${head("Het probleem", "p")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1 class="sm" style="color:#fff;"><span style="color:var(--pink);">25—30%</span><br>marge op<br>ieder uur.</h1>
          <p class="sub" style="color:rgba(255,255,255,.8);">De werkgever betaalt te veel, de werknemer krijgt te weinig — en niemand kan eromheen.</p>
        </div>
        ${foot("Swipe →")}
      </div>`, "background:#0B0B0D;"),
      shell(`<div class="pad" style="background:var(--paper);">
        ${head("Wat we bouwden", "y")}
        <div class="stack">
          <div class="card" style="background:var(--mint);"><div style="font-size:34px;font-weight:900;text-transform:uppercase;">Marktplaats</div><div style="font-size:24px;font-weight:600;margin-top:8px;">Vacatures én shifts, doorzoekbaar op sector en locatie</div></div>
          <div class="card"><div style="font-size:34px;font-weight:900;text-transform:uppercase;">Matching</div><div style="font-size:24px;font-weight:600;margin-top:8px;">Op locatie, ervaring en beschikbaarheid</div></div>
          <div class="card" style="background:var(--lilac);"><div style="font-size:34px;font-weight:900;text-transform:uppercase;">Referral</div><div style="font-size:24px;font-weight:600;margin-top:8px;">€ 1 per gewerkt uur, levenslang</div></div>
        </div>
        ${foot("Swipe →")}
      </div>`, "background:#FFF4FA;"),
      shell(`<div class="pad">
        ${head("Het resultaat", "y")}
        <div class="stack">
          <div class="card" style="background:var(--yellow);"><div class="num">11,5%</div><div style="font-size:26px;font-weight:800;margin-top:10px;">in plaats van 25—30% marge</div></div>
          <div class="card" style="background:var(--mint);"><div class="num">€ 0</div><div style="font-size:26px;font-weight:800;margin-top:10px;">voor werknemers — voor altijd</div></div>
          <div class="card" style="background:var(--ink);color:#fff;"><div class="num" style="color:var(--pink);">8</div><div style="font-size:26px;font-weight:800;margin-top:10px;">sectoren live door heel NL</div></div>
        </div>
        ${foot("Hele case: link in bio")}
      </div>`),
    ],
  },

  {
    id: "05-eigen-code",
    caption:
      "Eigen code, eigen platform. Geen licenties per stoel, geen abonnement dat je gijzelt.\n\nWat we bouwen is van jullie — en groeit met jullie mee.\n\n#eigendom #maatwerk #saas",
    slides: [
      shell(`<div class="pad" style="background:var(--blue);color:#fff;">
        ${head("Eigendom", "y")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1 style="color:#fff;">Eigen code.<br><span style="color:var(--yellow);">Jullie<br>eigendom.</span></h1>
          <p class="sub" style="color:rgba(255,255,255,.85);">Geen licenties per stoel. Geen abonnement dat je gijzelt.</p>
        </div>
        ${foot("kaelo-consulting.com")}
      </div>`, "background:#2E4EFF;"),
    ],
  },

  {
    id: "06-carrousel-vier-stappen",
    carousel: true,
    caption:
      "Zo werken we. Vier stappen, geen omwegen — van eerste gesprek tot draaiend systeem, met een vaste prijs en een vaste datum.\n\nSwipe voor de hele route. →\n\n#werkwijze #projectmanagement #softwareontwikkeling",
    slides: [
      shell(`<div class="pad" style="background:var(--mint);">
        ${head("Zo werken we", "w")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1>Vier stappen.<br><span class="outline">Geen</span><br><span class="tilt">omwegen.</span></h1>
        </div>
        ${foot("Swipe →")}
      </div>`, "background:#8FF5C6;"),
      ...[
        ["01", "Vertel ons over je bedrijf", "Een paar korte vragen op de site. Jij in je eigen woorden — geen vragenlijst van 40 vragen.", "± 5 min", "#FFF4FA"],
        ["02", "Kennismaking + offerte", "Een gesprek mens-tot-mens. Daarna een concrete roadmap met vaste prijs en vaste opleverdatum.", "Binnen 5 werkdagen", "#E4C6FF"],
        ["03", "We staan dicht op je werkdag", "Korte demo's, snelle reactie, geen verstop-acts. Bij een complex systeem draaien we een halve dag mee.", "Doorlopend", "#F2FF3D"],
        ["04", "Wij bouwen, jij draait", "Wekelijkse demo. Snel als het kan, langer als het project dat vraagt — maar altijd op de afgesproken datum.", "Vaste datum", "#FFF4FA"],
      ].map(([n, t, d, tag, bg]) =>
        shell(`<div class="pad" style="background:${bg};">
          ${head(`Stap ${n}`, "p")}
          <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
            <div class="num" style="color:#F618A6;">${n}</div>
            <h1 class="xs" style="margin-top:18px;">${t}.</h1>
            <p class="sub">${d}</p>
            <div style="margin-top:34px;"><span class="pill w">${tag}</span></div>
          </div>
          ${foot(n === "04" ? "Link in bio" : "Swipe →")}
        </div>`, `background:${bg};`)
      ),
    ],
  },

  {
    id: "07-panvia-case",
    caption:
      "Case: Panvia. Vastgoed rechtstreeks van eigenaar naar koper — één vaste prijs, € 0 courtage.\n\nBij een verkoopprijs van € 450.000 scheelt dat € 7.273. Platform én huisstijl door ons gebouwd.\n\n#case #vastgoed #platform #panvia",
    slides: [
      shell(`<div class="pad" style="background:var(--blue);color:#fff;">
        ${head("Case 02", "y")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <div class="mono" style="font-size:24px;font-weight:700;margin-bottom:24px;">panvia.nl · live</div>
          <h1 style="font-size:128px;font-family:'Unbounded';color:#fff;">Panvia</h1>
          <div style="display:flex;gap:20px;margin-top:44px;">
            <div class="card" style="flex:1;color:#0B0B0D;"><div style="font-size:22px;font-weight:800;text-transform:uppercase;opacity:.6;">Via makelaar</div><div class="num" style="font-size:76px;margin-top:10px;">€ 8.168</div></div>
            <div class="card" style="flex:1;background:var(--yellow);color:#0B0B0D;"><div style="font-size:22px;font-weight:800;text-transform:uppercase;opacity:.7;">Via Panvia</div><div class="num" style="font-size:76px;margin-top:10px;">€ 895</div></div>
          </div>
          <p class="sub" style="color:#fff;font-weight:800;">Dat verschil is van jou: € 7.273.</p>
        </div>
        ${foot("Hele case: link in bio")}
      </div>`, "background:#2E4EFF;"),
    ],
  },

  {
    id: "08-ai-inzet",
    caption:
      "AI inzetten zonder hype. Wij scannen waar AI bij jullie écht omzet oplevert, trainen het team en bouwen het in.\n\nGeen speeltjes — agents die werk overnemen, met een mens die goedkeurt.\n\n#ai #aiagents #automatisering #mkb",
    slides: [
      shell(`<div class="pad" style="background:var(--mint);">
        ${head("AI-inzet", "p")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1 class="sm">AI die<br><span class="outline">werk</span><br><span class="tilt">overneemt.</span></h1>
          <p class="sub">Kansen-scan, training en implementatie. Zonder hype, zonder speeltjes.</p>
          <div style="display:flex;gap:14px;margin-top:36px;flex-wrap:wrap;">
            <span class="pill w">Kansen-scan</span><span class="pill w">Training</span><span class="pill w">Implementatie</span>
          </div>
        </div>
        ${foot("kaelo-consulting.com")}
      </div>`, "background:#8FF5C6;"),
    ],
  },

  {
    id: "09-carrousel-wat-het-oplevert",
    carousel: true,
    caption:
      "Niet wat we doen — wat het oplevert. Tijd terug, eigendom en rust.\n\nEen zaak die draait, ook zonder dat jij er staat. Swipe. →\n\n#ondernemen #groei #mkbnederland",
    slides: [
      shell(`<div class="pad">
        ${head("01 / 04", "y")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1 class="sm">Niet wat<br>we doen.<br><span class="tilt">Wat het</span><br><span class="outline">oplevert.</span></h1>
        </div>
        ${foot("Swipe →")}
      </div>`),
      ...[
        ["Tijd terug.", "Het saaie werk doet zichzelf. De uren die vrijkomen gaan naar klanten, product en groei.", "#F2FF3D"],
        ["Eigendom.", "Eigen code, eigen platform. Wat we bouwen is van jullie en groeit met jullie mee.", "#8FF5C6"],
        ["Rust.", "Eén afspraak per project: datum, prijs, deliverable. En daarna een bouwer die blijft.", "#E4C6FF"],
      ].map(([t, d, bg], i) =>
        shell(`<div class="pad" style="background:${bg};">
          ${head(`0${i + 2} / 04`, "w")}
          <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
            <div class="num" style="color:#F618A6;">0${i + 1}</div>
            <h1 style="margin-top:16px;">${t}</h1>
            <p class="sub">${d}</p>
          </div>
          ${foot(i === 2 ? "Link in bio" : "Swipe →")}
        </div>`, `background:${bg};`)
      ),
    ],
  },

  {
    id: "10-vaste-prijs-vaste-datum",
    caption:
      "Wat we afspreken, leveren we. Geen vage timelines, geen scope-creep.\n\nEén vaste afspraak per project: datum, prijs, deliverable. Iets werkt niet? Dat gaan we regelen.\n\n#belofte #vasteprijs #softwareontwikkeling",
    slides: [
      shell(`<div class="pad" style="background:var(--ink);color:#fff;">
        ${head("De belofte", "p")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1 style="color:#fff;">Wat we<br>afspreken,<br><span style="color:var(--pink);">leveren we.</span></h1>
          <div style="display:flex;gap:16px;margin-top:44px;flex-wrap:wrap;">
            <span class="pill">Vaste datum</span><span class="pill y">Vaste prijs</span><span class="pill">Eén deliverable</span>
          </div>
        </div>
        ${foot("kaelo-consulting.com")}
      </div>`, "background:#0B0B0D;"),
    ],
  },

  {
    id: "11-voor-wie",
    caption:
      "Voor wie wij bouwen: heel MKB Nederland — installatie, productie, logistiek, groothandel, dienstverlening, zorg, retail. Plus startups met grote doelen.\n\nNiet voor: wie een rapport wil. Wij leveren werkende software.\n\n#mkbnederland #voorwie",
    slides: [
      shell(`<div class="pad" style="background:var(--paper);">
        ${head("Voor wie", "p")}
        <div class="stack">
          <div class="card" style="background:var(--mint);">
            <div style="font-size:32px;font-weight:900;text-transform:uppercase;">Wel ✓</div>
            <div style="font-size:27px;font-weight:600;margin-top:12px;line-height:1.45;">Heel MKB Nederland — installatie, productie, logistiek, groothandel, dienstverlening, zorg, retail. Plus startups met grote doelen.</div>
          </div>
          <div class="card" style="background:var(--ink);color:#fff;">
            <div style="font-size:32px;font-weight:900;text-transform:uppercase;">Niet ✕</div>
            <div style="font-size:27px;font-weight:600;margin-top:12px;line-height:1.45;">Pre-revenue startups zonder concreet probleem. En wie een rapport wil — wij leveren werkende software.</div>
          </div>
        </div>
        ${foot("kaelo-consulting.com")}
      </div>`, "background:#FFF4FA;"),
    ],
  },

  {
    id: "12-start-de-audit",
    caption:
      "Klaar? Begin met de audit. Zes korte vragen, ± 5 minuten. Je krijgt direct een eerste analyse van waar tijd verloren gaat.\n\nGeen verplichtingen, geen kosten. Link in bio.\n\n#audit #gratis #mkb #automatisering",
    slides: [
      shell(`<div class="pad">
        ${head("Klaar?", "y")}
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
          <h1>Begin met<br><span class="outline">de</span> <span class="tilt">audit.</span></h1>
          <p class="sub">Zes korte vragen, ± 5 minuten. Direct een eerste analyse van waar tijd verloren gaat.</p>
          <div style="display:flex;gap:14px;margin-top:36px;flex-wrap:wrap;">
            <span class="pill w">Geen verplichtingen</span><span class="pill w">Geen kosten</span>
          </div>
        </div>
        ${foot("Link in bio", "kaelo-consulting.com/start")}
      </div>
      <div class="bar"><span>Start de audit</span><span class="dot"></span><span>kaelo-consulting.com</span></div>`),
    ],
  },
];

/* ------------------------------------------------------------------ */

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

let files = 0;
try {
  for (const post of posts) {
    for (let i = 0; i < post.slides.length; i++) {
      const name =
        post.slides.length > 1
          ? `${post.id}-slide-${String(i + 1).padStart(2, "0")}.png`
          : `${post.id}.png`;
      await page.setContent(post.slides[i], { waitUntil: "networkidle" });
      await page.waitForTimeout(650);
      await page.screenshot({ path: path.join(OUT, name), type: "png" });
      console.log("→", name);
      files++;
    }
  }

  const captions = posts
    .map((p, i) => {
      const kind = p.carousel ? `CARROUSEL (${p.slides.length} slides)` : "LOSSE POST";
      return `POST ${String(i + 1).padStart(2, "0")} — ${kind}\nBestand: ${p.id}\n\n${p.caption}\n\n${"—".repeat(60)}\n`;
    })
    .join("\n");

  await writeFile(
    path.join(OUT, "captions.txt"),
    `KAELO — 12 INSTAGRAM-POSTS (1080x1350)\nGerenderd met scripts/render-pink-instagram.mjs\n\n${"=".repeat(60)}\n\n${captions}`,
    "utf8"
  );
  console.log("→ captions.txt");
  console.log(`done — ${files} afbeeldingen, ${posts.length} posts`);
} catch (e) {
  console.error("fatal:", e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
