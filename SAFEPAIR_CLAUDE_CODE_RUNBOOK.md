# SafePair Funnel - Claude Code CLI Prompts Runbook

**Date:** March 4, 2026
**Purpose:** Run these prompts sequentially in Claude Code CLI to build the full SafePair funnel site.
**Stack:** Next.js App Router, TypeScript, Tailwind, Supabase, Stripe, Vercel, Resend, CallRail

---

## PRE-FLIGHT CHECKLIST

Complete before running Prompt 1.

1. Install Claude Code CLI:
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

2. Create project directory:
```bash
cd ~/Projects
pnpm create next-app@latest safepair-funnel --yes
cd safepair-funnel
```

3. Install dependencies:
```bash
pnpm add @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js zod react-hook-form @hookform/resolvers lucide-react clsx tailwind-merge resend react-dom
pnpm add -D supabase
npx supabase init
```

4. Create the CLAUDE.md file in the project root (see Section A below).

5. Have these accounts ready:
   - Supabase project (Pro plan recommended, $25/mo)
   - Stripe account with test mode keys
   - Resend account (free tier)
   - Vercel account (Hobby tier, free)
   - CallRail account (Lead Tracking Complete, $95/mo) or placeholder values

6. Have these env values ready:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

---

## SECTION A: CLAUDE.md

Create this file at `~/Projects/safepair-funnel/CLAUDE.md` before starting.

```markdown
# SafePair Funnel - Project Instructions

## What this project is
A separate lead-generation, intake, payment, and case-routing site for SafePair supervised visitation and exchange services.
This project is NOT the provider. This project manages discovery, qualification, intake, payment capture, attribution, and case handoff.
SafePair delivers the services.

## Stack
- Next.js App Router (App directory, server components by default)
- TypeScript (strict)
- Tailwind CSS
- Supabase (Postgres, Auth, RLS)
- Stripe Checkout Sessions (phase 1, no Connect)
- Vercel (hosting)
- Resend (transactional email)
- CallRail (call tracking placeholder)

## Live source of truth
1. Public pricing and county coverage follows the court-listed Safe Pair rate card (revised 2026-02-03).
2. Launch counties: Santa Clara, Alameda, Contra Costa, San Francisco.
3. Marin is draft/noindex until public signals match.
4. Baseline provider pricing:
   - Intake: $50/person (5000 cents)
   - Hourly rate: $70 (7000 cents)
   - Exchange: $70 (7000 cents)
   - Platform fee: $99/case (9900 cents)

## Brand and disclosure rules
1. Disclose clearly: platform manages intake, scheduling, and payment. SafePair delivers services.
2. Do not present the platform as the court-listed provider.
3. Do not imply court endorsement.
4. Do not clone safepair.net.
5. Every county page must be useful on its own (no doorway pages).

## Technical rules
1. Server components by default.
2. All secrets in environment variables. Never expose service-role keys client-side.
3. Supabase `public.public_rate_cards` view for public pricing. Do not hardcode prices in JSX.
4. Stripe Checkout Sessions for payment. Verify webhook signatures before any DB write.
5. Admin routes use Supabase Auth. Public routes work without auth.
6. Prefer simple explicit code over abstractions.
7. Use `@/` path alias for imports.

## Data rules
1. Lead saved BEFORE Stripe redirect.
2. Provider acceptance is a separate admin action. Never auto-accept on payment success.
3. Webhook handler must be idempotent (guard on payment_status = 'created').
4. Email failure must not block payment capture.
5. Minimize PII in event_log.

## Money rules
1. Customer pays platform Stripe account first.
2. Provider payout is manual in phase 1 (Stripe Connect is phase 2).
3. Provider share policy: full_provider_amount or eighty_twenty_share (configurable per case).
4. Platform fee default: 9900 cents.
5. Keep provider gross and platform fee as separate line items in code and data.

## SEO rules
1. Only 4 counties live. Marin draft/noindex.
2. No city pages in phase 1.
3. Descriptive hyphenated URLs.
4. FAQ schema on appropriate pages.
5. No LocalBusiness schema for the platform.
6. robots.txt disallows: /admin/, /checkout/, /api/, /counties/marin

## File structure
src/
  app/           (App Router pages)
  components/    (layout/, marketing/, intake/, admin/, ui/)
  lib/           (env.ts, site-config.ts, supabase/, stripe/, seo/, validations/, analytics/)
  emails/        (Resend templates)
  types/         (database.types.ts)
supabase/
  migrations/
  seed.sql

## Done criteria
1. Code compiles. `pnpm build` passes.
2. `pnpm lint` passes with 0 errors.
3. Key flow smoke-tested.
4. New env vars documented.
5. New schema changes have migration files.
6. Changelog summary provided.

## Working rules
1. Read this file first.
2. Explore existing code before changing anything.
3. Small reviewable edits.
4. Run lint and build before declaring done.
5. If a command fails, diagnose and fix. Do not silently skip.
6. Do not rewrite working code without a concrete reason.
```

