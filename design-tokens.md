# SafeProvider Funnel - Design Tokens

Use these exact values. Do not invent colors, fonts, or spacing.

## Colors

| Token | Hex | Use |
|---|---|---|
| brand-900 | #0F2C3D | Headings, body text (deep navy) |
| brand-700 | #2F3A40 | Secondary text (slate) |
| brand-500 | #64748B | Muted text, borders |
| brand-100 | #F4F1EC | Light backgrounds, section alternation (soft sand) |
| accent-600 | #1F9E9E | CTA buttons, links (teal) |
| accent-500 | #26B8B8 | CTA hover state |
| accent-100 | #E6F7F7 | Disclosure bar background |
| sage | #5B7C6B | Calm accent (future use) |
| warm | #D9A7A0 | Subtle human accent (future use) |
| white | #FFFFFF | Page background, card background |
| success | #16A34A | Paid/accepted status badges |
| error | #DC2626 | Declined/failed status badges, form errors |
| warning | #F59E0B | Pending status badges |

## Tailwind config extension

```js
// tailwind.config.ts colors.extend
colors: {
  brand: {
    900: '#0F2C3D',
    700: '#2F3A40',
    500: '#64748B',
    100: '#F4F1EC',
  },
  accent: {
    600: '#1F9E9E',
    500: '#26B8B8',
    100: '#E6F7F7',
  },
  sage: '#5B7C6B',
  warm: '#D9A7A0',
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
- Background: accent-600 (#1F9E9E)
- Text: white
- Hover: accent-500 (#26B8B8)
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
- Background: accent-100 (#E6F7F7)
- Text: brand-900 (#0F2C3D)
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
