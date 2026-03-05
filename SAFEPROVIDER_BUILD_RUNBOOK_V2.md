# SafeProvider Funnel - Claude Code CLI Build Runbook v2

**Date:** March 4, 2026
**Domain:** safeprovider.org
**Platform brand:** SafeProvider
**Legal entity:** Safe Provider
**Provider brand:** SafePair
**Admin email:** gg@oog.life
**Stack:** Next.js App Router, TypeScript, Tailwind, Supabase, Stripe, Vercel, Resend, CallRail

---

## PRE-FLIGHT CHECKLIST

Complete every item before running Prompt 1.

### Step 1: Install Claude Code CLI

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Step 2: Create project and install dependencies

```bash
cd ~/Projects
pnpm create next-app@latest safeprovider-funnel --yes
cd safeprovider-funnel
pnpm add @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js zod react-hook-form @hookform/resolvers lucide-react clsx tailwind-merge resend
pnpm add -D supabase
npx supabase init
```

### Step 3: Create the 4 required project files

Copy each section from this runbook into the project root:

```
~/Projects/safeprovider-funnel/
  CLAUDE.md              <- Section A
  api-surface.md         <- Section B
  content-seed.md        <- Section C
  design-tokens.md       <- Section D
```

### Step 4: Have these accounts ready

| Service | Plan | Monthly cost |
|---|---|---|
| Supabase | Pro | $25.00 |
| Stripe | Standard | Per transaction |
| Resend | Free | $0.00 |
| Vercel | Hobby | $0.00 |
| CallRail | Lead Tracking Complete | $95.00 |
| safeprovider.org | Domain | ~$0.62 |

### Step 5: Have these env values ready

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
RESEND_FROM=noreply@safeprovider.org
INTERNAL_NOTIFY_EMAIL=gg@oog.life
NEXT_PUBLIC_SITE_URL=https://safeprovider.org
NEXT_PUBLIC_APP_URL=https://safeprovider.org
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID=
NEXT_PUBLIC_CALLRAIL_NUMBER=
```

---

# ============================================================
# SECTION A: CLAUDE.md
# ============================================================
# Save as ~/Projects/safeprovider-funnel/CLAUDE.md
# ============================================================

```markdown
# SafeProvider Funnel - Project Instructions

## What this project is
A separate lead-generation, intake, payment, and case-routing site operated by SafeProvider.
SafeProvider manages discovery, qualification, intake, payment capture, attribution, and case handoff.
SafePair delivers the supervised visitation and supervised exchange services.
This project is NOT the provider.

## Stack
- Next.js App Router (App directory, server components by default)
- TypeScript (strict)
- Tailwind CSS
- Supabase (Postgres, Auth, RLS)
- Stripe Checkout Sessions (phase 1, no Connect)
- Vercel (hosting)
- Resend (transactional email)
- CallRail (call tracking placeholder)

## Required reading before every task
1. This file (CLAUDE.md)
2. api-surface.md for exact function names, file paths, and import patterns
3. content-seed.md for all page copy, FAQ answers, and disclosure wording
4. design-tokens.md for exact colors, fonts, and spacing

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
1. Platform brand: SafeProvider. Provider brand: SafePair.
2. Disclose clearly: SafeProvider manages intake, scheduling, and payment. SafePair delivers services.
3. Do not present SafeProvider as the court-listed provider.
4. Do not imply court endorsement.
5. Do not clone safepair.net.
6. Every county page must be useful on its own (no doorway pages).
7. Use exact disclosure wording from content-seed.md. Do not invent disclosure text.

## Technical rules
1. Server components by default.
2. All secrets in environment variables. Never expose service-role keys client-side.
3. Supabase public.public_rate_cards view for public pricing. Do not hardcode prices in JSX.
4. Stripe Checkout Sessions for payment. Verify webhook signatures before any DB write.
5. Admin routes use Supabase Auth. Public routes work without auth.
6. Prefer simple explicit code over abstractions.
7. Use @/ path alias for imports.
8. Use exact function names from api-surface.md. Do not rename.
9. Use exact component names from api-surface.md. Do not rename.

## Data rules
1. Lead saved BEFORE Stripe redirect.
2. Provider acceptance is a separate admin action. Never auto-accept on payment success.
3. Webhook handler must be idempotent (guard on payment_status = 'created').
4. Email failure must not block payment capture.
5. Minimize PII in event_log.

## Money rules
1. Customer pays SafeProvider Stripe account first.
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
1. Code compiles. pnpm build passes.
2. pnpm lint passes with 0 errors.
3. Key flow smoke-tested.
4. New env vars documented.
5. New schema changes have migration files.
6. Changelog summary provided.

## Working rules
1. Read this file and all referenced .md files first.
2. Explore existing code before changing anything.
3. Small reviewable edits.
4. Run lint and build before declaring done.
5. If a command fails, diagnose and fix. Do not silently skip.
6. Do not rewrite working code without a concrete reason.
7. Do not invent page copy, FAQ answers, or disclosure wording. Use content-seed.md.
8. Do not invent colors, fonts, or spacing. Use design-tokens.md.
```

---

# ============================================================
# SECTION B: api-surface.md
# ============================================================
# Save as ~/Projects/safeprovider-funnel/api-surface.md
# ============================================================

```markdown
# SafeProvider Funnel - Shared API Surface

Use these exact function names, file paths, and import patterns in all code.
Do not rename functions, files, or components.

## File paths and exports

### src/lib/site-config.ts
- SITE_URL: string
- SITE_NAME: string ("SafeProvider")
- SITE_DESCRIPTION: string
- PHONE: string
- EMAIL: string ("gg@oog.life")
- COUNTIES: { slug, name, status, noindex, sortOrder }[]
- SERVICES: { slug, name, minHours }[]
- FALLBACK_RATES: { intake_per_adult_cents: 5000, hourly_rate_cents: 7000, exchange_fee_cents: 7000, platform_fee_cents: 9900 }

