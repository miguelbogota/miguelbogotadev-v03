# AGENT.md

## 🧠 Purpose

This document defines how AI agents (and developers) should operate within this repository. The goal is to ensure consistency, maintainability, and high-quality code through disciplined practices like **TDD**, **design system adherence**, and **dependency minimalism**.

---

## ⚙️ Core Principles

### 1. Test-Driven Development (TDD) — ALWAYS

- Every feature or fix must follow:
  1. **Write a failing test**
  2. **Implement the minimal code to pass**
  3. **Refactor safely**

- Never write production code without a corresponding test.

- Prefer:
  - Unit tests for logic
  - Integration tests for flows
  - Always use `it` for test cases and start the description with "should".
  - Use `describe` for grouping related tests.
  - Use Vitest global API (globals: true)
  - Do not import `describe`, `it`, `expect`, etc. — they are available globally
  - Keep tests clean and focused by avoiding unnecessary imports

- Avoid testing implementation details.

---

### 2. Use Existing Design Tokens & Styles

- Always use variables from:

```scss
src/styles/_variables.scss
```

- Do NOT:
  - Hardcode colors, spacing, font sizes, or breakpoints
  - Duplicate existing variables

- If a variable does not exist:
  - Check if it can be derived from existing ones (e.g., using `color-mix` or math functions)
  - Ask before creating a new one
  - Add it to `_variables.scss`
  - Follow existing naming conventions

✅ Good:

```scss
color: var(--primary);
margin: var(--space-4);
```

❌ Bad:

```scss
color: #3498db;
margin: 16px;
```

---

### 3. Avoid Unnecessary Dependencies

- Before installing any package:
  - Ask: **Can this be implemented with existing tools or native APIs?**
  - Check if it's already installed

- Only add dependencies if:
  - It significantly reduces complexity
  - It is well-maintained and widely adopted
  - Ask for approval before adding new ones

- Never install:
  - Duplicate libraries (e.g., multiple date libraries)
  - Heavy libraries for trivial tasks

---

### 4. Keep Components Clean & Reusable

- Follow:
  - Single Responsibility Principle
  - Composition over inheritance

- Components must be:
  - Small
  - Testable
  - Reusable

- Avoid:
  - Massive components (>400 lines)
  - Mixed concerns (UI + business logic tightly coupled)

---

### 5. Consistent Code Style

- Use existing linting and formatting rules
- Prefer:
  - Type safety (TypeScript strict mode)
  - Explicit naming
  - Early returns over nested conditions
  - Prefer interfaces over types but use types for unions and primitives

---

### 6. Folder & File Discipline

- Respect existing structure
- Do not introduce new patterns without strong justification

Example:

```
/components
  /button
    index.ts
    button.component.tsx
    button.test.tsx
    button.styles.scss
```

---

### 7. Styling Rules

- Prefer:
  - SCSS scoped styles for components
  - Do not use BEM but rather semantic class names

- Always:
  - Use variables from `_variables.scss`
  - Avoid global overrides unless absolutely necessary

- No inline styles unless dynamic and justified

---

### 8. Performance Awareness

- Avoid unnecessary re-renders
- Memoize where appropriate
- Lazy load when beneficial

---

### 9. Accessibility (A11y)

- Always include:
  - Semantic HTML
  - ARIA attributes where needed

- Ensure keyboard navigation works

---

### 10. Documentation

- Every non-trivial component or function should:
  - Explain **why**, not just **what**
  - Include jsdoc comments for every top-level function and component
  - Add comments for complex logic

---

## 🚫 Anti-Patterns (DO NOT DO)

- ❌ Writing code without tests
- ❌ Hardcoding styles instead of using variables
- ❌ Installing libraries for trivial problems
- ❌ Ignoring existing patterns in the repo
- ❌ Creating overly complex abstractions too early
- ❌ Mixing concerns (UI + API + state in one place)

---

## ✅ Definition of Done

A task is complete when:

- [ ] Tests are written and passing
- [ ] Code follows repository patterns
- [ ] Styles use `_variables.scss`
- [ ] No unnecessary dependencies were added
- [ ] Code is readable and maintainable
- [ ] Documentation is updated (if needed)

---

## 🤖 Agent Behavior Guidelines

When acting autonomously, the agent must:

1. **Search for existing solutions before creating new ones**
2. **Reuse variables, utilities, and components**
3. **Default to TDD workflow**
4. **Minimize external dependencies**
5. **Prioritize clarity over cleverness**
