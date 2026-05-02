import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { db } from "@workspace/db";
import { verseCache } from "@workspace/db/schema";
import { CHAPTERS } from "../data/chapters";
import { getKeyVerse } from "../data/key-verses";

const router = Router();

const CHAPTER_VERSE_COUNTS: Record<number, number> = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28,
  9: 34, 10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20,
  16: 24, 17: 28, 18: 78,
};

// GET /gita/chapters — list all 18 chapters
router.get("/gita/chapters", (_req, res) => {
  const chapters = CHAPTERS.map(({ id, name, skt, meaning, totalVerses, summary, themes, keyVerseRef }) => ({
    id, name, skt, meaning, totalVerses, summary, themes, keyVerseRef,
  }));
  res.json({ chapters });
});

// GET /gita/chapters/:chapterId — chapter detail with verse summaries
router.get("/gita/chapters/:chapterId", async (req, res) => {
  const chapterId = parseInt(req.params.chapterId);
  if (isNaN(chapterId) || chapterId < 1 || chapterId > 18) {
    res.status(404).json({ error: "Chapter not found" });
    return;
  }

  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) {
    res.status(404).json({ error: "Chapter not found" });
    return;
  }

  const totalVerses = CHAPTER_VERSE_COUNTS[chapterId] ?? chapter.totalVerses;

  const verses = [];
  for (let v = 1; v <= totalVerses; v++) {
    const keyVerse = getKeyVerse(chapterId, v);
    if (keyVerse) {
      const firstLineSkt = keyVerse.skt.split("\n")[0];
      const firstLineIast = keyVerse.iast.split("\n")[0];
      verses.push({
        id: v,
        chapterId,
        skt: firstLineSkt,
        iast: firstLineIast,
        english: keyVerse.english.length > 120 ? keyVerse.english.slice(0, 120) + "…" : keyVerse.english,
        theme: keyVerse.themes[0] ?? "Wisdom",
      });
    } else {
      // Check DB cache (from any previously generated data)
      const cached = await db
        .select()
        .from(verseCache)
        .where(and(eq(verseCache.chapterId, chapterId), eq(verseCache.verseId, v)))
        .limit(1);

      if (cached.length > 0) {
        const data = cached[0].data as Record<string, unknown>;
        verses.push({
          id: v,
          chapterId,
          skt: (data.skt as string).split("\n")[0],
          iast: ((data.iast as string) || "").split("\n")[0],
          english: ((data.english as string) || "").slice(0, 120) + "…",
          theme: ((data.themes as string[]) || ["Wisdom"])[0],
        });
      } else {
        // Static stub
        verses.push({
          id: v,
          chapterId,
          skt: `अध्याय ${chapterId}, श्लोक ${v}`,
          iast: `Chapter ${chapterId}, Verse ${v}`,
          english: `Verse ${chapterId}.${v} of the Bhagavad Gita — click to read the full shloka in Sanskrit, Hindi, and English.`,
          theme: chapter.themes[v % chapter.themes.length] ?? "Wisdom",
        });
      }
    }
  }

  res.json({ ...chapter, verses });
});

// GET /gita/chapters/:chapterId/verses/:verseId — full verse detail
router.get("/gita/chapters/:chapterId/verses/:verseId", async (req, res) => {
  const chapterId = parseInt(req.params.chapterId);
  const verseId = parseInt(req.params.verseId);

  if (isNaN(chapterId) || chapterId < 1 || chapterId > 18 || isNaN(verseId) || verseId < 1) {
    res.status(404).json({ error: "Verse not found" });
    return;
  }

  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) {
    res.status(404).json({ error: "Chapter not found" });
    return;
  }

  const totalVerses = CHAPTER_VERSE_COUNTS[chapterId] ?? chapter.totalVerses;
  if (verseId > totalVerses) {
    res.status(404).json({ error: "Verse not found" });
    return;
  }

  const prevVerse = verseId > 1 ? verseId - 1 : null;
  const nextVerse = verseId < totalVerses ? verseId + 1 : null;

  // Key verses — pre-built, authoritative
  const keyVerse = getKeyVerse(chapterId, verseId);
  if (keyVerse) {
    res.json({
      id: verseId,
      chapterId,
      chapterName: chapter.name,
      skt: keyVerse.skt,
      iast: keyVerse.iast,
      hindi: keyVerse.hindi,
      english: keyVerse.english,
      wordByWord: keyVerse.wordByWord,
      explanation: keyVerse.explanation,
      gitaPressNote: keyVerse.gitaPressNote,
      modernRelevance: keyVerse.modernRelevance,
      themes: keyVerse.themes,
      prevVerse,
      nextVerse,
      isAiGenerated: false,
    });
    return;
  }

  // Check DB cache (previously generated data)
  const cached = await db
    .select()
    .from(verseCache)
    .where(and(eq(verseCache.chapterId, chapterId), eq(verseCache.verseId, verseId)))
    .limit(1);

  if (cached.length > 0) {
    const data = cached[0].data as Record<string, unknown>;
    res.json({ ...data, prevVerse, nextVerse, isAiGenerated: false });
    return;
  }

  // Static fallback for verses not in key-verses
  res.json({
    id: verseId,
    chapterId,
    chapterName: chapter.name,
    skt: `अध्याय ${chapterId}, श्लोक ${verseId}`,
    iast: `adhyāya ${chapterId}, śloka ${verseId}`,
    hindi: `भगवद्गीता के अध्याय ${chapterId} का श्लोक ${verseId} — ${chapter.skt} (${chapter.meaning})।`,
    english: `Bhagavad Gita Chapter ${chapterId}, Verse ${verseId} — from ${chapter.name} (${chapter.meaning}).`,
    wordByWord: [],
    explanation: chapter.longSummary,
    gitaPressNote: "",
    modernRelevance: "",
    themes: chapter.themes,
    prevVerse,
    nextVerse,
    isAiGenerated: false,
  });
});

export default router;
