import { getState, setState, recordChoice, addPoints, getScenes, getEndingType } from './state.js';
import { playMusic, playSFX, stopSFX } from './audio.js';
import { startExplorePhase, disableControls, enableControls, initPlayer } from './player.js';
import { buildFinalScene, buildReflectionScene, buildEpilogueScene } from './endings.js';

let dom = {};
let isTyping = false;
let currentTimeout = null;
let showingResponse = false;
let currentResponseText = "";
let lastChoiceType = null;        // Track the last main choice type per scene
let lastAnimalFileBase = null;    // Track the last non-Maya speaker fileBase for after-image swaps

// Maps Hindi speaker names → English filenames for character images
const SPEAKER_FILE_MAP = {
    'माया': 'maya',
    'ज़ारा': 'zara',
    'स्टॉर्म': 'storm',
    'अनाया': 'anaya',
    'बछड़ा': 'anaya-calf',
    'मुर्गी': 'hen',
    'बकरी': 'goat',
    'मछली': 'fish',
    'महारानी एरिया': 'queen-aria',
    'गाया': 'gaia',
    'धरती माँ': 'gaia',
    'Goat': 'goat',
    'Fish': 'fish',
    'Calf': 'anaya-calf',
    'Lumen': 'lumen',
    'लूमेन': 'lumen'
};

export function initEngine() {
    dom = {
        titleScreen: document.getElementById('title-screen'),
        exploreLayer: document.getElementById('explore-layer'),
        characterLayer: document.getElementById('character-layer'),
        lumenLayer: document.getElementById('lumen-layer'),
        uiLayer: document.getElementById('ui-layer'),
        overlayLayer: document.getElementById('overlay-layer'),
        particleLayer: document.getElementById('particle-layer'),
        controlsLayer: document.getElementById('controls-layer'),
        
        backgroundLayer: document.getElementById('background-layer'),
        sceneBg: document.getElementById('scene-bg'),
        
        exploreAnimals: document.getElementById('explore-animals'),
        mayaSprite: document.getElementById('maya-sprite'),
        mayaImage: document.getElementById('maya-image'),
        animalImage: document.getElementById('animal-image'),
        lumen: document.getElementById('lumen'),
        
        dialogueBox: document.getElementById('dialogue-box'),
        speakerName: document.getElementById('speaker-name'),
        dialogueText: document.getElementById('dialogue-text'),
        advanceIndicator: document.getElementById('advance-indicator'),
        
        choiceContainer: document.getElementById('choice-container'),
        choices: document.querySelectorAll('.choice-btn'),
        
        creditsScreen: document.getElementById('credits-screen'),
        creditsContent: document.getElementById('credits-content'),

        btnLeft: document.getElementById('btn-left'),
        btnRight: document.getElementById('btn-right')
    };

    // Initialize player controller
    initPlayer(dom.mayaSprite, dom.exploreAnimals, dom.controlsLayer, dom.btnLeft, dom.btnRight, onInteraction);

    // Setup tap/click to advance dialogue
    dom.dialogueBox.addEventListener('click', handleAdvance);
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') handleAdvance();
    });

    // Choice buttons
    dom.choices.forEach((btn, idx) => {
        btn.addEventListener('click', () => handleChoice(idx));
        btn.addEventListener('mouseenter', () => playSFX('choice-hover'));
    });

    // CHEAT CODE FOR SCREENSHOT GENERATION
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            const val = prompt('Enter compassion points (0-10) to generate scorecard:');
            if (val !== null) {
                const num = parseInt(val, 10);
                if (num >= 0 && num <= 10) {
                    setState({ compassionPoints: num });
                    enterScene('credits');
                } else {
                    alert('Please enter a valid number between 0 and 10.');
                }
            }
        }
    });
}

function onInteraction() {
    // Maya has reached the animal
    dom.exploreLayer.classList.add('hidden');
    startDialoguePhase();
}

// ----------  Scene Management  ----------

