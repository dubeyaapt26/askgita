import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, BookOpen, Star } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { getStaticVerse } from "@/data/verses";
import { getChapter, getChapterVerseCount } from "@/data/chapters";

const DOMAIN = "https://askgita.net";

function renderFormattedText(text: string) {
  return text.split("\n\n").map((paragraph, i) => {
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="mb-4 last:mb-0">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="text-dark-brown font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          )
        )}
      </p>
    );
  });
}

export default function VersePage() {
  const { chapterId, verseId } = useParams();
  const cId = parseInt(chapterId || "1", 10);
  const vId = parseInt(verseId || "1", 10);

  const verse = getStaticVerse(cId, vId);
  const chapter = getChapter(cId);
  const totalVerses = getChapterVerseCount(cId);

  const prevVerse = vId > 1 ? vId - 1 : null;
  const nextVerse = vId < totalVerses ? vId + 1 : null;

  const [showHindi, setShowHindi] = useState(false);
  const [showWordByWord, setShowWordByWord] = useState(false);

  const chapterName = chapter?.name ?? `Chapter ${cId}`;
  const title = `Bhagavad Gita ${cId}.${vId} — ${chapterName}`;
  const description = verse
    ? `BG ${cId}.${vId}: ${verse.english.slice(0, 140)}... Read in Sanskrit, Hindi & English with word-by-word analysis.`
    : `Bhagavad Gita Chapter ${cId}, Verse ${vId} — ${chapterName}. Sanskrit, Hindi, and English translation.`;

  const verseJsonLd = verse
    ? [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
            { "@type": "ListItem", position: 2, name: chapterName, item: `${DOMAIN}/chapter/${cId}` },
            { "@type": "ListItem", position: 3, name: `Verse ${vId}`, item: `${DOMAIN}/chapter/${cId}/verse/${vId}` },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: verse.english,
          url: `${DOMAIN}/chapter/${cId}/verse/${vId}`,
          inLanguage: ["en", "hi", "sa"],
          isPartOf: { "@type": "Book", name: "Bhagavad Gita", url: DOMAIN },
          keywords: verse.themes.join(", "),
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-cream font-sans text-text-dark pb-16 lg:pb-0">
      <SEOHead
        title={title}
        description={description}
        canonical={`/chapter/${cId}/verse/${vId}`}
        keywords={
          verse
            ? verse.themes.join(", ") + ", bhagavad gita, gita shloka"
            : `bhagavad gita chapter ${cId} verse ${vId}`
        }
        jsonLd={verseJsonLd}
        type="article"
      />

      {/* Breadcrumb nav */}
      <nav className="sticky top-0 z-50 bg-parchment/95 backdrop-blur border-b border-gold px-4 py-3" aria-label="Breadcrumb">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center text-sm font-cinzel text-text-medium gap-y-2">
          <Link href="/" className="hover:text-saffron flex items-center mr-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Home
          </Link>
          <span className="mx-2 text-gold">/</span>
          <Link href={`/chapter/${cId}`} className="hover:text-saffron mr-2">
            {chapterName}
          </Link>
          <span className="mx-2 text-gold">/</span>
          <span className="font-bold text-dark-brown">Verse {vId}</span>
        </div>
      </nav>

      {verse ? (
        <>
          {/* ── Verse Hero ── */}
          <section className="bg-gradient-to-b from-[#1A0A02] to-[#2E1408] px-4 py-14">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-3 bg-medium-brown/60 border border-gold/40 rounded-full px-6 py-2">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span className="font-cinzel text-gold uppercase tracking-widest text-sm">
                    Bhagavad Gita {cId}.{vId}
                  </span>
                </div>
              </div>

              {/* Sanskrit shloka — click to toggle Hindi meaning */}
              <div
                className="mb-6 bg-dark-brown/50 border border-gold/30 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setShowHindi((p) => !p)}
                role="button"
                aria-expanded={showHindi}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowHindi((p) => !p)}
              >
                <div className="p-8">
                  <p className="text-xs font-cinzel text-gold/50 uppercase tracking-widest mb-4 text-center">
                    श्लोक — Sanskrit Original
                  </p>
                  <p className="text-3xl md:text-4xl font-devanagari text-saffron leading-loose whitespace-pre-line text-center">
                    {verse.skt}
                  </p>
                </div>
                {/* Click hint */}
                <div className="flex items-center justify-center gap-2 py-3 bg-dark-brown/40 border-t border-gold/10 text-gold/60 text-xs font-cinzel uppercase tracking-wider group-hover:text-gold/90 transition-colors">
                  {showHindi ? (
                    <><ChevronUp className="w-4 h-4" /> हिन्दी अर्थ छुपाएँ</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> हिन्दी अर्थ देखें — Click for Hindi Meaning</>
                  )}
                </div>

                {/* Hindi meaning accordion */}
                {showHindi && (
                  <div className="p-8 bg-[#1f0c04]/60 border-t border-gold/20">
                    <p className="text-xs font-cinzel text-gold/50 uppercase tracking-widest mb-4 text-center">
                      हिन्दी अनुवाद
                    </p>
                    <p className="text-2xl md:text-3xl font-devanagari text-cream leading-loose text-center">
                      {verse.hindi}
                    </p>
                    <div className="mt-6 pt-6 border-t border-gold/10">
                      <p className="text-xs font-cinzel text-gold/40 uppercase tracking-widest mb-3 text-center">
                        English Translation
                      </p>
                      <p className="text-lg font-serif italic text-parchment/80 leading-relaxed text-center">
                        "{verse.english}"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* IAST Transliteration */}
              <div className="mb-8 text-center">
                <p className="text-xs font-cinzel text-gold/40 uppercase tracking-widest mb-3">
                  IAST Transliteration
                </p>
                <p className="text-base text-gold/80 italic leading-relaxed whitespace-pre-line font-serif">
                  {verse.iast}
                </p>
              </div>

              {/* Theme tags */}
              {verse.themes.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {verse.themes.map((theme) => (
                    <span
                      key={theme}
                      className="bg-saffron/20 border border-saffron/40 text-cream text-xs font-cinzel uppercase tracking-wider px-3 py-1 rounded-full"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ── Main Two-Column Content ── */}
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* LEFT COLUMN — main commentary */}
              <div className="lg:col-span-2 space-y-8">

                {/* Word-by-Word (Sanskrit → Hindi + English) */}
                {verse.wordByWord && verse.wordByWord.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gold/20 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setShowWordByWord((p) => !p)}
                      className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-parchment transition-colors"
                    >
                      <div>
                        <p className="text-xs font-cinzel text-gold/60 uppercase tracking-widest mb-1">
                          शब्द-अर्थ विश्लेषण
                        </p>
                        <span className="font-cinzel text-dark-brown text-base">
                          Sanskrit Word Meanings — Hindi &amp; English
                        </span>
                      </div>
                      {showWordByWord ? (
                        <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gold flex-shrink-0" />
                      )}
                    </button>
                    {showWordByWord && (
                      <div className="p-6 border-t border-gold/10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {verse.wordByWord.map((w, i) => (
                            <div
                              key={i}
                              className="bg-parchment rounded-xl border border-gold/10 p-4 text-center"
                            >
                              <div className="font-devanagari text-saffron text-xl mb-1 leading-snug">
                                {w.word}
                              </div>
                              <div className="text-xs text-text-muted font-serif italic mb-2">
                                {w.iast}
                              </div>
                              <div className="text-sm font-devanagari text-dark-brown border-t border-gold/10 pt-2 mb-1 leading-snug">
                                {w.hindi}
                              </div>
                              <div className="text-xs text-text-medium font-serif leading-snug">
                                {w.english}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Hindi Expanded Meaning (Explanation) */}
                {verse.explanation && (
                  <div className="bg-white rounded-2xl border border-gold/20 shadow-sm p-8">
                    <p className="text-xs font-cinzel text-gold/60 uppercase tracking-widest mb-1">
                      विस्तृत व्याख्या
                    </p>
                    <h2 className="font-cinzel text-dark-brown text-lg mb-6 pb-3 border-b border-gold/20">
                      Hindi In-Depth Commentary
                    </h2>
                    <div className="font-devanagari text-text-medium leading-loose text-lg space-y-0">
                      {renderFormattedText(verse.explanation)}
                    </div>
                  </div>
                )}

                {/* Gita Press Commentary */}
                {verse.gitaPressNote && (
                  <div className="bg-parchment rounded-2xl border-l-4 border-gold p-8 shadow-sm">
                    <p className="text-xs font-cinzel text-gold/60 uppercase tracking-widest mb-1">
                      गीता प्रेस, गोरखपुर
                    </p>
                    <h2 className="font-cinzel text-dark-brown text-base mb-4">
                      Gita Press Commentary (Hindi)
                    </h2>
                    <p className="font-devanagari text-text-medium text-lg leading-loose">
                      {verse.gitaPressNote}
                    </p>
                  </div>
                )}

                {/* If no detailed content yet — show English translation nicely */}
                {!verse.explanation && !verse.wordByWord && (
                  <div className="bg-white rounded-2xl border border-gold/20 shadow-sm p-8">
                    <p className="text-xs font-cinzel text-gold/60 uppercase tracking-widest mb-4">
                      English Translation
                    </p>
                    <p className="text-xl font-serif italic text-dark-brown leading-relaxed">
                      "{verse.english}"
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN — Modern Relevance sidebar */}
              <div className="lg:col-span-1 space-y-6">

                {/* Modern Relevance */}
                {verse.modernRelevance && (
                  <div className="lg:sticky lg:top-20">
                    <div className="bg-dark-brown rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-4 h-4 text-gold" />
                        <p className="text-xs font-cinzel text-gold uppercase tracking-widest">
                          आधुनिक प्रासंगिकता
                        </p>
                      </div>
                      <h2 className="font-cinzel text-parchment text-base mb-4 pb-3 border-b border-medium-brown">
                        Modern Relevance
                      </h2>
                      <p className="font-serif text-parchment/90 text-base leading-loose">
                        {verse.modernRelevance}
                      </p>
                    </div>

                    {/* Verse Info Card */}
                    <div className="mt-6 bg-white rounded-2xl border border-gold/20 shadow-sm p-6">
                      <p className="text-xs font-cinzel text-gold/60 uppercase tracking-widest mb-4">
                        Verse Info
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-cinzel text-text-muted">Chapter</span>
                          <span className="font-serif text-dark-brown font-semibold">{cId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-cinzel text-text-muted">Verse</span>
                          <span className="font-serif text-dark-brown font-semibold">{vId} of {totalVerses}</span>
                        </div>
                        <div className="pt-2 border-t border-gold/10">
                          <span className="font-cinzel text-text-muted text-xs">Chapter Name</span>
                          <p className="font-serif text-dark-brown text-sm mt-1">{chapterName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* If no modernRelevance, show a simple verse info card */}
                {!verse.modernRelevance && (
                  <div className="bg-white rounded-2xl border border-gold/20 shadow-sm p-6">
                    <p className="text-xs font-cinzel text-gold/60 uppercase tracking-widest mb-4">
                      Verse Info
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-cinzel text-text-muted">Chapter</span>
                        <span className="font-serif text-dark-brown font-semibold">{cId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-cinzel text-text-muted">Verse</span>
                        <span className="font-serif text-dark-brown font-semibold">{vId} of {totalVerses}</span>
                      </div>
                      <div className="pt-2 border-t border-gold/10">
                        <span className="font-cinzel text-text-muted text-xs">Chapter Name</span>
                        <p className="font-serif text-dark-brown text-sm mt-1">{chapterName}</p>
                      </div>
                    </div>
                    {verse.themes.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gold/10">
                        <p className="text-xs font-cinzel text-gold/60 uppercase tracking-widest mb-3">Themes</p>
                        <div className="flex flex-wrap gap-2">
                          {verse.themes.map((theme) => (
                            <span
                              key={theme}
                              className="bg-saffron/10 border border-saffron/30 text-saffron text-xs font-cinzel px-2 py-1 rounded-full"
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <section className="max-w-3xl mx-auto px-4 py-24 text-center">
          <div className="bg-white rounded-3xl border border-gold/20 shadow-lg p-12">
            <div className="text-6xl text-saffron font-devanagari mb-6">ॐ</div>
            <h1 className="font-cinzel text-3xl text-dark-brown mb-2">
              Bhagavad Gita {cId}.{vId}
            </h1>
            <p className="font-cinzel text-text-muted mb-8">{chapterName}</p>
            <div className="w-16 h-0.5 bg-gold/30 mx-auto mb-8" />
            <p className="font-serif text-text-medium text-lg leading-relaxed mb-6">
              This verse is being compiled and will be available soon.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/chapter/${cId}`}
                className="bg-saffron text-white font-cinzel uppercase tracking-wider px-6 py-3 rounded-full hover:bg-deep-saffron transition-colors text-sm"
              >
                All Verses in Chapter {cId}
              </Link>
              <Link
                href="/"
                className="border border-gold/30 text-saffron font-cinzel uppercase tracking-wider px-6 py-3 rounded-full hover:bg-parchment transition-colors text-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <div className="bg-dark-brown py-4 px-4 sticky bottom-0 z-40 border-t border-medium-brown">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-gold font-cinzel uppercase tracking-wider text-sm">
          {prevVerse ? (
            <Link
              href={`/chapter/${cId}/verse/${prevVerse}`}
              className="hover:text-white flex items-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Prev</span>&nbsp;{cId}.{prevVerse}
            </Link>
          ) : cId > 1 ? (
            <Link
              href={`/chapter/${cId - 1}`}
              className="hover:text-white flex items-center transition-colors text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Ch.{cId - 1}
            </Link>
          ) : (
            <div className="w-24" />
          )}

          <Link
            href={`/chapter/${cId}`}
            className="text-parchment hover:text-gold text-xs px-3 py-1.5 border border-medium-brown hover:border-gold rounded transition-colors"
          >
            Chapter {cId}
          </Link>

          {nextVerse ? (
            <Link
              href={`/chapter/${cId}/verse/${nextVerse}`}
              className="hover:text-white flex items-center justify-end transition-colors"
            >
              {cId}.{nextVerse}&nbsp;<span className="hidden sm:inline">Next</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          ) : cId < 18 ? (
            <Link
              href={`/chapter/${cId + 1}`}
              className="hover:text-white flex items-center transition-colors text-xs"
            >
              Ch.{cId + 1} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          ) : (
            <div className="w-24" />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
