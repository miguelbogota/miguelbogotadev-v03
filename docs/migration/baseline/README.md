# Next.js migration baseline

This document records the reproducible pre-migration baseline for
[Phase 0](https://github.com/miguelbogota/miguelbogotadev-v03/issues/28). It
contains no credentials or secret values.

## Snapshot

| Item          | Value                                      |
| ------------- | ------------------------------------------ |
| Recorded      | 2026-11-11                                 |
| Source branch | `feature/nextjs-migration`                 |
| Source commit | `d4604fc5698c0a7d720dc259a41c712be91849fd` |
| Phase branch  | `feature/nextjs-phase-0-baseline`          |
| Node.js       | `v25.8.1`                                  |
| npm           | `11.11.0`                                  |

## Command baseline

Run the commands from the repository root in this order:

```sh
npm ci
npm test
npm run build
```

Observed results:

- `npm ci` installed 255 packages. In the restricted automation environment,
  Husky could not lock `.git/config`; the install still completed. A normal
  local checkout should allow the prepare script to update Git configuration.
- `npm test` passed **15 test files and 64 tests** in 2.80 seconds.
- `npm run build` completed successfully.
- The client bundle was `1,286.64 kB` (`357.41 kB` gzip) and produced the
  existing warning for chunks larger than 500 kB after minification. Treat this
  warning as a migration non-regression: the Next.js result must not make the
  client payload worse without an explicit, measured reason.
- The Nitro build also reported that its function-named code-splitting group
  lacks a `debugName`. This is baseline tool output, not a migration failure.

The Vite development watcher hit the machine's open-file limit (`EMFILE`) in
the automation environment. The screenshots therefore use the successful
production build through `vite preview`, which is the more representative
baseline for migration parity.

## Visual baseline

Routes:

- Home: `/`
- Project: `/project/miguelbogotadev-v03`

Viewports:

- Desktop: 1440 × 1000
- Mobile: 390 × 844

| Route   | Desktop                                                | Mobile                                               |
| ------- | ------------------------------------------------------ | ---------------------------------------------------- |
| Home    | [home-desktop.png](screenshots/home-desktop.png)       | [home-mobile.png](screenshots/home-mobile.png)       |
| Project | [project-desktop.png](screenshots/project-desktop.png) | [project-mobile.png](screenshots/project-mobile.png) |

The project screenshots intentionally capture the client-loaded Markdown
skeleton. That loading behavior must remain scoped to the Markdown content
during the migration. The narrow screenshots also preserve the current
horizontal clipping behavior as baseline evidence; they do not define it as a
desired result.

## Firebase App Hosting baseline

Verified with Firebase CLI and Firebase Console on 2026-11-11:

| Setting                       | Value                                                      |
| ----------------------------- | ---------------------------------------------------------- |
| Firebase project              | `miguelbogotadev`                                          |
| Billing plan                  | Blaze                                                      |
| Backend                       | `miguelbogotadev-v03`                                      |
| Region                        | `us-east4`                                                 |
| Repository                    | `miguelbogota/miguelbogotadev-v03`                         |
| Live branch                   | `latest`                                                   |
| App root                      | `/`                                                        |
| Default domain                | `miguelbogotadev-v03--miguelbogotadev.us-east4.hosted.app` |
| Custom domain                 | `miguelbogota.dev` — connected                             |
| Console environment name      | Not set                                                    |
| Console environment overrides | None                                                       |
| Current live rollout          | `d4604fc` — succeeded                                      |

The custom domain returned HTTP 200 from Firebase App Hosting during
verification.

## Google Analytics baseline

Firebase project `miguelbogotadev` is linked to:

| Setting              | Value                        |
| -------------------- | ---------------------------- |
| Property             | `miguelbogotadev`            |
| Property ID          | `243937180`                  |
| Account              | Default Account for Firebase |
| Portfolio web stream | `web_v3`                     |
| Stream ID            | `14215201412`                |

The migration may use the linked `web_v3` stream, but it must implement only
the allowlisted anonymous/pseudonymous events described in the migration plan.
No Analytics credentials or measurement secrets belong in this document.

## Privacy prerequisite

The planned Analytics notice is informational and has one **OK** action rather
than accept/reject controls. Before production launch, validate that this model
is permitted for every intended visitor location and that the privacy page
matches the data actually collected. If consent is legally required for a
visitor, Analytics must not initialize before that consent.

## Reproduction checklist

- [x] Clean dependency installation completed.
- [x] Test count reproduced: 15 files / 64 tests.
- [x] Production build completed and warnings recorded.
- [x] Home and project routes captured at desktop and mobile sizes.
- [x] App Hosting backend, live branch, root, region, environment, and domains confirmed.
- [x] Linked Google Analytics property and portfolio stream confirmed.
- [x] Notice-only Analytics model recorded as a pre-launch legal validation item.
