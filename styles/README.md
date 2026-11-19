# Styles

Global Sass lives at the repository root and is loaded once by `app/layout.tsx`. Component styles stay beside their owning component.

## Files

- `index.scss`: global style entry point.
- `_reset.scss`: browser normalization.
- `_variables.scss`: shared Sass variables and breakpoints.
- `base.scss`: element-level defaults.
- `global.scss`: application-wide theme and utility rules.

Prefer module-owned component classes for feature styling. Keep each component's selectors nested beneath its strict parent selector and avoid extra class names when semantic elements are sufficient. Add rules here only when they truly apply across the application.
