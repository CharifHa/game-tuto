

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const REFRESH = 8; // delay before callback


const edgeHeight = 20; // To add a limit to pillars gap position (the gap cant stick to the edges of screen)
const pillarWidth = 40;
const gapHeight = 80; // vertical space separating a pillar pair
const horizontalGap = 200; // Gap between 2 pillars
const pillars = [
    generateNewPillar()
]

const birdImage = new Image();
birdImage.src = "assets/flappy-bird.avif";
const birdXPosition = 100;
const birdHeight = 40;
const birdWidth = 50;
const gravity = 0.07; // gravity
const jumpVelocity = -2.1
const HEIGHT_TOLERANCE = 7; // To compensate image borders
const WIDTH_TOLERANCE = 10; // To compensate image borders
const bird = { // Initial position
    y: 100,
    velocity: 0
}

let GAME_OVER = false;


window.onload = () => {
    drawPillars();
    gameLoop();
    canvas.addEventListener("mousedown", (e) => birdJump(e));
    addEventListener("keydown", (e) => spaceKeyhandler(e));
}

async function gameLoop(){
    clearCanvas();

    movePillars()
    drawPillars();

    moveBird();
    drawBird();
    detectBirdCollision();

    await new Promise(r => setTimeout(r, REFRESH));

    if (!GAME_OVER) requestAnimationFrame(gameLoop);
}


// ---------------------- Bird ----------------
function moveBird(){
    if (bird.velocity < 0 && bird.y <= - HEIGHT_TOLERANCE) { // Hit the top
        bird.velocity = 0;
        bird.y = 0 - HEIGHT_TOLERANCE;
    } else if (bird.y < canvasHeight - birdHeight + HEIGHT_TOLERANCE){ // gravity until bottom reached
        bird.velocity += gravity;
        bird.y += bird.velocity;
    }
}
function drawBird(){
    ctx.drawImage(birdImage, birdXPosition, bird.y, birdWidth, birdHeight);
}
function detectBirdCollision(){
    // detect colllision on tp right and bottom, left will be ignored as we are permanently moving to the right
    if (bird.y >= canvasHeight - birdHeight + HEIGHT_TOLERANCE) {
        GAME_OVER = true;
    }
    // find the next pillar pair on the way
    const nextPillar = pillars.find(pillar => pillar.x > birdXPosition)
    // Only do the check when close to next pillar
    const hasReachedPillar = birdXPosition + birdWidth - WIDTH_TOLERANCE >= nextPillar.x;
    if (hasReachedPillar){
        const hasHitTopPillar = bird.y < nextPillar.y - HEIGHT_TOLERANCE;
        const hashitBotPillar = bird.y + birdHeight - HEIGHT_TOLERANCE > nextPillar.y + gapHeight ;
        if (hasHitTopPillar || hashitBotPillar) {
            GAME_OVER = true;
        }
    }
}
function birdJump(){
    bird.velocity = jumpVelocity;
}
function spaceKeyhandler(e){
    if(e.key === " "){
        birdJump();
    }
}

// --------------------- Pillars -----------------------
function movePillars(){
    // Shifts pillars to the left
    pillars.forEach(pillar => {
        pillar.x--;
    })
    // Delete pillar pair out of the screen
    for(let i = pillars.length - 1; i >= 0; i--){
        if(pillars[i].x <= - pillarWidth ) {
            pillars.splice(i, 1);
        }
    }
    // Add new pillar pair when the pillar on the right exceeds a position
    if (pillars[pillars.length - 1].x <= canvasWidth - horizontalGap) {
        pillars.push(generateNewPillar())
    }
}
function drawPillars(){
    // Draws the pillar pairs (top, bottom)
    pillars.forEach(p => {
        drawRect(p.x, 0, pillarWidth,  p.y); // Top pillar
        drawRect(p.x, p.y + gapHeight, pillarWidth, canvas.height - gapHeight - p.y)
    })
}
function generateNewPillar(){
    return { // This designates the bottom left point of the top pillar
        x: canvasWidth,
        y: getRandomInt(edgeHeight, canvasHeight - gapHeight - edgeHeight)
    }
}


// --------------------- tools -----------------------
function drawRect(x, y, w, h, color = "green"){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}