/**
 * endings.js
 * Dynamically builds the Final (Gaia / Earth) scene based on the player's
 * choices and compassion points.  Each animal choice is reflected with
 * real-world statistics — soft for compassion, moderate for partial, and
 * harsh for indifferent.
 *
 * Also builds the dynamic epilogue "reflection" scene where Maya sees each
 * animal's fate based on her choices (before/after images with consequence dialogue).
 */

import { getEndingType } from './state.js';

// ═══════════════════════════════════════════════════════════════════
//  Build the dynamic ending scene
// ═══════════════════════════════════════════════════════════════════

export function buildFinalScene(state) {
    const lang = state.language;
    const ending = getEndingType();
    const choices = state.choicesMade;
    const steps = [];

    // ─── Gaia mood & background based on ending ───
    const gaiaMood = ending; // 'dying' | 'healing' | 'flourishing'
    const bgMap = {
        dying: 'final-dying',
        healing: 'final-healing',
        flourishing: 'final-flourishing'
    };
    const musicMap = {
        dying: 'gaia-dying',
        healing: 'gaia-healing',
        flourishing: 'gaia-flourishing'
    };

    // ─── Opening ───
    if (lang === 'en') {
        steps.push({ type: 'dialogue', speaker: 'Gaia', mood: gaiaMood,
            text: "Maya, child of Earth. You have walked through the dream. Now hear the truth of the waking world." });
        steps.push({ type: 'dialogue', speaker: 'Gaia', mood: gaiaMood,
            text: "Every choice you made was not just a story. It is the reality happening right now, as you sleep." });
    } else {
        steps.push({ type: 'dialogue', speaker: 'गाया', mood: gaiaMood,
            text: "माया, धरती की बेटी। तुमने सपने में चलकर देखा। अब जागती दुनिया का सच सुनो।" });
        steps.push({ type: 'dialogue', speaker: 'गाया', mood: gaiaMood,
            text: "तुमने जो हर चुनाव किया वह सिर्फ़ कहानी नहीं थी। यह वो सच्चाई है जो अभी, इसी वक़्त हो रही है — जब तुम सो रही हो।" });
    }

    // ─── Scene 1: Zoos ───
    addZooFacts(steps, choices.scene1, lang, gaiaMood);
    // ─── Scene 2: Horse Riding ───
    addHorseFacts(steps, choices.scene2, lang, gaiaMood);
    // ─── Scene 3: Dairy ───
    addDairyFacts(steps, choices.scene3, lang, gaiaMood);
    // ─── Scene 4: Meat ───
    addMeatFacts(steps, choices.scene4, lang, gaiaMood);
    // ─── Scene 5: Honey ───
    addHoneyFacts(steps, choices.scene5, lang, gaiaMood);

    // ─── Overall ending ───
    addOverallEnding(steps, ending, state.compassionPoints, lang, gaiaMood);

    steps.push({ type: 'transition', target: 'reflection' });

    return {
        id: 'final',
        title: lang === 'en' ? 'The Heart of Gaia' : 'गाया का हृदय',
        background: bgMap[ending],
        music: musicMap[ending] || 'gaia-healing',
        explore: { enabled: false },
        steps
    };
}

// ═══════════════════════════════════════════════════════════════════
//  Build the dynamic REFLECTION scene (Animal Consequences)
//  Shows each animal's fate based on player choices
// ═══════════════════════════════════════════════════════════════════

export function buildReflectionScene(state) {
    const lang = state.language;
    const ending = getEndingType();
    const choices = state.choicesMade;
    const steps = [];

    // ─── Opening narration ───
    if (lang === 'en') {
        steps.push({ type: 'narration',
            text: "The dream begins to fade. But before Maya wakes, the faces of those she met return to her... one last time." });
    } else {
        steps.push({ type: 'narration',
            text: "सपना धुंधला पड़ने लगा है। लेकिन माया के जागने से पहले, जिनसे वह मिली उनके चेहरे एक आख़िरी बार लौटते हैं..." });
    }

    // ─── Zara (Scene 1) ───
    addAnimalReflection(steps, {
        lang,
        choice: choices.scene1,
        animalName: lang === 'en' ? 'Zara' : 'ज़ारा',
        showAnimal: 'zara',
        bg: choices.scene1 === 'compassion' ? 'zoo-savanna' : 'zoo-cage',
        compassionDialogue: lang === 'en'
            ? ["Zara stands proud in the open savanna, her golden fur catching the sunset wind.", "Because of you, she remembers what freedom feels like. She runs free now — and always will."]
            : ["ज़ारा खुले सवाना में गर्व से खड़ी है, उसका सुनहरा फर सूर्यास्त की हवा में लहरा रहा है।", "तुम्हारी वजह से उसे याद है आज़ादी कैसी होती है। वह अब आज़ाद दौड़ती है — और हमेशा दौड़ेगी।"],
        partialDialogue: lang === 'en'
            ? ["Zara still paces behind bars. Three steps forward, three steps back.", "She heard your words about sanctuaries. She is still waiting for you to do more."]
            : ["ज़ारा अभी भी सलाखों के पीछे चक्कर काट रही है। तीन कदम आगे, तीन कदम पीछे।", "उसने अभयारण्यों के बारे में तुम्हारी बात सुनी। वह अभी भी इंतज़ार कर रही है कि तुम और करो।"],
        indifferentDialogue: lang === 'en'
            ? ["Zara lies motionless on the cold concrete. Her eyes are empty now.", "You called it education. She calls it a death sentence she never earned. The grooves in the stone grow deeper every day."]
            : ["ज़ारा ठंडे फ़र्श पर बेजान पड़ी है। उसकी आँखें अब खाली हैं।", "तुमने इसे शिक्षा कहा। वह इसे वो सज़ा कहती है जो उसने कभी कमाई नहीं। पत्थर पर निशान हर दिन गहरे होते जा रहे हैं।"]
    });

    // ─── Storm (Scene 2) ───
    addAnimalReflection(steps, {
        lang,
        choice: choices.scene2,
        animalName: lang === 'en' ? 'Storm' : 'स्टॉर्म',
        showAnimal: 'storm',
        bg: choices.scene2 === 'compassion' ? 'mountain-meadow' : 'mountain-path',
        compassionDialogue: lang === 'en'
            ? ["Storm gallops across an endless green meadow. No saddle. No bit. No bleeding hooves.", "His spine is straight for the first time in years. Every stride carries your name."]
            : ["स्टॉर्म अंतहीन हरे मैदान में दौड़ रहा है। कोई काठी नहीं। कोई लगाम नहीं। कोई खून बहते खुर नहीं।", "उसकी रीढ़ सालों में पहली बार सीधी है। हर कदम तुम्हारा नाम लेकर चलता है।"],
        partialDialogue: lang === 'en'
            ? ["Storm still carries strangers up the scorching mountain. His back is breaking.", "You promised 'well-treated' horses. But the wounds are hidden under the saddle where you cannot see."]
            : ["स्टॉर्म अभी भी तपती चट्टान पर अजनबियों को ढो रहा है। उसकी कमर टूट रही है।", "तुमने 'अच्छे व्यवहार' का वादा किया। लेकिन ज़ख्म काठी के नीचे छिपे हैं जहाँ तुम देख नहीं सकतीं।"],
        indifferentDialogue: lang === 'en'
            ? ["Storm collapsed on the trail yesterday. They dragged his body off the path and brought a younger horse.", "He carried tourists for thirteen years. No one ever asked if he wanted to stop. You called it natural."]
            : ["स्टॉर्म कल रास्ते पर गिर गया। उन्होंने उसका शरीर रास्ते से हटाया और एक छोटा घोड़ा ले आए।", "उसने तेरह साल पर्यटकों को ढोया। किसी ने कभी नहीं पूछा कि क्या वह रुकना चाहता है। तुमने इसे स्वाभाविक कहा।"]
    });

    // ─── Anaya (Scene 3) ───
    addAnimalReflection(steps, {
        lang,
        choice: choices.scene3,
        animalName: lang === 'en' ? 'Anaya' : 'अनाया',
        showAnimal: 'anaya',
        bg: choices.scene3 === 'compassion' ? 'dairy-meadow' : 'dairy-facility',
        compassionDialogue: lang === 'en'
            ? ["Anaya nuzzles her calf in a warm green meadow. They are together — finally, forever.", "Her milk is for her baby now. Not for a carton. Not for your cereal. For her child. Because of you."]
            : ["अनाया हरे मैदान में अपने बछड़े को प्यार कर रही है। वे साथ हैं — आख़िरकार, हमेशा के लिए।", "उसका दूध अब उसके बच्चे के लिए है। किसी डिब्बे के लिए नहीं। तुम्हारे नाश्ते के लिए नहीं। उसके बच्चे के लिए। तुम्हारी वजह से।"],
        partialDialogue: lang === 'en'
            ? ["Anaya still presses against the cold metal fence. She can hear her calf crying in the next building.", "You said you'd 'reduce' dairy. But her baby was taken again this morning. There is no 'moderate' version of a stolen child."]
            : ["अनाया अभी भी ठंडी लोहे की बाड़ से चिपकी है। उसे बगल की बिल्डिंग से अपने बछड़े के रोने की आवाज़ आती है।", "तुमने डेयरी 'कम' करने की बात कही। लेकिन आज सुबह फिर उसका बच्चा छीन लिया गया। चुराए हुए बच्चे का कोई 'मध्यम' संस्करण नहीं होता।"],
        indifferentDialogue: lang === 'en'
            ? ["Anaya's calf was killed three weeks after birth. He was 'useless' — a male in a dairy farm.", "She screamed for days. Now she is silent. The machines keep pumping. You called her milk natural and nutritious."]
            : ["अनाया का बछड़ा पैदा होने के तीन हफ़्ते बाद मार दिया गया। वह 'बेकार' था — डेयरी फ़ार्म में एक नर।", "वह दिनों तक चिल्लाती रही। अब वह चुप है। मशीनें चलती रहती हैं। तुमने उसके दूध को प्राकृतिक और पौष्टिक कहा।"]
    });

    // ─── Factory Farm animals (Scene 4) ───
    addFactoryReflection(steps, {
        lang,
        choice: choices.scene4,
        bg: choices.scene4 === 'compassion' ? 'factory-sanctuary' : 'factory-farm',
        compassionDialogue: [
            { speaker: 'Hen', mood: choices.scene4 === 'compassion' ? 'after' : 'before', text: "The hen spreads her wings in the open sun for the first time. She feels the soil. She is finally alive." },
            { speaker: 'Goat', mood: choices.scene4 === 'compassion' ? 'after' : 'before', text: "The goat jumps on hay bales, playing. His brother didn't make it — but because of you, no more brothers will die for a five-minute meal." },
            { speaker: 'Fish', mood: choices.scene4 === 'compassion' ? 'after' : 'before', text: "The fish swims in clear water, leaping with joy. She can breathe again. You let her stay in the ocean where she belongs." }
        ],
        partialDialogue: [
            { speaker: 'Hen', mood: 'before', text: "The hen is still cramped in her cage. She cannot turn around. Her bones break under the weight of her own body." },
            { speaker: 'Goat', mood: 'before', text: "The goat still trembles in line. You said you'd eat 'less.' His brother was killed this morning anyway." },
            { speaker: 'Fish', mood: 'before', text: "The fish still gasps in the crowded tank. 'Less' is not zero. She is still suffocating." }
        ],
        indifferentDialogue: [
            { speaker: 'Hen', mood: 'before', text: "80 billion. That is how many die every year. The hen is one of them. She never saw sunlight. You called it the food chain." },
            { speaker: 'Goat', mood: 'before', text: "The goat's throat was slit this afternoon. He was six months old. He screamed until he couldn't. You said it was natural." },
            { speaker: 'Fish', mood: 'before', text: "A trillion fish suffocate in nets each year. She was one of them. No one even considered her pain." }
        ],
        compassionDialogueHi: [
            { speaker: 'मुर्गी', mood: choices.scene4 === 'compassion' ? 'after' : 'before', text: "मुर्गी पहली बार खुली धूप में अपने पंख फैलाती है। उसे मिट्टी महसूस हो रही है। वह आख़िरकार ज़िंदा है।" },
            { speaker: 'बकरी', mood: choices.scene4 === 'compassion' ? 'after' : 'before', text: "बकरी भूसे के गट्ठरों पर कूद रही है, खेल रही है। उसका भाई नहीं बचा — लेकिन तुम्हारी वजह से, अब कोई और भाई पाँच मिनट के खाने के लिए नहीं मरेगा।" },
            { speaker: 'मछली', mood: choices.scene4 === 'compassion' ? 'after' : 'before', text: "मछली साफ़ पानी में खुशी से तैर रही है। वह फिर साँस ले पा रही है। तुमने उसे समुद्र में रहने दिया जहाँ वह है।" }
        ],
        partialDialogueHi: [
            { speaker: 'मुर्गी', mood: 'before', text: "मुर्गी अभी भी अपने पिंजरे में है। वह घूम भी नहीं सकती। उसकी हड्डियाँ अपने ही वज़न से टूट रही हैं।" },
            { speaker: 'बकरी', mood: 'before', text: "बकरी अभी भी कतार में काँप रही है। तुमने 'कम' खाने की बात कही। उसका भाई आज सुबह फिर भी मारा गया।" },
            { speaker: 'मछली', mood: 'before', text: "मछली अभी भी भरी हुई टंकी में हाँफ रही है। 'कम' शून्य नहीं है। वह अभी भी दम तोड़ रही है।" }
        ],
        indifferentDialogueHi: [
            { speaker: 'मुर्गी', mood: 'before', text: "80 अरब। इतने हर साल मरते हैं। मुर्गी उनमें से एक है। उसने कभी सूरज नहीं देखा। तुमने इसे खाद्य श्रृंखला कहा।" },
            { speaker: 'बकरी', mood: 'before', text: "आज दोपहर बकरी का गला काटा गया। वह छह महीने का था। वह चीखता रहा जब तक नहीं चीख पाया। तुमने कहा यह स्वाभाविक है।" },
            { speaker: 'मछली', mood: 'before', text: "हर साल खरबों मछलियाँ जालों में तड़पती हैं। वह उनमें से एक थी। किसी ने उसके दर्द की परवाह भी नहीं की।" }
        ]
    });

    // ─── Queen Aria (Scene 5) ───
    addAnimalReflection(steps, {
        lang,
        choice: choices.scene5,
        animalName: lang === 'en' ? 'Queen Aria' : 'महारानी एरिया',
        showAnimal: 'queen-aria',
        bg: choices.scene5 === 'compassion' ? 'blooming-garden' : 'dying-garden',
        compassionDialogue: lang === 'en'
            ? ["Queen Aria leads her colony in a spiral dance through a garden exploding with color.", "The flowers bloom because you let her children keep their food. The sweetest thing in this garden is your heart."]
            : ["महारानी एरिया अपने परिवार के साथ रंगों से भरे बगीचे में नाच रही है।", "फूल खिल रहे हैं क्योंकि तुमने उसके बच्चों को उनका खाना रखने दिया। इस बगीचे में सबसे मीठी चीज़ तुम्हारा दिल है।"],
        partialDialogue: lang === 'en'
            ? ["Queen Aria's wings are still weak. Half her daughters lie fallen on the ground.", "You chose 'ethical' honey. But even ethical keepers take what is theirs. Her colony is fading."]
            : ["महारानी एरिया के पंख अभी भी कमज़ोर हैं। उसकी आधी बेटियाँ ज़मीन पर पड़ी हैं।", "तुमने 'नैतिक' शहद चुना। लेकिन नैतिक मधुपालक भी उनका लेते हैं। उसका परिवार मिट रहा है।"],
        indifferentDialogue: lang === 'en'
            ? ["Queen Aria's colony has collapsed. The garden is silent. No buzzing. No life.", "You said they make more than they need. They didn't. Now 75% of the food crops that depend on them are dying too."]
            : ["महारानी एरिया का परिवार ख़त्म हो गया। बगीचा शांत है। कोई भनभनाहट नहीं। कोई ज़िंदगी नहीं।", "तुमने कहा वे ज़रूरत से ज़्यादा बनाती हैं। नहीं बनाती थीं। अब उन पर निर्भर 75% फ़सलें भी मर रही हैं।"]
    });

    // ─── Final closing narration ───
    if (lang === 'en') {
        if (ending === 'flourishing') {
            steps.push({ type: 'narration', text: "Every animal Maya met is free. Every promise she made became a key that unlocked a cage. The dream glows golden as it fades..." });
        } else if (ending === 'healing') {
            steps.push({ type: 'narration', text: "Some animals are free. Some still wait. Maya carries both their joy and their pain as the dream slowly fades..." });
        } else {
            steps.push({ type: 'narration', text: "The faces fade into darkness. The cries grow distant. But they never truly go silent. They will wait for Maya to remember..." });
        }
    } else {
        if (ending === 'flourishing') {
            steps.push({ type: 'narration', text: "माया जिनसे मिली, हर जानवर आज़ाद है। उसका हर वादा एक चाबी बन गया जिसने एक पिंजरा खोला। सपना सुनहरा चमकता हुआ धुंधला होता है..." });
        } else if (ending === 'healing') {
            steps.push({ type: 'narration', text: "कुछ जानवर आज़ाद हैं। कुछ अभी भी इंतज़ार कर रहे हैं। माया उनकी ख़ुशी और दर्द दोनों लेकर जाती है जब सपना धीरे-धीरे धुंधला होता है..." });
        } else {
            steps.push({ type: 'narration', text: "चेहरे अँधेरे में ग़ायब हो जाते हैं। रोने की आवाज़ें दूर होती जाती हैं। लेकिन वे कभी पूरी तरह चुप नहीं होती हैं। वे माया के याद करने का इंतज़ार करेंगे..." });
        }
    }

    steps.push({ type: 'transition', target: 'epilogue' });

    // Use dream-entrance as a mystical transitional background for reflection
    return {
        id: 'reflection',
        title: lang === 'en' ? 'The Weight of Choices' : 'चुनावों का बोझ',
        background: 'dream-entrance',
        music: ending === 'flourishing' ? 'gaia-flourishing' : ending === 'healing' ? 'gaia-healing' : 'gaia-dying',
        explore: { enabled: false },
        steps
    };
}

