# Bhagavad Gita Reader

A full-featured Bhagavad Gita reader replicating `https://gita-reader--dubeyaapt.replit.app`. Features all 700 verses across 18 chapters with AI-powered commentary, per-line explanations, and a floating chatbot.

## Architecture

This is a pnpm monorepo with the following structure:

### Artifacts
- **`artifacts/bhagavad-gita/`** — React + Vite frontend (port 21912, preview path `/`)
  - Wouter routing, TanStack Query, Tailwind CSS
  - Fonts: Cinzel, Cormorant Garamond, Noto Sans Devanagari
  - Theme: saffron (#E07B39), gold, dark-brown, cream
  - Uses `@workspace/api-client-react` for all API calls (generated hooks)
- **`artifacts/api-server/`** — Express API server (port 8080, paths `/api`)
  - Routes: `/api/gita/ask`, `/api/gita/chat`, `/api/gita/chapters`, `/api/gita/chapters/:id`, `/api/gita/chapters/:id/verses/:id`, `/api/gita/verses/prewarm`, `/api/gita/verses/explain-line`, `/api/gita/admin/seed-all`

### Libs
- **`lib/api-spec/`** — OpenAPI spec + orval codegen config. Run `pnpm --filter @workspace/api-spec run codegen` after spec changes.
- **`lib/api-client-react/`** — Generated React Query hooks (from openapi.yaml). Do not edit `src/generated/` manually.
- **`lib/api-zod/`** — Generated Zod schemas. `src/index.ts` exports only from `./generated/api` (single-mode output).
- **`lib/db/`** — Drizzle ORM + PostgreSQL (`verse_cache` table for AI-generated verse data)
- **`lib/integrations-anthropic-ai/`** — Anthropic Claude AI client (uses Replit AI integration)

### Key Pages
- **`Home.tsx`** — Hero with Om symbol, AI oracle search box (useAskGita), Sacred Shlokas section, FloatingChatbot
- **`ChapterPage.tsx`** — Chapter detail with setting, themes, verse list (useGetChapter)
- **`VersePage.tsx`** — Full verse with Sanskrit lines + per-line "Explain This Line" buttons (useGetVerse, useExplainVerseLine), Hindi/English/IAST, word-by-word breakdown

### Key Features
1. **All 18 chapters / 700+ verses** — Key verses as static data, rest AI-generated on demand
2. **AI Oracle** — Ask any life question, get wisdom grounded in Gita philosophy with verse citation
3. **Floating Chatbot** — Multi-turn conversation in English, Hindi, or Sanskrit (rendered in Home.tsx)
4. **Verse Detail Pages** — Sanskrit, transliteration, Hindi/English translations, word-by-word breakdown
5. **Per-Line Explanations** — Click "Explain This Line" on any Sanskrit line for AI commentary
6. **DB Caching** — AI-generated verse explanations cached in `verse_cache` table

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection (auto-provisioned)
- `AI_INTEGRATIONS_ANTHROPIC_BASE_URL` — Anthropic AI proxy URL (auto-provisioned)
- `AI_INTEGRATIONS_ANTHROPIC_API_KEY` — Anthropic API key (auto-provisioned)

## Development
- Frontend: auto-runs via workflow `artifacts/bhagavad-gita: web`
- API: auto-runs via workflow `artifacts/api-server: API Server`

## Codegen
After changing `lib/api-spec/openapi.yaml`, always run:
```
pnpm --filter @workspace/api-spec run codegen
```
This regenerates `lib/api-client-react/src/generated/` and `lib/api-zod/src/generated/`.
The api-zod `src/index.ts` must only contain `export * from "./generated/api"` (no types barrel — they conflict with zod schema names).

## Database
- Table: `verse_cache` (chapter_id, verse_id, data jsonb, cached_at timestamp)
- Push schema: `pnpm --filter @workspace/db run push`

## Vite fs.allow
`artifacts/bhagavad-gita/vite.config.ts` has `fs.allow` set to include the workspace `lib/` directory so workspace packages resolve correctly through symlinks.
