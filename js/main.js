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
        if (firstInteractionDone) return;
        playMusic('dream-entrance', true);
        
        // Request Fullscreen on the very first tap
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(e => console.warn(e));
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen().catch(e => console.warn(e));
        }

        // Attempt to lock orientation
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(e => console.warn(e));
        }
        
        firstInteractionDone = true;
    };
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction, {once: true});

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
