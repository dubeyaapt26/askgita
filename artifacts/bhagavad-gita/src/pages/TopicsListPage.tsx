import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { TOPICS, FEATURED_TOPIC_SLUGS } from "@/data/topics";
import { SiteLogo } from "@/components/SiteLogo";

const DOMAIN = "https://askgita.net";

const OG_IMAGE = {
  "@type": "ImageObject",
  "url": `${DOMAIN}/opengraph.jpg`,
  "contentUrl": `${DOMAIN}/opengraph.jpg`,
  "width": 1280,
  "height": 720,
  "name": "Bhagavad Gita Verses by Topic — AskGita.net",
  "description": "107 curated Bhagavad Gita topic pages covering anxiety, karma, duty, love, depression, loneliness, meditation and moksha.",
  "caption": "Bhagavad Gita — 107 Life Topics with Sanskrit Shlokas | AskGita.net",
  "alt": "Bhagavad Gita Verses by Topic — AskGita.net",
};

const topicsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "Bhagavad Gita Topics", "item": `${DOMAIN}/topics` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bhagavad Gita Verses by Topic — 107 Life Situations",
    "description": "Browse 107 Bhagavad Gita topic pages — shlokas on anxiety, karma, love, duty, depression, loneliness, burnout, heartbreak, marriage, meditation, moksha and more. Each topic includes a bilingual Gita wisdom article in English and Hindi. Curated at AskGita.net.",
    "url": `${DOMAIN}/topics`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${DOMAIN}/topics` },
    "datePublished": "2025-05-01T00:00:00+05:30",
    "dateModified": "2025-05-03T00:00:00+05:30",
    "author": { "@type": "Person", "name": "Aapt Dubey", "url": DOMAIN },
    "publisher": {
      "@type": "Organization",
      "name": "AskGita.net",
      "url": DOMAIN,
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/favicon.svg`,
        "contentUrl": `${DOMAIN}/favicon.svg`,
        "width": 512,
        "height": 512,
        "name": "AskGita.net Logo",
        "alt": "AskGita.net — Bhagavad Gita",
      },
    },
    "image": OG_IMAGE,
    "isPartOf": { "@type": "WebSite", "name": "AskGita.net", "url": DOMAIN },
    "about": { "@type": "Book", "name": "Bhagavad Gita", "url": DOMAIN },
    "numberOfItems": TOPICS.length,
    "articleBody": "AskGita.net presents 107 curated Bhagavad Gita topic collections — each covering a specific life situation with hand-picked Sanskrit shlokas, Hindi and English translations, and a bilingual AI wisdom article. Topics include anxiety, karma yoga, duty, love, depression, loneliness, burnout, heartbreak, marriage, meditation, moksha, self-confidence, forgiveness and more. Curated by Aapt Dubey.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "All Bhagavad Gita Topic Collections",
    "description": "107 curated Bhagavad Gita topic pages covering every major life situation",
    "url": `${DOMAIN}/topics`,
    "numberOfItems": TOPICS.length,
    "itemListElement": TOPICS.map((t, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": t.title,
      "description": t.description,
      "url": `${DOMAIN}/topics/${t.slug}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Bhagavad Gita Topic Illustrations — AskGita.net",
    "description": "Visual collection representing 107 Bhagavad Gita topic pages covering life situations from anxiety and karma to moksha and meditation.",
    "url": `${DOMAIN}/topics`,
    "author": { "@type": "Person", "name": "Aapt Dubey", "url": DOMAIN },
    "publisher": { "@type": "Organization", "name": "AskGita.net", "url": DOMAIN },
    "numberOfItems": 8,
    "itemListElement": [
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Mind & Emotions — Bhagavad Gita on Anxiety, Peace and Equanimity",
        "description": "Bhagavad Gita verses on overcoming anxiety, finding peace of mind, managing anger, grief, equanimity and inner peace.",
        "caption": "Bhagavad Gita — Mind & Emotions | AskGita.net",
        "alt": "Bhagavad Gita verses on anxiety, peace of mind and equanimity — AskGita.net",
        "width": 1280,
        "height": 720,
      },
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Action & Purpose — Bhagavad Gita on Karma Yoga and Duty",
        "description": "Bhagavad Gita verses on karma yoga, dharma, career, success, self-discipline, burnout and life purpose.",
        "caption": "Bhagavad Gita — Action & Purpose | AskGita.net",
        "alt": "Bhagavad Gita verses on karma yoga, duty and dharma — AskGita.net",
        "width": 1280,
        "height": 720,
      },
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Relationships — Bhagavad Gita on Love, Forgiveness and Compassion",
        "description": "Bhagavad Gita verses on love, friendship, forgiveness, marriage, heartbreak and dealing with toxic relationships.",
        "caption": "Bhagavad Gita — Relationships | AskGita.net",
        "alt": "Bhagavad Gita verses on love, forgiveness and relationships — AskGita.net",
        "width": 1280,
        "height": 720,
      },
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Spirituality & Devotion — Bhagavad Gita on Bhakti, Meditation and Moksha",
        "description": "Bhagavad Gita verses on bhakti yoga, meditation, mindfulness, moksha, spiritual growth and God's promises.",
        "caption": "Bhagavad Gita — Spirituality & Devotion | AskGita.net",
        "alt": "Bhagavad Gita verses on bhakti, meditation and moksha — AskGita.net",
        "width": 1280,
        "height": 720,
      },
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Strength & Growth — Bhagavad Gita on Self-Confidence and Resilience",
        "description": "Bhagavad Gita verses on inner strength, self-confidence, focus, resilience, leadership and self-worth.",
        "caption": "Bhagavad Gita — Strength & Growth | AskGita.net",
        "alt": "Bhagavad Gita verses on strength, resilience and self-confidence — AskGita.net",
        "width": 1280,
        "height": 720,
      },
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Modern Life — Bhagavad Gita on Work-Life Balance and Stress",
        "description": "Bhagavad Gita verses on work-life balance, social media, procrastination, time management and modern challenges.",
        "caption": "Bhagavad Gita — Modern Life Challenges | AskGita.net",
        "alt": "Bhagavad Gita verses on work-life balance and modern challenges — AskGita.net",
        "width": 1280,
        "height": 720,
      },
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Daily Motivation — Bhagavad Gita on Habits and Discipline",
        "description": "Bhagavad Gita verses on daily motivation, morning discipline, building habits and overcoming laziness.",
        "caption": "Bhagavad Gita — Daily Motivation | AskGita.net",
        "alt": "Bhagavad Gita verses on daily motivation and habits — AskGita.net",
        "width": 1280,
        "height": 720,
      },
      {
        "@type": "ImageObject",
        "url": `${DOMAIN}/opengraph.jpg`,
        "contentUrl": `${DOMAIN}/opengraph.jpg`,
        "name": "Healing — Bhagavad Gita on Loneliness, Grief and Emotional Recovery",
        "description": "Bhagavad Gita verses on healing from loneliness, self-forgiveness, grief, rejection and emotional recovery.",
        "caption": "Bhagavad Gita — Healing & Recovery | AskGita.net",
        "alt": "Bhagavad Gita verses on healing, loneliness and emotional recovery — AskGita.net",
        "width": 1280,
        "height": 720,
      },
    ],
  },
];

const TOPIC_CATEGORIES = [
  {
    name: "Mind & Emotions",
    icon: "🧠",
    slugs: [
      "gita-verses-on-overcoming-anxiety",
      "gita-verses-on-peace-of-mind",
      "gita-verses-on-anger-management",
      "gita-verses-on-grief-and-loss",
      "gita-verses-on-equanimity",
      "gita-verses-on-true-happiness",
      "gita-verses-on-depression",
      "gita-verses-on-fear",
      "gita-verses-on-negative-thoughts",
      "gita-verses-on-finding-inner-peace",
      "gita-verses-on-anxiety-attacks",
      "gita-verses-on-fear-of-death",
    ],
  },
  {
    name: "Action & Purpose",
    icon: "⚡",
    slugs: [
      "gita-verses-on-karma-yoga",
      "gita-verses-on-duty-and-dharma",
      "gita-verses-on-career-and-purpose",
      "gita-verses-on-success-without-stress",
      "gita-verses-on-self-discipline",
      "gita-verses-on-overcoming-laziness",
      "gita-verses-on-burnout",
      "gita-verses-on-life-purpose",
      "gita-verses-on-entrepreneurship",
      "gita-verses-on-karma-explanation",
      "gita-verses-on-no-expectations",
    ],
  },
  {
    name: "Relationships",
    icon: "💛",
    slugs: [
      "gita-verses-on-love-and-compassion",
      "gita-verses-on-friendship",
      "gita-verses-on-forgiveness",
      "gita-verses-on-toxic-relationships",
      "gita-verses-on-humility-and-ego",
      "gita-verses-on-gratitude",
      "gita-verses-on-marriage",
      "gita-verses-on-heartbreak",
      "gita-verses-on-parenting",
      "gita-verses-on-dealing-with-betrayal",
      "gita-verses-on-fake-friends",
      "gita-verses-on-sibling-rivalry",
      "gita-verses-on-in-law-problems",
      "gita-verses-on-anger-towards-parents",
      "gita-verses-on-narcissistic-people",
    ],
  },
  {
    name: "Strength & Growth",
    icon: "🔱",
    slugs: [
      "gita-verses-on-inner-strength",
      "gita-verses-on-self-confidence",
      "gita-verses-on-resilience",
      "gita-verses-on-focus",
      "gita-verses-for-students",
      "gita-verses-on-leadership-and-decision-making",
      "gita-verses-on-self-worth",
      "gita-verses-on-self-love",
      "gita-verses-on-mind-control",
      "gita-verses-on-resilience-tough-times",
      "gita-verses-on-imposter-syndrome",
      "gita-verses-on-self-sabotage",
      "gita-verses-on-self-esteem",
      "gita-verses-on-peer-pressure",
      "gita-verses-on-women-empowerment",
    ],
  },
  {
    name: "Spirituality & Devotion",
    icon: "🕉️",
    slugs: [
      "gita-verses-on-bhakti",
      "gita-verses-on-gods-promises",
      "gita-verses-on-wisdom-and-knowledge",
      "gita-verses-on-detachment",
      "gita-verses-on-encouragement",
      "gita-verses-on-patience",
      "gita-verses-on-guilt",
      "gita-verses-on-meditation",
      "gita-verses-on-mindfulness",
      "gita-verses-on-chanting",
      "gita-verses-on-moksha",
      "gita-verses-on-spiritual-growth",
      "gita-verses-on-spiritual-laziness",
      "gita-verses-on-environment",
      "gita-verses-on-festivals",
    ],
  },
  {
    name: "Modern Life Challenges",
    icon: "🌐",
    slugs: [
      "gita-verses-on-social-media",
      "gita-verses-on-work-life-balance",
      "gita-verses-on-work-from-home",
      "gita-verses-on-digital-detox",
      "gita-verses-on-office-politics",
      "gita-verses-on-procrastination",
      "gita-verses-on-decision-fatigue",
      "gita-verses-on-time-management",
      "gita-verses-on-perfectionism",
      "gita-verses-on-comparison",
      "gita-verses-on-uncertainty",
      "gita-verses-on-life-balance",
      "gita-verses-on-crisis-calm",
    ],
  },
  {
    name: "Daily Motivation & Habits",
    icon: "☀️",
    slugs: [
      "gita-verses-on-daily-motivation",
      "gita-verses-on-morning-discipline",
      "gita-verses-on-building-habits",
      "gita-verses-on-overcoming-bad-habits",
      "gita-verses-on-stage-fear",
      "gita-verses-on-handling-success",
      "gita-verses-on-handling-rejection",
      "gita-verses-on-exam-failure",
      "gita-verses-on-financial-independence",
      "gita-verses-on-financial-stress",
      "gita-verses-on-greed-and-contentment",
    ],
  },
  {
    name: "Healing & Emotional Recovery",
    icon: "🌿",
    slugs: [
      "gita-verses-on-loneliness",
      "gita-verses-on-self-forgiveness",
      "gita-verses-on-body-image",
      "gita-verses-on-bullying",
      "gita-verses-on-single-life",
      "gita-verses-on-infertility",
      "gita-verses-on-aging",
      "gita-verses-on-motherhood",
      "gita-verses-on-rejection",
      "gita-verses-on-dealing-with-criticism",
      "gita-verses-on-joy-in-small-things",
      "gita-verses-on-gratitude-in-hard-times",
      "gita-verses-on-daily-gratitude",
      "gita-verses-on-no-expectations",
    ],
  },
];

export default function TopicsListPage() {
  const featuredTopics = FEATURED_TOPIC_SLUGS.map((s) => TOPICS.find((t) => t.slug === s)!).filter(Boolean);
  const topicMap = new Map(TOPICS.map((t) => [t.slug, t]));

  return (
    <div className="min-h-screen bg-cream font-sans text-text-dark">
      <SEOHead
        title="Bhagavad Gita Verses by Topic — 107 Life Situations with Shlokas"
        description="Browse 107 Bhagavad Gita topic pages: anxiety, karma, duty, love, depression, loneliness, burnout, heartbreak, marriage, fear, guilt, meditation, moksha and more. Each topic has curated shlokas in Sanskrit, Hindi and English — AskGita.net."
        canonical="/topics"
        ogImageAlt="Bhagavad Gita Verses by Topic — 107 life situations with Sanskrit shlokas in Hindi and English | AskGita.net"
        keywords="bhagavad gita topics, gita verses by topic, gita on anxiety, gita on karma, gita on duty, gita shlokas by topic, gita on loneliness, gita on meditation, gita on moksha, askgita, aapt dubey"
        jsonLd={topicsJsonLd}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-dark-brown/95 backdrop-blur border-b border-medium-brown px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm font-cinzel text-parchment/70 gap-2">
          <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="AskGita.net — Bhagavad Gita — Go to Homepage">
            <SiteLogo size="sm" variant="light" />
          </Link>
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
          <p className="text-parchment/70 font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
            107 life topics — curated shlokas for every situation, from anxiety and loneliness to moksha and meditation. Each topic includes a bilingual Gita wisdom article in English and Hindi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {["Anxiety","Karma","Loneliness","Meditation","Moksha","Heartbreak","Burnout","Purpose"].map(tag => (
              <span key={tag} className="text-xs font-cinzel uppercase tracking-widest text-saffron/70 bg-saffron/10 border border-saffron/20 rounded-full px-3 py-1">{tag}</span>
            ))}
          </div>
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
                      <h3 className="font-cinzel text-dark-brown font-semibold text-base leading-snug group-hover:text-saffron transition-colors line-clamp-2">
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
            <h2 className="font-cinzel text-dark-brown text-2xl text-center tracking-wider">All 107 Topics</h2>
            <div className="h-px flex-1 bg-gold/20" />
          </div>
          <div className="space-y-14">
            {TOPIC_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h3 className="font-cinzel text-xl text-dark-brown mb-6 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="text-xs font-sans text-text-muted normal-case tracking-normal ml-1">({cat.slugs.filter(s => topicMap.has(s)).length})</span>
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
