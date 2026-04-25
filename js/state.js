import { SCENES } from './scenes.js';
import { SCENES_HI } from './scenes-hi.js';

const state = {
    currentScene: 'title',        // 'title' | 'prologue' | 'scene1' | ... | 'epilogue'
    currentStep: 0,               // Index within current scene's dialogue array
    phase: 'dialogue',            // 'explore' | 'dialogue' — current scene phase
    mayaX: 5,                     // Maya's X position during explore phase (0-100% of scene width)
    compassionPoints: 0,          // 0-10 total
    choicesMade: {},               // { scene1: 'compassion', scene2: 'partial', ... }
    completedScenes: [],           // ['prologue', 'scene1', ...]
    language: 'en',               // 'en' | 'hi' — set on title screen, used throughout
    musicEnabled: true,
    sfxEnabled: true,
    textSpeed: 'normal',          // 'slow' | 'normal' | 'fast'
    isTyping: false,              // Whether text is currently typing out
    isMoving: false               // Whether Maya is currently walking
};

export function getState() {
    return state;
}

export function setState(updates) {
    Object.assign(state, updates);
}

export function addPoints(amount) {
    state.compassionPoints += amount;
}

export function recordChoice(sceneId, choiceType, points) {
    state.choicesMade[sceneId] = choiceType;
    addPoints(points);
}

export function getEndingType() {
    if (state.compassionPoints <= 3) return 'dying';
    if (state.compassionPoints <= 7) return 'healing';
    return 'flourishing';
}

export function setLanguage(lang) {
    state.language = lang;
    if (lang === 'hi') {
        document.body.classList.add('lang-hi');
        document.body.classList.remove('lang-en');
    } else {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-hi');
    }
}

export function getScenes() {
    return state.language === 'en' ? SCENES : SCENES_HI;
}

export function resetGame() {
    const savedLang = state.language;
    // reset all state parameters
    setState({
        currentScene: 'title',
        currentStep: 0,
        phase: 'dialogue',
        mayaX: 5,
        compassionPoints: 0,
        choicesMade: {},
        completedScenes: [],
        language: savedLang,
        isTyping: false,
        isMoving: false
    });
}
