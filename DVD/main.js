
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//Load Image
const dvdImage = new Image();
dvdImage.src = "DVD_logo.png";



let x = 0;
let y = 0;
let xDirection = 1;
let yDirection = 1;
const imgWidth = 120;
const imgHeight = 40;

// let velocity = 1

window.onload = () => {
    gameLoop();
}

// MAIN LOOP
async function gameLoop() {
    if (x <= 0) { xDirection = 1 }
    if (x >= canvas.width - imgWidth){ xDirection = -1; }
    x = x + xDirection;

    if (y <= 0) { yDirection = 1 }
    if (y >= canvas.height - imgHeight){ yDirection = -1; }
    y = y + yDirection;

    ctx.drawImage(dvdImage, x, y, 120, 40);
    await new Promise(r => setTimeout(r, 10));
    clearGame();
    requestAnimationFrame(gameLoop); // to rexecute after refresh

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function drawRect(x, y, w, h){
    ctx.fillStyle = "black";
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

function clearGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


