# SafeProvider - Image Generation Prompts (DALL-E / ChatGPT)

**Date:** March 4, 2026
**Tool:** DALL-E via ChatGPT
**Brand:** SafeProvider
**Domain:** safeprovider.org
**Industry:** Court-compliant supervised visitation and custody exchange intake platform
**Audience:** Parents in Bay Area family court proceedings, family law attorneys

---

## BRAND CONTEXT (paste this at the start of your ChatGPT session)

Paste this block ONCE at the beginning of your ChatGPT session before any image prompts:

```
I'm building a brand called SafeProvider (safeprovider.org). It's an intake and scheduling platform for court-ordered supervised visitation and custody exchange in the San Francisco Bay Area.

Brand personality:
- Professional but approachable. Not cold, not playful.
- Trustworthy. Families in difficult custody situations use this.
- Clean and modern. Think fintech trust signals, not family clip art.
- Colors: navy (#0F172A), amber/gold (#D97706), white, light slate (#F1F5F9)
- Font style: clean sans-serif (Inter)
- No children's faces. No courtrooms. No gavels. No handcuffs.
- No clip art style. No cartoon style. No watercolor.
- Imagery should feel safe, structured, and professional.

I need you to generate a series of brand assets. I'll give you prompts one at a time. Keep the visual language consistent across all of them.
```

---

## PROMPT 1: MASTER LOGO

This is the foundation. All other assets derive from this.

**Size:** 1024x1024 (square, will be cropped/adapted)

```
Create a minimal, modern logo mark for "SafeProvider" - a professional platform for court-compliant supervised visitation intake.

The logo should be:
- A simple geometric icon that conveys safety, trust, and structure
- Incorporate a subtle shield or protective shape combined with a human/family silhouette abstraction
- Use navy (#0F172A) as the primary color with amber/gold (#D97706) as an accent
- White background
- No text in the image - icon only
- Flat design, no gradients, no 3D effects, no shadows
- Should work at 32px (favicon) and 512px (app icon)
- Professional and modern - similar quality to Stripe, Gusto, or Calm logos
- Not a generic shield. Not a heart. Not hands cupping something.
- Clean negative space. Geometric precision.
```

**After generating:** Pick the best version. Save it. Then tell ChatGPT:

```
Great. Use this exact icon style and visual language for all the following prompts. Keep colors, line weight, and design philosophy identical.
```

---

## PROMPT 2: LOGO WITH WORDMARK

**Size:** 1024x1024 (will be exported as wide crop)

```
Now create a horizontal logo lockup using the same icon from the previous image, with the word "SafeProvider" to the right of the icon.

- Same icon, same proportions
- Text "SafeProvider" in a clean sans-serif font (similar to Inter or Helvetica Neue)
- Text color: navy (#0F172A)
- "Safe" in regular weight, "Provider" in bold weight - or the reverse if it looks better
- White background
- Generous whitespace around the lockup
- The icon and text should feel balanced - icon should not overpower text
- Total aspect ratio should work as a horizontal header logo (roughly 3:1 or 4:1 wide)
```

**After generating:** This becomes your Header.tsx logo. Export/crop to roughly 200x50px or 240x60px.

---

## PROMPT 3: FAVICON

**Size:** 1024x1024 (will be scaled to 32x32, 16x16, 192x192)

```
Create a favicon version of the SafeProvider logo icon from the first image.

- Same icon, simplified to work at 32x32 pixels
- Remove any fine details that would be lost at small sizes
- Navy (#0F172A) icon on white background
- OR amber (#D97706) icon on navy (#0F172A) background - generate both options
- Square format, centered, with minimal padding
- No text. Icon only.
- Should be instantly recognizable in a browser tab at tiny size
```

**After generating:** Save both color variants. Pick the one with better contrast at small size.

**Export steps (on your Mac):**
1. Open in Preview
2. Tools > Adjust Size > 32x32 pixels
3. Export as PNG
4. Use https://favicon.io/favicon-converter/ to generate favicon.ico + apple-touch-icon.png + site.webmanifest icons

---

## PROMPT 4: OG IMAGE (Social Share Preview)

**Size:** 1200x630 (exact OpenGraph dimensions)

```
Create a social media share preview image (OpenGraph) for SafeProvider.

Dimensions: 1200x630 pixels (wide rectangle)

Layout:
- Left 60%: Text area on a clean navy (#0F172A) or white background
  - "SafeProvider" logo lockup (icon + wordmark) at top left
  - Headline: "Court-Compliant Supervised Visitation Intake"
  - Subline: "Santa Clara · Alameda · Contra Costa · San Francisco"
- Right 40%: Abstract graphic element - could be a subtle geometric pattern, the shield icon enlarged and faded, or clean architectural shapes suggesting safety and structure
- Amber (#D97706) accent line or element separating or connecting the two halves
- Overall feel: professional, trustworthy, modern
- No photos of people. No stock photo feel.
- Text must be crisp and readable at thumbnail size (think how it looks in a text message or Slack preview)
```

**After generating:** Save as `og-image.png` at 1200x630. Place in `public/og-image.png` in your Next.js project.

---

## PROMPT 5: HERO ILLUSTRATION (Home Page)

