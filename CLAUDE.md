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

## Architectural patterns (from TradeTEST.TRAINING)
This project shares the same stack as TradeTEST.TRAINING. Reuse these proven patterns:
- SSR Supabase client with cookies (createSupabaseServerClient)
- Zod env validation with fail-fast (env.ts)
- Stripe Checkout Session creation with metadata
- Stripe webhook HMAC signature verification before any DB write
- Supabase Auth middleware for admin route protection
- PostHog non-blocking event tracking with null guard on missing key
- Resend email via renderToStaticMarkup
- Barrel exports for lib modules (index.ts)
- RLS policies: public read narrow, admin write via service-role
SafeProvider is simpler than TradeTEST: 8 tables (not 57), no tiers, no adaptive engine, no i18n, single checkout product.

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
2. Legal entity: Safe Provider.
3. Domain: safeprovider.org
4. Admin email: gg@oog.life
5. Disclose clearly: SafeProvider manages intake, scheduling, and payment. SafePair delivers services.
6. Do not present SafeProvider as the court-listed provider.
7. Do not imply court endorsement.
8. Do not clone safepair.net.
9. Every county page must be useful on its own (no doorway pages).
10. Use exact disclosure wording from content-seed.md. Do not invent disclosure text.

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

## Image rules
1. Every image or video poster showing people MUST use object-position that keeps faces visible. Use object-[center_35%] or lower — never object-top or object-center on people photos.
2. Visually verify every image on the live site before declaring done. User-test before = done.
3. No two pages may share the same hero image or video poster. Each page gets a unique hero.
4. Use all available video loops. Prefer video heroes over static images.
5. Images must be integrated with copy (side-by-side, overlaid, etc.) — never floating standalone.

## Done criteria
1. Code compiles. pnpm build passes.
2. pnpm lint passes with 0 errors.
3. Key flow smoke-tested.
4. New env vars documented.
5. New schema changes have migration files.
6. Changelog summary provided.
7. All images with people visually verified — faces fully visible, not cropped.

## Working rules
1. Read this file and all referenced .md files first.
2. Explore existing code before changing anything.
3. Small reviewable edits.
4. Run lint and build before declaring done.
5. If a command fails, diagnose and fix. Do not silently skip.
6. Do not rewrite working code without a concrete reason.
7. Do not invent page copy, FAQ answers, or disclosure wording. Use content-seed.md.
8. Do not invent colors, fonts, or spacing. Use design-tokens.md.

## Plan and memory rules
1. When the user gives a task or plan, STOP and log it to memory/plan.md IMMEDIATELY before starting any code changes.
2. Before context compression, always write the current plan and progress to memory files.
3. Keep memory/plan.md up to date with what is done, what is in progress, and what remains.
4. Do not skip plan items. Execute every item or explicitly flag it as blocked with a reason.
5. If a task has multiple phases, track each phase in memory/plan.md with status (done/in-progress/pending).