// ═══════════════════════════════════════════════════════════════════
//  Build the dynamic EPILOGUE scene (Maya Wakes Up)
//  Dialogue changes based on the player's ending
// ═══════════════════════════════════════════════════════════════════

export function buildEpilogueScene(state) {
    const lang = state.language;
    const ending = getEndingType();
    const steps = [];

    if (ending === 'flourishing') {
        // ─── BEST ENDING: Hopeful, determined Maya ───
        if (lang === 'en') {
            steps.push({ type: 'narration', text: "Golden sunlight streams through the window. The birdsong is louder than Maya has ever heard it." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "It was just a dream... but I can still feel their eyes on me. Grateful eyes." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "Zara running free in the savanna. Storm galloping through endless meadows. Anaya nuzzling her baby. The hen spreading her wings in the sun. Aria's garden exploding with color." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "I made every promise. I meant every word. And from today... my life changes." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "No more cages. No more cruelty. No more looking away. I am the change this world needs." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "Starting now." });
        } else {
            steps.push({ type: 'narration', text: "सुनहरी धूप खिड़की से अंदर आ रही है। चिड़ियों का गाना इतना ज़ोर से कभी नहीं सुना था माया ने।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "यह सिर्फ एक सपना था... लेकिन मैं अभी भी उनकी नज़रें महसूस कर सकती हूँ। शुक्रगुज़ार नज़रें।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "सवाना में आज़ाद दौड़ती ज़ारा। अंतहीन मैदानों में सरपट भागता स्टॉर्म। अपने बच्चे को प्यार करती अनाया। धूप में पंख फैलाती मुर्गी। रंगों से भरा एरिया का बगीचा।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "मैंने हर वादा किया। हर शब्द दिल से कहा। और आज से... मेरी ज़िंदगी बदलती है।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "अब कोई पिंजरा नहीं। कोई क्रूरता नहीं। कोई आँखें चुराना नहीं। मैं वो बदलाव हूँ जो इस दुनिया को चाहिए।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "अभी से।" });
        }
    } else if (ending === 'healing') {
        // ─── NEUTRAL ENDING: Conflicted, uneasy Maya ───
        if (lang === 'en') {
            steps.push({ type: 'narration', text: "Pale morning light filters through the window. The world outside feels quieter than usual." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "That dream... it won't leave me alone. Their faces. Their voices." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "Some of them were free because of me. But others... others were still waiting. Still suffering." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'neutral', text: "I tried. I really did. But was 'trying' enough? Was 'reducing' enough when they needed me to stop completely?" });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'neutral', text: "I don't know if I can change everything overnight. But I know I can't go back to pretending I don't know." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "Tomorrow, I'll do better. The promises I couldn't make last night... maybe I can learn to make them." });
        } else {
            steps.push({ type: 'narration', text: "हल्की सुबह की रोशनी खिड़की से छन रही है। बाहर की दुनिया हमेशा से ज़्यादा शांत लग रही है।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'sad', text: "वो सपना... पीछा नहीं छोड़ रहा। उनके चेहरे। उनकी आवाज़ें।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'sad', text: "कुछ मेरी वजह से आज़ाद थे। लेकिन बाकी... बाकी अभी भी इंतज़ार कर रहे थे। अभी भी तड़प रहे थे।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'neutral', text: "मैंने कोशिश की। सच में की। लेकिन क्या 'कोशिश' काफ़ी थी? क्या 'कम करना' काफ़ी था जब उन्हें मुझसे पूरी तरह रुकने की ज़रूरत थी?" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'neutral', text: "मुझे नहीं पता कि मैं रातोंरात सब कुछ बदल सकती हूँ। लेकिन मैं जानती हूँ कि अब अनजान बनने का बहाना नहीं बना सकती।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'hopeful', text: "कल, मैं बेहतर करूँगी। जो वादे रात में नहीं कर पाई... शायद मैं उन्हें करना सीख सकती हूँ।" });
        }
    } else {
        // ─── WORST ENDING: Haunted, regretful Maya ───
        if (lang === 'en') {
            steps.push({ type: 'narration', text: "The room feels cold. Grey light seeps through the curtains. Something heavy sits in Maya's chest." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'crying', text: "I can't breathe... what did I do?" });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'crying', text: "Zara is still pacing. Storm collapsed on the trail. Anaya's baby was taken. They killed the goat. The bees are dying. And I... I just watched." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "I said it was natural. I said it was necessary. I said the same things everyone says." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "But I heard them. I looked into their eyes. I saw the truth. And I still chose my comfort over their lives." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'neutral', text: "...but it was just a dream, right? I can still change. It's not too late." });
            steps.push({ type: 'dialogue', speaker: 'Maya', mood: 'neutral', text: "Is it?" });
        } else {
            steps.push({ type: 'narration', text: "कमरा ठंडा लग रहा है। स्लेटी रोशनी पर्दों से रिस रही है। माया के सीने पर कुछ भारी बैठा है।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'crying', text: "साँस नहीं आ रही... मैंने क्या किया?" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'crying', text: "ज़ारा अभी भी चक्कर काट रही है। स्टॉर्म रास्ते पर गिर गया। अनाया का बच्चा छीन लिया गया। उन्होंने बकरी को मार दिया। मधुमक्खियाँ मर रही हैं। और मैं... मैंने बस देखा।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'sad', text: "मैंने कहा यह प्राकृतिक है। मैंने कहा यह ज़रूरी है। वही बातें कहीं जो सब कहते हैं।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'sad', text: "लेकिन मैंने उन्हें सुना। उनकी आँखों में देखा। सच देखा। और फिर भी अपनी सुविधा को उनकी ज़िंदगी से ऊपर रखा।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'neutral', text: "...लेकिन यह सिर्फ एक सपना था, है ना? मैं अभी भी बदल सकती हूँ। बहुत देर नहीं हुई।" });
            steps.push({ type: 'dialogue', speaker: 'माया', mood: 'neutral', text: "...है ना?" });
        }
    }

    steps.push({ type: 'transition', target: 'credits' });

    return {
        id: 'epilogue',
        title: lang === 'en' ? 'A New Dawn' : 'एक नई भोर',
        background: 'maya-room-morning',
        music: 'epilogue',
        explore: { enabled: false },
        steps
    };
}

