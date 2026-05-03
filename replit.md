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
- **`lib/integrations-openai-ai-server/`** — Replit AI integration (OpenAI-compatible proxy). Exports `openai` client, batch helpers, image helpers. No API key needed — auto-provisioned by Replit.

### Key Pages
- **`Home.tsx`** — Hero, bilingual AI oracle search, Sacred Shlokas, FloatingChatbot. Schema: WebSite + SearchAction + Book
- **`ChapterPage.tsx`** — Chapter detail, verse list. Schema: BreadcrumbList + Article (with hasPart for first 10 verses)
- **`VersePage.tsx`** — Full verse with Sanskrit/Hindi/English/IAST, per-line "Explain This Line". Schema: BreadcrumbList + Article. Has "appears in topic collections" internal links section.
- **`TopicsListPage.tsx`** — 107 topics in 8 categories. Schema: BreadcrumbList + CollectionPage + ItemList (all 107)
- **`TopicPage.tsx`** — Individual topic with BilingualWisdomSection (AI article in English+Hindi), verse pills, verse cards, related topics. Schema: BreadcrumbList + Article + FAQPage + ItemList (verse list)

### Key Features
1. **All 18 chapters / 700+ verses** — Key verses as static data, rest AI-generated on demand
2. **107 Topic Pages** — Curated shlokas for every life situation, each with bilingual AI wisdom article
3. **AI Oracle** — Bilingual search (English + Hindi), verse reference cards, off-topic refusal
4. **Floating Chatbot** — Multi-turn conversation in English, Hindi, or Sanskrit
5. **Verse Detail Pages** — Sanskrit, transliteration, Hindi/English translations, word-by-word breakdown
6. **Per-Line Explanations** — Click "Explain This Line" on any Sanskrit line for AI commentary
7. **DB Caching** — AI-generated verse explanations cached in `verse_cache` table
8. **Internal Linking** — Verse pages link to topic collections; topic pages link to verses + related topics

### SEO Architecture
- **Sitemap**: `public/sitemap.xml` — 830 URLs (home + 18 chapters + 700 verses + 107 topics + utility pages). All 107 topics with `priority=0.85`, `changefreq=weekly`.
- **Robots.txt**: Allows all bots (Google, Bing, GPTBot, Claude, Perplexity, etc.), blocks `/api/`
- **Schema types used**:
  - Homepage: `WebSite` + `SearchAction` (sitelinks search box) + `Book` (Bhagavad Gita) + `WebPage`
  - Topic pages: `BreadcrumbList` + `Article` (with image, author, publisher, datePublished, dateModified, mainEntityOfPage, mentions) + `FAQPage` (3 Qs) + `ItemList` (verse list)
  - Topics list: `BreadcrumbList` + `CollectionPage` + `ItemList` (all 107 topics)
  - Chapter pages: `BreadcrumbList` + `Article` (with hasPart verse list) + `isPartOf: Book`
  - Verse pages: `BreadcrumbList` + `Article` (full metadata) + `isPartOf: Book`
- **Noscript fallback**: Topic wisdom section has `<noscript>` fallback with static description + Hindi subtitle for crawlers
- **AI content indexability**: Google CAN render JS. Static hero content (title, subtitle, description, verse pills) is available immediately. AI wisdom loads async but is in the DOM after JS runs.

## AI Models
All AI calls go through Replit's OpenAI proxy (`@workspace/integrations-openai-ai-server`). No external API key required — billed to Replit credits.
- **Chat / Oracle / Topic Wisdom** — `gpt-5-mini` (fast, cost-effective, high quality)
- **Verse generation / Line explanation** — `gpt-5.4` (most capable, best for scholarly Sanskrit content)
- All calls use `max_completion_tokens: 8192`

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection (auto-provisioned)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` — Replit OpenAI proxy URL (auto-provisioned)
- `AI_INTEGRATIONS_OPENAI_API_KEY` — Replit proxy key (auto-provisioned, dummy value for SDK compat)

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
