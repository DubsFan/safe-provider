import { NextResponse } from "next/server";
import { logEvent } from "@/lib/supabase/leads";

export async function POST(request: Request) {
  try {
    const { event, properties } = await request.json();

    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "event required" }, { status: 400 });
    }

    await logEvent("analytics", "anonymous", event, properties ?? {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Event logging error:", err);
    return NextResponse.json({ ok: true }); // Don't fail on analytics
  }
}
