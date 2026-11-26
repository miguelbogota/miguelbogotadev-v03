---
name: MiguelBogotaDev
description: A quiet editorial portfolio where engineering evidence and personality do the bragging.
colors:
  signature-amber: '#daa520'
  paper-white: '#ffffff'
  ink-black: '#000000'
  paper-soft: '#f6f6f6'
  mist-gray: '#dedede'
  quiet-gray: '#bbbbbb'
  middle-gray: '#7f7f7f'
  light-secondary-gray: '#6b6b6b'
  graphite-gray: '#5a5a5a'
  charcoal-gray: '#3b3b3b'
  near-black: '#212121'
  secondary-slate: '#455a64'
  information-blue: '#1976d2'
  success-green: '#388e3c'
  error-red: '#d32f2f'
  artwork-amber-light: '#f4d7a1'
  artwork-amber: '#e8a665'
  artwork-rose-light: '#d58287'
  artwork-rose: '#a75468'
  artwork-teal-light: '#428d91'
  artwork-teal: '#244d60'
typography:
  display:
    fontFamily: 'Barlow, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
    fontSize: 'clamp(3rem, 8vw, 5.5rem)'
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: '-0.03em'
  headline:
    fontFamily: 'Barlow, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
    fontSize: 'clamp(1.4rem, 6.5vw, 3.2rem)'
    fontWeight: 600
    lineHeight: 'clamp(1.8rem, 6.7vw, 3.4rem)'
    letterSpacing: '0.02rem'
  title:
    fontFamily: 'Barlow, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
    fontSize: 'clamp(1.4rem, 1.5vw, 1.6rem)'
    fontWeight: 600
    lineHeight: 'clamp(1.4rem, 1.5vw, 1.6rem)'
    letterSpacing: '0.02rem'
  body:
    fontFamily: 'Barlow, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
    fontSize: 'clamp(1.1rem, 1.24vw, 1.26rem)'
    fontWeight: 200
    lineHeight: 'clamp(1.55rem, 1.9vw, 1.85rem)'
    letterSpacing: '0.02rem'
  label:
    fontFamily: 'Barlow, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
    fontSize: '0.9rem'
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: '0.08rem'
rounded:
  sharp: '0'
  subtle: '0.45rem'
  soft: '0.9rem'
  menu: '0.375rem'
  drawer: '20px'
  circle: '999px'
spacing:
  none: '0rem'
  xs: '0.45rem'
  sm: '0.9rem'
  md: '1.25rem'
  lg: '2rem'
  xl: '3.3rem'
  2xl: '5rem'
  3xl: '7rem'
  4xl: '9rem'
components:
  button-solid:
    backgroundColor: '{colors.near-black}'
    textColor: '{colors.paper-soft}'
    typography: '{typography.label}'
    rounded: '{rounded.sharp}'
    padding: '0.45rem 0.9rem'
    height: '44px'
  button-solid-hover:
    backgroundColor: '{colors.signature-amber}'
    textColor: '{colors.ink-black}'
    rounded: '{rounded.sharp}'
  input-search:
    backgroundColor: '{colors.paper-soft}'
    textColor: '{colors.near-black}'
    typography: '{typography.body}'
    rounded: '{rounded.subtle}'
    padding: '0.9rem 1.25rem'
    height: '44px'
  project-card:
    backgroundColor: 'transparent'
    textColor: '{colors.near-black}'
    rounded: '{rounded.sharp}'
    padding: '0'
  analytics-notice:
    backgroundColor: '{colors.ink-black}'
    textColor: '{colors.paper-soft}'
    rounded: '{rounded.sharp}'
    padding: '0.9rem 1.25rem'
    width: 'min(calc(100% - 2.5rem), 760px)'
---

# Design System: MiguelBogotaDev

## Overview

**Creative North Star: "The Engineer's Gallery"**

