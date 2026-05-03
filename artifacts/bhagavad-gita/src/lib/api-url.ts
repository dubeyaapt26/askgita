/**
 * Returns the correct absolute or relative URL for an API path.
 *
 * - Replit (dev & production): uses Vite's BASE_URL so the shared reverse
 *   proxy routes /api/* to the co-located Express server.
 * - Vercel (or any external deployment): uses VITE_API_BASE_URL, an
 *   absolute URL pointing to a separately-deployed API server.
 *
 * Usage:
 *   getApiUrl("/api/gita/chat/v2")  →  "/api/gita/chat/v2"  (Replit)
 *   getApiUrl("/api/gita/chat/v2")  →  "https://api.askgita.net/api/gita/chat/v2"  (Vercel)
 */
export function getApiUrl(path: string): string {
  const externalBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (externalBase) {
    const base = externalBase.replace(/\/+$/, "");
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${base}${p}`;
  }
  const viteBase = (import.meta.env.BASE_URL ?? "/").replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${viteBase}${p}`;
}
