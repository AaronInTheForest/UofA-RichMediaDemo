const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const colourPalette = ['#007C41', '#246630', '#98EAA7', '#51E66C', '#426649', '#3EB354']
const backgroundColour = '#FFDB05';
let isDrawing = false;
let x = 0, y = 0;

init();

function draw() {
    isDrawing = true;
}

function stopDraw() {
    isDrawing = false;
}

function init() {
    canvas.height = window.innerHeight * 0.6;
    canvas.width = window.innerWidth * 0.8;

    //draw background
    context.moveTo(0, 0);
    context.beginPath();
    context.fillStyle = backgroundColour;
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill()
}

function drawCircle() {
    if (isDrawing) {
        let radius = Math.floor(Math.random() * 10);
        context.lineWidth = Math.floor(Math.random() * 5);
        context.strokeStyle = colourPalette[Math.floor(Math.random() * colourPalette.length)];
        context.fillStyle = colourPalette[Math.floor(Math.random() * colourPalette.length)];

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;
}

document.addEventListener("mousedown", draw);
document.addEventListener("mouseup", stopDraw);
canvas.addEventListener('mousemove', e => {
    getMousePos(canvas, e);
    drawCircle();
});

// this is not responsive - it is only adaptive
window.addEventListener('resize', init);

// for further reading on how to animate shapes in canvas
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations