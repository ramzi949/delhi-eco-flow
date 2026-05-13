# Delhi Eco-Flow — WTE Pipeline Viewer Integration

This bundle adds an interactive 3D viewer of the ethical waste-to-energy pipeline
to a website. Pick ONE of the two integration paths below depending on the
project's stack.

═══════════════════════════════════════════════════════════════════════════════
PROMPT FOR CLAUDE CODE — paste everything below this line
═══════════════════════════════════════════════════════════════════════════════

I'm integrating an interactive 3D model into my website. The bundle contains:

  ./public/pipeline_web.glb           — the 3D model asset (~2.3MB binary)
  ./react/WTEPipelineViewer.jsx       — a React component (for React/Next.js sites)
  ./vanilla/wte_embed.html            — a vanilla HTML/JS embed (for plain sites)

Please do the following:

1. **Detect my project type.** Look at my current working directory and identify
   whether this is:
     (a) A React-based project (Next.js, Vite + React, CRA, Remix, etc.) —
         detected via `package.json` containing `react` as a dependency, or
     (b) A vanilla HTML site (plain .html files, no bundler), or
     (c) A non-React framework site (Vue, Svelte, Astro, plain Jekyll/Hugo, etc.)

2. **Copy the GLB asset** to the right place:
     - React/Next.js: place it at `public/pipeline_web.glb` (Next.js public folder
       or Vite/CRA public folder).
     - Astro: place it at `public/pipeline_web.glb`.
     - Vanilla HTML: place it in the same folder as the HTML page that will
       contain the embed, OR in any folder that's served statically — and update
       the `MODEL_URL` constant in the embed script to match.
     - Other frameworks: use the framework's standard static-asset folder.

