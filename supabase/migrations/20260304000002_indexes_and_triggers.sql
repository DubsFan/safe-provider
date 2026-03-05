-- Performance indexes
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_county ON leads(county_slug);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_checkouts_lead ON checkouts(lead_id);
CREATE INDEX idx_checkouts_stripe_session ON checkouts(stripe_session_id);
CREATE INDEX idx_cases_lead ON cases(lead_id);
CREATE INDEX idx_cases_provider_status ON cases(provider_status);
CREATE INDEX idx_payouts_case ON payouts(case_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_event_log_entity ON event_log(entity_type, entity_id);
CREATE INDEX idx_event_log_name ON event_log(event_name);
CREATE INDEX idx_rate_cards_county ON rate_cards(county_id);

-- updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables with updated_at
CREATE TRIGGER trg_counties_updated_at BEFORE UPDATE ON counties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_rate_cards_updated_at BEFORE UPDATE ON rate_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_checkouts_updated_at BEFORE UPDATE ON checkouts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_cases_updated_at BEFORE UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_payouts_updated_at BEFORE UPDATE ON payouts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