export function enterScene(sceneId) {
    // Handle credits
    if (sceneId === 'credits') {
        showCredits();
        return;
    }

    // Dynamic scenes built from player choices
    let scene;
    if (sceneId === 'final') {
        scene = buildFinalScene(getState());
    } else if (sceneId === 'reflection') {
        scene = buildReflectionScene(getState());
    } else if (sceneId === 'epilogue') {
        scene = buildEpilogueScene(getState());
    } else {
        scene = getScenes()[sceneId];
    }
    if (!scene) return;
    
    // Store it so renderCurrentStep can access it
    window.__currentSceneData = scene;

    setState({ currentScene: sceneId, currentStep: 0 });
    
    // Reset images for new scene
    dom.mayaImage.src = '';
    dom.animalImage.src = '';
    dom.mayaImage.classList.add('hidden');
    dom.animalImage.classList.add('hidden');
    lastChoiceType = null;
    lastAnimalFileBase = null;
    
    // Set background
    setBackground(scene.background);
    
    // Set music for this scene
    if (scene.music) {
        playMusic(scene.music);
    }
    
    if (scene.explore && scene.explore.enabled) {
        // Explore phase
        dom.dialogueBox.classList.add('hidden');
        dom.characterLayer.classList.add('hidden');
        dom.choiceContainer.classList.add('hidden');
        
        dom.exploreLayer.classList.remove('hidden');
        dom.lumenLayer.classList.remove('hidden');
        
        startExplorePhase(scene.explore);
    } else {
        // Direct dialogue phase (prologue, final, reflection, epilogue)
        dom.exploreLayer.classList.add('hidden');
        startDialoguePhase();
    }
}

function getCurrentScene() {
    const state = getState();
    if (state.currentScene === 'final' || state.currentScene === 'reflection' || state.currentScene === 'epilogue') {
        return window.__currentSceneData;
    }
    return getScenes()[state.currentScene];
}

function startDialoguePhase() {
    setState({ phase: 'dialogue' });
    dom.dialogueBox.classList.remove('hidden');
    dom.lumenLayer.classList.remove('hidden');

    // Pre-load the animal image for this scene so they are visible even when Maya speaks first
    const scene = getCurrentScene();
    const firstAnimalStep = scene.steps.find(s => (s.type === 'dialogue' || s.type === 'choice') && s.speaker && s.speaker !== 'Maya' && s.speaker !== 'माया');
    
    if (firstAnimalStep) {
        let name = firstAnimalStep.speaker;
        let fileBase = SPEAKER_FILE_MAP[name] || name.toLowerCase().replace(/\s+/g, '-');
        
        // Don't auto-preload for reflection & final scenes — those handle it per-step
        const state = getState();
        if (state.currentScene !== 'reflection' && state.currentScene !== 'final') {
            lastAnimalFileBase = fileBase;
            dom.animalImage.src = `assets/characters/${fileBase}-before.webp`;
            dom.animalImage.classList.remove('hidden');
        }
    }

    renderCurrentStep();
}

// ----------  Step Rendering  ----------

