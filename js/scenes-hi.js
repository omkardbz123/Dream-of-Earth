export const SCENES_HI = {

    // ═══════════════════════════════════════════════
    //  प्रस्तावना — माया सो जाती है
    // ═══════════════════════════════════════════════
    prologue: {
        id: 'prologue',
        title: 'सपना शुरू होता है',
        background: 'maya-room-night',
        music: 'maya-room',
        explore: { enabled: false },
        steps: [
            { type: 'narration', text: "घर में सन्नाटा है। सोती हुई दुनिया की साँसों के अलावा कोई आवाज़ नहीं।" },
            { type: 'dialogue', speaker: 'माया', mood: 'sleeping', text: "म्म्म... कितनी गर्मी है... कितना सुकून..." },
            { type: 'narration', text: "खिड़की पर एक हल्की सुनहरी रोशनी दिखती है। कोई प्राचीन शक्ति जाग रही है।" },
            { type: 'narration', text: "रोशनी माया को धीरे से बिस्तर से खींचती है। उसके पैर एक सुनहरे रास्ते को छूते हैं जो चमकती धुंध में फैला है...", setBackground: 'dream-entrance', setMusic: 'dream-entrance' },
            { type: 'dialogue', speaker: 'माया', mood: 'neutral', text: "मैं कहाँ हूँ? यह जगह... सपने जैसी लगती है, लेकिन सब कुछ इतना असली है..." },
            { type: 'narration', text: "एक छोटी सुनहरी जुगनू उसकी ओर तैरती आती है — गर्मजोशी से धड़कती हुई।" },
            { type: 'dialogue', speaker: 'Lumen', mood: 'bright', text: "छोटी सपनों की राजकुमारी... आज रात, दुनिया तुम्हें बुला रही है। क्या तुम जवाब दोगी?" },
            { type: 'dialogue', speaker: 'माया', mood: 'neutral', text: "तुम कौन हो?" },
            { type: 'dialogue', speaker: 'Lumen', mood: 'bright', text: "मैं लूमेन हूँ। उन सभी ज़िंदगियों की एक चिंगारी जो रात में पुकारती हैं। मेरे साथ आओ, माया। कुछ आत्माएँ हैं जिन्हें तुम्हारी ज़रूरत है।" },
            { type: 'transition', target: 'scene1' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  दृश्य 1 — ज़ारा शेरनी  (चिड़ियाघर)
    // ═══════════════════════════════════════════════
    scene1: {
        id: 'scene1',
        title: 'ज़ारा शेरनी',
        background: 'zoo-cage',
        backgroundAfter: 'zoo-savanna',
        music: 'suffering',
        musicAfter: 'freedom',
        explore: {
            enabled: true,
            animals: [
                { sprite: 'zara-before', x: 60, scale: 1, zIndex: 1, bottom: '-10%' }
            ],
            triggerX: 45
        },
        steps: [
            { type: 'dialogue', speaker: 'माया', mood: 'sad', text: "सुनो... तुम इन सलाखों के पीछे क्यों हो?" },
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'before', text: "मैं आज़ाद पैदा हुई थी, बच्ची। अफ़्रीका के विशाल आसमान के नीचे, जहाँ घास आँखों की सीमा से भी आगे फैली थी।" },
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'before', text: "जब मैं अभी अपनी माँ का दूध पी रही थी, तब वे रस्सियों और पिंजरों के साथ आए। मैंने उसे फिर कभी नहीं देखा।" },
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'before', text: "अब मैं अपने पिंजरे में वही रास्ता चलती हूँ। तीन कदम आगे, तीन कदम पीछे। पत्थर पर बने ये निशान — यह मेरे पागलपन की डायरी है।" },
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'before', text: "क्या तुम जानती हो कि कैसा लगता है जब तुम्हारे दिल में पूरा जंगल हो... लेकिन शरीर के चारों ओर सिर्फ चार दीवारें?" },
            { type: 'dialogue', speaker: 'माया', mood: 'crying', text: "यह तो भयानक है... किसी भी जीव को ऐसे नहीं रहना चाहिए।" },

            { type: 'choice', choices: [
                { text: "मैं कभी चिड़ियाघर नहीं जाऊँगी। तुम्हारी आज़ादी मेरा मनोरंजन नहीं है।", type: 'compassion', points: 2, response: "सच में? तो ध्यान से सुनो..." },
                { text: "मैं सिर्फ वन्यजीव अभयारण्यों का समर्थन करूँगी।", type: 'partial', points: 1, response: "अभयारण्य बेहतर हैं। लेकिन अरबों जानवर अभी भी शीशे के पीछे घूम रहे हैं जबकि लोग आइसक्रीम खाते हुए तमाशा देखते हैं।" },
                { text: "लेकिन चिड़ियाघर तो लुप्तप्राय प्रजातियों की रक्षा करते हैं...", type: 'indifferent', points: 0, response: "शिक्षा? वे कुछ नहीं सीखते। मुझे भूत की तरह चलते देखते हैं, अपनी आइसक्रीम खाते हैं और घर चले जाते हैं। यह संरक्षण नहीं है — यह आजीवन कारावास है।" }
            ]},

            // ── पुष्टि ──
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'before', requiresPrevChoice: 'compassion',
              text: "रुको। वादा करने से पहले अच्छी तरह सोच लो।" },
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'before', requiresPrevChoice: 'compassion',
              text: "तुम कह रही हो कि आज से तुम कभी किसी कैद जानवर को देखने का टिकट नहीं खरीदोगी। कोई चिड़ियाघर नहीं। कोई मरीन पार्क नहीं। कोई सर्कस नहीं। तब भी नहीं जब सब जाएँ। तब भी नहीं जब यह आसान हो।" },
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'before', requiresPrevChoice: 'compassion',
              text: "क्या तुम सच में यह वादा करने के लिए तैयार हो?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "हाँ। मैं वादा करती हूँ। कभी नहीं।", type: 'confirm_yes', points: 0, response: "तुम्हारे वादे ने अभी एक हज़ार आत्माओं को मुक्त किया। हर खाली सीट एक पिंजरा है जो कभी नहीं बनेगा।" },
                { text: "मैं... मैं चाहती हूँ, लेकिन अभी पक्का वादा नहीं कर सकती।", type: 'confirm_no', points: -1, response: "तुम्हारी असमंजस भी दिखाती है कि तुम हमें देख रही हो। शायद एक दिन तुम तैयार हो जाओ। मैं इंतज़ार करूँगी।" }
            ]},

            // ── विदाई ──
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'after', requiresPrevChoice: 'compassion',
              text: "देखो... सलाखें गायब हो रही हैं। मुझे फिर से घास की खुशबू आ रही है। हवा में सवाना की मिट्टी है।" },
            { type: 'dialogue', speaker: 'ज़ारा', mood: 'after', requiresPrevChoice: 'compassion',
              text: "शुक्रिया, नन्ही बच्ची। तुम्हारी वजह से मुझे याद आया कि आज़ादी कैसी होती है। इस एहसास को अपने साथ रखना — उन सबके लिए जो अभी भी कैद हैं।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "आज़ाद दौड़ो, ज़ारा। मैं तुम्हें कभी नहीं भूलूँगी।" },

            { type: 'transition', target: 'scene2' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  दृश्य 2 — स्टॉर्म घोड़ा  (सवारी)
    // ═══════════════════════════════════════════════
    scene2: {
        id: 'scene2',
        title: 'स्टॉर्म घोड़ा',
        background: 'mountain-path',
        backgroundAfter: 'mountain-meadow',
        music: 'suffering',
        musicAfter: 'freedom',
        explore: {
            enabled: true,
            animals: [
                { sprite: 'storm-before', x: 60, scale: 1, zIndex: 1 }
            ],
            triggerX: 45
        },
        steps: [
            { type: 'dialogue', speaker: 'माया', mood: 'sad', text: "तुम बहुत दर्द में लग रहे हो..." },
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'before', text: "मेरी कमर सालों से टूटी हुई है। मेरे खुरों में दरारें हैं और खून बहता है।" },
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'before', text: "वे मेरे मुँह में लोहे का लगाम डालते हैं जो हर खिंचाव पर मेरी ज़बान काटता है। जब मैं धीमा होता हूँ, तो वे अपनी एड़ियाँ मेरी पसलियों में गड़ाते हैं।" },
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'before', text: "मैंने दो साल की उम्र से हर दिन इस तपती चट्टान पर पर्यटकों को ढोया है। मेरे पैर कांपते हैं लेकिन मैं रुक नहीं सकता।" },
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'before', text: "मैं खुले मैदानों में दौड़ने के लिए पैदा हुआ था, हवा को महसूस करने के लिए। इसके बजाय, मैं चलने में कमज़ोर लोगों की टैक्सी हूँ।" },
            { type: 'dialogue', speaker: 'माया', mood: 'crying', text: "कोई तुम्हारे साथ ऐसा कैसे कर सकता है?" },

            { type: 'choice', choices: [
                { text: "मैं कभी मनोरंजन के लिए घोड़े पर नहीं बैठूँगी। तुम कोई वाहन नहीं हो।", type: 'compassion', points: 2, response: "तुम मेरे लिए... यह छोड़ दोगी?" },
                { text: "मैं यह सुनिश्चित करूँगी कि जिन घोड़ों पर बैठूँ उनके साथ अच्छा व्यवहार हो।", type: 'partial', points: 1, response: "काठी के नीचे के ज़ख्म तुम्हें नहीं दिखते। लगाम के पीछे मेरी चीखें तुम्हें नहीं सुनाई देतीं। 'अच्छा व्यवहार' वह बहाना है जो वे तुम्हें इसलिए बताते हैं ताकि तुम दोषी महसूस न करो।" },
                { text: "घोड़ों पर हज़ारों सालों से सवारी हो रही है। यह स्वाभाविक है।", type: 'indifferent', points: 0, response: "गुलामी भी हज़ारों सालों तक चली। क्या समय क्रूरता को स्वाभाविक बना देता है?" }
            ]},

            // ── पुष्टि ──
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'before', requiresPrevChoice: 'compassion',
              text: "क्या तुम पक्की हो? कोई पहाड़ी ट्रेल राइड नहीं। कोई समुद्र तट की सवारी नहीं। कोई शहर की बग्गी की सवारी नहीं।" },
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'before', requiresPrevChoice: 'compassion',
              text: "तुम्हारी छुट्टियों की तस्वीरों में मुस्कान के पीछे मेरा दर्द छिपा होता है। क्या तुम सच में रुकोगी?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "हाँ। मैं अपना रास्ता खुद चलूँगी। हमेशा।", type: 'confirm_yes', points: 0, response: "तो दौड़ो, नन्ही इंसान। हवा के साथ दौड़ो जैसे मुझे दौड़ना था। हम दोनों के लिए।" },
                { text: "मैं... शायद कभी-कभी, छुट्टियों में...", type: 'confirm_no', points: -1, response: "हर 'कभी-कभी' एक और टूटी कमर है। लेकिन मैं तुम्हारी आँखों में दया देखता हूँ। शायद अभी इतना काफ़ी है।" }
            ]},

            // ── विदाई ──
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'after', requiresPrevChoice: 'compassion',
              text: "काठी... गायब हो गई। मेरी रीढ़ पहली बार सालों में सीधी हो रही है। मेरे खुरों से खून नहीं बह रहा।" },
            { type: 'dialogue', speaker: 'स्टॉर्म', mood: 'after', requiresPrevChoice: 'compassion',
              text: "अब मैं दौड़ूँगा, बच्ची। ऐसे मैदानों में जिनका कोई अंत नहीं। और हर कदम तुम्हारा नाम लेकर चलेगा। अलविदा, दयालु आत्मा।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "आज़ाद दौड़ो, स्टॉर्म। हवा तुम्हारा इंतज़ार कर रही है।" },

            { type: 'transition', target: 'scene3' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  दृश्य 3 — अनाया गाय  (डेयरी)
    // ═══════════════════════════════════════════════
    scene3: {
        id: 'scene3',
        title: 'अनाया गाय',
        background: 'dairy-facility',
        backgroundAfter: 'dairy-meadow',
        music: 'suffering',
        musicAfter: 'freedom',
        explore: {
            enabled: true,
            animals: [
                { sprite: 'anaya-before', x: 60, scale: 1, zIndex: 1 },
                { sprite: 'anaya-calf-before', x: 48, scale: 0.7, zIndex: 2 }
            ],
            triggerX: 38
        },
        steps: [
            { type: 'dialogue', speaker: 'माया', mood: 'crying', text: "तुम क्यों रो रही हो? तुम्हारे साथ क्या हुआ?" },
            { type: 'dialogue', speaker: 'अनाया', mood: 'before', text: "मेरा बच्चा... पैदा होने के बस दो घंटे बाद ही उन्होंने उसे छीन लिया। वह अभी भी गीला था, अभी भी मुझे ढूँढ रहा था।" },
            { type: 'dialogue', speaker: 'बछड़ा', mood: 'before', text: "माँ? तुम कहाँ हो? मुझे तुम्हारी आवाज़ सुनाई दे रही है लेकिन मैं तुम्हें ढूँढ नहीं पा रहा... यहाँ बहुत अँधेरा और ठंड है..." },
            { type: 'dialogue', speaker: 'अनाया', mood: 'before', text: "मुझे बगल की बिल्डिंग से उसके रोने की आवाज़ आती है। वे उसे कुछ हफ़्तों में मार देंगे क्योंकि वह 'बेकार' है — डेयरी फ़ार्म में एक नर बछड़ा।" },
            { type: 'dialogue', speaker: 'अनाया', mood: 'before', text: "हर साल वे मुझे ज़बरदस्ती गर्भवती करते हैं। हर साल मेरा बच्चा छीन लेते हैं। और मेरे शरीर पर मशीनें लगाकर वह दूध निकालते हैं जो उसके लिए बना था।" },
            { type: 'dialogue', speaker: 'अनाया', mood: 'before', text: "जब मेरा शरीर थककर टूट जाता है, तो वे मुझे कटने भेज देते हैं। एक 'खर्च हो चुकी' माँ — यही कहते हैं वे मुझे।" },
            { type: 'dialogue', speaker: 'माया', mood: 'crying', text: "यह... यह है डेयरी उद्योग?" },

            { type: 'choice', choices: [
                { text: "मैं सभी डेयरी उत्पाद बंद करूँगी। दूध नहीं, पनीर नहीं, मक्खन नहीं। तुम्हारा दूध तुम्हारे बच्चे का है।", type: 'compassion', points: 2, response: "तुम ऐसा करोगी? मेरे आँसुओं से बना सब कुछ छोड़ दोगी?" },
                { text: "मैं डेयरी कम करने और पौधों से बने विकल्प आज़माने की कोशिश करूँगी।", type: 'partial', points: 1, response: "हर गिलास जो तुम नहीं पीतीं, एक माँ है जो अपने बच्चे को थोड़ा और रख पाती है। लेकिन 'कोशिश' के बाद भी हम में से बहुत सी रोती रहती हैं।" },
                { text: "इंसान तो हमेशा से दूध पीते आए हैं। यह प्राकृतिक और पौष्टिक है।", type: 'indifferent', points: 0, response: "प्राकृतिक? कोई भी वयस्क जानवर दूसरी प्रजाति का दूध नहीं पीता। तुमने बस एक माँ का प्यार चुराकर उसे एक डिब्बे में डाल दिया — जिस पर मुस्कुराती गाय की तस्वीर छपी है।" }
            ]},

            // ── पुष्टि ──
            { type: 'dialogue', speaker: 'अनाया', mood: 'before', requiresPrevChoice: 'compassion',
              text: "क्या तुम समझ रही हो कि तुम क्या कह रही हो?" },
            { type: 'dialogue', speaker: 'अनाया', mood: 'before', requiresPrevChoice: 'compassion',
              text: "दूध वाली चाय नहीं। पनीर नहीं। आइसक्रीम नहीं। चीज़ पिज़्ज़ा नहीं। रोटी पर मक्खन नहीं। इन सब में मेरे आँसू हैं। मेरे बच्चे का खून है।" },
            { type: 'dialogue', speaker: 'अनाया', mood: 'before', requiresPrevChoice: 'compassion',
              text: "क्या तुम सच में यह सब छोड़ने को तैयार हो... मेरे लिए?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "हाँ। तुम्हारा बच्चा मेरे स्वाद से ज़्यादा ज़रूरी है।", type: 'confirm_yes', points: 0, response: "तो तुमने मुझे वही दिया जो मैंने कभी चाहा — मेरा बच्चा मेरे पास। शुक्रिया, बच्ची। शुक्रिया।" },
                { text: "मैं... मुझे नहीं लगता मैं यह सब छोड़ पाऊँगी।", type: 'confirm_no', points: -1, response: "मैं समझती हूँ। तुम इसी में पली-बढ़ी हो। बस... अगली बार जब दूध का गिलास भरो, तो मेरा चेहरा याद रखना। शायद वही काफ़ी हो, धीरे-धीरे बदलने के लिए।" }
            ]},

            // ── विदाई ──
            { type: 'dialogue', speaker: 'अनाया', mood: 'after', requiresPrevChoice: 'compassion',
              text: "वह यहाँ है... मेरा बच्चा यहाँ है। वह मुझसे लिपट रहा है। मैं उसकी गर्मी महसूस कर सकती हूँ।" },
            { type: 'dialogue', speaker: 'बछड़ा', mood: 'before', requiresPrevChoice: 'compassion',
              text: "माँ! मैंने तुम्हें ढूँढ लिया! मैं तुम्हें कभी नहीं छोड़ूँगा!" },
            { type: 'dialogue', speaker: 'अनाया', mood: 'after', requiresPrevChoice: 'compassion',
              text: "जाओ अब, बच्ची। और जब दुनिया तुम्हें एक गिलास दूध दे, तो याद रखना — वह हमेशा किसी के बच्चे के लिए बना था। मुझे मेरा बच्चा लौटाने के लिए शुक्रिया।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "हमेशा साथ रहो। मैं वादा करती हूँ, तुम्हारे आँसू मुझ पर बेकार नहीं गए।" },

            { type: 'transition', target: 'scene4' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  दृश्य 4 — फैक्ट्री फ़ार्म  (माँस — मुर्गी, मछली, बकरी)
    // ═══════════════════════════════════════════════
    scene4: {
        id: 'scene4',
        title: 'फैक्ट्री फ़ार्म',
        background: 'factory-farm',
        backgroundAfter: 'factory-sanctuary',
        music: 'suffering',
        musicAfter: 'freedom',
        explore: {
            enabled: true,
            animals: [
                { sprite: 'goat-before', x: 60, scale: 0.5, zIndex: 1 },
                { sprite: 'hen-before', x: 70, scale: 0.3, zIndex: 2 },
                { sprite: 'fish-before', x: 47, scale: 0.35, zIndex: 3, bottom: '5%' }
            ],
            triggerX: 35
        },
        steps: [
            { type: 'dialogue', speaker: 'माया', mood: 'sad', text: "यहाँ कितना अँधेरा है... साँस लेना भी मुश्किल है। यह कौन सी जगह है?" },
            { type: 'dialogue', speaker: 'मुर्गी', mood: 'before', text: "फ़ैक्ट्री में स्वागत है, बच्ची। तुम्हारा खाना यहीं से आता है।" },
            { type: 'dialogue', speaker: 'मुर्गी', mood: 'before', text: "हम हज़ारों की तादाद में इतने छोटे पिंजरों में ठूँसी गई हैं कि हमारी हड्डियाँ हमारे अपने वज़न से टूट जाती हैं। हमने कभी सूर्य की रोशनी नहीं देखी। कभी ज़मीन नहीं छुई।" },
            { type: 'dialogue', speaker: 'बकरी', mood: 'before', text: "आज सुबह उन्होंने मेरे भाई का गला काटा। वह सिर्फ छह महीने का था। वह चीखता रहा जब तक कि नहीं चीख पाया। मेरी बारी अगली है।" },
            { type: 'dialogue', speaker: 'मछली', mood: 'before', text: "हमें समुद्र से इतने तंग जालों में खींचा गया कि हम एक दूसरे को कुचल गए। डेक पर हम घंटों तड़पते रहते हैं... साँस के लिए हाँफते हुए। कोई हमारे दर्द की परवाह भी नहीं करता।" },
            { type: 'dialogue', speaker: 'मुर्गी', mood: 'before', text: "अरबों को हर दिन मारा जाता है। ज़िंदा रहने के लिए नहीं। बस तुम्हारी जीभ पर कुछ पल के स्वाद के लिए।" },
            { type: 'dialogue', speaker: 'माया', mood: 'crying', text: "अरबों? हर दिन?" },
            { type: 'dialogue', speaker: 'मुर्गी', mood: 'before', text: "हर साल 80 अरब ज़मीनी जानवर कत्ल किए जाते हैं। और खरबों मछलियाँ समुद्र से खींची जाती हैं, जालों में धीरे-धीरे दम तोड़ती हुई। हमें दर्द होता है। हमें डर लगता है। हम भी जीना चाहती हैं। बिलकुल तुम्हारी तरह।" },

            { type: 'choice', choices: [
                { text: "मैं सभी माँस और मछली खाना बंद करूँगी। मेरी थाली पर अब कोई जीव नहीं मरेगा।", type: 'compassion', points: 2, response: "तुम... तुम सच में अपनी भूख से ज़्यादा हमारी ज़िंदगी चुनोगी?" },
                { text: "मैं माँस कम खाने और ज़्यादा शाकाहारी भोजन चुनने की कोशिश करूँगी।", type: 'partial', points: 1, response: "कम बेहतर है शून्य से। लेकिन 'कम' का मतलब अभी भी अरबों है। हर कम किया गया भोजन मायने रखता है... लेकिन हर बचा हुआ भी एक ज़िंदगी है जो छीनी गई।" },
                { text: "यह प्राकृतिक खाद्य श्रृंखला है। इंसान माँसाहारी हैं।", type: 'indifferent', points: 0, response: "खाद्य श्रृंखला? तुम हमें फ़ैक्ट्रियों में उगाते हो, रसायनों से भरते हो, और असेंबली लाइनों पर मारते हो। इसमें कुछ भी प्राकृतिक नहीं। तुमने बस पीड़ा को कुशल बना दिया है।" }
            ]},

            // ── पुष्टि ──
            { type: 'dialogue', speaker: 'मुर्गी', mood: 'before', requiresPrevChoice: 'compassion',
              text: "सोचो कि तुम्हारी ज़िंदगी में इसका सच में क्या मतलब होगा।" },
            { type: 'dialogue', speaker: 'बकरी', mood: 'before', requiresPrevChoice: 'compassion',
              text: "चिकन नहीं। मटन नहीं। फ़िश करी नहीं। कबाब नहीं। त्योहारों पर भी नहीं। रेस्तरां में भी नहीं। तब भी नहीं जब तुम्हारा परिवार प्यार से बनाकर खिलाए।" },
            { type: 'dialogue', speaker: 'मछली', mood: 'before', requiresPrevChoice: 'compassion',
              text: "हर भोजन मेरी ज़िंदगी और तुम्हारी सुविधा के बीच एक चुनाव होगा। क्या तुम सच में इसके साथ जी सकती हो?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "हाँ। हर जीवन मायने रखता है। मेरी थाली उनकी कब्रगाह नहीं होगी।", type: 'confirm_yes', points: 0, response: "तो तुमने एक फ़ैसले से ज़्यादा ज़िंदगियाँ बचाई हैं जितनी अधिकतर लोग पूरी उम्र में बचाते हैं। बूचड़खाने की चुप्पी तुमसे शुरू होती है।" },
                { text: "मैं चाहती हूँ... लेकिन मुझे नहीं पता मेरा परिवार समझेगा या नहीं।", type: 'confirm_no', points: -1, response: "मैं जानती हूँ। जो पिंजरा तुम तोड़ रही हो वह लोहे का नहीं — वह आदत, संस्कृति और उम्मीदों का है। लेकिन बस सवाल उठाना... वहीं से आज़ादी शुरू होती है।" }
            ]},

            // ── विदाई ──
            { type: 'dialogue', speaker: 'मुर्गी', mood: 'after', requiresPrevChoice: 'compassion',
              text: "पिंजरे खुल रहे हैं... पहली बार मिट्टी महसूस हो रही है। असली मिट्टी। मेरे पैरों के नीचे।" },
            { type: 'dialogue', speaker: 'बकरी', mood: 'after', requiresPrevChoice: 'compassion',
              text: "मेरा भाई... वह नहीं बचा। लेकिन तुम्हारी वजह से, शायद अब कोई और भाई पाँच मिनट के भोजन के लिए नहीं मरेगा।" },
            { type: 'dialogue', speaker: 'मछली', mood: 'after', requiresPrevChoice: 'compassion',
              text: "पानी फिर साफ़ है। मैं साँस ले पा रही हूँ। मुझे समुद्र में रहने देने के लिए शुक्रिया, जहाँ मैं हूँ।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "अपनी ज़िंदगी जियो। तुम सब। मेरी थाली फिर कभी तुम्हारी पीड़ा नहीं उठाएगी।" },

            { type: 'transition', target: 'scene5' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  दृश्य 5 — महारानी एरिया मधुमक्खी  (शहद)
    // ═══════════════════════════════════════════════
    scene5: {
        id: 'scene5',
        title: 'महारानी एरिया',
        background: 'dying-garden',
        backgroundAfter: 'blooming-garden',
        music: 'suffering',
        musicAfter: 'freedom',
        explore: {
            enabled: true,
            animals: [
                { sprite: 'queen-aria-before', x: 65, scale: 0.5, zIndex: 1 }
            ],
            triggerX: 45
        },
        steps: [
            { type: 'dialogue', speaker: 'माया', mood: 'sad', text: "छोटी मधुमक्खी... बगीचा मर चुका है। तुम बहुत कमज़ोर लग रही हो।" },
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'before', text: "इंसानों के छिड़के कीटनाशकों ने मेरे आधे परिवार को मार डाला। मेरी बेटियाँ ज़मीन पर पड़ी हैं, उनके पंख अब भी हैं।" },
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'before', text: "और जो थोड़ा शहद हम बना पाती हैं — वे वह भी चुरा लेते हैं। उसकी जगह चीनी का पानी दे देते हैं जो हमें अंदर से भूखा मार रहा है।" },
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'before', text: "जानती हो शहद क्या है? यह कोई 'उत्पाद' नहीं है। यह वह खाना है जो मेरे बच्चों को सर्दी से बचने के लिए चाहिए। एक शीशी शहद 12 मधुमक्खियों की पूरी ज़िंदगी की मेहनत है।" },
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'before', text: "मधुमक्खियों के बिना, दुनिया की 75% खाद्य फ़सलें ख़त्म हो जाएँगी। तुम जो हर तीसरा कौर खाती हो, वह इसलिए है क्योंकि एक मधुमक्खी ने उसे परागित किया था।" },
            { type: 'dialogue', speaker: 'माया', mood: 'sad', text: "मुझे कभी पता ही नहीं था... शहद की इतनी कीमत होती है।" },

            { type: 'choice', choices: [
                { text: "मैं शहद खाना बंद करूँगी। तुम्हारी मेहनत चुराने का मुझे कोई हक नहीं।", type: 'compassion', points: 2, response: "तुम मिठास छोड़ दोगी... ताकि मेरे बच्चे जी सकें?" },
                { text: "मैं सिर्फ नैतिक, छोटे पैमाने के मधुपालकों से खरीदूँगी।", type: 'partial', points: 1, response: "'नैतिक' मधुपालक भी हमारा लेते हैं और चीनी दे जाते हैं। तुम्हारी नीयत मायने रखती है। यह एक पुल है, मंज़िल नहीं।" },
                { text: "मधुमक्खियाँ ज़रूरत से ज़्यादा शहद बनाती हैं।", type: 'indifferent', points: 0, response: "यह वो बात है जो उन्होंने तुम्हें बताई ताकि तुम्हें दोषी न लगे। हम बिल्कुल उतना बनाती हैं जितना हमें ज़िंदा रहने के लिए चाहिए। जो वे लेते हैं वह हमारे बच्चों के मुँह से चुराया हुआ है।" }
            ]},

            // ── पुष्टि ──
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'before', requiresPrevChoice: 'compassion',
              text: "पक्की हो, बच्ची? चाय में शहद नहीं। टोस्ट पर शहद नहीं। शहद की मिठाइयाँ नहीं।" },
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'before', requiresPrevChoice: 'compassion',
              text: "जो मिठास तुम्हें अच्छी लगती है, वही मेरे बच्चों को ठंड से बचाती है। क्या तुम इसे छोड़ने को तैयार हो?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "हाँ। तुम्हारे बच्चों की ज़िंदगी किसी भी शहद से मीठी है।", type: 'confirm_yes', points: 0, response: "तो बगीचा फिर खिलेगा। जादू से नहीं — बल्कि इसलिए कि एक इंसान ने भूख पर दया को चुना। यही प्रकृति की सबसे ताकतवर शक्ति है।" },
                { text: "बस शहद है... मुझे नहीं लगता मैं इतना छोड़ पाऊँगी।", type: 'confirm_no', points: -1, response: "'बस' शहद है। और 'बस' हमारे बच्चे भूखे मर रहे हैं। लेकिन मैं देख रही हूँ कि तुम सोच रही हो। और सोच ही बदलाव का बीज है।" }
            ]},

            // ── विदाई ──
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'after', requiresPrevChoice: 'compassion',
              text: "चारों ओर देखो, बच्ची। फूल खिल रहे हैं। मेरी बेटियाँ उठ रही हैं। बगीचा फिर से साँस ले रहा है।" },
            { type: 'dialogue', speaker: 'महारानी एरिया', mood: 'after', requiresPrevChoice: 'compassion',
              text: "तुमने हमें हमारा खाना लौटा दिया, हमारा भविष्य, हमारे बच्चों का सर्दी से बचने का मौका। इस बगीचे में सबसे मीठी चीज़ शहद नहीं — तुम्हारा दिल है।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "आज़ाद उड़ो, छोटी रानी। तुम्हारा बगीचा फिर कभी चुप नहीं होगा।" },

            { type: 'transition', target: 'final' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  अंतिम — गाया / धरती (endings.js से गतिशील रूप से बनता है)
    // ═══════════════════════════════════════════════

    // ═══════════════════════════════════════════════
    //  उपसंहार — माया जागती है
    // ═══════════════════════════════════════════════
    epilogue: {
        id: 'epilogue',
        title: 'एक नई भोर',
        background: 'maya-room-morning',
        music: 'epilogue',
        explore: { enabled: false },
        steps: [
            { type: 'narration', text: "सुनहरी धूप खिड़की से अंदर आ रही है। चिड़ियों का गाना इतना ज़ोर से कभी नहीं सुना था माया ने।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "यह सिर्फ एक सपना था... लेकिन मैं अभी भी उनकी नज़रें महसूस कर सकती हूँ।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "शीशे के पीछे चलती ज़ारा। स्टॉर्म के खून से भरे खुर। अपने बच्चे के लिए रोती अनाया। अँधेरे में वो छोटे पंखहीन शरीर। एरिया का मरता हुआ परिवार।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "मुझे नहीं पता कि मैं पूरी दुनिया बदल सकती हूँ। लेकिन मुझे ठीक से पता है कि पहले किसे बदलना है।" },
            { type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "ख़ुद को।" },
            { type: 'transition', target: 'credits' }
        ]
    }
};
