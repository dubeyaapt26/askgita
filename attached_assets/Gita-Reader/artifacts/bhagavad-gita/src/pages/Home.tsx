import React, { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { CHAPTERS } from "@/data/chapters";
import { STATIC_VERSES } from "@/data/verses";

const FEATURED_VERSES = [
  { ch: 2, v: 47, s: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥", e: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, and never be attached to not doing your duty.", theme: "Karma Yoga" },
  { ch: 2, v: 20, s: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।", e: "The soul is never born nor dies. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.", theme: "Atman" },
  { ch: 18, v: 66, s: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥", e: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.", theme: "Surrender" },
  { ch: 6, v: 5, s: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥", e: "One must elevate oneself by one's own mind, not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.", theme: "Self-Mastery" },
  { ch: 4, v: 7, s: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥", e: "Whenever there is a decline in righteousness and a rise of unrighteousness — at that time I manifest Myself.", theme: "Avatar" },
  { ch: 9, v: 22, s: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥", e: "For those who worship Me with exclusive devotion — to those ever-devoted ones, I carry what they lack and preserve what they have.", theme: "Devotion" },
];

const CORE_PHILOSOPHIES = [
  { icon: "⚔️", name: "Dharma", desc: "Your righteous duty and eternal purpose" },
  { icon: "🪷", name: "Karma Yoga", desc: "The path of selfless action without attachment" },
  { icon: "🧘", name: "Jnana Yoga", desc: "The path of supreme spiritual knowledge" },
  { icon: "💛", name: "Bhakti Yoga", desc: "The path of loving devotion to the divine" },
  { icon: "🌀", name: "Atman & Brahman", desc: "The immortal soul and the supreme absolute" },
  { icon: "☯️", name: "Nishkama Karma", desc: "Action performed without selfish motives" },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Chapters", href: "#chapters" },
  { name: "Teachings", href: "#teachings" },
  { name: "Topics", href: "/topics" },
];

const homeSeo = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Bhagavad Gita — All 18 Chapters & 700 Shlokas",
  "url": "https://askgita.net",
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://askgita.net" }] },
};

type SearchResult = {
  type: "verse" | "chapter";
  label: string;
  sublabel: string;
  href: string;
};

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];
  for (const ch of CHAPTERS) {
    results.push({
      type: "chapter",
      label: `Chapter ${ch.id} — ${ch.name}`,
      sublabel: `${ch.skt} · ${ch.totalVerses} verses · ${ch.meaning}`,
      href: `/chapter/${ch.id}`,
    });
  }
  for (const v of STATIC_VERSES) {
    results.push({
      type: "verse",
      label: `BG ${v.chapterId}.${v.id}`,
      sublabel: v.english.slice(0, 80) + "…",
      href: `/chapter/${v.chapterId}/verse/${v.id}`,
    });
  }
  return results;
}

const SEARCH_INDEX = buildSearchIndex();

const TOPIC_KEYWORDS: Array<{ keys: string[]; slug: string }> = [
  { keys: ["suffer", "suffering", "pain", "दुख", "grief", "loss"], slug: "gita-verses-on-grief-and-loss" },
  { keys: ["purpose", "उद्देश्य", "meaning", "duty", "dharma", "career"], slug: "gita-verses-on-duty-and-dharma" },
  { keys: ["happiness", "happy", "joy", "peace", "खुशी", "आनंद"], slug: "gita-verses-on-peace-of-mind" },
  { keys: ["death", "afterlife", "मृत्यु", "soul", "atman", "rebirth"], slug: "gita-verses-on-wisdom-and-knowledge" },
  { keys: ["fear", "anxiety", "stress", "डर", "overcome", "courage"], slug: "gita-verses-on-overcoming-anxiety" },
  { keys: ["karma", "कर्म", "action", "work", "duty"], slug: "gita-verses-on-karma-yoga" },
  { keys: ["anger", "क्रोध", "ego", "अहंकार", "frustration"], slug: "gita-verses-on-anger-management" },
  { keys: ["love", "compassion", "प्रेम", "devotion", "bhakti"], slug: "gita-verses-on-love-and-compassion" },
  { keys: ["confidence", "strength", "strong", "inner", "power"], slug: "gita-verses-on-inner-strength" },
  { keys: ["focus", "concentration", "study", "student", "exam"], slug: "gita-verses-for-students" },
];

function resolveQuery(q: string): string {
  const lower = q.toLowerCase();
  const verseRef = lower.match(/^(\d+)[.\s:,](\d+)$/);
  if (verseRef) return `/chapter/${verseRef[1]}/verse/${verseRef[2]}`;

  const chapterRef = lower.match(/^chapter\s*(\d+)$/);
  if (chapterRef) return `/chapter/${chapterRef[1]}`;

  for (const { keys, slug } of TOPIC_KEYWORDS) {
    if (keys.some((k) => lower.includes(k))) return `/topics/${slug}`;
  }

  const verseMatch = SEARCH_INDEX.find(
    (r) => r.label.toLowerCase().includes(lower) || r.sublabel.toLowerCase().includes(lower)
  );
  if (verseMatch) return verseMatch.href;

  return "/topics";
}

const SUGGESTION_CHIPS = [
  { label: "Why do I suffer?", href: "/topics/gita-verses-on-grief-and-loss" },
  { label: "मेरा उद्देश्य क्या है?", href: "/topics/gita-verses-on-duty-and-dharma" },
  { label: "What is true happiness?", href: "/topics/gita-verses-on-peace-of-mind" },
  { label: "मृत्यु के बाद क्या होता है?", href: "/topics/gita-verses-on-wisdom-and-knowledge" },
  { label: "How to overcome fear?", href: "/topics/gita-verses-on-overcoming-anxiety" },
  { label: "कर्म क्या है?", href: "/topics/gita-verses-on-karma-yoga" },
];

function GuidanceSearchBar() {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleAsk() {
    const q = query.trim();
    if (!q) return;
    setLocation(resolveQuery(q));
    setQuery("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleAsk();
  }

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto">
      {/* Big input row */}
      <div className="flex items-center rounded-full overflow-hidden shadow-2xl border border-gold/20" style={{ background: "rgba(10,4,0,0.7)" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="What troubles your heart today? / आपके मन में क्या है? / किं पृच्छसि"
          className="flex-1 bg-transparent text-parchment/90 placeholder-parchment/30 font-serif text-sm md:text-base px-6 py-4 outline-none min-w-0"
          aria-label="Seek guidance from the Bhagavad Gita"
          autoComplete="off"
        />
        <button
          onClick={handleAsk}
          className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-saffron to-[#c47a1a] hover:brightness-110 text-dark-brown font-cinzel font-bold text-sm uppercase tracking-wider px-6 py-4 transition-all"
        >
          <span>🪷</span> Ask the Gita
        </button>
      </div>

      {/* Support note */}
      <p className="text-parchment/35 text-xs font-serif italic text-center mt-3">
        Supports English · हिंदी · संस्कृत — answers in your language
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => setLocation(chip.href)}
            className="bg-transparent border border-parchment/25 text-parchment/70 hover:border-gold/60 hover:text-parchment font-serif text-xs md:text-sm px-4 py-2 rounded-full transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold selection:text-dark-brown pb-16 lg:pb-0">
      <SEOHead
        title="Bhagavad Gita — All 18 Chapters & 700 Shlokas in Sanskrit, Hindi & English"
        description="Read the complete Srimad Bhagavad Gita — all 18 chapters and 700+ shlokas in Sanskrit, Hindi, and English. Word-by-word analysis, Gita Press style explanations. AskGita.net by Aapt Dubey."
        canonical="/"
        keywords="bhagavad gita, bhagavad gita in hindi, bhagavad gita shlok, gita press, bhagwad geeta, srimad bhagavad gita, gita adhyay, geeta shloka, gita updesh, bhagavad gita english"
        jsonLd={homeSeo}
      />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-dark-brown/90 backdrop-blur-md border-b border-medium-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-cinzel text-xl text-gold font-semibold tracking-wide">Bhagavad Gita</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.name} href={link.href} className="text-parchment hover:text-gold font-cinzel text-sm uppercase tracking-wider transition-colors duration-200">
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href={link.href} className="text-parchment hover:text-gold font-cinzel text-sm uppercase tracking-wider transition-colors duration-200">
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-0 px-4 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1A0A02, #2E1408, #4A2010, #3A1A08)" }}
      >
        {/* Concentric circle background decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[90vw] max-w-[900px] aspect-square rounded-full border border-gold/10" />
          <div className="absolute w-[70vw] max-w-[700px] aspect-square rounded-full border border-gold/10" />
          <div className="absolute w-[50vw] max-w-[500px] aspect-square rounded-full border border-gold/10" />
          <div className="absolute w-[30vw] max-w-[300px] aspect-square rounded-full border border-gold/10" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full">
          {/* OM */}
          <div className="text-6xl md:text-8xl text-gold font-devanagari animate-[pulseGlow_4s_ease-in-out_infinite] leading-none mb-2">
            ॐ
          </div>

          {/* Sanskrit title */}
          <div className="text-base md:text-lg text-saffron font-devanagari tracking-widest mb-2">
            श्रीमद्भगवद्गीता
          </div>

          {/* Main title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel text-white drop-shadow-lg tracking-tight mb-2">
            Srimad Bhagavad Gita
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gold italic font-serif opacity-90 mb-4">
            The Song of God · 5000 Years of Timeless Wisdom
          </p>

          {/* Ornament divider */}
          <div className="flex items-center space-x-4 opacity-60 w-full max-w-xs mb-8">
            <div className="h-[1px] bg-gold flex-1" />
            <span className="text-gold text-lg">❀</span>
            <div className="h-[1px] bg-gold flex-1" />
          </div>

          {/* Seek Guidance heading */}
          <div className="mb-1 flex items-center gap-3 justify-center">
            <span className="text-gold opacity-60 text-xs">✦</span>
            <span className="font-cinzel text-gold text-xs md:text-sm uppercase tracking-[0.22em]">
              Seek Guidance from the Gita
            </span>
            <span className="text-gold opacity-60 text-xs">✦</span>
          </div>
          <p className="font-devanagari text-parchment/70 text-sm md:text-base mb-6">
            गीता से जीवन का उत्तर पाएं — Ask in English, हिंदी, or संस्कृत
          </p>

          {/* Guidance search bar + chips */}
          <GuidanceSearchBar />
        </div>

        {/* Stats row pinned to bottom of hero */}
        <div className="relative z-10 w-full mt-16 border-t border-gold/10 py-8">
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4">
            {[
              { num: "18", label: "Chapters" },
              { num: "700", label: "Shlokas" },
              { num: "3", label: "Languages" },
              { num: "5000+", label: "Years Old" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-cinzel text-saffron text-3xl md:text-4xl font-bold">{num}</div>
                <div className="font-cinzel text-parchment/50 text-xs uppercase tracking-[0.2em] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section id="chapters" className="py-24 bg-cream px-4 border-t border-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel text-dark-brown">All 18 Chapters</h2>
            <div className="w-24 h-1 bg-saffron mx-auto mt-6 rounded-full" />
            <p className="mt-6 text-text-medium font-serif text-xl max-w-2xl mx-auto">
              Embark on the journey through the 18 chapters of supreme spiritual wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHAPTERS.map((ch) => (
              <div
                key={ch.id}
                onClick={() => setLocation(`/chapter/${ch.id}`)}
                className="cursor-pointer rounded-xl p-6 border bg-white border-gold/20 hover:border-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-medium-brown group-hover:bg-saffron text-gold-light group-hover:text-white transition-colors font-cinzel w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner">
                    {ch.id}
                  </div>
                  <span className="text-xs font-cinzel text-text-muted uppercase tracking-wider bg-cream px-2 py-1 rounded border border-gold/10">
                    {ch.totalVerses} Shlokas
                  </span>
                </div>
                <h3 className="font-cinzel text-dark-brown text-xl font-semibold mb-1 group-hover:text-saffron transition-colors">{ch.name}</h3>
                <p className="font-devanagari text-saffron text-base mb-2">{ch.skt}</p>
                <p className="text-text-medium font-serif text-sm italic mb-4">{ch.meaning}</p>
                <p className="text-text-muted font-serif text-sm line-clamp-2 leading-relaxed">{ch.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ch.themes.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs bg-parchment text-text-medium px-2 py-0.5 rounded border border-gold/10 font-cinzel">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Teachings */}
      <section id="teachings" className="py-24 bg-gradient-to-b from-[#1A0A02] to-[#2E1408] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel text-gold">Core Teachings</h2>
            <div className="w-24 h-1 bg-saffron mx-auto mt-6 rounded-full" />
            <p className="mt-6 text-parchment/70 font-serif text-xl max-w-2xl mx-auto">
              The six pillars of Gita philosophy that have guided seekers for millennia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_PHILOSOPHIES.map((p) => (
              <div key={p.name} className="bg-medium-brown/40 border border-gold/20 rounded-xl p-8 hover:border-gold/50 hover:bg-medium-brown/60 transition-all duration-300 text-center">
                <div className="text-5xl mb-4">{p.icon}</div>
                <h3 className="font-cinzel text-gold text-xl mb-3 tracking-wide">{p.name}</h3>
                <p className="text-parchment/70 font-serif text-base leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics CTA */}
      <section className="py-20 px-4 bg-parchment border-y border-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-cinzel text-dark-brown mb-6">Find Wisdom for Every Life Situation</h2>
          <p className="text-text-medium font-serif text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Explore curated collections of shlokas on anxiety, grief, purpose, relationships, leadership, and more — each one timeless wisdom for modern life.
          </p>
          <Link href="/topics" className="inline-block bg-dark-brown text-gold font-cinzel uppercase tracking-widest text-base px-10 py-4 rounded-full hover:bg-medium-brown transition-colors shadow-lg border border-gold/30">
            Browse All Topics →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
