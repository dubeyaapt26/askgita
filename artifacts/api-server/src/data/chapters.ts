export interface ChapterData {
  id: number;
  name: string;
  skt: string;
  meaning: string;
  totalVerses: number;
  summary: string;
  longSummary: string;
  themes: string[];
  keyVerseRef: string;
  setting: string;
}

export const CHAPTERS: ChapterData[] = [
  {
    id: 1,
    name: "Arjuna's Dilemma",
    skt: "अर्जुनविषादयोग",
    meaning: "Yoga of Arjuna's Dejection",
    totalVerses: 47,
    summary:
      "On the battlefield of Kurukshetra, Arjuna is overwhelmed by grief and moral confusion as he prepares to fight his own kinsmen. He lays down his bow and surrenders to Krishna.",
    longSummary:
      "The Bhagavad Gita opens on the battlefield of Kurukshetra where two armies — the Pandavas and the Kauravas — stand ready for war. King Dhritarashtra asks his charioteer Sanjaya to describe what is happening on the field. Arjuna, the supreme warrior among the Pandavas, asks his charioteer Krishna to drive his chariot between the two armies. Seeing his relatives, teachers, and beloved friends ready to fight, Arjuna is overwhelmed by profound grief and moral confusion. His limbs fail him, his bow slips from his hands, and he sinks into his chariot seat. He argues that victory in such a war would bring no happiness, for it would be stained by the blood of family and preceptors. He is the first man in history to raise the question of Ahimsa — nonviolence — in the context of war and duty. This chapter sets the stage for Krishna's entire teaching.",
    themes: ["Grief", "Moral Confusion", "Dharma", "Non-violence", "Duty", "Kinship"],
    keyVerseRef: "Chapter 1, Verse 47",
    setting:
      "The holy field of Kurukshetra (dharmakshetra kurukshetra), where the two armies of Pandavas and Kauravas assembled for the great battle.",
  },
  {
    id: 2,
    name: "Transcendent Knowledge",
    skt: "सांख्ययोग",
    meaning: "Yoga of Knowledge (Sankhya)",
    totalVerses: 72,
    summary:
      "Krishna begins His teaching by explaining the eternal nature of the soul (Atman). He then introduces karma yoga — the path of desireless action and equanimity — as the means to liberation.",
    longSummary:
      "This is the most central chapter of the Gita, containing the essence of its entire philosophy. Krishna rebukes Arjuna for his unmanliness and begins with the foundational truth: the soul is eternal, unborn, undying. Just as a person changes clothes, the soul takes on new bodies at death. Weapons cannot cut it, fire cannot burn it, water cannot wet it, wind cannot dry it. From this basis, Krishna teaches that since the soul is imperishable, Arjuna has no reason to grieve. He then introduces the doctrine of karma yoga — acting without attachment to results. 'You have a right to work, but not to the fruits thereof' is perhaps the most famous verse in world literature. Krishna also describes the characteristics of the sthitaprajna — the person of steady wisdom — as the ideal to strive toward.",
    themes: [
      "Atman",
      "Immortality of Soul",
      "Karma Yoga",
      "Sankhya Philosophy",
      "Equanimity",
      "Sthitaprajna",
      "Detachment",
    ],
    keyVerseRef: "Chapter 2, Verse 47",
    setting: "The battlefield of Kurukshetra, in Arjuna's chariot between the two armies.",
  },
  {
    id: 3,
    name: "Path of Action",
    skt: "कर्मयोग",
    meaning: "Yoga of Action",
    totalVerses: 43,
    summary:
      "Krishna clarifies that action is superior to inaction. Everyone must act according to their nature. Performing one's prescribed duty without selfish desire is the highest path.",
    longSummary:
      "Arjuna is confused — if knowledge is superior to action, why does Krishna urge him to fight? Krishna explains that no one can remain without action even for a moment. The body itself forces action through its three modes of nature (gunas). The wise perform their duties as a sacrifice, not for personal gain, thus keeping the cosmic wheel turning. God Himself, though He has nothing to gain, continues to act — so must we. Every person acts according to their own nature; suppressing it only breeds inner conflict. The real enemy is desire born of rajas (passion), which clouds wisdom like smoke covers fire. Arjuna must conquer this inner enemy before any outer battle. Acting in accordance with one's svadharma (own duty), even imperfectly, is better than performing another's duty.",
    themes: [
      "Action vs. Inaction",
      "Svadharma",
      "Sacrifice",
      "Three Gunas",
      "Desire as Enemy",
      "Cosmic Duty",
    ],
    keyVerseRef: "Chapter 3, Verse 35",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 4,
    name: "Wisdom in Action",
    skt: "ज्ञानकर्मसंन्यासयोग",
    meaning: "Yoga of Knowledge, Action and Renunciation",
    totalVerses: 42,
    summary:
      "Krishna reveals that He has taught this wisdom to the sun god in ancient times. He explains the mystery of His divine birth and action. Whenever righteousness declines, He descends.",
    longSummary:
      "Krishna discloses that He transmitted this eternal yoga to the sun god Vivasvan at the beginning of creation, and it was passed through a line of kings until it was lost. Now He teaches it again to Arjuna, His devotee and friend. Arjuna questions how Krishna, born in the present age, could have taught the ancient sun god. Krishna reveals one of the Gita's most profound secrets: He is unborn and eternal, yet He appears in the world through His own divine power (maya) whenever dharma declines and adharma rises, to protect the good, destroy the wicked, and re-establish righteousness — 'yuge yuge.' He also teaches that all paths of sacrifice — whether giving away wealth, studying scriptures, practicing austerities, or cultivating knowledge — ultimately lead to God. The boat of knowledge ferries one across all sins.",
    themes: [
      "Avatar Doctrine",
      "Divine Birth",
      "Yajna (Sacrifice)",
      "Knowledge as Purifier",
      "Ancient Wisdom",
      "Dharma Protection",
    ],
    keyVerseRef: "Chapter 4, Verse 7",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 5,
    name: "True Renunciation",
    skt: "कर्मसंन्यासयोग",
    meaning: "Yoga of Renunciation of Action",
    totalVerses: 29,
    summary:
      "Krishna reconciles the paths of sannyasa (renunciation) and karma yoga, showing they lead to the same goal. The wise person acts while renouncing inwardly, experiencing the bliss of Brahman.",
    longSummary:
      "Arjuna asks Krishna which is better — renunciation of action or performance of action? Krishna says both lead to the supreme good, but karma yoga (action in renunciation) is superior to mere renunciation, which is difficult without active engagement. The person who has renounced internally — who performs all actions as an offering, unattached to results — is truly a sannyasi, even while acting in the world. The enlightened soul, even while seeing, touching, smelling, eating, moving, sleeping, and breathing, holds 'I do nothing at all' — for it is only the senses interacting with their objects. Such a person reaches Brahman-nirvana, the supreme peace. Krishna also describes the marks of the liberated sage: equal in honor and dishonor, equal to friend and foe, acting without ego.",
    themes: [
      "Sannyasa",
      "Karma Yoga",
      "Brahman-nirvana",
      "Inner Renunciation",
      "Equanimity",
      "Liberation in Action",
    ],
    keyVerseRef: "Chapter 5, Verse 10",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 6,
    name: "Self-Mastery",
    skt: "ध्यानयोग",
    meaning: "Yoga of Meditation",
    totalVerses: 47,
    summary:
      "Krishna teaches the complete science of meditation, describing posture, breath, diet, and mental discipline. The mind is both friend and enemy. The yogi who masters the mind achieves supreme peace.",
    longSummary:
      "This chapter gives the most systematic description of yoga practice in the Gita. The true sannyasi is one who does their duty without depending on the fruits of work — not one who has given up fire and activity. For achieving the summit of yoga, action is the means; for one who has already reached the peak, equanimity is the means. The yogi should have a fixed, clean seat, practice breath control, and fix the mind between the eyebrows. Diet should be moderate — not too much nor too little eating, sleeping, or recreation. The mind, which is notoriously difficult to control — more turbulent than the wind — must be gradually brought under control through practice and detachment. If a yogi falls from the path, they are born again in a noble family and continue their journey. The greatest yogi is the devotee who keeps Krishna in their heart.",
    themes: [
      "Dhyana (Meditation)",
      "Mind Control",
      "Yoga Practice",
      "Diet and Lifestyle",
      "Liberation through Practice",
      "Supreme Devotee",
    ],
    keyVerseRef: "Chapter 6, Verse 5",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 7,
    name: "Knowledge of the Absolute",
    skt: "ज्ञानविज्ञानयोग",
    meaning: "Yoga of Knowledge and Wisdom",
    totalVerses: 30,
    summary:
      "Krishna reveals His higher and lower natures — the eight elements of matter and the living force that sustains all creation. He is the seed of all beings, the essence behind everything.",
    longSummary:
      "Krishna promises to teach Arjuna the most secret knowledge, knowing which nothing remains to be known. He describes His two natures: the lower (apara prakriti) consisting of eight elements — earth, water, fire, air, space, mind, intellect, and ego — and the higher (para prakriti), which is the living energy that sustains all life. Both these natures spring from Him. He is the taste in water, the light of the sun and moon, the sound in ether, the ability in human beings. There is nothing that exists apart from Him. Yet beings, deluded by the three modes, do not know Him. Four types of people turn to God — the distressed, the seeker of wealth, the inquisitive, and the knower of truth. Among all, the knower of Brahman who worships with pure devotion is most dear to God.",
    themes: [
      "Para and Apara Prakriti",
      "Divine Immanence",
      "Maya",
      "Four Types of Devotees",
      "Knowledge of Brahman",
    ],
    keyVerseRef: "Chapter 7, Verse 8",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 8,
    name: "The Eternal Brahman",
    skt: "अक्षरब्रह्मयोग",
    meaning: "Yoga of the Imperishable Brahman",
    totalVerses: 28,
    summary:
      "Krishna explains the cosmic nature of Brahman, the self, karma, and death. Whatever one thinks at the moment of death determines one's next destination. One who thinks of Krishna at death attains Him.",
    longSummary:
      "Arjuna asks seven questions: What is Brahman? What is the self? What is karma? Who is the adhibhuta, adhidaiva, and adhiyajna? How does one know God at death? Krishna answers each carefully. Brahman is the indestructible; the self (adhyatma) is one's own nature; karma is the creative force. At the time of death, whoever remembers Krishna alone attains His nature — there is no doubt. This is the profound teaching of the chapter: 'Whatever state of being one remembers when quitting the body — that alone he will attain.' Thus one should practice remembering God at all times so that at death too, His thought naturally arises. The cosmic cycles of creation and dissolution are described — the day and night of Brahma, each lasting millions of years. Those who reach God's supreme abode do not return to this world of suffering.",
    themes: [
      "Brahman",
      "Death and Liberation",
      "Thought at Death",
      "Cosmic Cycles",
      "Supreme Abode",
      "Yoga in Daily Life",
    ],
    keyVerseRef: "Chapter 8, Verse 7",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 9,
    name: "The Royal Secret",
    skt: "राजविद्याराजगुह्ययोग",
    meaning: "Yoga of Sovereign Science and Secret",
    totalVerses: 34,
    summary:
      "Krishna reveals the most secret and royal knowledge: the universe rests in Him yet He is not in it. He sustains all beings as the wind rests in space. Pure devotion — even offering a leaf with love — He accepts.",
    longSummary:
      "This chapter contains the 'king of all knowledge and king of all secrets.' Krishna explains the paradox of His relationship with the universe: all beings rest in Him, yet He is not in them — just as the mighty wind, moving everywhere, rests always in space. He is the father of this universe, the mother, the sustainer, the grandfather. He is the Om, the Rigveda, the Samaveda. He is the ritual, the sacrifice, the herb, the mantra. Both those who worship other gods and those who worship Him reach Him ultimately — for He is the enjoyer of all sacrifices. The most touching verse: 'If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.' This is the supreme democracy of devotion — the path open to all regardless of caste or status. Arjuna is advised to surrender all actions to Krishna.",
    themes: [
      "Royal Knowledge",
      "Divine Paradox",
      "Universal Devotion",
      "Surrender",
      "Accessibility of God",
      "All-pervading Brahman",
    ],
    keyVerseRef: "Chapter 9, Verse 26",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 10,
    name: "Divine Manifestations",
    skt: "विभूतियोग",
    meaning: "Yoga of Divine Glories",
    totalVerses: 42,
    summary:
      "Krishna lists His divine manifestations — among the Vedas He is Sama Veda, among warriors He is Ram, among months He is Margashirsha, among seasons He is flower-bearing spring.",
    longSummary:
      "This chapter is a magnificent catalogue of divine manifestations. Krishna explains that He is the source of all things — neither gods nor great sages know His origin. Among all beings, He is their consciousness (chetana). He then lists his specific manifestations: among the Adityas He is Vishnu, among lights He is the radiant sun, among the Maruts He is Marichi, among stars He is the moon. Among the Vedas He is Sama Veda; among gods He is Indra; among the senses He is the mind; among living beings He is consciousness. Among the Rudras He is Shankara; among the Yakshas He is Kubera; among the Vasus He is fire; among mountains He is Meru. I am Brihaspati among priests, Skanda among army generals, the ocean among bodies of water. Among letters I am the letter A. I am the gambling of cheaters, the splendor of the splendid. Wherever there is opulence, beauty, or power — know that it has sprung from a spark of My glory.",
    themes: [
      "Vibhuti (Divine Manifestations)",
      "God in Creation",
      "Omnipresence",
      "Awe and Wonder",
      "Divine Immanence",
    ],
    keyVerseRef: "Chapter 10, Verse 20",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 11,
    name: "The Cosmic Vision",
    skt: "विश्वरूपदर्शनयोग",
    meaning: "Yoga of the Universal Form",
    totalVerses: 55,
    summary:
      "Arjuna is granted divine sight and beholds the infinite, terrifying cosmic form of Krishna — with thousands of arms, faces, eyes, and mouths, blazing with divine light, swallowing all the warriors.",
    longSummary:
      "This is the most visually overwhelming chapter of the Gita — the theophany (divine vision). Arjuna asks to see Krishna's divine form and is granted special divine sight. What he sees is indescribable: a form with thousands of mouths, eyes, wonderful sights, divine ornaments and weapons, wearing divine garlands and garments, anointed with divine perfumes, all-wonderful, resplendent, infinite, with faces on all sides. As a thousand suns blazing in the sky simultaneously — such was the splendor of that great being. Arjuna sees all the warriors on both sides rushing into the multiple mouths of this cosmic form, like moths rushing into a flame. Terrified, Arjuna begs Krishna to return to His gentle four-armed Vishnu form. Krishna explains: 'I am Time, the great destroyer of worlds.' He reassures Arjuna that this form is seen only through pure devotion, not by Vedic study or austerities.",
    themes: [
      "Vishwarupa (Cosmic Form)",
      "Theophany",
      "Time as Destroyer",
      "Divine Vision",
      "Awe and Terror",
      "Bhakti as Key",
    ],
    keyVerseRef: "Chapter 11, Verse 32",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 12,
    name: "The Path of Devotion",
    skt: "भक्तियोग",
    meaning: "Yoga of Devotion",
    totalVerses: 20,
    summary:
      "Krishna declares that pure devotion with love (bhakti) is the supreme path. He describes the characteristics of the ideal devotee — one who is free from malice, friendly, compassionate, free from ego.",
    longSummary:
      "Arjuna asks: which is better — the devotee who worships the personal form of God, or the one who worships the unmanifest, imperishable Brahman? Krishna answers clearly: those who fix their minds on His personal form with supreme faith are the best yogis. Worshipping the unmanifest is more difficult for embodied beings. Krishna then sets out a ladder of practice for those who cannot maintain continuous devotion: first try constant practice; if that is hard, dedicate all actions to God; if even that is difficult, control the mind and renounce the results of all actions. Most importantly, Krishna describes the marks of the ideal devotee in some of the most beautiful verses of the Gita — one who neither hates nor craves, who is equal in honor and dishonor, equal to friend and foe, free from ego, grief, and fear. Such a devotee is supremely dear to God.",
    themes: [
      "Bhakti Yoga",
      "Personal vs Impersonal God",
      "Ideal Devotee",
      "Ladder of Devotion",
      "Love and Surrender",
    ],
    keyVerseRef: "Chapter 12, Verse 13",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 13,
    name: "Field & Its Knower",
    skt: "क्षेत्रक्षेत्रज्ञविभागयोग",
    meaning: "Yoga of Distinction between Field and Knower",
    totalVerses: 35,
    summary:
      "Krishna teaches the distinction between the body (the field) and the soul (the knower of the field). True knowledge is seeing God equally in all beings — in the learned Brahmin, the cow, the elephant, the dog.",
    longSummary:
      "This chapter begins a new section of the Gita focusing on the philosophical foundation of liberation. The body is called the 'field' (kshetra) and the one who knows it — the soul — is the 'knower of the field' (kshetrajna). The supreme Knower of all fields is God Himself. The field consists of the great elements, ego, intellect, the unmanifest, the ten senses, the five sense objects, desire, aversion, pleasure, pain, the aggregate of the body, consciousness, and fortitude. True knowledge involves twenty qualities including humility, absence of pride, non-violence, forbearance, straightforwardness, service to the teacher, purity, steadfastness, self-control. The object of knowledge is the supreme Brahman, which is neither existent nor non-existent. It sees through all sense organs but has no sense organs; it is unattached yet sustains all. Understanding the distinction between the field and its knower — seeing God in all beings equally — leads to the supreme.",
    themes: [
      "Kshetra and Kshetrajna",
      "Body and Soul",
      "Qualities of Knowledge",
      "God in All Beings",
      "Liberation through Discrimination",
    ],
    keyVerseRef: "Chapter 13, Verse 27",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 14,
    name: "Three Qualities of Nature",
    skt: "गुणत्रयविभागयोग",
    meaning: "Yoga of Division of Three Qualities",
    totalVerses: 27,
    summary:
      "Krishna explains the three modes of material nature — sattva (goodness), rajas (passion), and tamas (ignorance) — and how they bind the soul. Transcending all three leads to liberation.",
    longSummary:
      "This chapter reveals the three gunas — the three qualities that constitute all of material nature and bind all embodied souls. Sattva (goodness) binds through happiness and knowledge; rajas (passion) binds through desire and attachment; tamas (ignorance) binds through negligence, laziness, and sleep. When sattva predominates, the light of wisdom shines through all the gates of the body. When rajas predominates, greed, endeavor, undertaking of actions, restlessness, and longing arise. When tamas prevails, darkness, inertia, negligence, and delusion arise. At death, if one dies in sattva, they attain the higher worlds; if in rajas, they take birth among those attached to action; if in tamas, they are reborn in the animal kingdom. One who transcends the three gunas — undisturbed in the modes, unaffected by their coming and going — is called a gunatita, the liberated one. Such a person sees God with the boat of devotion and realizes the immortal Brahman.",
    themes: [
      "Three Gunas",
      "Sattva",
      "Rajas",
      "Tamas",
      "Transcending Nature",
      "Liberation",
      "Gunatita",
    ],
    keyVerseRef: "Chapter 14, Verse 19",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 15,
    name: "The Supreme Person",
    skt: "पुरुषोत्तमयोग",
    meaning: "Yoga of the Supreme Being",
    totalVerses: 20,
    summary:
      "Krishna describes the ashvattha tree (the eternal world) with roots above and branches below — a metaphor for material existence. He then reveals the identity of the supreme Purushottama who transcends both the perishable and the imperishable.",
    longSummary:
      "This relatively short but philosophically dense chapter begins with the famous metaphor of the ashvattha (sacred fig) tree. The imperishable tree of material existence has roots upward and branches downward — its roots are the Vedas. One must cut this tree with the axe of detachment and seek that supreme abode from which there is no return. There are two categories of beings in this world — the perishable (kshara, all bodies in material nature) and the imperishable (akshara, the liberated). But there is a third — the Supreme Person (Purushottama), who transcends both. This Supreme Person — God — pervades the three worlds and sustains them. He is the light of lights beyond the darkness, the knower of all, the source of all knowledge. 'I am seated in everyone's heart; from Me come memory, knowledge, and forgetfulness.' One who knows God as the Supreme Person — having come to full wisdom — is liberated.",
    themes: [
      "Ashvattha Tree",
      "Kshara and Akshara",
      "Purushottama",
      "God as Inner Light",
      "Transcendence",
      "Omniscience",
    ],
    keyVerseRef: "Chapter 15, Verse 15",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 16,
    name: "Divine & Demonic Natures",
    skt: "दैवासुरसम्पद्विभागयोग",
    meaning: "Yoga of Division of Divine and Demonic Qualities",
    totalVerses: 24,
    summary:
      "Krishna describes two types of human nature — the divine (daivi), which leads to liberation, and the demoniac (asuri), which leads to bondage. Divine qualities include fearlessness, purity, compassion, and charity.",
    longSummary:
      "This chapter gives a detailed moral taxonomy of human nature. Divine qualities (daivi sampat) that lead to liberation include: fearlessness, purity of mind, perseverance in spiritual practice, charity, self-control, sacrifice, study of scripture, austerity, straightforwardness, non-violence, truthfulness, freedom from anger, renunciation, tranquility, freedom from fault-finding, compassion, freedom from greed, gentleness, modesty, and steadiness. These are born in those destined for liberation. Demoniac qualities (asuri sampat) that lead to bondage include: hypocrisy, arrogance, pride, anger, harshness, and ignorance. These are born in those destined for bondage. The demoniac deny God, consider the universe a product of chance and lust, and live only for sense gratification. The triple gate of hell — lust, anger, and greed — destroys the soul. One must abandon these and be guided by scriptural injunction.",
    themes: [
      "Daivi Sampat",
      "Asuri Sampat",
      "Virtue and Vice",
      "Triple Gate of Hell",
      "Scriptural Authority",
      "Liberation and Bondage",
    ],
    keyVerseRef: "Chapter 16, Verse 1",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 17,
    name: "Three Kinds of Faith",
    skt: "श्रद्धात्रयविभागयोग",
    meaning: "Yoga of Division of Threefold Faith",
    totalVerses: 28,
    summary:
      "Krishna teaches that faith (shraddha) takes three forms according to one's nature — sattvic, rajasic, or tamasic. Even food, sacrifice, austerity, and charity are of three kinds accordingly.",
    longSummary:
      "Faith (shraddha) is the most powerful force in a person's life — 'As a man's faith is, so is he.' Faith too is of three kinds determined by one's predominant mode of nature. Those of sattvic nature worship the gods; those of rajasic nature worship the yakshas and rakshasas; those of tamasic nature worship ghosts and spirits. Food preferences also reveal one's nature: sattvic people prefer foods that promote longevity, virtue, strength, health, happiness, and joy — foods that are juicy, fatty, substantial, and pleasant. Rajasic people prefer bitter, sour, salty, pungent, harsh, and burning foods that cause pain. Tamasic people prefer stale, tasteless, putrid, leftover, and unclean foods. Similarly, sacrifice, austerity (tapas), and charity (dana) are described as sattvic, rajasic, or tamasic. Any act of charity, sacrifice, or austerity done without faith — even if scripturally prescribed — is called 'asat' (unreal) and is of no benefit here or hereafter.",
    themes: [
      "Shraddha (Faith)",
      "Threefold Division",
      "Sattvic Worship",
      "Food and Character",
      "Austerity and Charity",
      "Tapas",
    ],
    keyVerseRef: "Chapter 17, Verse 3",
    setting: "The battlefield of Kurukshetra.",
  },
  {
    id: 18,
    name: "Liberation & Renunciation",
    skt: "मोक्षसंन्यासयोग",
    meaning: "Yoga of Liberation by Renunciation",
    totalVerses: 78,
    summary:
      "The final and longest chapter synthesizes all teachings. Krishna defines sannyasa and tyaga, describes the five causes of action, the three types of knowledge and action, and concludes with the most secret teaching: total surrender to God.",
    longSummary:
      "The grand conclusion of the Gita begins with Arjuna asking the difference between sannyasa (renunciation) and tyaga (abandonment). Krishna explains: sannyasa is giving up desire-motivated action; tyaga is giving up the fruits of all action. All action should be performed as duty, giving up attachment and fruit. Krishna then synthesizes all of philosophy: the five causes of action (body, ego, senses, effort, and the divine), three kinds of knowledge, action, and doer (sattvic, rajasic, tamasic), three kinds of understanding and determination, and four social orders. After this synthesis, he delivers the most secret verse: 'Abandon all varieties of dharma and just surrender unto Me alone. I shall deliver you from all sins. Do not fear.' This is the heart of the Gita — not as a call to inaction but to the highest trust in God. Krishna tells Arjuna this knowledge must not be shared with one who has no faith, and is the most confidential of all. Arjuna declares his delusion is gone and he will do as God commands. Sanjaya concludes that wherever Krishna and Arjuna are, there is opulence, victory, power, and morality.",
    themes: [
      "Sannyasa and Tyaga",
      "Surrender (Prapatti)",
      "Five Causes of Action",
      "Final Secret Teaching",
      "Liberation",
      "Conclusion",
    ],
    keyVerseRef: "Chapter 18, Verse 66",
    setting: "The battlefield of Kurukshetra.",
  },
];
