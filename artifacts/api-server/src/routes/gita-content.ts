import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { db } from "@workspace/db";
import { verseCache } from "@workspace/db/schema";
import { anthropic } from "@workspace/integrations-anthropic-ai";
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
        verses.push({
          id: v,
          chapterId,
          skt: `अध्याय ${chapterId}, श्लोक ${v}`,
          iast: `Chapter ${chapterId}, Verse ${v}`,
          english: `Verse ${chapterId}.${v} of the Bhagavad Gita — click to explore the full meaning and explanation.`,
          theme: chapter.themes[v % chapter.themes.length] ?? "Wisdom",
        });
      }
    }
  }

  res.json({
    ...chapter,
    verses,
  });
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

  // Check key verses first (pre-built, authoritative)
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

  // Check DB cache
  const cached = await db
    .select()
    .from(verseCache)
    .where(and(eq(verseCache.chapterId, chapterId), eq(verseCache.verseId, verseId)))
    .limit(1);

  if (cached.length > 0) {
    const data = cached[0].data as Record<string, unknown>;
    res.json({ ...data, prevVerse, nextVerse, isAiGenerated: true });
    return;
  }

  // Generate via AI and cache
  req.log.info({ chapterId, verseId }, "Generating verse detail via AI");
  try {
    const prompt = `You are a Bhagavad Gita scholar with deep knowledge of Sanskrit and the Gita Press commentary tradition.

Generate complete, accurate information for Bhagavad Gita Chapter ${chapterId}, Verse ${verseId} (${chapter.name} — ${chapter.skt}).

Respond with ONLY valid JSON matching this exact structure (no markdown, no code blocks, no extra text):
{
  "skt": "Full Sanskrit verse in Devanagari script with line breaks using \\n",
  "iast": "Full IAST transliteration with line breaks using \\n",
  "hindi": "Complete Hindi translation (2-4 sentences, faithful to Gita Press style)",
  "english": "Complete English translation (2-4 sentences)",
  "wordByWord": [
    {"word": "Sanskrit word", "iast": "IAST", "hindi": "Hindi meaning", "english": "English meaning"}
  ],
  "explanation": "Detailed explanation in Hindi (300-500 words, Gita Press Gorakhpur style, use \\n\\n for paragraphs, use **bold** for key terms). Include the philosophical context, connection to surrounding verses, and what the commentators say.",
  "gitaPressNote": "Specific Gita Press (Gorakhpur) commentary note in Hindi, referencing Swami Ramsukhdas ji if applicable (100-150 words)",
  "modernRelevance": "Modern day application and relevance in Hindi (150-200 words) — practical examples from daily life, work, relationships",
  "themes": ["Theme1", "Theme2", "Theme3"]
}

Be authentic, scholarly, and faithful to the original meaning. The Sanskrit must be accurate. Themes should be in English.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.content[0]?.type === "text" ? message.content[0].text : "{}";

    const jsonText = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let verseData: Record<string, unknown>;
    try {
      verseData = JSON.parse(jsonText);
    } catch {
      req.log.error({ rawText }, "Failed to parse AI verse JSON");
      res.status(500).json({ error: "Failed to generate verse detail" });
      return;
    }

    const fullData = {
      id: verseId,
      chapterId,
      chapterName: chapter.name,
      ...verseData,
    };

    await db
      .insert(verseCache)
      .values({ chapterId, verseId, data: fullData })
      .onConflictDoNothing();

    res.json({ ...fullData, prevVerse, nextVerse, isAiGenerated: true });
  } catch (err) {
    req.log.error({ err }, "Error generating verse detail");
    res.status(500).json({ error: "Failed to generate verse detail" });
  }
});

// POST /gita/verses/prewarm — trigger background generation of a verse (fire-and-forget)
router.post("/gita/verses/prewarm", async (req, res) => {
  const { chapterId, verseId } = req.body as { chapterId: number; verseId: number };
  if (!chapterId || !verseId) { res.json({ ok: false }); return; }

  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) { res.json({ ok: false }); return; }

  const totalVerses = CHAPTER_VERSE_COUNTS[chapterId] ?? chapter.totalVerses;
  if (verseId < 1 || verseId > totalVerses) { res.json({ ok: false }); return; }

  const keyVerse = getKeyVerse(chapterId, verseId);
  if (keyVerse) { res.json({ ok: true, cached: true }); return; }

  const existing = await db
    .select({ chapterId: verseCache.chapterId })
    .from(verseCache)
    .where(and(eq(verseCache.chapterId, chapterId), eq(verseCache.verseId, verseId)))
    .limit(1);
  if (existing.length > 0) { res.json({ ok: true, cached: true }); return; }

  res.json({ ok: true, generating: true });

  setImmediate(async () => {
    try {
      const prompt = `You are a Bhagavad Gita scholar with deep knowledge of Sanskrit and the Gita Press commentary tradition.

Generate complete, accurate information for Bhagavad Gita Chapter ${chapterId}, Verse ${verseId} (${chapter.name} — ${chapter.skt}).

Respond with ONLY valid JSON matching this exact structure (no markdown, no code blocks, no extra text):
{
  "skt": "Full Sanskrit verse in Devanagari script with line breaks using \\n",
  "iast": "Full IAST transliteration with line breaks using \\n",
  "hindi": "Complete Hindi translation (2-4 sentences, faithful to Gita Press style)",
  "english": "Complete English translation (2-4 sentences)",
  "wordByWord": [
    {"word": "Sanskrit word", "iast": "IAST", "hindi": "Hindi meaning", "english": "English meaning"}
  ],
  "explanation": "Detailed explanation in Hindi (300-500 words, Gita Press Gorakhpur style, use \\n\\n for paragraphs, use **bold** for key terms). Include the philosophical context, connection to surrounding verses, and what the commentators say.",
  "gitaPressNote": "Specific Gita Press (Gorakhpur) commentary note in Hindi, referencing Swami Ramsukhdas ji if applicable (100-150 words)",
  "modernRelevance": "Modern day application and relevance in Hindi (150-200 words) — practical examples from daily life, work, relationships",
  "themes": ["Theme1", "Theme2", "Theme3"]
}

Be authentic, scholarly, and faithful to the original meaning. The Sanskrit must be accurate. Themes should be in English.`;
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      });
      const rawText = message.content[0]?.type === "text" ? message.content[0].text : "{}";
      const jsonText = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      const verseData = JSON.parse(jsonText);
      const fullData = { id: verseId, chapterId, chapterName: chapter.name, ...verseData };
      await db.insert(verseCache).values({ chapterId, verseId, data: fullData }).onConflictDoNothing();
    } catch { /* silent — best effort prewarm */ }
  });
});

// POST /gita/admin/seed-all — seeds all 701 verses concurrently (background)
router.post("/gita/admin/seed-all", async (req, res) => {
  res.json({ ok: true, message: "Seeding all verses in background", total: 701 });

  setImmediate(async () => {
    const allPairs: { chapterId: number; verseId: number }[] = [];
    for (const [ch, total] of Object.entries(CHAPTER_VERSE_COUNTS)) {
      const chId = parseInt(ch);
      for (let v = 1; v <= total; v++) allPairs.push({ chapterId: chId, verseId: v });
    }

    const cached = await db.select({ chapterId: verseCache.chapterId, verseId: verseCache.verseId }).from(verseCache);
    const cachedSet = new Set(cached.map(r => `${r.chapterId}-${r.verseId}`));

    const uncached = allPairs.filter(p => {
      if (cachedSet.has(`${p.chapterId}-${p.verseId}`)) return false;
      if (getKeyVerse(p.chapterId, p.verseId)) return false;
      return true;
    });

    const BATCH = 4;
    for (let i = 0; i < uncached.length; i += BATCH) {
      const batch = uncached.slice(i, i + BATCH);
      await Promise.allSettled(batch.map(async ({ chapterId, verseId }) => {
        try {
          const chapter = CHAPTERS.find(c => c.id === chapterId);
          if (!chapter) return;
          const prompt = `You are a Bhagavad Gita scholar with deep knowledge of Sanskrit and the Gita Press commentary tradition.

Generate complete, accurate information for Bhagavad Gita Chapter ${chapterId}, Verse ${verseId} (${chapter.name} — ${chapter.skt}).

Respond with ONLY valid JSON matching this exact structure (no markdown, no code blocks, no extra text):
{
  "skt": "Full Sanskrit verse in Devanagari script with line breaks using \\n",
  "iast": "Full IAST transliteration with line breaks using \\n",
  "hindi": "Complete Hindi translation (2-4 sentences, faithful to Gita Press style)",
  "english": "Complete English translation (2-4 sentences)",
  "wordByWord": [
    {"word": "Sanskrit word", "iast": "IAST", "hindi": "Hindi meaning", "english": "English meaning"}
  ],
  "explanation": "Detailed explanation in Hindi (300-500 words, Gita Press Gorakhpur style, use \\n\\n for paragraphs, use **bold** for key terms). Include the philosophical context, connection to surrounding verses, and what the commentators say.",
  "gitaPressNote": "Specific Gita Press (Gorakhpur) commentary note in Hindi, referencing Swami Ramsukhdas ji if applicable (100-150 words)",
  "modernRelevance": "Modern day application and relevance in Hindi (150-200 words) — practical examples from daily life, work, relationships",
  "themes": ["Theme1", "Theme2", "Theme3"]
}

Be authentic, scholarly, and faithful to the original meaning. The Sanskrit must be accurate. Themes should be in English.`;
          const message = await anthropic.messages.create({
            model: "claude-sonnet-4-5",
            max_tokens: 4096,
            messages: [{ role: "user", content: prompt }],
          });
          const rawText = message.content[0]?.type === "text" ? message.content[0].text : "{}";
          const jsonText = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
          const verseData = JSON.parse(jsonText);
          const fullData = { id: verseId, chapterId, chapterName: chapter.name, ...verseData };
          await db.insert(verseCache).values({ chapterId, verseId, data: fullData }).onConflictDoNothing();
        } catch { /* silent */ }
      }));
    }
  });
});

// POST /gita/verses/explain-line — AI explanation of a single Sanskrit line
router.post("/gita/verses/explain-line", async (req, res) => {
  const { chapterId, verseId, line, context } = req.body as {
    chapterId: number;
    verseId: number;
    line: string;
    context?: string;
  };

  if (!chapterId || !verseId || !line) {
    res.status(400).json({ error: "chapterId, verseId, and line are required" });
    return;
  }

  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) {
    res.status(404).json({ error: "Chapter not found" });
    return;
  }

  try {
    const prompt = `You are a Bhagavad Gita Sanskrit scholar. Explain this specific line from Chapter ${chapterId} (${chapter.name}), Verse ${verseId}:

Sanskrit line: ${line}
${context ? `Full verse context: ${context}` : ""}

Provide a detailed explanation in BOTH Hindi and English. Respond ONLY with valid JSON (no markdown):
{
  "line": "${line.replace(/"/g, '\\"')}",
  "hindi": "Detailed Hindi explanation of this specific line (200-300 words) — word meanings, grammatical notes, philosophical significance, and connection to Gita Press commentary",
  "english": "Detailed English explanation of this specific line (200-300 words) — word meanings, grammatical notes, philosophical significance",
  "wordBreakdown": [
    {"word": "Sanskrit word", "iast": "IAST transliteration", "hindi": "Hindi meaning", "english": "English meaning"}
  ]
}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.content[0]?.type === "text" ? message.content[0].text : "{}";
    const jsonText = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let result: Record<string, unknown>;
    try {
      result = JSON.parse(jsonText);
    } catch {
      req.log.error({ rawText }, "Failed to parse line explanation JSON");
      res.status(500).json({ error: "Failed to generate explanation" });
      return;
    }

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Error explaining verse line");
    res.status(500).json({ error: "Failed to explain verse line" });
  }
});

export default router;