### src/lib/env.ts
- env(key: string): string - throws if missing

### src/lib/supabase/client.ts
- createSupabaseBrowserClient() - singleton, anon key

### src/lib/supabase/server.ts
- createSupabaseServerClient() - SSR anon client (uses cookies)
- createSupabaseAdmin() - service-role client (server-only)

### src/lib/supabase/rate-cards.ts
- getPublicRates() - all visible rates
- getRatesForCounty(countySlug: string) - rates for one county
- getRateForCountyService(countySlug: string, serviceSlug: string) - single rate
- calcStarterPrice(rate, adultsCount: number, serviceSlug: string): { intake, service, platform, total } - all in cents
- centsToUSD(cents: number): string - formats as "$X.XX"

### src/lib/supabase/counties.ts
- getLiveCounties() - only launch_status = 'live'
- getActiveServices() - only active = true

### src/lib/supabase/leads.ts
- createLead(data): Promise<{ id: string }>
- updateLeadStatus(leadId: string, status: string)
- logEvent(entityType: string, entityId: string, eventName: string, payload: object)

### src/lib/supabase/checkouts.ts
- createCheckout(data): Promise<{ id: string }>
- markCheckoutComplete(stripeSessionId: string, paymentIntentId: string)
- createCase(leadId: string, data): Promise<{ id: string }>

### src/lib/supabase/index.ts
- barrel export of all above

### src/lib/stripe/index.ts
- getStripe(): Stripe - singleton server client

### src/lib/validations/intake.ts
- intakeSchema - Zod schema
- type IntakeData - inferred type
- COUNTY_OPTIONS: { value, label }[]
- SERVICE_OPTIONS: { value, label }[]

### src/lib/seo/metadata.ts
- buildMetadata(options: { title, description, path, noindex? }): Metadata
- defaultMetadata: Metadata

### src/lib/seo/schemas.ts
- faqSchema(items: { question, answer }[]): string - JSON-LD
- breadcrumbSchema(items: { name, url }[]): string - JSON-LD

### src/lib/analytics/events.ts
- track(event: string, properties?: object): void
- Event names: page_view, click_call, start_intake, submit_intake, checkout_created, checkout_completed, provider_accepted, provider_declined, case_scheduled

### src/lib/analytics/utm.ts
- captureUtm(): object - reads URL params
- getStoredUtm(): object - reads sessionStorage

### src/types/database.types.ts
- Row types for all 8 tables
- Insert/Update types
- View types for public_rate_cards, admin_lead_summary, admin_payout_queue

## API routes

| Route | Method | Input | Output |
|---|---|---|---|
| /api/leads | POST | IntakeData | { leadId: string } |
| /api/checkout | POST | { leadId: string } | { url: string } |
| /api/stripe/webhook | POST | raw body + Stripe-Signature header | 200 or 400 |
| /api/events | POST | { event: string, properties?: object } | { ok: true } |

## Component names and paths

| Component | Path |
|---|---|
| Header | src/components/layout/Header.tsx |
| Footer | src/components/layout/Footer.tsx |
| DisclosureBar | src/components/layout/DisclosureBar.tsx |
| PricingTable | src/components/ui/PricingTable.tsx |
| FaqAccordion | src/components/ui/FaqAccordion.tsx |
| AdminNav | src/app/admin/AdminNav.tsx |
```

---

# ============================================================
# SECTION C: content-seed.md
# ============================================================
# Save as ~/Projects/safeprovider-funnel/content-seed.md
# ============================================================

```markdown
# SafeProvider Funnel - Content Seed

Use this file as the single source of truth for all page copy, FAQ answers, disclosure wording, and county details.
Do not invent content. Use exactly what is here.

## Brand names
- Platform brand: SafeProvider
- Provider brand: SafePair
- Legal entity: Safe Provider
- Domain: safeprovider.org
- Admin email: gg@oog.life

## Disclosure wording (use exactly)

### Header disclosure bar
"Intake and scheduling managed by SafeProvider. Supervised visitation and exchange services delivered by SafePair."

### Footer disclosure
"Not a law firm. Not the court-listed provider. SafeProvider manages intake, scheduling, and payment only. All supervised visitation and exchange services are delivered by SafePair."

### County-service payment alert
"Payment does not guarantee provider acceptance. SafePair reviews every case independently."

### Checkout success message
"Your payment has been received. SafePair will review your case within 1-2 business days. You will receive a call or email to confirm scheduling."

### Checkout cancel message
"No charge has been made. You can restart your intake at any time."

## County details

### Santa Clara County
- Courthouse: Santa Clara County Family Court Center
- Address: 201 N First Street, San Jose, CA 95113
- Court-listed source: Santa Clara Superior Court supervised visitation provider list (revised February 3, 2026)
- Source URL: https://santaclara.courts.ca.gov/system/files/family/svp_sccounty.pdf
- Local note: SafePair is listed as a provider for Santa Clara County on the court's official supervised visitation provider list.

### Alameda County
- Courthouse: Alameda County Superior Court, Family Law Division
- Address: 1221 Oak Street, Oakland, CA 94612
- Local note: SafePair serves families in Alameda County for supervised visitation and custody exchange.

### Contra Costa County
- Courthouse: Contra Costa County Superior Court
- Address: 751 Pine Street, Martinez, CA 94553
- Local note: SafePair serves families in Contra Costa County for supervised visitation and custody exchange.

### San Francisco County
- Courthouse: San Francisco Superior Court, Unified Family Court
- Address: 400 McAllister Street, San Francisco, CA 94102
- Local note: SafePair serves families in San Francisco County for supervised visitation and custody exchange.

## Service descriptions

### Supervised Visitation
- What it is: A trained, neutral third-party monitor is present during a parent's time with their child. The monitor observes the visit and can intervene if needed.
- Who needs it: Families with a court order requiring supervised visitation, or families who agree to supervision for safety reasons.
- Typical duration: 2 hours minimum per visit.
- Where: At a location agreed upon by both parties and the provider. Options include parks, libraries, community centers, or the provider's office.

