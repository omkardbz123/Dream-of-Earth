import { getState } from './state.js';

const audioEl = new Audio();
let currentBgMusic = null;
let isFading = false;
const activeLoopingSFX = new Map();

const FADE_DURATION_MS = 800;

export function getCurrentMusic() {
    return currentBgMusic;
}

/**
 * Cross-fades the background music to a new track.
 * - If the same track is already playing, does nothing.
 * - Fades out the current track, then fades in the new one.
 */
export function playMusic(trackKey, force = false) {
    if (!getState().musicEnabled && !force) return;
    if (!trackKey) return;

    const trackSrc = `assets/audio/${trackKey}.mp3`;

    // Already playing the same track — don't restart
    if (currentBgMusic === trackKey && !audioEl.paused) return;

    // If a fade is already in progress, cancel it cleanly
    isFading = false;

    if (audioEl.paused || !currentBgMusic) {
        // Nothing playing yet — start it and fade in
        _startTrack(trackSrc, trackKey);
        _fadeIn();
    } else {
        // Fade out current, then fade in new
        _fadeOut(() => {
            _startTrack(trackSrc, trackKey);
            _fadeIn();
        });
    }
}

function _startTrack(src, trackKey) {
    audioEl.src = src;
    audioEl.loop = true;
    audioEl.volume = 0;
    currentBgMusic = trackKey;
    audioEl.play().catch(e => {
        console.warn(`Music blocked for ${trackKey}:`, e);
    });
}

function _fadeIn() {
    const targetVolume = 0.5;
    const steps = 20;
    const stepTime = FADE_DURATION_MS / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;
    isFading = true;

    const interval = setInterval(() => {
        if (!isFading) {
            clearInterval(interval);
            return;
        }
        currentStep++;
        audioEl.volume = Math.min(targetVolume, currentStep * volumeStep);
        if (currentStep >= steps) {
            audioEl.volume = targetVolume;
            isFading = false;
            clearInterval(interval);
        }
    }, stepTime);
}

function _fadeOut(callback) {
    const startVolume = audioEl.volume;
    const steps = 20;
    const stepTime = FADE_DURATION_MS / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;
    isFading = true;

    const interval = setInterval(() => {
        if (!isFading) {
            clearInterval(interval);
            return;
        }
        currentStep++;
        audioEl.volume = Math.max(0, startVolume - currentStep * volumeStep);
        if (currentStep >= steps) {
            audioEl.pause();
            audioEl.volume = startVolume; // Reset for next track
            isFading = false;
            clearInterval(interval);
            if (callback) callback();
        }
    }, stepTime);
}

export function stopMusic() {
    _fadeOut(() => {
        currentBgMusic = null;
    });
}

/**
 * Plays a one-shot or looping SFX.
 */
export function playSFX(sfxKey, loop = false) {
    if (!getState().sfxEnabled) return;

    if (loop && activeLoopingSFX.has(sfxKey)) return; // Already looping

    const sfx = new Audio(`assets/audio/${sfxKey}.mp3`);
    sfx.volume = 0.7;

    if (loop) {
        sfx.loop = true;
        activeLoopingSFX.set(sfxKey, sfx);
    }

    sfx.play().catch(e => {
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
    activeLoopingSFX.forEach((sfx) => {
        sfx.pause();
        sfx.currentTime = 0;
    });
    activeLoopingSFX.clear();
}

export function setMusicVolume(volume) {
    audioEl.volume = Math.max(0, Math.min(1, volume));
}