---

## SECTION B: THE 5 BUILD PROMPTS

Run these in order. Each one is a separate `claude` session in Terminal.
Start each session from the project root: `cd ~/Projects/safepair-funnel && claude`

---

### PROMPT 1: Scaffold and Shared Shell

**Estimated time:** 30-45 min
**What it builds:** Project structure, shared layout, design tokens, route placeholders, env template

Copy-paste this into Claude Code:

```
Read CLAUDE.md first and follow it strictly.

Goal:
Create the production-ready project scaffold for the SafePair lead funnel.

Do this now:
1. Inspect the repository and fix any broken config.
2. Create the base app directory structure matching CLAUDE.md file structure.
3. Build shared root layout with:
   - Header: logo, nav links (Counties, Pricing, How It Works, For Attorneys), phone CTA, Start Intake button
   - DisclosureBar: amber banner above fold on every page reading "Intake and scheduling managed by [platform]. Services delivered by SafePair."
   - Footer: county links, resource links, legal links (privacy, notice-at-collection, terms), tracked phone number, disclosure repeat
4. Add design tokens: color palette (navy/slate primary, amber accent, white background), typography scale, CTA button styles using Tailwind.
5. Create src/lib/site-config.ts with:
   - SITE_URL, SITE_NAME, SITE_DESCRIPTION
   - PHONE placeholder for CallRail
   - COUNTIES array: santa-clara, alameda, contra-costa, san-francisco (live) and marin (draft)
   - SERVICES array: supervised-visitation, supervised-exchange
   - FALLBACK_RATES: intake 5000, hourly 7000, exchange 7000, platform 9900 (all in cents)
6. Create route placeholder files (empty page.tsx with basic heading) for all 39 routes in the page inventory:
   - / , /how-it-works, /pricing, /counties, /for-attorneys, /faq, /contact, /start
   - /counties/[county], /counties/[county]/[service]
   - /services/supervised-visitation, /services/supervised-exchange
   - /checkout/success, /checkout/cancel
   - /privacy, /notice-at-collection, /terms
   - /admin/login, /admin, /admin/leads, /admin/cases, /admin/rates, /admin/payouts
   - /sitemap.xml (sitemap.ts), /robots.txt (robots.ts), /manifest.webmanifest
7. Create .env.local.example with all required variables documented.
8. Create README.md with macOS setup commands.
9. Run pnpm lint and pnpm build. Fix any errors until both pass clean.

Constraints:
- The platform is not the provider. Disclosure must be visible on every page.
- Do not hardcode pricing in page JSX. Use FALLBACK_RATES from site-config.ts only.
- Marin must stay draft/noindex. Do not include Marin in any live arrays or generateStaticParams.
- Only 4 counties are live.
- Use server components by default.
- Use @/ path alias for all imports.

Deliverables:
- Working scaffold that builds clean
- Shared UI layout (Header, Footer, DisclosureBar)
- All 39 route placeholders
- .env.local.example
- README.md
- Short changelog of what was created
```

**After it finishes:** Run `pnpm build` yourself. If clean, move to Prompt 2. If errors, paste the error output back into the same Claude Code session.

---

### PROMPT 2: Supabase Schema, Migrations, and Seed Data

**Estimated time:** 20-30 min
**What it builds:** 4 SQL migrations, seed data, TypeScript types, server helpers

Copy-paste this into Claude Code:

