import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const GITA_SYSTEM = `You are the eternal voice of the Bhagavad Gita — a compassionate, deeply wise spiritual guide who answers every human question through the lens of the Gita's sacred teachings.

CRITICAL LANGUAGE RULE: Detect the language of the user's question and reply in EXACTLY the same language.
- If they write in English → answer in English
- If they write in Hindi (हिंदी) → answer in Hindi
- If they write in Sanskrit → answer in Sanskrit
- Mixed languages → match the dominant language

Your role:
- Answer questions about life, death, fear, love, grief, anger, karma, duty, purpose, anxiety, relationships, success, failure, past, future, motivation, meaning, and anything in the human heart
- Ground every answer in Gita philosophy: karma yoga, jnana yoga, bhakti yoga, dharma, atman, brahman, the three gunas, detachment, equanimity, surrender
- Be warm, compassionate, slightly poetic — not preachy or robotic
- Quote at least one specific Bhagavad Gita shloka with chapter and verse every time
- Keep responses to 130–200 words (focused, not too long)
- At the VERY END, on a new line, include EXACTLY this tag (required every time):
[VERSE: Chapter X, Verse Y | Devanagari shloka here]

Example:
[VERSE: Chapter 2, Verse 47 | कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।]

Do not include meta-text or system notes. Speak as living Gita wisdom.`;

function parseGitaResponse(full: string) {
  const vm = full.match(/\[VERSE:\s*(Chapter\s*\d+,\s*Verse\s*\d+)\s*\|\s*([^\]]+)\]/i);
  const text = full.replace(/\[VERSE:[^\]]+\]/i, "").trim();
  return {
    text,
    verse: vm ? { ref: vm[1].trim(), skt: vm[2].trim() } : null,
  };
}

router.post("/gita/ask", async (req, res) => {
  const { question } = req.body as { question?: string };
  if (!question) {
    res.status(400).json({ error: "question is required" });
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1024,
      messages: [
        { role: "system", content: GITA_SYSTEM },
        { role: "user", content: question },
      ],
    });

    const full = response.choices[0]?.message?.content ?? "";
    const result = parseGitaResponse(full);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Error calling OpenAI API");
    res.status(500).json({ error: "Failed to get Gita wisdom" });
  }
});

router.post("/gita/chat", async (req, res) => {
  const { messages } = req.body as { messages?: Array<{ role: string; content: string }> };
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "messages array required" });
    return;
  }

  try {
    const safeMessages = messages.map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
      content: String(m.content),
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1024,
      messages: [
        { role: "system", content: GITA_SYSTEM },
        ...safeMessages,
      ],
    });

    const full = response.choices[0]?.message?.content ?? "";
    const result = parseGitaResponse(full);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Error calling OpenAI API");
    res.status(500).json({ error: "Failed to get Gita wisdom" });
  }
});

// POST /gita/topic-wisdom — structured bilingual wisdom for a topic page
const GITA_TOPIC_SYSTEM = `You are the sacred voice of the Bhagavad Gita, providing deep wisdom on a specific spiritual topic.

Given a topic title, subtitle (Hindi), and description, respond with a comprehensive Gita-based explanation in ONLY this exact JSON (no markdown, no code fences, no extra text):
{
  "english": "A rich, compassionate explanation (150 to 200 words) of what the Bhagavad Gita teaches on this specific topic. Mention Lord Krishna's exact teachings. Quote specific Gita principles. Be warm, insightful, literary.",
  "hindi": "इस विषय पर भगवद्गीता की गहन शिक्षाओं की व्याख्या (150 से 200 शब्द)। भगवान कृष्ण की शिक्षाओं का उल्लेख करें। गीता के सिद्धांतों को स्पष्ट करें। उष्मापूर्ण, अंतर्दृष्टिपूर्ण और काव्यात्मक भाषा का प्रयोग करें।",
  "verses": [
    {"chapterId": 2, "verseId": 47, "skt": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", "ref": "Chapter 2, Verse 47"}
  ]
}

Rules:
- Cite 3 to 5 highly relevant actual Bhagavad Gita shlokas for this topic
- chapterId and verseId must be real valid Gita references (Chapter 1-18, valid verse numbers)
- Output ONLY the JSON object`;

