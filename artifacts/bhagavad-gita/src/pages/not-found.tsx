import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cream text-text-dark font-sans px-4">
      <SEOHead
        title="Page Not Found — Bhagavad Gita"
        description="The page you are looking for could not be found. Return to the Bhagavad Gita home page."
        noIndex={true}
      />

      <div className="text-center max-w-md">
        <div className="text-8xl font-devanagari text-gold mb-6">ॐ</div>
        <h1 className="text-5xl font-cinzel text-dark-brown mb-4">404</h1>
        <p className="text-xl font-cinzel text-text-medium mb-3">Page Not Found</p>
        <p className="font-serif text-text-muted mb-10 leading-relaxed">
          The verse you seek is not on this path. Return to the sacred text and continue your journey.
        </p>
        <Link
          href="/"
          className="inline-block bg-saffron text-white font-cinzel px-8 py-3 rounded-full hover:bg-deep-saffron transition-colors uppercase tracking-wider text-sm"
        >
          Return to the Gita →
        </Link>
      </div>
    </div>
  );
}
