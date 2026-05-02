import { pgTable, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export const verseCache = pgTable("verse_cache", {
  chapterId: integer("chapter_id").notNull(),
  verseId: integer("verse_id").notNull(),
  data: jsonb("data").notNull(),
  cachedAt: timestamp("cached_at").defaultNow().notNull(),
});

export type VerseCacheRow = typeof verseCache.$inferSelect;
