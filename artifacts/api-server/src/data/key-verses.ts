export interface WordMeaning {
  word: string;
  iast: string;
  hindi: string;
  english: string;
}

export interface VerseData {
  chapterId: number;
  verseId: number;
  skt: string;
  iast: string;
  hindi: string;
  english: string;
  wordByWord: WordMeaning[];
  explanation: string;
  gitaPressNote: string;
  modernRelevance: string;
  themes: string[];
}

export const KEY_VERSES: VerseData[] = [
  {
    chapterId: 2,
    verseId: 47,
    skt: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    iast: "karmaṇy evādhikāraste mā phaleṣu kadācana\nmā karmaphalaheturbhūr mā te saṅgo 'stv akarmaṇi",
    hindi:
      "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। कर्म के फल की कामना मत करो और कर्म न करने में भी आसक्ति मत रखो।",
    english:
      "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    wordByWord: [
      { word: "कर्मणि", iast: "karmaṇi", hindi: "कर्म में", english: "in action/duty" },
      { word: "एव", iast: "eva", hindi: "ही / केवल", english: "only / certainly" },
      { word: "अधिकारः", iast: "adhikāraḥ", hindi: "अधिकार", english: "right / authority" },
      { word: "ते", iast: "te", hindi: "तुम्हारा", english: "your" },
      { word: "मा", iast: "mā", hindi: "नहीं / मत", english: "never / not" },
      { word: "फलेषु", iast: "phaleṣu", hindi: "फलों में", english: "in the fruits / results" },
      { word: "कदाचन", iast: "kadācana", hindi: "कभी भी", english: "at any time / ever" },
      { word: "मा", iast: "mā", hindi: "मत", english: "do not" },
      { word: "कर्मफलहेतुः", iast: "karmaphala-hetuḥ", hindi: "कर्म के फल का कारण", english: "the cause of fruits of action" },
      { word: "भूः", iast: "bhūḥ", hindi: "बनो", english: "be / become" },
      { word: "मा", iast: "mā", hindi: "नहीं", english: "not" },
      { word: "ते", iast: "te", hindi: "तुम्हारी", english: "your" },
      { word: "सङ्गः", iast: "saṅgaḥ", hindi: "आसक्ति", english: "attachment" },
      { word: "अस्तु", iast: "astu", hindi: "हो", english: "let there be" },
      { word: "अकर्मणि", iast: "akarmaṇi", hindi: "कर्म न करने में", english: "in non-action" },
    ],
    explanation:
      "यह श्लोक भगवद्गीता का सर्वाधिक प्रसिद्ध और जीवन-परिवर्तनकारी श्लोक है। भगवान श्रीकृष्ण यहाँ कर्मयोग का मूल सिद्धान्त बताते हैं।\n\n**पहली पंक्ति का भाव:** 'कर्मण्येवाधिकारस्ते' — तुम्हारा अधिकार केवल कर्म में है। यहाँ 'एव' (केवल) शब्द बहुत महत्वपूर्ण है — यह बताता है कि मानव का एकमात्र अधिकार कर्म करने में है, फल पर नहीं। 'मा फलेषु कदाचन' — फलों में कभी नहीं। यह निषेध है — फल की अपेक्षा कभी मत करो।\n\n**दूसरी पंक्ति का भाव:** 'मा कर्मफलहेतुर्भूः' — तुम कर्म के फल के कारण मत बनो। अर्थात् फल की कामना से कर्म मत करो। 'मा ते सङ्गोऽस्त्वकर्मणि' — और कर्म न करने में भी तुम्हारी आसक्ति न हो। यहाँ भगवान दो अतियों से बचने को कह रहे हैं — फल की लालसा में कर्म करना, और कर्म ही न करना।\n\n**गीता प्रेस का भाष्य:** गीता प्रेस के अनुसार इस श्लोक में चार निर्देश हैं: (१) कर्म करो, (२) फल की इच्छा मत करो, (३) अपने को फल का कारण मत समझो, (४) कर्म न करने में भी आसक्त मत हो। यह समस्त कर्मयोग का सार है।",
    gitaPressNote:
      "गीता प्रेस गोरखपुर के श्रीमद्भगवद्गीता (अध्याय २, श्लोक ४७) के अनुसार: श्रीभगवान् कहते हैं कि कर्म करने में ही तेरा अधिकार है, फलों में कभी नहीं। अतः तू कर्मों के फल का हेतु मत बन और तेरी कर्म न करने में भी आसक्ति न हो। स्वामी रामसुखदास जी महाराज के भाष्य में: जो कार्य बिना फल की इच्छा के, केवल कर्तव्य-भाव से किया जाता है, वही शुद्ध कर्मयोग है।",
    modernRelevance:
      "आज की प्रतिस्पर्धात्मक दुनिया में यह श्लोक अत्यंत प्रासंगिक है। जब हम परीक्षा में अंकों की चिंता में पढ़ाई करते हैं, नौकरी में promotion के लिए काम करते हैं, या किसी रिश्ते में बदले की उम्मीद रखते हैं — तब हम फल में आसक्त हो जाते हैं। यह आसक्ति ही तनाव, चिंता और निराशा का मूल कारण है।\n\nकृष्ण का संदेश है: सर्वश्रेष्ठ कार्य करो, लेकिन परिणाम की चिंता छोड़ दो। एक डॉक्टर अपना सर्वश्रेष्ठ उपचार करे — फल ईश्वर के हाथ में है। एक खिलाड़ी अपना सर्वश्रेष्ठ खेल खेले — जीत या हार फिक्र की बात नहीं। यही मानसिक शांति और उत्कृष्टता का रहस्य है।",
    themes: ["Karma Yoga", "Detachment", "Duty", "Non-attachment to Results", "Action"],
  },
  {
    chapterId: 2,
    verseId: 20,
    skt: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
    iast: "na jāyate mriyate vā kadācin\nnāyaṃ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śāśvato'yaṃ purāṇo\nna hanyate hanyamāne śarīre",
    hindi:
      "यह आत्मा कभी जन्म नहीं लेती और न ही मरती है। यह पहले थी और बाद में होगी — ऐसा नहीं है; यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के मारे जाने पर यह नहीं मारी जाती।",
    english:
      "The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
    wordByWord: [
      { word: "न", iast: "na", hindi: "नहीं", english: "not / never" },
      { word: "जायते", iast: "jāyate", hindi: "जन्म लेती है", english: "is born" },
      { word: "म्रियते", iast: "mriyate", hindi: "मरती है", english: "dies" },
      { word: "वा", iast: "vā", hindi: "या", english: "or" },
      { word: "कदाचित्", iast: "kadācit", hindi: "कभी भी", english: "at any time" },
      { word: "अयम्", iast: "ayam", hindi: "यह (आत्मा)", english: "this (soul)" },
      { word: "भूत्वा", iast: "bhūtvā", hindi: "होकर", english: "having been" },
      { word: "भविता", iast: "bhavitā", hindi: "होगी", english: "will come into being" },
      { word: "अजः", iast: "ajaḥ", hindi: "अजन्मा", english: "unborn" },
      { word: "नित्यः", iast: "nityaḥ", hindi: "नित्य / सदा", english: "eternal" },
      { word: "शाश्वतः", iast: "śāśvataḥ", hindi: "शाश्वत", english: "ever-existing / permanent" },
      { word: "पुराणः", iast: "purāṇaḥ", hindi: "पुरातन / प्राचीन", english: "primeval / ancient" },
      { word: "न हन्यते", iast: "na hanyate", hindi: "नहीं मारी जाती", english: "is not slain" },
      { word: "हन्यमाने", iast: "hanyamāne", hindi: "मारे जाने पर", english: "when being slain" },
      { word: "शरीरे", iast: "śarīre", hindi: "शरीर के", english: "the body" },
    ],
    explanation:
      "यह श्लोक आत्मा की प्रकृति का सबसे स्पष्ट और गहन वर्णन करता है। भगवान श्रीकृष्ण यहाँ आत्मा के छः विशेषण बताते हैं:\n\n**१. अज (Unborn):** आत्मा का जन्म नहीं होता। जो जन्म लेता है वह शरीर है — आत्मा तो पहले से थी।\n\n**२. नित्य (Eternal):** आत्मा काल से परे है। समय इसे प्रभावित नहीं कर सकता।\n\n**३. शाश्वत (Ever-existing):** इसका अस्तित्व सदा था, है, और रहेगा। यह कभी बाधित नहीं होता।\n\n**४. पुराण (Primeval):** आत्मा सबसे पुरातन है — यह सृष्टि से भी पहले की है।\n\n**५. अनश्वर:** शरीर के नष्ट होने पर भी आत्मा का नाश नहीं होता।\n\n**गीता प्रेस व्याख्या:** स्वामी रामसुखदास जी के अनुसार — आत्मा तीन कालों में (भूत, वर्तमान, भविष्य में) कभी उत्पन्न नहीं होती और न कभी नष्ट होती है। यह श्लोक आत्मा की पाँच प्रमुख विशेषताओं का संक्षेप है।",
    gitaPressNote:
      "गीता प्रेस भाष्य (अध्याय २, श्लोक २०): यह आत्मा त्रिकाल में भी न जन्म लेती है और न मरती है। पहले था, अब नहीं है और आगे होगा — यह भी नहीं है। यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के नाश होने पर भी यह नाश नहीं पाती।",
    modernRelevance:
      "जब हम किसी प्रिय को खोते हैं तो असह्य दुख होता है। यह श्लोक कहता है — शरीर नष्ट होता है, आत्मा नहीं। मृत्यु केवल एक पड़ाव है, अंत नहीं। मृत्यु का भय कम करने के लिए, जीवन को गहराई से जीने के लिए, और आत्मा की अमरता को समझने के लिए यह ज्ञान अनिवार्य है।\n\nआधुनिक मनोचिकित्सा में grief counseling में भी इसी विचार का उपयोग होता है — consciousness continues. यह श्लोक भारतीय चिंतन की सबसे महान देन है।",
    themes: ["Atman", "Immortality of Soul", "Death", "Eternal Nature", "Consciousness"],
  },
  {
    chapterId: 2,
    verseId: 22,
    skt: "वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णा-\nन्यन्यानि संयाति नवानि देही॥",
    iast: "vāsāṃsi jīrṇāni yathā vihāya\nnavāni gṛhṇāti naro'parāṇi\ntathā śarīrāṇi vihāya jīrṇāny\nanyāni saṃyāti navāni dehī",
    hindi:
      "जैसे मनुष्य पुराने वस्त्रों को छोड़कर नए वस्त्र ग्रहण करता है, वैसे ही आत्मा पुराने शरीरों को छोड़कर नए शरीर धारण करती है।",
    english:
      "Just as a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
    wordByWord: [
      { word: "वासांसि", iast: "vāsāṃsi", hindi: "वस्त्र", english: "garments / clothes" },
      { word: "जीर्णानि", iast: "jīrṇāni", hindi: "पुराने / जीर्ण", english: "old / worn out" },
      { word: "यथा", iast: "yathā", hindi: "जैसे", english: "just as" },
      { word: "विहाय", iast: "vihāya", hindi: "छोड़कर", english: "giving up / abandoning" },
      { word: "नवानि", iast: "navāni", hindi: "नए", english: "new" },
      { word: "गृह्णाति", iast: "gṛhṇāti", hindi: "ग्रहण करता है", english: "accepts / takes" },
      { word: "नरः", iast: "naraḥ", hindi: "मनुष्य", english: "a person / man" },
      { word: "तथा", iast: "tathā", hindi: "वैसे ही", english: "similarly / in the same way" },
      { word: "शरीराणि", iast: "śarīrāṇi", hindi: "शरीरों को", english: "bodies" },
      { word: "विहाय", iast: "vihāya", hindi: "छोड़कर", english: "giving up" },
      { word: "जीर्णानि", iast: "jīrṇāni", hindi: "पुराने", english: "worn out / old" },
      { word: "अन्यानि", iast: "anyāni", hindi: "दूसरे / नए", english: "other / new" },
      { word: "संयाति", iast: "saṃyāti", hindi: "चला जाता है / प्राप्त करता है", english: "goes to / obtains" },
      { word: "नवानि", iast: "navāni", hindi: "नए", english: "new" },
      { word: "देही", iast: "dehī", hindi: "आत्मा / देहधारी", english: "the embodied soul" },
    ],
    explanation:
      "यह श्लोक पुनर्जन्म के सिद्धान्त को एक सुंदर और सरल उपमा से समझाता है — वस्त्र बदलने की उपमा।\n\n**उपमा का गहरा अर्थ:** जब कोई व्यक्ति अपने पुराने, जीर्ण-शीर्ण वस्त्र उतारता है, तो क्या वह दुखी होता है? नहीं — क्योंकि वह जानता है कि वह स्वयं नष्ट नहीं हो रहा, केवल वस्त्र बदल रहा है। ठीक इसी प्रकार मृत्यु पर आत्मा शोक नहीं करती — यह केवल शरीर-रूपी वस्त्र बदल रही है।\n\n**दार्शनिक महत्व:** यह उपमा तीन गहरे तथ्य उजागर करती है:\n(१) शरीर और आत्मा अलग हैं — जैसे वस्त्र और वस्त्र पहनने वाला अलग हैं\n(२) मृत्यु अंत नहीं — यह एक बदलाव है\n(३) आत्मा का कोई नाश नहीं होता\n\n**गीता प्रेस की व्याख्या:** यह श्लोक आत्मा की निरंतरता और शरीर की अनित्यता का सर्वोत्तम उदाहरण है। पुराने वस्त्र जैसे नष्ट होते हैं वैसे शरीर नष्ट होता है, पर वस्त्र पहनने वाले (आत्मा) का नाश नहीं होता।",
    gitaPressNote:
      "गीता प्रेस भाष्य: जैसे मनुष्य पुराने वस्त्रों को छोड़कर दूसरे नए वस्त्र ग्रहण करता है, वैसे ही जीवात्मा पुराने शरीरों को छोड़कर दूसरे नए शरीरों को प्राप्त होती है। यह उपमा शोक निवारण के लिए दी गई है।",
    modernRelevance:
      "जब कोई प्रिय व्यक्ति मृत्यु को प्राप्त होता है, तो हम जानते हैं वस्त्र बदला है — वह आत्मा नहीं गई। यह ज्ञान grief को resolve करने में सहायक है। जो लोग near-death experiences में चेतना की निरंतरता अनुभव करते हैं, वे इसी सत्य की पुष्टि करते हैं।",
    themes: ["Rebirth", "Reincarnation", "Death", "Atman", "Soul Continuity"],
  },
  {
    chapterId: 4,
    verseId: 7,
    skt: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    iast: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham",
    hindi:
      "हे भारत! जब-जब धर्म की हानि होती है और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं को प्रकट करता हूँ।",
    english:
      "Whenever and wherever there is a decline in righteousness and a rise of unrighteousness, O Bharata, at that time I manifest Myself.",
    wordByWord: [
      { word: "यदा यदा", iast: "yadā yadā", hindi: "जब-जब / जब भी", english: "whenever / at every time that" },
      { word: "हि", iast: "hi", hindi: "निश्चित ही", english: "certainly / indeed" },
      { word: "धर्मस्य", iast: "dharmasya", hindi: "धर्म की", english: "of righteousness / dharma" },
      { word: "ग्लानिः", iast: "glāniḥ", hindi: "हानि / क्षय", english: "decline / diminishment" },
      { word: "भवति", iast: "bhavati", hindi: "होती है", english: "occurs / happens" },
      { word: "भारत", iast: "bhārata", hindi: "हे भारत (अर्जुन)", english: "O Bharata (Arjuna)" },
      { word: "अभ्युत्थानम्", iast: "abhyutthānam", hindi: "उत्थान / वृद्धि", english: "rise / ascendancy" },
      { word: "अधर्मस्य", iast: "adharmasya", hindi: "अधर्म की", english: "of unrighteousness / adharma" },
      { word: "तदा", iast: "tadā", hindi: "तब", english: "then / at that time" },
      { word: "आत्मानम्", iast: "ātmānam", hindi: "अपने आप को", english: "Myself / self" },
      { word: "सृजामि", iast: "sṛjāmi", hindi: "प्रकट करता हूँ / उत्पन्न करता हूँ", english: "I manifest / create" },
      { word: "अहम्", iast: "aham", hindi: "मैं", english: "I" },
    ],
    explanation:
      "यह श्लोक अवतार-सिद्धान्त (Avatar Doctrine) का आधार है — यह बताता है कि भगवान इस संसार में कब और क्यों अवतार लेते हैं।\n\n**'यदा यदा' — जब-जब:** यह शब्द-युग्म बताता है कि यह घटना बार-बार घटती है, एक बार नहीं। हर युग में जब धर्म का क्षय होता है, भगवान अवतरित होते हैं।\n\n**धर्म की ग्लानि क्या है?** जब समाज में:\n- सत्य का अपमान हो\n- शोषण और अन्याय फैले\n- आत्मज्ञान की उपेक्षा हो\n- नैतिक मूल्यों का पतन हो\nतब धर्म की ग्लानि होती है।\n\n**'आत्मानं सृजामि' — स्वयं को प्रकट करता हूँ:** भगवान किसी बाहरी शक्ति के आदेश से नहीं, अपनी स्वतंत्र इच्छा से अवतार लेते हैं। यह उनकी करुणा का प्रमाण है।\n\n**अगले श्लोक (४.८) में पूर्ण प्रयोजन:** साधुओं की रक्षा, दुष्टों का विनाश, और धर्म की पुनःस्थापना।",
    gitaPressNote:
      "गीता प्रेस गोरखपुर: यह श्लोक भगवान के अवतार-ग्रहण का कारण बताता है। भगवान् का अवतार स्वेच्छा से होता है, जन्म-मरण के कारण से नहीं। 'सृजामि' का अर्थ है — मैं अपनी योगमाया से प्रकट होता हूँ।",
    modernRelevance:
      "इतिहास में जब-जब अत्याचार की पराकाष्ठा हुई, तब-तब किसी महापुरुष का उदय हुआ — चाहे वह राम हों, कृष्ण हों, बुद्ध हों, या महात्मा गाँधी। यह श्लोक यह भी प्रेरणा देता है कि हर युग में 'अवतार' — सच्चे नेतृत्व — की सम्भावना है। जब अन्याय हो, तो प्रतीक्षा करो — सत्य की शक्ति अवश्य प्रकट होती है।",
    themes: ["Avatar Doctrine", "Divine Intervention", "Dharma", "Righteousness", "God's Grace"],
  },
  {
    chapterId: 18,
    verseId: 66,
    skt: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    iast: "sarvadharmān parityajya māmekaṃ śaraṇaṃ vraja\nahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ",
    hindi:
      "सभी धर्मों को छोड़कर केवल मेरी शरण में आ जाओ। मैं तुम्हें समस्त पापों से मुक्त कर दूँगा — शोक मत करो।",
    english:
      "Abandon all varieties of dharma and simply surrender unto Me alone. I shall deliver you from all sinful reactions; do not fear.",
    wordByWord: [
      { word: "सर्वधर्मान्", iast: "sarvadharmān", hindi: "सभी धर्मों को", english: "all varieties of dharma / duties" },
      { word: "परित्यज्य", iast: "parityajya", hindi: "छोड़कर / त्यागकर", english: "abandoning / giving up" },
      { word: "माम्", iast: "mām", hindi: "मुझे", english: "Me (God)" },
      { word: "एकम्", iast: "ekam", hindi: "केवल / एक", english: "alone / only" },
      { word: "शरणम्", iast: "śaraṇam", hindi: "शरण में", english: "refuge / shelter" },
      { word: "व्रज", iast: "vraja", hindi: "जाओ / आओ", english: "go / come / take" },
      { word: "अहम्", iast: "aham", hindi: "मैं", english: "I" },
      { word: "त्वा", iast: "tvā", hindi: "तुझे / तुम्हें", english: "you" },
      { word: "सर्वपापेभ्यः", iast: "sarvapāpebhyaḥ", hindi: "समस्त पापों से", english: "from all sins / all sinful reactions" },
      { word: "मोक्षयिष्यामि", iast: "mokṣayiṣyāmi", hindi: "मुक्त कर दूँगा", english: "I shall liberate / deliver" },
      { word: "मा", iast: "mā", hindi: "मत", english: "do not" },
      { word: "शुचः", iast: "śucaḥ", hindi: "शोक करो / दुखी होओ", english: "grieve / fear / sorrow" },
    ],
    explanation:
      "यह गीता का 'चरम श्लोक' है — सम्पूर्ण गीता का सार इसी में समाहित है। भगवान श्रीकृष्ण ने यह अपना अंतिम, सर्वोच्च उपदेश अर्जुन को दिया।\n\n**'सर्वधर्मान् परित्यज्य' का वास्तविक अर्थ:** यहाँ सभी धर्मों को छोड़ने का अर्थ यह नहीं कि नैतिकता, कर्तव्य और मर्यादाएँ छोड़ दो। इसका अर्थ है — अपने किसी भी आचरण, पुण्य या धार्मिक कृत्य को अपनी मुक्ति का कारण मत समझो। सब कुछ ईश्वर को सौंप दो।\n\n**'मामेकं शरणम् व्रज' — पूर्ण शरणागति:** यह शरण कायरता नहीं, बल्कि सर्वोच्च साहस है। जब मनुष्य अपने अहंकार को भगवान के चरणों में रख देता है, तो वह सच्चा स्वतंत्र हो जाता है।\n\n**'अहं त्वा मोक्षयिष्यामि' — भगवान का वचन:** यह वादा है — न संभावना, न शर्त। 'मैं मुक्त कर दूँगा' — यह Divine Guarantee है।\n\n**'मा शुचः' — डरो मत:** गीता की शुरुआत में अर्जुन का शोक था, और अंत में भगवान कहते हैं — शोक मत करो। यह वृत्त पूरा होता है।",
    gitaPressNote:
      "गीता प्रेस भाष्य: यह गीता का सर्वोत्कृष्ट श्लोक है जिसे 'चरम श्लोक' कहते हैं। सभी साधनाओं का परित्याग करके केवल भगवान् की शरण लेना ही सर्वश्रेष्ठ उपाय है। स्वामी रामसुखदासजी: 'सर्वधर्मान्' से अभिप्राय है कि साधक अपने किसी भी साधन, साधना, पुण्य या कर्म को अपनी मुक्ति का हेतु न माने।",
    modernRelevance:
      "जीवन में कभी-कभी ऐसे क्षण आते हैं जब हमारे सभी प्रयास विफल हो जाते हैं। नौकरी जाती है, रिश्ते टूटते हैं, स्वास्थ्य बिगड़ता है। उस क्षण भगवान कह रहे हैं — छोड़ दो सब, मेरे पास आओ। यह 'letting go' आधुनिक मनोविज्ञान की सबसे बड़ी थेरेपी है। अहंकार को समर्पित करना — यही तनाव का अंत है।",
    themes: ["Surrender", "Liberation", "Divine Grace", "Final Teaching", "Prapatti"],
  },
  {
    chapterId: 9,
    verseId: 22,
    skt: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    iast: "ananyāś cintayanto māṃ ye janāḥ paryupāsate\nteṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmy aham",
    hindi:
      "जो भक्त अनन्य भाव से मेरा चिन्तन करते हुए मेरी उपासना करते हैं, उन नित्ययुक्त भक्तों का योगक्षेम मैं स्वयं वहन करता हूँ।",
    english:
      "For those who worship Me with devotion, meditating on My transcendental form — to those ever-devoted ones, I carry what they lack and preserve what they have.",
    wordByWord: [
      { word: "अनन्याः", iast: "ananyāḥ", hindi: "अनन्य / एकमात्र मुझमें", english: "exclusive / undivided (devotees)" },
      { word: "चिन्तयन्तः", iast: "cintayantaḥ", hindi: "चिन्तन करते हुए", english: "meditating / thinking" },
      { word: "माम्", iast: "mām", hindi: "मुझे / मेरा", english: "Me" },
      { word: "ये", iast: "ye", hindi: "जो", english: "those who" },
      { word: "जनाः", iast: "janāḥ", hindi: "लोग / भक्त", english: "people / devotees" },
      { word: "पर्युपासते", iast: "paryupāsate", hindi: "उपासना करते हैं", english: "worship / serve" },
      { word: "तेषाम्", iast: "teṣām", hindi: "उनका", english: "for those" },
      { word: "नित्याभियुक्तानाम्", iast: "nityābhiyuktānām", hindi: "नित्य-युक्त / सदा समर्पित", english: "ever-devoted / always engaged" },
      { word: "योगक्षेमम्", iast: "yogakṣemam", hindi: "योग (न मिले को दिलाना) और क्षेम (मिले को बनाए रखना)", english: "welfare (getting what one lacks + protecting what one has)" },
      { word: "वहामि", iast: "vahāmi", hindi: "वहन करता हूँ / उठाता हूँ", english: "I carry / bear / look after" },
      { word: "अहम्", iast: "aham", hindi: "मैं", english: "I" },
    ],
    explanation:
      "यह श्लोक भक्ति की सर्वोच्च आश्वासन है — भगवान स्वयं कह रहे हैं कि वे अपने भक्त की देखभाल करते हैं।\n\n**'योगक्षेम' का विशेष अर्थ:**\n- **योग** = जो चाहिए वह दिलाना (acquisition of what is needed)\n- **क्षेम** = जो मिला है उसकी रक्षा करना (preservation of what is acquired)\nइसीलिए बीमा कंपनियों ने LIC का नाम 'योगक्षेम' रखा — जो तुम्हारे पास नहीं है वह दिलाएँगे, जो है उसकी रक्षा करेंगे।\n\n**'अनन्याः' — अनन्य भक्ति:**\nयह वह भक्ति है जो केवल एक परमात्मा पर केन्द्रित है — न संसार की चाहत, न दूसरे देवताओं की उपासना। मन, वचन, कर्म से केवल एक की भक्ति।\n\n**'वहाम्यहम्' — मैं स्वयं वहन करता हूँ:**\nभगवान कहते हैं 'मैं स्वयं' — किसी दूत को नहीं भेजते, स्वयं आते हैं। यह अद्वितीय आश्वासन है।",
    gitaPressNote:
      "गीता प्रेस भाष्य: 'योगक्षेमं वहाम्यहम्' — यह भगवान् की सर्वोच्च प्रतिज्ञा है। जो भक्त एकमात्र भगवान् के आश्रित हैं, उनका प्राप्य और प्राप्त दोनों का भार भगवान् स्वयं वहन करते हैं।",
    modernRelevance:
      "जब जीवन में सब साथ छोड़ दें, परिवार असहाय हो, सरकार न सुने — उस समय यह श्लोक कहता है: जो ईश्वर की शरण में है, उसका 'insurance' ईश्वर के पास है। यह विश्वास की शक्ति है जो असाध्य परिस्थितियों में भी मनुष्य को खड़ा रखती है।",
    themes: ["Devotion", "Divine Protection", "Bhakti Yoga", "God's Promise", "Trust"],
  },
  {
    chapterId: 6,
    verseId: 5,
    skt: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    iast: "uddhared ātmanātmānaṃ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
    hindi:
      "अपने मन के द्वारा अपना उद्धार करो, अपने को अधोगति में मत डालो। यह मन ही अपना मित्र है और यही अपना शत्रु भी है।",
    english:
      "One must elevate oneself by one's own mind, not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.",
    wordByWord: [
      { word: "उद्धरेत्", iast: "uddharet", hindi: "उद्धार करे / ऊपर उठाए", english: "must elevate / should uplift" },
      { word: "आत्मना", iast: "ātmanā", hindi: "अपने (मन) द्वारा", english: "by oneself / by one's own mind" },
      { word: "आत्मानम्", iast: "ātmānam", hindi: "अपने आप को", english: "oneself" },
      { word: "न", iast: "na", hindi: "नहीं", english: "not" },
      { word: "आत्मानम्", iast: "ātmānam", hindi: "स्वयं को", english: "oneself" },
      { word: "अवसादयेत्", iast: "avasādayet", hindi: "अधोगति में डाले / नष्ट करे", english: "degrade / ruin / bring down" },
      { word: "आत्मा एव", iast: "ātmaiva", hindi: "मन ही", english: "the mind itself / the self itself" },
      { word: "हि", iast: "hi", hindi: "निश्चित ही", english: "certainly / indeed" },
      { word: "आत्मनः", iast: "ātmanaḥ", hindi: "अपना", english: "of oneself" },
      { word: "बन्धुः", iast: "bandhuḥ", hindi: "मित्र / बन्धु", english: "friend / well-wisher" },
      { word: "आत्मा एव", iast: "ātmaiva", hindi: "मन ही", english: "the mind itself" },
      { word: "रिपुः", iast: "ripuḥ", hindi: "शत्रु", english: "enemy / foe" },
    ],
    explanation:
      "यह श्लोक आत्म-जिम्मेदारी (self-responsibility) का सर्वोच्च उदघोष है। भगवान कहते हैं — तुम्हारी नियति तुम्हारे हाथ में है।\n\n**'उद्धरेदात्मनात्मानम्' — आत्म-उद्धार:**\nकोई दूसरा तुम्हें नहीं बचा सकता। गुरु मार्ग दिखा सकते हैं, शास्त्र ज्ञान दे सकते हैं, भगवान कृपा कर सकते हैं — पर अंतिम यात्रा तुम्हें स्वयं करनी है। तुम्हारा मन ही तुम्हारा सबसे बड़ा साथी है।\n\n**'आत्मैव ह्यात्मनो बन्धुः' — मन मित्र है:**\nजब मन शुद्ध, एकाग्र और नियंत्रित होता है — यह सबसे बड़ा मित्र है। यह तुम्हें सत्य की ओर ले जाता है, परमात्मा के करीब लाता है।\n\n**'आत्मैव रिपुरात्मनः' — मन शत्रु भी है:**\nजब मन अशुद्ध, विक्षिप्त और अनियंत्रित होता है — यह सबसे बड़ा शत्रु है। यही तुम्हें क्रोध, लोभ, काम में धकेलता है।\n\n**व्यावहारिक अर्थ:** अगले श्लोक में बताया गया है — जिसने मन को जीत लिया उसका मन मित्र है; जिसने नहीं जीता उसके लिए वह शत्रु की तरह काम करता है।",
    gitaPressNote:
      "गीता प्रेस भाष्य: मनुष्य अपने मन की सहायता से अपना उद्धार कर सकता है और अपने मन के कारण अपनी अधोगति भी कर सकता है। अतः मनुष्य को चाहिए कि वह मन को वश में करके उसे मित्र बनाए।",
    modernRelevance:
      "मनोविज्ञान (psychology) में यही कहते हैं — mindset determines destiny. Self-sabotage (अपनी ही बर्बादी) हम अपने मन से करते हैं। Cognitive Behavioral Therapy का मूल सिद्धान्त इसी श्लोक में है — तुम्हारे विचार तुम्हारी वास्तविकता बनाते हैं। मन को प्रशिक्षित करो — meditation, discipline, positive thought — यही आधुनिक life coaching का सार है।",
    themes: ["Self-Mastery", "Mind Control", "Self-Responsibility", "Mind as Friend/Enemy", "Meditation"],
  },
  {
    chapterId: 12,
    verseId: 13,
    skt: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
    iast: "adveṣṭā sarvabhūtānāṃ maitraḥ karuṇa eva ca\nnirmamo nirahaṃkāraḥ samaduḥkhasukhaḥ kṣamī",
    hindi:
      "जो समस्त प्राणियों से द्वेष नहीं करता, सबका मित्र और दयालु है, ममता-रहित और अहंकार-रहित है, सुख-दुख में समान रहता है और क्षमाशील है — वह मुझे प्रिय है।",
    english:
      "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor, who is free from false ego and equal in both happiness and distress, who is forgiving — such a devotee is very dear to Me.",
    wordByWord: [
      { word: "अद्वेष्टा", iast: "adveṣṭā", hindi: "द्वेष न करने वाला", english: "non-envious / free from hatred" },
      { word: "सर्वभूतानाम्", iast: "sarvabhūtānām", hindi: "सभी प्राणियों का", english: "of all living beings" },
      { word: "मैत्रः", iast: "maitraḥ", hindi: "मित्र / मैत्रीभावी", english: "friendly / benevolent" },
      { word: "करुणः", iast: "karuṇaḥ", hindi: "दयालु / करुणामय", english: "compassionate / merciful" },
      { word: "एव च", iast: "eva ca", hindi: "और भी", english: "also / certainly" },
      { word: "निर्ममः", iast: "nirmamaḥ", hindi: "ममता-रहित", english: "free from possessiveness / ego of 'mine'" },
      { word: "निरहङ्कारः", iast: "nirahaṃkāraḥ", hindi: "अहंकार-रहित", english: "free from false ego" },
      { word: "समदुःखसुखः", iast: "samaduḥkhasukhaḥ", hindi: "सुख-दुख में समान", english: "equal in happiness and distress" },
      { word: "क्षमी", iast: "kṣamī", hindi: "क्षमाशील", english: "forgiving / patient" },
    ],
    explanation:
      "यह भागवत-धर्म का आदर्श मानव-चरित्र है। भगवान कहते हैं — यही गुण रखने वाला भक्त मुझे प्रिय है।\n\n**अष्टविध गुण:**\n१. **अद्वेष्टा** — किसी से द्वेष नहीं\n२. **मैत्रः** — सबका मित्र\n३. **करुणः** — दयालु\n४. **निर्ममः** — 'मेरा-मेरा' की भावना नहीं\n५. **निरहंकारः** — 'मैं बड़ा हूँ' का अभिमान नहीं\n६. **समदुःखसुखः** — दुख में घबराना नहीं, सुख में फूलना नहीं\n७. **क्षमी** — अपमान सहने की शक्ति\n\n**यह दुर्लभ क्यों है?** क्योंकि ये गुण केवल भक्ति से आते हैं — तर्क से नहीं, नाटक से नहीं। जब परमात्मा को प्रेम होता है, तो उनकी सृष्टि के प्रति भी प्रेम स्वाभाविक हो जाता है।",
    gitaPressNote:
      "गीता प्रेस भाष्य: भगवान् अपने प्रिय भक्त के लक्षण बता रहे हैं। ये गुण भक्ति के फल हैं — इन्हें धारण करने की चेष्टा करनी चाहिए।",
    modernRelevance:
      "आज जब हर तरफ नफरत, अहंकार, और असहिष्णुता है — यह श्लोक विश्व-नागरिकता का आदर्श है। Emotional Intelligence (EQ) की सबसे ऊँची अवस्था यही है — empathy, compassion, forgiveness, और equanimity। यही true leadership का स्वरूप है।",
    themes: ["Ideal Devotee", "Compassion", "Non-violence", "Equanimity", "Bhakti Yoga", "Character"],
  },
];

export function getKeyVerse(chapterId: number, verseId: number): VerseData | undefined {
  return KEY_VERSES.find((v) => v.chapterId === chapterId && v.verseId === verseId);
}
