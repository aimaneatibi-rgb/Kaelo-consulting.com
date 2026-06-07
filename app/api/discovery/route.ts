import { NextRequest, NextResponse } from "next/server";
import { DiscoverySchema } from "@/app/lib/schema";
import { analyseDiscovery } from "@/app/lib/analyze";
import { saveLeadToNotion } from "@/app/lib/notion";
import { sendLeadNotification } from "@/app/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const parsed = DiscoverySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const analyse = await analyseDiscovery(data);

  // Await side effects — fire-and-forget gets killed by the serverless runtime
  // before the outbound HTTP calls (Resend, Notion) complete, so we lose mails
  // silently. Adds ~500ms-1s to the response, which is fine for an intake form.
  const results = await Promise.allSettled([
    saveLeadToNotion(data, analyse),
    sendLeadNotification(data, analyse),
  ]);
  results.forEach((r, i) => {
    const name = i === 0 ? "Notion" : "Resend";
    if (r.status === "rejected") {
      console.error(`[Kaelo] ${name} side-effect failed:`, r.reason);
    } else if (!r.value.ok) {
      console.warn(`[Kaelo] ${name} skipped: ${r.value.reason}`);
    } else {
      console.info(`[Kaelo] ${name} ok${"id" in r.value && r.value.id ? ` (${r.value.id})` : ""}`);
    }
  });

  return NextResponse.json({ analyse });
}
