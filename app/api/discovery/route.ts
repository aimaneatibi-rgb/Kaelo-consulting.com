import { NextRequest, NextResponse } from "next/server";
import { DiscoverySchema } from "@/app/lib/schema";
import { analyseDiscovery } from "@/app/lib/analyze";
import { saveLeadToNotion } from "@/app/lib/notion";

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

  // Fire-and-forget Notion write — we don't block the user response on it
  saveLeadToNotion(data, analyse).catch((err) =>
    console.error("[Kaelo] saveLeadToNotion failed:", err)
  );

  return NextResponse.json({ analyse });
}
