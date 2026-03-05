-- Tighten admin RLS policies: restrict to admin email instead of any authenticated user
-- Single-admin system (phase 1). Phase 2 would add an admin_users table.

-- Helper function to check if the current user is the admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT (auth.jwt() ->> 'email') = 'gg@oog.life'
$$;

-- Drop old overly-permissive policies
DROP POLICY IF EXISTS "Admin can read all counties" ON counties;
DROP POLICY IF EXISTS "Admin can update counties" ON counties;
DROP POLICY IF EXISTS "Admin can read all services" ON services;
DROP POLICY IF EXISTS "Admin can update services" ON services;
DROP POLICY IF EXISTS "Admin can update rate cards" ON rate_cards;
DROP POLICY IF EXISTS "Admin can insert rate cards" ON rate_cards;
DROP POLICY IF EXISTS "Admin can read leads" ON leads;
DROP POLICY IF EXISTS "Admin can update leads" ON leads;
DROP POLICY IF EXISTS "Admin can read checkouts" ON checkouts;
DROP POLICY IF EXISTS "Admin can insert checkouts" ON checkouts;
DROP POLICY IF EXISTS "Admin can update checkouts" ON checkouts;
DROP POLICY IF EXISTS "Admin can read cases" ON cases;
DROP POLICY IF EXISTS "Admin can insert cases" ON cases;
DROP POLICY IF EXISTS "Admin can update cases" ON cases;
DROP POLICY IF EXISTS "Admin can read payouts" ON payouts;
DROP POLICY IF EXISTS "Admin can insert payouts" ON payouts;
DROP POLICY IF EXISTS "Admin can update payouts" ON payouts;
DROP POLICY IF EXISTS "Admin can read events" ON event_log;

-- Recreate with admin email check
CREATE POLICY "Admin can read all counties" ON counties FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin can update counties" ON counties FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admin can read all services" ON services FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin can update services" ON services FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admin can update rate cards" ON rate_cards FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can insert rate cards" ON rate_cards FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admin can read leads" ON leads FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin can update leads" ON leads FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admin can read checkouts" ON checkouts FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin can insert checkouts" ON checkouts FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin can update checkouts" ON checkouts FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admin can read cases" ON cases FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin can insert cases" ON cases FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin can update cases" ON cases FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admin can read payouts" ON payouts FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "Admin can insert payouts" ON payouts FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin can update payouts" ON payouts FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admin can read events" ON event_log FOR SELECT TO authenticated USING (is_admin());