// ═══════════════════════════════════════════════════════════════════
//  Helper: Add a single animal's reflection
// ═══════════════════════════════════════════════════════════════════

function addAnimalReflection(steps, config) {
    const { lang, choice, animalName, showAnimal, bg, compassionDialogue, partialDialogue, indifferentDialogue } = config;
    const mood = choice === 'compassion' ? 'after' : 'before';

    // Background change for this reflection
    steps.push({ type: 'narration', text: '', setBackground: bg });

    if (choice === 'compassion') {
        for (const line of compassionDialogue) {
            steps.push({ type: 'dialogue', speaker: animalName, mood: 'after', text: line, showAnimal });
        }
    } else if (choice === 'partial') {
        for (const line of partialDialogue) {
            steps.push({ type: 'dialogue', speaker: animalName, mood: 'before', text: line, showAnimal });
        }
    } else {
        for (const line of indifferentDialogue) {
            steps.push({ type: 'dialogue', speaker: animalName, mood: 'before', text: line, showAnimal });
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
//  Helper: Add factory farm animals' reflection (3 animals)
// ═══════════════════════════════════════════════════════════════════

function addFactoryReflection(steps, config) {
    const { lang, choice, bg } = config;
    
    steps.push({ type: 'narration', text: '', setBackground: bg });

    let dialogues;
    if (choice === 'compassion') {
        dialogues = lang === 'en' ? config.compassionDialogue : config.compassionDialogueHi;
    } else if (choice === 'partial') {
        dialogues = lang === 'en' ? config.partialDialogue : config.partialDialogueHi;
    } else {
        dialogues = lang === 'en' ? config.indifferentDialogue : config.indifferentDialogueHi;
    }

    for (const d of dialogues) {
        steps.push({ type: 'dialogue', speaker: d.speaker, mood: d.mood, text: d.text });
    }
}


// ═══════════════════════════════════════════════════════════════════
//  Individual Scene Facts (Gaia's statistics)
// ═══════════════════════════════════════════════════════════════════

function addZooFacts(steps, choice, lang, gaiaMood) {
    const speaker = lang === 'en' ? 'Gaia' : 'गाया';
    if (choice === 'compassion') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You vowed to never cage a wild soul for entertainment. Right now, over 10,000 elephants, lions, and bears pace in captivity worldwide — slowly losing their minds in spaces smaller than your bedroom."
                : "तुमने कसम खाई कि कभी किसी जंगली आत्मा को मनोरंजन के लिए कैद नहीं करोगी। इस वक़्त दुनिया भर में 10,000 से ज़्यादा हाथी, शेर और भालू कैद में घूम रहे हैं — तुम्हारे कमरे से छोटी जगहों में धीरे-धीरे पागल हो रहे हैं।" });
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "By keeping your promise, you refuse to fund their imprisonment. Every empty seat is a cage that will never be built. You saved them."
                : "अपना वादा निभाकर, तुम उनकी कैद के लिए पैसे देने से इनकार कर रही हो। हर खाली सीट एक पिंजरा है जो कभी नहीं बनेगा। तुमने उन्हें बचाया।" });
    } else if (choice === 'partial') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You chose sanctuaries over zoos. That is better. But know this — over 10,000 wild animals still pace behind bars worldwide, their spirits broken. Captive elephants live 40 fewer years than their wild counterparts. The ticket price funds their slow death."
                : "तुमने चिड़ियाघरों की जगह अभयारण्य चुने। यह बेहतर है। लेकिन जान लो — 10,000 से ज़्यादा जंगली जानवर अभी भी सलाखों के पीछे हैं, उनकी आत्माएँ टूटी हुई हैं। कैद हाथी अपने जंगली साथियों से 40 साल कम जीते हैं।" });
    } else {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You looked away from Zara. So does the world. Over 10,000 wild animals rot in cages right now. Studies prove captive elephants live 40 fewer years than free ones. You called it education — they call it a death sentence. Every ticket buys another cage."
                : "तुमने ज़ारा से नज़रें चुरा लीं। दुनिया भी यही करती है। 10,000 से ज़्यादा जंगली जानवर अभी पिंजरों में सड़ रहे हैं। शोध साबित करते हैं कि कैदी हाथी आज़ाद हाथियों से 40 साल कम जीते हैं। तुमने इसे शिक्षा कहा — वे इसे मौत की सज़ा कहते हैं।" });
    }
}

