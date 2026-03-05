# SafeProvider - Per-Page Claude Code CLI Prompts

**Use these INSTEAD of Prompt 3 in the main runbook if you want page-by-page control.**
**Prerequisite:** Prompts 1 and 2 from the main runbook must be complete first (scaffold + Supabase).

Run each from: `cd ~/Projects/safeprovider-funnel && claude`

Every prompt starts with the same header. Copy it once per session:

```
Read CLAUDE.md first and follow it strictly.
Read api-surface.md for exact function names and file paths.
Read content-seed.md for ALL page copy, headlines, FAQ answers, trust signals, and disclosure wording. Do not invent any content. Use content-seed.md exactly.
Read design-tokens.md for colors, fonts, and spacing.
This project uses the same stack as TradeTEST.TRAINING. Apply the same patterns.
```

---

## PAGE 1: SEO and Shared UI Utilities

Run this first. All other pages depend on these files.

```
Build the shared SEO and UI utility files that all pages depend on.

1. Create src/lib/seo/metadata.ts:
   - buildMetadata({ title, description, path, noindex? }) returns Next.js Metadata object
   - Sets canonical URL, OG title, OG description, OG image (/og-image.png), robots
   - defaultMetadata with SITE_NAME and SITE_DESCRIPTION from site-config.ts

2. Create src/lib/seo/schemas.ts:
   - faqSchema(items: { question, answer }[]) returns JSON-LD string
   - breadcrumbSchema(items: { name, url }[]) returns JSON-LD string

3. Create src/components/ui/PricingTable.tsx:
   - Server component
   - Reads from Supabase public_rate_cards view via getPublicRates()
   - Falls back to FALLBACK_RATES if Supabase unavailable
   - Renders clean table with columns: Service, Intake, Hourly Rate, Exchange, Platform Fee
   - Format cents to dollars using centsToUSD()
   - Include source attribution line from content-seed.md pricing section

4. Create src/components/ui/FaqAccordion.tsx:
   - Client component ("use client")
   - Accepts items: { question, answer }[]
   - Click to expand/collapse each item
   - Only one item open at a time
   - Use design-tokens.md styling

5. Run pnpm lint and pnpm build. Fix errors.

Deliverables: 4 files, build clean.
```

---

## PAGE 2: Home Page (/)

```
Build the home page at src/app/page.tsx using content-seed.md for ALL copy.

Section architecture (build in this exact order):

1. Hero section:
   - H1: Use exact H1 from content-seed.md Home section
   - Subhead: Use exact subhead from content-seed.md Home section
   - Primary CTA button: "Start Intake" linking to /start (accent-600 from design-tokens)
   - Secondary CTA: "Call Now" with phone from site-config
   - Tertiary link: "See Pricing" linking to /pricing
   - Microproof line below CTAs: Use exact response time promise from content-seed.md

2. Three benefit cards:
   - Use exact card labels and descriptions from content-seed.md Home section (Neutral Supervision, Court-Ready Documentation, Flexible Scheduling)
   - Card styling from design-tokens.md

3. Three trust bullets:
   - Use exact trust bullets from content-seed.md Home section
   - Small text, muted color, centered

4. County selector:
   - 4 county cards linking to /counties/[county]
   - County names from COUNTIES in site-config.ts (live only)
   - Card styling from design-tokens.md

5. 3-step process:
   - Use exact step titles and descriptions from content-seed.md Home section
   - Numbered steps with accent-600 numbers

6. Live pricing snapshot:
   - Use PricingTable component
   - Include source attribution line

7. FAQ section:
   - First 5 FAQ items from content-seed.md (first from each category)
   - Use FaqAccordion component
   - Inject faqSchema JSON-LD in head

8. Closing CTA block:
   - Use exact closing copy from content-seed.md Home section
   - "Start Intake" button

Call buildMetadata() with Home title and description.
Run pnpm lint and pnpm build. Fix errors.
```

---

## PAGE 3: How It Works (/how-it-works)

```
Build src/app/how-it-works/page.tsx using content-seed.md for ALL copy.

1. H1 and subhead: exact text from content-seed.md How It Works section

2. 5 steps:
   - Use exact step titles and descriptions from content-seed.md
   - Each step gets a numbered card or section
   - Step numbers use accent-600

3. Standard 5.20 plain language block:
   - Use exact text from content-seed.md trust signals section
   - Style as a highlighted callout box with brand-100 background

4. "What to have ready" checklist:
   - Use exact 6 items from content-seed.md
   - Render as a clean numbered or check-marked list

5. CTA: "Start Intake" button linking to /start
6. Microproof: response time promise from content-seed.md

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 4: Pricing (/pricing)

```
Build src/app/pricing/page.tsx using content-seed.md for ALL copy.

1. H1 and subhead: exact text from content-seed.md Pricing section
2. Body paragraph: exact pricing page body copy from content-seed.md

3. Full live rate table:
   - Use PricingTable component (reads from Supabase)
   - Include additional child fee row ($50 flat)
   - Include sliding scale note

