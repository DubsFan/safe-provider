-- Document uploads attached to leads
CREATE TABLE lead_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  label text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size_bytes bigint,
  mime_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_lead_documents_lead_id ON lead_documents(lead_id);

-- RLS: service role can do everything, anon can insert (for intake uploads)
ALTER TABLE lead_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_lead_documents"
  ON lead_documents FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "service_role_all_lead_documents"
  ON lead_documents FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