```
Read CLAUDE.md first and follow it strictly.

Goal:
Implement the full Supabase backend for counties, services, rate cards, leads, checkouts, cases, payouts, and event logging.

Do this now:
1. Create 4 migration files in supabase/migrations/:
   a. 20260304000001_core_schema.sql - All 8 tables:
      - counties (id, slug, name, launch_status, noindex, sort_order, timestamps)
      - services (id, slug, name, min_hours, active, timestamps)
      - rate_cards (id, county_id FK, service_id FK, intake_per_adult_cents, hourly_rate_cents, exchange_fee_cents, platform_fee_cents, effective_date, source_url, source_note, public_visible, verified_at, timestamps, unique on county_id+service_id)
      - leads (id, timestamps, first_name, last_name, email, phone, county_slug, service_slug, adults_count, children_count, court_order_status enum, hearing_date, preferred_days, notes, source_channel, source_medium, source_campaign, gclid, landing_path, referrer, callrail_session_id, lead_status enum with states: new, qualified, payment_pending, paid, provider_review, accepted, declined, scheduled, closed, refunded)
      - checkouts (id, lead_id FK, stripe_session_id unique, stripe_payment_intent_id, amount_total_cents, provider_component_cents, platform_fee_cents, stripe_fee_estimate_cents, payment_status enum, paid_at, timestamps)
      - cases (id, lead_id FK unique, provider_status enum, provider_share_policy enum, provider_gross_cents, provider_payout_cents, first_service_at, scheduled_at, decline_reason, timestamps)
      - payout_batches (id, case_id FK, payout_status enum, payout_amount_cents, payout_reference, payout_sent_at, timestamps)
      - event_log (id, entity_type, entity_id, event_name, payload jsonb, created_at)
   b. 20260304000002_indexes_and_triggers.sql - Performance indexes on leads(created_at, lead_status, county+service), checkouts(lead_id), cases(provider_status), event_log(entity_type+entity_id). Updated_at trigger on all mutable tables.
   c. 20260304000003_rls_and_views.sql - Enable RLS on all 8 tables. Public read policies: counties where live, services where active, rate_cards where public_visible. Anon insert policy on leads. Create views: public_rate_cards (joins counties+services+rate_cards, filters live+active+visible), admin_lead_summary (joins leads+checkouts+cases), admin_payout_queue (joins payout_batches+cases+leads).
   d. 20260304000004_seed.sql - Insert 5 counties (4 live, Marin draft with noindex=true). Insert 2 services. Insert 10 rate card rows (5 counties x 2 services). All pricing from court-listed data: intake 5000, hourly 7000, exchange 7000, platform 9900. Set Marin rate cards public_visible=false. Use ON CONFLICT DO UPDATE for idempotent reruns. Source URL: https://santaclara.courts.ca.gov/system/files/family/svp_sccounty.pdf

2. Create src/types/database.types.ts with full typed schema for all tables, views, enums, and Row/Insert/Update types.

3. Create server helpers in src/lib/supabase/:
   - client.ts: singleton browser client (anon key only)
   - server.ts: SSR anon client + service-role admin client (server-only)
   - rate-cards.ts: getPublicRates(), getRatesForCounty(slug), getRateForCountyService(county, service), calcStarterPrice(), centsToUSD()
   - counties.ts: getLiveCounties(), getActiveServices()
   - leads.ts: createLead(), updateLeadStatus(), logEvent() (PII-safe)
   - checkouts.ts: createCheckout(), markCheckoutComplete(), createCase() (idempotent)
   - index.ts: barrel export

4. Create src/lib/env.ts: centralized env accessor with fail-fast errors on missing keys.

5. Create .env.example with all Supabase variables documented.

6. Run pnpm lint and pnpm build. Fix any errors.

Constraints:
- Service-role key must never appear in any client-side or browser-accessible file.
- Marin rate cards must have public_visible = false.
- admin_lead_summary and admin_payout_queue views must NOT be accessible to anon role.
- event_log helper must strip email/phone before writing (PII minimization).
- All pricing in cents. Provider pricing source: court-listed Safe Pair data revised 2026-02-03.

Deliverables:
- 4 migration SQL files
- TypeScript types file
- 7 server helper files
- Build/lint clean
- Short changelog
```

**After it finishes:**
1. Run `npx supabase db reset` (local) or paste migrations into Supabase Dashboard SQL editor in order.
2. Verify in Supabase Dashboard: 8 tables exist, `public_rate_cards` view returns rows, RLS is enabled on all tables.
3. If clean, move to Prompt 3.

