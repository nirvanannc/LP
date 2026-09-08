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
        stories: [
          {
            quote: "For two years I thought this heaviness was just 'me'. A few honest conversations and the right care, and slowly the mornings stopped feeling impossible. I laugh with my family again.",
            who: "S., Jaipur",
          },
          {
            quote: "I kept telling everyone 'I'm fine'. Here I didn't have to pretend. Bas kisi ne sunn liya, and it lifted a weight I'd carried for years.",
            who: "M., Jaipur",
          },
          {
            quote: "The panic used to control my whole day. Now I have simple tools that actually work — and I finally feel in charge of my own mind again.",
            who: "Patient, Jaipur",
          },
        ],
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
        stories: [
          {
            quote: "My husband tried to quit so many times on his own. Here, no one shamed him. Aaj usse 8 mahine ho gaye — and our home feels like home again.",
            who: "A family member, Jaipur",
          },
          {
            quote: "I thought quitting was only about willpower. Sahi medical support ke saath, it finally stuck. Six months clean and still counting.",
            who: "Patient, Jaipur",
          },
          {
            quote: "As a wife I felt so alone in all of this. The family sessions gave me something I hadn't had in years — hope, and a plan.",
            who: "A spouse, Jaipur",
          },
        ],
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
        stories: [
          {
            quote: "Mera beta mahino se chup tha, and I was so scared. With gentle sessions he slowly opened up — and I learned how to simply be there for him.",
            who: "A parent, Jaipur",
          },
          {
            quote: "The school kept calling about my daughter. Turned out she was anxious, not 'difficult'. Ab wo phir se muskurati hai.",
            who: "A parent, Jaipur",
          },
        ],
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
        stories: [
          {
            quote: "I carried this worry silently for years, too ashamed to ask anyone. One private, respectful conversation gave me the facts — and my confidence back.",
            who: "Patient, Jaipur",
          },
          {
            quote: "I'd read a hundred scary things online. One honest conversation replaced all that fear with simple, clear facts.",
            who: "Patient, Jaipur",
          },
        ],
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
        stories: [
          {
            quote: "We were one argument away from giving up. Sitting together in that room, we finally heard each other. Ab hum phir se baat karte hain.",
            who: "A couple, Jaipur",
          },
          {
            quote: "Ghar mein rozana ke jhagde se hum thak chuke the. We learned to actually listen instead of react. It quietly saved us.",
            who: "A couple, Jaipur",
          },
        ],
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
        stories: [
          {
            quote: "I live far from Jaipur and almost didn't reach out. The video consultation felt just as personal — jaise saamne baithe hon. It changed everything for me.",
            who: "Patient, outside Jaipur",
          },
          {
            quote: "Between work and the kids I could never find time. A video session late in the evening worked perfectly — and it was completely private.",
            who: "Patient, Jaipur",
          },
        ],
      },
    },
  },

  hi: {
    ui: {
      back: "Home par wapas jaayein",
      allServices: "Sabhi services dekhein",
      kicker: "Service",
      signsTitle: "Shayad aap inhein pehchaanein…",
      approachTitle: "Dr. Soni kaise madad karte hain",
      forWhoTitle: "Yeh kiske liye hai",
      storyTitle: "Umeed ki ek shaant kahani",
      storyNote: "Permission ke saath, gumnaam roop se share kiya gaya. Har pehchaan hamesha surakshit rehti hai.",
      reassure: "Aap jo bhi share karenge woh poori tarah private rahega. Parivaar sirf aapki consent se shaamil hota hai — koi jaanega toh nahi.",
      ctaTitle: "Pehla kadam bas ek baat-cheet hai.",
      ctaSub: "Koi dabaav nahi, koi label nahi. Jab bhi tayyar mehsoos karein, sampark karein.",
      disclaimer: "Yeh page sirf jaankari aur sahare ke liye hai — yeh koi diagnosis nahi hai. Dr. Soni ke saath ek private consultation aapko samajhne mein madad karega ki asal mein kya ho raha hai.",
    },
    items: {
      "anxiety-depression": {
        title: "Anxiety aur Depression Care",
        tagline: "Us chinta ke liye jo band hi nahi hoti, aur un dino ke liye jo bina wajah bhaari lagte hain.",
        intro:
          "Ghabraya, udaas ya thaka hua mehsoos karna kamzori nahi hai, aur yeh utna hi common hai jitna log maante nahi. Jab yeh aapki neend, kaam ya rishton par asar daalne lage, tab narm professional madad sach mein farq laati hai — aksar aapki umeed se jaldi.",
        forWho: "Un sabhi ke liye jo lagatar chinta, udaasi, ghabraahat, ya aisi thakan mehsoos karte hain jo aaram se bhi nahi jaati — chahe yeh haal hi mein shuru hui ho ya saalon se dheere-dheere badh rahi ho.",
        signs: [
          "Din bhar chinta ya 'on edge' mehsoos hona",
          "Udaas mann, ya jo pehle achha lagta tha usmein mann na lagna",
          "Neend na aana, ya bahut zyada sona",
          "Thakan, dhyaan na lagna, ya khud jaisa mehsoos na hona",
          "Dil tez dhadakna, seene mein jakdan ya bechaini jaise physical sanket",
        ],
        approach: [
          "Ek shaant, bina jaldbaazi baat-cheet — sirf symptoms nahi, aapki poori kahani samajhne ke liye.",
          "Evidence-based care: talk therapy, aur medication sirf jab sach mein zaroori ho.",
          "Neend, chinta aur udaas mann ke liye rozmarra ke practical tools.",
          "Lagatar follow-up, taaki aapko yeh sab akele nahi sambhaalna pade.",
        ],
        stories: [
          {
            quote: "Do saal tak main samajhta raha ki yeh bhaaripan 'bas main hi hoon'. Kuch imaandaar baatein aur sahi care ke baad, subah uthna dheere-dheere mumkin lagne laga. Aaj phir se ghar mein hansi hai.",
            who: "S., Jaipur",
          },
          {
            quote: "Main sabko 'main theek hoon' kehta rehta tha. Yahan mujhe pretend karne ki zaroorat nahi padi. Bas kisi ne sunn liya, aur saalon ka bojh halka ho gaya.",
            who: "M., Jaipur",
          },
          {
            quote: "Panic pehle mera poora din kaabu mein rakhta tha. Ab mere paas simple tools hain jo sach mein kaam karte hain — aur apne mann par phir se apna control mehsoos hota hai.",
            who: "Patient, Jaipur",
          },
        ],
      },
      "de-addiction": {
        title: "De-Addiction Treatment",
        tagline: "Sharaab ya nashe ka istemaal — aapke liye, ya ghar ke us sadasya ke liye jiski chinta hai.",
        intro:
          "Nasha ek medical condition hai, koi charitra ki kami nahi. Sharaab ho, tambaaku ho ya koi aur nasha — sahi sahare ke saath recovery mumkin hai, poore samman, privacy aur bina blame ke saath. Kai parivaar pehle apne kisi apne ke liye sampark karte hain, aur yeh bilkul theek hai.",
        forWho: "Un logon ke liye jo kam karna ya chhodna chahte hain, aur un parivaaron ke liye jo apne kisi apne ko struggle karte dekh bebas mehsoos karte hain.",
        signs: [
          "Istemaal dheere-dheere badh gaya hai, ya kaabu karna mushkil lagta hai",
          "Chhodne ya kam karne ki koshish hui, par woh tik nahi paayi",
          "Kaam, paisa ya rishte iski wajah se kharab ho rahe hain",
          "Is aadat ko lekar chhupana, guilt ya jhagde",
          "Chhodne par haath kaanpna, bechaini ya tez talab",
        ],
        approach: [
          "Ek private, bina judge kiye assessment — aapke liye ya aapke parivaar ke sadasya ke liye.",
          "Medically supported de-addiction, jismein withdrawal ka surakshit management shaamil hai.",
          "Relapse-prevention aur counselling jo aapke parivaar aur values ka samman karti hai.",
          "Parivaar ko guidance, ki madad kaise karein bina apne apne ko door kiye.",
        ],
        stories: [
          {
            quote: "Mere pati ne kai baar khud chhodne ki koshish ki. Yahan kisi ne unhein sharminda nahi kiya. Aaj usse 8 mahine ho gaye — aur ghar phir se ghar jaisa lagta hai.",
            who: "Parivaar ka sadasya, Jaipur",
          },
          {
            quote: "Mujhe lagta tha chhodna sirf willpower ki baat hai. Sahi medical support ke saath, yeh aakhirkar tik gaya. Chhe mahine clean aur ginti jaari hai.",
            who: "Patient, Jaipur",
          },
          {
            quote: "Ek biwi ke roop mein main is sab mein bahut akeli thi. Family sessions ne mujhe woh diya jo saalon se nahi tha — umeed, aur ek plan.",
            who: "Ek jeevansaathi, Jaipur",
          },
        ],
      },
      "child-adolescent": {
        title: "Child aur Adolescent Psychiatry",
        tagline: "Jab aapka bachcha chup, ghabraya ya 'khud jaisa nahi' lage — aur aapko samajh na aaye ki kaise pahunchein.",
        intro:
          "Bachche aur teenagers aksar apni feelings shabdon mein nahi keh paate, isliye pareshaani chuppi, gusse, dar ya girte marks ke roop mein dikhti hai. Jaldi, narm sahara unhein samjha gaya mehsoos karata hai — aur ek parent ke roop mein aapko bhi akela mehsoos nahi hone deta. Sampark karna aapke bachche ke liye sabse achhe kaamon mein se ek hai.",
        forWho: "Un parents ke liye jo apne bachche ya teenager ke mood, behaviour, dhyaan, dar ya achaanak chup ho jaane se chintit hain.",
        signs: [
          "Chup, khud mein simat jaana ya parivaar se door hona",
          "Mood, gusse ya bar-bar rone mein achaanak badlaav",
          "Neend, bhookh ya energy mein bade badlaav",
          "School, doston ya khel mein mann kam hona",
          "Bechaini, dar, ya dhyaan lagane mein dikkat",
        ],
        approach: [
          "Ek warm, bachchon ke anukool maahaul jahan aapka bachcha surakshit mehsoos kare, test kiya hua nahi.",
          "Mood, behaviour, dhyaan aur development ka dhyaan se assessment.",
          "Parents ko partner ki tarah guidance — ghar par sahara dene ke practical tareeke.",
          "School ke saath coordination sirf tab, jab aap chaahein — hamesha aapki consent ke saath.",
        ],
        stories: [
          {
            quote: "Mera beta mahino se chup tha, aur main bahut dari hui thi. Narm sessions ke saath woh dheere-dheere khulne laga — aur maine seekha ki bas uske saath kaise rehna hai.",
            who: "Ek parent, Jaipur",
          },
          {
            quote: "School meri beti ke baare mein bar-bar call karta tha. Pata chala woh anxious thi, 'difficult' nahi. Ab wo phir se muskurati hai.",
            who: "Ek parent, Jaipur",
          },
        ],
      },
      "sexual-health": {
        title: "Sexual Health Counselling",
        tagline: "Un chinta ke liye private, respectful madad jo kehne mein zyadatar log sharmate hain.",
        intro:
          "Sexual health, intimacy ya performance ki chinta common hain aur inka ilaaj mumkin hai — phir bhi sharam ki wajah se log saalon tak chup rehte hain. Yeh ek poori tarah confidential, judgment-free jagah hai jahan khulkar baat karke sach mein sahi jawaab mil sakte hain, aapki apni raftaar par.",
        forWho: "Un logon aur couples ke liye jo anxiety, performance ki chinta, kam desire, ya aisi intimate baaton se guzar rahe hain jo confidence ya rishton par asar daal rahi hain.",
        signs: [
          "Intimacy ko lekar ghabraahat ya sharam",
          "Performance ki chinta jo confidence par asar daal rahi hai",
          "Aisi baatein jo aapko lagta hai kisi se keh nahi sakte",
          "Iski wajah se rishte mein tanav",
          "Galat jaankari ya internet ke daraane wale dawon se dar",
        ],
        approach: [
          "Ek shaant, poori tarah confidential baat-cheet — kabhi koi judgment nahi.",
          "Saaf, medically sahi jawaab jo dar ki jagah facts rakhte hain.",
          "Physical aur emotional dono pehluon ka dhyaan.",
          "Partner ko shaamil karna sirf tab, jab aur jaise aap chaahein.",
        ],
        stories: [
          {
            quote: "Yeh chinta maine saalon tak chupchaap uthayi, kisi se poochhne mein sharam aati thi. Ek private, respectful baat-cheet ne mujhe facts diye — aur mera confidence wapas.",
            who: "Patient, Jaipur",
          },
          {
            quote: "Maine online sau daraane wali cheezein padh li thi. Ek imaandaar baat-cheet ne us saare dar ki jagah simple, saaf facts rakh diye.",
            who: "Patient, Jaipur",
          },
        ],
      },
      "couples-family": {
        title: "Couples aur Family Counselling",
        tagline: "Jab tanav poore ghar par asar daal raha ho — sirf ek insaan par nahi.",
        intro:
          "Kabhi dikkat ek insaan ke andar nahi hoti, balki isme hoti hai ki parivaar stress mein kaise baat karta hai, jhagadta hai ya door hota jaata hai. Counselling ek neutral, respectful jagah deti hai jahan sunna, ek dusre ko samajhna aur saath aage badhne ka raasta nikalna mumkin hota hai.",
        forWho: "Un couples aur parivaaron ke liye jo lagatar jhagde, baat-cheet ki kami, ya bimaari, nashe ya kisi mushkil daur ke asar se guzar rahe hain.",
        signs: [
          "Bar-bar jhagde, ya ghar mein bhaari chuppi",
          "Ek dusre se ansuna ya galat samjha gaya mehsoos karna",
          "Ek insaan ki takleef sab par asar daal rahi hai",
          "Baat karna mushkil, kyunki woh jhagde mein badal jaati hai",
          "Phir se judna chahte hain par samajh nahi ki kaise",
        ],
        approach: [
          "Ek neutral, respectful jagah jahan sab bolne mein surakshit mehsoos karein.",
          "Practical communication tools jo aap ghar par istemaal kar sakein.",
          "Culture ko samajhne wali guidance jo aapke parivaar ke dhaanche ka samman kare.",
          "Sessions us raftaar par jismein aapka parivaar comfortable ho.",
        ],
        stories: [
          {
            quote: "Hum ek jhagde door the sab chhod dene se. Us kamre mein saath baithkar, hum aakhirkar ek dusre ko sunn paaye. Ab hum phir se baat karte hain.",
            who: "Ek couple, Jaipur",
          },
          {
            quote: "Ghar mein rozana ke jhagde se hum thak chuke the. Humne react karne ki jagah sach mein sunna seekha. Isne chupchaap hamein bacha liya.",
            who: "Ek couple, Jaipur",
          },
        ],
      },
      "online-consultation": {
        title: "Online Consultations",
        tagline: "Wahi confidential care, wahan se jahan aap surakshit mehsoos karein — Jaipur ke baahar bhi.",
        intro:
          "Agar clinic tak aana mushkil lagta hai — doori, waqt, ya bas thodi extra privacy ki wajah se — toh Dr. Soni ke saath ek secure video consultation utna hi personal aur gehra hota hai. Aap ek shaant jagah chunein, baaki hum sambhaal lete hain.",
        forWho: "Un sabhi ke liye jo Jaipur ke baahar hain, busy schedule rakhte hain, ya ghar ki privacy se baat karna zyada comfortable samajhte hain.",
        signs: [
          "Aap Jaipur ke baahar rehte hain ya aasaani se travel nahi kar sakte",
          "Ghar se baat karna zyada surakshit lagta hai",
          "Busy schedule mein clinic aana mushkil hai",
          "In-person visit se pehle privately shuru karna chahte hain",
          "Bar-bar travel kiye bina lagatar follow-up chahiye",
        ],
        approach: [
          "Ek secure, private video consultation aapke suvidha ke waqt par.",
          "Wahi dhyaan se assessment aur imaandaar guidance, jaisa in-person hota hai.",
          "Call ya WhatsApp par simple booking — koi complicated setup nahi.",
          "Dr. Soni in-person visit sirf tab sujhaayenge, jab woh sach mein zaroori ho.",
        ],
        stories: [
          {
            quote: "Main Jaipur se door rehta hoon aur lagbhag sampark hi nahi karta. Video consultation utna hi personal laga — jaise saamne baithe hon. Isne mere liye sab badal diya.",
            who: "Patient, Jaipur se baahar",
          },
          {
            quote: "Kaam aur bachchon ke beech mujhe waqt hi nahi milta tha. Shaam ko late ek video session perfect raha — aur woh poori tarah private tha.",
            who: "Patient, Jaipur",
          },
        ],
      },
    },
  },
};
