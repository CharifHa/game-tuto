


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


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
    console.log('removed move and up listeners');
}

function drawAllRects(){
    recPositions.forEach(p => {
        drawRect(p.x, p.y, p.width, p.height, p.color);
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function drawRect(x, y, w, h, color = "black"){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}


// Mouse position
// canvas.addEventListener("mousemove", (event) => {
//     console.log(getMousePos(canvas, event));
// })
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


