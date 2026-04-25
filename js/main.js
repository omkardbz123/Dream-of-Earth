import { initEngine, enterScene } from './engine.js';
import { setLanguage } from './state.js';
import { playMusic, playSFX } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    initEngine();
    playMusic('dream-entrance', true);

    const titleScreen = document.getElementById('title-screen');
    const startBtn = document.getElementById('start-btn');
    const langBtns = document.querySelectorAll('.btn-lang');
    
    // Safety: ensure menu music and fullscreen starts on first interaction
    let firstInteractionDone = false;
    const handleFirstInteraction = () => {
        // Play music on first interaction regardless
        playMusic('dream-entrance', true);
        
        // If already fullscreen, we don't need to request it again
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            firstInteractionDone = true;
            return;
        }

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
                firstInteractionDone = true;
            }).catch(e => console.warn("Fullscreen failed:", e));
        }
    };

    // Use 'click' and 'touchend' as they are valid user gestures for Fullscreen API
    // 'touchstart' is often rejected by modern mobile browsers for fullscreen.
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

    // Start button
    startBtn.addEventListener('click', () => {
        playSFX('choice-select'); // Add click sound
        
        titleScreen.style.opacity = '0';
        setTimeout(() => {
            titleScreen.classList.add('hidden');
            enterScene('prologue');
        }, 1000);
    });
});