The portfolio behaves like a quiet gallery assembled by an engineer: the shell is disciplined, high-contrast, and deliberately recessive, while project evidence occupies the visual foreground. Generous empty space, a strict sans-serif hierarchy, and square-edged surfaces create technical credibility without imitating a dashboard. Amber is used sparingly as a curatorial mark—showing selection, focus, and action rather than decorating the page.

Personality is concentrated instead of spread everywhere. Miguel's portrait, expanding wordmark, rotatable cat, alternating project layouts, drawer transition, and dry copy provide the memorable moments. The result is confident and slightly playful, but never noisy. It should feel designed by the same person who engineered it.

This is an **Experience** surface: visitors are here to encounter the work. Navigation and controls should be precise and familiar, then get out of the way. The system rejects glossy marketing patterns, gratuitous gradients, decorative card stacks, rounded-everything softness, and color used without a state or content purpose.

**Key Characteristics:**

- Monochrome light and dark worlds with one scarce amber signal.
- Editorial-scale type, long vertical rhythm, and intentional negative space.
- Flat, square-edged structure; rounding is reserved for functional or physical forms.
- Project media and case-study content lead; chrome remains quiet.
- Small moments of personality rather than continuous visual spectacle.
- Equivalent desktop, mobile, keyboard, and reduced-motion experiences.

## Colors

The palette is ink, paper, and graphite, punctuated by a warm amber annotation. Semantic colors exist for system communication but do not compete with the portfolio's signature accent.

### Primary

- **Signature Amber:** The sole brand accent across light, dark, and system themes. Use it for active navigation, links, focus, open disclosures, list markers, and decisive hover feedback. Its warmth keeps the monochrome system human without becoming decorative.

### Secondary

- **Secondary Slate:** Reserved for semantic or supporting system contexts. It is not a second brand accent and should not appear simply to add variety.

### Tertiary

- **Information Blue, Success Green, and Error Red:** Functional status colors. Use them only when the meaning cannot be communicated as clearly with copy, structure, and the neutral palette.

### Neutral

- **Paper White and Ink Black:** The two page canvases and strongest contrast pair.
- **Paper Soft and Near Black:** Raised or inset reading surfaces in light and dark themes.
- **Mist, Quiet, Middle, Graphite, and Charcoal Grays:** Borders, secondary copy, disabled states, and tonal separation. Semantic variables decide which step applies in each theme.
- **Light Secondary Gray:** The contrast-safe secondary-copy tone used on white and soft-paper surfaces.

### Project loading and error artwork

Amber, rose, and teal artwork colors belong only to the generated layer shown while a required project thumbnail loads or when its request fails. They are not a substitute for the required thumbnail contract and must not migrate into interface chrome.

### Theme roles

| Role             | Light                | Dark            |
| ---------------- | -------------------- | --------------- |
| Accent           | Signature Amber      | Signature Amber |
| Primary text     | Near Black           | Paper Soft      |
| Secondary text   | Light Secondary Gray | Middle Gray     |
| Disabled text    | Quiet Gray           | Graphite Gray   |
| Main background  | Paper White          | Ink Black       |
| Sheet background | Paper Soft           | Near Black      |
| Border           | Mist Gray            | Charcoal Gray   |

`system` resolves to the same light or dark mapping through `prefers-color-scheme`. Components must consume the semantic roles, not branch on the selected theme.

**The Amber Annotation Rule.** Amber marks attention, selection, or movement. If an element is neither interactive nor meaningfully selected, it normally should not be amber.

**The Neutral Canvas Rule.** Large surfaces remain paper or ink. Do not introduce colored page panels to make an empty area feel busier; the negative space is structural.

**The Artwork Containment Rule.** The rose/teal/amber generated palette stays inside project-card loading and image-error states.

## Typography

**Display Font:** Barlow, with Segoe UI, Roboto, Helvetica, Arial, and sans-serif fallbacks  
**Body Font:** Barlow, with the same system fallback stack  
**Code Font:** `ui-monospace`, SFMono-Regular, Consolas, monospace

