# Padre Gino's — Production React (Day 1–3)

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · SQLite

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npx vitest run
npm run build
npm run db:reset     # restore data/pizza.sqlite from the seed (stop dev first)
```

Classroom switches:

- Footer checkbox **"Simulasi gagal server"** makes every write fail on purpose.
- `DEMO_READ_LATENCY_MS` / `DEMO_WRITE_LATENCY_MS` in `.env.local` change the artificial delay (defaults 300 / 800 ms).

Each step of the workshop is a git tag. See `README-DAY1.md`.
