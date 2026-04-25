# 🌙 Dream of Earth — Browser Game Implementation Plan

## Goal

Build **"Dream of Earth"** as a **browser-based visual novel / narrative adventure** game using **vanilla HTML, CSS, and JavaScript**. The game must work on desktop and mobile browsers with touch controls. No game engine (Godot/Unity) — pure web tech for maximum accessibility.

---

## Decisions (Confirmed)

> [!NOTE]
> **Game Mechanics**: Each dream scene has **two phases**: (1) **EXPLORE** — Maya walks left→right through the scene toward the animal, (2) **DIALOGUE** — visual novel triggers when Maya reaches the animal. Player has limited left-right movement control. ✅ Confirmed.

> [!NOTE]
> **Assets Strategy**: Build the game first with **styled placeholder fallbacks**. If an image/audio file is missing, the game shows a colored rectangle with the asset name as fallback — not a broken image. Placeholders stay as permanent backup. User will generate real assets with ChatGPT Image + Gemini Music and drop them in.

> [!NOTE]
> **Animated Lumen**: Lumen the firefly will have a **CSS-animated floating/bobbing effect** with a glow pulse during all dialogue. ✅ Confirmed.

> [!NOTE]
> **No Save/Load**: Game is short enough (20-35 min) to play in one sitting. No localStorage persistence needed. ✅ Confirmed.

> [!NOTE]
> **Bilingual**: Full **English + Hindi** support with a language toggle on the title screen. All dialogue stored in both languages. ✅ Confirmed.

---

## Technology Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Structure | HTML5 | Semantic, accessible |
| Styling | Vanilla CSS | Full control, no build step |
| Logic | Vanilla JavaScript (ES6 modules) | No framework overhead |
| Fonts | Google Fonts (Quicksand + Caveat) | Dreamy, friendly, readable |
| Audio | Web Audio API + `<audio>` elements | Background music + SFX |
| Deployment | Static files (Netlify or any host) | Zero backend needed |

**No npm, no bundler, no framework.** Just files served by a browser.

---

## Project Structure

```
d:\Gemini\Earth day\
│
├── index.html                    # Single page app entry
├── style.css                     # All styles (design system + components)
│
├── js/
│   ├── main.js                   # App entry point, initializes game
│   ├── state.js                  # Game state (points, choices, current scene, language)
│   ├── engine.js                 # Core engine (render scene, dialogue, choices)
│   ├── player.js                 # Maya movement controller (left/right + interaction)
│   ├── sprites.js                # Sprite sheet animation system
│   ├── scenes.js                 # All scene data — ENGLISH dialogue
│   ├── scenes-hi.js              # All scene data — HINDI dialogue (same structure)
│   ├── transitions.js            # Scene transition animations
│   └── audio.js                  # Music & SFX manager
│
├── assets/
│   ├── sprites/                  # Sprite sheets (horizontal strips)
│   │   ├── maya-idle.png         # Maya idle animation (4 frames)
│   │   ├── maya-walk.png         # Maya walk cycle (6 frames)
│   │   ├── zara-idle-before.png  # Lion breathing in cage (6 frames)
│   │   ├── zara-idle-after.png   # Lion breathing free (6 frames)
│   │   ├── storm-idle-before.png # Horse exhausted breathing (6 frames)
│   │   ├── storm-idle-after.png  # Horse free breathing (6 frames)
│   │   ├── anaya-idle-before.png # Cow pressing against fence (4 frames)
│   │   ├── calf-idle-before.png  # Calf reaching through bars (4 frames)
│   │   ├── anaya-idle-after.png  # Cow+calf reunited (4 frames)
│   │   ├── hen-idle-before.png   # Hen cramped breathing (4 frames)
│   │   ├── hen-idle-after.png    # Hen wings spread free (4 frames)
│   │   ├── fish-idle-before.png  # Fish gasping (4 frames)
│   │   ├── fish-idle-after.png   # Fish swimming free (4 frames)
│   │   ├── goat-idle-before.png  # Goat trembling (4 frames)
│   │   ├── goat-idle-after.png   # Goat playing (4 frames)
│   │   ├── aria-idle-before.png  # Queen bee struggling (4 frames)
│   │   ├── aria-idle-after.png   # Queen bee dancing (4 frames)
│   │   ├── gaia-idle-dying.png   # Gaia crumbling (4 frames)
│   │   ├── gaia-idle-healing.png # Gaia recovering (4 frames)
│   │   └── gaia-idle-flourishing.png # Gaia radiant (4 frames)
│   │
│   ├── characters/               # Static character images for dialogue close-ups
│   │   ├── maya-neutral.png
│   │   ├── maya-sad.png
│   │   ├── maya-hopeful.png
│   │   ├── maya-sleeping.png
│   │   ├── maya-crying.png
│   │   ├── lumen-bright.png
│   │   ├── lumen-dim.png
│   │   ├── zara-before.png
│   │   ├── zara-after.png
│   │   ├── storm-before.png
│   │   ├── storm-after.png
│   │   ├── anaya-before.png
│   │   ├── anaya-calf-before.png
│   │   ├── anaya-after.png
│   │   ├── hen-before.png
│   │   ├── hen-after.png
│   │   ├── fish-before.png
│   │   ├── fish-after.png
│   │   ├── goat-before.png
│   │   ├── goat-after.png
│   │   ├── queen-aria-before.png
│   │   ├── queen-aria-after.png
│   │   ├── gaia-dying.png
│   │   ├── gaia-healing.png
│   │   └── gaia-flourishing.png
│   │
│   ├── backgrounds/              # Scene backgrounds (generated by user)
│   │   ├── maya-room-night.png
│   │   ├── maya-room-morning.png
│   │   ├── dream-entrance.png
│   │   ├── zoo-cage.png
│   │   ├── zoo-savanna.png
│   │   ├── mountain-path.png
│   │   ├── mountain-meadow.png
│   │   ├── dairy-facility.png
│   │   ├── dairy-meadow.png
│   │   ├── factory-farm.png
│   │   ├── factory-sanctuary.png
│   │   ├── dying-garden.png
│   │   ├── blooming-garden.png
│   │   ├── final-dying.png
│   │   ├── final-healing.png
│   │   └── final-flourishing.png
│   │
│   ├── ui/                       # UI elements
│   │   ├── dialogue-box.png      # Optional decorative frame
│   │   └── leaf-divider.png      # Optional decorative element
│   │
│   └── audio/                    # Music & SFX (generated by user)
│       ├── music/
│       │   ├── main-menu.mp3
│       │   ├── maya-room.mp3
│       │   ├── dream-entrance.mp3
│       │   ├── suffering.mp3
│       │   ├── transformation.mp3
│       │   ├── freedom.mp3
│       │   ├── gaia-dying.mp3
│       │   ├── gaia-healing.mp3
│       │   ├── gaia-flourishing.mp3
│       │   ├── epilogue.mp3
│       │   └── credits.mp3
│       └── sfx/
│           ├── click.mp3
│           ├── choice-hover.mp3
│           ├── choice-select.mp3
│           ├── transition-whoosh.mp3
│           ├── transformation-magic.mp3
│           ├── typing.mp3
│           └── footstep.mp3
│
└── favicon.ico
```

---

## Proposed Changes

### Core Architecture

The game is a **single-page application** with one `index.html`. JavaScript manages all state and rendering. The game flow is:

```
Title Screen → Prologue → [Scene 1 → Scene 2 → Scene 3 → Scene 4 → Scene 5] → Final Scene → Epilogue → Credits
```

**Each dream scene (1-5) has TWO PHASES:**

