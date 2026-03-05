-- Authenticated CRUD policies for admin

-- Counties: authenticated can do everything
CREATE POLICY "Admin can read all counties" ON counties FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update counties" ON counties FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Services: authenticated can do everything
CREATE POLICY "Admin can read all services" ON services FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update services" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Rate cards: authenticated can do everything
CREATE POLICY "Admin can update rate cards" ON rate_cards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin can insert rate cards" ON rate_cards FOR INSERT TO authenticated WITH CHECK (true);

-- Leads: authenticated full access
CREATE POLICY "Admin can read leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update leads" ON leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Checkouts: authenticated full access
CREATE POLICY "Admin can read checkouts" ON checkouts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can insert checkouts" ON checkouts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update checkouts" ON checkouts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Cases: authenticated full access
CREATE POLICY "Admin can read cases" ON cases FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can insert cases" ON cases FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update cases" ON cases FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Payouts: authenticated full access
CREATE POLICY "Admin can read payouts" ON payouts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can insert payouts" ON payouts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update payouts" ON payouts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Event log: authenticated can read
CREATE POLICY "Admin can read events" ON event_log FOR SELECT TO authenticated USING (true);
