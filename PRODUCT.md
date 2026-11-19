# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is engineering peers reviewing Miguel Bogota's work. Recruiters, hiring managers, and potential collaborators may also visit, but the portfolio is not optimized around a hiring funnel or lead-generation flow.

## Product Purpose

The portfolio exists to showcase Miguel's engineering work with confidence and personality. Its primary job is helping visitors review selected projects, understand the scope and impact of the work, and see how Miguel approaches software engineering, AI-enhanced systems, and product design.

Success means visitors can quickly understand Miguel's capabilities, open the projects that interest them, and leave with a memorable impression of the quality and character of the work.

## Positioning

This is an engineering portfolio built as a product rather than a static résumé. It combines outcome-focused project case studies, direct technical context, progressive Markdown details, and an interactive cat that makes the experience recognizably Miguel's.

The voice is confident enough to brag about strong work without inventing claims, metrics, customers, or evidence.

## Operating Context

- The portfolio is public and requires no account.
- Visitors review it on desktop and mobile, often arriving through a shared home or project URL.
- The home page introduces Miguel, provides searchable and paginated work, and links to social profiles and the résumé.
- Project cards open details in a drawer while preserving canonical, directly shareable project routes.
- Project metadata is loaded on the server; long-form Markdown loads when a project is opened.
- Light, dark, and system themes are supported.
- An informational notice describes pseudonymous analytics and links to the privacy page.

## Capabilities and Constraints

- Next.js 16 App Router with Cache Components is the application framework.
- Code and modules live at the repository root; there is intentionally no `src` directory.
- Project metadata and Markdown come from the companion `miguelbogotadev-api` repository.
- Known projects are generated at build time while newly published project IDs remain available at runtime.
- The project drawer intentionally uses lightweight browser-history navigation rather than intercepted routes.
- Browser Markdown requests pass through an internal Next.js API route so upstream paths and raw failures stay server-side.
- Firebase Analytics records only sanitized, pseudonymous events. Search text, user-entered content, raw errors, query strings, fragments, and complete outbound URLs are excluded.
- Firebase App Hosting is the production target and uses native Next.js inference; generated hosting bundles and unnecessary hosting configuration do not belong in source control.
- The site must remain useful when analytics is unavailable.

## Brand Commitments

- Product name and personal identity: Miguel Bogota / MiguelBogotaDev.
- Preserve the monochrome visual language with amber used as a focused accent.
- Preserve the Barlow typography, personal portrait, interactive cat, project drawer, project case studies, résumé, and social links.
- Preserve the straightforward, technically credible, slightly playful voice.
- Humor is welcome when it supports personality without weakening the work or obscuring important information.
- Both light and dark themes are part of the experience.

## Evidence on Hand

- Published project metadata and case-study content from `miguelbogotadev-api`.
- Project images and external project links supplied with the published project data.
- Personal portrait used by the profile and social preview.
- Public résumé and social profiles linked from the application.
- Interactive Three.js cat in `modules/profile/components/cat-model`.
- Current UI implementation, module READMEs, tests, and accessibility behavior in this repository.

No testimonials, client endorsements, press coverage, or additional performance claims are established by this repository. Future work must not fabricate them.

## Product Principles

1. Put the work first: projects and their technical context are the main reason to visit.
2. Show confidence with evidence: let real case studies, artifacts, and implementation quality do the bragging.
3. Keep Miguel in the product: preserve the portrait, cat, humor, and opinionated interaction details.
4. Make every project reachable: drawer browsing and canonical project URLs must remain equally useful.
5. Respect visitors: keep navigation accessible, analytics pseudonymous, and privacy behavior explicit.

## Accessibility & Inclusion

- Support keyboard navigation with visible focus states.
- Maintain readable contrast in light, dark, and system themes.
- Keep controls appropriately labeled and usable without hover.
- Preserve semantic headings, links, buttons, image alternatives, and reduced-motion-friendly behavior.
- Keep layouts usable across mobile and desktop without horizontal scrolling.
