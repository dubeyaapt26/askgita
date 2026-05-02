# Bhagavad Gita Reader

A full-featured Bhagavad Gita reader with AI-powered verse explanations, multilingual chatbot (English/Hindi/Sanskrit), all 18 chapters and 700+ verses, and database caching.

## Architecture

This is a pnpm monorepo with the following structure:

### Artifacts
- **`artifacts/bhagavad-gita/`** — React + Vite frontend (port 21912, preview path `/`)
  - Wouter routing, TanStack Query, Tailwind CSS
  - Fonts: Cinzel, Cormorant Garamond, Noto Sans Devanagari
  - Theme: saffron (#E07B39), gold, dark-brown, cream
- **`artifacts/api-server/`** — Express API server (port 8080, paths `/api`)
  - Routes: `/api/gita/ask`, `/api/gita/chat`, `/api/gita/chat/v2`, `/api/gita/chapters`, `/api/gita/chapters/:id`, `/api/gita/chapters/:id/verses/:id`, `/api/gita/verses/explain-line`

### Libs
- **`lib/db/`** — Drizzle ORM + PostgreSQL (`verse_cache` table for AI-generated verse data)
- **`lib/api-zod/`** — Zod schemas for all API request/response types
- **`lib/integrations-anthropic-ai/`** — Anthropic Claude AI client (uses Replit AI integration)

### Key Features
1. **All 18 chapters / 700+ verses** — Static data in `artifacts/bhagavad-gita/src/data/`
2. **AI Oracle** — Ask any life question, get wisdom grounded in Gita philosophy with verse citation
3. **Floating Chatbot** — Multi-turn conversation in English, Hindi, or Sanskrit
4. **Verse Detail Pages** — Sanskrit, transliteration, Hindi/English translations, word-by-word breakdown
5. **48 Topics** — Curated verses by life topic (anxiety, karma, duty, devotion, etc.)
6. **DB Caching** — AI-generated verse explanations cached in `verse_cache` table

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection (auto-provisioned)
- `AI_INTEGRATIONS_ANTHROPIC_BASE_URL` — Anthropic AI proxy URL (auto-provisioned)
- `AI_INTEGRATIONS_ANTHROPIC_API_KEY` — Anthropic API key (auto-provisioned)

## Development
- Frontend: auto-runs via workflow `artifacts/bhagavad-gita: web`
- API: auto-runs via workflow `artifacts/api-server: API Server`

## Database
- Table: `verse_cache` (chapter_id, verse_id, data jsonb, cached_at timestamp)
- Push schema: `pnpm --filter @workspace/db run push`
