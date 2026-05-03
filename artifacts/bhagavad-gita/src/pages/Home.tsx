import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { SEOHead } from "@/components/SEOHead";
import { Footer } from "@/components/Footer";
import { SiteLogo } from "@/components/SiteLogo";

import { getApiUrl } from "@/lib/api-url";

interface VerseRef {
  chapterId: number;
  verseId: number;
  skt: string;
  ref: string;
}

interface SearchResult {
  english: string;
  hindi: string;
  verses: VerseRef[];
  refused?: boolean;
  message?: string;
  messageHindi?: string;
}

const CHAPTERS = [
  {n:1,name:"Arjuna's Dilemma",skt:"अर्जुनविषादयोग",meaning:"Yoga of Arjuna's Dejection",v:47},
  {n:2,name:"Transcendent Knowledge",skt:"सांख्ययोग",meaning:"Yoga of Knowledge",v:72},
  {n:3,name:"Path of Action",skt:"कर्मयोग",meaning:"Yoga of Action",v:43},
  {n:4,name:"Wisdom in Action",skt:"ज्ञानकर्मसंन्यासयोग",meaning:"Yoga of Knowledge & Renunciation",v:42},
  {n:5,name:"True Renunciation",skt:"कर्मसंन्यासयोग",meaning:"Yoga of Renunciation",v:29},
  {n:6,name:"Self-Mastery",skt:"ध्यानयोग",meaning:"Yoga of Meditation",v:47},
  {n:7,name:"Knowledge of the Absolute",skt:"ज्ञानविज्ञानयोग",meaning:"Yoga of Knowledge & Wisdom",v:30},
  {n:8,name:"The Eternal Brahman",skt:"अक्षरब्रह्मयोग",meaning:"Yoga of the Imperishable Brahman",v:28},
  {n:9,name:"The Royal Secret",skt:"राजविद्याराजगुह्ययोग",meaning:"Yoga of Royal Knowledge",v:34},
  {n:10,name:"Divine Manifestations",skt:"विभूतियोग",meaning:"Yoga of Divine Glories",v:42},
  {n:11,name:"The Cosmic Vision",skt:"विश्वरूपदर्शनयोग",meaning:"Yoga of the Universal Form",v:55},
  {n:12,name:"The Path of Devotion",skt:"भक्तियोग",meaning:"Yoga of Devotion",v:20},
  {n:13,name:"Field & Its Knower",skt:"क्षेत्रक्षेत्रज्ञविभागयोग",meaning:"Yoga of the Field",v:35},
  {n:14,name:"Three Qualities of Nature",skt:"गुणत्रयविभागयोग",meaning:"Yoga of the Three Gunas",v:27},
  {n:15,name:"The Supreme Person",skt:"पुरुषोत्तमयोग",meaning:"Yoga of the Supreme Being",v:20},
  {n:16,name:"Divine & Demonic Natures",skt:"दैवासुरसम्पद्विभागयोग",meaning:"Yoga of Divine & Demonic Traits",v:24},
  {n:17,name:"Three Kinds of Faith",skt:"श्रद्धात्रयविभागयोग",meaning:"Yoga of Threefold Faith",v:28},
  {n:18,name:"Liberation & Renunciation",skt:"मोक्षसंन्यासयोग",meaning:"Yoga of Liberation by Renunciation",v:78}
];

