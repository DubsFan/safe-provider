# SafePair Funnel - Build Gaps and Fixes

**What this is:** Every missing piece that will cause Claude Code to stall, hallucinate, or produce inconsistent output across the 5 prompts.

**Status:** 13 gaps found. 8 fixable right now. 5 need your input.

---

## GAP MAP

| # | Gap | Severity | Fix |
|---|---|---|---|
| 1 | Zero source code files exist in the project | BLOCKER | Prior chats built files but never saved them. Claude Code starts from scratch every prompt. This is fine IF the prompts are self-contained. They are now. No fix needed. |
| 2 | No CLAUDE.md file in the repo yet | BLOCKER | Runbook has it in Section A. Must be created before Prompt 1. Provide as standalone file below. |
| 3 | No content dictionary for page copy | HIGH | Claude Code will invent FAQ answers, county courthouse names, page headlines, and disclosure wording. Some will be wrong. Provide a content seed file. |
| 4 | No design tokens file | MEDIUM | Claude Code will pick random colors and fonts each session. Provide exact hex values, font stack, and spacing scale. |
| 5 | No image assets (logo, favicon, OG image) | MEDIUM | Claude Code cannot generate images. Provide SVG logo or skip and use text-only logo for now. |
| 6 | No interface contracts between prompts | HIGH | If Prompt 1 names a function `getPublicRateCards()` but Prompt 2 expects `getPublicRates()`, Prompt 3 breaks. Provide a shared API surface file. |
| 7 | No legal page content | MEDIUM | Privacy policy, terms, notice at collection need real text. Claude Code will write generic placeholders. Acceptable for pilot if marked [ATTORNEY REVIEW REQUIRED]. |
| 8 | No customer-facing email templates | LOW | Only internal notification email is specified. No confirmation email to the paying customer. Add spec or skip for phase 1. |
| 9 | No Stripe test card instructions | LOW | QA checklist says "complete test checkout" but does not give test card number. Add to runbook. |
| 10 | Admin RLS write policies migration missing | HIGH | Migration 003 has public read policies. No migration grants authenticated admin users write access. Claude Code may create conflicting policies. |
| 11 | No error recovery between prompts | MEDIUM | If Prompt 2 fails halfway, there is no rollback or resume guidance. Add recovery protocol. |
| 12 | CallRail JS snippet not specified | LOW | Referenced in QA checklist but no implementation in any prompt. Placeholder is fine for pilot. |
| 13 | PostHog initialization not specified | LOW | Event tracking references PostHog but no script tag or provider setup. Add to Prompt 5 or skip. |

---

## FIX 1: STANDALONE CLAUDE.md FILE

Already in the runbook. No change needed. Remind yourself: create it BEFORE running Prompt 1.

```bash
cd ~/Projects/safepair-funnel
# Paste Section A from the runbook into this file
touch CLAUDE.md
```

---

## FIX 2: CONTENT SEED FILE

Create this as `content-seed.md` in the project root. Claude Code reads it when building pages.

Add this line to the end of each prompt that builds pages (Prompts 1, 3, 4):
```
Read content-seed.md for all page copy, FAQ answers, county details, and disclosure wording. Do not invent content. Use exactly what is in the seed file.
```

```markdown
# SafePair Funnel - Content Seed

## Brand name
Platform brand: [YOUR BRAND NAME HERE]
Provider brand: SafePair

## Disclosure wording (use exactly)
- Header bar: "Intake and scheduling managed by [YOUR BRAND]. Supervised visitation and exchange services delivered by SafePair."
- Footer: "Not a law firm. Not the court-listed provider. [YOUR BRAND] manages intake, scheduling, and payment only. All supervised visitation and exchange services are delivered by SafePair."
- County-service payment alert: "Payment does not guarantee provider acceptance. SafePair reviews every case independently."
- Checkout success: "Your payment has been received. SafePair will review your case within 1-2 business days. You will receive a call or email to confirm scheduling."

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

### General
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
A: No. This platform manages intake, scheduling, and payment only. We are not a law firm and do not provide legal advice. Supervised visitation and exchange services are delivered by SafePair.

Q: What documents do I need?
A: Have ready: a valid government-issued photo ID, your court order or stipulation (if applicable), the other parent's contact information, and your preferred schedule.

Q: Who is the provider?
A: All supervised visitation and exchange services are delivered by SafePair, a professional supervised visitation provider with trained, background-checked monitors.

### For Attorneys
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
```