**Character:** Barlow provides an engineered, condensed-adjacent clarity without becoming cold. The same family spans assertive headings, light editorial paragraphs, compact labels, and utilitarian UI, so hierarchy comes from scale, weight, spacing, and case rather than font mixing.

### Hierarchy

- **Editorial Display** (700, fluid 3rem–5.5rem, 0.98 line height): Reserved for full-page error statements. It is left-aligned, tightly tracked, balanced, and limited to roughly 12 characters per line so failures still feel part of the portfolio.
- **Primary Headline** (600, fluid 1.4rem–3.2rem): The profile statement and route-level titles. The profile uses one semantic heading with deliberate line blocks; desktop headings stay on authored lines, while error and privacy headings may wrap.
- **Project Headline** (600–800, fluid according to surface): Project cards use uppercase 1.4rem–2.2rem titles; project details use a heavier 800 title to anchor the case study.
- **Section Title** (600, fluid 1.4rem–1.6rem): Uppercase section labels with compact line height and modest tracking.
- **Body** (200, fluid 1.1rem–1.26rem, fluid 1.55rem–1.85rem line height): Introductory and supporting prose. Overlines are limited to 52 characters and end with large vertical space.
- **Case-study Body** (300, 1rem, 1.75 line height): Long-form Markdown favors reading density and uses normal-case headings at 80% of the previous case-study heading scale, keeping every `h1`–`h6` below the portfolio headline hierarchy.
- **Label** (500–600, 0.75rem–1.05rem): Navigation, search labels, project metadata, tags, and action language. Uppercase labels use deliberate tracking.

Do not bold body copy to compensate for weak hierarchy. Use the appropriate semantic heading, spacing, or primary text color first. Long reading surfaces should remain around 58–72 characters where the layout supports it.

**The One Family Rule.** Barlow is the voice of the interface. Add another family only for a genuine content requirement, never to manufacture variety.

**The Weight Is Hierarchy Rule.** Light body copy and strong headings create the signature contrast; avoid collapsing everything to regular or semibold.

**The Case Study Is Reading Rule.** Markdown headings are deliberately smaller, mixed case, and more closely spaced than landing-page headings because the user has entered a reading surface.

## Layout

The global container is `calc(100% - 40px)` with a 1200px maximum. Home sections use a narrower content width of 970px, fill at least one viewport height, and receive 3.3rem vertical padding. The 64px fixed navigation is compensated by `main` padding and document scroll padding, keeping anchors and focused content visible.

The spacing system is nonlinear and intentionally generous: 0, 0.45rem, 0.9rem, 1.25rem, 2rem, 3.3rem, 5rem, 7rem, and 9rem. The smaller steps organize controls; the larger steps separate ideas and full-page chapters. New spacing should reuse this scale before introducing one-off values.

### Home composition

- **Navigation:** Fixed across the viewport, horizontally arranged inside the 1200px container.
- **Profile:** A 70/30 grid. Portrait, introduction, headline, and body occupy the main column; the cat sits low in the companion column. This asymmetric negative space is intentional.
- **Work:** A vertical stack containing section introduction, search, project list, empty state, and pagination.
- **Project cards:** Alternating 60/40 and 40/60 media/content grids. The media side is at least 400px tall on desktop and the ordering reverses on even cards.
- **Social:** A full-viewport closing section with a 970px content block and large icon links.
- **Footer:** Centered, visually light, and pulled upward on the home page so it does not create an extra pseudo-section.

### Project composition

The canonical page and drawer share a 1000px details container. Action controls sit in a full-width row above it. The header is a two-column grid: date, title, and role on the left; external project links on the right. Summary and technology tags form a two-column row before the progressive Markdown. Experience entries continue into a single-open initiative accordion after their overview.

