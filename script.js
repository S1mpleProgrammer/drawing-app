const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const colorInput = document.querySelector('#color');
const clearBtn = document.querySelector('#clear');
const decrease = document.querySelector('#decrease');
const increase = document.querySelector('#increase');
const sizeEl = document.querySelector('#size');
const eraserEl = document.querySelector('#erase');
const eraserImg = document.querySelector("#eraser-icon");
const status = document.querySelector('#status-span');

let isPressed = false;
let isEraser = false;
let size = 5;
let color = 'black';
let x;
let y;

eraserEl.addEventListener('click', () => {
    if (!isEraser) {
        isEraser = true;
        canvas.style.cursor = "url('eraser-cursor.png'), default";
        eraserImg.src = "eraser-icon-selected.png";
        eraserEl.style.backgroundColor = 'black';
        status.innerHTML = 'Eraser selected.';
    } else {
        isEraser = false;
        canvas.style.cursor = 'default';
        eraserImg.src = "eraser-icon-not-selected.png";
        eraserEl.style.backgroundColor = 'white';
        status.innerHTML = 'Brush selected.';
    }
});

decrease.addEventListener('click', () => {
    if (size !== 5) {
        size -= 5;
        sizeEl.innerHTML = size;
    }
});

increase.addEventListener('click', () => {
    if (size !== 25) {
        size += 5;
        sizeEl.innerHTML = size;
    }
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorInput.addEventListener('input', (e) => {
    color = `${e.target.value}`;
});

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x =  e.offsetX;
    y =  e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;

    x =  undefined;
    y =  undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    if (!isEraser) {
        ctx.fillStyle = color;
    } else {
        ctx.fillStyle = '#f5f5f5';
    }
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    if (!isEraser) {
        ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = '#f5f5f5';
    }
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

sizeEl.innerHTML = size;