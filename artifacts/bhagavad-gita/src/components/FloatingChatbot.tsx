import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { STATIC_VERSES } from "@/data/verses";

const CURATED_VERSES = [
  { chapterId: 2, verseId: 47 },
  { chapterId: 2, verseId: 20 },
  { chapterId: 18, verseId: 66 },
  { chapterId: 6, verseId: 5 },
  { chapterId: 4, verseId: 7 },
  { chapterId: 9, verseId: 22 },
  { chapterId: 3, verseId: 27 },
  { chapterId: 2, verseId: 14 },
  { chapterId: 6, verseId: 6 },
  { chapterId: 12, verseId: 13 },
  { chapterId: 2, verseId: 19 },
  { chapterId: 4, verseId: 38 },
  { chapterId: 8, verseId: 7 },
  { chapterId: 9, verseId: 27 },
];

function pickVerse(index: number) {
  const ref = CURATED_VERSES[index % CURATED_VERSES.length];
  return STATIC_VERSES.find((v) => v.chapterId === ref.chapterId && v.id === ref.verseId) ?? STATIC_VERSES[0];
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * CURATED_VERSES.length));
  const [animating, setAnimating] = useState(false);

  const verse = pickVerse(index);

  function nextVerse() {
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % CURATED_VERSES.length);
      setAnimating(false);
    }, 220);
  }

  function prevVerse() {
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) => (i - 1 + CURATED_VERSES.length) % CURATED_VERSES.length);
      setAnimating(false);
    }, 220);
  }

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close verse panel" : "Open verse of the moment"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-saffron via-[#E07000] to-gold rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 ring-4 ring-gold/20 focus:outline-none"
      >
        {isOpen ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl drop-shadow">🪷</span>
        )}
      </button>

      {/* Verse Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gold/20 animate-in slide-in-from-bottom-6 fade-in duration-300"
          style={{
            width: "min(420px, calc(100vw - 32px))",
            background: "#FDFAF4",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1A0A02, #2E1408)" }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-lg shadow-inner flex-shrink-0">
              🪷
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-cinzel text-gold text-sm font-semibold leading-tight tracking-wide">
                Gita Shloka · गीता श्लोक
              </h3>
              <p className="text-parchment/50 text-[11px] font-cinzel uppercase tracking-widest mt-0.5">
                Timeless wisdom from the Bhagavad Gita
              </p>
            </div>
          </div>

          {/* Verse Content */}
          <div
            className="px-5 py-5 transition-opacity duration-200"
            style={{ opacity: animating ? 0 : 1 }}
          >
            {/* Chapter/Verse badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-cinzel text-saffron uppercase tracking-widest">
                BG {verse.chapterId}.{verse.id}
              </span>
              <div className="flex flex-wrap gap-1 justify-end">
                {verse.themes.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-cinzel uppercase tracking-wide bg-saffron/10 border border-saffron/20 text-saffron px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Sanskrit */}
            <div className="bg-gradient-to-b from-[#1A0A02] to-[#2E1408] rounded-xl p-4 mb-4">
              <p className="font-devanagari text-saffron text-lg leading-loose text-center whitespace-pre-line">
                {verse.skt}
              </p>
            </div>

            {/* Transliteration */}
            {verse.iast && (
              <p className="font-serif text-xs text-gold italic text-center leading-relaxed mb-4 whitespace-pre-line">
                {verse.iast}
              </p>
            )}

            {/* English */}
            <p className="font-serif text-sm text-text-dark leading-relaxed mb-3">
              {verse.english}
            </p>

            {/* Hindi */}
            {verse.hindi && (
              <p className="font-devanagari text-sm text-text-medium leading-[1.9] border-t border-gold/15 pt-3">
                {verse.hindi}
              </p>
            )}
          </div>

          {/* Footer: navigation + link */}
          <div className="px-4 pb-4 flex items-center justify-between gap-3">
            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevVerse}
                className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-saffron hover:bg-saffron/10 transition-colors"
                aria-label="Previous verse"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-[10px] font-cinzel text-text-muted">
                {(index % CURATED_VERSES.length) + 1} / {CURATED_VERSES.length}
              </span>
              <button
                onClick={nextVerse}
                className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-saffron hover:bg-saffron/10 transition-colors"
                aria-label="Next verse"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link
              href={`/chapter/${verse.chapterId}/verse/${verse.id}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 text-xs font-cinzel uppercase tracking-wider text-saffron hover:text-deep-saffron transition-colors"
            >
              Read Full Verse
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