function addHorseFacts(steps, choice, lang, gaiaMood) {
    const speaker = lang === 'en' ? 'Gaia' : 'गाया';
    if (choice === 'compassion') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You promised to never ride a horse for entertainment. Millions of horses worldwide suffer spinal damage, mouth injuries from bits, and are worked until they collapse. Carriage horses in cities last only 4 years before they break down."
                : "तुमने वादा किया कि कभी मनोरंजन के लिए घोड़े पर नहीं बैठोगी। दुनिया भर में लाखों घोड़े रीढ़ की हड्डी की चोट, लगाम से मुँह में ज़ख्म, और गिरने तक काम करने की यातना सहते हैं। शहर के बग्गी घोड़े सिर्फ 4 साल चलते हैं टूटने से पहले।" });
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "Your two feet are enough. By walking your own path, you freed Storm and thousands like him."
                : "तुम्हारे दो पैर काफ़ी हैं। अपना रास्ता खुद चलकर, तुमने स्टॉर्म और हज़ारों उसके जैसों को आज़ाद किया।" });
    } else if (choice === 'partial') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You said you'd find 'well-treated' horses. But the truth is — no horse wants a metal bit cutting their mouth, no horse chooses to carry a stranger up a mountain. Over 100,000 horses die every year from overwork, exhaustion, and neglect in the tourism industry alone."
                : "तुमने 'अच्छे व्यवहार' वाले घोड़े ढूँढने की बात कही। सच यह है — कोई घोड़ा नहीं चाहता कि लोहे का लगाम उसका मुँह काटे, कोई घोड़ा किसी अजनबी को पहाड़ पर ढोना नहीं चुनता। सिर्फ पर्यटन उद्योग में हर साल 1,00,000 से ज़्यादा घोड़े अत्यधिक काम से मरते हैं।" });
    } else {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You said riding horses is natural. Nature never put metal in a horse's mouth or strapped a saddle to its spine. Over 100,000 horses die every year from overwork in tourism. Their 'natural' life with humans is nothing but modern slavery wearing a saddle."
                : "तुमने कहा घोड़ों पर सवारी प्राकृतिक है। प्रकृति ने कभी घोड़े के मुँह में लोहा नहीं डाला, न उसकी रीढ़ पर काठी बाँधी। पर्यटन में हर साल 1,00,000 से ज़्यादा घोड़े अत्यधिक काम से मर जाते हैं। इंसानों के साथ उनकी 'प्राकृतिक' ज़िंदगी बस काठी पहने हुए आधुनिक गुलामी है।" });
    }
}