```
┌─────────────────────────────────────────────────────────┐
│  PHASE 1: EXPLORE                                       │
│  ─────────────────                                      │
│  • Static background displayed                          │
│  • Animal visible on the RIGHT side (idle animation)    │
│  • Maya starts on the LEFT side                         │
│  • Player moves Maya LEFT → RIGHT toward the animal     │
│  • Arrow keys (desktop) / touch buttons (mobile)        │
│  • Maya plays walk animation while moving               │
│  • Maya plays idle animation when standing still         │
│  • Lumen floats ahead, guiding                          │
│  • When Maya reaches the animal → PHASE 2 triggers      │
└─────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 2: DIALOGUE                                      │
│  ─────────────────                                      │
│  • Movement disabled                                    │
│  • Visual novel mode: dialogue box appears              │
│  • Character close-up images shown                      │
│  • Full dialogue plays (tap/click to advance)           │
│  • Choice appears (3 options)                           │
│  • Transformation plays based on choice                 │
│  • Transition to next scene                             │
└─────────────────────────────────────────────────────────┘
```

**Prologue, Final Scene, and Epilogue** are dialogue-only (no exploration phase).

---

### [NEW] [index.html](file:///d:/Gemini/Earth%20day/index.html)

Single HTML file containing:
- Meta tags for SEO + mobile viewport + `<html lang>` attribute set dynamically
- Google Fonts link (Quicksand + Caveat + Noto Sans Devanagari for Hindi)
- Game container with these layers (all CSS-controlled):
  - **Background layer** — full-screen static scene background image
  - **Scene layer** — contains Maya sprite + animal sprite positioned within scene
  - **Lumen layer** — dedicated animated Lumen sprite with CSS float + glow pulse
  - **Particle layer** — CSS particle effects for magic/transformation
  - **UI layer** — dialogue box, choice buttons, title screen, language toggle
  - **Controls layer** — on-screen mobile touch buttons (← →) for movement
  - **Overlay layer** — fade transitions, screen effects
- Script imports (ES6 modules) — `scenes.js`, `scenes-hi.js`, `player.js`, `sprites.js`
- Touch / keyboard event listeners
- No `<canvas>` — everything is DOM elements styled with CSS

---

### [NEW] [style.css](file:///d:/Gemini/Earth%20day/style.css)

Complete design system covering:

