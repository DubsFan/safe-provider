-- Add foreign key constraints on slug fields to prevent orphaned references

ALTER TABLE leads ADD CONSTRAINT fk_leads_county FOREIGN KEY (county_slug) REFERENCES counties(slug);
ALTER TABLE leads ADD CONSTRAINT fk_leads_service FOREIGN KEY (service_slug) REFERENCES services(slug);
ALTER TABLE cases ADD CONSTRAINT fk_cases_county FOREIGN KEY (county_slug) REFERENCES counties(slug);
ALTER TABLE cases ADD CONSTRAINT fk_cases_service FOREIGN KEY (service_slug) REFERENCES services(slug);