---

### PROMPT 3: Public Marketing Pages and SEO

**Estimated time:** 45-60 min
**What it builds:** All public-facing pages with live Supabase pricing, SEO metadata, FAQ schema, sitemap

Copy-paste this into Claude Code:

```
Read CLAUDE.md first and follow it strictly.

Goal:
Build all public funnel pages with real structure, useful content, live Supabase pricing, and proper SEO.

Do this now:
1. Create src/lib/seo/metadata.ts with buildMetadata() helper that generates: title, description, canonical URL, OG tags, robots (noindex for Marin and admin).
2. Create src/lib/seo/schemas.ts with faqSchema() and breadcrumbSchema() JSON-LD generators.
3. Create src/components/ui/PricingTable.tsx: server component that reads from Supabase public_rate_cards view with FALLBACK_RATES fallback. Renders a clean rate table.
4. Create src/components/ui/FaqAccordion.tsx: client component with open/close toggle for FAQ items.

5. Build these pages with full content (not placeholders):

   a. / (Home): Hero with headline about court-compliant supervised visitation intake. DisclosureBar. County selector linking to /counties/[county]. Service cards for visitation and exchange. 3-step process (qualify, intake, pay). Live pricing snapshot from PricingTable. FAQ section (5+ questions) with schema. Dual CTA (Start Intake + Call).

   b. /how-it-works: 5 steps: qualify, intake form, pay on platform, provider reviews case, scheduling begins. Each step gets a heading and 2-3 sentences.

   c. /pricing: Full live rate table from Supabase. Two starter package examples with math breakdown (2-person intake + 2hr visit = $X, exchange starter = $Y). Pricing FAQ. Disclaimer that prices are provider rates and platform fee applies.

   d. /counties: County cards for 4 live counties linking to /counties/[county]. Explanation of why county matters (court orders are county-specific). Service summary cards.

   e. /counties/[county] (dynamic): generateStaticParams() for 4 live counties only. County-specific hero with courthouse reference. Service links to /counties/[county]/supervised-visitation and /counties/[county]/supervised-exchange. Documents checklist (court order, ID, custody schedule). Live pricing sidebar from Supabase. County FAQ (5 questions) with schema. Breadcrumb schema.

   f. /counties/[county]/[service] (dynamic): generateStaticParams() for 8 combos (4 counties x 2 services). Service-specific hero. Fit checklist (different for visitation vs exchange). Exact starter package price calculation from Supabase rates. Documents needed. 4-step post-payment process. Service FAQ with schema. Amber alert: "Payment does not guarantee provider acceptance." Breadcrumb schema.

   g. /services/supervised-visitation: What it is, who needs it, starting prices from Supabase, the process, CTA.
   h. /services/supervised-exchange: Same structure for exchange service.

   i. /for-attorneys: What platform handles vs does not handle (table format). 3 referral steps. Client checklist to send. County quick-links.

   j. /faq: 10-question accordion with FAQ schema. Topics: cost, process, timeline, court orders, provider acceptance, refunds, counties served, attorney referrals, documents, scheduling.

   k. /contact: Tracked phone number, email, business hours, county service area list.

   l. /privacy, /notice-at-collection, /terms: Legal pages with placeholder content marked [ATTORNEY REVIEW REQUIRED].

   m. /sitemap.ts: Dynamic sitemap including all live public routes. Exclude Marin, admin, checkout, API.
   n. /robots.ts: Disallow /admin/, /checkout/, /api/, /counties/marin.

6. Ensure buildMetadata() is called on every page with correct title, description, canonical.
7. Run pnpm lint and pnpm build. Fix all errors.

Constraints:
- No pricing hardcoded in JSX. All pricing reads from Supabase with FALLBACK_RATES backup.
- Marin must NOT appear in generateStaticParams, sitemap, or any live nav.
- No LocalBusiness schema for the platform.
- Disclosure bar on every page via root layout.
- Footer disclosure: "Not a law firm. Not the court-listed provider. Platform manages intake only."
- County pages must have unique useful content, not thin doorway pages.
- Use server components for all pages that fetch data.

Deliverables:
- All public pages with real content
- SEO metadata on every page
- FAQ schema and breadcrumb schema where appropriate
- Sitemap and robots
- Build/lint clean
- Short changelog
```