function addDairyFacts(steps, choice, lang, gaiaMood) {
    const speaker = lang === 'en' ? 'Gaia' : 'गाया';
    if (choice === 'compassion') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You chose to stop consuming dairy. Know this: 270 million cows are used for milk worldwide. Their calves are taken within hours of birth. Male calves — millions of them — are killed within weeks because they are 'useless' to the dairy industry."
                : "तुमने डेयरी छोड़ने का फ़ैसला किया। यह जानो: दुनिया भर में 27 करोड़ गायें दूध के लिए इस्तेमाल होती हैं। उनके बछड़े पैदा होने के घंटों बाद ही छीन लिए जाते हैं। नर बछड़े — लाखों की संख्या में — हफ़्तों में मार दिए जाते हैं क्योंकि वे डेयरी उद्योग के लिए 'बेकार' हैं।" });
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "Every glass of plant milk you choose instead is a mother who keeps her baby. You gave Anaya back her child."
                : "तुम जो हर गिलास पौधों का दूध चुनती हो, वह एक माँ है जो अपना बच्चा रख पाती है। तुमने अनाया को उसका बच्चा लौटा दिया।" });
    } else if (choice === 'partial') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You said you'd reduce dairy. 270 million cows cry for their stolen calves right now. The dairy industry produces more greenhouse gas than all the world's planes, trains, and ships combined. Every reduction helps — but a mother's grief has no 'moderate' setting."
                : "तुमने डेयरी कम करने की बात कही। इस वक़्त 27 करोड़ गायें अपने चुराए गए बछड़ों के लिए रो रही हैं। डेयरी उद्योग दुनिया के सभी विमानों, ट्रेनों और जहाज़ों से ज़्यादा ग्रीनहाउस गैस पैदा करता है। हर कटौती मदद करती है — लेकिन एक माँ के दुख में 'मध्यम' जैसा कुछ नहीं होता।" });
    } else {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You called milk natural and nutritious. Then hear this: humans are the only species that drinks another animal's milk after infancy. 270 million cows are forcibly impregnated, their babies stolen, their bodies drained dry. When they collapse from exhaustion — usually by age 5 instead of their natural 20 — they are sent to slaughter. Your 'natural' glass of milk is a mother's lifetime of torture in a carton."
                : "तुमने दूध को प्राकृतिक और पौष्टिक कहा। तो यह सुनो: इंसान एकमात्र प्रजाति है जो बचपन के बाद भी दूसरे जानवर का दूध पीती है। 27 करोड़ गायों को ज़बरदस्ती गर्भवती किया जाता है, उनके बच्चे छीने जाते हैं, उनके शरीर निचोड़ दिए जाते हैं। जब वे 5 साल में ही गिर जाती हैं — अपनी 20 साल की प्राकृतिक उम्र के बजाय — उन्हें कत्ल भेज दिया जाता है।" });
    }
}

