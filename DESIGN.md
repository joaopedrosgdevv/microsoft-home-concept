# Microsoft — Institutional Home / Design Direction

## Creative concept: "Four Squares"

Microsoft's most recognisable asset is a 2x2 grid of coloured squares. Microsoft's own
About page organises the company around **four enduring commitments**. Those two facts
converge into the page's structural spine: the square is the unit of meaning, repeated
at three scales.

1. **Micro** — a lattice of small squares behind the hero. "Every person and every
   organization" rendered as a multitude of equal units; four of them carry the brand
   colours. The mark is *in* the crowd, not above it.
2. **Meso** — a quadrant grid that carries the four enduring commitments and the four
   platform pillars. Hard edges and shared rules, never floating cards.
3. **Macro** — full-bleed quadrant bands that set the page rhythm.

Rejected alternatives: a dark "NOC / telemetry" treatment (reads as generic big-number
tech), and a human-photography editorial cut (no legitimately licensable Microsoft
photography, and stock imagery would undercut the institutional claim).

## Tokens

**Colour** — the ground is paper, not navy. Brand colour appears only as fill, never as
decorative gradient.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FFFFFF` | primary ground |
| `--surface` | `#F4F4F2` | warm off-white band (deliberately warmer than the default cold slate) |
| `--ink` | `#16161A` | body + headline |
| `--ink-muted` | `#5C5C66` | secondary text (6.5:1 on paper) |
| `--line` | `#E2E2DD` | rules |
| `--deep` | `#0C0C0F` | inverted band |
| `--action` | `#0067B8` | Microsoft action blue, CTA + links (5.4:1 on paper) |
| square red | `#F25022` | fill only |
| square green | `#7FBA00` | fill only |
| square blue | `#00A4EF` | fill only |
| square yellow | `#FFB900` | fill only |

Green and yellow never carry text on light ground — they fail contrast. Enforced by
using them exclusively as square fills.

**Type** — one family, **Archivo** (variable: `wght` 100–900, `wdth` 62–125). Contrast
comes from the *width axis* rather than a second typeface: expanded for display,
normal for text, condensed for labels. Segoe UI is proprietary to Microsoft products
and is deliberately not used.

- Display: `wdth` 112, `wght` 700, tracking -0.03em
- Text: `wdth` 100, `wght` 400, 1.6 line-height, max 68ch
- Label: `wdth` 87, `wght` 600, sentence case (no tracked-out caps)

**Geometry** — border-radius 0 on every structural block. This is derived from the
brief (the mark is a square), not a stylistic default. Radius appears only on buttons
and pills, where it signals "pressable".

**Motion** — one orchestrated page-load: the four hero squares scale in with a stagger,
then the mission line masks up. Everything below the fold reveals once, quietly.
`prefers-reduced-motion` renders the final state immediately with no transition.

## Content rule

Every number, commitment and product name on the page traces to an official Microsoft
source, linked in `src/lib/content.ts`. No invented customers, awards or testimonials.