function renderCurrentStep() {
    const state = getState();
    const scene = getCurrentScene();
    const step = scene.steps[state.currentStep];
    
    if (!step) return;

    // ---- Conditional step skipping ----
    // If a step has requiresPrevChoice, skip it when the last main choice doesn't match
    if (step.requiresPrevChoice) {
        if (lastChoiceType !== step.requiresPrevChoice) {
            setState({ currentStep: state.currentStep + 1 });
            renderCurrentStep();
            return;
        }
    }

    // ---- Dynamic background change ----
    if (step.setBackground) {
        setBackground(step.setBackground);
    }
    // ---- Dynamic music change (mid-scene) ----
    if (step.setMusic) {
        playMusic(step.setMusic);
    }

    // Reset UI
    dom.choiceContainer.classList.add('hidden');
    dom.advanceIndicator.classList.remove('hidden');
    dom.speakerName.textContent = '';
    dom.dialogueText.innerHTML = '';
    
    // ---------- NARRATION / DIALOGUE ----------
    if (step.type === 'narration' || step.type === 'dialogue') {
        if (step.speaker) {
            dom.speakerName.textContent = step.speaker;
            showCharacter(step.speaker, step.mood, step.showAnimal);
        } else {
            // For empty narration steps (used as background changers), auto-advance
            if (step.text === '') {
                setState({ currentStep: state.currentStep + 1 });
                renderCurrentStep();
                return;
            }
            hideCharacter();
        }
        typeText(step.text);
    }
    // ---------- CHOICE ----------
    else if (step.type === 'choice') {
        dom.choiceContainer.classList.remove('hidden');
        dom.advanceIndicator.classList.add('hidden');
        dom.dialogueBox.classList.add('hidden');
        
        // Show only as many buttons as we have choices, hide the rest
        dom.choices.forEach((btn, i) => {
            if (i < step.choices.length) {
                btn.textContent = step.choices[i].text;
                btn.className = `btn choice-btn choice-${step.choices[i].type}`;
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        });
    }
    // ---------- TRANSITION ----------
    else if (step.type === 'transition') {
        fadeOut(() => {
            enterScene(step.target);
            fadeIn();
        });
    }
}

// ----------  Advance / Choice Handlers  ----------

export function handleAdvance() {
    const state = getState();
    if (state.phase !== 'dialogue') return;
    
    const scene = getCurrentScene();
    const step = scene.steps[state.currentStep];
    
    if (step.type === 'choice' && !showingResponse) return; // Cannot advance during choice wait
    
    if (isTyping) {
        // Skip typewriting — show full text instantly
        isTyping = false;
        clearTimeout(currentTimeout);
        stopSFX('typing');
        dom.dialogueText.innerHTML = showingResponse ? currentResponseText : step.text;
        dom.dialogueText.scrollTop = 0; // Scroll to top to let user read from beginning
        return;
    }
    
    if (showingResponse) {
        showingResponse = false;
        setState({ currentStep: state.currentStep + 1 });
        renderCurrentStep();
        return;
    }
    
    setState({ currentStep: state.currentStep + 1 });
    renderCurrentStep();
}

function handleChoice(index) {
    playSFX('choice-select');
    
    const state = getState();
    const scene = getCurrentScene();
    const step = scene.steps[state.currentStep];
    const choice = step.choices[index];

    if (step.isConfirm) {
        // Confirmation choice — adjust points only, don't record as a scene choice
        if (choice.points) addPoints(choice.points);
        // If they said no to confirm, downgrade choice record to partial
        if (choice.type === 'confirm_no') {
            const sceneChoices = getState().choicesMade;
            // Find the current scene in choicesMade and downgrade it
            if (sceneChoices[scene.id]) {
                sceneChoices[scene.id] = 'partial';
            }
        }
    } else {
        // Main choice — record it
        recordChoice(scene.id, choice.type, choice.points);
        lastChoiceType = choice.type;
    }
    
    dom.choiceContainer.classList.add('hidden');
    dom.dialogueBox.classList.remove('hidden');
    
    // Play transition visual if compassion/partial (but not on confirm choices)
    if (!step.isConfirm) {
        if (choice.type === 'compassion' || choice.type === 'partial') {
            playTransformation(choice.type);
            if (scene.backgroundAfter && choice.type === 'compassion') {
                setBackground(scene.backgroundAfter);
            }
            if (scene.musicAfter && choice.type === 'compassion') {
                playMusic(scene.musicAfter);
            }
            // Swap the animal portrait to 'after' mood on compassion
            if (choice.type === 'compassion' && lastAnimalFileBase) {
                dom.animalImage.src = `assets/characters/${lastAnimalFileBase}-after.webp`;
            }
        }
    }
    
    // Show response dialogue
    dom.speakerName.textContent = "";
    showingResponse = true;
    currentResponseText = choice.response;
    typeText(choice.response);
}

// ----------  Text Engine  ----------

function typeText(text) {
    isTyping = true;
    let idx = 0;
    dom.dialogueText.innerHTML = '';
    dom.dialogueText.scrollTop = 0;
    playSFX('typing', true);
    
    // Use Array.from to correctly handle unicode combining characters and surrogate pairs
    const chars = Array.from(text);
    
    function appendNext() {
        if (!isTyping) {
            stopSFX('typing');
            return; // Aborted
        }
        
        if (idx < chars.length) {
            idx++;
            // Re-render the whole accumulated string so browser text shaping (like Hindi ligatures) works correctly
            dom.dialogueText.innerHTML = chars.slice(0, idx).join('');
            // Auto-scroll to bottom as text is typed
            dom.dialogueText.scrollTop = dom.dialogueText.scrollHeight;
            currentTimeout = setTimeout(appendNext, 30);
        } else {
            isTyping = false;
            stopSFX('typing');
        }
    }
    
    appendNext();
}

// ----------  Character Display  ----------

function showCharacter(name, mood, showAnimalOverride) {
    // Map Hindi names to their English filenames
    let fileBase = SPEAKER_FILE_MAP[name] || name.toLowerCase().replace(/\s+/g, '-');
    const key = mood ? `${fileBase}-${mood}` : fileBase;
    
    // If there's a showAnimal override (used in reflection scene), force the animal image
    if (showAnimalOverride) {
        const animalMood = mood || 'before';
        dom.animalImage.src = `assets/characters/${showAnimalOverride}-${animalMood}.webp`;
        dom.animalImage.classList.remove('dimmed-char', 'hidden');
        lastAnimalFileBase = showAnimalOverride;
        // Hide Maya for reflection scenes
        dom.mayaImage.classList.add('hidden');
        dom.characterLayer.classList.remove('hidden');
        return;
    }
    
    if (fileBase === 'maya') {
        dom.mayaImage.src = `assets/characters/${key}.webp`;
        dom.mayaImage.classList.remove('dimmed-char', 'hidden');
        
        if (key === 'maya-sleeping') {
            dom.mayaImage.classList.add('full-screen-char');
            dom.animalImage.classList.add('hidden');
        } else {
            dom.mayaImage.classList.remove('full-screen-char');
            // Dim animal if it exists and is not hidden
            if (dom.animalImage.getAttribute('src') && !dom.animalImage.classList.contains('hidden')) {
                dom.animalImage.classList.add('dimmed-char');
            }
        }
    } else {
        // It's the animal speaking
        lastAnimalFileBase = fileBase;
        dom.animalImage.src = `assets/characters/${key}.webp`;
        dom.animalImage.classList.remove('dimmed-char', 'hidden');

        // Dim maya if she is visible 
        if (dom.mayaImage.getAttribute('src') && !dom.mayaImage.classList.contains('hidden')) {
            dom.mayaImage.classList.add('dimmed-char');
            dom.mayaImage.classList.remove('full-screen-char');
        }
    }

    dom.characterLayer.classList.remove('hidden');
}

function hideCharacter() {
    dom.characterLayer.classList.add('hidden');
    // We could clear them, but let's just let the layer stay hidden for silent narrations.
}

// ----------  Visuals  ----------

function setBackground(bgName) {
    dom.sceneBg.src = `assets/backgrounds/${bgName}.webp`;
}

function fadeOut(callback) {
    dom.overlayLayer.style.opacity = '1';
    setTimeout(callback, 1500);
}

function fadeIn() {
    dom.overlayLayer.style.opacity = '0';
}

function playTransformation(type) {
    playSFX('transformation-magic');
    dom.particleLayer.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        let p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.bottom = Math.random() * 50 + 'vh';
        p.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        p.style.animationDelay = (Math.random() * 0.5) + 's';
        dom.particleLayer.appendChild(p);
    }
    
    if (type === 'compassion') {
        const gameContainer = document.getElementById('game-container');
        gameContainer.classList.add('shake');
        setTimeout(() => gameContainer.classList.remove('shake'), 500);
    }
    
    // clean up particles
    setTimeout(() => {
        dom.particleLayer.innerHTML = '';
    }, 2000);
}

