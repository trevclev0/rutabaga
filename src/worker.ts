/// <reference types="@cloudflare/workers-types" />
/**
 * Cloudflare Worker entrypoint for rutabaga.
 *
 * This worker handles API routes. All other requests are served
 * from the static assets in ./dist (built by Vite).
 *
 * Add API routes below and let everything else fall through to ASSETS.
 */

export interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // ---------------------------------------------------------------------------
    // API routes — add your server-side logic here
    // ---------------------------------------------------------------------------
    if (url.pathname.startsWith('/api/')) {
      // Example health-check endpoint
      if (url.pathname === '/api/health') {
        return Response.json({ status: 'ok' })
      }

      // TODO: add more API routes here
      return Response.json({ error: 'Not found' }, { status: 404 })
    }

    // ---------------------------------------------------------------------------
    // Everything else → serve the SPA static assets
    // ---------------------------------------------------------------------------
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
