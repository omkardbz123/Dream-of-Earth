import { getState, setState } from './state.js';
import { playSFX, stopSFX } from './audio.js';

let exploreConfig = null;
let onInteractCallback = null;
let movementInterval = null;

// Video source paths
const MAYA_IDLE_VIDEO = 'assets/sprites/maya_idle.webm';
const MAYA_WALK_VIDEO = 'assets/sprites/maya_walk.webm';
let currentMayaVideo = MAYA_IDLE_VIDEO;

// DOM Elements
let mayaElement;   // <video> element
let exploreAnimalsContainer;
let controlsLayer;
let btnLeft;
let btnRight;

export function initPlayer(mayaEl, animalsContainerEl, controlsLyr, leftBtn, rightBtn, interactionCallback) {
    mayaElement = mayaEl;
    exploreAnimalsContainer = animalsContainerEl;
    controlsLayer = controlsLyr;
    btnLeft = leftBtn;
    btnRight = rightBtn;
    onInteractCallback = interactionCallback;

    setupKeyboard();
    setupTouch();
}

export function startExplorePhase(config) {
    exploreConfig = config;
    setState({ phase: 'explore', mayaX: 5, isMoving: false });
    
    // Position Maya at start
    updateMayaPosition();
    switchMayaVideo(MAYA_IDLE_VIDEO);
    
    // Position Animals
    exploreAnimalsContainer.innerHTML = '';
    if (exploreConfig.animals) {
        exploreConfig.animals.forEach(anim => {
            const el = document.createElement('div');
            el.className = `animal-sprite ${anim.sprite}`;
            el.style.backgroundImage = `url('assets/characters/${anim.sprite}.webp')`;
            el.style.left = `${anim.x}%`;
            if (anim.bottom) el.style.bottom = anim.bottom;
            if (anim.scale) el.style.transform = `scale(${anim.scale})`;
            if (anim.zIndex) el.style.zIndex = anim.zIndex;
            exploreAnimalsContainer.appendChild(el);
        });
    }

    // Show mobile controls
    controlsLayer.classList.remove('hidden');
}

export function disableControls() {
    stopMovement();
    controlsLayer.classList.add('hidden');
    setState({ phase: 'dialogue' });
}

export function enableControls() {
    controlsLayer.classList.remove('hidden');
    setState({ phase: 'explore' });
}

function setupKeyboard() {
    window.addEventListener('keydown', (e) => {
        if (getState().phase !== 'explore') return;
        if (e.repeat) return; // Prevent multiple intervals

        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            handleMovement('right');
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            handleMovement('left');
        }
    });

    window.addEventListener('keyup', (e) => {
        if (getState().phase !== 'explore') return;
        
        if (['ArrowRight', 'd', 'D', 'ArrowLeft', 'a', 'A'].includes(e.key)) {
            stopMovement();
        }
    });
}

function setupTouch() {
    btnRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (getState().phase === 'explore') handleMovement('right');
    }, { passive: false });

    btnRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopMovement();
    }, { passive: false });

    btnLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (getState().phase === 'explore') handleMovement('left');
    }, { passive: false });

    btnLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopMovement();
    }, { passive: false });
}

function handleMovement(direction) {
    if (getState().isMoving) return;
    
    setState({ isMoving: true });
    
    // Switch to walk video
    switchMayaVideo(MAYA_WALK_VIDEO);
    playSFX('footstep', true); // Loop footstep
    
    // Face direction
    if (direction === 'left') {
        mayaElement.style.transform = 'scaleX(-1)';
    } else {
        mayaElement.style.transform = 'scaleX(1)';
    }

    movementInterval = setInterval(() => {
        let currentX = getState().mayaX;
        let speed = 0.5; // percent per tick

        if (direction === 'right') {
            currentX += speed;
        } else {
            currentX -= speed;
        }

        // Boundaries
        if (currentX < 0) currentX = 0;
        
        setState({ mayaX: currentX });
        updateMayaPosition();

        checkInteraction();
    }, 50); // 20 frames per second for smooth move
}

function stopMovement() {
    setState({ isMoving: false });
    if (movementInterval) {
        clearInterval(movementInterval);
        movementInterval = null;
    }
    
    // Switch back to idle video
    switchMayaVideo(MAYA_IDLE_VIDEO);
    stopSFX('footstep');
}

function checkInteraction() {
    const currentX = getState().mayaX;
    // Trigger zone logic
    if (currentX >= exploreConfig.triggerX) {
        stopMovement();
        disableControls(); // Immediately snap to dialogue
        if (onInteractCallback) {
            onInteractCallback();
        }
    }
}

function updateMayaPosition() {
    mayaElement.style.left = `${getState().mayaX}%`;
}

/**
 * Switches the Maya video source smoothly.
 * Only reloads if the source actually changed.
 */
function switchMayaVideo(videoSrc) {
    if (currentMayaVideo === videoSrc && !mayaElement.paused) return;
    
    currentMayaVideo = videoSrc;
    mayaElement.src = videoSrc;
    mayaElement.load();
    mayaElement.play().catch(() => {
        // Autoplay may be blocked on first interaction — silently ignore
    });
}