**After it finishes:** Run `pnpm build`. Browse to localhost:3000 and spot-check: home page loads, county pages show pricing, FAQ accordions work, Marin returns 404. Move to Prompt 4.

---

### PROMPT 4: Intake Wizard, Stripe Checkout, and Webhook

**Estimated time:** 45-60 min
**What it builds:** Multi-step intake form, Stripe payment flow, webhook handler, email notification

Copy-paste this into Claude Code:

```
Read CLAUDE.md first and follow it strictly.

Goal:
Implement the intake flow that captures lead details, creates a Stripe Checkout Session, verifies payment via webhook, and writes everything to Supabase.

Do this now:
1. Create src/lib/validations/intake.ts:
   - Zod schema for all lead fields: county_slug, service_slug, adults_count (default 2), children_count (default 1), court_order_status (yes/no/unknown), hearing_date (optional), first_name, last_name, phone, email, notes (optional)
   - County and service enum arrays with display labels
   - Export validation schema and inferred TypeScript type

2. Create src/lib/stripe/index.ts: singleton Stripe server client using STRIPE_SECRET_KEY from env.ts.

3. Build /start page as a client component with 4-step wizard:
   - Step 1: County selector + service selector (dropdowns or cards)
   - Step 2: Family details (adults count, children count, court order status radio, hearing date picker)
   - Step 3: Contact info (first name, last name, phone, email, notes textarea)
   - Step 4: Review all inputs + price estimate calculated from Supabase rates + "Pay and Submit" button
   - Capture UTM params (utm_source, utm_medium, utm_campaign) and gclid from URL on mount
   - Store attribution in hidden fields

4. Create /api/leads/route.ts (POST):
   - Validate with Zod schema
   - Insert lead row into Supabase (status: new)
   - Log event (lead_created)
   - Return { leadId }

5. Create /api/checkout/route.ts (POST):
   - Accept leadId
   - Read live pricing from public_rate_cards view in Supabase
   - Fall back to seed values if rate card missing
   - Calculate: intake = intake_per_adult_cents * adults_count, service fee based on service type, platform fee
   - Create Stripe Checkout Session with line items and metadata (leadId, provider_gross_cents, platform_fee_cents, provider_share_policy)
   - Insert checkouts row (payment_status: created)
   - Update lead status to payment_pending
   - Return { url } for redirect

6. Create /api/stripe/webhook/route.ts (POST):
   - Read raw body
   - Verify Stripe-Signature header using STRIPE_WEBHOOK_SECRET. Return 400 if invalid.
   - Handle checkout.session.completed only:
     a. Find checkout row by stripe_session_id WHERE payment_status = 'created' (idempotency guard)
     b. Update checkout: payment_status = completed, paid_at = now, stripe_payment_intent_id
     c. Update lead status to paid
     d. Upsert case row: provider_status = pending, provider_share_policy from metadata, provider_gross_cents from metadata
     e. Send internal notification email via Resend (non-blocking: log failure, do not re-throw)
   - Return 200 for all unhandled event types

7. Create src/emails/intake-received.tsx:
   - Internal notification email rendered as static HTML
   - Shows all lead fields, payment amount, Stripe session ID
   - Yellow "ACTION REQUIRED" banner
   - Text: "New paid intake. Provider review needed. Do NOT auto-accept."

8. Build /checkout/success page:
   - Read Stripe session from URL param to confirm paid status
   - Show next steps: "Provider will review your case. You will be contacted within 1-2 business days."
   - Link back to home

9. Build /checkout/cancel page:
   - Show "No charge" message
   - Link back to /start to retry

10. Update next.config.ts: add stripe to serverComponentsExternalPackages if needed.

11. Run pnpm lint and pnpm build. Fix all errors.

Constraints:
- Lead row MUST be saved before Stripe Checkout redirect. If user abandons checkout, lead exists for follow-up.
- Webhook MUST verify signature before any DB write.
- Webhook MUST be idempotent: only process if checkout payment_status is currently 'created'.
- Provider acceptance is NEVER automatic. Webhook sets provider_status = 'pending' only.
- Email failure MUST NOT fail the webhook. Payment capture is source of truth.
- Pricing reads from Supabase at checkout time. Rate changes take effect immediately without deploy.
- Service-role key used only in API routes and webhook. Never in client components.

Deliverables:
- Working intake wizard
- Stripe Checkout Session creation
- Verified webhook handler
- Internal email notification
- Checkout success and cancel pages
- Build/lint clean
- Short changelog
```

