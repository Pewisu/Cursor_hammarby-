<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

### Overview

Static Next.js 16 site (Hammarby IF Datahub) — no backend, no database, no external services required. All match/player data is embedded in TypeScript files under `src/lib/`.

### Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` → `http://localhost:3000/Cursor_hammarby-/` |
| Build | `npm run build` (static export to `out/`) |
| Lint | `npm run lint` (ESLint 9, flat config) |

### Caveats

- The `basePath` is `/Cursor_hammarby-` — always include it when accessing routes locally.
- `output: "export"` means no server-side features (no API routes, no SSR). All pages are statically generated.
- Lint has pre-existing warnings and 2 errors (`react-hooks/immutability`, `react-hooks/set-state-in-effect`) in `LineupFormation.tsx` and `MatchStatisticsHub.tsx`. These are not environment issues.
- Node.js 20+ is required (the VM ships with v22).
