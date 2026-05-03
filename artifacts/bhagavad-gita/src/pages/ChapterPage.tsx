import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { useGetChapter } from "@workspace/api-client-react";
import { ArrowLeft, ArrowRight, Search, BookOpen } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const id = parseInt(chapterId || "1", 10);
  const { data: chapter, isLoading, error } = useGetChapter(id);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-gold/30 rounded-full animate-[slowRotate_10s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-saffron">🪷</div>
        </div>
        <p className="mt-8 text-xl font-cinzel text-text-medium animate-pulse">Loading Chapter...</p>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-cinzel text-dark-brown mb-4">Chapter not found</h1>
        <Link href="/" className="text-saffron hover:text-deep-saffron flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const filteredVerses = chapter.verses.filter((v) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.english.toLowerCase().includes(q) ||
      v.theme.toLowerCase().includes(q) ||
      `${v.chapterId}.${v.id}`.includes(q)
    );
  });

  const domain = "https://askgita.net";
  const chapterUrl = `${domain}/chapter/${chapter.id}`;
  const chapterJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Bhagavad Gita Chapters", "item": domain },
        { "@type": "ListItem", "position": 3, "name": `Chapter ${chapter.id}: ${chapter.name}`, "item": chapterUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `Bhagavad Gita Chapter ${chapter.id}: ${chapter.name} — ${chapter.meaning}`,
      "description": `${chapter.summary} Read all ${chapter.totalVerses} shlokas of Chapter ${chapter.id} (${chapter.skt}) in Sanskrit, Hindi and English.`,
      "url": chapterUrl,
      "mainEntityOfPage": { "@type": "WebPage", "@id": chapterUrl },
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
        "name": `Bhagavad Gita Chapter ${chapter.id}: ${chapter.name} — ${chapter.meaning} | AskGita.net`,
        "description": chapter.summary,
        "caption": `Bhagavad Gita Chapter ${chapter.id} — ${chapter.totalVerses} Shlokas in Sanskrit, Hindi & English | AskGita.net`,
        "alt": `Bhagavad Gita Chapter ${chapter.id} ${chapter.name} (${chapter.skt}) — ${chapter.totalVerses} shlokas | AskGita.net`,
      },
      "articleBody": `Bhagavad Gita Chapter ${chapter.id}: ${chapter.name} (${chapter.skt}) — ${chapter.meaning}. ${chapter.summary} ${chapter.longSummary ?? ""} This chapter contains ${chapter.totalVerses} shlokas presented in Sanskrit, Hindi and English with word-by-word analysis and AI commentary. Curated at AskGita.net by Aapt Dubey.`,
      "inLanguage": ["en", "hi", "sa"],
      "keywords": `bhagavad gita chapter ${chapter.id}, ${chapter.name.toLowerCase()}, ${chapter.skt}, gita adhyay ${chapter.id}, bhagavad gita in hindi chapter ${chapter.id}`,
      "isPartOf": { "@type": "Book", "name": "Bhagavad Gita", "url": domain },
      "about": { "@type": "Book", "name": "Bhagavad Gita", "url": domain },
      "hasPart": chapter.verses.slice(0, 10).map((v) => ({
        "@type": "Article",
        "headline": `Bhagavad Gita ${chapter.id}.${v.id}`,
        "url": `${domain}/chapter/${chapter.id}/verse/${v.id}`,
        "description": v.english,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-cream font-sans text-text-dark pb-16 lg:pb-0">
      <SEOHead
        title={`Bhagavad Gita Chapter ${chapter.id}: ${chapter.name} — ${chapter.meaning} | ${chapter.totalVerses} Shlokas`}
        description={`Read Bhagavad Gita Chapter ${chapter.id} (${chapter.skt}) — ${chapter.name}. ${chapter.summary} All ${chapter.totalVerses} verses in Sanskrit, Hindi and English.`}
        canonical={`/chapter/${chapter.id}`}
        ogImageAlt={`Bhagavad Gita Chapter ${chapter.id} ${chapter.name} (${chapter.skt}) — ${chapter.totalVerses} shlokas in Sanskrit, Hindi & English | AskGita.net`}
        keywords={`bhagavad gita chapter ${chapter.id}, ${chapter.name.toLowerCase()}, ${chapter.skt}, gita adhyay ${chapter.id}, bhagavad gita in hindi chapter ${chapter.id}`}
        jsonLd={chapterJsonLd}
        type="article"
      />

      {/* Breadcrumb */}
      <nav className="sticky top-0 z-50 bg-parchment/95 backdrop-blur border-b border-gold px-4 py-3" aria-label="Breadcrumb">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center text-sm font-cinzel text-text-medium gap-y-2">
          <Link href="/" className="hover:text-saffron flex items-center mr-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Home
          </Link>
          <span className="mx-2 text-gold">/</span>
          <span className="font-bold text-dark-brown mr-2">Chapter {chapter.id}: {chapter.name}</span>
          <span className="mx-2 text-gold hidden sm:inline">/</span>
          <span className="hidden sm:inline">Verses</span>
        </div>
      </nav>

      {/* Chapter Hero */}
      <section className="relative min-h-[320px] bg-gradient-to-b from-[#1A0A02] to-[#2E1408] text-cream flex flex-col justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <div className="text-8xl md:text-9xl font-cinzel text-gold opacity-80 leading-none">
              {chapter.id.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="md:col-span-6 text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-cinzel text-white mb-3">{chapter.name}</h1>
            <h2 className="text-2xl md:text-3xl font-devanagari text-saffron tracking-wider mb-3">{chapter.skt}</h2>
            <p className="text-gold italic font-serif text-xl mb-6">{chapter.meaning}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-medium-brown/50 border border-gold/30 text-gold-light px-4 py-1.5 rounded-full text-sm font-cinzel tracking-wider uppercase">
                {chapter.totalVerses} Shlokas
              </span>
              {chapter.themes.map((theme, i) => (
                <span key={i} className="bg-saffron/20 border border-saffron/40 text-cream px-4 py-1.5 rounded-full text-sm uppercase tracking-wider font-cinzel">
                  {theme}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 text-center md:text-right border-t md:border-t-0 md:border-l border-gold/20 pt-6 md:pt-0 pl-0 md:pl-6">
            <BookOpen className="w-8 h-8 text-gold mb-3 mx-auto md:mx-0 md:ml-auto opacity-50" />
            <p className="font-serif italic text-base text-parchment opacity-90 mb-4">{chapter.setting}</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="font-serif text-xl text-parchment leading-relaxed border-t border-gold/20 pt-8">
            {chapter.summary}
          </p>
        </div>
      </section>

      {/* Chapter Summary */}
      <section className="bg-parchment px-4 py-16 border-y border-gold/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-cinzel text-gold mb-8 text-center uppercase tracking-wider">About This Chapter</h2>
          <div className="prose prose-stone max-w-none text-text-medium font-serif leading-loose text-lg md:text-xl whitespace-pre-wrap">
            {chapter.longSummary}
          </div>
          {chapter.keyVerseRef && (
            <div className="mt-12 bg-cream border-l-4 border-gold p-6 rounded-r shadow-sm">
              <h3 className="font-cinzel text-saffron text-sm uppercase tracking-wider mb-2">Key Verse Focus</h3>
              <p className="font-serif text-xl text-dark-brown font-semibold">{chapter.keyVerseRef}</p>
            </div>
          )}
        </div>
      </section>

      {/* All Verses */}
      <section className="px-4 py-20 max-w-6xl mx-auto bg-cream">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-cinzel text-dark-brown">All {chapter.totalVerses} Shlokas</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search by keyword or verse number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gold/30 rounded-full focus:outline-none focus:ring-2 focus:ring-saffron font-serif text-text-dark text-lg shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVerses.map((verse) => (
            <div key={verse.id} className="bg-white border border-gold/20 rounded-xl p-8 hover:shadow-lg hover:border-gold hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-parchment/50 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="bg-gold text-dark-brown font-cinzel text-sm font-bold px-4 py-1.5 rounded shadow-sm">
                  BG {chapter.id}.{verse.id}
                </span>
                <span className="bg-saffron/10 text-saffron border border-saffron/20 text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-cinzel">
                  {verse.theme}
                </span>
              </div>
              <div className="flex-1 mb-8 relative z-10">
                <p className="font-devanagari text-2xl text-deep-saffron mb-4 leading-relaxed line-clamp-2">
                  {verse.skt.split('\n')[0]}
                </p>
                <p className="font-serif text-text-medium text-lg line-clamp-2 leading-relaxed">
                  {verse.english}
                </p>
              </div>
              <Link href={`/chapter/${chapter.id}/verse/${verse.id}`}
                className="inline-flex items-center text-saffron font-cinzel text-sm uppercase tracking-wider group-hover:text-deep-saffron w-max relative z-10">
                Read Full Shloka <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {filteredVerses.length === 0 && (
          <div className="text-center py-20 bg-parchment rounded-xl border border-gold/20 mt-8">
            <BookOpen className="w-12 h-12 text-gold/50 mx-auto mb-4" />
            <p className="text-text-medium font-serif italic text-xl">No verses found matching "{searchQuery}"</p>
            <button onClick={() => setSearchQuery("")}
              className="mt-4 text-saffron font-cinzel uppercase tracking-wider text-sm hover:underline">
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Navigation footer */}
      <div className="bg-dark-brown py-6 px-4 sticky bottom-0 z-40 border-t border-medium-brown">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-gold font-cinzel uppercase tracking-wider text-sm md:text-base">
          {chapter.id > 1 ? (
            <Link href={`/chapter/${chapter.id - 1}`} className="hover:text-white flex items-center transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> <span className="hidden sm:inline">Prev Chapter</span>
            </Link>
          ) : <div className="w-32" />}
          <Link href="/" className="text-parchment hover:text-gold text-xs px-4 py-2 border border-medium-brown hover:border-gold rounded transition-colors">
            All Chapters
          </Link>
          {chapter.id < 18 ? (
            <Link href={`/chapter/${chapter.id + 1}`} className="hover:text-white flex items-center transition-colors justify-end">
              <span className="hidden sm:inline">Next Chapter</span> <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          ) : <div className="w-32" />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