**After it finishes:**
1. Run `pnpm build`.
2. Set up Stripe webhook for testing: `stripe listen --forward-to http://localhost:3000/api/stripe/webhook`
3. Walk through the intake flow: select county, fill details, click pay, complete test checkout, verify lead/checkout/case rows in Supabase.
4. Move to Prompt 5.

---

### PROMPT 5: Admin Layer, Event Tracking, QA, and Deploy Prep

**Estimated time:** 45-60 min
**What it builds:** Admin pages, auth protection, event tracking, analytics hooks, QA checklist, deploy config

Copy-paste this into Claude Code:

```
Read CLAUDE.md first and follow it strictly.

Goal:
Finish the internal operating layer so the funnel is usable in a real pilot. Add admin pages, auth, event tracking, and deploy prep.

Do this now:

PART A - AUTH AND ADMIN SHELL:
1. Create src/middleware.ts: Supabase Auth middleware that protects all /admin/* routes. Unauthenticated requests redirect to /admin/login.
2. Build /admin/login page: email/password form, error state display, redirect to /admin on success.
3. Create /admin/layout.tsx: admin shell with sidebar nav (Dashboard, Leads, Cases, Rates, Payouts, Sign Out).
4. Create src/app/admin/AdminNav.tsx: sidebar nav component with sign out action.

PART B - ADMIN PAGES:
5. Build /admin page (dashboard): 5 count tiles showing: new leads today, payment pending, paid awaiting review, active cases, queued payouts. Each tile links to its detail page.
6. Build /admin/leads page: table of all leads with columns (created_at, name, county, service, status, payment status, amount). Status filter tabs (all, new, qualified, payment_pending, paid, provider_review). Inline status dropdown that saves to Supabase immediately.
7. Build /admin/cases page: table of cases joined with lead data. Columns: name, county, service, provider_status, share_policy, gross, payout, scheduled_at. Provider status dropdown that saves. Default filter: pending.
8. Build /admin/rates page: load all rate cards for all counties and services. Editable fields: intake, hourly, exchange, platform fee (display in dollars, save in cents). Effective date field. Source URL field. Public visible toggle. "Mark Verified" button that writes verified_at timestamp. Save button per row.
9. Build /admin/payouts page: table of payout_batches joined with case and lead data. Columns: name, county, service, payout_status, amount, reference, sent_at. Reference text input. Status dropdown. "Mark Sent" button that writes payout_sent_at and sets status to sent. Disable sent button on already-sent rows.

PART C - EVENT TRACKING:
10. Create src/lib/analytics/events.ts with typed track() function for these events:
    - page_view, click_call, start_intake, submit_intake, checkout_created, checkout_completed, provider_accepted, provider_declined, case_scheduled
    - Each event writes to Supabase event_log via /api/events route
    - Also fire to PostHog if NEXT_PUBLIC_POSTHOG_KEY is set (non-blocking)
11. Create src/lib/analytics/utm.ts: capture UTM params + gclid + CallRail session ID from URL. Persist in sessionStorage. Export captureUtm() and getStoredUtm().
12. Create /api/events/route.ts: POST endpoint that validates event payload and inserts into event_log.

PART D - DEPLOY PREP:
13. Create or verify .env.local.example has ALL variables including PostHog and CallRail placeholders.
14. Verify robots.ts disallows /admin/, /checkout/, /api/, /counties/marin.
15. Verify sitemap.ts includes all live public routes.
16. Run pnpm lint and pnpm build. Fix all errors.
17. Run pnpm tsc --noEmit to verify zero TypeScript errors.

Constraints:
- Admin pages must be server-rendered with auth check. Redirect to login if no session.
- All admin data mutations use service-role client, never anon.
- Event tracking must not block user actions. Failures are logged, not thrown.
- PostHog is optional. If key is not set, skip PostHog calls silently.
- No console.error should appear in browser on any admin page in normal operation.
- Keep admin simple and functional. No unnecessary animation or complexity.

Deliverables:
- Working admin login and auth protection
- 5 admin pages (dashboard, leads, cases, rates, payouts)
- Event tracking plumbing (9 events)
- UTM and attribution capture
- Deploy-ready config
- Build/lint clean
- Short changelog
```