The drawer begins 10 dynamic viewport units below the safe-area top, fills the remaining viewport, and uses the sheet background. The canonical route uses the same content without the overlay. This shared composition is essential: opening a drawer and following a shared project URL should reveal the same project story.

### Read and recovery surfaces

Privacy content uses an 800px container and a sticky-footer page shell. Error pages use a 970px outer container with content capped at 760px, vertically centered on desktop and top-weighted on mobile. Both are quiet reading surfaces; they should not introduce marketing-card layouts.

### Responsive behavior

At 750px and below:

- the center navigation links disappear while logo, résumé, and theme remain;
- the profile becomes one column, portrait width drops from 180px to 120px, and the cat gains its own padded row;
- project cards become a single column with media before copy and a 300px minimum media height;
- project summary and tags stack;
- details padding drops to the smallest spacing step;
- initiative headings stack their title and role while the disclosure control remains at least 44px tall;
- error actions stack vertically and the error content moves toward the top.

At 600px and below, the analytics notice stacks its copy and button, with the button aligned to the right. Coarse pointers replace the cat's drag hint with touch-specific instructions.

**The Long Page Rule.** Each home section gets enough vertical room to read as a chapter; do not pack profile, work, and social into a dashboard grid.

**The Same Story Rule.** Drawer and canonical project surfaces share content structure and component behavior rather than drifting into separate designs.

**The Mobile Reflow Rule.** Reorder into a clear reading sequence; do not horizontally squeeze the desktop composition or introduce page-level horizontal scrolling.

## Elevation & Depth

The system is flat by default. Structure comes from neutral contrast, hairline borders, spacing, and media—not stacked shadows. Depth appears only when a surface must float above content or represent a temporary layer.

### Depth vocabulary

- **Navigation glass:** The fixed nav mixes the main background with transparency and applies low saturation plus a 10px blur. It separates persistent navigation without producing a visible card.
- **Analytics glass:** The floating notice uses a mostly opaque main background, one-pixel border, restrained 6px blur, and a soft low shadow. The high opacity protects text readability over content.
- **Theme menu:** A sheet-colored surface with a border and conventional compact menu shadow.
- **Drawer:** A solid sheet rising above a large blurred, desaturated backdrop. Its elevation is primarily spatial and animated rather than shadow-based.
- **Cat halo:** A radial tonal gradient grounds the 3D model without creating a rectangular container.
- **Project loading/error artwork:** Blurred internal color fields temporarily hold the thumbnail plane without entering interface chrome.

Layer order is deliberate: navigation 1100, drawer 1200, modal 1300, analytics/snackbar 1400, tooltip 1500. The analytics notice remains operable above the drawer and participates in its focus loop while ordinary page content is inert. New overlays must use the semantic stack instead of arbitrary large z-index values.

**The Flat-by-Default Rule.** Shadows indicate a floating or transient layer. Static content and ordinary cards stay flat.

**The Legible Glass Rule.** Transparency is never allowed to make foreground and background copy compete. Increase surface opacity before increasing blur.

**The Structural Backdrop Rule.** The drawer backdrop explains modality and blocks background interaction; it is not decorative haze.

## Shapes

The dominant form language is square and editorial. Page regions, cards, the notice, solid action button, and error actions avoid ornamental rounding. Thin borders and underlines provide definition.

Rounding communicates one of three specific ideas:

- **Physical or personal:** The portrait and cat stage are circular.
- **Compact control:** Search input, icon actions, code, images, and thumbnails use subtle radii from 0.375rem to 0.9rem to soften small hit targets or clipped media.
- **Spatial sheet:** The drawer alone uses pronounced 20px top corners because it visibly rises from the bottom edge.

Borders are normally one neutral pixel. Open initiative controls use amber text rather than a heavier container. Error and secondary actions often use a bottom border instead of a containing box. Avoid pills; the system has no pill-shaped tags or actions.

The generated project artwork is a rectangular frame containing organic blurred forms. It is visible only while the required thumbnail loads or after that image request fails.