const VERSES = [
  {ch:1,v:1,s:"धृतराष्ट्र उवाच।\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",t:"dhṛtarāṣṭra uvāca — dharmakṣetre kurukṣetre...",e:"Dhritarashtra said: O Sanjaya, after gathering on the holy field of Kurukshetra desiring to fight, what did my sons and the sons of Pandu do?",theme:"Setting"},
  {ch:1,v:47,s:"एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः॥",t:"evam uktvārjunaḥ saṅkhye...",e:"Arjuna, overwhelmed with grief, cast aside his bow and arrows and sat down in the chariot, his mind overcome with sorrow.",theme:"Grief"},
  {ch:2,v:11,s:"श्रीभगवानुवाच।\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥",t:"śrī bhagavān uvāca...",e:"The Supreme Lord said: While speaking learned words you mourn for what is not worthy of grief. The wise lament neither for the living nor for the dead.",theme:"Wisdom"},
  {ch:2,v:19,s:"य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम्।\nउभौ तौ न विजानीतो नायं हन्ति न हन्यते॥",t:"ya enaṃ vetti hantāraṃ...",e:"He who thinks that this soul kills, and he who thinks it is killed — both are ignorant. The soul neither kills nor is killed.",theme:"Soul"},
  {ch:2,v:20,s:"न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",t:"na jāyate mriyate vā kadācin...",e:"The soul is never born nor dies. It has not come into being and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",theme:"Atman"},
  {ch:2,v:22,s:"वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णा-\nन्यन्यानि संयाति नवानि देही॥",t:"vāsāṃsi jīrṇāni yathā vihāya...",e:"Just as a person puts on new garments giving up old ones, the soul accepts new material bodies, giving up the old and useless ones.",theme:"Rebirth"},
  {ch:2,v:47,s:"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",t:"karmaṇy evādhikāraste mā phaleṣu kadācana...",e:"You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, and never be attached to not doing your duty.",theme:"Karma Yoga"},
  {ch:2,v:48,s:"योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",t:"yogasthaḥ kuru karmāṇi...",e:"Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called Yoga.",theme:"Equanimity"},
  {ch:3,v:27,s:"प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः।\nअहङ्कारविमूढात्मा कर्ताहमिति मन्यते॥",t:"prakṛteḥ kriyamāṇāni guṇaiḥ...",e:"The soul bewildered by false ego thinks himself the doer of activities that are carried out by the three modes of material nature.",theme:"Ego"},
  {ch:3,v:35,s:"श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥",t:"śreyān svadharmo viguṇaḥ...",e:"It is far better to perform one's own duty imperfectly than to perform another's duty perfectly. Death in one's duty is preferable to another's duty which brings danger.",theme:"Svadharma"},
  {ch:4,v:7,s:"यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",t:"yadā yadā hi dharmasya glānir...",e:"Whenever and wherever there is a decline in righteousness and a rise of unrighteousness — at that time I manifest Myself.",theme:"Avatar"},
  {ch:4,v:8,s:"परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",t:"paritrāṇāya sādhūnāṃ...",e:"To deliver the pious, to annihilate the miscreants, and to reestablish the principles of righteousness, I appear millennium after millennium.",theme:"Divine Purpose"},
  {ch:6,v:5,s:"उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",t:"uddhared ātmanātmānaṃ...",e:"One must elevate oneself by one's own mind, not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.",theme:"Self-Mastery"},
  {ch:6,v:19,s:"यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता।\nयोगिनो यतचित्तस्य युञ्जतो योगमात्मनः॥",t:"yathā dīpo nivātastho neṅgate...",e:"As a lamp in a windless place does not flicker, the yogi whose mind is controlled remains always steady in his meditation.",theme:"Meditation"},
  {ch:9,v:22,s:"अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",t:"ananyāś cintayanto māṃ...",e:"To those who worship Me with exclusive devotion, meditating on My transcendental form — I carry what they lack and preserve what they have.",theme:"Devotion"},
  {ch:9,v:26,s:"पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",t:"patraṃ puṣpaṃ phalaṃ toyaṃ...",e:"If one offers Me with love and devotion a leaf, a flower, fruit or water, I will accept it.",theme:"Devotion"},
  {ch:11,v:32,s:"कालोऽस्मि लोकक्षयकृत्प्रवृद्धो\nलोकान्समाहर्तुमिह प्रवृत्तः।",t:"kālo'smi lokakṣayakṛtpravṛddho...",e:"I am Time, the great destroyer of the worlds. I have come here to destroy all people.",theme:"Cosmic Form"},
  {ch:12,v:13,s:"अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",t:"adveṣṭā sarvabhūtānāṃ...",e:"One who is not envious but is a kind friend to all living entities, free from false ego, equal in happiness and distress — such a devotee is very dear to Me.",theme:"Ideal Devotee"},
  {ch:15,v:15,s:"सर्वस्य चाहं हृदि सन्निविष्टो\nमत्तः स्मृतिर्ज्ञानमपोहनं च।",t:"sarvasya cāhaṃ hṛdi sanniviṣṭo...",e:"I am seated in everyone's heart, and from Me come remembrance, knowledge and forgetfulness. By all the Vedas, I am to be known.",theme:"Omniscience"},
  {ch:18,v:65,s:"मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे॥",t:"manmanā bhava madbhakto...",e:"Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail — I promise you this for you are dear to Me.",theme:"Devotion"},
  {ch:18,v:66,s:"सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",t:"sarvadharmān parityajya māmekaṃ...",e:"Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reaction. Do not fear.",theme:"Surrender"},
  {ch:18,v:78,s:"यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",t:"yatra yogeśvaraḥ kṛṣṇo...",e:"Wherever there is Krishna, the master of mystics, and wherever there is Arjuna, the supreme archer, there will certainly be opulence, victory, power, and morality. That is my opinion.",theme:"Conclusion"}
];

