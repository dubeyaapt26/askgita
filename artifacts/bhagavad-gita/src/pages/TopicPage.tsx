import { useParams, Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { TOPICS, TOPIC_BY_SLUG, type Topic } from "@/data/topics";
import { getStaticVerse, type StaticVerse } from "@/data/verses";
import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";

const DOMAIN = "https://askgita.net";

function VerseCard({ verse, verseNum }: { verse: StaticVerse; verseNum: number }) {
  const sktLines = verse.skt.split("\n");

  return (
    <article className="group relative bg-white rounded-2xl border border-gold/20 shadow-sm hover:shadow-xl hover:border-gold/50 transition-all duration-300 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-gold to-saffron" />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-saffron/20 to-gold/10 border border-gold/30 text-dark-brown font-cinzel font-bold text-sm flex-shrink-0">
              {verseNum}
            </span>
            <div>
              <p className="font-cinzel text-2xl font-bold text-saffron leading-none">
                {verse.chapterId}.{verse.id}
              </p>
              <p className="text-text-muted text-xs font-serif mt-0.5">
                Chapter {verse.chapterId} · {verse.chapterName}
              </p>
            </div>
          </div>
          <Link
            href={`/chapter/${verse.chapterId}/verse/${verse.id}`}
            className="flex items-center gap-1.5 text-xs font-cinzel uppercase tracking-widest text-saffron hover:text-dark-brown bg-saffron/10 hover:bg-gold/20 border border-saffron/20 hover:border-gold/40 rounded-full px-4 py-2 transition-all flex-shrink-0"
          >
            Full Verse <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Sanskrit */}
        <div className="bg-gradient-to-br from-[#1A0A02] to-[#2E1408] rounded-xl p-5 mb-5">
          <div className="space-y-1 text-center">
            {sktLines.slice(0, 4).map(
              (line, i) =>
                line.trim() && (
                  <p key={i} className="font-devanagari text-gold text-lg md:text-xl leading-relaxed">
                    {line}
                  </p>
                )
            )}
          </div>
          {verse.iast && (
            <p className="text-parchment/40 text-xs text-center mt-3 font-serif italic">
              {verse.iast.split("\n").slice(0, 2).join(" ")}
            </p>
          )}
        </div>

        {/* English */}
        <blockquote className="relative pl-5 border-l-4 border-saffron/40 mb-5">
          <p className="text-text-dark font-serif text-base md:text-lg leading-relaxed italic">
            "{verse.english}"
          </p>
        </blockquote>

        {/* Hindi */}
        {verse.hindi && (
          <p className="font-devanagari text-text-medium text-sm leading-relaxed mb-5 bg-cream rounded-lg p-4 border border-gold/10">
            {verse.hindi}
          </p>
        )}

        {/* Themes */}
        {verse.themes && verse.themes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {verse.themes.map((theme) => (
              <span
                key={theme}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-cinzel uppercase tracking-wider bg-gold/10 text-dark-brown border border-gold/20"
              >
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gold/10 px-6 md:px-8 py-4 bg-parchment/50 flex items-center justify-between">
        <span className="text-text-muted text-xs font-serif italic">
          Bhagavad Gita {verse.chapterId}.{verse.id}
        </span>
        <Link
          href={`/chapter/${verse.chapterId}/verse/${verse.id}`}
          className="flex items-center gap-1.5 text-saffron hover:text-dark-brown text-sm font-cinzel transition-colors group-hover:gap-2.5"
        >
          Study this verse <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

function VerseStub({ chapterId, verseId, verseNum }: { chapterId: number; verseId: number; verseNum: number }) {
  return (
    <article className="group bg-white rounded-2xl border border-gold/20 shadow-sm hover:border-gold/50 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-saffron/30 via-gold/30 to-saffron/30" />
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 border border-gold/20 text-dark-brown font-cinzel font-bold text-sm">
            {verseNum}
          </span>
          <div>
            <p className="font-cinzel text-xl font-bold text-saffron">{chapterId}.{verseId}</p>
            <p className="text-text-muted text-xs font-serif mt-0.5">Chapter {chapterId} · Verse {verseId}</p>
          </div>
        </div>
        <Link
          href={`/chapter/${chapterId}/verse/${verseId}`}
          className="flex items-center gap-1.5 text-xs font-cinzel uppercase tracking-widest text-saffron hover:text-dark-brown bg-saffron/10 hover:bg-gold/20 border border-saffron/20 hover:border-gold/40 rounded-full px-4 py-2 transition-all"
        >
          Read Verse <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}

function RelatedTopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group flex items-start gap-3 bg-white border border-gold/15 rounded-xl p-4 hover:border-gold/50 hover:shadow-md transition-all"
    >
      <span className="text-2xl flex-shrink-0">{topic.icon}</span>
      <div>
        <p className="font-cinzel text-dark-brown text-sm font-semibold leading-snug group-hover:text-saffron transition-colors line-clamp-2">
          {topic.title}
        </p>
        <p className="text-text-muted text-xs font-cinzel mt-2 uppercase tracking-wider">
          {topic.verses.length} verses →
        </p>
      </div>
    </Link>
  );
}

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = TOPIC_BY_SLUG.get(slug || "");

  if (!topic) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-3xl font-cinzel text-dark-brown mb-4">Topic not found</h1>
        <p className="text-text-medium font-serif mb-6">The topic you're looking for doesn't exist.</p>
        <Link href="/topics" className="text-saffron hover:text-dark-brown font-cinzel flex items-center gap-2">
          ← Browse All Topics
        </Link>
      </div>
    );
  }

  const relatedTopics = topic.relatedSlugs
    .map((s) => TOPICS.find((t) => t.slug === s)!)
    .filter(Boolean);

  const verseJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
        { "@type": "ListItem", position: 2, name: "Gita Topics", item: `${DOMAIN}/topics` },
        { "@type": "ListItem", position: 3, name: topic.title, item: `${DOMAIN}/topics/${topic.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: topic.title,
      description: topic.description,
      url: `${DOMAIN}/topics/${topic.slug}`,
      author: { "@type": "Person", name: "Aapt Dubey" },
      publisher: { "@type": "Organization", name: "AskGita.net", url: DOMAIN },
      inLanguage: ["en", "hi", "sa"],
      about: { "@type": "Thing", name: "Bhagavad Gita" },
      keywords: `${topic.title}, bhagavad gita, gita shlokas, ${topic.slug.replace(/-/g, " ")}`,
    },
  ];

  return (
    <div className="min-h-screen bg-cream font-sans text-text-dark">
      <SEOHead
        title={`${topic.title} — ${topic.verses.length} Bhagavad Gita Shlokas`}
        description={`${topic.description} Read ${topic.verses.length} carefully selected Bhagavad Gita shlokas on this topic in Sanskrit, Hindi and English. Curated by Aapt Dubey at AskGita.net.`}
        canonical={`/topics/${topic.slug}`}
        keywords={`${topic.title.toLowerCase()}, bhagavad gita verses on ${topic.slug
          .replace(/gita-verses-on-|gita-verses-for-/g, "")
          .replace(/-/g, " ")}, gita shlokas, ${topic.subtitle}`}
        jsonLd={verseJsonLd}
        type="article"
      />

      {/* Breadcrumb nav */}
      <nav
        className="sticky top-0 z-50 bg-dark-brown/95 backdrop-blur border-b border-medium-brown px-4 py-3"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto flex items-center text-sm font-cinzel text-parchment/70 gap-2 flex-wrap">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span className="text-gold">›</span>
          <Link href="/topics" className="hover:text-gold transition-colors">
            Topics
          </Link>
          <span className="text-gold">›</span>
          <span className="text-gold font-semibold line-clamp-1">{topic.title}</span>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative py-16 md:py-24 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1A0A02 0%, #2E1408 60%, #3A1A08 100%)" }}
      >
        <div className="relative max-w-4xl mx-auto">
          <div className="text-5xl mb-4">{topic.icon}</div>
          <div className="inline-block bg-saffron/10 border border-saffron/20 rounded-full px-4 py-1.5 mb-4">
            <p className="font-cinzel text-saffron text-xs uppercase tracking-[0.2em]">
              {topic.verses.length} Bhagavad Gita Shlokas
            </p>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-cinzel text-white mb-4 leading-tight">
            {topic.title}
          </h1>
          <p className="font-devanagari text-saffron text-xl md:text-2xl mb-5">{topic.subtitle}</p>
          <p className="text-parchment/70 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            {topic.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-parchment/40 font-cinzel uppercase tracking-widest">
            <BookOpen className="w-3 h-3" />
            <span>Curated by Aapt Dubey · AskGita.net</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4 bg-parchment border-b border-gold/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-sm font-cinzel text-text-medium">
            <BookOpen className="w-4 h-4 text-gold flex-shrink-0" />
            <p>
              Below are{" "}
              <strong className="text-dark-brown">{topic.verses.length} selected shlokas</strong> from the
              Bhagavad Gita on the theme of{" "}
              <em>
                {topic.title
                  .replace("Gita Verses on ", "")
                  .replace("Gita Verses for ", "")}
              </em>
              . Each verse is presented in Sanskrit (Devanagari), with Hindi translation and English explanation.
            </p>
          </div>

          {/* Verse reference pills — immediately visible to search engines */}
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Verse references in this collection">
            {topic.verses.map((v, i) => (
              <Link
                key={i}
                href={`/chapter/${v.chapterId}/verse/${v.verseId}`}
                className="inline-flex items-center gap-1 bg-white border border-gold/30 hover:border-gold text-dark-brown hover:text-saffron font-cinzel text-xs px-3 py-1.5 rounded-full transition-colors"
                aria-label={`Bhagavad Gita Chapter ${v.chapterId} Verse ${v.verseId}`}
              >
                <span className="text-saffron font-bold">{v.chapterId}.{v.verseId}</span>
                <span className="text-text-muted">Ch {v.chapterId}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verse Cards — all static, no API */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {topic.verses.map((ref, i) => {
            const verse = getStaticVerse(ref.chapterId, ref.verseId);
            if (verse) {
              return <VerseCard key={i} verse={verse} verseNum={i + 1} />;
            }
            return (
              <VerseStub
                key={i}
                chapterId={ref.chapterId}
                verseId={ref.verseId}
                verseNum={i + 1}
              />
            );
          })}
        </div>
      </main>

      {/* How these verses help */}
      <section className="py-12 px-4 bg-parchment border-y border-gold/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-cinzel text-dark-brown mb-6 text-center">
            How These Verses Can Help You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📖",
                title: "Read & Reflect",
                desc: "Read each shloka slowly in Sanskrit, then the Hindi and English. Let the meaning settle.",
              },
              {
                icon: "🧘",
                title: "Contemplate",
                desc: "Choose one verse that resonates most. Sit quietly and contemplate its meaning for a few minutes.",
              },
              {
                icon: "🌱",
                title: "Apply in Life",
                desc: "The Gita's teachings are practical. Pick one principle and consciously apply it in your daily life today.",
              },
            ].map((step) => (
              <div key={step.title} className="text-center">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="font-cinzel text-dark-brown font-semibold mb-2">{step.title}</h3>
                <p className="text-text-medium font-serif text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Credit */}
      <section className="py-8 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 bg-white border border-gold/20 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-dark-brown font-cinzel font-bold text-xl flex-shrink-0">
              A
            </div>
            <div>
              <p className="font-cinzel text-dark-brown font-semibold">Curated by Aapt Dubey</p>
              <p className="text-saffron text-sm font-serif">AskGita.net</p>
              <p className="text-text-medium font-serif text-sm mt-2 leading-relaxed">
                This topic page is part of AskGita.net's project to make the Bhagavad Gita's wisdom
                accessible to everyone — curated verse selections for every life situation, in Sanskrit,
                Hindi and English.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <section
          className="py-12 px-4"
          style={{ background: "linear-gradient(180deg, #FDF8F0, #F9F3E8)" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gold/20" />
              <h2 className="font-cinzel text-dark-brown text-xl tracking-wider text-center">
                Related Topics
              </h2>
              <div className="h-px flex-1 bg-gold/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTopics.map((t) => (
                <RelatedTopicCard key={t.slug} topic={t} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/topics"
                className="inline-flex items-center gap-2 text-saffron hover:text-dark-brown font-cinzel uppercase tracking-widest text-sm transition-colors"
              >
                View All Topics <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
