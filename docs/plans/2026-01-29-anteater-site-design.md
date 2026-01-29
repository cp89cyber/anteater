# Anteater Site Design

Date: 2026-01-29

## Summary
Create a small, playful, multi-page static site about anteaters. The site should feel kid-friendly, load fast, and require no build step. Content is simple, friendly, and easy to scan.

## Goals
- Deliver a five-page static website: Home, Species, Habitat, Diet, Conservation.
- Use a cohesive, playful visual identity with warm colors and rounded shapes.
- Keep navigation consistent across pages with clear current-page state.
- Include a small interactive element (fun-fact shuffle) that works without JS.
- Ensure strong accessibility basics (contrast, focus states, readable type).

## Non-goals
- No backend, CMS, or dynamic data fetching.
- No heavy animation or complex interactivity.
- No external build tooling.

## Information Architecture
Pages and primary content:
- Home: Welcome hero, quick links to pages, conservation callout.
- Species: Four species cards with short facts.
- Habitat: Zones with brief descriptions (forest, savanna, wetlands).
- Diet: Ant and termite focus, feeding habits, tongue-length callout.
- Conservation: Threats, efforts, and simple "how to help" actions.

## Visual Direction
- Playful, kid-friendly style with warm, sunny palette and rounded UI.
- Typography: bold, friendly display font for headings; rounded sans-serif for body.
- Background: soft gradient with subtle leaf shapes or blobs.
- Buttons: chunky, slightly tilted on hover; clear focus rings.
- Cards: rounded corners, soft shadows, sticker-like feel.

## Components
Shared across pages:
- Header with logo (simple anteater face SVG) and navigation.
- Hero block with headline, short subhead, and primary CTA.
- Section cards for species, habitat zones, diet items, actions.
- Fun-fact widget in footer with shuffle button.
- Footer with links and divider motif (paw prints).

## Behavior and Data Flow
- All content is static HTML; no external data sources.
- `main.js` handles:
  - Fun-fact shuffle (no consecutive repeats).
  - Scroll reveal for sections using IntersectionObserver.
- Respect `prefers-reduced-motion` to disable animations.
- If JS is disabled, facts list remains visible as static text.

## Accessibility
- High contrast text and large line height.
- Visible focus states for links and buttons.
- Adequate tap targets for mobile.
- Semantic HTML structure with landmark elements.

## File Structure
- `index.html`
- `species.html`
- `habitat.html`
- `diet.html`
- `conservation.html`
- `styles.css`
- `main.js`
- `assets/` (optional for SVGs)

## Testing
- Manual browser check on desktop and mobile widths.
- Click-through navigation across all pages.
- Verify fun-fact shuffle and scroll reveals.
- Validate reduced-motion and no-JS behavior.