4. Three starter package examples:
   - Use all 3 examples from content-seed.md (visitation starter, exchange starter, 30-day package)
   - Show line-by-line math for each
   - Include the label text from content-seed.md

5. "What you pay for" block:
   - Use exact text from content-seed.md

6. Hours and visit length:
   - Mon-Fri 9am-5pm, Sat-Sun 9am-7pm
   - Typical visit: 2-4 hours

7. Source attribution: exact source line from content-seed.md

8. Pricing FAQ:
   - Use all 5 "Cost and pricing" FAQ items from content-seed.md
   - FaqAccordion with faqSchema

9. CTA: "Start Intake"

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 5: Counties Hub (/counties)

```
Build src/app/counties/page.tsx using content-seed.md for ALL copy.

1. H1, subhead, body: exact text from content-seed.md Counties section
2. 4 county cards (live only, no Marin):
   - County name, courthouse name, address from content-seed.md
   - Link to /counties/[county]
   - Card styling from design-tokens.md
3. Service summary: brief cards for supervised visitation and exchange linking to /services/[service]
4. CTA: "Start Intake"

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 6: County Hub Template (/counties/[county])

```
Build src/app/counties/[county]/page.tsx using content-seed.md for ALL copy.

generateStaticParams(): 4 live counties only. No Marin.

For each county, render:

1. H1: "Supervised Visitation and Exchange in [County Name]"
   Subhead from content-seed.md county hub section

2. Courthouse info: name and address from content-seed.md county details
3. Local note from content-seed.md county details

4. Service links: cards linking to /counties/[county]/supervised-visitation and /counties/[county]/supervised-exchange

5. "What to have ready" checklist: exact 6 items from content-seed.md

6. Pricing sidebar/section: live rates from Supabase via getRatesForCounty()

7. Compliance proof block: exact text from content-seed.md trust signals

8. Standard 5.20 plain language block: exact text from content-seed.md

9. County FAQ (5 items): use general process FAQ items from content-seed.md, inject faqSchema

10. Breadcrumb schema: Home > Counties > [County Name]

11. CTA: "Start Intake for [County Name]" linking to /start with county pre-selected
12. Microproof: response time promise

Call buildMetadata() with county-specific title and description. Noindex if county is draft.
Run pnpm build.
```

---

## PAGE 7: County-Service Template (/counties/[county]/[service])

```
Build src/app/counties/[county]/[service]/page.tsx using content-seed.md for ALL copy.

generateStaticParams(): 8 combos (4 counties x 2 services). No Marin.

For each county-service combo, render:

1. H1: "[Service Name] in [County Name]"
   Subhead: use visitation or exchange subhead from content-seed.md county-service section

2. Service description: use supervised visitation or exchange description from content-seed.md

3. Fit checklist: use the correct fit checklist from content-seed.md (visitation or exchange)

4. Exact starter package math:
   - Read live rate from Supabase via getRateForCountyService()
   - Calculate using calcStarterPrice()
   - Show line-by-line math matching content-seed.md starter examples

5. "What to have ready" checklist: exact 6 items from content-seed.md

6. Post-payment process: exact 4 steps from content-seed.md

7. Service FAQ: use 3 relevant FAQ items from content-seed.md with faqSchema

8. Payment alert: amber box with exact payment alert disclosure from content-seed.md

9. Pricing sidebar: live rate from Supabase

10. Breadcrumb schema: Home > Counties > [County] > [Service]

11. CTA: "Start [Service Name] Intake"

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 8: Service Pages (/services/supervised-visitation and /services/supervised-exchange)

```
Build both service pages using content-seed.md for ALL copy:
- src/app/services/supervised-visitation/page.tsx
- src/app/services/supervised-exchange/page.tsx

For each:

1. H1 and subhead: from content-seed.md service description card label and description
   - Visitation: "Supervised Visitation" / "Neutral, professional supervision for safe, child-focused parenting time."
   - Exchange: "Supervised Exchange" / "Structured custody transitions that reduce conflict and protect your child."

2. Full service description from content-seed.md (what it is, who needs it, what monitor does, duration, location, reports)

3. Fit checklist: correct checklist from content-seed.md

4. Pricing: live rates from Supabase via getPublicRates()

5. Compliance proof block from content-seed.md

6. "What to have ready" checklist from content-seed.md

7. FAQ: 3 relevant items from content-seed.md with faqSchema

8. CTA: "Start [Service] Intake"

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 9: For Attorneys (/for-attorneys)

```
Build src/app/for-attorneys/page.tsx using content-seed.md for ALL copy.

1. H1 and subhead: exact text from content-seed.md For Attorneys section

2. "SafeProvider handles" vs "does not handle" table: exact table from content-seed.md

3. "SafePair handles" list: exact list from content-seed.md

4. Referral steps: exact 4 steps from content-seed.md

5. Attorney trust block: exact 4 bullets from content-seed.md

6. Attorney FAQ: use all 3 attorney FAQ items from content-seed.md with faqSchema

7. County quick-links: 4 counties linking to /counties/[county]

8. CTA: "Send a Referral" linking to /contact
9. Microproof: "Intake response within 8 business hours."

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 10: FAQ (/faq)

