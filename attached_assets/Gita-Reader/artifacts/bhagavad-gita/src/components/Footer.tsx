import { Link } from "wouter";

const TOPIC_CATEGORIES = [
  { name: "Mind & Emotions", slug: "gita-verses-on-overcoming-anxiety", icon: "🧠" },
  { name: "Action & Purpose", slug: "gita-verses-on-karma-yoga", icon: "⚡" },
  { name: "Relationships", slug: "gita-verses-on-love-and-compassion", icon: "💛" },
  { name: "Strength & Growth", slug: "gita-verses-on-inner-strength", icon: "🔱" },
  { name: "Spirituality", slug: "gita-verses-on-bhakti", icon: "🕉️" },
];

export function Footer() {
  return (
    <footer
      className="bg-dark-brown border-t border-medium-brown text-parchment"
      aria-label="Site footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Brand column */}
        <div>
          <div className="text-3xl text-gold mb-2 font-devanagari">ॐ</div>
          <h2 className="font-cinzel text-gold text-xl font-semibold mb-0.5">AskGita.net</h2>
          <p className="text-parchment/40 font-cinzel text-xs mb-4 tracking-wider">by Aapt Dubey</p>
          <p className="text-parchment/70 font-serif text-sm leading-relaxed mb-6">
            All 18 chapters and 700 shlokas of the Srimad Bhagavad Gita — Sanskrit, Hindi &amp; English, with AI insights.
          </p>
          <nav aria-label="Main footer links">
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/topics" className="text-gold/90 hover:text-gold transition-colors font-cinzel text-sm">
                  Browse Topics
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-parchment/60 hover:text-gold transition-colors font-cinzel text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-parchment/60 hover:text-gold transition-colors font-cinzel text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-parchment/60 hover:text-gold transition-colors font-cinzel text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-parchment/60 hover:text-gold transition-colors font-cinzel text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Topic Categories column */}
        <div>
          <h3 className="font-cinzel text-saffron uppercase tracking-widest text-xs mb-5">Topic Categories</h3>
          <nav aria-label="Topic categories">
            <ul className="space-y-3">
              {TOPIC_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/topics/${cat.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-parchment/70 group-hover:text-gold font-serif text-sm transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/topics" className="text-saffron/70 hover:text-gold font-cinzel uppercase tracking-widest text-xs transition-colors">
                  View All 30 Topics →
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-8 p-4 bg-medium-brown/20 rounded-xl border border-gold/10">
            <p className="font-devanagari text-saffron text-base leading-relaxed">
              "योगः कर्मसु कौशलम्"
            </p>
            <p className="text-parchment/40 text-xs mt-1 font-serif italic">
              Yoga is excellence in action — BG 2.50
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-medium-brown/40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-parchment/30 text-xs font-serif text-center sm:text-left">
            © {new Date().getFullYear()} AskGita.net by Aapt Dubey. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex gap-5 text-xs text-parchment/30 font-cinzel uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
            <Link href="/about" className="hover:text-gold transition-colors">About</Link>
          </nav>
        </div>
      </div>

      {/* Structured data for Google */}
      <div itemScope itemType="https://schema.org/Organization" className="hidden">
        <span itemProp="name">AskGita.net</span>
        <link itemProp="url" href="https://gita-reader--dubeyaapt.replit.app" />
        <meta itemProp="description" content="Read all 18 chapters and 700 shlokas of the Bhagavad Gita in Sanskrit, Hindi and English with AI-powered commentary." />
        <span itemProp="founder" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">Aapt Dubey</span>
        </span>
      </div>
    </footer>
  );
}
