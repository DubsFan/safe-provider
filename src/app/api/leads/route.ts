import { NextResponse } from "next/server";
import { intakeSchema } from "@/lib/validations/intake";
import { createLead, logEvent } from "@/lib/supabase/leads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = intakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid intake data", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { id } = await createLead(parsed.data);

    await logEvent("lead", id, "lead_created", {
      county_slug: parsed.data.county_slug,
      service_slug: parsed.data.service_slug,
      adults_count: parsed.data.adults_count,
    });

    return NextResponse.json({ leadId: id });
  } catch (err) {
    console.error("Lead creation error:", err);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
