import type { Lang } from '@/contexts/LanguageContext';

const T = {
  en: {
    nav: { model: 'Model', map: 'Map', about: 'About' },
    footer: {
      main: 'Delhi Eco-Flow · Led and founded by Ramzi Abdulahi · AES Unit 4 Social Action Project · 2026',
      tagline: '40 years of waste seen now. Reduce, Reuse, Stop littering.',
    },
    hero: {
      label: 'Delhi has dumped today',
      sub: 'approximate kg of waste into its landfills',
    },
    factors: {
      heading: "Many factors make Delhi's waste problem harder to solve",
      items: [
        {
          label: 'Geographical',
          body: "Delhi is surrounded by mountains, and during winter, low temperatures trap pollutants close to the ground, making any burning of waste even worse.",
        },
        {
          label: 'Economic',
          body: "Delhi's population is growing at 2.63% per year, meaning trash is rising. More people means more waste, faster than the city can build systems to handle it.",
          source: 'arXiv, 2025',
        },
        {
          label: 'Political',
          body: "Waste management in Delhi is split among the Delhi corporations, the Delhi government, and the central government, which can lead to confusion and gaps in accountability.",
        },
      ],
    },
    home: {
      factStrip: [
        { number: '75m', fact: 'The Ghazipur garbage mountain, expected to rise higher than the Taj Mahal' },
        { number: '40+', fact: 'Years this crisis has been building. The landfills were never closed.' },
        { number: '400', fact: 'Families living beside the trash mountain, breathing toxic fumes every day' },
      ],
      humanCost: {
        heading: 'The human cost',
        intro: "The people most affected are waste pickers and their families. Without their work, done for free every day, the city's recycling system would not function. At Eco-Flow, we see them as the foundation of any real solution.",
        stats: [
          { number: '400', label: 'Families living beside the Ghazipur trash mountain. Our campaign treats them as partners, not problems.' },
          { number: '24%', label: "Of Delhi's winter air pollution comes from organic waste alone." },
          { number: '₹10M', label: 'Rupees saved every day by waste pickers who work without pay. Eco-Flow wants them formally employed.' },
          { number: '2M', label: "People die from air pollution every year. Delhi's burning waste is a direct contributor our campaign addresses." },
        ],
      },
      mission: {
        heading: 'The mission',
        intro: 'This crisis has been building for more than 40 years. At Eco-Flow, we believe fixing it starts with community awareness and household action, not expensive machines.',
        pillars: [
          {
            eyebrow: '01. The problem',
            title: 'A city drowning in waste',
            desc: "Delhi never built a proper waste system. Landfills opened in the 1980s and 1990s were meant to be temporary and never closed. The garbage mountain at Ghazipur is around 75 meters tall. Burning waste is one of the main causes of Delhi's air pollution, and our team has witnessed the scale of it.",
          },
          {
            eyebrow: '02. Our plan',
            title: 'A 3-step response',
            desc: 'First: our campaign visits local schools, targeting two to three this year with translators for non-English-speaking students. Second: we are designing a new household bin system. Third: we are building an ethical waste-to-energy prototype to present to the government for funding.',
          },
          {
            eyebrow: '03. Our goal',
            title: 'Community as the solution',
            desc: 'Past efforts failed because money went to machines instead of people. We have reached out to the Chintan Organization and plan to engage the UN. Real progress means treating waste pickers as partners and building community awareness around Reduce, Reuse, Recycle.',
          },
        ],
        readMore: 'Read more about the approach',
      },
      support: {
        heading: 'Support this work',
        body: 'Delhi Eco-Flow is a student-led campaign based at the American Embassy School, New Delhi. Your support funds school visits, translators for non-English-speaking students, and the development of our ethical waste-to-energy prototype for government presentation.',
        donate: 'Donate',
      },
      whereNext: {
        heading: 'Where to next',
        links: [
          { title: 'See the model', desc: 'The ethical waste-to-energy system, step by step.' },
          { title: 'Find drop-off points', desc: 'E-waste, composting, and recycling locations across Delhi.' },
          { title: 'What you can do', desc: 'Five actions any Delhi resident can take right now.' },
        ],
      },
      contact: {
        heading: 'Get in touch',
        body: 'Questions, corrections, data tips, or collaboration ideas. Our team wants to hear from you.',
      },
    },
    about: {
      heading: 'About Delhi Eco-Flow',
      story: [
        "Delhi Eco-Flow is a student-led campaign founded at the American Embassy School in New Delhi, led and founded by Ramzi Abdulahi. What began as a Unit 4 Social Action Project became a full campaign to tackle the city's 40-year waste crisis.",
        "Delhi produces around 10,000 tonnes of waste every day. The city's landfills were meant to be temporary and never closed. The garbage mountain at Ghazipur is around 75 meters tall and expected to rise higher than the Taj Mahal. Our team has seen this firsthand.",
        "What shaped our campaign was learning about waste pickers. Around 400 families live beside the trash mountain, breathing toxic fumes every day. They save the city an estimated 10 million rupees a day, for free, without pay or protection. When the waste-to-energy plant opened, machines burned recyclables before pickers could collect them. At Eco-Flow, we treat waste pickers as partners, not problems.",
        "Our plan: visit two to three local schools this year (we provide translators for non-English-speaking students), design a household bin system, and build an ethical waste-to-energy prototype to present to the government for funding. We have reached out to the Chintan Organization and plan to engage the UN. This site is step one.",
      ],
      sourcesHeading: 'Research & sources',
      acknowledgementsHeading: 'Acknowledgments',
      acknowledgements: [
        { org: 'Down To Earth', desc: ', reporting on waste pickers and landfill communities, foundational to our understanding of the human side of this crisis' },
        { org: 'Ryan J. Hite', desc: ', on-the-ground reporting from inside Ghazipur landfill' },
        { org: 'Chintan Environmental Research and Action Group', desc: ', whose work on waste picker rights has shaped our campaign approach' },
        { org: 'Earth5R', desc: ", research on circular economy approaches and Delhi's pollution crisis" },
        { org: 'AES teachers', desc: ', for guidance on the Social Action Project framework' },
      ],
      contactHeading: 'Contact',
      contactBody: 'Questions, corrections, data tips, or collaboration with our campaign: ',
      actionsHeading: 'What you can do',
      actionsSub: 'Five actions any Delhi resident can take. Our campaign starts here, and so can yours.',
      actions: [
        {
          title: 'Segregate your waste at home',
          desc: "Keep two bins: one for wet waste (food, peels) and one for dry waste (paper, plastic, metal, glass). It is already the law under India's Solid Waste Management Rules 2016, and it costs nothing.",
        },
        {
          title: 'Stop burning waste',
          desc: "Burning waste is one of the main causes of Delhi's air pollution. Organic waste alone makes up about 24% of Delhi's winter air pollution. Do not burn waste at home or in your neighbourhood.",
        },
        {
          title: 'Respect waste pickers',
          desc: 'Waste pickers save the city an estimated 10 million rupees a day by recycling, for free, every day. Treat them with respect, do not block their work, and support paying them fairly.',
        },
        {
          title: 'Refuse, Reduce, Reuse, Recycle',
          desc: 'Before throwing something away, ask: can I refuse it? Reduce how much I use? Reuse it? Recycle it? The UN Environment Program says this approach is what actually works.',
        },
        {
          title: 'Ask questions',
          desc: "The government promised to clear Delhi's landfills by 2028. Six years into the project, the landfills have barely shrunk. Ask your ward councillor what progress is actually being made.",
        },
      ],
    },
    model: {
      eyebrow: 'The Ethical Model',
      heading: 'How the system could work',
      subtitle: 'At Eco-Flow, this is the ethical system our campaign is designing and fighting for.',
      binEyebrow: 'The bin system',
      binHeading: 'It starts at home',
      binDesc: 'Our campaign is designing a three-bin system for Delhi households. Every stream is separated before it leaves the door.',
      comparisonEyebrow: 'Comparison',
      comparisonHeading: 'What makes it ethical?',
      currentLabel: 'Current system',
      modelLabel: 'Ethical model',
      currentPoints: [
        'Waste mixed at source, nothing separated',
        'Waste pickers work for free with no protection',
        'Landfills overflow and catch fire',
        'WTE incinerators burn recyclables, releasing toxic smoke',
      ],
      modelPoints: [
        'Three streams separated at every household',
        'Waste pickers formally employed with wages and safety gear',
        'Organic waste goes to biogas and compost, not landfill',
        'WTE plant only burns true residual, far less pollution',
      ],
      coreEyebrow: 'The core idea',
      coreHeading: 'Waste pickers are not the problem.',
      coreHeading2: 'They are the solution.',
      coreBody: "At Delhi Eco-Flow, we've learned that the city's informal waste pickers already run the recycling system for free, every single day. Our campaign isn't about replacing them with machines. It's about employing them formally, paying them fairly, and building the system around the knowledge they already have.",
    },
    flowSteps: [
      {
        id: 'generation', step: 1, title: 'Generation',
        intended: "Households separate wet waste, dry waste, and hazardous materials at home. Delhi's Solid Waste Management Rules 2016 legally require this.",
        reality: "Most households mix everything into one bag. The rules exist on paper — enforcement does not.",
        gap: 'Segregation fails before the waste even leaves the home.',
      },
      {
        id: 'segregation', step: 2, title: 'Segregation',
        intended: 'Collection workers sort recyclables from residual waste. Wet and dry streams are kept separate.',
        reality: 'Informal waste pickers do most of this sorting without pay or protection. The government spends money on incinerators instead of supporting the people doing the actual work.',
        gap: 'The system depends on informal labour it refuses to pay.',
      },
      {
        id: 'collection', step: 3, title: 'Collection',
        intended: 'Door-to-door vehicles collect segregated waste on regular daily routes across all parts of the city.',
        reality: 'Coverage is inconsistent. Responsibility is split between multiple government bodies, leading to gaps and no clear accountability.',
        gap: 'Divided responsibility means no one is accountable when collection fails.',
      },
      {
        id: 'transport', step: 4, title: 'Transport',
        intended: 'Transfer stations sort waste and route each stream to the right processing facility.',
        reality: 'Even when residents sort correctly, wet and dry waste often ends up in the same vehicle, undoing all household effort.',
        gap: 'Transfer stations undo household segregation before waste reaches processing.',
      },
      {
        id: 'processing', step: 5, title: 'Processing',
        intended: 'Organic waste goes to compost or biogas. Dry recyclables go to recovery facilities.',
        reality: "Most of Delhi's waste is burned or sent to waste-to-energy incinerators that release more CO2 than they save. Organic waste alone causes about 24% of Delhi's winter air pollution.",
        gap: 'Both burning and current WTE release toxic chemicals. Neither is a real solution.',
      },
      {
        id: 'disposal', step: 6, title: 'Disposal',
        intended: 'Only true residual waste reaches landfill. Sites are managed and capped to prevent fires.',
        reality: 'Mixed, untreated waste is dumped every day at three landfills that officially reached capacity in 2008 and have never closed. The garbage mountain stands around 75 meters tall.',
        gap: 'The landfill is not the end of the chain. It is the failure of every step before it.',
      },
    ],
  },

  hi: {
    nav: { model: 'मॉडल', map: 'नक्शा', about: 'हमारे बारे में' },
    footer: {
      main: 'Delhi Eco-Flow · रमज़ी अब्दुलाही द्वारा स्थापित · AES Unit 4 सामाजिक कार्य परियोजना · 2026',
      tagline: '40 साल का कचरा अब दिख रहा है। कम करो, पुनः उपयोग करो, कचरा मत फेंको।',
    },
    hero: {
      label: 'दिल्ली ने आज फेंका',
      sub: 'अनुमानित किलोग्राम कचरा लैंडफिल में',
    },
    factors: {
      heading: 'दिल्ली की कचरा समस्या को हल करना कई कारणों से मुश्किल है',
      items: [
        {
          label: 'भौगोलिक',
          body: 'दिल्ली पहाड़ों से घिरी है, और सर्दियों में, कम तापमान प्रदूषकों को ज़मीन के पास फंसा देता है, जिससे कचरा जलाना और भी खतरनाक हो जाता है।',
        },
        {
          label: 'आर्थिक',
          body: 'दिल्ली की जनसंख्या हर साल 2.63% की दर से बढ़ रही है, यानी कचरा भी बढ़ रहा है। ज़्यादा लोग मतलब ज़्यादा कचरा, शहर की व्यवस्था से तेज़।',
          source: 'arXiv, 2025',
        },
        {
          label: 'राजनीतिक',
          body: 'दिल्ली में कचरा प्रबंधन दिल्ली निगम, दिल्ली सरकार और केंद्र सरकार के बीच बंटा है, जिससे भ्रम और जवाबदेही में कमी हो सकती है।',
        },
      ],
    },
    home: {
      factStrip: [
        { number: '75m', fact: 'गाजीपुर का कचरे का पहाड़, जो ताज महल से भी ऊंचा होने की राह पर है' },
        { number: '40+', fact: 'साल से यह संकट बढ़ता आ रहा है। लैंडफिल कभी बंद नहीं हुए।' },
        { number: '400', fact: 'परिवार कचरे के पहाड़ के पास रहते हैं, हर रोज़ जहरीले धुएं में सांस लेते हैं' },
      ],
      humanCost: {
        heading: 'इंसानी कीमत',
        intro: 'सबसे ज़्यादा प्रभावित कचरा बीनने वाले और उनके परिवार हैं। उनके बिना, जो हर रोज़ मुफ्त में काम करते हैं, शहर की रीसाइक्लिंग व्यवस्था काम नहीं करती। Eco-Flow में हम उन्हें किसी भी असली समाधान की नींव मानते हैं।',
        stats: [
          { number: '400', label: 'परिवार गाजीपुर के कचरे के पहाड़ के पास रहते हैं। हमारा अभियान उन्हें साझेदार मानता है, समस्या नहीं।' },
          { number: '24%', label: 'दिल्ली के सर्दियों के वायु प्रदूषण का यह हिस्सा सिर्फ जैविक कचरे से आता है।' },
          { number: '₹10M', label: 'रुपये हर रोज़ कचरा बीनने वाले बचाते हैं, बिना वेतन। Eco-Flow उन्हें औपचारिक रोजगार दिलाना चाहता है।' },
          { number: '2M', label: 'लोग हर साल वायु प्रदूषण से मरते हैं। दिल्ली का जलता कचरा सीधा कारण है जिसे हमारा अभियान संबोधित करता है।' },
        ],
      },
      mission: {
        heading: 'हमारा मिशन',
        intro: 'यह संकट 40 से अधिक वर्षों से बनता आ रहा है। Eco-Flow में हमारा मानना है कि इसे ठीक करने की शुरुआत सामुदायिक जागरूकता और घरेलू कदमों से होती है, महंगी मशीनों से नहीं।',
        pillars: [
          {
            eyebrow: '01. समस्या',
            title: 'कचरे में डूबता शहर',
            desc: 'दिल्ली ने कभी उचित कचरा प्रबंधन नहीं बनाया। 1980 और 1990 के दशक में खुले लैंडफिल कभी बंद नहीं हुए। गाजीपुर का कचरे का पहाड़ करीब 75 मीटर ऊंचा है। कचरा जलाना दिल्ली के प्रदूषण का मुख्य कारण है, और हमारी टीम ने इसका पैमाना खुद देखा है।',
          },
          {
            eyebrow: '02. हमारी योजना',
            title: 'तीन-चरण की प्रतिक्रिया',
            desc: 'पहला: हमारा अभियान स्थानीय स्कूलों में जाता है, इस साल दो से तीन स्कूलों को लक्ष्य बनाकर, गैर-हिंदी बोलने वाले छात्रों के लिए अनुवादकों के साथ। दूसरा: हम एक नई घरेलू बिन प्रणाली बना रहे हैं। तीसरा: हम सरकारी फंडिंग के लिए एक नैतिक कचरा-से-ऊर्जा प्रोटोटाइप बना रहे हैं।',
          },
          {
            eyebrow: '03. हमारा लक्ष्य',
            title: 'समुदाय ही समाधान है',
            desc: 'पिछले प्रयास इसलिए विफल हुए क्योंकि पैसा मशीनों पर गया, लोगों पर नहीं। हमने Chintan Organization से संपर्क किया है और UN से जुड़ने की योजना है। असली प्रगति का मतलब कचरा बीनने वालों को साझेदार मानना है।',
          },
        ],
        readMore: 'हमारे दृष्टिकोण के बारे में और पढ़ें',
      },
      support: {
        heading: 'इस काम को सहयोग दें',
        body: 'Delhi Eco-Flow अमेरिकन एम्बेसी स्कूल, नई दिल्ली पर आधारित एक छात्र-नेतृत्व अभियान है। आपका समर्थन स्कूल दौरों, गैर-अंग्रेजी बोलने वाले छात्रों के लिए अनुवादकों और सरकारी प्रस्तुति के लिए हमारे प्रोटोटाइप के विकास को वित्तपोषित करता है।',
        donate: 'दान करें',
      },
      whereNext: {
        heading: 'आगे कहाँ जाएं',
        links: [
          { title: 'मॉडल देखें', desc: 'नैतिक कचरा-से-ऊर्जा प्रणाली, चरण दर चरण।' },
          { title: 'ड्रॉप-ऑफ पॉइंट खोजें', desc: 'दिल्ली भर में ई-कचरा, कंपोस्टिंग और रीसाइक्लिंग स्थान।' },
          { title: 'आप क्या कर सकते हैं', desc: 'कोई भी दिल्ली निवासी अभी पांच कदम उठा सकता है।' },
        ],
      },
      contact: {
        heading: 'संपर्क करें',
        body: 'प्रश्न, सुधार, डेटा टिप्स, या हमारे अभियान के साथ सहयोग। हमारी टीम आपसे सुनना चाहती है।',
      },
    },
    about: {
      heading: 'Delhi Eco-Flow के बारे में',
      story: [
        'Delhi Eco-Flow अमेरिकन एम्बेसी स्कूल, नई दिल्ली में स्थापित एक छात्र-नेतृत्व अभियान है, जिसे रमज़ी अब्दुलाही ने शुरू किया। यह Unit 4 सामाजिक कार्य परियोजना से शुरू हुआ और शहर के 40 साल के कचरा संकट से लड़ने का पूरा अभियान बन गया।',
        'दिल्ली हर रोज़ करीब 10,000 टन कचरा पैदा करती है। शहर के लैंडफिल अस्थायी माने जाते थे और कभी बंद नहीं हुए। गाजीपुर का कचरे का पहाड़ करीब 75 मीटर ऊंचा है और ताज महल से भी ऊंचा होने की राह पर है। हमारी टीम ने यह अपनी आंखों से देखा है।',
        'हमारे अभियान को आकार देने में कचरा बीनने वालों की कहानी ने बड़ी भूमिका निभाई। करीब 400 परिवार कचरे के पहाड़ के पास रहते हैं, हर रोज़ जहरीले धुएं में सांस लेते हैं। वे शहर को हर रोज़ अनुमानित 10 लाख रुपये बचाते हैं, बिना वेतन और सुरक्षा के। Eco-Flow में हम कचरा बीनने वालों को साझेदार मानते हैं, समस्या नहीं।',
        'हमारी योजना: इस साल दो से तीन स्थानीय स्कूलों में जाना (हम अनुवादक लेकर जाते हैं), घरेलू बिन प्रणाली बनाना, और सरकारी फंडिंग के लिए नैतिक कचरा-से-ऊर्जा प्रोटोटाइप तैयार करना। हमने Chintan Organization से संपर्क किया है और UN से जुड़ने की योजना है। यह साइट पहला कदम है।',
      ],
      sourcesHeading: 'शोध और स्रोत',
      acknowledgementsHeading: 'आभार',
      acknowledgements: [
        { org: 'Down To Earth', desc: ', कचरा बीनने वालों और लैंडफिल समुदायों पर रिपोर्टिंग, इस संकट के मानवीय पहलू को समझने में बुनियादी' },
        { org: 'Ryan J. Hite', desc: ', गाजीपुर लैंडफिल के अंदर से ज़मीनी रिपोर्टिंग' },
        { org: 'Chintan Environmental Research and Action Group', desc: ', जिनका कचरा बीनने वालों के अधिकारों पर काम हमारे अभियान के दृष्टिकोण को आकार देता है' },
        { org: 'Earth5R', desc: ', सर्कुलर इकोनॉमी और दिल्ली के प्रदूषण संकट पर शोध' },
        { org: 'AES teachers', desc: ', सामाजिक कार्य परियोजना ढांचे पर मार्गदर्शन के लिए' },
      ],
      contactHeading: 'संपर्क',
      contactBody: 'प्रश्न, सुधार, या हमारे अभियान के साथ सहयोग: ',
      actionsHeading: 'आप क्या कर सकते हैं',
      actionsSub: 'पांच कदम जो कोई भी दिल्ली निवासी उठा सकता है। हमारा अभियान यहीं से शुरू होता है, और आपका भी।',
      actions: [
        {
          title: 'घर पर कचरा अलग करें',
          desc: 'दो डिब्बे रखें: एक गीले कचरे के लिए (खाना, छिलके) और एक सूखे कचरे के लिए (कागज़, प्लास्टिक, धातु, कांच)। यह पहले से ही भारत के ठोस कचरा प्रबंधन नियम 2016 के तहत कानून है, और इसमें कुछ खर्च नहीं होता।',
        },
        {
          title: 'कचरा जलाना बंद करें',
          desc: 'कचरा जलाना दिल्ली के वायु प्रदूषण के मुख्य कारणों में से एक है। सर्दियों में दिल्ली के वायु प्रदूषण का करीब 24% सिर्फ जैविक कचरे से आता है। घर पर या पड़ोस में कचरा न जलाएं।',
        },
        {
          title: 'कचरा बीनने वालों का सम्मान करें',
          desc: 'कचरा बीनने वाले रोज़ाना रीसाइक्लिंग से शहर को अनुमानित 10 लाख रुपये बचाते हैं। उनके साथ सम्मान से पेश आएं, उनके काम में रुकावट न डालें, और उन्हें उचित वेतन दिलाने के प्रयासों का समर्थन करें।',
        },
        {
          title: 'मना करो, कम करो, पुनः उपयोग करो, रीसायकल करो',
          desc: 'कुछ फेंकने से पहले पूछें: क्या मैं इसे मना कर सकता हूं? कम उपयोग कर सकता हूं? फिर से इस्तेमाल कर सकता हूं? UN Environment Program कहता है कि यही तरीका वास्तव में काम करता है।',
        },
        {
          title: 'सवाल पूछें',
          desc: 'सरकार ने 2028 तक दिल्ली के लैंडफिल साफ करने का वादा किया था। परियोजना के छह साल बाद भी लैंडफिल बमुश्किल छोटे हुए हैं। अपने वार्ड पार्षद से पूछें कि वास्तव में क्या प्रगति हो रही है।',
        },
      ],
    },
    model: {
      eyebrow: 'नैतिक मॉडल',
      heading: 'प्रणाली कैसे काम कर सकती है',
      subtitle: 'Eco-Flow में, यही वह नैतिक प्रणाली है जिसके लिए हमारा अभियान काम कर रहा है।',
      binEyebrow: 'बिन प्रणाली',
      binHeading: 'शुरुआत घर से होती है',
      binDesc: 'हमारा अभियान दिल्ली के घरों के लिए तीन-बिन प्रणाली बना रहा है। दरवाज़े से निकलने से पहले हर धारा अलग की जाती है।',
      comparisonEyebrow: 'तुलना',
      comparisonHeading: 'इसे नैतिक क्या बनाता है?',
      currentLabel: 'वर्तमान प्रणाली',
      modelLabel: 'नैतिक मॉडल',
      currentPoints: [
        'कचरा स्रोत पर मिलाया जाता है, कुछ भी अलग नहीं',
        'कचरा बीनने वाले बिना सुरक्षा के मुफ्त काम करते हैं',
        'लैंडफिल भर जाते हैं और आग पकड़ लेते हैं',
        'WTE भट्टियां रीसायकल योग्य सामान जलाती हैं, जहरीला धुआं छोड़ती हैं',
      ],
      modelPoints: [
        'हर घर में तीन धाराएं अलग की जाती हैं',
        'कचरा बीनने वालों को वेतन और सुरक्षा उपकरण मिलते हैं',
        'जैविक कचरा बायोगैस और खाद बनता है, लैंडफिल में नहीं जाता',
        'WTE संयंत्र केवल असली अवशिष्ट जलाता है, कम प्रदूषण',
      ],
      coreEyebrow: 'मूल विचार',
      coreHeading: 'कचरा बीनने वाले समस्या नहीं हैं।',
      coreHeading2: 'वे ही समाधान हैं।',
      coreBody: 'Delhi Eco-Flow में हमने जाना है कि शहर के अनौपचारिक कचरा बीनने वाले पहले से ही मुफ्त में रोज़ रीसाइक्लिंग प्रणाली चला रहे हैं। हमारा अभियान उन्हें मशीनों से बदलने के बारे में नहीं है। यह उन्हें औपचारिक रूप से नियोजित करने, उचित वेतन देने और उनके ज्ञान पर प्रणाली बनाने के बारे में है।',
    },
    flowSteps: [
      {
        id: 'generation', step: 1, title: 'उत्पादन',
        intended: 'घर पर कचरा तीन हिस्सों में अलग किया जाता है: गीला, सूखा और हानिकारक। यह पहले से ही ठोस कचरा प्रबंधन नियम 2016 के तहत कानून है।',
        reality: 'अधिकांश घर सब कुछ एक थैले में मिला देते हैं। नियम कागज़ पर हैं, लागू नहीं होते।',
        gap: 'घर से निकलने से पहले ही अलगाव विफल हो जाता है।',
      },
      {
        id: 'segregation', step: 2, title: 'अलगाव',
        intended: 'संग्रह कर्मचारी रीसायकल योग्य सामान को बाकी कचरे से अलग करते हैं।',
        reality: 'अनौपचारिक कचरा बीनने वाले बिना वेतन और सुरक्षा के यह काम करते हैं। सरकार उन पर खर्च करने की बजाय महंगी मशीनें खरीदती है।',
        gap: 'प्रणाली उन अनौपचारिक मज़दूरों पर निर्भर है जिन्हें वह भुगतान करने से मना करती है।',
      },
      {
        id: 'collection', step: 3, title: 'संग्रह',
        intended: 'घर-घर वाहन अलग किए गए कचरे को नियमित रूट पर उठाते हैं।',
        reality: 'कवरेज असमान है। जिम्मेदारी कई सरकारी निकायों में बंटी है, जिससे खामियां और जवाबदेही की कमी है।',
        gap: 'विभाजित जिम्मेदारी का मतलब है कि संग्रह विफल होने पर कोई जवाबदेह नहीं।',
      },
      {
        id: 'transport', step: 4, title: 'परिवहन',
        intended: 'ट्रांसफर स्टेशन कचरे को छांटते हैं और हर धारा को सही प्रसंस्करण केंद्र भेजते हैं।',
        reality: 'जब निवासी सही तरह से छांटते भी हैं, तो गीला और सूखा कचरा अक्सर एक ही वाहन में मिल जाता है।',
        gap: 'ट्रांसफर स्टेशन प्रसंस्करण से पहले घरेलू अलगाव को खत्म कर देते हैं।',
      },
      {
        id: 'processing', step: 5, title: 'प्रसंस्करण',
        intended: 'जैविक कचरा खाद या बायोगैस बनता है। सूखा रीसायकल योग्य सामान रिकवरी केंद्रों में जाता है।',
        reality: 'दिल्ली का अधिकांश कचरा जलाया जाता है या ऐसे WTE भट्टियों में भेजा जाता है जो बचाने से ज़्यादा CO2 छोड़ती हैं। जैविक कचरा सर्दियों के वायु प्रदूषण का करीब 24% है।',
        gap: 'जलाना और वर्तमान WTE दोनों जहरीले रसायन छोड़ते हैं। कोई भी असली समाधान नहीं है।',
      },
      {
        id: 'disposal', step: 6, title: 'निपटान',
        intended: 'केवल असली अवशिष्ट कचरा लैंडफिल तक पहुंचता है। साइटें आग और रिसाव रोकने के लिए प्रबंधित होती हैं।',
        reality: 'मिला हुआ, अनुपचारित कचरा रोज़ तीन लैंडफिल में फेंका जाता है जो 2008 में भर गए थे और कभी बंद नहीं हुए। कचरे का पहाड़ करीब 75 मीटर ऊंचा है।',
        gap: 'लैंडफिल श्रृंखला का अंत नहीं है। यह उससे पहले हर चरण की विफलता है।',
      },
    ],
  },
} as const;

export function useT(lang: Lang) {
  return T[lang];
}

export default T;
