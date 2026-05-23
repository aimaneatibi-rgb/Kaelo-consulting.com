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

  // Fire-and-forget side effects — don't block the user response on them
  void Promise.allSettled([
    saveLeadToNotion(data, analyse),
    sendLeadNotification(data, analyse),
  ]).then((results) => {
    results.forEach((r, i) => {
      const name = i === 0 ? "Notion" : "Resend";
      if (r.status === "rejected") {
        console.error(`[Kaelo] ${name} side-effect failed:`, r.reason);
      } else if (!r.value.ok) {
        console.warn(`[Kaelo] ${name} skipped: ${r.value.reason}`);
      }
    });
  });

  return NextResponse.json({ analyse });
}
