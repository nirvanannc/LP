// Per-service deep-dive content (bilingual). Slugs map 1:1 to t.services.items order.
export const SERVICE_SLUGS = [
  "anxiety-depression",
  "de-addiction",
  "child-adolescent",
  "sexual-health",
  "couples-family",
  "online-consultation",
];

export const SERVICE_DETAILS = {
  en: {
    ui: {
      back: "Back to home",
      allServices: "See all services",
      kicker: "Service",
      signsTitle: "You might recognise…",
      approachTitle: "How Dr. Soni helps",
      forWhoTitle: "Who this is for",
      storyTitle: "A quiet story of hope",
      storyNote: "Shared anonymously, with permission. Every identity is always protected.",
      reassure: "Everything you share stays strictly private. Family is involved only with your consent — koi jaanega toh nahi.",
      ctaTitle: "The first step is just a conversation.",
      ctaSub: "No pressure, no labels. Reach out whenever you feel ready.",
      disclaimer: "This page is for information and support only — it is not a diagnosis. A private consultation with Dr. Soni can help you understand what's really going on.",
    },
    items: {
      "anxiety-depression": {
        title: "Anxiety & Depression Care",
        tagline: "For the worry that won't switch off, and the days that feel heavy for no clear reason.",
        intro:
          "Feeling anxious, low or exhausted is not a weakness, and it is far more common than most people admit. When it starts affecting your sleep, work or relationships, gentle professional help can make a real difference — often sooner than you'd expect.",
        forWho: "For anyone carrying constant worry, sadness, panic, or a tiredness that rest doesn't fix — whether it started recently or has been quietly building for years.",
        signs: [
          "Worrying or feeling 'on edge' most of the day",
          "Low mood, or losing interest in things you used to enjoy",
          "Trouble sleeping, or sleeping too much",
          "Tiredness, poor focus, or feeling 'not yourself'",
          "Physical signs like a racing heart, tightness or restlessness",
        ],
        approach: [
          "A calm, unhurried conversation to understand your story — not just symptoms.",
          "Evidence-based care: talk therapy, and medication only if and when truly needed.",
          "Practical, everyday tools for sleep, worry and low moods.",
          "Steady follow-up so you're never left to manage it alone.",
        ],
        story: {
          quote: "For two years I thought this heaviness was just 'me'. A few honest conversations and the right care, and slowly the mornings stopped feeling impossible. I laugh with my family again.",
          who: "S., Jaipur",
        },
      },
      "de-addiction": {
        title: "De-Addiction Treatment",
        tagline: "Alcohol or substance use — for you, or for someone in the family you're worried about.",
        intro:
          "Addiction is a medical condition, not a moral failing. Whether it's alcohol, tobacco or other substances, recovery is possible with the right support — handled with dignity, privacy and no blame. Many families reach out first on behalf of a loved one, and that's completely okay.",
        forWho: "For individuals wanting to cut down or stop, and for family members feeling helpless watching someone they love struggle.",
        signs: [
          "Use has slowly increased, or feels hard to control",
          "Attempts to stop or cut down that didn't last",
          "Work, money or relationships suffering because of it",
          "Secrecy, guilt, or arguments around the habit",
          "Shakiness, unease or strong cravings when stopping",
        ],
        approach: [
          "A private, non-judgmental assessment — for you or your family member.",
          "Medically supported de-addiction, including safe management of withdrawal.",
          "Relapse-prevention and counselling that respects your family and values.",
          "Family guidance on how to help without pushing your loved one away.",
        ],
        story: {
          quote: "My husband tried to quit so many times on his own. Here, no one shamed him. Aaj usse 8 mahine ho gaye — and our home feels like home again.",
          who: "A family member, Jaipur",
        },
      },
      "child-adolescent": {
        title: "Child & Adolescent Psychiatry",
        tagline: "When your child seems withdrawn, anxious or 'not themselves' — and you're not sure how to reach them.",
        intro:
          "Children and teenagers often can't put feelings into words, so distress shows up as silence, anger, fear or falling grades. Early, gentle support helps them feel understood — and helps you feel less alone as a parent. Reaching out is one of the kindest things you can do for your child.",
        forWho: "For parents worried about a child or teenager's mood, behaviour, focus, fears, or sudden withdrawal.",
        signs: [
          "Becoming quiet, withdrawn or distant from the family",
          "Sudden changes in mood, anger or frequent crying",
          "Big changes in sleep, appetite or energy",
          "Dropping interest in school, friends or play",
          "Restlessness, fear, or trouble concentrating",
        ],
        approach: [
          "A warm, child-friendly setting where your child feels safe, not tested.",
          "Careful assessment of mood, behaviour, focus and development.",
          "Parents guided as partners — practical ways to support at home.",
          "Coordination with school only if you wish, always with your consent.",
        ],
        story: {
          quote: "Mera beta mahino se chup tha, and I was so scared. With gentle sessions he slowly opened up — and I learned how to simply be there for him.",
          who: "A parent, Jaipur",
        },
      },
      "sexual-health": {
        title: "Sexual Health Counselling",
        tagline: "Private, respectful help for the worries most people are too embarrassed to say aloud.",
        intro:
          "Concerns about sexual health, intimacy or performance are common and treatable — yet stigma keeps most people silent for years. This is a completely confidential, judgment-free space to talk openly and get real answers, at your own pace.",
        forWho: "For individuals and couples facing anxiety, performance worries, low desire, or other intimate concerns affecting confidence or relationships.",
        signs: [
          "Anxiety or embarrassment around intimacy",
          "Performance worries affecting confidence",
          "Concerns you feel you can't discuss with anyone",
          "Strain it's putting on your relationship",
          "Misinformation or fear from unreliable sources",
        ],
        approach: [
          "A calm, strictly confidential conversation — no judgment, ever.",
          "Clear, medically accurate answers that replace fear with facts.",
          "Care for both the physical and the emotional side of the concern.",
          "Couples included only if and when you want that.",
        ],
        story: {
          quote: "I carried this worry silently for years, too ashamed to ask anyone. One private, respectful conversation gave me the facts — and my confidence back.",
          who: "Patient, Jaipur",
        },
      },
      "couples-family": {
        title: "Couples & Family Counselling",
        tagline: "When the strain is affecting the whole home — not just one person.",
        intro:
          "Sometimes the difficulty isn't within one person, but in how a family communicates, argues or drifts apart under stress. Counselling offers a neutral, respectful space to be heard, understand each other, and find a way forward together.",
        forWho: "For couples and families facing constant conflict, communication breakdown, or the ripple effects of illness, addiction or a difficult phase.",
        signs: [
          "Frequent arguments, or a heavy silence at home",
          "Feeling unheard or misunderstood by each other",
          "One person's struggle affecting everyone",
          "Difficulty talking without it turning into conflict",
          "Wanting to reconnect but not knowing how",
        ],
        approach: [
          "A neutral, respectful space where everyone feels safe to speak.",
          "Practical communication tools you can use at home.",
          "Culturally aware guidance that honours your family structure.",
          "Sessions paced to what your family is comfortable with.",
        ],
        story: {
          quote: "We were one argument away from giving up. Sitting together in that room, we finally heard each other. Ab hum phir se baat karte hain.",
          who: "A couple, Jaipur",
        },
      },
      "online-consultation": {
        title: "Online Consultations",
        tagline: "The same confidential care, from wherever you feel safe — even outside Jaipur.",
        intro:
          "If travelling to the clinic feels difficult — because of distance, time, or simply wanting extra privacy — a secure video consultation with Dr. Soni is just as personal and thorough. You choose a quiet space, and we take care of the rest.",
        forWho: "For anyone outside Jaipur, with a busy schedule, or who simply feels more comfortable talking from the privacy of home.",
        signs: [
          "You live outside Jaipur or can't travel easily",
          "You'd feel safer talking from home",
          "A busy schedule makes clinic visits hard",
          "You want to start privately before an in-person visit",
          "You need ongoing follow-up without repeated travel",
        ],
        approach: [
          "A secure, private video consultation at a time that suits you.",
          "The same careful assessment and honest guidance as in person.",
          "Simple booking over call or WhatsApp — no complicated setup.",
          "Dr. Soni will suggest an in-person visit only if it's truly needed.",
        ],
        story: {
          quote: "I live far from Jaipur and almost didn't reach out. The video consultation felt just as personal — jaise saamne baithe hon. It changed everything for me.",
          who: "Patient, outside Jaipur",
        },
      },
    },
  },

  hi: {
    ui: {
      back: "होम पर वापस जाएँ",
      allServices: "सभी सेवाएँ देखें",
      kicker: "सेवा",
      signsTitle: "शायद आप इन्हें पहचानें…",
      approachTitle: "डॉ. सोनी कैसे मदद करते हैं",
      forWhoTitle: "यह किसके लिए है",
      storyTitle: "उम्मीद की एक शांत कहानी",
      storyNote: "अनुमति के साथ, गुमनाम रूप से साझा किया गया। हर पहचान हमेशा सुरक्षित रहती है।",
      reassure: "आप जो भी साझा करेंगे वह पूरी तरह निजी रहेगा। परिवार केवल आपकी सहमति से शामिल होता है — कोई जानेगा तो नहीं।",
      ctaTitle: "पहला कदम बस एक बातचीत है।",
      ctaSub: "कोई दबाव नहीं, कोई लेबल नहीं। जब भी तैयार महसूस करें, संपर्क करें।",
      disclaimer: "यह पेज केवल जानकारी और सहायता के लिए है — यह कोई निदान नहीं है। डॉ. सोनी के साथ एक निजी कंसल्टेशन आपको यह समझने में मदद कर सकता है कि असल में क्या हो रहा है।",
    },
    items: {
      "anxiety-depression": {
        title: "चिंता और अवसाद देखभाल",
        tagline: "उस चिंता के लिए जो बंद ही नहीं होती, और उन दिनों के लिए जो बिना किसी वजह भारी लगते हैं।",
        intro:
          "चिंतित, उदास या थका हुआ महसूस करना कमज़ोरी नहीं है, और यह ज़्यादातर लोगों के मानने से कहीं ज़्यादा आम है। जब यह आपकी नींद, काम या रिश्तों को प्रभावित करने लगे, तो सौम्य प्रोफेशनल मदद सचमुच फ़र्क़ ला सकती है — अक्सर आपकी उम्मीद से जल्दी।",
        forWho: "उन सभी के लिए जो लगातार चिंता, उदासी, घबराहट, या ऐसी थकान महसूस करते हैं जो आराम से भी नहीं जाती — चाहे यह हाल ही में शुरू हुई हो या वर्षों से धीरे-धीरे बढ़ रही हो।",
        signs: [
          "दिनभर चिंता या 'बेचैनी' महसूस होना",
          "उदास मन, या पसंदीदा चीज़ों में रुचि खोना",
          "नींद न आना, या बहुत ज़्यादा सोना",
          "थकान, ध्यान की कमी, या ख़ुद जैसा महसूस न करना",
          "दिल की धड़कन तेज़ होना, जकड़न या बेचैनी जैसे शारीरिक लक्षण",
        ],
        approach: [
          "आपकी कहानी समझने के लिए एक शांत, बिना जल्दबाज़ी की बातचीत — सिर्फ़ लक्षण नहीं।",
          "प्रमाण-आधारित देखभाल: टॉक थेरेपी, और दवा केवल तभी जब सचमुच ज़रूरत हो।",
          "नींद, चिंता और उदासी के लिए व्यावहारिक, रोज़मर्रा के उपाय।",
          "लगातार फ़ॉलो-अप ताकि आपको इसे अकेले न संभालना पड़े।",
        ],
        story: {
          quote: "दो साल तक मैं समझता रहा कि यह भारीपन बस 'मैं' हूँ। कुछ ईमानदार बातचीत और सही देखभाल से, धीरे-धीरे सुबहें नामुमकिन लगनी बंद हो गईं। अब मैं फिर से अपने परिवार के साथ हँसता हूँ।",
          who: "S., जयपुर",
        },
      },
      "de-addiction": {
        title: "नशा-मुक्ति उपचार",
        tagline: "शराब या नशे की लत — आपके लिए, या परिवार के किसी सदस्य के लिए जिसकी आपको चिंता है।",
        intro:
          "लत एक चिकित्सीय स्थिति है, कोई नैतिक कमज़ोरी नहीं। चाहे शराब हो, तंबाकू या कोई और पदार्थ, सही सहारे से रिकवरी संभव है — सम्मान, गोपनीयता और बिना किसी दोष के साथ। कई परिवार पहले किसी अपने के लिए संपर्क करते हैं, और यह बिल्कुल ठीक है।",
        forWho: "उन लोगों के लिए जो कम करना या छोड़ना चाहते हैं, और उन परिवारजनों के लिए जो किसी अपने को संघर्ष करते देख बेबस महसूस करते हैं।",
        signs: [
          "इस्तेमाल धीरे-धीरे बढ़ गया है, या क़ाबू करना मुश्किल लगता है",
          "छोड़ने या कम करने की कोशिशें जो टिक नहीं पाईं",
          "इसकी वजह से काम, पैसा या रिश्ते प्रभावित होना",
          "आदत के आसपास छिपाव, अपराधबोध या झगड़े",
          "छोड़ने पर कंपकंपी, बेचैनी या तेज़ तलब",
        ],
        approach: [
          "एक निजी, बिना-जजमेंट मूल्यांकन — आपके या आपके परिवार के सदस्य के लिए।",
          "चिकित्सकीय रूप से समर्थित नशा-मुक्ति, जिसमें विदड्रॉल का सुरक्षित प्रबंधन शामिल है।",
          "रिलैप्स-रोकथाम और काउंसलिंग जो आपके परिवार और मूल्यों का सम्मान करती है।",
          "परिवार के लिए मार्गदर्शन कि कैसे मदद करें, बिना अपने प्रियजन को दूर धकेले।",
        ],
        story: {
          quote: "मेरे पति ने कई बार अकेले छोड़ने की कोशिश की। यहाँ किसी ने उन्हें शर्मिंदा नहीं किया। आज उसे 8 महीने हो गए — और हमारा घर फिर से घर जैसा लगता है।",
          who: "एक परिवारजन, जयपुर",
        },
      },
      "child-adolescent": {
        title: "बाल और किशोर मनोचिकित्सा",
        tagline: "जब आपका बच्चा गुमसुम, चिंतित या 'ख़ुद जैसा नहीं' लगे — और आप समझ न पाएँ कि उस तक कैसे पहुँचें।",
        intro:
          "बच्चे और किशोर अक्सर अपनी भावनाओं को शब्दों में नहीं ढाल पाते, इसलिए परेशानी चुप्पी, ग़ुस्से, डर या गिरते नंबरों के रूप में सामने आती है। जल्दी, सौम्य सहारा उन्हें समझा हुआ महसूस कराता है — और एक अभिभावक के रूप में आपको भी कम अकेला। संपर्क करना अपने बच्चे के लिए सबसे दयालु कदमों में से एक है।",
        forWho: "उन अभिभावकों के लिए जो अपने बच्चे या किशोर के मूड, व्यवहार, ध्यान, डर या अचानक अकेलेपन को लेकर चिंतित हैं।",
        signs: [
          "परिवार से चुप, गुमसुम या दूर-दूर रहने लगना",
          "मूड, ग़ुस्से में अचानक बदलाव या बार-बार रोना",
          "नींद, भूख या ऊर्जा में बड़ा बदलाव",
          "स्कूल, दोस्तों या खेल में रुचि कम होना",
          "बेचैनी, डर, या ध्यान लगाने में कठिनाई",
        ],
        approach: [
          "एक गर्मजोशी भरा, बच्चों के अनुकूल माहौल जहाँ बच्चा सुरक्षित महसूस करे, परखा हुआ नहीं।",
          "मूड, व्यवहार, ध्यान और विकास का सावधानीपूर्वक मूल्यांकन।",
          "अभिभावकों को साथी की तरह मार्गदर्शन — घर पर सहारा देने के व्यावहारिक तरीके।",
          "स्कूल के साथ समन्वय केवल तभी जब आप चाहें, हमेशा आपकी सहमति से।",
        ],
        story: {
          quote: "मेरा बेटा महीनों से चुप था, और मैं बहुत डरी हुई थी। सौम्य सत्रों से वह धीरे-धीरे खुलने लगा — और मैंने सीखा कि उसके लिए बस मौजूद कैसे रहूँ।",
          who: "एक अभिभावक, जयपुर",
        },
      },
      "sexual-health": {
        title: "यौन स्वास्थ्य परामर्श",
        tagline: "उन चिंताओं के लिए निजी, सम्मानजनक मदद जिन्हें कहने में ज़्यादातर लोग शर्म महसूस करते हैं।",
        intro:
          "यौन स्वास्थ्य, नज़दीकी या प्रदर्शन को लेकर चिंताएँ आम और इलाज-योग्य हैं — फिर भी शर्म की वजह से ज़्यादातर लोग वर्षों चुप रहते हैं। यह पूरी तरह गोपनीय, बिना-जजमेंट जगह है जहाँ आप खुलकर बात कर सकते हैं और अपनी गति से सही जवाब पा सकते हैं।",
        forWho: "उन व्यक्तियों और दंपतियों के लिए जो घबराहट, प्रदर्शन की चिंता, कम इच्छा, या आत्मविश्वास व रिश्तों को प्रभावित करने वाली अन्य नज़दीकी चिंताओं का सामना कर रहे हैं।",
        signs: [
          "नज़दीकी को लेकर घबराहट या शर्म",
          "प्रदर्शन की चिंता जो आत्मविश्वास को प्रभावित करती है",
          "ऐसी चिंताएँ जिन्हें आप किसी से नहीं कह पाते",
          "इसका आपके रिश्ते पर पड़ता तनाव",
          "अविश्वसनीय स्रोतों से ग़लत जानकारी या डर",
        ],
        approach: [
          "एक शांत, पूरी तरह गोपनीय बातचीत — कभी कोई जजमेंट नहीं।",
          "स्पष्ट, चिकित्सकीय रूप से सटीक जवाब जो डर की जगह तथ्य देते हैं।",
          "चिंता के शारीरिक और भावनात्मक, दोनों पहलुओं की देखभाल।",
          "दंपति केवल तभी शामिल जब और जैसे आप चाहें।",
        ],
        story: {
          quote: "मैंने यह चिंता वर्षों चुपचाप ढोई, किसी से पूछने में बहुत शर्म आती थी। एक निजी, सम्मानजनक बातचीत ने मुझे तथ्य दिए — और मेरा आत्मविश्वास लौटा दिया।",
          who: "मरीज़, जयपुर",
        },
      },
      "couples-family": {
        title: "दंपत्ति और पारिवारिक परामर्श",
        tagline: "जब तनाव सिर्फ़ एक व्यक्ति नहीं, पूरे घर को प्रभावित कर रहा हो।",
        intro:
          "कभी-कभी मुश्किल किसी एक व्यक्ति के भीतर नहीं होती, बल्कि इसमें होती है कि एक परिवार तनाव में कैसे बात करता है, झगड़ता है या दूर होता जाता है। काउंसलिंग एक तटस्थ, सम्मानजनक जगह देती है जहाँ सुना जाए, एक-दूसरे को समझा जाए, और साथ मिलकर आगे का रास्ता खोजा जाए।",
        forWho: "उन दंपतियों और परिवारों के लिए जो लगातार टकराव, बातचीत में टूटन, या बीमारी, लत या किसी मुश्किल दौर के असर का सामना कर रहे हैं।",
        signs: [
          "बार-बार झगड़े, या घर में भारी ख़ामोशी",
          "एक-दूसरे से अनसुना या ग़लत समझा महसूस करना",
          "एक व्यक्ति का संघर्ष सबको प्रभावित करना",
          "बिना टकराव के बात करना मुश्किल होना",
          "फिर से जुड़ना चाहना पर तरीक़ा न पता होना",
        ],
        approach: [
          "एक तटस्थ, सम्मानजनक जगह जहाँ हर कोई बोलने में सुरक्षित महसूस करे।",
          "व्यावहारिक बातचीत के उपाय जिन्हें आप घर पर इस्तेमाल कर सकें।",
          "संस्कृति के अनुरूप मार्गदर्शन जो आपके परिवार की संरचना का सम्मान करता है।",
          "सत्र उस गति से जिसमें आपका परिवार सहज हो।",
        ],
        story: {
          quote: "हम बस एक झगड़े की दूरी पर थे हार मान लेने से। उस कमरे में साथ बैठकर, आख़िरकार हमने एक-दूसरे को सुना। अब हम फिर से बात करते हैं।",
          who: "एक दंपत्ति, जयपुर",
        },
      },
      "online-consultation": {
        title: "ऑनलाइन कंसल्टेशन",
        tagline: "वही गोपनीय देखभाल, वहाँ से जहाँ आप सुरक्षित महसूस करें — जयपुर के बाहर भी।",
        intro:
          "अगर क्लिनिक तक आना मुश्किल लगे — दूरी, समय, या बस ज़्यादा निजता चाहने की वजह से — तो डॉ. सोनी के साथ एक सुरक्षित वीडियो कंसल्टेशन उतना ही व्यक्तिगत और गहन है। आप एक शांत जगह चुनते हैं, बाक़ी हम संभाल लेते हैं।",
        forWho: "उन सभी के लिए जो जयपुर से बाहर हैं, व्यस्त हैं, या बस घर की निजता से बात करने में ज़्यादा सहज महसूस करते हैं।",
        signs: [
          "आप जयपुर से बाहर रहते हैं या आसानी से यात्रा नहीं कर सकते",
          "आप घर से बात करने में ज़्यादा सुरक्षित महसूस करेंगे",
          "व्यस्त दिनचर्या क्लिनिक आना मुश्किल बनाती है",
          "आप इन-पर्सन मुलाक़ात से पहले निजी तौर पर शुरुआत करना चाहते हैं",
          "आपको बार-बार यात्रा किए बिना निरंतर फ़ॉलो-अप चाहिए",
        ],
        approach: [
          "आपके सुविधाजनक समय पर एक सुरक्षित, निजी वीडियो कंसल्टेशन।",
          "वही सावधानीपूर्वक मूल्यांकन और ईमानदार मार्गदर्शन जो इन-पर्सन में।",
          "कॉल या WhatsApp पर आसान बुकिंग — कोई जटिल सेटअप नहीं।",
          "डॉ. सोनी इन-पर्सन मुलाक़ात केवल तभी सुझाएँगे जब सचमुच ज़रूरत हो।",
        ],
        story: {
          quote: "मैं जयपुर से दूर रहता हूँ और लगभग संपर्क ही नहीं किया। वीडियो कंसल्टेशन उतना ही व्यक्तिगत लगा — जैसे सामने बैठे हों। इसने मेरे लिए सब कुछ बदल दिया।",
          who: "मरीज़, जयपुर के बाहर",
        },
      },
    },
  },
};
