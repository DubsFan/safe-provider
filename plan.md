# SafeProvider Site Audit — Quality, Content, SEO & Competitive Analysis

## Context
Full behavioral audit of safeprovider.org from the perspective of users, search engines, and the competitive landscape. Three parallel research agents examined: (1) every page on the site for content/quality/compliance, (2) competitive landscape across 4 Bay Area counties, (3) technical SEO signals. Findings below are from live web research, not training data.

**Site status:** safeprovider.org is NOT YET DEPLOYED. DNS does not resolve. Google has zero indexed pages.

---

# PART 1: CRITICAL LAUNCH BLOCKERS

## 1.1 Site Is Not Live
DNS does not resolve for safeprovider.org. Must deploy to Vercel and configure DNS before anything else matters.

## 1.2 Images Are 41 MB Total (Catastrophic for Performance)
Every image is an uncompressed PNG. This will destroy Core Web Vitals and fail on social platforms.

| Image | Size |
|-------|------|
| landing-hero-handoff.png | 8.4 MB |
| service-cards.png | 6.6 MB |
| attorney-hero.png | 6.5 MB |
| hero-visitation.png | 6.3 MB |
| trust-badges.png | 5.1 MB |
| logo-icon.png | 2.8 MB |
| how-it-works-hero.png | 2.2 MB |
| logo.png | 423 KB |
| landing-hero.png | 2.4 MB (UNUSED — delete) |

**Fix:** Convert all to WebP at 75-80% quality. Target < 200 KB per image, < 2 MB total. Add `images: { formats: ['image/webp'] }` to `next.config.ts`.

## 1.3 Homepage Has No SEO Title or Canonical
- Title renders as just "SafeProvider" (12 chars) — no keywords, invisible to search
- No canonical URL set (only `buildMetadata()` sets canonical; homepage uses `defaultMetadata`)
- **Fix:** Add keyword-rich title like "Supervised Visitation Intake — Bay Area | SafeProvider" and set canonical to `${SITE_URL}/`

## 1.4 `/start` Page Has No Metadata At All
The primary conversion page exports no `metadata`. Falls back to bare "SafeProvider" title. Also entirely client-rendered (`"use client"`) so search engines may not index content.
- **Fix:** Export `metadata` with title, description, canonical. Consider adding a server component wrapper.

## 1.5 Legal Pages Show "[ATTORNEY REVIEW REQUIRED]" to Users
`/privacy`, `/terms`, `/notice-at-collection` display a yellow banner saying content is placeholder. These are linked from footer and included in sitemap.
- **Fix:** Get legal review or remove from sitemap and add noindex until ready.

---

# PART 2: CONTENT & QUALITY ISSUES

## 2.1 HIGH Priority

### Santa Clara court listing claim on ALL county pages
The compliance section bullet "SafePair is listed on the Santa Clara County Superior Court supervised visitation provider list" renders on Alameda, Contra Costa, and SF pages. This is misleading.
- **Verified:** SafePair IS on the Santa Clara court list (confirmed via court PDF)
- **Unverified:** SafePair's listing status in Alameda, Contra Costa, SF — must confirm immediately
- **Fix:** Make the court listing claim conditional per county

### Phone number mismatch
`site-config.ts` uses `(408) 418-7474` but `content-seed.md` lists provider phone as `(510) 434-6586`. Must confirm which is the CallRail tracked number.

### `/start` page missing required content from content-seed
- Missing "What to have ready" checklist above the form
- Missing response time promise near submit button ("Get an intake response within 8 hours or by the end of the business day")

### County-service pages have FAQ content but no FAQ schema
`faqSchema` is imported but never rendered in the JSX. Lost structured data opportunity on the deepest, most keyword-rich pages.

### Service pages are thin
`/services/supervised-visitation` and `/services/supervised-exchange` are missing "what the monitor does" and "reports" sections from content-seed.

## 2.2 MEDIUM Priority

