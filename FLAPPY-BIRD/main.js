

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const edgeHeight = 20; // To add a limit to pillars gap position (the gap cant stick to the edges of screen)

const pillarWidth = 40;
const gapHeight = 80;

const horizontalGap = 200;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;


const pillars = [
    generateNewPillar()
]

window.onload = () => {
    drawPillars();
    pillarsMovement();
    // canvas.addEventListener("mousedown", (e) => mouseDownHandler(e));
}

async function pillarsMovement(){
    clearCanvas();
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
    // Draws all pillars and refresh callback
    drawPillars();
    await new Promise(r => setTimeout(r, 1));
    requestAnimationFrame(pillarsMovement);
}

function drawPillars(){
    // Draws the pillar pairs (top, bottom)
    pillars.forEach(p => {
        drawRect(p.x, 0, pillarWidth,  p.gapTop); // Top pillar
        drawRect(p.x, p.gapTop + gapHeight, pillarWidth, canvas.height - gapHeight - p.gapTop)
    })
}

function generateNewPillar(){
    return {
        x: canvasWidth,
        gapTop: getRandomInt(edgeHeight, canvasHeight - gapHeight - edgeHeight)
    }
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

function drawRect(x, y, w, h, color = "green"){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