function addMeatFacts(steps, choice, lang, gaiaMood) {
    const speaker = lang === 'en' ? 'Gaia' : 'गाया';
    if (choice === 'compassion') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You chose to stop eating meat. The numbers are staggering: 80 billion land animals and over 1 trillion fish are killed every single year for human consumption. That is 2.7 million animals slaughtered every minute."
                : "तुमने माँस खाना बंद करने का फ़ैसला किया। आँकड़े चौंकाने वाले हैं: हर साल 80 अरब ज़मीनी जानवर और 1 खरब से ज़्यादा मछलियाँ इंसानों के खाने के लिए मारी जाती हैं। यानी हर मिनट 27 लाख जानवर कत्ल।" });
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "Animal farming uses 77% of all agricultural land but produces only 18% of the world's calories. It is the leading cause of deforestation, habitat loss, and species extinction. By choosing your plate wisely, you saved more lives than you can count."
                : "पशु पालन सभी कृषि भूमि का 77% इस्तेमाल करता है लेकिन दुनिया की सिर्फ 18% कैलोरी पैदा करता है। यह वनों की कटाई, आवास हानि और प्रजातियों के विलुप्त होने का प्रमुख कारण है। अपनी थाली समझदारी से चुनकर, तुमने अनगिनत ज़िंदगियाँ बचाईं।" });
    } else if (choice === 'partial') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You said you would eat less meat. Every year, 80 billion land animals are slaughtered — 2.7 million every minute. Animal agriculture produces 14.5% of all greenhouse gas emissions, more than every car, truck, and plane on Earth. 'Eating less' saves some — but billions still die screaming."
                : "तुमने कहा कि कम माँस खाओगी। हर साल 80 अरब ज़मीनी जानवर मारे जाते हैं — हर मिनट 27 लाख। पशु पालन सभी ग्रीनहाउस गैसों का 14.5% पैदा करता है, दुनिया की हर कार, ट्रक और हवाई जहाज़ से ज़्यादा। 'कम खाना' कुछ बचाता है — लेकिन अरबों अभी भी चीखते हुए मरते हैं।" });
    } else {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You called it the natural food chain. There is nothing natural about it. 80 billion animals are factory-farmed each year in windowless sheds, pumped with antibiotics, and killed on assembly lines. 80% of all antibiotics produced are fed to farm animals — creating superbugs that threaten your own survival."
                : "तुमने इसे प्राकृतिक खाद्य श्रृंखला कहा। इसमें कुछ भी प्राकृतिक नहीं। 80 अरब जानवर हर साल बिना खिड़कियों वाले शेड में पाले जाते हैं, एंटीबायोटिक्स भरे जाते हैं, और असेंबली लाइनों पर मारे जाते हैं। दुनिया में बनने वाली 80% एंटीबायोटिक्स फ़ार्म जानवरों को खिलाई जाती हैं — जो सुपरबग्स बना रही हैं जो खुद तुम्हारे अस्तित्व को खतरे में डालते हैं।" });
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "Animal agriculture causes 14.5% of all greenhouse emissions, uses 77% of farmland for just 18% of calories, and is the leading driver of deforestation and ocean dead zones. Your 'food chain' is choking the planet."
                : "पशु पालन सभी ग्रीनहाउस उत्सर्जन का 14.5% कारण है, 77% कृषि भूमि सिर्फ 18% कैलोरी के लिए इस्तेमाल करता है, और वनों की कटाई तथा समुद्री मृत क्षेत्रों का मुख्य कारण है। तुम्हारी 'खाद्य श्रृंखला' इस ग्रह का गला घोंट रही है।" });
    }
}

function addHoneyFacts(steps, choice, lang, gaiaMood) {
    const speaker = lang === 'en' ? 'Gaia' : 'गाया';
    if (choice === 'compassion') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You chose to stop taking honey. Bees pollinate 75% of the world's food crops. Without them, almonds, apples, berries, and countless vegetables would disappear. One jar of honey is the entire lifetime work of 12 bees — and commercial beekeeping is a leading cause of colony collapse."
                : "तुमने शहद लेना बंद करने का फ़ैसला किया। मधुमक्खियाँ दुनिया की 75% खाद्य फ़सलों का परागण करती हैं। उनके बिना, बादाम, सेब, बेरी और अनगिनत सब्ज़ियाँ ग़ायब हो जाएँगी। एक शीशी शहद 12 मधुमक्खियों की पूरी ज़िंदगी की मेहनत है।" });
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "By letting them keep what is theirs, you helped save the pollinators that keep the entire planet fed. Aria's colony will thrive."
                : "उन्हें अपना रखने देकर, तुमने उन परागणकर्ताओं को बचाने में मदद की जो पूरे ग्रह को खिलाते हैं। एरिया का परिवार फलेगा-फूलेगा।" });
    } else if (choice === 'partial') {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You chose 'ethical' honey. But even small-scale beekeeping replaces honey with sugar syrup that weakens colonies. Bee populations have declined by 40% in the last decade. Every jar taken is food stolen from larvae that may not survive the winter."
                : "तुमने 'नैतिक' शहद चुना। लेकिन छोटे पैमाने का मधुपालन भी शहद की जगह चीनी का शरबत देता है जो कॉलोनियों को कमज़ोर करता है। पिछले दशक में मधुमक्खियों की आबादी 40% घट गई है। हर ली गई शीशी उन लार्वा का खाना चुराती है जो शायद सर्दी नहीं निकाल पाएँगे।" });
    } else {
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "You said bees make more than they need. That is a lie the industry told you. Bees make exactly what they need to survive winter. When humans take it and replace it with cheap sugar water, entire colonies collapse. Bee populations have crashed 40% in a decade."
                : "तुमने कहा मधुमक्खियाँ ज़रूरत से ज़्यादा बनाती हैं। यह वह झूठ है जो उद्योग ने तुम्हें बताया। मधुमक्खियाँ बिल्कुल उतना बनाती हैं जितना सर्दी से बचने के लिए चाहिए। जब इंसान ले लेते हैं और सस्ता चीनी पानी दे देते हैं, पूरी कॉलोनियाँ ध्वस्त हो जाती हैं। एक दशक में मधुमक्खियों की आबादी 40% गिर गई है।" });
        steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
            text: lang === 'en'
                ? "Without bees, 75% of food crops vanish. Every third bite of food you eat — gone. Your 'extra honey' theory is starving the planet."
                : "मधुमक्खियों के बिना, 75% खाद्य फ़सलें ग़ायब हो जाएँगी। तुम जो हर तीसरा कौर खाती हो — ग़ायब। तुम्हारा 'अतिरिक्त शहद' का सिद्धांत ग्रह को भूखा मार रहा है।" });
    }
}

// ═══════════════════════════════════════════════════════════════════
//  Overall Ending based on total Compassion Points
// ═══════════════════════════════════════════════════════════════════