### Header nav missing links
No links to `/faq` or `/contact` in the Header component. Users must find these via footer only.

### Footer missing links
No link to `/services/supervised-visitation`, `/services/supervised-exchange`, or `/contact`.

### `/counties` page has no CTA button
Only page without a "Start Intake" button at the bottom.

### Homepage benefit cards are an image
The 4 benefit cards are rendered as `service-cards.png` — text inside the image is invisible to search engines. Should be real HTML/text content.

### Minor copy deviations from content-seed
Several pages have slightly reworded text vs. the exact content-seed wording. CLAUDE.md says: "Do not invent page copy. Use content-seed.md."

## 2.3 LOW Priority

### Missing HowTo schema on `/how-it-works`
The 5-step process is a perfect fit for HowTo structured data.

### No Organization schema sitewide
Should establish the brand entity in JSON-LD.

### No Twitter/X card tags
`defaultMetadata` has `openGraph` but no `twitter` key. Affects sharing on X.

### No custom 404 page
Missed opportunity for internal linking and branding on dead URLs.

---

# PART 3: SEO TECHNICAL FINDINGS

## 3.1 Page-by-Page SEO Status

| Page | Title Quality | Canonical | OG Tags | JSON-LD | Content Depth |
|------|--------------|-----------|---------|---------|---------------|
| `/` | BAD (brand only) | MISSING | Partial | FAQPage | Good |
| `/how-it-works` | Generic | Good | Good | NONE | Good |
| `/pricing` | Good | Good | Good | FAQPage | Excellent |
| `/counties` | Good | Good | Good | NONE | OK |
| `/counties/[county]` | Good | Good | Good | Breadcrumb+FAQ | Excellent |
| `/counties/[county]/[service]` | Good | Good | Good | Breadcrumb only | Good |
| `/faq` | Generic | Good | Good | FAQPage (17 Qs) | Excellent |
| `/contact` | Good | Good | Good | NONE | Good |
| `/for-attorneys` | Good | Good | Good | FAQPage | Excellent |
| `/services/*` | Good | Good | Good | NONE | Thin |
| `/start` | MISSING | MISSING | MISSING | NONE | Client-only |
| `/privacy` | N/A | Good | Good | NONE | PLACEHOLDER |
| `/terms` | N/A | Good | Good | NONE | PLACEHOLDER |

## 3.2 Sitemap Issues
- `/start` is excluded from `sitemap.xml`
- `lastModified: new Date()` sets every page to build time on every deploy — Google will distrust lastmod signals
- Placeholder legal pages are included (should be excluded or noindexed)

## 3.3 Missing SEO Infrastructure
- No `apple-touch-icon.png`
- No WebP image optimization config
- No `next.config.ts` image format settings
- OG image is 8.4 MB (will fail on all social platforms; max is ~5 MB for most)

---

# PART 4: COMPETITIVE LANDSCAPE

## 4.1 Key Competitors (14 identified)

| Provider | Counties | Pricing | Online Intake | Website Quality |
|----------|----------|---------|---------------|-----------------|
| **Bridging Families** | 40+ cities | $75/hr | No | Best in market (SEO) |
| **One Accord** | 8 | $50 intake + $70/hr | No | Poor (Wix) |
| **Eagle Eye** | 3 | $50 intake + $70/hr | No | Basic |
| **Together Time Bay Area** | 6 | $120/hr | No | Decent |
| **Healthy Families Happy Families** | 8 | Unpublished, grant-funded | No | Good |
| **Keep Families Connected** | Unknown | $175/hr | No | Dated |
| **Caring Supervised Visits** | 3 | Unpublished | Google Forms only | Basic |
| **Safe Family Connections** | 6 | $75/hr | No | OK |

## 4.2 SafeProvider's First-Visit Price Position