const CORE_PHILOSOPHIES = [
  { icon: "⚔️", name: "Dharma", desc: "Your righteous duty and eternal purpose" },
  { icon: "🪷", name: "Karma Yoga", desc: "The path of selfless action without attachment" },
  { icon: "🧘", name: "Jnana Yoga", desc: "The path of supreme spiritual knowledge" },
  { icon: "💛", name: "Bhakti Yoga", desc: "The path of loving devotion to the divine" },
  { icon: "🌀", name: "Atman & Brahman", desc: "The immortal soul and the supreme absolute" },
  { icon: "☯️", name: "Nishkama Karma", desc: "Action performed without selfish motives" }
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [searchVerseKeyword, setSearchVerseKeyword] = useState("");
  const [, setLocation] = useLocation();
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const filteredVerses = VERSES.filter((v) => {
    if (searchVerseKeyword) {
      const q = searchVerseKeyword.toLowerCase();
      return (
        v.theme.toLowerCase().includes(q) ||
        v.e.toLowerCase().includes(q) ||
        v.s.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAsk = async (q: string) => {
    if (!q.trim() || isSearching) return;
    setQuestion(q);
    setSearchResult(null);
    setSearchError(null);
    setIsSearching(true);
    setTimeout(() => {
      document.getElementById("oracle-answer")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    try {
      const res = await fetch(getApiUrl("/api/gita/chat/v2"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: q }] }),
      });
      if (!res.ok) throw new Error("API error");
      const data: SearchResult = await res.json();
      setSearchResult(data);
    } catch {
      setSearchError("Could not reach the Gita Oracle. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Chapters", href: "#chapters" },
    { name: "Verses", href: "#verses" },
    { name: "Teachings", href: "#teachings" },
    { name: "Ask Gita 🪷", href: "#ask" },
  ];

  const homeSeo = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AskGita.net — Bhagavad Gita",
      "alternateName": "Bhagavad Gita in Sanskrit, Hindi & English",
      "url": "https://askgita.net",
      "description": "Read the complete Bhagavad Gita — all 18 chapters and 700 shlokas in Sanskrit, Hindi, and English with AI-powered commentary.",
      "inLanguage": ["en", "hi", "sa"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://askgita.net/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Book",
      "name": "Bhagavad Gita",
      "alternateName": ["भगवद्गीता", "Srimad Bhagavad Gita", "Shrimad Bhagwat Geeta", "Gita"],
      "url": "https://askgita.net",
      "author": { "@type": "Person", "name": "Veda Vyasa" },
      "inLanguage": ["en", "hi", "sa"],
      "numberOfPages": 700,
      "genre": "Spiritual, Philosophy, Hindu Scripture",
      "description": "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata, consisting of a conversation between Prince Arjuna and Lord Krishna on duty, action, devotion, and self-knowledge.",
      "publisher": { "@type": "Organization", "name": "Gita Press Gorakhpur" },
      "workExample": [
        { "@type": "Book", "name": "Bhagavad Gita Chapter 2: Transcendent Knowledge", "url": "https://askgita.net/chapter/2" },
        { "@type": "Book", "name": "Bhagavad Gita Chapter 18: Liberation & Renunciation", "url": "https://askgita.net/chapter/18" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AskGita.net — Bhagavad Gita All 18 Chapters & 700 Shlokas",
      "url": "https://askgita.net",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://askgita.net" }]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold selection:text-dark-brown pb-16 lg:pb-0">
      <SEOHead
        title="Bhagavad Gita — All 18 Chapters & 700 Shlokas in Sanskrit, Hindi & English"
        description="Read the complete Srimad Bhagavad Gita — all 18 chapters and 700+ shlokas in Sanskrit, Hindi, and English. AI-powered commentary, word-by-word analysis, Gita Press style explanations. Ask the Gita Oracle any life question."
        canonical="/"
        keywords="bhagavad gita, bhagavad gita in hindi, bhagavad gita shlok, gita press, bhagwad geeta, srimad bhagavad gita, gita adhyay, geeta shloka, gita updesh, bhagavad gita english"
        jsonLd={homeSeo}
      />

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-dark-brown/90 backdrop-blur-md border-b border-medium-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" aria-label="AskGita.net — Bhagavad Gita Sacred Wisdom — Go to Homepage">
                <SiteLogo size="md" variant="light" />
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}
                  className="text-parchment hover:text-gold font-cinzel text-sm uppercase tracking-wider transition-colors duration-200">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-8 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1A0A02, #2E1408, #4A2010, #3A1A08)' }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[80vw] max-w-[800px] aspect-square rounded-full border border-gold/30 animate-[slowRotate_60s_linear_infinite]" />
          <div className="absolute w-[60vw] max-w-[600px] aspect-square rounded-full border border-gold/40 animate-[slowRotate_40s_linear_infinite_reverse]" />
          <div className="absolute w-[40vw] max-w-[400px] aspect-square rounded-full border border-gold/50 animate-[slowRotate_20s_linear_infinite]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          <div className="text-5xl md:text-7xl text-gold font-devanagari animate-[pulseGlow_4s_ease-in-out_infinite] leading-none">ॐ</div>
          <div className="text-base md:text-xl text-saffron font-devanagari tracking-widest mt-1">श्रीमद्भगवद्गीता</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel text-white drop-shadow-lg tracking-tight mt-1">
            Srimad Bhagavad Gita
          </h1>
          <p className="text-base md:text-xl text-gold italic font-serif opacity-90 mt-1">
            The Song of God · 5000 Years of Timeless Wisdom
          </p>
          <div className="flex items-center space-x-4 opacity-70 w-full max-w-sm mt-3 mb-4">
            <div className="h-[1px] bg-gold flex-1" />
            <span className="text-gold text-lg">❀</span>
            <div className="h-[1px] bg-gold flex-1" />
          </div>

          {/* Oracle Search Box */}
          <div id="ask" className="w-full max-w-3xl mx-auto bg-dark-brown/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gold/40 shadow-2xl">
            <div className="text-center mb-4">
              <h2 className="font-cinzel text-gold text-lg md:text-2xl tracking-widest uppercase">✦ Seek Guidance from the Gita ✦</h2>
              <p className="text-parchment/80 font-devanagari text-sm md:text-base mt-1">गीता से जीवन का उत्तर पाएं — Ask in English, हिंदी, or संस्कृत</p>
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk(question)}
                placeholder="What troubles your heart today? / आपके मन में क्या है?"
                className="w-full bg-cream/10 text-cream placeholder:text-parchment/40 border border-gold/40 rounded-full py-4 md:py-5 pl-6 pr-36 md:pr-44 focus:outline-none focus:ring-2 focus:ring-saffron text-base md:text-lg font-serif"
              />
              <button
                onClick={() => handleAsk(question)}
                disabled={isSearching || !question.trim()}
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-saffron to-gold text-dark-brown font-cinzel font-bold px-5 md:px-7 rounded-full hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm md:text-base whitespace-nowrap"
              >
                🪷 {isSearching ? "Seeking..." : "Ask the Gita"}
              </button>
            </div>

            <p className="text-center text-parchment/50 text-xs mt-2 italic font-serif">
              Supports English · हिंदी · संस्कृत — answers in your language
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Why do I suffer?", "मेरा उद्देश्य क्या है?", "What is true happiness?", "मृत्यु के बाद क्या होता है?", "How to overcome fear?", "कर्म क्या है?"].map((tag) => (
                <button key={tag} onClick={() => handleAsk(tag)}
                  className="text-xs md:text-sm bg-medium-brown/40 text-gold-light px-3 py-1.5 rounded-full border border-gold/20 hover:bg-medium-brown hover:border-gold/50 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Oracle Answer */}
        {(isSearching || searchResult || searchError) && (
          <div id="oracle-answer" className="relative z-10 w-full max-w-3xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Loading state */}
            {isSearching && (
              <div className="bg-cream/10 backdrop-blur border border-gold/30 rounded-2xl p-8 text-center">
                <div className="text-4xl text-gold/40 font-devanagari mb-3">ॐ</div>
                <div className="flex justify-center gap-1.5 mb-3">
                  <span className="w-2.5 h-2.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2.5 h-2.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="w-2.5 h-2.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
                <p className="font-cinzel text-parchment/70 text-sm uppercase tracking-widest">Seeking wisdom from the Gita…</p>
              </div>
            )}

            {/* Error state */}
            {searchError && !isSearching && (
              <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-6 text-center">
                <p className="font-serif text-parchment/80 text-base">{searchError}</p>
              </div>
            )}

            {/* Off-topic refusal */}
            {searchResult?.refused && !isSearching && (
              <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🪷</div>
                <p className="font-serif text-parchment text-base leading-relaxed mb-2">{searchResult.message}</p>
                {searchResult.messageHindi && (
                  <p className="font-devanagari text-parchment/70 text-base leading-relaxed mt-3">{searchResult.messageHindi}</p>
                )}
              </div>
            )}

            {/* Full bilingual answer */}
            {searchResult && !searchResult.refused && !isSearching && (
              <div className="bg-cream rounded-2xl border border-gold shadow-xl overflow-hidden">
                <div className="text-center py-4 px-6 border-b border-gold/20 bg-dark-brown/5">
                  <span className="font-cinzel text-saffron text-base tracking-widest uppercase">The Gita Speaks</span>
                </div>

                {/* English */}
                {searchResult.english && (
                  <div className="p-6 md:p-8 border-b border-gold/10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-cinzel text-saffron uppercase tracking-widest bg-saffron/10 px-2 py-0.5 rounded">English</span>
                    </div>
                    <p className="font-serif text-text-dark text-lg leading-relaxed">{searchResult.english}</p>
                  </div>
                )}

                {/* Hindi */}
                {searchResult.hindi && (
                  <div className="p-6 md:p-8 bg-parchment/40 border-b border-gold/10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-cinzel text-saffron uppercase tracking-widest bg-saffron/10 px-2 py-0.5 rounded">हिंदी</span>
                    </div>
                    <p className="font-devanagari text-text-dark text-lg leading-[2]">{searchResult.hindi}</p>
                  </div>
                )}

                {/* Referenced verses */}
                {searchResult.verses && searchResult.verses.length > 0 && (
                  <div className="p-5 bg-dark-brown/5">
                    <p className="text-[11px] font-cinzel text-text-muted uppercase tracking-widest mb-3">Referenced Shlokas</p>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.verses.map((v, i) => (
                        <Link
                          key={i}
                          href={`/chapter/${v.chapterId}/verse/${v.verseId}`}
                          className="group flex flex-col bg-white hover:bg-saffron/5 border border-gold/30 hover:border-saffron/60 rounded-xl px-4 py-3 transition-all cursor-pointer shadow-sm"
                        >
                          <span className="text-xs font-cinzel font-bold text-saffron group-hover:text-deep-saffron">
                            BG {v.chapterId}.{v.verseId}
                          </span>
                          {v.skt && (
                            <span className="font-devanagari text-[12px] text-text-medium leading-tight mt-1 line-clamp-1 max-w-[180px]">
                              {v.skt.split("\n")[0]}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="bg-dark-brown border-y border-medium-brown py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {["18 Chapters", "700 Shlokas", "3 Languages", "5000+ Years Old"].map((stat) => (
            <div key={stat} className="font-cinzel text-gold text-lg md:text-2xl tracking-widest flex items-center">
              <span className="mr-4 text-saffron opacity-50">✦</span>
              {stat}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verse */}
      <section className="py-24 bg-gradient-to-b from-[#1A0A02] to-[#2A1A08] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-devanagari text-3xl md:text-4xl text-saffron leading-relaxed drop-shadow-md">
            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
          </p>
          <div className="h-12 border-l border-gold/30 mx-auto my-8" />
          <p className="text-2xl md:text-3xl text-parchment font-serif italic max-w-3xl mx-auto leading-relaxed">
            "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, and never be attached to not doing your duty."
          </p>
          <div className="mt-8">
            <Link href="/chapter/2/verse/47" className="inline-block font-cinzel text-gold uppercase tracking-widest hover:text-saffron transition-colors border-b border-gold/30 hover:border-saffron pb-1">
              Bhagavad Gita · Chapter 2, Verse 47 →
            </Link>
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
              <div key={ch.n} onClick={() => setLocation(`/chapter/${ch.n}`)}
                className="cursor-pointer rounded-xl p-6 border bg-white border-gold/20 hover:border-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-medium-brown group-hover:bg-saffron text-gold-light group-hover:text-white transition-colors font-cinzel w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner">
                    {ch.n}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-text-muted uppercase tracking-wider font-cinzel mb-1">{ch.v} Shlokas</div>
                    <div className="font-devanagari text-saffron text-lg group-hover:text-deep-saffron transition-colors">{ch.skt}</div>
                  </div>
                </div>
                <h3 className="text-xl font-cinzel font-bold text-dark-brown mb-2">{ch.name}</h3>
                <p className="text-text-medium font-serif italic mb-4">{ch.meaning}</p>
                <div className="text-saffron font-cinzel text-xs uppercase tracking-wider group-hover:underline flex items-center">
                  Explore Chapter <span className="ml-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verses Section */}
      <section id="verses" className="py-24 bg-gradient-to-b from-parchment to-cream px-4 border-t border-gold/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-cinzel text-dark-brown mb-6">Sacred Shlokas</h2>
            <p className="text-text-medium font-serif text-xl max-w-2xl mx-auto">
              Explore key verses containing the essence of the Gita's wisdom.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <input
                type="text"
                value={searchVerseKeyword}
                onChange={(e) => setSearchVerseKeyword(e.target.value)}
                placeholder="Search verses by keyword or theme..."
                className="w-full bg-white border border-gold/40 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-saffron font-serif text-lg shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredVerses.map((v, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gold/20 hover:shadow-md transition-shadow group">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-gold text-dark-brown font-cinzel text-sm font-bold px-3 py-1 rounded">BG {v.ch}.{v.v}</span>
                    <span className="bg-saffron/10 text-saffron text-xs px-3 py-1 rounded-full uppercase tracking-wider font-cinzel">{v.theme}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="font-devanagari text-xl md:text-2xl text-deep-saffron leading-loose whitespace-pre-wrap">{v.s}</div>
                  <div className="space-y-4">
                    <p className="font-serif text-text-medium italic opacity-70 border-b border-gold/10 pb-4">{v.t}</p>
                    <p className="font-serif text-text-dark text-lg leading-relaxed">{v.e}</p>
                    <div className="pt-2">
                      <Link href={`/chapter/${v.ch}/verse/${v.v}`}
                        className="inline-flex items-center text-saffron font-cinzel text-sm uppercase tracking-wider group-hover:text-deep-saffron">
                        Read Detailed Explanation <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVerses.length === 0 && (
            <div className="text-center py-12 text-text-muted font-serif italic text-lg">
              No verses found matching "{searchVerseKeyword}"
            </div>
          )}
        </div>
      </section>

      {/* Core Philosophies */}
      <section id="teachings" className="py-24 bg-dark-brown text-cream px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel text-gold mb-6">Core Philosophies</h2>
            <p className="text-parchment font-serif text-xl max-w-2xl mx-auto opacity-80">
              The fundamental teachings that guide humanity towards liberation and peace.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_PHILOSOPHIES.map((phil, i) => (
              <div key={i} className="bg-medium-brown/30 backdrop-blur border border-gold/20 p-8 rounded-2xl hover:bg-medium-brown/50 transition-colors">
                <div className="text-4xl mb-4">{phil.icon}</div>
                <h3 className="text-2xl font-cinzel text-gold-light mb-3">{phil.name}</h3>
                <p className="font-serif text-parchment/80 leading-relaxed text-lg">{phil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChatbot />
    </div>
  );
}
