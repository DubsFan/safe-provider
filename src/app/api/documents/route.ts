import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const leadId = formData.get("leadId") as string | null;
    const label = formData.get("label") as string | null;

    if (!file || !leadId || !label) {
      return NextResponse.json(
        { error: "Missing file, leadId, or label" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 10MB." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed. Use PDF, JPG, PNG, HEIC, or Word documents." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();

    // Upload to Supabase Storage
    const ext = file.name.split(".").pop() || "bin";
    const storagePath = `${leadId}/${Date.now()}-${label.replace(/\s+/g, "_")}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("intake-documents")
      .upload(storagePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("intake-documents")
      .getPublicUrl(storagePath);

    // Insert record into lead_documents
    const { data: doc, error: dbError } = await supabase
      .from("lead_documents")
      .insert({
        lead_id: leadId,
        label,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_size_bytes: file.size,
        mime_type: file.type,
      })
      .select("id, label, file_name, file_url")
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save document record" },
        { status: 500 }
      );
    }

    return NextResponse.json({ document: doc });
  } catch (err) {
    console.error("Document upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}
