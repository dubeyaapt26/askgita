import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { TOPICS, FEATURED_TOPIC_SLUGS } from "@/data/topics";

const DOMAIN = "https://askgita.net";

const topicsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "Gita Topics", "item": `${DOMAIN}/topics` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bhagavad Gita Verses by Topic",
    "description": "Browse all 48 Bhagavad Gita topic pages — verses on anxiety, karma, love, duty, depression, heartbreak, marriage, and more. Curated at AskGita.net.",
    "url": `${DOMAIN}/topics`,
    "isPartOf": { "@type": "WebSite", "name": "AskGita.net", "url": DOMAIN },
  },
];

const TOPIC_CATEGORIES = [
  {
    name: "Mind & Emotions",
    icon: "🧠",
    slugs: [
      "gita-verses-on-overcoming-anxiety","gita-verses-on-peace-of-mind","gita-verses-on-anger-management",
      "gita-verses-on-grief-and-loss","gita-verses-on-equanimity","gita-verses-on-true-happiness",
      "gita-verses-on-depression","gita-verses-on-fear","gita-verses-on-negative-thoughts","gita-verses-on-social-media",
    ],
  },
  {
    name: "Action & Purpose",
    icon: "⚡",
    slugs: [
      "gita-verses-on-karma-yoga","gita-verses-on-duty-and-dharma","gita-verses-on-career-and-purpose",
      "gita-verses-on-success-without-stress","gita-verses-on-self-discipline","gita-verses-on-overcoming-laziness",
      "gita-verses-on-burnout","gita-verses-on-life-purpose",
    ],
  },
  {
    name: "Relationships",
    icon: "💛",
    slugs: [
      "gita-verses-on-love-and-compassion","gita-verses-on-friendship","gita-verses-on-forgiveness",
      "gita-verses-on-toxic-relationships","gita-verses-on-humility-and-ego","gita-verses-on-gratitude",
      "gita-verses-on-marriage","gita-verses-on-heartbreak","gita-verses-on-parenting","gita-verses-on-criticism",
    ],
  },
  {
    name: "Strength & Growth",
    icon: "🔱",
    slugs: [
      "gita-verses-on-inner-strength","gita-verses-on-self-confidence","gita-verses-on-resilience",
      "gita-verses-on-focus","gita-verses-for-students","gita-verses-on-leadership-and-decision-making",
      "gita-verses-on-self-worth","gita-verses-on-self-love","gita-verses-on-mind-control","gita-verses-on-resilience-tough-times",
    ],
  },
  {
    name: "Spirituality & Healing",
    icon: "🕉️",
    slugs: [
      "gita-verses-on-bhakti","gita-verses-on-gods-promises","gita-verses-on-wisdom-and-knowledge",
      "gita-verses-on-detachment","gita-verses-on-greed-and-contentment","gita-verses-on-encouragement",
      "gita-verses-on-patience","gita-verses-on-guilt","gita-verses-on-financial-stress","gita-verses-on-jealousy",
    ],
  },
];

