# Theme module

Owns the supported theme values, theme validation, cookie persistence, and theme picker UI.

## Interface

- `Theme` is the validated `light | dark | system` domain type.
- `themeService.getThemeFromCookieString(cookie)` reads the stored theme and falls back to `system` when missing.
- `themeService.setThemeCookie(theme)` persists the selected browser theme at the site root.
- `ThemePicker` updates the DOM, cookie, and application theme state together.

```ts
import { ThemePicker, themeService, type Theme } from '@/modules/theme';
```

## Behavior

The private class keeps construction internal and exposes one shared `themeService` instance. Missing cookies resolve to `system`. Browser writes use the root path and `SameSite=Lax`.

## Files

- `index.ts`: public module exports.
- `components/theme-picker/index.tsx`: component export.
- `components/theme-picker/theme-picker.component.tsx`: interactive selector and DOM synchronization.
- `components/theme-picker/theme-picker.styles.scss`: picker-only presentation.
- `components/theme-picker/theme-picker.test.tsx`: user interaction coverage.
- `services/theme.service.ts`: private class and exported singleton for cookie behavior.
- `services/theme.service.test.ts`: singleton behavior tests.
- `types/types.ts`: supported `Theme` values.
