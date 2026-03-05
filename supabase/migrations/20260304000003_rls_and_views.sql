-- Enable RLS on all tables
ALTER TABLE counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_log ENABLE ROW LEVEL SECURITY;

-- Public read policies (narrow)
CREATE POLICY "Public can read live counties" ON counties FOR SELECT USING (launch_status = 'live');
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public can read rate cards" ON rate_cards FOR SELECT USING (true);

-- Anon insert on leads (public intake form)
CREATE POLICY "Anon can insert leads" ON leads FOR INSERT WITH CHECK (true);

-- Anon insert on event_log (public analytics)
CREATE POLICY "Anon can insert events" ON event_log FOR INSERT WITH CHECK (true);

-- Views
CREATE OR REPLACE VIEW public_rate_cards AS
SELECT
  c.slug AS county_slug,
  c.name AS county_name,
  s.slug AS service_slug,
  s.name AS service_name,
  rc.intake_per_adult_cents,
  rc.hourly_rate_cents,
  rc.exchange_fee_cents,
  rc.platform_fee_cents
FROM rate_cards rc
JOIN counties c ON c.id = rc.county_id
JOIN services s ON s.id = rc.service_id
WHERE c.launch_status = 'live' AND s.active = true;

CREATE OR REPLACE VIEW admin_lead_summary AS
SELECT
  l.id,
  l.county_slug,
  l.service_slug,
  l.petitioner_first,
  l.petitioner_last,
  l.email,
  l.phone,
  l.status,
  ch.total_cents,
  ch.payment_status,
  l.created_at
FROM leads l
LEFT JOIN checkouts ch ON ch.lead_id = l.id;

CREATE OR REPLACE VIEW admin_payout_queue AS
SELECT
  cs.id AS case_id,
  cs.county_slug,
  cs.service_slug,
  cs.provider_status,
  cs.provider_gross_cents,
  cs.platform_fee_cents,
  p.status AS payout_status,
  p.amount_cents AS payout_amount_cents,
  cs.created_at AS case_created_at
FROM cases cs
LEFT JOIN payouts p ON p.case_id = cs.id;
