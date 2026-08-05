# GEMINI.md - AI Coding Assistant Rules & Project Conventions

## 1. Project Overview & Philosophy
This repository is a frontend capstone project built with AI-assisted development workflows. The goal is to write clean, maintainable, accessible, and type-safe code while leveraging AI tools effectively.

---

## 2. Technical Stack
- **Framework:** Next.js (App Router) / React
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks / Context API (or lightweight modern libraries as needed)
- **Tooling & Linting:** ESLint, Prettier, Node.js (LTS)
- **Version Control:** Git & GitHub

---

## 3. Coding Conventions & Standards

### Type Safety & TypeScript
- Always use **TypeScript** with strict type checking.
- Avoid using `any`; define explicit `interface` or `type` aliases for props, state, and API responses.

### Component Architecture
- Use **Functional Components** with hooks.
- Keep components modular, focused on a single responsibility (DRY principle).
- Preferred naming conventions:
  - `PascalCase` for component files and interfaces (e.g., `Navbar.tsx`, `UserProfileProps`).
  - `camelCase` for functions, hooks, and variables (e.g., `useAuth`, `formatDate`).
  - `kebab-case` or `lowercase` for general directories and utility files where applicable.

### Styling & UI/UX
- Use utility-first classes with **Tailwind CSS**.
- Ensure responsive design (Mobile-First approach) across all UI components.
- Maintain semantic HTML tags (`<header>`, `<main>`, `<section>`, `<nav>`) for accessibility (a11y).

---

## 4. Git & Commit Conventions (Conventional Commits 1.0.0)
All commits must strictly follow the Conventional Commits format:
`<type>[optional scope]: <description>`

### Allowed Types:
- `feat:` A new feature or user-facing capability.
- `fix:` A bug fix.
- `docs:` Documentation updates (`README.md`, `GEMINI.md`, inline comments).
- `style:` Formatting, missing semi-colons, etc. (no code change).
- `refactor:` Code change that neither fixes a bug nor adds a feature.
- `test:` Adding or updating tests.
- `chore:` Tooling, dependency updates, or configuration changes.

---

## 5. Instructions for Gemini CLI / AI Assistant
- **Explain Before Refactoring:** When asked to refactor, briefly summarize the intended changes before applying them.
- **Minimal Invasive Changes:** Do not overwrite existing working logic unless explicitly instructed.
- **Code Quality:** Ensure any generated code adheres to TypeScript strict mode and Tailwind CSS best practices.
- **Testing & Edge Cases:** Always consider edge cases (loading states, error handling, empty states) when generating UI components.

## Frontend Project AI Rules (Added from FE-03)
1. **Strict Schema Validation:** All form inputs must enforce explicit validation rules (required fields, valid email regex) before submission.
2. **Mandatory Accessibility:** Every input must have an associated `<label>` and use `aria-invalid` for error states.
3. **Verification Loop:** Every UI component must include a co-located `.test.jsx` file verifying validation errors and submit behavior.