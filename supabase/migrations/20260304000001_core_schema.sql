-- Core schema: 8 tables with enums, FKs, constraints

CREATE TYPE launch_status AS ENUM ('live', 'draft', 'archived');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'payment_pending', 'paid', 'accepted', 'declined', 'cancelled');
CREATE TYPE payment_status AS ENUM ('created', 'completed', 'failed', 'refunded');
CREATE TYPE provider_status AS ENUM ('pending', 'accepted', 'declined', 'scheduled', 'completed', 'cancelled');
CREATE TYPE provider_share_policy AS ENUM ('full_provider_amount', 'eighty_twenty_share');
CREATE TYPE payout_status AS ENUM ('pending', 'sent', 'confirmed');

-- Counties
CREATE TABLE counties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  courthouse_name text,
  courthouse_address text,
  court_source_url text,
  local_note text,
  launch_status launch_status NOT NULL DEFAULT 'draft',
  noindex boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Services
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  min_hours integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Rate cards (one per county+service combination)
CREATE TABLE rate_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  county_id uuid NOT NULL REFERENCES counties(id),
  service_id uuid NOT NULL REFERENCES services(id),
  intake_per_adult_cents integer NOT NULL DEFAULT 5000,
  hourly_rate_cents integer NOT NULL DEFAULT 7000,
  exchange_fee_cents integer NOT NULL DEFAULT 7000,
  platform_fee_cents integer NOT NULL DEFAULT 9900,
  effective_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (county_id, service_id)
);

-- Leads
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  county_slug text NOT NULL,
  service_slug text NOT NULL,
  petitioner_first text NOT NULL,
  petitioner_last text NOT NULL,
  respondent_first text,
  respondent_last text,
  email text NOT NULL,
  phone text NOT NULL,
  adults_count integer NOT NULL DEFAULT 2,
  has_court_order boolean NOT NULL DEFAULT false,
  court_order_notes text,
  preferred_schedule text,
  status lead_status NOT NULL DEFAULT 'new',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Checkouts
CREATE TABLE checkouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id),
  stripe_session_id text UNIQUE NOT NULL,
  stripe_payment_intent_id text,
  intake_cents integer NOT NULL,
  service_cents integer NOT NULL,
  platform_fee_cents integer NOT NULL,
  total_cents integer NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'created',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Cases
CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id),
  checkout_id uuid REFERENCES checkouts(id),
  county_slug text NOT NULL,
  service_slug text NOT NULL,
  provider_status provider_status NOT NULL DEFAULT 'pending',
  provider_share_policy provider_share_policy NOT NULL DEFAULT 'full_provider_amount',
  provider_gross_cents integer NOT NULL DEFAULT 0,
  platform_fee_cents integer NOT NULL DEFAULT 9900,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Payouts
CREATE TABLE payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id),
  amount_cents integer NOT NULL,
  status payout_status NOT NULL DEFAULT 'pending',
  sent_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Event log (minimal PII)
CREATE TABLE event_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  event_name text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