function addOverallEnding(steps, ending, points, lang, gaiaMood) {
    const speaker = lang === 'en' ? 'Gaia' : 'गाया';

    if (ending === 'flourishing') {
        // 8-10 points — The Flourishing Earth
        if (lang === 'en') {
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "Maya... you have done something extraordinary. You listened to every cry. You made the hardest promises a human can make." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "If every human alive made the same choices you just made — no zoos, no riding, no dairy, no meat, no stolen honey — we would free 80 billion animals from suffering every single year." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "We would reduce greenhouse emissions by 14.5%. We would reclaim 77% of farmland — enough to reforest the Earth three times over. We would end the sixth mass extinction." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "You cannot change 8 billion people. But you changed the one person who matters most — yourself. And that... that is how worlds are reborn." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "The Earth is flourishing in your dream. Now wake up... and make it real. 🌍" });
        } else {
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "माया... तुमने कुछ असाधारण किया है। तुमने हर पुकार सुनी। तुमने वो वादे किए जो एक इंसान के लिए सबसे कठिन होते हैं।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "अगर दुनिया का हर इंसान वही चुनाव करे जो तुमने अभी किए — कोई चिड़ियाघर नहीं, कोई सवारी नहीं, कोई डेयरी नहीं, कोई माँस नहीं, कोई चुराया शहद नहीं — तो हम हर साल 80 अरब जानवरों को पीड़ा से मुक्त करेंगे।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "हम ग्रीनहाउस उत्सर्जन 14.5% कम करेंगे। 77% कृषि भूमि वापस पाएँगे — इतनी कि तीन बार पूरी पृथ्वी पर जंगल लगा सकें। छठे महाविनाश को रोक सकेंगे।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "तुम 8 अरब लोगों को नहीं बदल सकतीं। लेकिन तुमने उस एक इंसान को बदला जो सबसे ज़्यादा मायने रखता है — खुद को। और यही... यही है जिससे दुनियाएँ पुनर्जन्म लेती हैं।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "तुम्हारे सपने में धरती खिल रही है। अब जागो... और इसे सच करो। 🌍" });
        }
    } else if (ending === 'healing') {
        // 4-7 points — The Healing Earth
        if (lang === 'en') {
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "Maya, you tried. That matters more than you know. You heard some of the cries and you responded — even if you could not answer them all." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "Right now, 80 billion animals are killed each year. 270 million cows cry for stolen calves. Trillions of fish suffocate in nets. The Earth's lungs are burning to make room for cattle." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "You took some steps. Every step counts. But the Earth needs you to take more. The promises you could not make today — carry them with you. Let them grow." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "The Earth is healing slowly in your dream. But healing is not enough. Wake up... and finish what you started. 🌿" });
        } else {
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "माया, तुमने कोशिश की। यह जितना तुम सोचती हो उससे ज़्यादा मायने रखता है। तुमने कुछ पुकारें सुनीं और जवाब दिया — भले ही सब का जवाब नहीं दे सकीं।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "इस वक़्त, हर साल 80 अरब जानवर मारे जाते हैं। 27 करोड़ गायें चुराए गए बछड़ों के लिए रोती हैं। खरबों मछलियाँ जालों में दम तोड़ती हैं। पशुओं के लिए जगह बनाने को धरती के फेफड़े जल रहे हैं।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "तुमने कुछ कदम उठाए। हर कदम मायने रखता है। लेकिन धरती को और ज़रूरत है। जो वादे आज नहीं कर सकीं — उन्हें अपने साथ रखो। उन्हें बढ़ने दो।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "तुम्हारे सपने में धरती धीरे-धीरे ठीक हो रही है। लेकिन सिर्फ ठीक होना काफ़ी नहीं। जागो... और जो शुरू किया उसे पूरा करो। 🌿" });
        }
    } else {
        // 0-3 points — The Dying Earth
        if (lang === 'en') {
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "Maya... I showed you their suffering. I showed you the truth. And you chose comfort over compassion." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "Right now, at this very moment: 80 billion animals scream in factory farms. 270 million mothers cry for babies they will never see again. A trillion fish gasp for breath in nets. 10,000 wild souls pace in cages until they go mad." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "Animal agriculture has destroyed 70% of the Amazon. It uses more water than all human households combined. It is the single greatest cause of species extinction on this planet." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "You said it was natural. You said it was necessary. You said there was nothing you could do. That is what every person says while my forests burn and my oceans die." });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "The Earth is dying in your dream, Maya. But you can still wake up. You can still change. The question is — will you? 🥀" });
        } else {
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "माया... मैंने तुम्हें उनकी पीड़ा दिखाई। सच दिखाया। और तुमने करुणा की जगह सुविधा चुनी।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "इसी पल, अभी: 80 अरब जानवर फ़ैक्ट्री फ़ार्मों में चीख रहे हैं। 27 करोड़ माँएँ उन बच्चों के लिए रो रही हैं जिन्हें वे फिर कभी नहीं देखेंगी। एक खरब मछलियाँ जालों में तड़प रही हैं। 10,000 जंगली आत्माएँ पिंजरों में पागल होने तक चक्कर काट रही हैं।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "पशु पालन ने अमेज़न का 70% नष्ट कर दिया है। यह सभी मानव घरों से मिलाकर ज़्यादा पानी इस्तेमाल करता है। यह इस ग्रह पर प्रजातियों के विलुप्त होने का सबसे बड़ा कारण है।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "तुमने कहा यह प्राकृतिक है। तुमने कहा यह ज़रूरी है। तुमने कहा तुम कुछ नहीं कर सकतीं। यही हर इंसान कहता है जब मेरे जंगल जलते हैं और मेरे समुद्र मरते हैं।" });
            steps.push({ type: 'dialogue', speaker, mood: gaiaMood,
                text: "तुम्हारे सपने में धरती मर रही है, माया। लेकिन तुम अभी भी जाग सकती हो। तुम अभी भी बदल सकती हो। सवाल यह है — क्या तुम बदलोगी? 🥀" });
        }
    }
}