export default function TopicsListPage() {
  const featuredTopics = FEATURED_TOPIC_SLUGS.map((s) => TOPICS.find((t) => t.slug === s)!).filter(Boolean);
  const topicMap = new Map(TOPICS.map((t) => [t.slug, t]));

  return (
    <div className="min-h-screen bg-cream font-sans text-text-dark">
      <SEOHead
        title="Bhagavad Gita Verses by Topic — 48 Life Topics with Shlokas"
        description="Browse 48 Bhagavad Gita topic pages: anxiety, karma, duty, love, depression, heartbreak, marriage, fear, guilt and more. Curated by Aapt Dubey at AskGita.net — each topic has 4–7 relevant shlokas in Sanskrit, Hindi and English."
        canonical="/topics"
        keywords="bhagavad gita topics, gita verses by topic, gita on anxiety, gita on karma, gita on duty, gita shlokas by topic, askgita, aapt dubey"
        jsonLd={topicsJsonLd}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-dark-brown/95 backdrop-blur border-b border-medium-brown px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm font-cinzel text-parchment/70 gap-2">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-gold">›</span>
          <span className="text-gold font-semibold">Gita Topics</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden" style={{ background: "linear-gradient(160deg, #1A0A02, #2E1408, #3A1A08)" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A418' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-5xl mb-4 font-devanagari text-gold">🕉️</div>
          <h1 className="text-4xl md:text-6xl font-cinzel text-white mb-4 leading-tight">
            Bhagavad Gita<br />
            <span className="text-saffron">Verses by Topic</span>
          </h1>
          <p className="text-parchment/70 font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
            48 topics from the Gita — curated shlokas for every life situation, from anxiety and heartbreak to leadership and devotion.
          </p>
          <p className="font-devanagari text-saffron text-lg">योगः कर्मसु कौशलम् — Excellence in action is Yoga</p>
          <p className="text-parchment/40 text-xs font-cinzel uppercase tracking-widest mt-2">Curated by Aapt Dubey · AskGita.net</p>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16 px-4 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gold/20" />
            <h2 className="font-cinzel text-dark-brown text-2xl text-center tracking-wider">Featured Topics</h2>
            <div className="h-px flex-1 bg-gold/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group bg-white rounded-2xl border border-gold/20 shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${topic.color.replace(/\/40/g, '')}`} />
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{topic.icon}</span>
                    <div>
                      <h3 className="font-cinzel text-dark-brown font-semibold text-base leading-snug group-hover:text-saffron transition-colors">
                        {topic.title}
                      </h3>
                      <p className="font-devanagari text-saffron/70 text-sm mt-0.5">{topic.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-text-medium font-serif text-sm leading-relaxed line-clamp-2 mb-4">{topic.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cinzel uppercase tracking-widest text-text-muted bg-cream px-3 py-1 rounded-full border border-gold/10">
                      {topic.verses.length} Shlokas
                    </span>
                    <span className="text-saffron text-sm font-cinzel group-hover:translate-x-1 transition-transform inline-block">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Topics by Category */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gold/20" />
            <h2 className="font-cinzel text-dark-brown text-2xl text-center tracking-wider">All 48 Topics</h2>
            <div className="h-px flex-1 bg-gold/20" />
          </div>
          <div className="space-y-14">
            {TOPIC_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h3 className="font-cinzel text-xl text-dark-brown mb-6 flex items-center gap-3">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="h-px flex-1 bg-gold/20" />
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.slugs.map((slug) => {
                    const t = topicMap.get(slug);
                    if (!t) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/topics/${slug}`}
                        className="group flex items-start gap-3 bg-white border border-gold/15 rounded-xl p-4 hover:border-gold/50 hover:shadow-md transition-all"
                      >
                        <span className="text-2xl flex-shrink-0 mt-0.5">{t.icon}</span>
                        <div className="min-w-0">
                          <p className="font-cinzel text-dark-brown text-sm font-semibold leading-snug group-hover:text-saffron transition-colors line-clamp-2">
                            {t.title}
                          </p>
                          <p className="font-devanagari text-saffron/60 text-xs mt-1">{t.subtitle}</p>
                          <p className="text-text-muted text-xs font-cinzel mt-2 uppercase tracking-wider">{t.verses.length} verses →</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center" style={{ background: "linear-gradient(135deg, #1A0A02, #2E1408)" }}>
        <p className="font-devanagari text-gold text-2xl mb-2">श्रीमद्भगवद्गीता की जय</p>
        <p className="text-parchment/60 font-serif mb-6">Victory to the Srimad Bhagavad Gita</p>
        <Link href="/" className="inline-block bg-gradient-to-r from-saffron to-gold text-dark-brown font-cinzel font-bold px-8 py-3 rounded-full hover:brightness-110 transition-all uppercase tracking-wider text-sm">
          Explore Full Gita →
        </Link>
        <p className="mt-6 text-parchment/30 text-xs font-cinzel uppercase tracking-widest">Curated by Aapt Dubey · AskGita.net</p>
      </section>

      <Footer />
    </div>
  );
}
