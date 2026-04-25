import { getState } from './state.js';

const audioEl = new Audio();
let currentBgMusic = null;
const activeLoopingSFX = new Map();

// Audio context handling could also be implemented but plain Audio falls back nicely
export function playMusic(trackKey, force = false) {
    if (!getState().musicEnabled && !force) return;
    
    const trackSrc = `assets/audio/${trackKey}.mp3`;
    
    // Check if same track is already playing
    if (currentBgMusic === trackKey && !audioEl.paused) return;

    audioEl.src = trackSrc;
    audioEl.loop = true;
    audioEl.volume = 0.5;
    
    audioEl.play().then(() => {
        console.log(`Now playing music: ${trackKey}`);
    }).catch(e => {
        console.warn(`Music playback was blocked or failed for ${trackKey}:`, e);
    });
    
    currentBgMusic = trackKey;
}

export function stopMusic() {
    audioEl.pause();
    currentBgMusic = null;
}

export function playSFX(sfxKey, loop = false) {
    if (!getState().sfxEnabled) return;

    if (loop && activeLoopingSFX.has(sfxKey)) return; // Already looping

    const sfx = new Audio(`assets/audio/${sfxKey}.mp3`);
    sfx.volume = 0.8;
    
    if (loop) {
        sfx.loop = true;
        activeLoopingSFX.set(sfxKey, sfx);
    }

    sfx.play().catch(e => {
        console.log('SFX play prevented or missing file:', e);
        if (loop) activeLoopingSFX.delete(sfxKey);
    });
}

export function stopSFX(sfxKey) {
    if (activeLoopingSFX.has(sfxKey)) {
        const sfx = activeLoopingSFX.get(sfxKey);
        sfx.pause();
        sfx.currentTime = 0;
        activeLoopingSFX.delete(sfxKey);
    }
}

export function stopAllLoopingSFX() {
    activeLoopingSFX.forEach((sfx, key) => {
        sfx.pause();
        sfx.currentTime = 0;
    });
    activeLoopingSFX.clear();
}

export function setMusicVolume(volume) {
    audioEl.volume = Math.max(0, Math.min(1, volume));
}
