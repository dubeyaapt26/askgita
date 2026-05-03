import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { useGetVerse, useExplainVerseLine } from "@workspace/api-client-react";
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { TOPICS } from "@/data/topics";
import { SiteLogo } from "@/components/SiteLogo";

function renderFormattedText(text: string) {
  return text.split('\n\n').map((paragraph, i) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} className="mb-4 last:mb-0">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-dark-brown">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

function LineExplanationPanel({ chapterId, verseId, line, context }: { chapterId: number, verseId: number, line: string, context: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const explainMut = useExplainVerseLine();

  const handleToggle = async () => {
    if (!isOpen && !explainMut.data && !explainMut.isPending) {
      await explainMut.mutateAsync({ data: { chapterId, verseId, line, context } });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-6 mb-10 last:mb-0">
      <button
        onClick={handleToggle}
        className="text-xs md:text-sm font-cinzel uppercase tracking-wider flex items-center mx-auto text-saffron border border-saffron/30 px-5 py-2 rounded-full hover:bg-saffron hover:text-white transition-all duration-300"
      >
        {explainMut.isPending ? (
          <span className="flex items-center"><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" /> Seeking Wisdom...</span>
        ) : (
          <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2" /> Explain this line {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}</span>
        )}
      </button>

      {isOpen && explainMut.data && (
        <div className="mt-6 bg-cream border border-gold/30 rounded-xl p-6 md:p-8 text-left animate-in fade-in slide-in-from-top-4 duration-500 shadow-inner">
          <div className="mb-6 bg-white p-6 rounded-lg border border-gold/10 shadow-sm">
            <h4 className="font-cinzel text-sm text-saffron uppercase tracking-wider mb-3 flex items-center">
              <span className="text-xl mr-2">🇮🇳</span> हिंदी व्याख्या
            </h4>
            <p className="font-devanagari text-lg text-dark-brown leading-[1.8]">{explainMut.data.hindi}</p>
          </div>
          <div className="mb-8 bg-white p-6 rounded-lg border border-gold/10 shadow-sm">
            <h4 className="font-cinzel text-sm text-saffron uppercase tracking-wider mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" /> English Meaning
            </h4>
            <p className="font-serif text-lg text-dark-brown leading-relaxed">{explainMut.data.english}</p>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg border border-gold/10 shadow-sm">
            <table className="w-full text-left font-serif min-w-[600px]">
              <thead>
                <tr className="bg-parchment border-b border-gold/20 font-cinzel text-dark-brown text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold w-1/4">Sanskrit</th>
                  <th className="p-4 font-semibold w-1/4">IAST</th>
                  <th className="p-4 font-semibold w-1/4">हिंदी</th>
                  <th className="p-4 font-semibold w-1/4">English</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {explainMut.data.wordBreakdown.map((w, i) => (
                  <tr key={i} className="hover:bg-cream/50 transition-colors">
                    <td className="p-4 font-devanagari text-lg text-deep-saffron">{w.word}</td>
                    <td className="p-4 italic text-text-medium">{w.iast}</td>
                    <td className="p-4 font-devanagari text-text-dark">{w.hindi}</td>
                    <td className="p-4 text-text-dark">{w.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isOpen && explainMut.isError && (
        <div className="mt-6 text-center text-destructive text-base font-serif p-6 bg-destructive/5 border border-destructive/20 rounded-xl">
          Failed to illuminate this line. Please try again.
        </div>
      )}
    </div>
  );
}

function prewarmVerse(chapterId: number, verseId: number) {
  fetch("/api/gita/verses/prewarm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chapterId, verseId }),
  }).catch(() => {});
}

export default function VersePage() {
  const { chapterId, verseId } = useParams();
  const cId = parseInt(chapterId || "1", 10);
  const vId = parseInt(verseId || "1", 10);
  const [loadStep, setLoadStep] = React.useState(0);

  React.useEffect(() => {
    const msgs = [0, 1, 2, 3];
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i < msgs.length) setLoadStep(i);
      else clearInterval(t);
    }, 1800);
    return () => clearInterval(t);
  }, [cId, vId]);

  const { data: verse, isLoading, error } = useGetVerse(cId, vId);

  React.useEffect(() => {
    if (!verse) return;
    if (verse.nextVerse) prewarmVerse(cId, verse.nextVerse);
    if (verse.prevVerse) prewarmVerse(cId, verse.prevVerse);
  }, [verse, cId]);

  const loadingMessages = [
    "Consulting the ancient texts…",
    "Drawing wisdom from the Gita…",
    "Preparing Sanskrit analysis…",
    "Almost ready…",
  ];

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4"
        style={{ background: "linear-gradient(160deg, #1A0A02, #2E1408, #3A1A08)" }}>
        <div className="text-6xl text-gold animate-[pulseGlow_2s_ease-in-out_infinite] mb-6">ॐ</div>
        <div className="w-48 h-1 bg-medium-brown rounded-full overflow-hidden mb-8">
          <div className="h-full bg-gradient-to-r from-saffron to-gold rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]"
            style={{ width: `${25 + loadStep * 22}%`, transition: "width 1.6s ease" }} />
        </div>
        <h2 className="text-2xl font-cinzel text-gold tracking-wide text-center">
          {loadingMessages[loadStep]}
        </h2>
        <p className="mt-3 text-parchment/60 font-serif italic text-sm text-center max-w-xs">
          Chapter {cId} · Verse {vId}
        </p>
        <p className="mt-6 text-parchment/40 text-xs text-center max-w-xs">
          First visit generates fresh AI commentary. Future visits load instantly.
        </p>
      </div>
    );
  }

  if (error || !verse) {
    return (
      <div className="min-h-[100dvh] bg-cream flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-cinzel text-dark-brown mb-6">Verse not found</h1>
        <Link href={`/chapter/${cId}`} className="text-saffron hover:text-deep-saffron flex items-center text-lg uppercase tracking-wider font-cinzel">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Chapter {cId}
        </Link>
      </div>
    );
  }

  const sktLines = verse.skt.split('\n');
  const iastLines = verse.iast.split('\n');

  const domain = "https://askgita.net";
  const verseUrl = `${domain}/chapter/${verse.chapterId}/verse/${verse.id}`;
  const verseJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": domain },
        { "@type": "ListItem", "position": 2, "name": `Chapter ${verse.chapterId}: ${verse.chapterName}`, "item": `${domain}/chapter/${verse.chapterId}` },
        { "@type": "ListItem", "position": 3, "name": `Verse ${verse.id}`, "item": verseUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `Bhagavad Gita ${verse.chapterId}.${verse.id} — Chapter ${verse.chapterId} Verse ${verse.id} in Sanskrit, Hindi & English`,
      "description": `Bhagavad Gita ${verse.chapterId}.${verse.id}: ${verse.english} — Read in Sanskrit, Hindi and English with word-by-word analysis.`,
      "url": verseUrl,
      "mainEntityOfPage": { "@type": "WebPage", "@id": verseUrl },
      "datePublished": "2025-05-01T00:00:00+05:30",
      "dateModified": "2025-05-03T00:00:00+05:30",
      "author": { "@type": "Person", "name": "Aapt Dubey", "url": domain },
      "publisher": {
        "@type": "Organization",
        "name": "AskGita.net",
        "url": domain,
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/favicon.svg`,
          "contentUrl": `${domain}/favicon.svg`,
          "width": 512,
          "height": 512,
          "name": "AskGita.net Logo",
          "alt": "AskGita.net — Bhagavad Gita",
        },
      },
      "image": {
        "@type": "ImageObject",
        "url": `${domain}/opengraph.jpg`,
        "contentUrl": `${domain}/opengraph.jpg`,
        "width": 1280,
        "height": 720,
        "name": `Bhagavad Gita ${verse.chapterId}.${verse.id} — Sanskrit Shloka | AskGita.net`,
        "description": verse.english,
        "caption": `Bhagavad Gita Chapter ${verse.chapterId} Verse ${verse.id} in Sanskrit, Hindi & English | AskGita.net`,
        "alt": `Bhagavad Gita ${verse.chapterId}.${verse.id} Sanskrit shloka — Chapter ${verse.chapterId} Verse ${verse.id} | AskGita.net`,
      },
      "articleBody": `Bhagavad Gita ${verse.chapterId}.${verse.id}: ${verse.english} Hindi: ${verse.hindi ?? ""} Sanskrit: ${verse.skt}. ${verse.themes?.length ? `Themes: ${verse.themes.join(", ")}.` : ""} This shloka from Chapter ${verse.chapterId} of the Bhagavad Gita is presented with word-by-word Sanskrit analysis, Hindi translation, English meaning, and AI-generated commentary in the style of Gita Press. Curated at AskGita.net.`,
      "inLanguage": ["en", "hi", "sa"],
      "keywords": `bhagavad gita ${verse.chapterId}.${verse.id}, gita shlok ${verse.chapterId} ${verse.id}, ${verse.themes?.join(", ").toLowerCase() ?? ""}`,
      "isPartOf": { "@type": "Book", "name": "Bhagavad Gita", "url": domain },
      "about": { "@type": "Book", "name": "Bhagavad Gita", "url": domain },
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-cream font-sans text-text-dark pb-16 lg:pb-0">
      <SEOHead
        title={`Bhagavad Gita ${verse.chapterId}.${verse.id} — Chapter ${verse.chapterId} Verse ${verse.id} in Sanskrit, Hindi & English`}
        description={`Bhagavad Gita Chapter ${verse.chapterId}, Verse ${verse.id} (${verse.chapterId}.${verse.id}): ${verse.english} — Read in Sanskrit, Hindi and English with Gita Press commentary.`}
        canonical={`/chapter/${verse.chapterId}/verse/${verse.id}`}
        ogImageAlt={`Bhagavad Gita ${verse.chapterId}.${verse.id} Sanskrit shloka — Chapter ${verse.chapterId} Verse ${verse.id} in Hindi & English | AskGita.net`}
        keywords={`bhagavad gita ${verse.chapterId}.${verse.id}, gita shlok ${verse.chapterId} ${verse.id}, bhagavad gita chapter ${verse.chapterId} verse ${verse.id}, ${verse.themes?.join(", ").toLowerCase()}`}
        jsonLd={verseJsonLd}
        type="article"
      />

      {/* Breadcrumb */}
      <nav className="sticky top-0 z-50 bg-parchment/95 backdrop-blur border-b border-gold px-4 py-3 shadow-sm" aria-label="Breadcrumb">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center text-sm md:text-base font-cinzel text-text-medium">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
              aria-label="AskGita.net — Bhagavad Gita — Go to Homepage"
            >
              <SiteLogo size="sm" variant="dark" />
            </Link>
            <span className="mx-2 text-gold">/</span>
            <Link href={`/chapter/${verse.chapterId}`} className="hover:text-saffron transition-colors">
              <span className="hidden sm:inline">Chapter {verse.chapterId}: </span>{verse.chapterName}
            </Link>
            <span className="mx-2 text-gold">/</span>
            <span className="font-bold text-dark-brown">Verse {verse.id}</span>
          </div>
          {verse.isAiGenerated && (
            <span className="flex items-center text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-full uppercase tracking-wider font-cinzel shadow-sm">
              <Sparkles className="w-3 h-3 mr-1.5" /> AI Generated
            </span>
          )}
        </div>
      </nav>

      {/* Page Title */}
      <section className="bg-white py-16 px-4 text-center border-b border-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-cinzel text-dark-brown mb-8 leading-tight">
            Bhagavad Gita Chapter {verse.chapterId}
            <span className="block text-2xl md:text-3xl mt-4 text-saffron">Verse {verse.id} ({verse.chapterId}.{verse.id})</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-3">
            {verse.themes.map((theme, i) => (
              <span key={i} className="bg-saffron/10 border border-saffron/30 text-saffron px-5 py-2 rounded-full text-sm font-cinzel tracking-wider uppercase shadow-sm">
                {theme}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sanskrit Shloka with per-line AI explain */}
      <section className="py-20 px-4 bg-gradient-to-b from-parchment to-cream">
        <div className="max-w-4xl mx-auto bg-[#1A0A02] rounded-3xl shadow-2xl overflow-hidden border border-[#4A2010] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron via-gold to-saffron" />
          <div className="p-8 md:p-16 text-center">
            <div className="mb-12 space-y-2">
              {sktLines.map((line, i) => (
                <div key={i} className="mb-8 last:mb-0">
                  <p className="font-devanagari text-3xl md:text-4xl text-gold leading-[2.2] tracking-wide drop-shadow-md">
                    {line}
                  </p>
                  <LineExplanationPanel
                    chapterId={verse.chapterId}
                    verseId={verse.id}
                    line={line}
                    context={verse.skt}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 my-12 opacity-50">
              <div className="h-px bg-gold flex-1 max-w-[100px]" />
              <span className="text-gold text-2xl">❀</span>
              <div className="h-px bg-gold flex-1 max-w-[100px]" />
            </div>
            <div className="space-y-4">
              {iastLines.map((line, i) => (
                <p key={i} className="font-serif italic text-xl md:text-2xl text-cream/80 tracking-wider">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Translations */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl shadow-md border-l-[6px] border-gold relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute -right-4 -top-4 text-8xl opacity-[0.03] font-cinzel group-hover:scale-110 transition-transform duration-500 pointer-events-none">अ</div>
            <div className="flex items-center mb-8 pb-4 border-b border-gold/10">
              <span className="text-3xl mr-4 drop-shadow-sm">🇮🇳</span>
              <h2 className="text-3xl font-cinzel text-dark-brown uppercase tracking-wider">हिंदी अर्थ</h2>
            </div>
            <p className="font-devanagari text-2xl text-text-dark leading-[1.9]">{verse.hindi}</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-md border-l-[6px] border-gold relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute -right-4 -top-4 text-8xl opacity-[0.03] font-cinzel group-hover:scale-110 transition-transform duration-500 pointer-events-none">A</div>
            <div className="flex items-center mb-8 pb-4 border-b border-gold/10">
              <BookOpen className="text-gold w-8 h-8 mr-4" />
              <h2 className="text-3xl font-cinzel text-dark-brown uppercase tracking-wider">English Meaning</h2>
            </div>
            <p className="font-serif text-2xl text-text-dark leading-[1.8]">{verse.english}</p>
          </div>
        </div>
      </section>

      {/* Word-by-Word */}
      <section className="py-20 px-4 bg-parchment border-y border-gold/20 shadow-inner">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-cinzel text-dark-brown mb-4 uppercase tracking-widest">शब्द-विश्लेषण</h2>
            <p className="font-serif text-xl text-text-medium italic">Word-by-Word Analysis</p>
          </div>
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gold/30 bg-white shadow-lg">
            <table className="w-full text-left font-serif">
              <thead>
                <tr className="bg-dark-brown text-gold-light font-cinzel text-base uppercase tracking-widest">
                  <th className="p-6 font-normal w-1/4">Sanskrit Word</th>
                  <th className="p-6 font-normal w-1/4">IAST</th>
                  <th className="p-6 font-normal w-1/4">हिंदी अर्थ</th>
                  <th className="p-6 font-normal w-1/4">English Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10 text-lg">
                {verse.wordByWord.map((w, i) => (
                  <tr key={i} className="even:bg-cream/30 hover:bg-parchment/60 transition-colors duration-200">
                    <td className="p-6 font-devanagari text-xl text-deep-saffron font-semibold">{w.word}</td>
                    <td className="p-6 text-text-muted italic">{w.iast}</td>
                    <td className="p-6 font-devanagari text-text-dark">{w.hindi}</td>
                    <td className="p-6 text-text-dark">{w.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-6">
            {verse.wordByWord.map((w, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gold/20 shadow-md flex flex-col gap-4">
                <div className="flex justify-between items-end border-b border-gold/10 pb-3">
                  <span className="font-devanagari text-2xl text-deep-saffron font-bold">{w.word}</span>
                  <span className="text-base text-text-muted italic font-serif">{w.iast}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-serif">
                  <div className="bg-cream/50 p-3 rounded border border-gold/10">
                    <span className="block text-xs text-saffron uppercase tracking-wider font-cinzel mb-2">Hindi</span>
                    <span className="font-devanagari text-lg">{w.hindi}</span>
                  </div>
                  <div className="bg-cream/50 p-3 rounded border border-gold/10">
                    <span className="block text-xs text-saffron uppercase tracking-wider font-cinzel mb-2">English</span>
                    <span className="text-lg">{w.english}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel text-gold mb-6">विस्तृत व्याख्या</h2>
          <div className="h-1 w-24 bg-saffron mx-auto rounded-full" />
          <p className="mt-6 font-cinzel text-xl text-text-medium uppercase tracking-widest">Detailed Explanation</p>
        </div>
        <div className="prose prose-stone max-w-none font-serif text-xl md:text-2xl leading-[2.2] text-text-dark">
          {renderFormattedText(verse.explanation)}
        </div>
      </section>

      {/* Gita Press & Modern Relevance */}
      <section className="py-20 px-4 bg-cream border-t border-gold/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl shadow-xl border border-gold/10 border-t-8 border-t-saffron p-10 flex flex-col h-full">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-saffron/10 rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                <BookOpen className="text-saffron w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-cinzel text-dark-brown font-bold">Gita Press</h2>
                <p className="font-devanagari text-saffron">गीता प्रेस</p>
              </div>
            </div>
            <div className="prose prose-stone font-serif text-lg text-text-medium leading-loose flex-1">
              {renderFormattedText(verse.gitaPressNote)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-parchment to-[#FFFDF8] rounded-3xl shadow-xl border border-gold/20 border-t-8 border-t-gold p-10 flex flex-col h-full">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mr-5 flex-shrink-0 shadow-inner">
                <Sparkles className="text-gold w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-cinzel text-dark-brown font-bold">Modern Relevance</h2>
                <p className="font-devanagari text-gold">आज के लिए प्रासंगिकता</p>
              </div>
            </div>
            <div className="prose prose-stone font-serif text-lg text-text-medium leading-loose flex-1">
              {renderFormattedText(verse.modernRelevance)}
            </div>
          </div>
        </div>
      </section>

      {/* Topic Collections this verse appears in — internal linking */}
      {(() => {
        const relatedTopics = TOPICS.filter((t) =>
          t.verses.some((v) => v.chapterId === verse.chapterId && v.verseId === verse.id)
        );
        if (relatedTopics.length === 0) return null;
        return (
          <section className="py-10 px-4 bg-parchment border-y border-gold/20">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px flex-1 bg-gold/20" />
                <p className="text-xs font-cinzel uppercase tracking-widest text-text-muted whitespace-nowrap">
                  This verse appears in {relatedTopics.length} topic collection{relatedTopics.length > 1 ? "s" : ""}
                </p>
                <div className="h-px flex-1 bg-gold/20" />
              </div>
              <div className="flex flex-wrap gap-3">
                {relatedTopics.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/topics/${t.slug}`}
                    className="inline-flex items-center gap-2 bg-white border border-gold/25 hover:border-saffron hover:shadow-md rounded-full px-4 py-2 transition-all group"
                  >
                    <span className="text-base">{t.icon}</span>
                    <span className="font-cinzel text-xs text-dark-brown group-hover:text-saffron transition-colors leading-snug">
                      {t.title
                        .replace(/^Bhagavad Gita Verses (on|for|about)\s*/i, "")
                        .replace(/^Gita Verses (on|for|about)\s*/i, "")
                        .split("—")[0]
                        .trim()}
                    </span>
                    <span className="text-gold text-xs font-cinzel">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Prev / Next */}
      <div className="bg-dark-brown sticky bottom-0 z-40 border-t border-medium-brown shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between font-cinzel text-sm md:text-base uppercase tracking-wider">
          <div className="flex-1">
            {verse.prevVerse ? (
              <Link href={`/chapter/${verse.chapterId}/verse/${verse.prevVerse}`} className="text-gold hover:text-white flex items-center transition-colors w-max">
                <ArrowLeft className="w-5 h-5 mr-3" />
                <span className="hidden sm:inline">Verse {verse.prevVerse}</span>
              </Link>
            ) : <div />}
          </div>
          <div className="flex-1 flex justify-center">
            <Link href={`/chapter/${verse.chapterId}`} className="text-parchment hover:text-gold transition-colors inline-flex flex-col items-center group">
              <span className="text-xs text-text-muted group-hover:text-gold mb-1 transition-colors">Chapter {verse.chapterId}</span>
              <span className="border-b border-transparent group-hover:border-gold pb-0.5 transition-all">All Verses</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-end">
            {verse.nextVerse ? (
              <Link href={`/chapter/${verse.chapterId}/verse/${verse.nextVerse}`} className="text-gold hover:text-white flex items-center transition-colors w-max">
                <span className="hidden sm:inline">Verse {verse.nextVerse}</span>
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