### Supervised Exchange
- What it is: A trained, neutral third-party facilitates the handoff of children between parents. Both parents do not need to interact directly.
- Who needs it: Families with a court order requiring supervised exchange, or families who want a neutral third party present during custody transitions.
- Typical duration: 15-30 minutes per exchange.
- Where: At a public location agreed upon by both parties and the provider.

## FAQ answers (use these exactly)

Q: How much does supervised visitation cost?
A: Intake is $50 per person. Supervised visitation is $70 per hour with a 2-hour minimum. A platform scheduling fee of $99 applies to each case booked through this site. See our pricing page for full details.

Q: How much does supervised exchange cost?
A: Intake is $50 per person. Each supervised exchange is $70. A platform scheduling fee of $99 applies to each case booked through this site.

Q: Do I need a court order?
A: A court order is not always required to start the intake process. However, most families using supervised visitation or exchange have a court order or stipulation. If you are unsure, consult your attorney.

Q: How long does it take to get started?
A: After you complete intake and payment, SafePair reviews your case within 1-2 business days. If accepted, scheduling typically begins within 3-5 business days.

Q: What happens after I pay?
A: Payment reserves your intake slot. SafePair reviews your case independently. If accepted, they will contact you to schedule. If declined, you receive a full refund.

Q: Can I get a refund?
A: If SafePair declines your case, you receive a full refund. Once services begin, refunds follow SafePair's cancellation policy.

Q: Which counties do you serve?
A: We currently serve Santa Clara, Alameda, Contra Costa, and San Francisco counties.

Q: Is this a law firm?
A: No. SafeProvider manages intake, scheduling, and payment only. We are not a law firm and do not provide legal advice. Supervised visitation and exchange services are delivered by SafePair.

Q: What documents do I need?
A: Have ready: a valid government-issued photo ID, your court order or stipulation (if applicable), the other parent's contact information, and your preferred schedule.

Q: Who is the provider?
A: All supervised visitation and exchange services are delivered by SafePair, a professional supervised visitation provider with trained, background-checked monitors.

### For Attorneys FAQ

Q: How do I refer a client?
A: Direct your client to our intake page or send us the referral details via our contact page. We handle intake, scheduling, and payment. SafePair handles service delivery.

Q: What turnaround can I tell my client?
A: Intake to scheduling confirmation is typically 3-7 business days after payment clears and SafePair accepts the case.

## Starter package examples (for pricing page)

### Example 1: Supervised Visitation Starter
- 2-person intake: $50 x 2 = $100
- First visit (2 hours): $70 x 2 = $140
- Platform fee: $99
- Total: $339

### Example 2: Supervised Exchange Starter
- 2-person intake: $50 x 2 = $100
- First exchange: $70
- Platform fee: $99
- Total: $269

## Page headlines

| Page | H1 | Subhead |
|---|---|---|
| Home | Court-Compliant Supervised Visitation Intake | Start your intake online. Pay securely. SafePair handles the rest. |
| How It Works | How It Works | From intake to your first scheduled visit in 5 steps. |
| Pricing | Transparent Pricing | Live rates from SafePair. No hidden fees. |
| Counties | Counties We Serve | Court-compliant supervised visitation and exchange in the Bay Area. |
| For Attorneys | For Attorneys and Case Managers | Refer clients. We handle intake and scheduling. SafePair delivers. |
| FAQ | Frequently Asked Questions | Answers to the most common questions about supervised visitation and exchange intake. |
| Contact | Contact Us | Call, email, or start your intake online. |
| Start | Start Your Intake | Select your county and service to begin. |

## Legal page entity references
Use "Safe Provider" as the entity name in privacy policy, terms, and notice at collection.
Mark all legal content with [ATTORNEY REVIEW REQUIRED] at the top of each legal page.
```

---

# ============================================================
# SECTION D: design-tokens.md
# ============================================================
# Save as ~/Projects/safeprovider-funnel/design-tokens.md
# ============================================================

```markdown
# SafeProvider Funnel - Design Tokens

Use these exact values. Do not invent colors, fonts, or spacing.

## Colors

| Token | Hex | Use |
|---|---|---|
| primary-900 | #0F172A | Headings, body text |
| primary-700 | #334155 | Secondary text |
| primary-500 | #64748B | Muted text, borders |
| primary-100 | #F1F5F9 | Light backgrounds, section alternation |
| accent-600 | #D97706 | CTA buttons, links |
| accent-500 | #F59E0B | CTA hover state |
| accent-100 | #FEF3C7 | Disclosure bar background |
| white | #FFFFFF | Page background, card background |
| success | #16A34A | Paid/accepted status badges |
| error | #DC2626 | Declined/failed status badges, form errors |
| warning | #F59E0B | Pending status badges |

## Tailwind config extension

```js
// tailwind.config.ts colors.extend
colors: {
  brand: {
    900: '#0F172A',
    700: '#334155',
    500: '#64748B',
    100: '#F1F5F9',
  },
  accent: {
    600: '#D97706',
    500: '#F59E0B',
    100: '#FEF3C7',
  },
}
```

## Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| Body | Inter, system-ui, sans-serif | 16px (text-base) | 400 |
| H1 | Inter | 36px (text-4xl) | 700 |
| H2 | Inter | 28px (text-2xl) | 600 |
| H3 | Inter | 22px (text-xl) | 600 |
| Small | Inter | 14px (text-sm) | 400 |
| CTA button text | Inter | 16px (text-base) | 600 |

## Logo
Text-only for pilot: "SafeProvider" in Inter font-bold text-xl, color brand-900.
SVG/image logo will be added later. Build the Header component to accept an optional logo image prop with text fallback.

