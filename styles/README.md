# Styles

Global Sass lives at the repository root and is loaded once by `app/layout.tsx`. Component styles stay beside their owning component.

## Files

- `index.scss`: global style entry point.
- `_reset.scss`: browser normalization.
- `_variables.scss`: shared Sass variables and breakpoints.
- `base.scss`: element-level defaults.
- `global.scss`: application-wide theme and utility rules.

Prefer module-owned component classes for feature styling. Add rules here only when they truly apply across the application.
