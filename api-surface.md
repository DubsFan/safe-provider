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