---

## FIX 3: DESIGN TOKENS FILE

Create as `design-tokens.md` in the project root.

Add this line to Prompt 1:
```
Read design-tokens.md for exact colors, fonts, and spacing. Do not invent design values.
```

```markdown
# SafePair Funnel - Design Tokens

## Colors
| Token | Hex | Use |
|---|---|---|
| primary-900 | #0F172A | Headings, body text |
| primary-700 | #334155 | Secondary text |
| primary-500 | #64748B | Muted text, borders |
| primary-100 | #F1F5F9 | Light backgrounds |
| accent-600 | #D97706 | CTA buttons, links, disclosure bar background |
| accent-500 | #F59E0B | CTA hover |
| accent-100 | #FEF3C7 | Disclosure bar background (light) |
| white | #FFFFFF | Page background, card background |
| success | #16A34A | Paid/accepted status badges |
| error | #DC2626 | Declined/failed status badges, form errors |
| warning | #F59E0B | Pending status badges |

## Tailwind mapping
```js
// tailwind.config.ts extend
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
| CTA button | Inter | 16px | 600 |

## CTA Button
- Background: accent-600
- Text: white
- Hover: accent-500
- Padding: py-3 px-6
- Radius: rounded-lg
- Shadow: shadow-sm

## Disclosure Bar
- Background: accent-100
- Text: primary-900
- Font size: text-sm
- Padding: py-2 px-4
- Full width, sticky or static above header

## Cards
- Background: white
- Border: 1px primary-500/20
- Radius: rounded-xl
- Shadow: shadow-sm
- Padding: p-6
```

---

## FIX 4: SHARED API SURFACE FILE

Create as `api-surface.md` in the project root.

Add this line to EVERY prompt:
```
Read api-surface.md for exact function names, file paths, and import patterns. Use these names exactly. Do not rename.
```

```markdown
# SafePair Funnel - Shared API Surface

## File paths and exports (use exactly)

### src/lib/site-config.ts
- `SITE_URL: string`
- `SITE_NAME: string`
- `SITE_DESCRIPTION: string`
- `PHONE: string`
- `EMAIL: string`
- `COUNTIES: { slug, name, status, noindex, sortOrder }[]`
- `SERVICES: { slug, name, minHours }[]`
- `FALLBACK_RATES: { intake_per_adult_cents: 5000, hourly_rate_cents: 7000, exchange_fee_cents: 7000, platform_fee_cents: 9900 }`

### src/lib/env.ts
- `env(key: string): string` - throws if missing

### src/lib/supabase/client.ts
- `createSupabaseBrowserClient()` - singleton, anon key

### src/lib/supabase/server.ts
- `createSupabaseServerClient()` - SSR anon client (uses cookies)
- `createSupabaseAdmin()` - service-role client (server-only)

### src/lib/supabase/rate-cards.ts
- `getPublicRates()` - all visible rates
- `getRatesForCounty(countySlug: string)` - rates for one county
- `getRateForCountyService(countySlug: string, serviceSlug: string)` - single rate
- `calcStarterPrice(rate, adultsCount: number, serviceSlug: string): { intake, service, platform, total }` - all in cents
- `centsToUSD(cents: number): string` - formats as "$X.XX"

### src/lib/supabase/counties.ts
- `getLiveCounties()` - only launch_status = 'live'
- `getActiveServices()` - only active = true

### src/lib/supabase/leads.ts
- `createLead(data): Promise<{ id: string }>`
- `updateLeadStatus(leadId: string, status: string)`
- `logEvent(entityType: string, entityId: string, eventName: string, payload: object)`

### src/lib/supabase/checkouts.ts
- `createCheckout(data): Promise<{ id: string }>`
- `markCheckoutComplete(stripeSessionId: string, paymentIntentId: string)`
- `createCase(leadId: string, data): Promise<{ id: string }>`

### src/lib/supabase/index.ts
- barrel export of all above

### src/lib/stripe/index.ts
- `getStripe(): Stripe` - singleton server client