## CTA Button
- Background: accent-600 (#D97706)
- Text: white
- Hover: accent-500 (#F59E0B)
- Padding: py-3 px-6
- Radius: rounded-lg
- Shadow: shadow-sm
- Class: font-semibold

## Secondary Button
- Background: white
- Border: 1px brand-500
- Text: brand-900
- Hover: brand-100 background
- Padding: py-3 px-6
- Radius: rounded-lg

## Disclosure Bar
- Background: accent-100 (#FEF3C7)
- Text: brand-900 (#0F172A)
- Font size: text-sm
- Padding: py-2 px-4
- Full width, above header in root layout

## Cards
- Background: white
- Border: 1px solid brand-500/20
- Radius: rounded-xl
- Shadow: shadow-sm
- Padding: p-6

## Status Badges (admin)
- New/Pending: bg-amber-100 text-amber-800
- Paid/Active: bg-green-100 text-green-800
- Declined/Failed: bg-red-100 text-red-800
- Closed/Refunded: bg-gray-100 text-gray-800
```

---

# ============================================================
# SECTION E: THE 5 BUILD PROMPTS
# ============================================================
# Run in order. Each is a separate claude session in Terminal.
# Start each: cd ~/Projects/safeprovider-funnel && claude
# ============================================================

---

## PROMPT 1: Scaffold and Shared Shell

**Estimated time:** 30-45 min
**What it builds:** Project structure, shared layout, design tokens, route placeholders, env template

```
Read CLAUDE.md first and follow it strictly.
Read api-surface.md for exact function names and file paths. Use these names exactly.
Read content-seed.md for all page copy and disclosure wording. Do not invent content.
Read design-tokens.md for exact colors, fonts, and spacing. Do not invent design values.

This project uses the same stack as TradeTEST.TRAINING (Next.js App Router, Supabase, Stripe, Resend, PostHog, Zod, Tailwind, Vercel). Apply the same architectural patterns: SSR Supabase client with cookies, Zod env validation, Stripe webhook HMAC verification, Supabase Auth middleware for admin routes, PostHog non-blocking event tracking. Simplify where SafeProvider is simpler (no tiers, no adaptive engine, no i18n).

Goal:
Create the production-ready project scaffold for the SafeProvider funnel.

Do this now:
1. Inspect the repository and fix any broken config.
2. Create the base app directory structure matching CLAUDE.md file structure.
3. Add the Inter font via next/font/google in root layout.
4. Extend tailwind.config.ts with the exact color tokens from design-tokens.md.
5. Build shared root layout with:
   - DisclosureBar: amber banner (accent-100 bg) above header on every page. Text from content-seed.md header disclosure.
   - Header: text logo "SafeProvider" (Inter bold, brand-900), nav links (Counties, Pricing, How It Works, For Attorneys), phone CTA placeholder, "Start Intake" CTA button (accent-600).
   - Footer: county links (4 live counties), resource links (How It Works, Pricing, FAQ, For Attorneys), legal links (Privacy, Notice at Collection, Terms), disclosure text from content-seed.md footer disclosure.
6. Create src/lib/site-config.ts with exact exports from api-surface.md:
   - SITE_URL = process.env.NEXT_PUBLIC_SITE_URL or 'https://safeprovider.org'
   - SITE_NAME = 'SafeProvider'
   - SITE_DESCRIPTION from content-seed.md
   - PHONE placeholder for CallRail
   - EMAIL = 'gg@oog.life'
   - COUNTIES array: santa-clara, alameda, contra-costa, san-francisco (live) and marin (draft)
   - SERVICES array: supervised-visitation (min 2h), supervised-exchange (min 1h)
   - FALLBACK_RATES: intake 5000, hourly 7000, exchange 7000, platform 9900
7. Create route placeholder files (page.tsx with H1 heading matching content-seed.md headlines) for all 39 routes:
   - / , /how-it-works, /pricing, /counties, /for-attorneys, /faq, /contact, /start
   - /counties/[county], /counties/[county]/[service]
   - /services/supervised-visitation, /services/supervised-exchange
   - /checkout/success, /checkout/cancel
   - /privacy, /notice-at-collection, /terms
   - /admin/login, /admin, /admin/leads, /admin/cases, /admin/rates, /admin/payouts
   - /sitemap.xml (sitemap.ts), /robots.txt (robots.ts), /manifest.webmanifest
8. Create .env.local.example with every variable from the env list in CLAUDE.md.
9. Create README.md with macOS setup commands for local development.
10. Run pnpm lint and pnpm build. Fix any errors until both pass clean.

Constraints:
- SafeProvider is not the provider. Disclosure visible on every page.
- Do not hardcode pricing in page JSX. Use FALLBACK_RATES from site-config.ts only.
- Marin must stay draft/noindex. Not in any live arrays or generateStaticParams.
- Only 4 counties are live.
- Server components by default.
- @/ path alias for all imports.

Deliverables:
- Working scaffold that builds clean
- Shared UI layout (Header, Footer, DisclosureBar)
- All 39 route placeholders
- .env.local.example
- README.md
- Short changelog of what was created
```

**After it finishes:**
1. Run `pnpm build` yourself.
2. If clean, move to Prompt 2.
3. If errors, paste error output back into same session.

---

## PROMPT 2: Supabase Schema, Migrations, and Seed Data

**Estimated time:** 20-30 min
**What it builds:** 5 SQL migrations, seed data, TypeScript types, server helpers

```
Read CLAUDE.md first and follow it strictly.
Read api-surface.md for exact function names and file paths. Use these names exactly.

This project uses the same stack as TradeTEST.TRAINING (Next.js App Router, Supabase, Stripe, Resend, PostHog, Zod, Tailwind, Vercel). Apply the same architectural patterns: SSR Supabase client with cookies, Zod env validation, Supabase RLS structure, updated_at triggers, barrel exports. Simplify where SafeProvider is simpler (8 tables vs 57, no adaptive engine, no i18n).

Goal:
Implement the full Supabase backend for counties, services, rate cards, leads, checkouts, cases, payouts, and event logging.

Do this now:
1. Create 5 migration files in supabase/migrations/:

   a. 20260304000001_core_schema.sql - All 8 tables:
      - counties (id uuid PK, slug unique, name, launch_status check live/draft/paused, noindex bool, sort_order int, timestamps)
      - services (id uuid PK, slug unique, name, min_hours int default 2, active bool, timestamps)
      - rate_cards (id uuid PK, county_id FK, service_id FK, intake_per_adult_cents int, hourly_rate_cents int, exchange_fee_cents int, platform_fee_cents int default 9900, effective_date date, source_url text, source_note text, public_visible bool, verified_at timestamptz, timestamps, unique on county_id+service_id)
      - leads (id uuid PK, timestamps, first_name, last_name, email, phone, county_slug, service_slug, adults_count default 2, children_count default 1, court_order_status check yes/no/unknown, hearing_date, preferred_days text[], notes, source_channel, source_medium, source_campaign, gclid, landing_path, referrer, callrail_session_id, lead_status check new/qualified/payment_pending/paid/provider_review/accepted/declined/scheduled/closed/refunded default new)
      - checkouts (id uuid PK, lead_id FK, stripe_session_id unique, stripe_payment_intent_id, amount_total_cents, provider_component_cents, platform_fee_cents, stripe_fee_estimate_cents, payment_status check created/completed/expired/failed/refunded default created, paid_at, timestamps)
      - cases (id uuid PK, lead_id FK unique, provider_status check pending/accepted/declined/scheduled/active/closed default pending, provider_share_policy check full_provider_amount/eighty_twenty_share default full_provider_amount, provider_gross_cents default 0, provider_payout_cents default 0, first_service_at, scheduled_at, decline_reason, timestamps)
      - payout_batches (id uuid PK, case_id FK, payout_status check queued/sent/failed/void default queued, payout_amount_cents, payout_reference, payout_sent_at, timestamps)
      - event_log (id uuid PK, entity_type, entity_id uuid, event_name, payload jsonb default '{}', created_at)

   b. 20260304000002_indexes_and_triggers.sql - Indexes: leads(created_at desc), leads(lead_status), leads(county_slug, service_slug), checkouts(lead_id), cases(provider_status), event_log(entity_type, entity_id). Updated_at trigger function and triggers on all mutable tables.

   c. 20260304000003_rls_and_views.sql - Enable RLS on all 8 tables. Public read policies: counties where launch_status='live', services where active=true, rate_cards where public_visible=true. Anon insert on leads with check(true). Create views: public_rate_cards (joins counties+services+rate_cards, filters live+active+visible), admin_lead_summary (joins leads+checkouts+cases), admin_payout_queue (joins payout_batches+cases+leads).

   d. 20260304000004_seed.sql - Insert 5 counties (4 live, Marin draft noindex=true). Insert 2 services. Insert 10 rate cards (5 counties x 2 services). All pricing: intake 5000, hourly 7000, exchange 7000, platform 9900. Marin rate cards public_visible=false. ON CONFLICT DO UPDATE for idempotent reruns. Source URL: https://santaclara.courts.ca.gov/system/files/family/svp_sccounty.pdf

   e. 20260304000005_admin_write_policies.sql - Grant authenticated users full CRUD on leads, checkouts, cases, payout_batches, event_log, rate_cards. Grant authenticated UPDATE on counties and services. Do NOT grant anon any additional write access.

2. Create src/types/database.types.ts with Row, Insert, Update types for all 8 tables and view types.

3. Create server helpers in src/lib/supabase/ matching api-surface.md exactly:
   - client.ts: createSupabaseBrowserClient()
   - server.ts: createSupabaseServerClient() + createSupabaseAdmin()
   - rate-cards.ts: getPublicRates(), getRatesForCounty(), getRateForCountyService(), calcStarterPrice(), centsToUSD()
   - counties.ts: getLiveCounties(), getActiveServices()
   - leads.ts: createLead(), updateLeadStatus(), logEvent()
   - checkouts.ts: createCheckout(), markCheckoutComplete(), createCase()
   - index.ts: barrel export

4. Create src/lib/env.ts: env(key) with fail-fast error.

5. Update .env.local.example if any new vars needed.

6. Run pnpm lint and pnpm build. Fix all errors.

Constraints:
- Service-role key never in client-side files.
- Marin rate cards public_visible = false.
- admin views not accessible to anon.
- logEvent() strips email/phone from payload.
- All pricing in cents.

Deliverables:
- 5 migration SQL files
- TypeScript types file
- 7 server helper files
- Build/lint clean
- Short changelog
```

**After it finishes:**
1. Run `npx supabase db reset` (local) or paste migrations into Supabase Dashboard SQL editor in order.
2. Verify: 8 tables, public_rate_cards view returns rows, RLS enabled.
3. Move to Prompt 3.

---

## PROMPT 3: Public Marketing Pages and SEO

**Estimated time:** 45-60 min
**What it builds:** All public pages with Supabase pricing, SEO, FAQ schema, sitemap

```
Read CLAUDE.md first and follow it strictly.
Read api-surface.md for exact function names and file paths. Use these names exactly.
Read content-seed.md for all page copy and FAQ answers. Do not invent content.
Read design-tokens.md for exact colors and fonts. Do not invent design values.

This project uses the same stack as TradeTEST.TRAINING (Next.js App Router, Supabase, Tailwind, Vercel). Apply the same architectural patterns: server components for data fetching, generateStaticParams for dynamic routes, JSON-LD schema injection, buildMetadata helper pattern. Simplify where SafeProvider is simpler (no i18n, no adaptive engine, no tiers).

Goal:
Build all public funnel pages with real content from content-seed.md, live Supabase pricing, and proper SEO.

Do this now:
1. Create src/lib/seo/metadata.ts with buildMetadata() and defaultMetadata matching api-surface.md.
2. Create src/lib/seo/schemas.ts with faqSchema() and breadcrumbSchema() matching api-surface.md.
3. Create src/components/ui/PricingTable.tsx: server component, reads Supabase public_rate_cards, falls back to FALLBACK_RATES.
4. Create src/components/ui/FaqAccordion.tsx: client component with open/close toggle.

5. Build these pages with full content from content-seed.md:

   a. / (Home): Hero with H1 and subhead from content-seed.md. DisclosureBar already in layout. County selector (4 live counties as cards linking to /counties/[county]). Service cards for visitation and exchange. 3-step process (qualify, intake, pay). PricingTable with live rates. FAQ section using first 5 FAQ items from content-seed.md with faqSchema. Dual CTA (Start Intake button + Call).

   b. /how-it-works: 5 steps: qualify, intake form, pay on platform, provider reviews, scheduling begins. H1 and subhead from content-seed.md.

   c. /pricing: Full PricingTable from Supabase. Both starter package examples from content-seed.md with math. Pricing FAQ. Disclaimer.

   d. /counties: 4 county cards linking to hubs. Why county matters. Service summary.

   e. /counties/[county]: generateStaticParams for 4 live counties only. County hero with courthouse name and address from content-seed.md. Service links. Documents checklist from content-seed.md. Pricing sidebar from Supabase. County FAQ with faqSchema. Breadcrumb schema. Local note from content-seed.md.

   f. /counties/[county]/[service]: generateStaticParams for 8 combos. Service hero. Fit checklist (different for visitation vs exchange using content-seed.md descriptions). Exact starter price from Supabase rates. Documents. Post-payment steps. FAQ with faqSchema. Amber alert: payment does not guarantee acceptance (content-seed.md wording). Breadcrumb schema.

   g. /services/supervised-visitation: Content from content-seed.md supervised visitation description. Prices from Supabase. CTA.
   h. /services/supervised-exchange: Content from content-seed.md exchange description. Prices from Supabase. CTA.

   i. /for-attorneys: What SafeProvider handles vs does not (table). 3 referral steps. Client checklist. County quick-links. Attorney FAQ from content-seed.md.

   j. /faq: All 10 FAQ items from content-seed.md in FaqAccordion with faqSchema.

   k. /contact: Phone placeholder, email (gg@oog.life), business hours, county list.

   l. /privacy, /notice-at-collection, /terms: Legal pages with entity name "Safe Provider". Mark top with [ATTORNEY REVIEW REQUIRED].

   m. /sitemap.ts: All live public routes. Exclude Marin, admin, checkout, API.
   n. /robots.ts: Disallow /admin/, /checkout/, /api/, /counties/marin.

6. Call buildMetadata() on every page with correct title, description, canonical, noindex where needed.
7. Run pnpm lint and pnpm build. Fix all errors.

Constraints:
- No pricing in JSX. All from Supabase with FALLBACK_RATES backup.
- Marin NOT in generateStaticParams, sitemap, or nav.
- No LocalBusiness schema.
- Disclosure bar in root layout (already from Prompt 1).
- Footer disclosure from content-seed.md.
- County pages must have unique useful content from content-seed.md.
- Server components for all data-fetching pages.
- All copy from content-seed.md. Do not invent headlines, FAQ answers, or descriptions.

Deliverables:
- All public pages with real content
- SEO metadata on every page
- FAQ and breadcrumb schema
- Sitemap and robots
- Build/lint clean
- Short changelog
```

**After it finishes:**
1. Run `pnpm build`.
2. Browse localhost:3000. Check: home loads with pricing, county pages show courthouse info, FAQ works, Marin 404s.
3. Move to Prompt 4.

---

## PROMPT 4: Intake Wizard, Stripe Checkout, and Webhook

**Estimated time:** 45-60 min
**What it builds:** Multi-step intake form, Stripe payment, webhook, email notification

```
Read CLAUDE.md first and follow it strictly.
Read api-surface.md for exact function names and file paths. Use these names exactly.
Read content-seed.md for disclosure wording on checkout pages. Do not invent content.
Read design-tokens.md for form and button styling. Do not invent design values.

This project uses the same stack as TradeTEST.TRAINING (Next.js App Router, Supabase, Stripe, Resend, Zod). Apply the same architectural patterns: Zod form validation, Stripe Checkout Session creation, Stripe webhook HMAC signature verification, Resend email with renderToStaticMarkup, lead-before-payment insert pattern. Simplify where SafeProvider is simpler (single checkout product, no tiers, no subscription).

Goal:
Implement the intake flow that captures lead details, creates a Stripe Checkout Session, verifies payment via webhook, and writes everything to Supabase.

Do this now:
1. Create src/lib/validations/intake.ts matching api-surface.md:
   - intakeSchema: Zod schema for county_slug, service_slug, adults_count (default 2), children_count (default 1), court_order_status (yes/no/unknown), hearing_date (optional), first_name, last_name, phone, email, notes (optional)
   - IntakeData type inferred from schema
   - COUNTY_OPTIONS: { value, label }[] from site-config COUNTIES (live only)
   - SERVICE_OPTIONS: { value, label }[] from site-config SERVICES

2. Create src/lib/stripe/index.ts matching api-surface.md: getStripe() singleton.

3. Build /start page as client component with 4-step wizard:
   - Step 1: County selector + service selector (cards or dropdowns)
   - Step 2: Family details (adults count, children count, court order status radio, hearing date optional)
   - Step 3: Contact info (first name, last name, phone, email, notes textarea)
   - Step 4: Review all inputs + price estimate from calcStarterPrice() + "Pay and Submit" button (accent-600)
   - Capture UTM params and gclid from URL on mount
   - H1 and subhead from content-seed.md
   - Use design-tokens.md for all form styling

4. Create /api/leads/route.ts (POST):
   - Validate with intakeSchema
   - Insert lead via createLead() (status: new)
   - Log event via logEvent()
   - Return { leadId }

5. Create /api/checkout/route.ts (POST):
   - Accept leadId
   - Read pricing via getRateForCountyService()
   - Fall back to FALLBACK_RATES if missing
   - Calculate totals via calcStarterPrice()
   - Create Stripe Checkout Session with line items and metadata (leadId, provider_gross_cents, platform_fee_cents, provider_share_policy)
   - Insert checkout via createCheckout() (payment_status: created)
   - Update lead to payment_pending via updateLeadStatus()
   - Return { url }

6. Create /api/stripe/webhook/route.ts (POST):
   - Read raw body, verify Stripe-Signature with STRIPE_WEBHOOK_SECRET. Return 400 if invalid.
   - Handle checkout.session.completed only:
     a. markCheckoutComplete() with guard on payment_status = 'created'
     b. updateLeadStatus() to 'paid'
     c. createCase() with provider_status = 'pending', share policy and gross from metadata
     d. Send internal email via Resend to gg@oog.life (non-blocking: catch and log errors)
   - Return 200 for unhandled events

7. Create src/emails/intake-received.tsx:
   - Internal email with all lead fields, payment amount, Stripe session ID
   - Yellow "ACTION REQUIRED" banner
   - Text: "New paid intake on SafeProvider. Provider review needed. Do NOT auto-accept."

8. Build /checkout/success:
   - Confirm paid via Stripe session
   - Show success message from content-seed.md checkout success wording
   - Next steps text
   - Link home

9. Build /checkout/cancel:
   - Show cancel message from content-seed.md checkout cancel wording
   - Link to /start

10. Update next.config.ts: serverComponentsExternalPackages: ['stripe'] if needed.

11. Run pnpm lint and pnpm build. Fix all errors.

Constraints:
- Lead MUST save before Stripe redirect.
- Webhook MUST verify signature before any DB write.
- Webhook MUST be idempotent: only process if payment_status = 'created'.
- Provider acceptance NEVER automatic. Webhook sets pending only.
- Email failure MUST NOT fail webhook.
- Pricing from Supabase at checkout time.
- Service-role key only in API routes and webhook.
- All function names from api-surface.md exactly.

Deliverables:
- Working intake wizard
- Stripe Checkout Session creation
- Verified webhook
- Internal email
- Success/cancel pages
- Build/lint clean
- Short changelog
```

**After it finishes:**
1. Run `pnpm build`.
2. Set up test webhook: `stripe listen --forward-to http://localhost:3000/api/stripe/webhook`
3. Walk through flow: select county, fill details, pay with test card 4242 4242 4242 4242 (any future expiry, any CVC).
4. Verify in Supabase: lead row (status=paid), checkout row (completed), case row (pending).
5. Check gg@oog.life for notification email.
6. Move to Prompt 5.

---

## PROMPT 5: Admin Layer, Event Tracking, QA, and Deploy

**Estimated time:** 45-60 min
**What it builds:** Admin pages, auth, event tracking, analytics, deploy config

```
Read CLAUDE.md first and follow it strictly.
Read api-surface.md for exact function names and file paths. Use these names exactly.
Read design-tokens.md for admin styling and status badges. Do not invent design values.

This project uses the same stack as TradeTEST.TRAINING (Next.js App Router, Supabase Auth, PostHog, Vercel). Apply the same architectural patterns: Supabase Auth middleware for route protection, server-side auth guard in admin layout, PostHog non-blocking event tracking with null guard, sessionStorage UTM persistence. Simplify where SafeProvider is simpler (no tiers, no adaptive engine, 5 admin pages vs 80 pages).

Goal:
Finish the internal operating layer so the funnel is usable in a real pilot.

Do this now:

PART A - AUTH:
1. Create src/middleware.ts: Supabase Auth middleware protecting all /admin/* routes. Redirect unauthenticated to /admin/login.
2. Build /admin/login: email/password form, error display, redirect to /admin on success. Use design-tokens.md styling.
3. Create /admin/layout.tsx: admin shell with sidebar nav.
4. Create AdminNav component at path from api-surface.md: sidebar with Dashboard, Leads, Cases, Rates, Payouts, Sign Out.

PART B - ADMIN PAGES:
5. /admin (dashboard): 5 count tiles (new leads today, payment pending, paid awaiting review, active cases, queued payouts). Status badge colors from design-tokens.md. Each links to detail page.
6. /admin/leads: table with created_at, name, county, service, lead_status, payment_status, amount. Status filter tabs. Inline status dropdown saves to Supabase via updateLeadStatus().
7. /admin/cases: table joined with lead data. Provider status dropdown saves. Default filter: pending.
8. /admin/rates: all rate cards. Editable fields: intake, hourly, exchange, platform (display dollars, save cents). Effective date. Source URL. Public visible toggle. Mark Verified button. Save per row.
9. /admin/payouts: payout_batches joined with case+lead. Reference text input. Status dropdown. Mark Sent button (writes payout_sent_at, sets sent). Disable on already-sent.

PART C - EVENT TRACKING:
10. Create src/lib/analytics/events.ts matching api-surface.md: track() function for 9 events. Write to event_log via /api/events. Fire to PostHog if NEXT_PUBLIC_POSTHOG_KEY set (non-blocking).
11. Create src/lib/analytics/utm.ts matching api-surface.md: captureUtm(), getStoredUtm(). Persist in sessionStorage.
12. Create /api/events/route.ts: POST, validate, insert event_log.
13. Add PostHog script init in root layout: if NEXT_PUBLIC_POSTHOG_KEY is set, load via next/script afterInteractive. If not set, skip silently.
14. Add CallRail comment placeholder in root layout head.

PART D - DEPLOY PREP:
15. Verify .env.local.example has ALL variables including PostHog and CallRail.
16. Verify robots.ts disallows /admin/, /checkout/, /api/, /counties/marin.
17. Verify sitemap.ts includes all live public routes.
18. Run pnpm lint, pnpm build, pnpm tsc --noEmit. Fix all errors.

Constraints:
- Admin pages server-rendered with auth check.
- All admin mutations use createSupabaseAdmin(), never anon client.
- Event tracking never blocks user actions.
- PostHog optional. Silent skip if no key.
- No console.error in browser on admin pages in normal operation.
- Keep admin simple. No unnecessary animation.
- All function names from api-surface.md.

Deliverables:
- Working admin login and auth
- 5 admin pages
- Event tracking (9 events)
- UTM capture
- Deploy-ready config
- Build/lint clean
- Short changelog
```

**After it finishes:**
1. Run `pnpm build`.
2. Create admin user in Supabase Dashboard: Authentication > Users > Add User.
3. Test login at /admin/login.
4. Verify all 5 admin pages load.
5. Move to deploy.

---

# ============================================================
# SECTION F: DEPLOY SEQUENCE
# ============================================================

```bash
# 1. Link to Vercel
cd ~/Projects/safeprovider-funnel
vercel link

# 2. Set env vars in Vercel Dashboard
# Project > Settings > Environment Variables
# Add every variable from .env.local.example

# 3. Pull env vars locally
vercel env pull .env.local

# 4. Preview deploy
vercel deploy

# 5. Run QA on preview URL (Section G below)

# 6. Production deploy (after QA passes)
vercel deploy --prod
```

**Post-deploy:**
1. Register Stripe webhook in Dashboard: `https://safeprovider.org/api/stripe/webhook`, event: `checkout.session.completed`
2. Set up CallRail pool for safeprovider.org
3. Verify /pricing shows live rates

---

# ============================================================
# SECTION G: QA SMOKE TEST
# ============================================================

### Public pages
- [ ] Home loads with pricing table
- [ ] /counties shows 4 county cards (no Marin)
- [ ] /counties/santa-clara shows courthouse info and pricing
- [ ] /counties/santa-clara/supervised-visitation shows starter price
- [ ] /counties/marin returns 404
- [ ] /pricing shows live rate table
- [ ] /for-attorneys loads with referral steps
- [ ] /faq accordion opens and closes
- [ ] /sitemap.xml excludes Marin and admin
- [ ] /robots.txt disallows admin, checkout, API, Marin
- [ ] Disclosure bar visible on every page
- [ ] Footer disclosure visible on every page

### Intake flow
- [ ] /start renders 4-step wizard
- [ ] County + service selection works
- [ ] Contact form validates required fields
- [ ] Review shows correct price estimate
- [ ] Pay button redirects to Stripe Checkout
- [ ] Test card 4242 4242 4242 4242 completes payment
- [ ] /checkout/success shows confirmation message
- [ ] Supabase: lead status = paid
- [ ] Supabase: checkout payment_status = completed
- [ ] Supabase: case provider_status = pending
- [ ] Email received at gg@oog.life

### Admin
- [ ] /admin redirects to /admin/login when not authenticated
- [ ] Login works with valid credentials
- [ ] Dashboard shows count tiles
- [ ] Leads table loads, status dropdown saves
- [ ] Cases table loads, provider status saves
- [ ] Rates page loads, edits save
- [ ] Payouts table loads, mark-sent works
- [ ] Sign out clears session

### Webhook
- [ ] Invalid signature returns 400
- [ ] Replay does not double-write

### Build
- [ ] pnpm lint passes
- [ ] pnpm build passes
- [ ] pnpm tsc --noEmit passes
- [ ] No console.error on any page

---

# ============================================================
# SECTION H: STRIPE TEST CARDS
# ============================================================

| Card | Number | Use |
|---|---|---|
| Success | 4242 4242 4242 4242 | Normal successful payment |
| Decline | 4000 0000 0000 0002 | Card declined |
| Requires auth | 4000 0025 0000 3155 | 3D Secure required |

All test cards: any future expiry date, any 3-digit CVC, any ZIP code.

---

# ============================================================
# SECTION I: ERROR RECOVERY BETWEEN PROMPTS
# ============================================================

### If a prompt fails midway

1. Do NOT re-run the entire prompt.
2. Read the error output.
3. Paste this into the SAME Claude Code session:

```
The previous task failed at [describe where]. Here is the error:
[paste error]
Fix the error and continue from where you stopped. Do not redo completed work.
```

4. If Claude Code warns about context length, start a NEW session:

```
Read CLAUDE.md and all referenced .md files.
Inspect the current codebase state.
The last completed workstream was Prompt [N].
Pick up from [specific file or step that failed].
Here is the error:
[paste error]
```

5. Always run `pnpm build` after recovery before moving to the next prompt.

### If Supabase migrations fail

1. Check which migration failed (they run in order).
2. Fix the SQL error in that migration file.
3. Run `npx supabase db reset` to replay all migrations from scratch.
4. Do NOT manually patch the database. Always fix the migration file.

---

# ============================================================
# SECTION J: TROUBLESHOOTING
# ============================================================

| Error | Fix |
|---|---|
| cookies() should be awaited | Next.js 15+: change cookies() to await cookies() in server.ts |
| Cannot find module '@supabase/ssr' | Run pnpm add @supabase/ssr |
| stripe not in server components | Add serverComponentsExternalPackages: ['stripe'] to next.config.ts |
| RLS violation on lead insert | Verify leads_insert_anon policy. Or use service-role in API route. |
| Webhook 400 on Stripe events | Verify STRIPE_WEBHOOK_SECRET matches signing secret |
| Rate cards return empty | Run seed migration. Check public_visible=true and launch_status='live' |
| Marin pages rendering | Verify Marin NOT in generateStaticParams |
| Build fails on missing env | Create .env.local from .env.local.example with real values |
| Admin pages 500 | Verify SUPABASE_SERVICE_ROLE_KEY is set. Verify admin user exists. |
| PostHog errors | If no key set, should skip silently. Check events.ts has null guard. |

---

# ============================================================
# SECTION K: ENV VARS MASTER LIST
# ============================================================

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
RESEND_FROM=noreply@safeprovider.org
INTERNAL_NOTIFY_EMAIL=gg@oog.life

# Site
NEXT_PUBLIC_SITE_URL=https://safeprovider.org
NEXT_PUBLIC_APP_URL=https://safeprovider.org

# Analytics (optional in dev, add for production)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# CallRail (optional in dev, add for production)
NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID=
NEXT_PUBLIC_CALLRAIL_NUMBER=
```
