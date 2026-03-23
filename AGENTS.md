# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

AlivIA (`alivia-frontend`) is a Spanish-language chronic pain management frontend built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and shadcn/ui. It is a **frontend-only** prototype — all data is hardcoded/mocked in components. There is no backend.

### Development commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Lint | `npm run lint` |
| Build | `npm run build` |

### Important notes

- **No test framework**: There are no automated tests (`jest`, `vitest`, `playwright`, etc.) in the project. `npm test` does not exist.
- **No backend**: `lib/api.ts` has all endpoints commented out. The app runs entirely on mocked/hardcoded data within components.
- **TypeScript errors ignored at build time**: `next.config.mjs` sets `typescript: { ignoreBuildErrors: true }`.
- **Single route**: The app has one route (`app/page.tsx`) with client-side section switching via a bottom navigation bar (Diario, Comunidad, AlivIA, Perfil).
- **ESLint**: Uses ESLint 9 with `eslint-config-next@15` via flat config (`eslint.config.mjs`). The `@eslint/eslintrc` FlatCompat bridge is used.
- **No `.env` file needed**: The app works without any environment variables.
