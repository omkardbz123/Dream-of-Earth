// Simple frame-cycling engine for sprites

export function createSprite(config) {
    return {
        element: config.element,
        sheetUrl: config.sheetUrl,
        frameCount: config.frameCount,
        frameWidth: config.frameWidth,
        frameHeight: config.frameHeight,
        fps: config.fps || 10,
        loop: config.loop !== undefined ? config.loop : true,
        currentFrame: 0,
        intervalId: null
    };
}

export function playAnimation(sprite) {
    if (sprite.intervalId) return;

    // Apply basic background styles
    sprite.element.style.backgroundImage = `url('${sprite.sheetUrl}')`;
    // We use CSS background-size carefully, the height usually matches the div, width is frameCount * div width
    // Instead of computing here, we rely on the CSS classes defining background-size when possible,
    // but we can set inline styles to override:
    // sprite.element.style.backgroundSize = `${sprite.frameWidth * sprite.frameCount}px ${sprite.frameHeight}px`;

    const msPerFrame = 1000 / sprite.fps;
    
    sprite.intervalId = setInterval(() => {
        sprite.currentFrame++;
        
        if (sprite.currentFrame >= sprite.frameCount) {
            if (sprite.loop) {
                sprite.currentFrame = 0;
            } else {
                stopAnimation(sprite);
                return;
            }
        }
        
        updateFramePosition(sprite);
    }, msPerFrame);
}

export function stopAnimation(sprite) {
    if (sprite.intervalId) {
        clearInterval(sprite.intervalId);
        sprite.intervalId = null;
    }
    sprite.currentFrame = 0;
    updateFramePosition(sprite);
}

export function switchSheet(sprite, newSheetUrl, newFrameCount) {
    stopAnimation(sprite);
    sprite.sheetUrl = newSheetUrl;
    sprite.frameCount = newFrameCount;
    sprite.element.style.backgroundImage = `url('${sprite.sheetUrl}')`;
    sprite.currentFrame = 0;
    updateFramePosition(sprite);
}

export function setFrame(sprite, frameIndex) {
    stopAnimation(sprite);
    if (frameIndex >= 0 && frameIndex < sprite.frameCount) {
        sprite.currentFrame = frameIndex;
    }
    updateFramePosition(sprite);
}

function updateFramePosition(sprite) {
    // If we are using CSS steps() animation, we don't need JS to shift frames.
    // However, if we're using JS, we shift background-position.
    // Since the instruction plan mentions using CSS animations (e.g. animation: maya-idle-cycle 1.5s steps(4) infinite)
    // we might just toggle CSS classes instead of doing manual intervals, but occasionally JS sprite control is asked.
    // The GDD mentions: "background-position: stepped via CSS steps() or JS frame cycling".
    // Since CSS steps is defined in style.css, we can just let CSS handle the looping for most cases.
    
    // We'll leave this function for manual frame changes if needed.
    // Negative offset because the sheet moves left as frames advance
    const offset = -(sprite.currentFrame * sprite.frameWidth);
    sprite.element.style.backgroundPosition = `${offset}px 0px`;
}