### src/lib/validations/intake.ts
- `intakeSchema` - Zod schema
- `type IntakeData` - inferred type
- `COUNTY_OPTIONS: { value, label }[]`
- `SERVICE_OPTIONS: { value, label }[]`

### src/lib/seo/metadata.ts
- `buildMetadata(options: { title, description, path, noindex? }): Metadata`
- `defaultMetadata: Metadata`

### src/lib/seo/schemas.ts
- `faqSchema(items: { question, answer }[]): string` - JSON-LD
- `breadcrumbSchema(items: { name, url }[]): string` - JSON-LD

### src/lib/analytics/events.ts
- `track(event: string, properties?: object): void`
- Event names: page_view, click_call, start_intake, submit_intake, checkout_created, checkout_completed, provider_accepted, provider_declined, case_scheduled

### src/lib/analytics/utm.ts
- `captureUtm(): object` - reads URL params
- `getStoredUtm(): object` - reads sessionStorage

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

## Component names (use exactly)

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

## FIX 5: ADMIN RLS WRITE POLICIES

Add this to the end of Prompt 2's migration list:

```
e. 20260304000005_admin_write_policies.sql - Grant authenticated users full CRUD on leads, checkouts, cases, payout_batches, event_log, rate_cards. Grant authenticated users UPDATE on counties and services. Do NOT grant anon any write access to these tables except the existing leads_insert_anon policy.
```

---

## FIX 6: STRIPE TEST INSTRUCTIONS

Add to the QA section of the runbook:

```
## Stripe test cards
- Success: 4242 4242 4242 4242, any future expiry, any CVC, any ZIP
- Decline: 4000 0000 0000 0002
- Requires auth: 4000 0025 0000 3155
```

---

## FIX 7: ERROR RECOVERY PROTOCOL

Add to the runbook between prompts:

```
## If a prompt fails midway

1. Do NOT re-run the entire prompt.
2. Read the error output.
3. Paste this into the SAME Claude Code session:

   "The previous task failed at [describe where]. Here is the error:
   [paste error]
   Fix the error and continue from where you stopped. Do not redo completed work."

4. If the session is too long (Claude Code warns about context), start a NEW session with:

   "Read CLAUDE.md. Inspect the current state of the codebase. The last completed workstream was [Prompt N]. Pick up from [specific file or step that failed]. Here is the error: [paste error]."

5. Always run pnpm build after recovery before moving to the next prompt.
```

---

## FIX 8: POSTTHOG AND CALLRAIL INIT

Add to Prompt 5 Part C:

```
13. Add PostHog script initialization:
    - If NEXT_PUBLIC_POSTHOG_KEY is set, load PostHog JS in root layout via Script tag (afterInteractive strategy).
    - If not set, skip silently. No errors.
14. Add CallRail placeholder:
    - Add a comment block in root layout head where CallRail swap.js snippet will go.
    - Do not add the actual script (needs account-specific values).
```

---

## DECISIONS NEEDED FROM YOU

These 5 items need your input before the build runs clean end-to-end.

| # | Question | Default if you skip |
|---|---|---|
| 1 | **Platform brand name** - What name goes on the site? Not SafePair (that is the provider). | "SafePair Intake" (placeholder) |
| 2 | **Domain** - What domain will this deploy to? | yourdomain.com (placeholder in env) |
| 3 | **Logo** - Do you have an SVG or PNG logo file? | Text-only logo using brand name |
| 4 | **Entity for legal pages** - What LLC or entity name goes on privacy/terms? | [ENTITY NAME] placeholder |
| 5 | **Admin email** - Where do internal intake notifications go? | admin@yourdomain.com |

---

## UPDATED PROMPT HEADER (add to all 5 prompts)

Replace the first line of each prompt with:

```
Read CLAUDE.md first and follow it strictly.
Read api-surface.md for exact function names and file paths. Use these names exactly.
Read content-seed.md for all page copy and FAQ answers. Do not invent content.
Read design-tokens.md for exact colors and fonts. Do not invent design values.
```

---

## FILE CHECKLIST (create all before Prompt 1)

```
~/Projects/safepair-funnel/
  CLAUDE.md              <- from runbook Section A
  api-surface.md         <- from Fix 4 above
  content-seed.md        <- from Fix 2 above (fill in your brand name first)
  design-tokens.md       <- from Fix 3 above
```