| Provider | First Visit Total (intake + 2hr session) |
|----------|------------------------------------------|
| DFG Consulting | $160 |
| One Accord | $190 |
| Eagle Eye | $190 |
| Bridging Families | $225 |
| Together Time | $240 |
| **SafeProvider** | **$289** (includes $99 platform fee) |
| Keep Families Connected | $525 |

SafeProvider's $70/hr ongoing rate is tied for lowest. But the $99 platform fee makes the first-visit total higher than 5 of 6 competitors. **The platform fee must be clearly justified** by the convenience of online booking/payment that no competitor offers.

## 4.3 SafeProvider's Key Competitive Advantage

**No competitor has real online intake with payment processing.** The best competitor offering is a Google Forms link (Caring Supervised Visits). Most require phone calls and cash/check payment at intake. SafeProvider's Stripe Checkout flow is a genuine first-mover advantage.

## 4.4 Court Listing Status

| Court | SafePair Listed? | Source |
|-------|-----------------|--------|
| Santa Clara | YES (confirmed) | Court PDF verified |
| Alameda | UNCONFIRMED | PDF not fully readable |
| Contra Costa | UNCONFIRMED | PDF not fully readable |
| San Francisco | UNCONFIRMED | PDF not fully readable |

**ACTION REQUIRED:** Verify SafePair's listing status in Alameda, Contra Costa, and SF courts. The site currently claims Santa Clara listing on ALL county pages.

## 4.5 Content Gaps vs. Competitors

| Gap | Competitors Doing It | Opportunity |
|-----|---------------------|-------------|
| **Blog / educational content** | NONE (law firms own this space) | WIDE OPEN — no provider blogs at all |
| **Spanish language** | 1 of 14 (Healthy Families) | Bay Area is 25%+ Hispanic |
| **City-level landing pages** | Bridging Families only | High-intent local SEO |
| **Testimonials** | Almost none | Trust builder |
| **Comparison content** | None | "Supervised visitation vs. exchange" |
| **Attorney referral program** | None | SafeProvider has `/for-attorneys` (advantage) |

## 4.6 Search Landscape

- **Court .gov PDFs dominate** top positions for county-specific queries
- **Law firm blog posts** rank for informational queries — providers don't compete for this traffic
- **No provider has a content marketing strategy** — this is entirely uncontested territory
- **Bridging Families** has the best SEO with 40+ city/county landing pages

## 4.7 Keyword Opportunities

| Query | Current Owner | SafeProvider Position |
|-------|--------------|----------------------|
| "how much does supervised visitation cost California" | Law firm blogs | Pricing page answers this directly |
| "supervised visitation requirements California" | Courts, law firms | How-it-works page covers this |
| "Standard 5.20 California supervised visitation" | Courts | County pages mention this |
| "supervised visitation vs supervised exchange" | Nobody | No dedicated page exists (gap) |
| "supervised visitation near me [county]" | Court PDFs | County pages well-positioned |
| "supervised visitation provider [county]" | Court PDFs, competitors | County pages compete directly |

---

# PART 5: PRIORITIZED ACTION PLAN

## P0 — Before Launch (Blockers)

| # | Action | Files |
|---|--------|-------|
| 1 | Deploy site to Vercel, configure DNS | Infrastructure |
| 2 | Convert all images to WebP, compress to < 200 KB each | `public/images/*` |
| 3 | Delete unused `landing-hero.png` | `public/images/landing-hero.png` |
| 4 | Add homepage metadata (keyword title + canonical) | `src/app/page.tsx` |
| 5 | Add `/start` page metadata | `src/app/start/page.tsx` |
| 6 | Fix legal pages — remove placeholder banners or noindex | `src/app/privacy/page.tsx`, `terms`, `notice-at-collection` |
| 7 | Fix court listing claim — make conditional per county | `src/app/counties/[county]/page.tsx` |
| 8 | Verify SafePair's court listing in Alameda, Contra Costa, SF | Manual verification |
| 9 | Confirm correct phone number (408 vs 510) | `src/lib/site-config.ts` |
| 10 | Compress OG image to < 1 MB | `public/images/landing-hero-handoff.png` |

