import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
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
        <div className="max-w-5xl mx-auto flex flex-wrap items-center text-sm font-cinzel text-text-medium gap-y-2">
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
          {/* Verse Hero */}
          <section className="bg-gradient-to-b from-[#1A0A02] to-[#2E1408] px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-3 bg-medium-brown/60 border border-gold/40 rounded-full px-6 py-2">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span className="font-cinzel text-gold uppercase tracking-widest text-sm">
                    Bhagavad Gita {cId}.{vId}
                  </span>
                </div>
              </div>

              {/* Sanskrit */}
              <div className="mb-8 bg-dark-brown/50 border border-gold/20 rounded-2xl p-8">
                <p className="text-xs font-cinzel text-gold/50 uppercase tracking-widest mb-4">
                  Sanskrit Original
                </p>
                <p className="text-3xl md:text-4xl font-devanagari text-saffron leading-loose whitespace-pre-line">
                  {verse.skt}
                </p>
              </div>

              {/* IAST */}
              <div className="mb-8">
                <p className="text-xs font-cinzel text-gold/50 uppercase tracking-widest mb-3">
                  Transliteration
                </p>
                <p className="text-lg text-gold italic leading-relaxed whitespace-pre-line font-serif">
                  {verse.iast}
                </p>
              </div>

              {/* Theme tags */}
              {verse.themes.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
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

          {/* Translations & Commentary */}
          <section className="max-w-4xl mx-auto px-4 py-16 space-y-8">
            {/* Hindi */}
            <div className="bg-white rounded-2xl border border-gold/20 shadow-sm p-8">
              <h2 className="text-xs font-cinzel text-gold/70 uppercase tracking-widest mb-4">
                Hindi Translation
              </h2>
              <p className="text-xl md:text-2xl font-devanagari text-dark-brown leading-loose">
                {verse.hindi}
              </p>
            </div>

            {/* English */}
            <div className="bg-parchment rounded-2xl border border-gold/20 shadow-sm p-8">
              <h2 className="text-xs font-cinzel text-gold/70 uppercase tracking-widest mb-4">
                English Translation
              </h2>
              <p className="text-xl md:text-2xl font-serif italic text-dark-brown leading-relaxed">
                "{verse.english}"
              </p>
            </div>

            {/* Word by Word */}
            {verse.wordByWord && verse.wordByWord.length > 0 && (
              <div className="bg-white rounded-2xl border border-gold/20 shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowWordByWord((p) => !p)}
                  className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-parchment transition-colors"
                >
                  <span className="font-cinzel text-dark-brown uppercase tracking-wider text-sm">
                    Word-by-Word Breakdown
                  </span>
                  {showWordByWord ? (
                    <ChevronUp className="w-5 h-5 text-gold" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gold" />
                  )}
                </button>
                {showWordByWord && (
                  <div className="p-6 border-t border-gold/10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {verse.wordByWord.map((w, i) => (
                        <div
                          key={i}
                          className="bg-parchment rounded-xl border border-gold/10 p-3 text-center"
                        >
                          <div className="font-devanagari text-saffron text-lg mb-1">{w.word}</div>
                          <div className="text-xs text-text-muted font-serif italic mb-1">{w.iast}</div>
                          <div className="text-xs text-text-medium font-devanagari border-t border-gold/10 pt-1 mb-1">
                            {w.hindi}
                          </div>
                          <div className="text-xs text-dark-brown font-serif">{w.english}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Detailed Explanation */}
            {verse.explanation && (
              <div className="bg-gradient-to-br from-parchment to-cream rounded-2xl border border-gold/20 shadow-sm p-8">
                <h2 className="font-cinzel text-saffron text-lg uppercase tracking-wider mb-6 pb-3 border-b border-gold/20">
                  Detailed Explanation
                </h2>
                <div className="prose prose-stone max-w-none font-serif text-text-medium leading-loose text-lg">
                  {renderFormattedText(verse.explanation)}
                </div>
              </div>
            )}

            {/* Gita Press Commentary */}
            {verse.gitaPressNote && (
              <div className="bg-white rounded-2xl border-l-4 border-gold p-8 shadow-sm">
                <h2 className="font-cinzel text-gold text-sm uppercase tracking-widest mb-4">
                  Gita Press Commentary
                </h2>
                <p className="font-serif text-text-medium text-lg leading-loose italic">
                  {verse.gitaPressNote}
                </p>
              </div>
            )}

            {/* Modern Relevance */}
            {verse.modernRelevance && (
              <div className="bg-dark-brown rounded-2xl p-8 shadow-lg">
                <h2 className="font-cinzel text-gold text-sm uppercase tracking-widest mb-4">
                  Modern Relevance
                </h2>
                <p className="font-serif text-parchment text-lg leading-loose">
                  {verse.modernRelevance}
                </p>
              </div>
            )}
          </section>
        </>
      ) : (
        /* Graceful fallback for verses without commentary yet */
        <section className="max-w-3xl mx-auto px-4 py-24 text-center">
          <div className="bg-white rounded-3xl border border-gold/20 shadow-lg p-12">
            <div className="text-6xl text-saffron font-devanagari mb-6">ॐ</div>
            <h1 className="font-cinzel text-3xl text-dark-brown mb-2">
              Bhagavad Gita {cId}.{vId}
            </h1>
            <p className="font-cinzel text-text-muted mb-8">{chapterName}</p>
            <div className="w-16 h-0.5 bg-gold/30 mx-auto mb-8" />
            <p className="font-serif text-text-medium text-lg leading-relaxed mb-6">
              Full commentary for this verse is being compiled with care and will be available soon.
            </p>
            <p className="font-serif text-text-muted italic text-base">
              "The Bhagavad Gita contains 700 verses of eternal wisdom. We are bringing each one to you with detailed word-by-word analysis and commentary."
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
        <div className="max-w-5xl mx-auto flex justify-between items-center text-gold font-cinzel uppercase tracking-wider text-sm">
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