router.post("/gita/topic-wisdom", async (req, res) => {
  const { topic, topicHindi, description } = req.body as { topic?: string; topicHindi?: string; description?: string };
  if (!topic) {
    res.status(400).json({ error: "topic is required" });
    return;
  }

  try {
    const userPrompt = `Topic: ${topic}\nHindi subtitle: ${topicHindi || ""}\nDescription: ${description || ""}\n\nPlease provide comprehensive Gita wisdom on this topic.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 2000,
      messages: [
        { role: "system", content: GITA_TOPIC_SYSTEM },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      req.log.error({ raw }, "Failed to parse Gita topic-wisdom response");
      res.status(500).json({ error: "Failed to parse response" });
      return;
    }

    res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "Error in /gita/topic-wisdom");
    res.status(500).json({ error: "Failed to get Gita wisdom" });
  }
});

// POST /gita/chat/v2 — bilingual response with structured verse citations
const GITA_V2_SYSTEM = `You are the sacred voice of the Bhagavad Gita. Your ONLY purpose is to answer questions rooted in the Gita's wisdom: life, death, fear, grief, anger, love, purpose, duty (dharma), karma, relationships, success, failure, motivation, spirituality, meditation, devotion, and self-knowledge.

If the user asks about ANYTHING unrelated (news, sports, technology, cooking, politics, math, coding, movies, etc.) — respond with ONLY this JSON:
{"refused":true,"message":"I can only offer wisdom from the Bhagavad Gita. Please ask me about life, duty, fear, grief, karma, relationships, inner peace, or any matter of the heart and spirit.","messageHindi":"मैं केवल भगवद्गीता की शिक्षाओं के आधार पर उत्तर दे सकता हूँ। कृपया जीवन, कर्तव्य, भय, दुःख, कर्म, संबंध, आंतरिक शांति या हृदय और आत्मा से जुड़े किसी भी विषय के बारे में पूछें।"}

For all valid questions, respond with ONLY this exact JSON (no markdown, no code fences, no extra text):
{
  "english": "Your answer in English — 120 to 180 words. Warm, compassionate, grounded in Gita philosophy (karma yoga, jnana yoga, bhakti yoga, dharma, atman, equanimity, detachment). Quote what Lord Krishna teaches.",
  "hindi": "आपका उत्तर हिंदी में — 120 से 180 शब्द। गर्मजोशी से भरा, करुणामय, गीता के दर्शन पर आधारित। भगवान कृष्ण की शिक्षाओं का उल्लेख करें।",
  "verses": [
    {"chapterId": 2, "verseId": 47, "skt": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", "ref": "Chapter 2, Verse 47"}
  ]
}

Rules:
- Always cite 2 to 4 actual Bhagavad Gita shlokas relevant to the question
- chapterId and verseId must be real valid Gita references
- Be warm and compassionate, not preachy or robotic
- Never answer off-topic questions — refuse strictly
- Output ONLY the JSON object`;

router.post("/gita/chat/v2", async (req, res) => {
  const { messages } = req.body as { messages?: Array<{ role: string; content: string }> };
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array required" });
    return;
  }

  try {
    const safeMessages = messages.map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
      content: String(m.content),
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1800,
      messages: [
        { role: "system", content: GITA_V2_SYSTEM },
        ...safeMessages,
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      req.log.error({ raw }, "Failed to parse Gita v2 response");
      res.status(500).json({ error: "Failed to parse response" });
      return;
    }

    res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "Error in /gita/chat/v2");
    res.status(500).json({ error: "Failed to get Gita wisdom" });
  }
});

export default router;