## P1 — Launch Week

| # | Action | Files |
|---|--------|-------|
| 11 | Add `images: { formats: ['image/webp'] }` to next.config | `next.config.ts` |
| 12 | Add Twitter card tags to `defaultMetadata` | `src/lib/seo/metadata.ts` |
| 13 | Add FAQ schema to county-service pages | `src/app/counties/[county]/[service]/page.tsx` |
| 14 | Add HowTo schema to `/how-it-works` | `src/app/how-it-works/page.tsx` |
| 15 | Add Organization schema sitewide | `src/app/layout.tsx` |
| 16 | Add Header nav links (FAQ, Contact) | `src/components/layout/Header.tsx` |
| 17 | Add Footer links (services, contact) | `src/components/layout/Footer.tsx` |
| 18 | Add "What to have ready" checklist to `/start` | `src/app/start/page.tsx` |
| 19 | Add CTA button to `/counties` page | `src/app/counties/page.tsx` |
| 20 | Submit sitemap to Google Search Console | Manual |
| 21 | Convert homepage benefit cards from image to HTML | `src/app/page.tsx` |
| 22 | Add `/start` to sitemap | `src/app/sitemap.ts` |
| 23 | Fix sitemap `lastModified` to use actual dates | `src/app/sitemap.ts` |

## P2 — First Month

| # | Action |
|---|--------|
| 24 | Flesh out service pages with "what the monitor does" + "reports" content |
| 25 | Add county-service page content (fit checklist, post-payment process) |
| 26 | Create custom 404 page with internal links |
| 27 | Add apple-touch-icon and complete webmanifest |
| 28 | Optimize generic titles (FAQ → "Supervised Visitation FAQ", How It Works → "How Supervised Visitation Works") |
| 29 | Clearly justify $99 platform fee on pricing page (online convenience vs. phone-only competitors) |
| 30 | Differentiate county page content (Alameda/CC/SF are thinner than Santa Clara) |

## P3 — Growth (Ongoing)

| # | Action | Impact |
|---|--------|--------|
| 31 | Start blog — "What is Supervised Visitation?", "How Much Does It Cost?", "What to Expect" | Capture law-firm-dominated informational queries |
| 32 | Create "Supervised Visitation vs. Supervised Exchange" comparison page | Uncontested keyword |
| 33 | Add Spanish language support | 25% of Bay Area market |
| 34 | Build city-level landing pages (San Jose, Oakland, etc.) | Copy Bridging Families' SEO strategy |
| 35 | Set up Google Business Profile | Local pack visibility |
| 36 | Build backlinks from court sites and legal directories | Domain authority |
| 37 | Add testimonials (when available) | Trust signals |
| 38 | Monitor Core Web Vitals post-launch | Ongoing |

---

# PART 6: WHAT'S WORKING WELL

- Disclosure compliance is excellent — exact content-seed wording in header bar and footer
- FAQ content is comprehensive (17 questions) with proper schema markup
- Pricing transparency is a major differentiator — most competitors hide prices
- County pages are content-rich with courthouse info, compliance details, local FAQ
- For Attorneys page is complete and unique — no competitor has this
- Form accessibility (aria attributes, label associations) recently improved
- Stripe Checkout flow is the only online payment option in the entire market
- Structured data (FAQPage, BreadcrumbList) on most pages
- All images have descriptive alt text
- robots.txt and sitemap correctly handle Marin exclusion
- Zod validation with trim/max prevents abuse

---

## Verification
This is a content/SEO/competitive audit — no code changes. Verification steps:
1. Image compression: check file sizes with `ls -la public/images/`
2. After metadata fixes: run `pnpm build` and check HTML output for title/meta tags
3. After deploy: check Google Search Console for indexing
4. After deploy: run PageSpeed Insights for Core Web Vitals
5. Social sharing: test OG image on Facebook debugger and Twitter card validator
