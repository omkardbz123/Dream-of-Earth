export const SCENES = {

    // ═══════════════════════════════════════════════
    //  PROLOGUE — Maya falls asleep
    // ═══════════════════════════════════════════════
    prologue: {
        id: 'prologue',
        title: 'The Dream Begins',
        background: 'maya-room-night',
        music: 'dream-entrance',
        explore: { enabled: false },
        steps: [
            { type: 'narration', text: "The house is quiet. The only sound is the slow breathing of a sleeping world." },
            { type: 'dialogue', speaker: 'Maya', mood: 'sleeping', text: "Mmm... it's so warm... so peaceful..." },
            { type: 'narration', text: "A faint golden light appears at her window. Something ancient stirs." },
            { type: 'narration', text: "The light pulls Maya gently from her bed. Her feet touch a golden path that stretches into soft, luminous mist...", setBackground: 'dream-entrance' },
            { type: 'dialogue', speaker: 'Maya', mood: 'neutral', text: "Where am I? This place... it feels like a dream, but everything is so real..." },
            { type: 'narration', text: "A tiny golden firefly drifts toward her — pulsing with warmth." },
            { type: 'dialogue', speaker: 'Lumen', mood: 'bright', text: "Little dreamer... tonight, the world is calling you. Will you answer?" },
            { type: 'dialogue', speaker: 'Maya', mood: 'neutral', text: "Who are you?" },
            { type: 'dialogue', speaker: 'Lumen', mood: 'bright', text: "I am Lumen. A spark of all the lives that cry out in the night. Come with me, Maya. There are souls who need you to listen." },
            { type: 'transition', target: 'scene1' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  SCENE 1 — Zara the Lion  (ZOOS)
    // ═══════════════════════════════════════════════
    scene1: {
        id: 'scene1',
        title: 'Zara the Lion',
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
            { type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "Hello... why are you behind these bars?" },
            { type: 'dialogue', speaker: 'Zara', mood: 'before', text: "I was born free, child. Under the great African sky, where the grass stretched farther than any eye could see." },
            { type: 'dialogue', speaker: 'Zara', mood: 'before', text: "They came with ropes and cages when I was still drinking my mother's milk. I never saw her again." },
            { type: 'dialogue', speaker: 'Zara', mood: 'before', text: "Now I walk this same path around my cage. Three steps forward, three steps back. The grooves in the stone — that is the diary of my madness." },
            { type: 'dialogue', speaker: 'Zara', mood: 'before', text: "Do you know what it feels like to have the entire savanna inside your heart... but only four walls around your body?" },
            { type: 'dialogue', speaker: 'Maya', mood: 'crying', text: "That's horrible... No living being deserves this." },

            { type: 'choice', choices: [
                { text: "I will never visit a zoo again. Your freedom is not my entertainment.", type: 'compassion', points: 2, response: "You truly mean that? Then listen carefully..." },
                { text: "I'll try to support only wildlife sanctuaries instead.", type: 'partial', points: 1, response: "Sanctuaries are better. But billions still pace behind glass while humans point and laugh. At least you tried." },
                { text: "But zoos protect endangered species... they educate people.", type: 'indifferent', points: 0, response: "Education? They learn nothing. They see me pacing like a ghost, eat their ice cream, and go home. This is not conservation. It is a life sentence for a crime I never committed." }
            ]},

            // ── Confirmation (only shown if compassion was chosen) ──
            { type: 'dialogue', speaker: 'Zara', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Wait. Think carefully before you commit to this." },
            { type: 'dialogue', speaker: 'Zara', mood: 'before', requiresPrevChoice: 'compassion',
              text: "You are saying that from this moment forward, you will never buy a ticket to see a caged animal. No zoo. No marine park. No circus. Not even when everyone around you goes. Not even when it is the easy thing to do." },
            { type: 'dialogue', speaker: 'Zara', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Are you truly ready to make that promise?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "Yes. I promise. Never again.", type: 'confirm_yes', points: 0, response: "Your promise just freed a thousand souls. Every empty seat is a cage that will never be built." },
                { text: "I... I want to, but I can't promise that yet.", type: 'confirm_no', points: -1, response: "Even your doubt shows me you see us now. Perhaps one day, you will be ready. I will wait." }
            ]},

            // ── Farewell ──
            { type: 'dialogue', speaker: 'Zara', mood: 'after', requiresPrevChoice: 'compassion',
              text: "Look... the bars are fading. I can smell the grass again. The wind carries the dust of the savanna." },
            { type: 'dialogue', speaker: 'Zara', mood: 'after', requiresPrevChoice: 'compassion',
              text: "Thank you, little one. Because of you, I remember what freedom feels like. Carry that feeling with you — for all the ones still caged." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "Run free, Zara. I will never forget you." },

            { type: 'transition', target: 'scene2' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  SCENE 2 — Storm the Horse  (RIDING)
    // ═══════════════════════════════════════════════
    scene2: {
        id: 'scene2',
        title: 'Storm the Horse',
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
            { type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "You look like you're in so much pain..." },
            { type: 'dialogue', speaker: 'Storm', mood: 'before', text: "My back has been broken for years. My hooves are cracked and bleeding." },
            { type: 'dialogue', speaker: 'Storm', mood: 'before', text: "They put a metal bit in my mouth that cuts my tongue every time they pull the reins. When I slow down, they dig their heels into my ribs." },
            { type: 'dialogue', speaker: 'Storm', mood: 'before', text: "I have carried tourists up this scorching path every single day since I was two years old. My legs shake but I cannot stop." },
            { type: 'dialogue', speaker: 'Storm', mood: 'before', text: "I was born to gallop across open fields, to feel the wind. Instead, I am a taxi for people too lazy to walk." },
            { type: 'dialogue', speaker: 'Maya', mood: 'crying', text: "How can anyone do this to you?" },

            { type: 'choice', choices: [
                { text: "I will never ride a horse for entertainment again. You are not a vehicle.", type: 'compassion', points: 2, response: "You would give that up... for me?" },
                { text: "I'll make sure the horses I ride are well-treated.", type: 'partial', points: 1, response: "You cannot see the wounds under the saddle. You cannot hear my screams behind the bridle. 'Well-treated' is what they tell you so you don't feel guilty." },
                { text: "Horses have been ridden for thousands of years. It's natural.", type: 'indifferent', points: 0, response: "Slavery was practiced for thousands of years too. Does time make cruelty natural?" }
            ]},

            // ── Confirmation ──
            { type: 'dialogue', speaker: 'Storm', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Are you certain? No mountain trail rides. No beach rides. No carriage rides through the city." },
            { type: 'dialogue', speaker: 'Storm', mood: 'before', requiresPrevChoice: 'compassion',
              text: "My suffering is hidden behind your smile on holiday photos. Will you truly stop?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "Yes. I will walk my own path. Always.", type: 'confirm_yes', points: 0, response: "Then run, little human. Run with the wind the way I was meant to. For both of us." },
                { text: "I... maybe just sometimes, on holidays...", type: 'confirm_no', points: -1, response: "Every 'sometimes' is another broken back. But I see kindness in your eyes. Maybe that is enough for now." }
            ]},

            // ── Farewell ──
            { type: 'dialogue', speaker: 'Storm', mood: 'after', requiresPrevChoice: 'compassion',
              text: "The saddle... it's gone. I can feel any spine straightening for the first time in years. My hooves don't bleed anymore." },
            { type: 'dialogue', speaker: 'Storm', mood: 'after', requiresPrevChoice: 'compassion',
              text: "I will run now, child. Across meadows that have no end. And every stride will carry your name. Goodbye, kind soul." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "Gallop free, Storm. The wind is waiting for you." },

            { type: 'transition', target: 'scene3' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  SCENE 3 — Anaya the Cow  (DAIRY)
    // ═══════════════════════════════════════════════
    scene3: {
        id: 'scene3',
        title: 'Anaya the Cow',
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
            { type: 'dialogue', speaker: 'Maya', mood: 'crying', text: "Why are you crying? What happened to you?" },
            { type: 'dialogue', speaker: 'Anaya', mood: 'before', text: "My baby... they took him away barely two hours after he was born. He was still wet, still searching for me." },
            { type: 'dialogue', speaker: 'Calf', mood: 'before', text: "Mama? Where are you? I can hear you but I can't find you... it's so dark and cold in here..." },
            { type: 'dialogue', speaker: 'Anaya', mood: 'before', text: "I can hear him crying in the next building. They will kill him in a few weeks because he is 'useless' — a male calf in a dairy farm." },
            { type: 'dialogue', speaker: 'Anaya', mood: 'before', text: "Every year they force me to give birth. Every year they steal my child. And they hook machines to my body to take the milk that was meant for him." },
            { type: 'dialogue', speaker: 'Anaya', mood: 'before', text: "When my body breaks down from exhaustion, they will send me to slaughter. A 'spent' mother. That is what they call me." },
            { type: 'dialogue', speaker: 'Maya', mood: 'crying', text: "That's... that's the dairy industry?" },

            { type: 'choice', choices: [
                { text: "I will stop consuming all dairy. No milk, no cheese, no butter. Your milk belongs to your baby.", type: 'compassion', points: 2, response: "You would do that? Give up everything made from my tears?" },
                { text: "I'll try to reduce dairy and find plant-based alternatives.", type: 'partial', points: 1, response: "Every glass you do not drink is a mother who keeps her child a little longer. But 'trying' still leaves so many of us crying." },
                { text: "But humans have always consumed milk. It's natural and nutritious.", type: 'indifferent', points: 0, response: "Natural? No grown animal drinks another species' milk. You just normalized stealing a mother's love and put it in a carton with a smiling cow on it." }
            ]},

            // ── Confirmation ──
            { type: 'dialogue', speaker: 'Anaya', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Do you understand what you are saying?" },
            { type: 'dialogue', speaker: 'Anaya', mood: 'before', requiresPrevChoice: 'compassion',
              text: "No chai with milk. No paneer. No ice cream. No cheese pizza. No butter on your roti. Every single one of those has my tears in it. My baby's blood in it." },
            { type: 'dialogue', speaker: 'Anaya', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Are you truly willing to give all of that up... for me?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "Yes. Your child matters more than my taste.", type: 'confirm_yes', points: 0, response: "Then you have given me back the only thing I ever wanted — my baby beside me. Thank you, child. Thank you." },
                { text: "I... I don't think I can give up all of it.", type: 'confirm_no', points: -1, response: "I understand. You were raised on it. Just... remember my face the next time you pour a glass. Maybe that will be enough to change, slowly." }
            ]},

            // ── Farewell ──
            { type: 'dialogue', speaker: 'Anaya', mood: 'after', requiresPrevChoice: 'compassion',
              text: "He's here... my baby is here. He's nuzzling against me. I can feel his warmth." },
            { type: 'dialogue', speaker: 'Calf', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Mama! I found you! I'm never leaving you again!" },
            { type: 'dialogue', speaker: 'Anaya', mood: 'after', requiresPrevChoice: 'compassion',
              text: "Go now, child. And when the world offers you a glass of milk, remember — it was always meant for someone's baby. Thank you for giving me mine." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "Stay together, always. I promise your tears weren't wasted on me." },

            { type: 'transition', target: 'scene4' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  SCENE 4 — The Factory Farm  (MEAT — Hen, Fish, Goat)
    // ═══════════════════════════════════════════════
    scene4: {
        id: 'scene4',
        title: 'The Factory Farm',
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
            { type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "It's so dark in here... I can barely breathe. What is this place?" },
            { type: 'dialogue', speaker: 'Hen', mood: 'before', text: "Welcome to the factory, child. This is where your food comes from." },
            { type: 'dialogue', speaker: 'Hen', mood: 'before', text: "We are packed by the thousands in cages so small our bones break under the weight of our own bodies. We never see daylight. We never touch the earth." },
            { type: 'dialogue', speaker: 'Goat', mood: 'before', text: "They slit my brother's throat this morning. He was only six months old. He screamed until he couldn't anymore. I am next." },
            { type: 'dialogue', speaker: 'Fish', mood: 'before', text: "They dragged us from the ocean in nets so tight we crushed each other. On the deck, we suffocate slowly... gasping for hours. No one even considers our pain." },
            { type: 'dialogue', speaker: 'Hen', mood: 'before', text: "Billions of us are killed every single day. Not for survival. Just for a few minutes of taste on your tongue." },
            { type: 'dialogue', speaker: 'Maya', mood: 'crying', text: "Billions? Every day?" },
            { type: 'dialogue', speaker: 'Hen', mood: 'before', text: "80 billion land animals slaughtered every year. And over a trillion fish dragged from the ocean, suffocating slowly in nets. We feel pain. We feel fear. We want to live. Just like you." },

            { type: 'choice', choices: [
                { text: "I will stop eating all meat and fish. No more killing for my plate.", type: 'compassion', points: 2, response: "You... you would really choose our lives over your appetite?" },
                { text: "I'll try to eat less meat and choose more plant-based meals.", type: 'partial', points: 1, response: "Less is better than none. But 'less' still means billions. Every reduced meal matters... but every remaining one is still a life taken." },
                { text: "It's the natural food chain. Humans are meant to eat meat.", type: 'indifferent', points: 0, response: "The food chain? You grow us in factories, pump us with chemicals, and kill us on assembly lines. There is nothing natural about this. You just made suffering efficient." }
            ]},

            // ── Confirmation ──
            { type: 'dialogue', speaker: 'Hen', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Think about what this truly means for your life." },
            { type: 'dialogue', speaker: 'Goat', mood: 'before', requiresPrevChoice: 'compassion',
              text: "No chicken. No mutton. No fish curry. No kebabs. Not at festivals. Not at restaurants. Not when your family cooks it with love and expects you to eat." },
            { type: 'dialogue', speaker: 'Fish', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Every single meal becomes a choice between my life and your convenience. Can you truly live with that?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "Yes. Every life matters. My plate will not be their graveyard.", type: 'confirm_yes', points: 0, response: "Then you have saved more lives with one decision than most people save in a lifetime. The silence of the slaughterhouse begins with you." },
                { text: "I want to... but I'm not sure my family will understand.", type: 'confirm_no', points: -1, response: "I know. The cage you fight is not made of iron — it is made of habit, culture, and expectation. But even questioning it... that is where freedom starts." }
            ]},

            // ── Farewell ──
            { type: 'dialogue', speaker: 'Hen', mood: 'after', requiresPrevChoice: 'compassion',
              text: "The cages are opening... I can feel the soil for the first time. Real soil. Under my feet." },
            { type: 'dialogue', speaker: 'Goat', mood: 'after', requiresPrevChoice: 'compassion',
              text: "My brother... he didn't make it. But because of you, maybe no more brothers have to die for a meal that lasts five minutes." },
            { type: 'dialogue', speaker: 'Fish', mood: 'after', requiresPrevChoice: 'compassion',
              text: "The water is clear again. I can breathe. Thank you for letting me stay in the ocean where I belong." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "Live your lives. All of you. My plate will never carry your suffering again." },

            { type: 'transition', target: 'scene5' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  SCENE 5 — Queen Aria the Bee  (HONEY)
    // ═══════════════════════════════════════════════
    scene5: {
        id: 'scene5',
        title: 'Queen Aria',
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
            { type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "Little bee... the garden is dead. You look so frail." },
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'before', text: "The pesticides humans spray have killed half my colony. My daughters lie dead on the ground, their wings still." },
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'before', text: "And what little honey we manage to make — they steal it all. They replace it with sugar water that starves us slowly from the inside." },
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'before', text: "Do you know what honey is? It is not a 'product.' It is the food my children need to survive the winter. One jar of honey represents the entire life's work of 12 bees." },
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'before', text: "Without bees, 75% of the world's food crops will vanish. Every third bite of food you eat exists because a bee pollinated it." },
            { type: 'dialogue', speaker: 'Maya', mood: 'sad', text: "I never realized... honey comes at such a cost." },

            { type: 'choice', choices: [
                { text: "I will stop consuming honey. Your labor is not mine to steal.", type: 'compassion', points: 2, response: "You would give up sweetness... so my children can live?" },
                { text: "I'll try to buy only from ethical, small-scale beekeepers.", type: 'partial', points: 1, response: "Even 'ethical' keepers take what is ours and leave us sugar. But your intention matters. It is a bridge, not a destination." },
                { text: "Bees make more honey than they need anyway.", type: 'indifferent', points: 0, response: "That is what they told you so you would not feel guilty. We make exactly what we need to survive. What they take is stolen from our children's mouths." }
            ]},

            // ── Confirmation ──
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'before', requiresPrevChoice: 'compassion',
              text: "Are you sure, child? No honey in your tea. No honey on your toast. No honeycomb sweets." },
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'before', requiresPrevChoice: 'compassion',
              text: "The sweetness you enjoy is the food my babies need to survive the cold. Are you ready to let go?" },
            { type: 'choice', isConfirm: true, requiresPrevChoice: 'compassion', choices: [
                { text: "Yes. Your children's lives are sweeter than any honey.", type: 'confirm_yes', points: 0, response: "Then the garden will bloom again. Not because of magic — but because a single human chose kindness over appetite. That is the most powerful force in nature." },
                { text: "It's just honey... I'm not sure I can give that up.", type: 'confirm_no', points: -1, response: "It is 'just' honey. And it is 'just' our children starving. But I see you thinking. And thinking is the seed of change." }
            ]},

            // ── Farewell ──
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'after', requiresPrevChoice: 'compassion',
              text: "Look around you, child. The flowers are opening. My daughters are rising. The garden is breathing again." },
            { type: 'dialogue', speaker: 'Queen Aria', mood: 'after', requiresPrevChoice: 'compassion',
              text: "You gave us back our food, our future, our children's chance to survive the winter. The sweetest thing in this garden is not honey — it is your heart." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', requiresPrevChoice: 'compassion',
              text: "Fly free, little queen. Your garden will never be silent again." },

            { type: 'transition', target: 'final' }
        ]
    },

    // ═══════════════════════════════════════════════
    //  FINAL — Gaia / Earth (Dynamic — built by endings.js)
    // ═══════════════════════════════════════════════
    //  (This scene is generated dynamically in engine.js via buildFinalScene)

    // ═══════════════════════════════════════════════
    //  EPILOGUE — Maya wakes up
    // ═══════════════════════════════════════════════
    epilogue: {
        id: 'epilogue',
        title: 'A New Dawn',
        background: 'maya-room-morning',
        music: 'epilogue',
        explore: { enabled: false },
        steps: [
            { type: 'narration', text: "Golden sunlight streams through the window. The birdsong is louder than Maya has ever heard it." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "It was just a dream... but I can still feel their eyes on me." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "Zara pacing behind glass. Storm's bleeding hooves. Anaya crying for her baby. Those tiny featherless bodies in the dark. Aria's dying colony." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "I don't know if I can change the whole world. But I know exactly what I must change first." },
            { type: 'dialogue', speaker: 'Maya', mood: 'hopeful', text: "Myself." },
            { type: 'transition', target: 'credits' }
        ]
    }
};
