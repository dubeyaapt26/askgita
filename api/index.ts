/**
 * Vercel Serverless Function Entry Point
 *
 * This file wraps the Express app for Vercel deployment.
 * Vercel's Node.js runtime handles the Express app natively.
 *
 * Required environment variables (set in Vercel Dashboard):
 *   DATABASE_URL                      — PostgreSQL connection string
 *   AI_INTEGRATIONS_OPENAI_BASE_URL   — OpenAI-compatible API base URL
 *   AI_INTEGRATIONS_OPENAI_API_KEY    — OpenAI API key
 */
import app from "../artifacts/api-server/src/app";

export default app;
