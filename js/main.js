import { initEngine, enterScene } from './engine.js';
import { setLanguage } from './state.js';
import { playMusic, stopMusic, playSFX } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    initEngine();
    // DO NOT play music here — browsers block audio before user interaction

    const titleScreen = document.getElementById('title-screen');
    const startBtn = document.getElementById('start-btn');
    const langBtns = document.querySelectorAll('.btn-lang');
    
    // Safety: ensure menu music and fullscreen starts on first interaction
    const handleFirstInteraction = () => {
        // Remove listeners immediately — main-menu should ONLY start once
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchend', handleFirstInteraction);

        // Start title screen music now that we have a valid user gesture
        playMusic('main-menu');
        
        // Request Fullscreen
        let fsPromise;
        if (document.documentElement.requestFullscreen) {
            fsPromise = document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            fsPromise = document.documentElement.webkitRequestFullscreen();
        }

        if (fsPromise) {
            fsPromise.then(() => {
                // Attempt to lock orientation once fullscreen succeeds
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(e => console.warn(e));
                }
            }).catch(e => console.warn("Fullscreen failed:", e));
        }
    };

    // Use 'click' and 'touchend' as they are valid user gestures for Fullscreen API
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchend', handleFirstInteraction);

    // Language selection
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            playSFX('choice-select'); // Add click sound
            
            // Remove active from all
            langBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            e.currentTarget.classList.add('active');

            const lang = e.currentTarget.dataset.lang;
            setLanguage(lang);
            startBtn.classList.remove('hidden');

            document.querySelector('#title-screen .title').textContent = lang === 'en' ? 'Dream of Earth' : 'धरती का सपना';
            startBtn.textContent = lang === 'en' ? 'Start Journey' : 'यात्रा शुरू करें';
        });
    });

    // Start button — stop menu music and begin the game
    startBtn.addEventListener('click', () => {
        playSFX('choice-select');
        stopMusic(); // Stop main-menu — it will NEVER play again
        
        titleScreen.style.opacity = '0';
        setTimeout(() => {
            titleScreen.classList.add('hidden');
            enterScene('prologue'); // prologue will start dream-entrance
        }, 1000);
    });
});
