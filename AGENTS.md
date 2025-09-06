# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` (App Router in `src/app/` with `page.tsx`, `layout.tsx`).
- Components: `src/components/` (`layout/`, `sections/`, modal, etc.).
- Hooks: `src/hooks/` with tests in `src/hooks/__tests__/`.
- Data: `src/data/` for static content (services, projects, social links).
- Styles: `src/app/globals.css`, Tailwind via `tailwind.config.ts`.
- Assets: `public/` (images, fonts). Path alias `@/*` maps to `src/*`.

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js dev server (Turbopack) at `:3000`.
- `npm run build`: Production build via `next build`.
- `npm run start`: Run the production server.
- `npm run lint`: ESLint with Next.js rules.
- `npm test` | `npm run test:watch` | `npm run test:coverage`: Jest + RTL.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Framework: Next.js 15 App Router.
- Linting: ESLint (`next/core-web-vitals`, `next/typescript`) from `eslint.config.mjs`.
- Components/Pages: PascalCase files (e.g., `Navigation.tsx`, `Hero.tsx`).
- Hooks: camelCase (e.g., `useWindowSize.ts`), exported as default.
- Tests: colocated `__tests__/Name.test.tsx`/`.ts` next to subject.
- Tailwind: prefer semantic palette (charcoal, slate, silver, pearl, accent) defined in `tailwind.config.ts`. See `STYLE_GUIDE.md` for classes.

## Testing Guidelines
- Framework: Jest (`jsdom`) with React Testing Library; setup in `jest.config.js` and `jest.setup.js`.
- Coverage: use `npm run test:coverage`; core app files (`app/page.tsx`, `app/layout.tsx`) excluded by config.
- Patterns: mock animations/GSAP and browser APIs as in existing tests. Keep tests deterministic and DOM-focused.

## Commit & Pull Request Guidelines
- Commits: use Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`). Keep messages imperative and scoped.
- PRs: include clear description, linked issues, and screenshots/GIFs for UI changes. Ensure `npm run lint` and `npm test` pass.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for runtime config (Next.js auto-loads). Avoid server-only APIs in client components.
- Large media: place under `public/` and reference with absolute paths (e.g., `/images/hero/image-1.jpg`).
