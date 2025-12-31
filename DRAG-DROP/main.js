
canvasWidth = 600;
canvasHeight = 400;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

colorsList = ["black", "red", "yellow", "green", "blue", "pink"]

const recPositions = [
    {x: 0, y: 0, width: 40, height: 40, color: "black"},
    {x: 50, y: 50, width: 40, height: 40, color: "red"},
]

let currentMoveHandler = null;

window.onload = () => {
    drawAllRects();
    canvas.addEventListener("mousedown", (e) => mouseDownHandler(e));
}

function mouseDownHandler(event) {
    const mousePositionInCanvas = getMousePos(canvas, event);
    for (var i = 0; i < recPositions.length; i++) {
        const rec = recPositions[i];
        if (
            mousePositionInCanvas.x > rec.x &&
            mousePositionInCanvas.x < rec.x + rec.width &&
            mousePositionInCanvas.y > rec.y &&
            mousePositionInCanvas.y < rec.y + rec.height
        ) {
            const xOffset = mousePositionInCanvas.x - rec.x;
            const yOffset = mousePositionInCanvas.y - rec.y;
            currentMoveHandler = (e)=> mouseMoveHandler(e, rec,  xOffset, yOffset);
            canvas.addEventListener("mousemove", currentMoveHandler);
            canvas.addEventListener("mouseup", mouseUpHandler);
            break;
        }
    }
}

function mouseMoveHandler(event, rec, xOffset, yOffset) {
    console.log('mousemove');
    const {x, y} = getMousePos(canvas, event);
    rec.x = x - xOffset;
    rec.y = y - yOffset;
    clearCanvas();
    drawAllRects();
}

function mouseUpHandler(){
    canvas.removeEventListener("mousemove", currentMoveHandler);
    canvas.removeEventListener("mouseup", mouseUpHandler);
}

function drawAllRects(){
    recPositions.forEach(p => {
        drawRect(p.x, p.y, p.width, p.height, p.color);
    })
}

function addRectangle(){
    const color = colorsList[getRandomInt(colorsList.length)];
    const randomSize = getRandomInt(50);
    const randomX = getRandomInt(canvasWidth - randomSize);
    const randomY = getRandomInt(canvasHeight- randomSize);
    recPositions.push(
        {x: randomX, y: randomY, width: randomSize, height: randomSize, color: color}
    );
    drawAllRects();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function drawRect(x, y, w, h, color = "black"){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}


function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function clearCanvas    (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