**Design tokens:**
- `--color-suffering-*`: Grays, muted browns (#4A4A4A, #6B6B6B, #8B7355)
- `--color-freedom-*`: Greens, golds (#48BB78, #F6E05E, #4299E1)
- `--color-dream-*`: Lavenders, golds (#FAF5FF, #E9D8FD, #FBD38D)
- `--font-body`: 'Quicksand', sans-serif
- `--font-hindi`: 'Noto Sans Devanagari', sans-serif (for Hindi text)
- `--font-accent`: 'Caveat', cursive (for character names, poetic text)

**Components:**
- `.game-container` — 16:9 aspect ratio, centered, responsive
- `.background` — full-cover static background with CSS transitions for crossfade
- `.maya-sprite` — Maya's animated sprite (positioned at bottom of scene):
  - Uses `background-image` pointing to sprite sheet
  - `background-position` stepped via CSS `steps()` or JS frame cycling
  - `.maya-sprite--idle` — 4-frame idle animation (gentle sway, 1.5s loop)
  - `.maya-sprite--walk` — 6-frame walk cycle (0.6s loop)
  - `.maya-sprite--flipped` — `transform: scaleX(-1)` for walking left (not needed since only left→right)
  - Size: ~120px tall on desktop, ~80px on mobile
- `.animal-sprite` — animal idle animation in scene (positioned right side):
  - Uses same sprite sheet technique as Maya
  - 4-6 frame idle loop (breathing, subtle movement)
  - Size varies per animal (~150-200px)
- `.character` — static character close-up images for dialogue mode
- `.lumen` — **animated firefly** with dedicated CSS:
  - `@keyframes lumen-float` — continuous gentle bobbing (3s ease-in-out infinite)
  - `@keyframes lumen-glow` — pulsing glow aura (2s ease-in-out infinite)
  - `.lumen--bright` / `.lumen--dim` — brightness variants via `filter: brightness()`
  - Positioned top-right of game container, ~80px size
  - Golden `box-shadow` glow that pulses
- `.dialogue-box` — semi-transparent bottom panel with glassmorphism
- `.choice-container` — three stacked buttons with distinct styles per type
- `.title-screen` — centered title with floating animation + language toggle buttons
- `.lang-toggle` — EN/हिं toggle button on title screen (and in settings)
- `.mobile-controls` — on-screen arrow buttons (← →) for mobile movement:
  - Semi-transparent, bottom-left area
  - Only visible on touch devices (media query or JS detection)
  - 60px circular buttons with arrow icons
  - Hidden during dialogue phase
- `.particles` — CSS-only sparkle/glow particles
- `.fade-overlay` — full-screen black/white/gold fade
- `.placeholder` — styled fallback for missing assets (colored rectangle + label text)

**Mobile responsive:**
- Dialogue text scales with `clamp()` for readability
- Hindi text uses `--font-hindi` with slightly larger `line-height` for Devanagari
- Touch-friendly button sizes (min 48px tap target)
- Mobile controls (← →) visible only on touch devices
- Full-screen mode support
- Landscape and portrait layouts

**Animations (CSS `@keyframes`):**
- `lumen-float` — gentle bobbing specifically for Lumen (3s infinite)
- `lumen-glow` — pulsing golden aura for Lumen (2s infinite)
- `float` — gentle bobbing for title text
- `fadeIn` / `fadeOut` — scene transitions
- `typewriter` — text reveal (CSS backup; JS handles primary)
- `sparkle` — particle glow effect
- `shake` — subtle shake for emotional moments
- `crossfade` — background transformation blend
- `slideUp` — choice buttons entrance

**Sprite Sheet CSS Technique:**
```css
/* Example: Maya walk cycle (6 frames, each 200px wide = 1200px total strip) */
.maya-sprite--walk {
  width: 200px;
  height: 300px;
  background-image: url('assets/sprites/maya-walk.png');
  background-size: 1200px 300px; /* 6 frames × 200px */
  animation: maya-walk-cycle 0.6s steps(6) infinite;
}
@keyframes maya-walk-cycle {
  from { background-position: 0 0; }
  to { background-position: -1200px 0; }
}
```

---

### [NEW] [js/state.js](file:///d:/Gemini/Earth%20day/js/state.js)

Game state manager (plain object + functions, no class). **No save/load — game is played in one sitting.**

```js
// State shape:
{
  currentScene: 'title',        // 'title' | 'prologue' | 'scene1' | ... | 'epilogue'
  currentStep: 0,               // Index within current scene's dialogue array
  phase: 'dialogue',            // 'explore' | 'dialogue' — current scene phase
  mayaX: 0,                     // Maya's X position during explore phase (0-100% of scene width)
  compassionPoints: 0,          // 0-10 total
  choicesMade: {},               // { scene1: 'compassion', scene2: 'partial', ... }
  completedScenes: [],           // ['prologue', 'scene1', ...]
  language: 'en',               // 'en' | 'hi' — set on title screen, used throughout
  musicEnabled: true,
  sfxEnabled: true,
  textSpeed: 'normal',          // 'slow' | 'normal' | 'fast'
  isTyping: false,              // Whether text is currently typing out
  isMoving: false,              // Whether Maya is currently walking
}
```

Functions:
- `getState()` — returns current state
- `setState(updates)` — merges updates
- `addPoints(amount)` — adds to compassionPoints
- `recordChoice(sceneId, choiceId, points)` — stores choice + adds points
- `getEndingType()` → `'dying'` | `'healing'` | `'flourishing'`
- `setLanguage(lang)` — sets `'en'` or `'hi'`, updates body class for font switching
- `getScenes()` — returns `SCENES` (English) or `SCENES_HI` (Hindi) based on current language
- `resetGame()` — full reset for replay (keeps language choice)

---

### [NEW] [js/player.js](file:///d:/Gemini/Earth%20day/js/player.js)

Maya's movement controller. **Only active during EXPLORE phase.**

```js
// Movement mechanics:
// - Maya starts at X = 5% (left side of scene)
// - Animal is positioned at X = 80% (right side)
// - Maya moves at ~2% per frame (smooth CSS transition or JS interval)
// - When Maya reaches the animal's trigger zone (X >= 75%), dialogue starts
// - Movement is LEFT → RIGHT only (can also go back left for exploring feel)
```

Functions:
- **`initPlayer()`** — Sets up keyboard + touch controls
- **`startExplorePhase(sceneConfig)`** — Resets Maya to left, shows her idle sprite, shows animal on right, enables controls
- **`handleMovement(direction)`** — Moves Maya left/right, swaps idle↔walk animation
- **`stopMovement()`** — Returns to idle animation
- **`checkInteraction()`** — Checks if Maya has reached the animal trigger zone → fires `onInteraction` callback
- **`disableControls()`** — Disables movement (called when dialogue starts)
- **`enableControls()`** — Re-enables movement

**Desktop controls:**
- `ArrowRight` / `D` — walk right
- `ArrowLeft` / `A` — walk left
- Hold key = continuous movement, release = stop + idle

**Mobile controls:**
- On-screen `←` `→` buttons (touchstart = move, touchend = stop)
- Buttons position: bottom-left, semi-transparent
- Buttons hidden during dialogue phase

---

### [NEW] [js/sprites.js](file:///d:/Gemini/Earth%20day/js/sprites.js)

Sprite sheet animation system. Simple frame-cycling engine.

```js
// Config per sprite:
{
  element: DOMElement,          // The div that displays the sprite
  sheetUrl: 'assets/sprites/maya-walk.png',
  frameCount: 6,                // Number of frames in the strip
  frameWidth: 200,              // Width of each frame in pixels
  frameHeight: 300,             // Height of each frame
  fps: 10,                      // Frames per second
  loop: true,                   // Loop animation
  currentFrame: 0,
  intervalId: null,
}
```

Functions:
- **`createSprite(config)`** — Returns a sprite controller object
- **`playAnimation(sprite)`** — Starts stepping through frames using `setInterval`
- **`stopAnimation(sprite)`** — Stops the interval, resets to frame 0
- **`switchSheet(sprite, newSheetUrl, newFrameCount)`** — Swap animation (e.g., idle→walk)
- **`setFrame(sprite, frameIndex)`** — Show specific frame (for static poses)

The sprite div uses `background-image` + `background-position` to show the current frame. Each frame step shifts `background-position` by `-frameWidth` pixels.

---

### [NEW] [js/scenes.js](file:///d:/Gemini/Earth%20day/js/scenes.js) — English Dialogue
### [NEW] [js/scenes-hi.js](file:///d:/Gemini/Earth%20day/js/scenes-hi.js) — Hindi Dialogue

**These are the two largest files.** They share the same structure but contain dialogue in different languages. `scenes.js` exports `SCENES` (English), `scenes-hi.js` exports `SCENES_HI` (Hindi).

The engine calls `state.getScenes()` which returns the correct scenes object based on the selected language.

Structure (identical in both files, only text values differ):

```js
// scenes.js — ENGLISH
const SCENES = {
  title: { /* title screen config */ },
  prologue: {
    id: 'prologue',
    background: 'maya-room-night',
    music: 'maya-room',
    steps: [
      {
        type: 'narration',
        text: 'Maya\'s bedroom. Moonlight streams through the window...',
        background: 'maya-room-night',
        character: null,
      },
      {
        type: 'narration',
        text: 'On her desk: a zoo ticket stub. On her plate: chicken bones. On her phone: a climate video, paused.',
        character: null,
      },
      {
        type: 'dialogue',
        speaker: 'Lumen',
        speakerColor: '#FBD38D',
        text: 'Little dreamer... tonight, the world is calling you. Will you answer?',
        character: { id: 'lumen', image: 'lumen-bright', position: 'center' },
      },
      // ... more steps
      {
        type: 'transition',
        to: 'scene1',
        effect: 'dream-fade',
      }
    ]
  },
  scene1: {
    id: 'scene1',
    title: 'Zara the Lion',
    background: 'zoo-cage',
    backgroundAfter: 'zoo-savanna',
    music: 'suffering',
    musicAfter: 'freedom',
    explore: {                           // EXPLORE PHASE CONFIG
      enabled: true,                     // true for scenes 1-5, false for prologue/final/epilogue
      animalSprite: 'zara-idle-before',  // sprite sheet key for animal idle
      animalSpriteAfter: 'zara-idle-after',
      animalX: 80,                       // animal position (% from left)
      triggerX: 72,                      // Maya X position that triggers dialogue
      animalFrames: 6,                   // frames in the animal sprite sheet
    },
    steps: [
      // ... all dialogue steps from GDD ...
      {
        type: 'choice',
        prompt: 'How do you respond to Zara?',
        choices: [
          {
            id: 'indifferent',
            icon: '😐',
            text: "I'm sorry, but people need to see animals like you to learn about them.",
            points: 0,
            transformation: 'none',
            response: [
              { speaker: 'Zara', text: 'Then I am a lesson. Not a life.' },
              { speaker: 'Lumen', text: 'Perhaps... but at what cost?' },
            ]
          },
          {
            id: 'partial',
            icon: '🤔',
            text: 'Maybe there\'s a better way... like sanctuaries?',
            points: 1,
            transformation: 'partial',
            response: [
              { speaker: 'Zara', text: 'More space is not freedom. But it is... something. It is someone trying.' },
              { speaker: 'Lumen', text: 'A small step is still a step forward.' },
            ]
          },
          {
            id: 'compassion',
            icon: '💚',
            text: 'You deserve to be free. I won\'t support places that keep wild animals in cages.',
            points: 2,
            transformation: 'full',
            response: [
              { speaker: 'Zara', text: 'You cannot free me, child. But you can free the ones who come after.' },
              { speaker: 'Zara', text: 'Thank you for seeing me. Not as a spectacle. As a soul.' },
              { speaker: 'Lumen', text: 'This is what a choice can do, Maya. Not change the past. But change what comes next.' },
            ]
          }
        ]
      },
      // ... post-choice steps, transition
    ]
  },
  // scene2, scene3, scene4, scene5, final, epilogue — same pattern
};
```

> [!IMPORTANT]
> **INSTRUCTION FOR GEMINI 3.1 PRO — ENGLISH (`scenes.js`)**: Copy ALL dialogue EXACTLY from the GDD above. Do NOT summarize, shorten, or paraphrase any dialogue lines. Every single line in the GDD's "Full Dialogue Script" sections must appear verbatim. This is the heart of the game.

> [!IMPORTANT]
> **INSTRUCTION FOR GEMINI 3.1 PRO — HINDI (`scenes-hi.js`)**: Translate EVERY dialogue line into natural, emotionally equivalent Hindi. Use Devanagari script. Keep the same structure, same keys, same IDs — only the `text`, `prompt`, and `speaker` display-name values change. Character names stay the same (Maya, Lumen, Zara, Storm, Anaya, etc). Hindi should feel poetic and heartfelt — not robotic machine translation. Use "तुम" (informal) for Maya being addressed, as she is a child.

> [!TIP]
> **Hindi translation examples for reference:**
> - "Little dreamer... tonight, the world is calling you." → "छोटी सपनों की राजकुमारी... आज रात, धरती तुम्हें बुला रही है।"
> - "I dream of grass I have never touched." → "मैं उस घास के सपने देखती हूँ जिसे मैंने कभी छुआ नहीं।"
> - "You deserve to be free." → "तुम आज़ाद रहने की हकदार हो।"

---

### [NEW] [js/engine.js](file:///d:/Gemini/Earth%20day/js/engine.js)

The core rendering engine. Manages the two-phase scene flow.

**Scene Lifecycle:**
```
enterScene(sceneId)
  → if scene.explore.enabled:
      → startExplorePhase()    [Maya walks, animal idle, movement controls ON]
      → (player reaches animal) → onInteraction()
      → startDialoguePhase()   [movement OFF, dialogue box ON]
  → else:
      → startDialoguePhase()   [prologue, final, epilogue — dialogue only]
```

Functions:

- **`initGame()`** — Sets up DOM references, event listeners, shows title screen with language toggle
- **`enterScene(sceneId)`** — Loads scene config, sets background, decides explore vs dialogue
- **`startExplorePhase()`** — Shows Maya sprite (idle) at left, animal sprite at right (with idle animation), enables player controls, shows mobile controls, hides dialogue box
- **`onInteraction()`** — Called when Maya reaches animal. Disables movement, hides mobile controls, transitions to dialogue
- **`startDialoguePhase()`** — Shows dialogue box, hides exploration sprites, shows character close-up images
- **`renderStep(step)`** — Reads current step from `state.getScenes()`, renders the appropriate view:
  - `type: 'narration'` → Show text in dialogue box, no speaker name
  - `type: 'dialogue'` → Show speaker name + text, show character close-up, show animated Lumen
  - `type: 'choice'` → Show 3 choice buttons, hide dialogue advance indicator
  - `type: 'transition'` → Trigger scene change animation, load next scene
- **`typeText(text, element, speed)`** — Typewriter effect, character by character
- **`showCharacter(config)`** — Fade in character close-up image. If image fails to load, show styled placeholder.
- **`hideCharacter()`** — Fade out current character
- **`showLumen(mood)`** — Show Lumen with CSS animation. `mood` is `'bright'` or `'dim'`. Lumen has:
  - Continuous `lumen-float` animation (gentle up-down bob, 3s infinite)
  - Continuous `lumen-glow` animation (golden aura pulse, 2s infinite)
  - During EXPLORE phase: Lumen floats ahead of Maya (slightly to the right)
  - During DIALOGUE phase: Lumen positioned top-right area
  - If image missing: show a golden glowing circle (CSS radial-gradient + box-shadow) as placeholder
- **`hideLumen()`** — Fade out Lumen
- **`setBackground(bgKey)`** — Crossfade to new background. If image missing, show a full-screen colored div with the background name as subtle text.
- **`handleAdvance()`** — Called on click/tap/space/enter. Advances dialogue or skips typing. **Only active in DIALOGUE phase.**
- **`handleChoice(choiceIndex)`** — Records choice, adds points, plays response dialogue, triggers transformation
- **`playTransformation(type)`** — Visual transformation sequence:
  - `'none'` — No change, just dim/gray filter effect
  - `'partial'` — Blend 50% old + 50% new background, partial character/animal sprite change
  - `'full'` — Golden particles → crossfade background → swap animal sprite to after version → sparkle burst
- **`showEndingScene()`** — Reads `getEndingType()`, loads correct Gaia sprite + background + dialogue
- **`showCredits()`** — Scrolling credits with organization links

**Placeholder Fallback System:**
Every `<img>` element uses an `onerror` handler that replaces it with a styled `<div class="placeholder">` showing:
- A themed background color (e.g., golden for characters, blue-gray for backgrounds)
- The asset filename as small centered text
- Appropriate dimensions matching the expected image
Sprite sheets that fail to load → use a solid colored rectangle as the sprite div background.

**Input handling:**
- **EXPLORE phase (desktop):** Arrow keys / WASD to move Maya. No click-to-advance.
- **EXPLORE phase (mobile):** On-screen ← → buttons for movement.
- **DIALOGUE phase (desktop):** Click anywhere / Space / Enter to advance. Click choice buttons.
- **DIALOGUE phase (mobile):** Tap anywhere to advance. Tap choice buttons. Movement controls hidden.

---

### [NEW] [js/transitions.js](file:///d:/Gemini/Earth%20day/js/transitions.js)

Handles visual effects:
- `fadeToBlack(duration)` — Promise-based overlay fade
- `fadeToWhite(duration)` — For dream transitions
- `fadeToGold(duration)` — For magical transitions
- `crossfadeBackground(from, to, duration)` — Smooth BG swap
- `spawnParticles(count, color, duration)` — Create CSS-animated particle divs
- `shakeScreen(intensity, duration)` — CSS transform shake

All functions return Promises so they can be `await`ed in sequence.

---

### [NEW] [js/audio.js](file:///d:/Gemini/Earth%20day/js/audio.js)

Audio manager:
- `playMusic(trackKey, fade)` — Play background music, crossfade from current
- `stopMusic(fade)` — Fade out and stop
- `playSFX(sfxKey)` — One-shot sound effect
- `setMusicVolume(0-1)` / `setSFXVolume(0-1)`
- `toggleMute()`
- Handles browser autoplay policy (requires first user interaction)
- All audio files are lazy-loaded (created on first use)

---

## Mobile Compatibility

| Feature | Implementation |
|---------|---------------|
| Movement controls | On-screen ← → buttons (bottom-left, semi-transparent, 60px circular) |
| Touch to advance | `touchend` event on game container (dialogue phase only) |
| Touch choice buttons | Standard button `click` events |
| Responsive layout | CSS `clamp()`, `vw`/`vh` units, media queries |
| Fullscreen | Optional fullscreen button using Fullscreen API |
| Portrait mode | Dialogue box takes more height, BG scales with `object-fit: cover` |
| Landscape mode | Standard 16:9 layout |
| Tap target size | All buttons minimum 48×48px |
| No hover dependency | All hover effects also triggered on `:active` for touch |
| Controls visibility | Movement buttons hidden during dialogue, shown during explore |
| Performance | DOM-based (no canvas), lightweight — works on low-end phones |

---

## 🎨 ChatGPT Image Generation Prompts

> [!IMPORTANT]
> **Two types of images needed:**
> 1. **Sprite sheets** — horizontal strips with multiple frames side by side (for animations). Save as **wide PNG** with transparent background.
> 2. **Static images** — single images for dialogue close-ups and backgrounds.
>
> Generate these one at a time in ChatGPT. Use **PNG** format with transparent backgrounds for characters/sprites.

---

### 🏃 SPRITE SHEETS — Animation Frames

> [!TIP]
> **How sprite sheets work:** Each sprite sheet is a single wide image with frames laid out **horizontally left to right**. Example: a 6-frame walk cycle at 200px per frame = one image that is 1200px wide × 300px tall. The game engine shows one frame at a time by shifting the visible window.

#### Maya — Walk Cycle (6 frames)

```
Create a horizontal sprite sheet of a 12-year-old Indian girl walking to the
right, shown as 6 sequential animation frames side by side in a single wide
image. She wears a simple white/cream nightgown, bare feet, long flowing dark
hair. Each frame shows a different position in the walk cycle: (1) standing
with right foot forward, (2) mid-stride right leg ahead, (3) right foot
planted left lifting, (4) left foot forward, (5) mid-stride left leg ahead,
(6) left foot planted right lifting. Side view facing right. Each frame is
the same size. Watercolor illustration style, Studio Ghibli inspired, soft
edges, dreamy. Transparent background. No text. The 6 frames should be
evenly spaced in a single horizontal row.
```

#### Maya — Idle Standing (4 frames)

```
Create a horizontal sprite sheet of a 12-year-old Indian girl standing still
with a gentle idle breathing animation, shown as 4 sequential frames side by
side in a single wide image. She wears a white/cream nightgown, bare feet,
long dark flowing hair. The 4 frames show subtle idle movement: (1) standing
neutral, (2) very slight rise as she breathes in with hair swaying slightly,
(3) at full breath height, (4) settling back down as she breathes out. Very
subtle differences between frames. Side view facing right. Watercolor
illustration style, Studio Ghibli inspired. Transparent background. No text.
```

#### Zara the Lion — Idle in Cage (6 frames)

```
Create a horizontal sprite sheet of a sad adult female lion lying down with a
gentle breathing animation, shown as 6 sequential frames side by side. Dull
matted fur, tired eyes, ribs slightly visible. The 6 frames show subtle
breathing: (1) at rest, (2) chest slightly expanding, (3) full inhale with
slight head movement, (4) beginning exhale, (5) chest lowering, (6) settling
back to rest. Melancholic, captive feel. Watercolor illustration, muted grays
and browns. Transparent background. No text.
```

#### Zara the Lion — Idle Free (6 frames)

```
Create a horizontal sprite sheet of a majestic adult female lion standing
proudly with a breathing animation, shown as 6 sequential frames side by side.
Golden healthy fur, bright eyes. The 6 frames show: (1) standing proud,
(2) slight chest expansion, (3) mane ruffling slightly in wind, (4) head
raising slightly, (5) settling, (6) back to proud stance. Vibrant, free,
savanna feeling. Watercolor illustration, warm golden colors. Transparent
background. No text.
```

#### Storm the Horse — Idle Exhausted (6 frames)

```
Create a horizontal sprite sheet of a tired brown horse with heavy saddle,
showing a weary breathing animation in 6 sequential frames side by side.
Head bowed low, saddle sores visible. The 6 frames show: (1) head low,
(2) slight labored breath, (3) legs trembling slightly, (4) head drops lower,
(5) heavy exhale, (6) back to start. Exhausted and weary. Watercolor
illustration, harsh earth tones. Transparent background. No text.
```

#### Storm the Horse — Idle Free (6 frames)

```
Create a horizontal sprite sheet of a free wild brown horse standing alert
in a meadow, breathing animation in 6 sequential frames side by side.
No saddle, coat gleaming. The 6 frames show: (1) standing alert, (2) ears
perking, (3) slight head toss, (4) mane flowing, (5) stamping foot lightly,
(6) back to alert pose. Vibrant and free. Watercolor illustration, greens
and golds. Transparent background. No text.
```

#### Anaya the Cow — Idle at Fence (4 frames)

```
Create a horizontal sprite sheet of a brown and white dairy cow pressing
against a metal fence, in 4 sequential frames side by side. Sad eyes,
swollen udders. The 4 frames show: (1) pressing against fence, (2) head
lifting slightly, (3) mouth opening as if calling, (4) head dropping back
down. Heartbreaking desperation. Watercolor illustration, cold blue-grays.
Transparent background. No text.
```

#### Calf — Idle Reaching (4 frames)

```
Create a horizontal sprite sheet of a tiny newborn brown and white calf
reaching through fence bars, in 4 sequential frames side by side. Confused
scared expression. The 4 frames show: (1) reaching through bars, (2) little
hoof stretching further, (3) pulling back slightly, (4) reaching again.
Watercolor illustration, cold muted colors. Transparent background. No text.
```

#### Anaya + Calf — Idle Reunited (4 frames)

```
Create a horizontal sprite sheet of a mother cow nuzzling her calf in a green
meadow, in 4 sequential frames side by side. Both content and peaceful.
The 4 frames show: (1) calf nursing, (2) mother nuzzling calf's head,
(3) both breathing peacefully, (4) calf looking up at mother. Tender moment.
Watercolor illustration, warm greens and golds. Transparent background. No text.
```

#### Hen — Idle Caged (4 frames) / Idle Free (4 frames)

```
Caged: Create a horizontal sprite sheet of a white hen cramped in a tiny wire
cage, 4 frames side by side. (1) cramped still, (2) slight head bob, (3) eye
blinking, (4) back to still. Stressed. Muted reds/grays. Transparent bg.

Free: Create a horizontal sprite sheet of a happy white hen in an open field
with wings spread, 4 frames side by side. (1) wings folding in, (2) wings
opening, (3) wings fully spread, (4) dust bathing motion. Joyful. Bright
colors. Watercolor. Transparent bg. No text.
```

#### Fish — Idle Trapped (4 frames) / Idle Free (4 frames)

```
Trapped: Create a horizontal sprite sheet of fish gasping in overcrowded murky
tank, 4 frames side by side. (1) mouth closed, (2) mouth opening gasping,
(3) mouth wide, (4) mouth closing weakly. Distressed. Murky colors.
Transparent bg. No text.

Free: Create a horizontal sprite sheet of fish swimming joyfully in clear
water, 4 frames side by side. (1) gliding, (2) tail flipping, (3) turning,
(4) leaping slightly. Peaceful and free. Vibrant blues/greens.
Transparent bg. No text.
```

#### Goat — Idle Fearful (4 frames) / Idle Free (4 frames)

```
Fearful: Create a horizontal sprite sheet of a frightened goat trembling,
4 frames side by side. (1) standing tense, (2) slight tremor/shake,
(3) ears back, (4) looking toward dark doorway. Somber tones.
Transparent bg. No text.

Free: Create a horizontal sprite sheet of a happy goat jumping playfully,
4 frames side by side. (1) crouching to jump, (2) mid-leap, (3) at peak,
(4) landing. Joyful energy. Warm bright colors. Transparent bg. No text.
```

#### Queen Aria — Idle Struggling (4 frames) / Idle Dancing (4 frames)

```
Struggling: Create a horizontal sprite sheet of a large queen bee with weak
drooping wings, 4 frames side by side. (1) hovering weakly, (2) wings
drooping more, (3) dipping down, (4) struggling back up. Dying garden feel.
Desaturated colors. Transparent bg. No text.

Dancing: Create a horizontal sprite sheet of a vibrant queen bee dancing
joyfully with strong wings, 4 frames side by side. (1) hovering strong,
(2) wings fanning out, (3) spiral turn start, (4) full spiral dance.
Colorful blooming garden feel. Vivid colors. Transparent bg. No text.
```

#### Gaia — Idle Dying (4 frames)

```
Create a horizontal sprite sheet of an ethereal woman embodying dying Earth,
4 frames side by side. Cracked skin, dead branch hair. (1) standing, (2) a
piece crumbling off, (3) head dropping slightly, (4) tear of polluted water
rolling down. Muted grays/browns. Transparent bg. No text.
```

#### Gaia — Idle Healing (4 frames)

```
Create a horizontal sprite sheet of an ethereal woman half-healed half-damaged,
4 frames side by side. (1) standing, (2) a flower blooming on her skin,
(3) gentle smile forming, (4) green leaf unfurling in hair. Mixed colors.
Transparent bg. No text.
```

#### Gaia — Idle Flourishing (4 frames)

```
Create a horizontal sprite sheet of a magnificent goddess of a thriving Earth,
4 frames side by side. Forest hair, ocean eyes, flower skin. (1) arms at
side radiating light, (2) arms opening, (3) flowers blooming on her skin,
(4) butterflies lifting from her hair. Breathtaking vibrant colors.
Transparent bg. No text.
```

---

### 👤 STATIC CHARACTER IMAGES — Dialogue Close-ups

These are single images shown in the dialogue box area during conversations.

#### Maya — Expressions (5 images)

**Prompt — Maya Neutral:**
```
A 12-year-old Indian girl standing in a gentle curious pose, wearing a simple
white/cream nightgown, bare feet, long flowing dark hair slightly floating as
if in a dream, big expressive brown eyes, soft round features. She has a look
of gentle curiosity. Full body, side-angled view. Watercolor illustration style,
soft edges, dreamy atmosphere, Studio Ghibli inspired, warm emotional lighting.
Transparent background. No text.
```

**Prompt — Maya Sad:**
```
A 12-year-old Indian girl in the same white nightgown, bare feet, long dark
flowing hair. She is hunched slightly with shoulders drooping, looking down,
her eyes are glistening with sadness. Hands clasped together near her chest.
Full body. Watercolor illustration style, soft muted colors, emotional,
Studio Ghibli inspired. Transparent background. No text.
```

**Prompt — Maya Hopeful:**
```
A 12-year-old Indian girl in white nightgown, bare feet, long dark flowing hair.
She is standing tall with a small warm smile, eyes bright with hope and
determination. One hand near her heart, the other relaxed at her side.
Full body. Watercolor illustration style, warm golden lighting, vibrant yet
soft, Studio Ghibli inspired. Transparent background. No text.
```

**Prompt — Maya Crying:**
```
A 12-year-old Indian girl in white nightgown, bare feet, long dark flowing hair.
Tears streaming down her face, hands slightly raised near her face in shock
and empathy. Expression of deep sadness mixed with compassion. Full body.
Watercolor illustration style, emotional, muted colors with warm undertones,
Studio Ghibli inspired. Transparent background. No text.
```

**Prompt — Maya Sleeping:**
```
A 12-year-old Indian girl sleeping peacefully on her side in bed. White
nightgown, dark hair spread on pillow, peaceful serene expression, gentle
moonlight on her face. Close-up upper body view. Watercolor illustration
style, soft blues and silvers, dreamy, cozy atmosphere. No text.
```

---

#### Lumen (Firefly Guide)

**Prompt — Lumen Bright:**
```
A magical glowing firefly, larger than normal about the size of a child's
palm. Golden-white ethereal glow radiating outward. Delicate translucent
wings with subtle leaf and water drop patterns in the wing veins. Trailing
golden sparkle particles behind it. Friendly, wise appearance with gentle
large eyes. Fantasy creature design. Watercolor illustration style, luminous,
warm golden light. Transparent background. No text.
```

**Prompt — Lumen Dim:**
```
Same magical firefly as above but with a much dimmer, softer blue-white glow.
The sparkle trail is faint, almost extinguished. Wings slightly drooping.
Sadder, more subdued presence. Watercolor illustration style, muted tones,
melancholic atmosphere. Transparent background. No text.
```

---

#### Zara the Lion

**Prompt — Zara Before (captive):**
```
A sad adult female lion lying on a cold concrete floor behind gray metal bars.
Her fur is dull and matted, ribs slightly visible showing malnutrition. Tired
melancholic eyes half-closed. A fake painted savanna backdrop (cracked and
peeling) visible behind her. Dirty small water bowl nearby. The atmosphere is
oppressive and gray. Watercolor illustration style, muted desaturated colors,
emotional, no text. Wide composition showing the cage environment.
```

**Prompt — Zara After (free):**
```
A majestic adult female lion standing proudly in an African savanna at golden
hour sunset. Her fur is rich golden and flowing in the wind. Her eyes are
bright, powerful, and joyful. Tall golden grass surrounds her. Warm orange
and gold sky behind. She looks liberated and magnificent. Watercolor
illustration style, vibrant warm colors, Studio Ghibli inspired, dynamic
and free. No text.
```

---

#### Storm the Horse

**Prompt — Storm Before (exploited):**
```
A tired adult brown horse on a steep rocky mountain path under harsh beating
sun. Heavy leather saddle with visible sores on his back. Metal bit pulling
painfully at his mouth. Exhausted posture with trembling legs, head bowed
low. Dusty, dry environment. Other horses visible in background chained to
posts. Watercolor illustration style, harsh earth tones, muted oppressive
colors. No text.
```

**Prompt — Storm After (free):**
```
A wild brown horse galloping freely across a lush green meadow with rolling
hills. No saddle, no equipment, coat gleaming in sunlight. Flowing mane in
the wind. Dynamic joyful running pose. Sunset golden hour lighting. Open
freedom, hills and wildflowers in background. Watercolor illustration style,
vibrant greens and golds, dynamic energy. No text.
```

---

#### Anaya the Cow & Little One (Calf)

**Prompt — Anaya Before (separated mother):**
```
A brown and white dairy cow pressing desperately against a cold metal fence
in an industrial dairy facility. Painfully swollen udders. Sad desperate eyes
reaching through the bars. Cold blue-gray fluorescent lighting. Sterile
concrete floor with drains. Milking machinery visible in background.
Heartbreaking maternal desperation. Watercolor illustration style, cold
blues and grays, emotional. No text.
```

**Prompt — Calf Before (separated baby):**
```
A tiny newborn brown and white calf on the opposite side of a metal fence,
reaching its small head through the bars toward its mother. Confused, scared
expression. Still has umbilical cord remnant showing how young it is. Cold
industrial setting, harsh lighting. Watercolor illustration style, cold muted
colors, heartbreaking innocence. No text.
```

**Prompt — Anaya After (reunited):**
```
A mother cow and her young calf together in a warm green meadow, the calf
nursing peacefully while the mother nuzzles it with deep love and contentment.
Surrounded by wildflowers and soft warm sunlight. Both look healthy, peaceful,
and complete. A tender maternal moment. Watercolor illustration style, warm
greens and golds, Studio Ghibli inspired, emotionally tender. No text.
```

---

#### The Forgotten (Hen, Fish, Goat)

**Prompt — Hen Before:**
```
A white hen cramped inside a tiny wire battery cage she cannot turn around in.
Stressed thin feathers, sad resigned eyes. Dozens of identical stacked cages
visible behind her in a dim red-tinged industrial factory. Oppressive dark
atmosphere. Watercolor illustration, dark emotional, muted reds and grays. No text.
```

**Prompt — Hen After:**
```
A happy white hen in an open sunlit field, wings fully spread wide for the
first time, dust-bathing joyfully in warm earth. Green grass, blue sky,
freedom. Other chickens visible in background pecking and exploring freely.
Watercolor illustration, bright joyful colors, warmth and liberation. No text.
```

**Prompt — Fish Before:**
```
Multiple fish in an overcrowded murky industrial tank, gasping at the surface
with panicked eyes. Dark gloomy aquaculture setting, greenish dirty water.
Too many fish crammed together. Industrial pipes and metal walls. Watercolor
illustration, murky blue-grays, distressing, claustrophobic. No text.
```

**Prompt — Fish After:**
```
Fish swimming freely in a crystal clear natural stream, one fish leaping
joyfully out of the water catching sunlight. Clean water with smooth rocks,
aquatic plants, dappled light through trees above. Peaceful natural habitat.
Watercolor illustration, vibrant blues and greens, serene and free. No text.
```

**Prompt — Goat Before:**
```
A frightened goat standing in a line of other goats, looking toward a dark
ominous doorway with wide fearful eyes. Trembling posture, ears back. Dark
industrial atmosphere with metal walls. Not graphic but deeply unsettling
through the goat's expression alone. Watercolor illustration, somber dark
tones, emotional fear. No text.
```

**Prompt — Goat After:**
```
A happy goat jumping and playing on hay bales in a sunlit farm sanctuary.
Carefree playful energy, ears up, eyes bright. Other goats playing together
in green pastures with wooden fences. Bright sunshine, wildflowers.
Watercolor illustration, warm joyful colors, playful energy. No text.
```

---

#### Queen Aria (Bee)

**Prompt — Queen Aria Before:**
```
A larger queen bee with weakened drooping wings struggling to fly in a dying
garden. Wilted brown dead flowers everywhere. Other bees lying fallen on the
ground. Hazy polluted atmosphere, desaturated washed out colors. Environmental
collapse. Watercolor illustration, melancholic, gray-greens, dying world. No text.
```

**Prompt — Queen Aria After:**
```
A vibrant healthy queen bee with strong iridescent wings leading a beautiful
spiral dance of dozens of healthy bees. Surrounded by explosively colorful
blooming flowers of all varieties. Butterflies, ladybugs, birds in the air.
Garden paradise bursting with life. Watercolor illustration, vivid joyful
colors, celebration of nature, Studio Ghibli inspired. No text.
```

---

#### Gaia (Mother Earth) — Three Versions

**Prompt — Gaia Dying:**
```
An ethereal tall woman embodying a dying Earth. Her skin is cracked like
parched dry earth, showing deep fissures. Her hair is dead bare tree branches
with no leaves. Her eyes are clouded and exhausted. Tears of murky polluted
water run down her weathered face. Her form is crumbling at the edges. She
stands in a gray barren wasteland under a smoggy starless sky. Full body.
Watercolor illustration, devastatingly sad, muted grays and browns, powerful
emotional. No text.
```

**Prompt — Gaia Healing:**
```
An ethereal tall woman embodying an Earth in recovery. Half of her skin shows
blooming flowers and green moss, the other half still has cracks and dryness.
Her hair is mixed — some branches have green leaves growing, others are still
bare. Her eyes are tired but have a gentle light of hope. Small gentle smile.
She stands on ground that is half-green with sprouts and half-dry cracked
earth. Sky behind her has both clouds and a few visible stars. Full body.
Watercolor illustration, hopeful bittersweet atmosphere, transitioning
colors from gray to green. No text.
```

**Prompt — Gaia Flourishing:**
```
A magnificent ethereal goddess embodying a thriving Earth in all her glory.
Her flowing hair is a living forest with tiny birds and butterflies nestled
in it. Her eyes are deep clear blue like healthy oceans. Her skin is covered
in blooming flowers, soft moss, and living grass. She radiates warmth, power,
and infinite love. She stands in a paradise garden with aurora borealis in
the starlit sky above. Flowers bloom at her feet. Animals peek from her hair.
She is smiling with profound peaceful joy. Full body. Watercolor illustration,
absolutely vibrant breathtaking colors, awe-inspiring, Studio Ghibli
masterpiece quality. No text.
```

---

### Backgrounds — Prompt List

> All backgrounds should be generated in **wide/landscape 16:9 format**.

| Background | Prompt Summary |
|-----------|---------------|
| `maya-room-night` | "Cozy child's bedroom at night, moonlight through window, bed with sleeping child silhouette, desk with chicken plate, phone, zoo ticket, milk glass. Warm cozy colors with cool moonlight. Watercolor 16:9." |
| `maya-room-morning` | "Same bedroom in morning sunlight streaming through window. Warm, hopeful golden light. Everything the same but illuminated. Watercolor 16:9." |
| `dream-entrance` | "A golden glowing ethereal path stretching into soft luminous mist. Dreamlike, mysterious, inviting. Soft lavender and gold atmosphere. Floating light particles. Watercolor 16:9." |
| `zoo-cage` | "Interior of a depressing zoo exhibit from viewing area perspective. Gray concrete, thick metal bars, fake painted savanna backdrop peeling off wall. Harsh artificial light. Empty benches, dropped popcorn. Watercolor, muted grays, 16:9." |
| `zoo-savanna` | "Vast open African savanna at golden sunset. Tall golden grass, acacia trees silhouetted, warm orange sky, endless horizon. Freedom and vastness. Watercolor, vibrant warm colors, 16:9." |
| `mountain-path` | "Steep rocky mountain tourist trail under harsh glaring sun. No shade, dusty brown rocks, oppressive heat visible in the air. Horses chained to posts in background. Watercolor, harsh earth tones, 16:9." |
| `mountain-meadow` | "Soft rolling green meadow with gentle hills, wildflowers, and a golden sunset. Peaceful, free, open. Fresh wind implied. Watercolor, vibrant greens and golds, 16:9." |
| `dairy-facility` | "Cold sterile interior of industrial dairy facility. Metal fencing, concrete floors with drains, fluorescent lighting, milking machinery. Clinical, cold blue-gray atmosphere. Watercolor, cold muted colors, 16:9." |
| `dairy-meadow` | "Warm green pasture with wildflowers, gentle sunshine, wooden fences in distance. Peaceful pastoral scene. Warm golden afternoon light. Watercolor, warm greens, 16:9." |
| `factory-farm` | "Dark oppressive interior of factory farm. Stacked battery cages, dim red-tinged industrial lighting, crowded overwhelmed atmosphere. Machinery, pipes, no windows. Watercolor, dark reds and browns, 16:9." |
| `factory-sanctuary` | "Bright open farm sanctuary. Green grass, sunshine, hay bales, wooden barn in background. Animals scattered freely — chickens, goats. Clear stream. Watercolor, bright joyful colors, 16:9." |
| `dying-garden` | "A garden in environmental collapse. Most flowers wilted and dead, desaturated colors. Hazy polluted sky. Factory smoke on distant horizon. Chemical containers scattered. Silent and dying. Watercolor, washed-out greens and grays, 16:9." |
| `blooming-garden` | "An explosively colorful garden bursting with life. Every variety of flower blooming. Bees buzzing, butterflies dancing, birds in the air. Paradise garden. Lush and vibrant. Watercolor, vivid rainbow of colors, 16:9." |
| `final-dying` | "Vast barren cracked desert wasteland under a polluted smoggy sky with no stars. Dead trees, no life. Desolate, gray, heartbreaking. Watercolor, muted devastation, 16:9." |
| `final-healing` | "Landscape transitioning from barren to green. Left side is cracked dry earth, right side has grass and sprouts pushing through. Sky transitioning from cloudy to showing some stars. Watercolor, mixed hopeful tones, 16:9." |
| `final-flourishing` | "Paradise landscape. Lush forests, crystal rivers, blooming meadows under a sky with aurora borealis and bright stars with a beautiful moon. The most beautiful natural scene imaginable. Watercolor, breathtakingly vibrant, Studio Ghibli inspired, 16:9." |

---

## 🎵 Gemini Music Generation Prompts

> [!TIP]
> Generate each track separately in Gemini Music. Export as MP3. Aim for the durations listed.

| # | Track Name | Duration | Gemini Prompt |
|---|-----------|----------|---------------|
| 01 | Main Menu | 2:00 loop | "Create a dreamy, peaceful piano melody with soft ambient nature sounds (gentle wind, distant birds). Flowing and gentle, like slowly falling asleep. Inspired by Studio Ghibli soundtracks. Key of C major, 60-70 BPM. Should loop seamlessly. 2 minutes." |
| 02 | Maya's Room | 1:30 | "Create a cozy, intimate music box melody with very gentle strings underneath. Warm, safe, nighttime feeling. Like a lullaby. Simple and beautiful. 1.5 minutes. Loopable." |
| 03 | Dream Entrance | 1:00 | "Create mysterious, ethereal ambient music with soft bell tones and shimmering pads. Slowly building sense of wonder. Like entering a magical dream world. Sparse notes, lots of space. 1 minute." |
| 04 | Suffering | 2:00 loop | "Create a melancholic, emotional piano piece. Slow, sparse notes in A minor key. Deep sadness but not harsh — more like gentle grief. Moments of silence between phrases. Like tears falling slowly. 2 minutes, loopable. 50-60 BPM." |
| 05 | Transformation | 0:45 | "Create a short piece starting with a single low piano note, then gradually building with strings joining in, crescendoing to a warm hopeful bloom of sound. Transition from minor key to major key. Include subtle nature sounds (birds, wind chimes) at the climax. 45 seconds." |
| 06 | Freedom | 1:30 loop | "Create a gentle, joyful, uplifting piece with flowing piano and warm strings. Feeling of liberation and sunlight. Major key, flowing and peaceful but with an undercurrent of triumph. Birds and nature sounds subtle in the background. 1.5 minutes, loopable." |
| 07 | Gaia Dying | 2:00 | "Create a devastating, somber orchestral piece. Low strings, very sparse. Long pauses and silence. The sound of a world fading away. Occasionally a single high note of distant hope barely audible. Deeply emotional and heavy. 2 minutes." |
| 08 | Gaia Healing | 2:00 | "Create a bittersweet piece that transitions from somber to hopeful. Starts with minor key soft piano, gradually introduces warmer strings. Not fully happy — tired but hopeful, like sunrise after a storm. Mixed major and minor. 2 minutes." |
| 09 | Gaia Flourishing | 2:30 | "Create a triumphant, beautiful orchestral celebration of nature. Full warm strings, gentle woodwinds, bird sounds woven naturally into the music. Feels like the Earth breathing with joy. Emotional climax — peaceful triumph, not bombastic. Like a Studio Ghibli finale. G major, 70-80 BPM. 2.5 minutes." |
| 10 | Epilogue | 1:30 | "Create a peaceful, resolved piece. Return of a gentle piano theme — like waking from a meaningful dream. Warm, hopeful, intimate. Simple and beautiful. 1.5 minutes." |
| 11 | Credits | 3:00 | "Create an uplifting, inspiring piece that builds on the main gentle piano theme. Add layers of strings, then gentle percussion, building to a warm, full, hopeful finale. The feeling of 'go change the world.' 3 minutes." |

---

## 🔧 Instructions for Gemini 3.1 Pro (Developer)

> [!CAUTION]
> **CRITICAL RULES — READ BEFORE WRITING ANY CODE:**
>
> 1. **DO NOT invent or modify dialogue.** Copy every English dialogue line from the GDD EXACTLY. The dialogue is the game's soul.
> 2. **DO NOT use any framework, library, or npm package.** Pure vanilla HTML, CSS, JavaScript only.
> 3. **DO NOT use `<canvas>`.** The entire game is DOM-based with CSS styling and animations. Sprite sheets are animated using `background-image` + `background-position` on divs.
> 4. **DO NOT create placeholder images inline** (no base64, no SVG sprites). Use `<img>` tags or `background-image` CSS pointing to `assets/` paths. Every image MUST have a fallback — `onerror` for `<img>` tags, or a solid-color CSS fallback for sprite divs.
> 5. **DO NOT overcomplicate the movement system.** Maya moves left→right (one axis only). Use CSS `left` property with a transition or JS `setInterval`. No physics engine, no collision detection beyond a simple X-position threshold check.
> 6. **ALL dialogue from ALL 5 scenes, prologue, final scene, and epilogue MUST be included** in BOTH `scenes.js` (English) AND `scenes-hi.js` (Hindi). Do not skip any scene in either file.
> 7. **Each choice must have exactly 3 options** with 0, 1, and 2 points respectively.
> 8. **The ending is determined by total compassion points**: 0-3 = dying, 4-7 = healing, 8-10 = flourishing.
> 9. **File structure must match exactly** as specified in the Project Structure section above.
> 10. **Mobile-first CSS.** Use `clamp()`, `vh`/`vw`, responsive breakpoints (768px, 1024px).
> 11. **Lumen MUST be animated** with CSS `@keyframes` — gentle float bob (3s) + golden glow pulse (2s). Lumen appears during ALL scenes.
> 12. **Hindi translations** must be natural, poetic Devanagari Hindi — NOT robotic machine translation. Use `'Noto Sans Devanagari'` font for Hindi text.
> 13. **No save/load system.** No localStorage. Game is played start-to-finish in one session.
> 14. **Language toggle** on title screen: two buttons "English" / "हिंदी". Once selected, all UI text and dialogue switches to that language for the entire playthrough.
> 15. **Sprite animations** use the CSS `steps()` technique with `background-position`. Each sprite sheet is a horizontal strip. The `sprites.js` module handles frame cycling.
> 16. **Two-phase scene flow** for dream scenes (1-5): EXPLORE phase (movement enabled, sprites visible) → player reaches animal → DIALOGUE phase (movement disabled, close-up images, visual novel).
> 17. **Mobile movement controls**: On-screen ← → buttons, visible ONLY during EXPLORE phase, hidden during DIALOGUE. Use `touchstart`/`touchend` events (not click) for responsive feel.
> 18. **Animal sprites play idle animations continuously** from the moment the scene loads. They should be visible during the EXPLORE phase, giving life to the scene as Maya walks toward them.

---

## Development Phases

### Phase 1: Foundation (Files: `index.html`, `style.css`, `js/state.js`, `js/main.js`, `js/sprites.js`)
- Create HTML structure with all layers (scene layer, Lumen layer, controls layer)
- Build complete CSS design system (Lumen animations, sprite animation classes, Hindi font support)
- Build sprite sheet animation system (`sprites.js`)
- Implement state management (with phase tracking, language support, no save/load)
- Create title screen with language toggle (English / हिंदी) and START button
- Build placeholder fallback system (styled colored `<div>` for missing images/sprites)
- Verify: Title screen renders in both languages, responsive on mobile

### Phase 2: Engine + Movement (Files: `js/engine.js`, `js/player.js`, `js/transitions.js`, `js/audio.js`)
- Build player controller (`player.js`) — Maya movement left/right with arrow keys + mobile touch buttons
- Build sprite animation integration — Maya idle (4 frames) + walk (6 frames) switching
- Build two-phase scene flow: EXPLORE → interaction trigger → DIALOGUE
- Build animal sprite display with idle animations during EXPLORE phase
- Build dialogue rendering (typewriter effect) for DIALOGUE phase
- Build choice rendering (3 buttons)
- Build animated Lumen display (CSS float + glow, bright/dim modes, follows Maya during EXPLORE)
- Build scene transitions (fade effects)
- Build audio manager (music + SFX, graceful if files missing)
- Build character close-up display for dialogue (show/hide/swap with placeholder fallback)
- Build background display (set/crossfade with placeholder fallback)
- Verify: Can walk Maya to an animal, trigger dialogue, make a choice — with placeholder sprites

### Phase 3: Content (Files: `js/scenes.js`, `js/scenes-hi.js`)
- Write ALL English scene data in `scenes.js` — every dialogue line, every choice, every response
- Write ALL Hindi scene data in `scenes-hi.js` — translated from English with poetic quality
- Include EXPLORE config for each dream scene (animal sprite, position, trigger zone)
- Prologue → Scene 1 (Lion) → Scene 2 (Horse) → Scene 3 (Cow) → Scene 4 (Food) → Scene 5 (Bees) → Final → Epilogue
- Include transitions between scenes
- Verify: Full playthrough works in BOTH languages — explore + dialogue + choices + transformations

### Phase 4: Polish
- Add particle effects (CSS-only golden sparkles)
- Add transformation animations (crossfade, particles, screen shake, animal sprite swap)
- Add settings menu (text speed, volume, fullscreen)
- Add credits screen with scrolling text (bilingual)
- Tune sprite animation speeds for smooth feel
- Verify: All 3 ending paths work correctly in both languages, movement feels smooth on mobile

---

## Verification Plan

### Automated Tests
- Manual browser testing: play through all 3 ending paths
- Mobile test: Chrome DevTools device emulation (iPhone SE, iPad, Galaxy S20)
- Check all 5 choice points award correct points

### Manual Verification
1. **Full compassion path** (all 💚 choices) → 10 points → Flourishing Gaia → Good epilogue
2. **All indifferent path** (all 😐 choices) → 0 points → Dying Gaia → Bad epilogue
3. **Mixed path** (mix of choices) → 4-7 points → Healing Gaia → Neutral epilogue
4. Check mobile touch controls work (← → buttons for movement, tap to advance dialogue)
5. Check text is readable on small screens
6. Check music plays and transitions correctly
7. Check all dialogue matches GDD exactly
8. Switch language to Hindi on title screen → verify all Hindi text renders correctly with Devanagari
9. Check Lumen animation plays smoothly (float + glow) during all scenes
10. Check placeholder fallbacks display correctly when asset files are missing
11. **Maya walk animation** plays when moving, switches to idle when stopped
12. **Animal idle animations** play continuously during EXPLORE phase (breathing/subtle movement)
13. **Interaction trigger** works — dialogue starts when Maya reaches the animal's position
14. **Mobile controls** (← →) appear during EXPLORE, hide during DIALOGUE
15. **Gaia idle animation** plays in the final scene matching the ending type
