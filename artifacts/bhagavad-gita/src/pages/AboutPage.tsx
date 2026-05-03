import { Link } from "wouter";
import { SEOHead, DOMAIN } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { SiteLogo } from "@/components/SiteLogo";

const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${DOMAIN}/about` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About AskGita.net — Bhagavad Gita Sacred Wisdom",
    "description": "AskGita.net is dedicated to making the timeless wisdom of the Bhagavad Gita accessible to everyone in Sanskrit, Hindi, and English with AI-powered commentary.",
    "url": `${DOMAIN}/about`,
    "isPartOf": { "@type": "WebSite", "name": "AskGita.net", "url": DOMAIN },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AskGita.net",
    "url": DOMAIN,
    "description": "A platform dedicated to making the Bhagavad Gita accessible through Sanskrit, Hindi, and English translations with AI-powered commentary.",
    "sameAs": [],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans">
      <SEOHead
        title="About Us — Bhagavad Gita Sacred Wisdom"
        description="Learn about our mission to make the timeless wisdom of the Bhagavad Gita accessible to everyone in Sanskrit, Hindi, and English with AI-powered commentary."
        canonical="/about"
        keywords="about bhagavad gita, gita wisdom, sacred texts, bhagavad gita in hindi english, gita press commentary"
        jsonLd={aboutJsonLd}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-dark-brown/95 backdrop-blur border-b border-medium-brown px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center text-sm font-cinzel text-parchment/70 gap-2">
          <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="AskGita.net — Bhagavad Gita — Go to Homepage">
            <SiteLogo size="sm" variant="light" />
          </Link>
          <span className="text-gold">›</span>
          <span className="text-gold font-semibold">About Us</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4 text-center" style={{ background: "linear-gradient(160deg, #1A0A02, #2E1408, #3A1A08)" }}>
        <div className="text-5xl text-gold mb-4 font-devanagari">ॐ</div>
        <h1 className="text-4xl md:text-6xl font-cinzel text-white mb-4">About Us</h1>
        <p className="text-gold italic font-serif text-xl">Spreading the eternal light of the Gita</p>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <section itemScope itemType="https://schema.org/AboutPage">
          <h2 className="text-3xl font-cinzel text-dark-brown mb-6">Our Mission</h2>
          <div className="prose prose-stone max-w-none font-serif text-lg leading-relaxed text-text-medium space-y-4">
            <p>
              The Bhagavad Gita is one of humanity's most profound spiritual texts — a 5000-year-old dialogue between Lord Krishna and the warrior Arjuna on the battlefield of Kurukshetra. Its teachings on duty, action, devotion, and self-knowledge are as relevant today as they were in ancient India.
            </p>
            <p>
              Our mission is to make this timeless wisdom accessible to everyone — in Sanskrit, Hindi, and English — with clear explanations, word-by-word analysis, and contextual commentary inspired by the Gita Press Gorakhpur tradition.
            </p>
            <p>
              We combine the scholarship of traditional Gita commentators (including Swami Ramsukhdas ji and the Gita Press Gorakhpur tradition) with modern AI technology to provide thoughtful, contextual explanations for all 700 shlokas across 18 chapters.
            </p>
          </div>
        </section>

        <section className="bg-parchment border border-gold/20 rounded-2xl p-8">
          <h2 className="text-2xl font-cinzel text-dark-brown mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "📖", title: "All 18 Chapters", desc: "Complete text of the Bhagavad Gita with chapter summaries, themes, and full verse listings." },
              { icon: "🕉️", title: "700+ Shlokas", desc: "Every verse in Sanskrit (Devanagari), IAST transliteration, Hindi, and English translation." },
              { icon: "🤖", title: "AI Oracle", desc: "Ask any life question in English or Hindi and receive wisdom-based answers drawn from Gita teachings." },
              { icon: "📚", title: "Gita Press Commentary", desc: "Verse explanations faithful to the Gita Press Gorakhpur tradition, one of India's most respected publishers." },
              { icon: "🔤", title: "Word-by-Word Analysis", desc: "Detailed breakdown of every Sanskrit word with IAST, Hindi meaning, and English translation." },
              { icon: "🌐", title: "Multilingual", desc: "Content in Sanskrit, Hindi, and English to serve readers across India and the world." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-cinzel text-dark-brown font-semibold mb-1">{item.title}</h3>
                  <p className="text-text-medium font-serif text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-cinzel text-dark-brown mb-4">The Bhagavad Gita</h2>
          <div className="font-serif text-text-medium leading-relaxed space-y-4">
            <p>The Bhagavad Gita (भगवद्गीता), meaning "Song of God," is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a conversation between Prince Arjuna and his guide Lord Krishna before the Kurukshetra War.</p>
            <p>The Gita comprises 18 chapters (adhyayas) covering the philosophical concepts of:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><strong>Karma Yoga</strong> — The path of selfless action</li>
              <li><strong>Jnana Yoga</strong> — The path of knowledge</li>
              <li><strong>Bhakti Yoga</strong> — The path of devotion</li>
              <li><strong>Raja Yoga</strong> — The path of meditation and mind control</li>
            </ul>
            <p>It addresses the universal human questions: What is duty? What is the soul? What is liberation? How should one live?</p>
          </div>
        </section>

        <div className="text-center py-8 border-t border-gold/20">
          <p className="font-devanagari text-saffron text-2xl mb-2">श्रीमद्भगवद्गीता की जय</p>
          <p className="text-text-muted font-serif italic">Victory to the Srimad Bhagavad Gita</p>
          <Link href="/" className="mt-6 inline-block bg-saffron text-white font-cinzel px-8 py-3 rounded-full hover:bg-deep-saffron transition-colors uppercase tracking-wider text-sm">
            Read the Gita →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