**Size:** 1024x1024 (will be used as section background or inline graphic)

```
Create an abstract hero illustration for the SafeProvider homepage.

This is NOT a literal image of a family or courtroom. It should be:
- Abstract geometric shapes suggesting connection, safety, and structured process
- Think: overlapping rounded rectangles, a path or flow diagram abstraction, protective arcs
- Color palette: navy (#0F172A), amber/gold (#D97706), light slate (#F1F5F9), white
- Subtle, not overwhelming - this sits behind or beside text
- Could work as a right-side illustration on a hero section with text on the left
- Modern SaaS aesthetic - similar to illustrations on Linear, Vercel, or Stripe landing pages
- No people. No buildings. No literal objects.
- Clean, geometric, professional.
- Light background (white or #F1F5F9) so dark text is readable over it
```

**After generating:** Save at full resolution. Use as hero section background or inline illustration.

---

## PROMPT 6: COUNTY PAGE ILLUSTRATION SET (Optional)

**Size:** 1024x1024 each (crop to cards or section headers)

```
Create 4 minimal geographic/abstract illustrations representing Bay Area counties for a professional services website. Same visual language as previous images.

Generate one image with 4 quadrants:
- Top left: Santa Clara County - subtle South Bay / San Jose skyline abstraction in navy and amber
- Top right: Alameda County - subtle East Bay / Oakland skyline abstraction
- Bottom left: Contra Costa County - subtle rolling hills / Martinez courthouse abstraction
- Bottom right: San Francisco County - subtle city / Golden Gate abstraction

Rules:
- Same color palette: navy, amber, slate, white
- Same geometric style as the other brand assets
- Minimal, iconic, not detailed illustrations
- No text labels in the image
- Each quadrant should work as a standalone card image when cropped
- Professional and modern, not tourist-brochure style
```

**After generating:** Crop each quadrant. Use as county hub page hero images or county selector cards on the home page.

---

## PROMPT 7: PROCESS STEP ICONS (Optional)

**Size:** 1024x1024 (will contain 5 icons)

```
Create 5 simple process step icons for a supervised visitation intake flow. Same visual style as previous SafeProvider brand assets.

Generate one image with 5 icons in a row:
1. Qualify - a checkmark inside a circle or document shape
2. Intake - a form or clipboard with lines
3. Pay - a card or secure payment shield
4. Review - an eye or magnifying glass on a document
5. Schedule - a calendar with a check or clock

Rules:
- Navy (#0F172A) icons with amber (#D97706) accent details
- White or light slate (#F1F5F9) background
- Flat, geometric, consistent line weight
- Each icon should work at 64x64px when extracted
- No realistic rendering. Flat icon style only.
- Match the SafeProvider logo aesthetic exactly
```

**After generating:** Extract each icon individually. Use in the How It Works section and intake wizard step indicators.

---

## CASCADE ORDER

Run prompts in this order. Each builds on the previous:

| Step | Prompt | Creates | Used in |
|---|---|---|---|
| 1 | Master logo icon | Brand mark | Everything |
| 2 | Logo + wordmark | Header logo | Header.tsx, emails |
| 3 | Favicon | Browser tab icon | favicon.ico, apple-touch-icon |
| 4 | OG image | Social share | public/og-image.png, metadata |
| 5 | Hero illustration | Home page | Home page hero section |
| 6 | County illustrations | County cards | County hub pages (optional) |
| 7 | Process icons | Step indicators | How It Works, intake wizard (optional) |

---

## FILE PLACEMENT IN PROJECT

After generating all assets:

```
~/Projects/safeprovider-funnel/public/
  favicon.ico                  <- from Prompt 3
  apple-touch-icon.png         <- from Prompt 3 (180x180)
  icon-192.png                 <- from Prompt 3 (192x192)
  icon-512.png                 <- from Prompt 3 (512x512)
  og-image.png                 <- from Prompt 4 (1200x630)
  logo.svg                     <- trace Prompt 2 output or use PNG
  logo-icon.png                <- from Prompt 1
  hero-illustration.png        <- from Prompt 5
  counties/
    santa-clara.png            <- cropped from Prompt 6
    alameda.png                <- cropped from Prompt 6
    contra-costa.png           <- cropped from Prompt 6
    san-francisco.png          <- cropped from Prompt 6
  icons/
    step-qualify.png           <- cropped from Prompt 7
    step-intake.png            <- cropped from Prompt 7
    step-pay.png               <- cropped from Prompt 7
    step-review.png            <- cropped from Prompt 7
    step-schedule.png          <- cropped from Prompt 7
```

---

## TIPS FOR DALL-E CONSISTENCY

1. Always reference "the same visual style as the previous SafeProvider images" in each prompt.
2. If a generation drifts from the brand, say: "Too [playful/dark/detailed]. Bring it back to the minimal geometric SafeProvider style from the first logo."
3. DALL-E tends to add gradients and 3D. Push back with: "Flat design only. No gradients. No shadows. No 3D effects."
4. If text in images looks bad (it often does in DALL-E), regenerate or plan to add text in Figma/Canva after.
5. Generate 2-3 variants of each and pick the best.