**The Radius Has Meaning Rule.** Do not round a surface merely to make it feel modern. Use rounding for physical forms, compact controls, clipped media, or the bottom-sheet metaphor.

**The Border Before Shadow Rule.** Prefer a neutral hairline or tonal shift when a flat surface needs separation.

## Components

### Navigation

Quiet and persistent. The 64px bar uses translucent glass over the page. The wordmark initially collapses to “MB”; hidden letters expand on hover with a 300ms ease-in-out transition after the initial 1.8s delay. Desktop section links are uppercase and medium weight. The active link and its two-pixel moving indicator use amber. Resume is a plain text action; theme is an icon control.

On mobile the center links disappear rather than becoming a redundant menu because the page remains a short, linear set of sections. Maintain adequate names and touch targets for the remaining controls.

### Theme picker

A 2.5rem-wide control inside the navigation's 4rem height. Its icon receives a subtle circular hover field. The menu is a compact 150px sheet with three options and a divider; hover uses the border tone, and the selected option uses amber plus semibold weight. It must work by click and keyboard, not only the current hover-assisted desktop behavior.

### Profile and portrait

The portrait is circular, monochrome, and 180px on desktop / 120px on mobile. It establishes personal presence before the headline. Introductory copy is light and restrained; the multiline headline owns the first viewport. Preserve the authored hierarchy and avoid surrounding the profile in a card.

### Interactive cat

The cat is the signature playful object. It sits on a circular radial stage, rotates gently after one second of inactivity, and accepts horizontal pointer drag or Left/Right arrow keys. Touch requires a double tap before drag so vertical page scrolling remains safe. Hints adapt to pointer type. The model may fail without blocking the profile.

### Search field

The search label is visible, uppercase, tracked, and secondary. The field is 44px tall, fills the available width, uses the sheet background, a one-pixel border, and a subtle radius. Placeholder text uses the disabled role. The global focus outline supplies the keyboard state. Search analytics record usage once per non-empty entry, never the query.

### Project cards

Project cards are content bands, not contained tiles. Media and text share an alternating asymmetric grid with no outer radius or shadow. The metadata line is small uppercase text; the title is large, uppercase, and compact; the summary clamps to four lines; “VIEW DETAILS” is the final action cue.

On hover the band receives a faint sheet tone, the required project thumbnail scales to 1.05 over 500ms, and the action turns amber with an underline. Thumbnail alternative text describes the project preview rather than repeating the title. Generated artwork occupies the same plane while the thumbnail loads or if its request fails; its motion stops under reduced motion.

### Pagination and empty state

Pagination is centered and intentionally minimal: 32px arrow and page controls, secondary by default, primary text on hover, amber for the current page, and 30% opacity when disabled. Page changes return focus to the first project and scroll the search region into view. The empty state is a centered copy block with a dashed neutral border and soft radius.

### Project drawer

The drawer enters from below with opacity and translation over 700ms and exits through the same transition. The backdrop simultaneously reveals a desaturated blur. It traps keyboard focus, closes with Escape or backdrop activation, locks background scrolling, and returns focus after closing. The drawer uses the canonical project URL in browser history.

### Project details and Markdown

The required 1200:630 artwork opens the project surface inside a shallow 4:1 desktop banner and a 3:2 mobile banner. `object-fit: cover` with centered positioning balances the crop across the top and bottom instead of anchoring it to one edge. The project header then uses italic date, heavy title, role, and compact icon links. Summary and technology tags establish context before long-form content. Markdown uses a 1rem reading size, 1.75 line height, a compact `h1`–`h6` scale reduced by 20%, amber links and list markers, sheet-backed blockquotes and code blocks, horizontally contained tables, and full-width inline evidence images with a 0.9rem radius.

The content skeleton is a long 72-character reading measure of neutral bars and two 3:2 media placeholders with a 1.4s opacity pulse. It is announced as a polite loading status and becomes static under reduced motion. One skeleton covers the overview and every initiative request; once it disappears, accordion interaction is immediate. Content failures replace only this region.

