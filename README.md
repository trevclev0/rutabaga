# rutabaga 🥔

A React + TypeScript SPA hosted on Cloudflare Workers + Assets.

## Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript |
| Bundler | Vite |
| Component Library | Material UI v6 |
| Routing | React Router v6 |
| Server State | TanStack Query v5 |
| Client State | Jotai v2 |
| Testing | Vitest + Testing Library |
| Hosting | Cloudflare Workers + Assets |

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server (Vite) |
| `npm run build` | Type-check + build for production |
| `npm run test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run cf:dev` | Run locally with Wrangler (includes Worker) |
| `npm run deploy` | Build + deploy to Cloudflare |

## Project Structure

```
src/
├── api/          # queryClient + API fetch helpers
├── components/   # Shared/layout components
├── hooks/        # Custom React hooks
├── pages/        # Route-level page components
├── router/       # React Router config
├── store/        # Jotai atoms (global client state)
├── test/         # Test setup
├── main.tsx      # App entrypoint
├── theme.ts      # MUI theme
└── worker.ts     # Cloudflare Worker entrypoint (API routes)
```

## Deployment

1. Authenticate with Cloudflare: `npx wrangler login`
2. Deploy: `npm run deploy`

The worker serves `/api/*` routes and falls back to the built SPA for all other paths.
```