3. **Install the integration** using the right path for the detected stack:

   ─── If REACT/NEXT.JS ───
   a. Install dependencies (use the right package manager based on the lockfile —
      `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, otherwise npm):
        npm install three @react-three/fiber @react-three/drei
   b. Copy `WTEPipelineViewer.jsx` into the project's components folder
      (e.g. `src/components/` or `components/` for Next.js).
   c. Convert the file to `.tsx` if the project uses TypeScript (the component
      doesn't use any complex typing — just rename and it should pass).
   d. Add the import + JSX to whichever page should display the viewer. Ask me
      which page if it's not obvious. Example for Next.js App Router:
        // app/wte-pipeline/page.jsx
        import WTEPipelineViewer from '@/components/WTEPipelineViewer';
        export default function Page() {
          return (
            <main style={{ padding: '2rem' }}>
              <WTEPipelineViewer height="640px" />
            </main>
          );
        }
   e. **For Next.js**: the component has `'use client'` at the top because
      Three.js needs browser APIs. Don't remove that directive.
   f. **Fonts**: the component references Fraunces (display) and JetBrains Mono
      (body). If the site doesn't already load these, add a link tag in the
      site's <head> or root layout:
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
      In Next.js App Router, that goes in `app/layout.tsx` head. The viewer
      still works without these fonts — it just falls back to system serif and
      mono — so this step is optional for a quick test.

   ─── If VANILLA HTML ───
   a. Open `vanilla/wte_embed.html` and copy everything from the `<div class="wte-viewer-wrap">`
      block down through the final `</script>` tag.
   b. Paste that into the target page wherever the viewer should appear.
   c. If the GLB lives somewhere other than the same folder as the page, find
      the `MODEL_URL` constant in the script (`const MODEL_URL = './pipeline_web.glb';`)
      and update the path.
   d. The embed brings its own scoped styles (everything is prefixed `.wte-*`)
      so it won't collide with the site's existing CSS.
   e. The fonts (Fraunces, JetBrains Mono) are referenced but not auto-loaded.
      Add them to the site's `<head>` for the intended look (see snippet above),
      or accept the system-font fallback.

   ─── If VUE / SVELTE / ASTRO / OTHER ───
   - For frameworks that allow plain HTML islands (Astro, Eleventy, etc.), use
     the **vanilla** embed unchanged — paste it inside an `.astro` / `.html`
     component.
   - For Vue or Svelte, the cleanest path is to wrap the vanilla embed in a
     framework component that uses `onMounted`/`onMount` to ensure the script
     runs after hydration. Alternatively, the React component can be ported —
     ask me which approach to take.

4. **Verify the integration works**:
   - Run the dev server (npm run dev / yarn dev / pnpm dev / live-server / etc.).
   - Open the page that contains the viewer.
   - Confirm:
       ☐ The 3D model loads (the loading spinner disappears within a few seconds)
       ☐ Dragging on the canvas rotates the model
       ☐ Scrolling on the canvas zooms in/out
       ☐ Clicking a stage in the right-hand panel triggers a camera fly-to animation
       ☐ The "Auto-rotate" button toggles smooth rotation
   - If the model fails to load:
       - Open the browser console and check for the requested GLB URL.
       - The most common issue is a wrong path — verify the URL the browser is
         hitting matches where the GLB actually lives on disk.
   - If WebGL errors appear, check that the user's browser supports WebGL 2
     (`webglreport.com`). All major browsers from the last 5 years do.

5. **Don't change** the following without asking me first:
   - The stage data (the `STAGES` array). The labels, descriptions, and camera
     positions are calibrated to the specific 3D model.
   - The `model.rotation.x = -Math.PI / 2` line. The GLB ships with Z-up and
     needs that rotation to display correctly in Three.js's Y-up convention.
   - The material settings on the model (color, roughness, metalness). They're
     tuned for the architectural-diagram aesthetic.

6. **Customization the user IS likely to want**:
   - Height: change the `height` prop (React) or `.wte-viewer-wrap` CSS height
     (vanilla).
   - Accent color: change the `accentColor` prop (React) or `--wte-accent` CSS
     variable (vanilla). Defaults to the Eco-Flow leaf green (#7dd190).
   - Hide the side panel: pass `showStagePanel={false}` (React) or remove the
     `<aside class="wte-side">` block AND change `grid-template-columns` to
     `'1fr'` (vanilla).
   - Start with auto-rotate on: `autoRotate={true}` (React) — handy for kiosk
     displays at conferences/exhibitions.

When you're done, give me a one-paragraph summary of what you changed
(which files were created/modified, where the GLB was placed, and which page
now shows the viewer), and the URL to test it.

═══════════════════════════════════════════════════════════════════════════════
END OF PROMPT
═══════════════════════════════════════════════════════════════════════════════


─────────────────────────────────────────────────────────────────────────────
WHAT'S IN THIS BUNDLE
─────────────────────────────────────────────────────────────────────────────

  public/pipeline_web.glb          The 3D model. 2.3MB binary. Z-up.
  react/WTEPipelineViewer.jsx      React component (use for React/Next.js).
  vanilla/wte_embed.html           Plain HTML/JS embed (use for static sites).
  README.md                        This file.


─────────────────────────────────────────────────────────────────────────────
WHAT THE VIEWER DOES
─────────────────────────────────────────────────────────────────────────────

  - Renders the WTE pipeline as a 3D scene with three-point lighting.
  - Visitors can drag to orbit, scroll to zoom, right-click to pan.
  - A side panel walks through the four pipeline stages (Input Streams,
    Residual Convergence, Filtration Tower, Outputs). Clicking a stage flies
    the camera to a focused view of that section.
  - An auto-rotate toggle for kiosk/display-mode use.
  - Responsive: collapses to stacked layout on narrow screens.


─────────────────────────────────────────────────────────────────────────────
LICENSE / ATTRIBUTION
─────────────────────────────────────────────────────────────────────────────

  Three.js — MIT License
  @react-three/fiber, @react-three/drei — MIT License
  The 3D model and viewer code in this bundle are yours to use, modify, and
  redistribute on the Delhi Eco-Flow project and its associated properties.