### Initiative accordion

Experience overviews end with the compact heading “Work I’m Proud Of” and a one-line explanation. Initiatives appear as full-width editorial disclosure rows rather than detached cards. Each row keeps its title, role, and summary visible; a CSS-drawn plus/minus marker and amber text communicate the open state. Expanded industry and tags repeat the main overview’s typographic hierarchy. Native buttons expose `aria-expanded` and control a labelled region. At most one initiative is open, and opening or closing never starts another request. Switching directly between initiatives scrolls the new disclosure heading below the fixed navigation so the reader starts at the top. The rows stay square and flat so the case-study evidence—not the control chrome—remains dominant.

### Error pages

Errors are editorial statements, not alert cards. A large balanced headline, short secondary explanation, and underlined recovery actions sit in generous negative space. The root and project not-found states use the same component. Project failures add “Try again”; all variants provide a home route. The global failure wrapper carries its own dark tokens because the root document may be unavailable.

### Analytics notice

The notice is a floating, square-edged glass card capped at 760px, centered above the bottom edge. It uses a highly opaque background, neutral border, restrained shadow, and compact copy. The **OK** action is a clear 44px solid button, not a text link; it inverts with amber on hover. The privacy link uses the normal amber link language. On narrow screens the button moves below the copy and aligns right.

### Social links and footer

Social links are large 2.4rem Boxicons with accessible names and no decorative containers. The footer is centered, light, and subordinate. Icons are loaded through the existing Boxicons font stylesheets so published project data can continue supplying icon class strings; do not replace this contract with React icon components casually.

### Motion and state language

Most state transitions use 200–300ms easing. Media zoom uses 500ms; the spatial drawer transition uses 700ms. Motion must explain state, spatial continuity, or interactivity. All operable elements retain a visible two-pixel amber focus outline with a two-pixel offset. Hover may enrich feedback but may not be the only indication or activation method.

## Do's and Don'ts

### Do:

- **Do** let projects, portrait, and the cat provide visual interest while interface chrome stays monochrome and quiet.
- **Do** use semantic theme variables and verify light, dark, and system appearances.
- **Do** reserve amber for focus, selection, links, and meaningful interaction feedback.
- **Do** preserve the generous vertical rhythm and 970px home reading width.
- **Do** keep project cards flat, media-led, and alternating on desktop.
- **Do** use the established spacing scale and recurring 750px responsive breakpoint.
- **Do** keep body copy readable, light in weight, and constrained to useful line lengths.
- **Do** maintain 44px targets for primary compact controls and visible keyboard focus everywhere.
- **Do** provide reduced-motion behavior for continuous or decorative animation.
- **Do** treat the drawer and canonical project page as two presentations of the same story.
- **Do** verify floating glass over real text in both themes; opacity protects readability.
- **Do** update this document and `.impeccable/design.json` when durable visual tokens or patterns change.

### Don't:

- **Don't** add gradients, background lines, blobs, or color fields to page chrome merely to fill negative space. The project-card loading/error artwork is the scoped exception.
- **Don't** turn sections, project cards, errors, or privacy content into generic rounded cards.
- **Don't** introduce pills, badge clouds, glass on every surface, or large soft shadows.
- **Don't** use amber as a large background or a second body-text color; its scarcity is the point.
- **Don't** introduce another font family or replace Barlow without an explicit identity decision.
- **Don't** make Markdown headings compete with the project title or landing-page headline.
- **Don't** hide critical behavior behind hover or remove the global focus treatment.
- **Don't** squeeze the alternating desktop grid onto mobile; reflow it to one reading column.
- **Don't** animate without purpose or ignore `prefers-reduced-motion` for continuous effects.
- **Don't** replace the portrait, cat, drawer, monochrome/amber language, or authored personality with a generic portfolio template.