**After it finishes:**
1. Run `pnpm build`.
2. Create an admin user in Supabase: Dashboard > Authentication > Users > Add User.
3. Test login flow at /admin/login.
4. Verify all 5 admin pages load without errors.
5. Move to deploy.

---

## SECTION C: DEPLOY SEQUENCE

After all 5 prompts pass clean, run these in Terminal:

```bash
# 1. Link to Vercel
cd ~/Projects/safepair-funnel
vercel link

# 2. Set all env vars in Vercel Dashboard or CLI
# Vercel Dashboard > Project > Settings > Environment Variables
# Add every variable from .env.local.example

# 3. Pull env vars for local verification
vercel env pull .env.local

# 4. Preview deploy
vercel deploy

# 5. Run QA on preview URL (see Section D)

# 6. Production deploy
vercel deploy --prod
```

Post-deploy:
1. Register Stripe webhook in Stripe Dashboard: URL = `https://your-domain.com/api/stripe/webhook`, Event = `checkout.session.completed`.
2. Set up CallRail pool for the production domain.
3. Verify at least one rate card shows on /pricing.

---

## SECTION D: QA SMOKE TEST

Run on the preview URL before promoting to production.

**Public pages:**
- [ ] Home page loads, pricing table shows rates
- [ ] /counties shows 4 county cards (no Marin)
- [ ] /counties/santa-clara shows county-specific content and pricing
- [ ] /counties/santa-clara/supervised-visitation shows starter price calculation
- [ ] /counties/marin returns 404
- [ ] /pricing shows live rate table
- [ ] /for-attorneys loads with referral steps
- [ ] /faq accordion opens and closes
- [ ] /sitemap.xml does not include Marin or admin routes
- [ ] /robots.txt disallows admin, checkout, API, Marin

**Intake flow:**
- [ ] /start renders 4-step wizard
- [ ] Selecting county and service advances to step 2
- [ ] Filling contact info advances to review
- [ ] Review step shows correct price estimate
- [ ] Pay button creates Stripe Checkout Session and redirects
- [ ] Completing test payment lands on /checkout/success
- [ ] Lead row exists in Supabase with status = paid
- [ ] Checkout row has payment_status = completed
- [ ] Case row has provider_status = pending
- [ ] Internal email was sent (check Resend logs)

**Admin:**
- [ ] /admin redirects to /admin/login when not authenticated
- [ ] Login with valid credentials reaches dashboard
- [ ] Dashboard shows count tiles
- [ ] Leads table loads and status dropdown saves
- [ ] Cases table loads and provider status dropdown saves
- [ ] Rates page loads all rate cards and edits save
- [ ] Payouts table loads and mark-sent works
- [ ] Sign out clears session

**Webhook:**
- [ ] Invalid signature returns 400
- [ ] Replaying completed event does not double-write

---

## SECTION E: TROUBLESHOOTING

**Common build errors and fixes:**

| Error | Fix |
|---|---|
| `cookies()` should be awaited | Next.js 15+: change `cookies()` to `await cookies()` in server.ts |
| Cannot find module '@supabase/ssr' | Run `pnpm add @supabase/ssr` |
| stripe not found in server components | Add `serverComponentsExternalPackages: ['stripe']` to next.config.ts |
| RLS violation on lead insert | Verify leads_insert_anon policy exists. Or use service-role in API route. |
| Webhook 400 on Stripe events | Verify STRIPE_WEBHOOK_SECRET matches the signing secret from `stripe listen` or Dashboard |
| Rate cards return empty | Run seed migration. Check public_visible = true and county launch_status = live |
| Marin pages rendering | Verify Marin is NOT in generateStaticParams arrays |

---

## SECTION F: ENV VARS MASTER LIST

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=
RESEND_FROM=noreply@yourdomain.com
INTERNAL_NOTIFY_EMAIL=admin@yourdomain.com

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Analytics (optional in dev)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# CallRail (optional in dev)
NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID=
NEXT_PUBLIC_CALLRAIL_NUMBER=
```
