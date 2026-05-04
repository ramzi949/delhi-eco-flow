# Delhi Waste Crisis

A 4-page static website documenting the scale and systemic nature of Delhi's waste crisis. Built as a student social action project for AES Unit 4.

**Live pages:** Landing (`/`) · Data (`/data`) · Map (`/map`) · About (`/about`)

---

## Run locally

```bash
# Install dependencies (uses npmmirror — needed on school network)
npm install

# Start development server
npm run dev
# → opens at http://localhost:3000

# Type-check without building
npx tsc --noEmit
```

**Note:** If `npm install` hangs, the school network is blocking the npm registry. Fix:
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

---

## Deploy to Vercel

```bash
# One-time: install Vercel CLI
npm i -g vercel

# Deploy (follow the prompts — no special config needed)
vercel

# Or connect your GitHub repo at vercel.com — it deploys on every push
```

The project is already structured for Vercel — no `vercel.json` needed.

---

## Edit content

All data lives in `/data/`. You never need to touch a page file to update facts or sources.

| File | What to edit |
|------|-------------|
| `data/stats.ts` | The 10 stat cards on the Data page |
| `data/flowSteps.ts` | The 6 waste-flow steps (intended / reality / gap) |
| `data/locations.ts` | Map markers — add real locations, set `placeholder: false` when verified |
| `data/ghazipurGrowth.ts` | Year/height data for the Ghazipur line chart |
| `data/segregationByBody.ts` | Segregation bar chart values |
| `data/wasteComposition.ts` | Waste composition donut chart |
| `data/processingGap.ts` | Generation vs. processing gap chart |
| `data/sources.ts` | All citations (used on both Data and About pages) |

### Fill in placeholders

Search for these strings to find everything you need to personalise:

- `[MY STORY GOES HERE` — three paragraphs on the About page
- `[DATA PAGE INTRO` — intro paragraph on the Data page
- `20XX` — the actual landfill clearance year (Landing page accountability section)
- `[EMAIL PLACEHOLDER]` — your contact email (About page)
- `placeholder: true` in `locations.ts` — map markers that need verification

---

## Project structure

```
delhi-waste/
├── app/
│   ├── layout.tsx          # Root layout: fonts, Nav, Footer, metadata
│   ├── globals.css         # Design system (Tailwind v4 @theme)
│   ├── page.tsx            # Landing page (5 sections)
│   ├── data/page.tsx       # Data Hub page
│   ├── map/page.tsx        # Map page
│   └── about/page.tsx      # About page
├── components/
│   ├── Nav.tsx             # Sticky nav (transparent -> solid on scroll)
│   ├── Footer.tsx
│   ├── StatCard.tsx        # Reusable stat number card
│   ├── SourceLink.tsx      # Superscript citation link
│   ├── landing/
│   │   ├── HeroCounter.tsx # Rotating live counter (client)
│   │   └── WasteFlow.tsx   # 6-step accordion (client)
│   ├── charts/
│   │   ├── ChartsSection.tsx       # Chart section wrapper (dynamic imports)
│   │   ├── GhazipurChart.tsx       # Line chart - Ghazipur height
│   │   ├── SegregationChart.tsx    # Bar chart - segregation by civic body
│   │   ├── CompositionChart.tsx    # Donut - waste composition
│   │   └── ProcessingGapChart.tsx  # Bar - generation vs. processed
│   └── map/
│       ├── MapSection.tsx   # Filter pills + dynamic map import (client)
│       └── MapClient.tsx    # Leaflet map (client, ssr:false)
└── data/
    ├── types.ts             # All shared TypeScript types
    ├── stats.ts
    ├── flowSteps.ts
    ├── locations.ts
    ├── ghazipurGrowth.ts
    ├── segregationByBody.ts
    ├── wasteComposition.ts
    ├── processingGap.ts
    └── sources.ts
```

---

## Design system

Defined in `app/globals.css` via Tailwind v4 `@theme`. Change the accent colour here and it propagates everywhere:

```css
--color-accent: #c4e538;   /* toxic yellow-green */
--color-danger: #dc2626;   /* red - landfill markers, critical stats only */
--color-base:   #0a0a0a;   /* near-black background */
--color-raised: #141414;   /* card/section background */
```

---

*A student project for AES Unit 4 Social Action Project · 2026*