```
Build src/app/faq/page.tsx using content-seed.md for ALL FAQ answers.

1. H1 and subhead: exact text from content-seed.md FAQ section

2. Organize FAQ items by category with section headings:
   - "Cost and Pricing" (5 items)
   - "Process" (5 items)
   - "Trust and Safety" (5 items)
   - "For Attorneys" (3 items)

3. Use FaqAccordion component for each category

4. Inject faqSchema with ALL FAQ items

5. CTA at bottom: "Start Intake"

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 11: Contact (/contact)

```
Build src/app/contact/page.tsx using content-seed.md for ALL copy.

1. H1 and subhead: exact text from content-seed.md Contact section
2. Phone: CallRail tracked number placeholder from site-config PHONE
3. Email: gg@oog.life
4. Response time: exact promise from content-seed.md
5. Hours: exact hours from content-seed.md Contact section
6. County list with links to each county hub page
7. CTA: "Start Intake" linking to /start

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 12: Start / Intake (/start)

**Note: This page is built in Prompt 4 of the main runbook (intake wizard). Use this prompt only if you are building pages individually instead of using the main runbook.**

```
Build src/app/start/page.tsx using content-seed.md for ALL copy.

1. H1 and subhead: exact text from content-seed.md Start section
2. "What to have ready" checklist ABOVE the form: exact 6 items from content-seed.md
3. 4-step intake wizard (client component):
   - Step 1: County + service selection
   - Step 2: Family details (adults, children, court order status, hearing date)
   - Step 3: Contact info (name, phone, email, notes)
   - Step 4: Review + price estimate + Pay button
4. UTM and gclid capture from URL on mount
5. Near submit: response time promise from content-seed.md

Call buildMetadata(). Run pnpm build.
```

---

## PAGE 13: Legal Pages

```
Build all 3 legal pages using content-seed.md for entity name and legal notes.

1. src/app/privacy/page.tsx
   - H1: "Privacy Policy"
   - Entity: "Safe Provider"
   - Top banner: [ATTORNEY REVIEW REQUIRED]
   - Include standard privacy policy sections: what we collect, how we use it, who we share with, cookies, data retention, your rights, contact
   - Reference California law (CCPA basics)
   - Domain: safeprovider.org

2. src/app/notice-at-collection/page.tsx
   - H1: "Notice at Collection"
   - Entity: "Safe Provider"
   - Top banner: [ATTORNEY REVIEW REQUIRED]
   - Standard California notice at collection content

3. src/app/terms/page.tsx
   - H1: "Terms of Use"
   - Entity: "Safe Provider"
   - Top banner: [ATTORNEY REVIEW REQUIRED]
   - Include: platform is not the provider, payment terms, refund policy, limitation of liability

All 3: call buildMetadata() with noindex: false.
Run pnpm build.
```

---

## PAGE 14: Sitemap, Robots, Manifest

```
Build the 3 system files:

1. src/app/sitemap.ts:
   - Dynamic sitemap including all live public routes
   - Include: /, /how-it-works, /pricing, /counties, /faq, /contact, /for-attorneys, /start
   - Include: /services/supervised-visitation, /services/supervised-exchange
   - Include: /counties/santa-clara, /counties/alameda, /counties/contra-costa, /counties/san-francisco
   - Include: all 8 county-service combos
   - Include: /privacy, /notice-at-collection, /terms
   - EXCLUDE: /counties/marin and all Marin sub-routes
   - EXCLUDE: /admin/*, /checkout/*, /api/*

2. src/app/robots.ts:
   - Allow all public routes
   - Disallow: /admin/, /checkout/, /api/, /counties/marin
   - Sitemap URL: https://safeprovider.org/sitemap.xml

3. src/app/manifest.webmanifest/route.ts:
   - Name: SafeProvider
   - Short name: SafeProvider
   - Theme color: #0F172A (brand-900)
   - Background: #FFFFFF

Run pnpm build.
```

---

## PAGE 15: Checkout Success and Cancel

**Note: These are also built in Prompt 4. Use only if building individually.**

```
Build checkout pages using content-seed.md for ALL copy.

1. src/app/checkout/success/page.tsx:
   - Read Stripe session from URL to confirm paid
   - Show exact success message from content-seed.md
   - Next steps: "SafePair will review your case within 1-2 business days."
   - Link back to home

2. src/app/checkout/cancel/page.tsx:
   - Show exact cancel message from content-seed.md
   - Link to /start

Call buildMetadata() on both. Run pnpm build.
```

---

## RUN ORDER

If using these per-page prompts instead of Prompt 3:

1. Page 1 (SEO utilities) - must be first
2. Page 2 (Home) - depends on PricingTable, FaqAccordion
3. Pages 3-11 in any order
4. Page 12 (Start) - only if not using main runbook Prompt 4
5. Page 13 (Legal)
6. Page 14 (Sitemap/Robots)
7. Page 15 (Checkout) - only if not using main runbook Prompt 4

After all pages: run `pnpm build` to verify everything compiles together.
