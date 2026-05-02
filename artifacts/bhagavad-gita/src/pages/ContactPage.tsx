import { Link } from "wouter";
import { SEOHead, DOMAIN } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";

const contactJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
      { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": `${DOMAIN}/contact` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact AskGita.net",
    "description": "Contact us for questions about the Bhagavad Gita website, verse corrections, suggestions, or partnership inquiries.",
    "url": `${DOMAIN}/contact`,
    "isPartOf": { "@type": "WebSite", "name": "AskGita.net", "url": DOMAIN },
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans">
      <SEOHead
        title="Contact Us — Bhagavad Gita"
        description="Contact us for questions about the Bhagavad Gita website, verse corrections, suggestions, or partnership inquiries."
        canonical="/contact"
        keywords="contact bhagavad gita, gita website contact, bhagavad gita feedback"
        jsonLd={contactJsonLd}
      />

      <nav className="sticky top-0 z-50 bg-dark-brown/95 backdrop-blur border-b border-medium-brown px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center text-sm font-cinzel text-parchment/70 gap-2">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-gold">›</span>
          <span className="text-gold font-semibold">Contact Us</span>
        </div>
      </nav>

      <section className="py-20 px-4 text-center" style={{ background: "linear-gradient(160deg, #1A0A02, #2E1408, #3A1A08)" }}>
        <div className="text-5xl text-gold mb-4 font-devanagari">ॐ</div>
        <h1 className="text-4xl md:text-6xl font-cinzel text-white mb-4">Contact Us</h1>
        <p className="text-gold italic font-serif text-xl">We welcome your questions and feedback</p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {[
            {
              icon: "📧",
              title: "General Inquiries",
              desc: "For questions about the website, content, or Gita teachings.",
              detail: "Use the form below or reach us at our support channel.",
            },
            {
              icon: "✏️",
              title: "Corrections & Suggestions",
              desc: "Found an error in a verse or translation? We appreciate corrections.",
              detail: "Please mention the Chapter and Verse number for accuracy.",
            },
            {
              icon: "🤝",
              title: "Partnership",
              desc: "Educational institutions, temples, or spiritual organizations.",
              detail: "We are open to partnerships that spread Gita wisdom.",
            },
            {
              icon: "📖",
              title: "Content Feedback",
              desc: "Suggestions for improving our AI-generated commentary.",
              detail: "Your feedback helps us improve the quality of explanations.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-parchment border border-gold/20 rounded-xl p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h2 className="font-cinzel text-dark-brown font-semibold mb-2">{item.title}</h2>
              <p className="text-text-medium font-serif text-sm mb-2">{item.desc}</p>
              <p className="text-text-muted font-serif text-xs italic">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gold/20 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-cinzel text-dark-brown mb-6">Send a Message</h2>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your message! We will respond soon. 🙏");
            }}
          >
            <div>
              <label className="block font-cinzel text-sm uppercase tracking-wider text-text-medium mb-2" htmlFor="name">Your Name</label>
              <input id="name" type="text" required placeholder="Your full name" className="w-full border border-gold/30 rounded-lg px-4 py-3 font-serif focus:outline-none focus:ring-2 focus:ring-saffron bg-cream" />
            </div>
            <div>
              <label className="block font-cinzel text-sm uppercase tracking-wider text-text-medium mb-2" htmlFor="email">Email Address</label>
              <input id="email" type="email" required placeholder="your@email.com" className="w-full border border-gold/30 rounded-lg px-4 py-3 font-serif focus:outline-none focus:ring-2 focus:ring-saffron bg-cream" />
            </div>
            <div>
              <label className="block font-cinzel text-sm uppercase tracking-wider text-text-medium mb-2" htmlFor="subject">Subject</label>
              <select id="subject" className="w-full border border-gold/30 rounded-lg px-4 py-3 font-serif focus:outline-none focus:ring-2 focus:ring-saffron bg-cream">
                <option>General Inquiry</option>
                <option>Verse Correction</option>
                <option>Content Suggestion</option>
                <option>Partnership</option>
                <option>Technical Issue</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block font-cinzel text-sm uppercase tracking-wider text-text-medium mb-2" htmlFor="message">Message</label>
              <textarea id="message" required rows={5} placeholder="Your message..." className="w-full border border-gold/30 rounded-lg px-4 py-3 font-serif focus:outline-none focus:ring-2 focus:ring-saffron bg-cream resize-none" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-saffron to-gold text-dark-brown font-cinzel font-bold py-3 rounded-full hover:brightness-110 transition-all uppercase tracking-wider">
              Send Message 🪷
            </button>
          </form>
        </div>

        <div className="mt-10 text-center py-6 bg-parchment rounded-xl border border-gold/20">
          <p className="font-devanagari text-saffron text-xl mb-1">नमस्ते</p>
          <p className="text-text-muted font-serif italic text-sm">We usually respond within 2–3 business days.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
