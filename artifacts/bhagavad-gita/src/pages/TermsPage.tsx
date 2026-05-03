import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { SiteLogo } from "@/components/SiteLogo";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans">
      <SEOHead
        title="Terms of Service — Bhagavad Gita"
        description="Terms of service for Bhagavad Gita Sacred Wisdom website. Educational and spiritual content platform for Gita verses and AI-powered commentary."
        canonical="/terms"
        keywords="bhagavad gita terms of service, gita website terms, gita disclaimer"
      />

      <nav className="sticky top-0 z-50 bg-dark-brown/95 backdrop-blur border-b border-medium-brown px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center text-sm font-cinzel text-parchment/70 gap-2">
          <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="AskGita.net — Bhagavad Gita — Go to Homepage">
            <SiteLogo size="sm" variant="light" />
          </Link>
          <span className="text-gold">›</span>
          <span className="text-gold font-semibold">Terms of Service</span>
        </div>
      </nav>

      <section className="py-16 px-4 text-center" style={{ background: "linear-gradient(160deg, #1A0A02, #2E1408, #3A1A08)" }}>
        <h1 className="text-4xl md:text-5xl font-cinzel text-white mb-4">Terms of Service</h1>
        <p className="text-parchment/70 font-serif">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-stone max-w-none font-serif text-text-medium leading-relaxed space-y-8">
          {[
            {
              heading: "1. Acceptance of Terms",
              content: `By accessing and using this Bhagavad Gita website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. These terms apply to all visitors and users of the site.`,
            },
            {
              heading: "2. Educational Purpose",
              content: `This website is provided for educational and spiritual purposes only. The content — including verse translations, Hindi explanations, and AI-generated commentary — is intended to help readers understand the Bhagavad Gita's teachings. It does not constitute religious authority, legal advice, medical advice, or professional guidance of any kind.`,
            },
            {
              heading: "3. AI-Generated Content Disclaimer",
              content: `Verse explanations, commentaries, and Oracle answers are generated using artificial intelligence (Anthropic Claude). While we strive for accuracy and faithfulness to traditional interpretations, AI-generated content may contain errors. We recommend consulting authoritative Gita commentaries (such as Gita Press Gorakhpur editions) for scholarly reference. The AI Oracle's responses are for reflection and inspiration, not definitive spiritual guidance.`,
            },
            {
              heading: "4. Intellectual Property",
              content: `The Bhagavad Gita is an ancient public domain text. Sanskrit verses and traditional translations are in the public domain. AI-generated commentary and website design are proprietary to this platform. You may share verse content for personal, educational, or spiritual purposes with attribution. Commercial reproduction of our website's unique content or design is not permitted without written permission.`,
            },
            {
              heading: "5. User Conduct",
              content: `You agree to use this website only for lawful purposes and in a manner that respects the sacred nature of the Bhagavad Gita. You shall not use our AI Oracle feature for harmful, abusive, or illegal purposes. You shall not attempt to disrupt, hack, or interfere with the website's operation. Questions submitted to the Oracle should be genuine spiritual or philosophical inquiries.`,
            },
            {
              heading: "6. Accuracy of Information",
              content: `We make every effort to ensure the accuracy of Sanskrit verses, translations, and commentary. However, due to the complexity of Sanskrit and the diversity of commentarial traditions, there may be variations from other authentic sources. We welcome corrections and feedback through our Contact page.`,
            },
            {
              heading: "7. Availability",
              content: `We strive to keep the website available at all times, but we cannot guarantee uninterrupted access. Verse pages that require AI generation (first-time visit) may take 10–15 seconds. Maintenance, updates, or technical issues may occasionally cause downtime. We are not liable for any inconvenience caused by service interruptions.`,
            },
            {
              heading: "8. External Links",
              content: `Our website may link to external resources. We are not responsible for the content or privacy practices of external websites. Links to Gita Press or other publishers are provided for your convenience and do not imply endorsement.`,
            },
            {
              heading: "9. Limitation of Liability",
              content: `This website is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of this website, reliance on AI-generated content, or any spiritual decisions made based on content found here. Spiritual and religious decisions should be made in consultation with qualified teachers and your own conscience.`,
            },
            {
              heading: "10. Governing Law",
              content: `These terms are governed by Indian law, in the spirit of the Sanatan Dharma tradition from which the Bhagavad Gita comes. Any disputes shall be resolved through good-faith dialogue wherever possible.`,
            },
            {
              heading: "11. Changes to Terms",
              content: `We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the updated terms.`,
            },
          ].map((section) => (
            <section key={section.heading}>
              <h2 className="font-cinzel text-dark-brown text-xl mb-3">{section.heading}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 p-6 bg-parchment border border-gold/20 rounded-xl text-center">
          <p className="font-devanagari text-saffron text-lg mb-2">सत्यमेव जयते</p>
          <p className="text-text-muted font-serif italic text-sm">Truth alone prevails</p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact" className="inline-block bg-saffron text-white font-cinzel px-8 py-3 rounded-full hover:bg-deep-saffron transition-colors uppercase tracking-wider text-sm">
            Contact Us →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
