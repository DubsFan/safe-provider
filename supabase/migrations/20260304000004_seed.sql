-- Seed: 5 counties, 2 services, 10 rate cards (idempotent)

INSERT INTO counties (slug, name, courthouse_name, courthouse_address, court_source_url, local_note, launch_status, noindex, sort_order)
VALUES
  ('santa-clara', 'Santa Clara County', 'Santa Clara County Family Court Center', '201 N First Street, San Jose, CA 95113', 'https://santaclara.courts.ca.gov/system/files/family/svp_sccounty.pdf', 'SafePair is listed as a provider for Santa Clara County on the court''s official supervised visitation provider list.', 'live', false, 1),
  ('alameda', 'Alameda County', 'Alameda County Superior Court, Family Law Division', '1221 Oak Street, Oakland, CA 94612', NULL, 'SafePair serves families in Alameda County for supervised visitation and custody exchange.', 'live', false, 2),
  ('contra-costa', 'Contra Costa County', 'Contra Costa County Superior Court', '751 Pine Street, Martinez, CA 94553', NULL, 'SafePair serves families in Contra Costa County for supervised visitation and custody exchange.', 'live', false, 3),
  ('san-francisco', 'San Francisco County', 'San Francisco Superior Court, Unified Family Court', '400 McAllister Street, San Francisco, CA 94102', NULL, 'SafePair serves families in San Francisco County for supervised visitation and custody exchange.', 'live', false, 4),
  ('marin', 'Marin County', NULL, NULL, NULL, NULL, 'draft', true, 5)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  courthouse_name = EXCLUDED.courthouse_name,
  courthouse_address = EXCLUDED.courthouse_address,
  court_source_url = EXCLUDED.court_source_url,
  local_note = EXCLUDED.local_note,
  launch_status = EXCLUDED.launch_status,
  noindex = EXCLUDED.noindex,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, min_hours, active)
VALUES
  ('supervised-visitation', 'Supervised Visitation', 'A trained, neutral third-party monitor is present during a parent''s time with their child.', 2, true),
  ('supervised-exchange', 'Supervised Exchange', 'A trained, neutral third-party facilitates the handoff of children between parents.', 0, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  min_hours = EXCLUDED.min_hours,
  active = EXCLUDED.active;

-- Rate cards: one per county+service (10 total for 5 counties x 2 services)
INSERT INTO rate_cards (county_id, service_id, intake_per_adult_cents, hourly_rate_cents, exchange_fee_cents, platform_fee_cents)
SELECT c.id, s.id, 5000, 7000, 7000, 9900
FROM counties c
CROSS JOIN services s
ON CONFLICT (county_id, service_id) DO UPDATE SET
  intake_per_adult_cents = EXCLUDED.intake_per_adult_cents,
  hourly_rate_cents = EXCLUDED.hourly_rate_cents,
  exchange_fee_cents = EXCLUDED.exchange_fee_cents,
  platform_fee_cents = EXCLUDED.platform_fee_cents;