// ----------  Credits  ----------

function showCredits() {
    const state = getState();
    const lang = state.language;
    const ending = getEndingType();

    // Set dynamic background
    setBackground(`final-${ending}`);

    // Hide everything else
    dom.titleScreen.classList.add('hidden');
    dom.dialogueBox.classList.add('hidden');
    dom.characterLayer.classList.add('hidden');
    dom.exploreLayer.classList.add('hidden');
    dom.lumenLayer.classList.add('hidden');
    dom.controlsLayer.classList.add('hidden');
    dom.overlayLayer.style.opacity = '0';

    dom.creditsScreen.classList.remove('hidden');

    const endingLabel = lang === 'en'
        ? (ending === 'flourishing' ? '🌱 The Flourishing Earth' : ending === 'healing' ? '🌿 The Healing Earth' : '🥀 The Dying Earth')
        : (ending === 'flourishing' ? '🌱 खिलती हुई धरती' : ending === 'healing' ? '🌿 उपचार करती धरती' : '🥀 मरती हुई धरती');

    let thanksText = '';
    if (ending === 'flourishing') {
        thanksText = lang === 'en'
            ? 'Thank you for dreaming with us.<br>Now go and make it real.'
            : 'हमारे साथ सपना देखने के लिए धन्यवाद।<br>अब जाओ और इसे सच करो।';
    } else if (ending === 'healing') {
        thanksText = lang === 'en'
            ? 'The earth is bruised, but not broken.<br>Your choices are the beginning of healing.'
            : 'धरती घायल है, लेकिन टूटी नहीं है।<br>आपके चुनाव उपचार की शुरुआत हैं।';
    } else {
        thanksText = lang === 'en'
            ? 'The nightmare doesn\'t end when you wake up.<br>Our choices shape the world. It\'s not too late to change.'
            : 'जागने पर भी बुरा सपना खत्म नहीं होता।<br>हमारे चुनाव दुनिया बनाते हैं। बदलने में अभी भी बहुत देर नहीं हुई है।';
    }

    const downloadTitle = lang === 'en' ? 'Download Scorecard' : 'स्कोरकार्ड डाउनलोड करें';
    const scoreText = lang === 'en' ? `Score: ${state.compassionPoints} / 10 Compassion Points` : `स्कोर: ${state.compassionPoints} / 10 करुणा अंक`;

    // Set the main fixed title
    dom.creditsScreen.querySelector('.credits-title').textContent = lang === 'en' ? 'Dream of Earth' : 'धरती का सपना';

    dom.creditsContent.innerHTML = `
        <div>
            <div class="credits-ending-badge">${endingLabel}</div>
            <p class="credits-ending-text">${thanksText}</p>
        </div>
        
        <div class="score-card">
            <div class="score-label">${lang === 'en' ? 'A Game for the Planet 🌍' : 'धरती के लिए एक खेल 🌍'}</div>
            <div class="score-value">${scoreText}</div>
        </div>

        <div class="share-container">
            <button id="btn-download" class="btn btn-share">${downloadTitle}</button>
        </div>
    `;

    document.getElementById('btn-download').addEventListener('click', downloadScreenshot);

    playMusic('epilogue');
}

function downloadScreenshot() {
    const btn = document.getElementById('btn-download');
    const originalText = btn.textContent;
    btn.textContent = getState().language === 'en' ? 'Downloading...' : 'डाउनलोड हो रहा है...';
    btn.disabled = true;

    // Hide the button so it doesn't appear in the screenshot
    btn.style.display = 'none';

    setTimeout(() => {
        html2canvas(document.getElementById('game-container'), {
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#000000'
        }).then(canvas => {
            btn.style.display = 'inline-block';
            btn.textContent = originalText;
            btn.disabled = false;
            
            const imgData = canvas.toDataURL('image/png');
            
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'DreamOfEarth-Score.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }).catch(err => {
            console.error('Screenshot failed:', err);
            btn.style.display = 'inline-block';
            btn.textContent = originalText;
            btn.disabled = false;
        });
    }, 100);
}

