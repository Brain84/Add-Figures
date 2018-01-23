const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

cvs.width = 800;
cvs.height = 600;

const cw = cvs.width;
const ch = cvs.height;

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, cw, ch);

//Random function
function rand(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min)
};

//Objects of figures
function Circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
};

function Square(x, y, dx, dy, size, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.size = size;
	this.color = color;
};

function Triangle(x, y, size, lineToX, lineToY, color) {
	this.x = x;
	this.y = y;
  this.size = size;
	this.lineToX = lineToX;
	this.lineToY = lineToY;
	this.color = color;
};

let circles = [];
let squares = [];
let triangles = [];

//Add new circle
function addRandomCircle() {
  let radius = rand(10, 60);
  let x = rand(radius, cw - radius);
  let y = rand(radius, ch - radius);
  let colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
  let color = colors[rand(0, 8)];
  let circle = new Circle(x, y, radius, color);

  circles.push(circle);
  drawCircles();
};

function drawCircles() {
  ctx.globalAlpha = 0.85;
  for(let i=0; i<circles.length; i++) {
    let circle = circles[i];

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
    ctx.fillStyle = circle.color;
    ctx.fill();
  }
};

const addCircle = document.querySelector(".circleBtn");

addCircle.addEventListener("click", function() {
	if (moveSquareBtn.innerHTML == "Stop Square" || moveCircleBtn.innerHTML == "Stop Circle" || moveTriangleBtn.innerHTML == "Stop Triangle") {
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);
    moveSquareBtn.innerHTML = "Moving Square";
    cancelAnimationFrame(requestSquare);
    moveCircleBtn.innerHTML = "Moving Circle";
    cancelAnimationFrame(requestCircle);
    moveTriangleBtn.innerHTML = "Moving Triangle";
    cancelAnimationFrame(requestTriangle);
  }	
  addRandomCircle();
});

//Add new square
function addRandomSquare() {
  let size = rand(10, 100);
  let x = rand(size, cw - size);
  let y = rand(size, ch - size);
  let dx = 1;
  let dy = 1;
  let colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
  let color = colors[rand(0, 8)];
  let square = new Square(x, y, dx, dy, size, color);

  squares.push(square);
  drawSquare();
};


function drawSquare() {
  requestAnimationFrame(drawSquare);
  ctx.globalAlpha = 0.85;
  for(let i=0; i<squares.length; i++) {
    let square = squares[i];

    if (square.y <= 0 || square.y + square.size >= ch) {
      square.dy = -square.dy;
    }
    if (square.x + square.size >= cw || square.x <= 0) {
      square.dx = -square.dx;
    }

    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
  }
};

const addSquare = document.querySelector(".squareBtn");

addSquare.addEventListener("click", function() {
  if (moveSquareBtn.innerHTML == "Stop Square" || moveCircleBtn.innerHTML == "Stop Circle" || moveTriangleBtn.innerHTML == "Stop Triangle") {
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);
    moveSquareBtn.innerHTML = "Moving Square";
    cancelAnimationFrame(requestSquare);
    moveCircleBtn.innerHTML = "Moving Circle";
    cancelAnimationFrame(requestCircle);
    moveTriangleBtn.innerHTML = "Moving Triangle";
    cancelAnimationFrame(requestTriangle);
  }
  addRandomSquare();
});

//Add new triangle
function addRandomTriangle() {
  let size = rand(10, 50);
  let x = rand(size, cw - size);
  let y = rand(size, ch - size);
  let lineToX = x+size;
  let lineToY = y+size;
  let colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
  let color = colors[rand(0, 8)];
  let triangle = new Triangle(x, y, size, lineToX, lineToY, color);

  triangles.push(triangle);
  drawTriangle();
};

function drawTriangle() {
  ctx.globalAlpha = 0.85;
  for (let i=0; i<triangles.length; i++) {
    let triangle = triangles[i];

    ctx.beginPath();
    ctx.moveTo(triangle.x, triangle.y);
    ctx.lineTo(triangle.x+(triangle.size),triangle.y+(triangle.size*2));
    ctx.lineTo(triangle.x-(triangle.size),triangle.y+(triangle.size*2));
    ctx.lineTo(triangle.x, triangle.y);
    ctx.fillStyle = triangle.color;
    ctx.fill();
  }
};

const addTriangle = document.querySelector(".triangleBtn");

addTriangle.addEventListener("click", function() {
  if (moveSquareBtn.innerHTML == "Stop Square" || moveCircleBtn.innerHTML == "Stop Circle" || moveTriangleBtn.innerHTML == "Stop Triangle") {
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);
    moveSquareBtn.innerHTML = "Moving Square";
    cancelAnimationFrame(requestSquare);
    moveCircleBtn.innerHTML = "Moving Circle";
    cancelAnimationFrame(requestCircle);
    moveTriangleBtn.innerHTML = "Moving Triangle";
    cancelAnimationFrame(requestTriangle);
  }
  addRandomTriangle();
});

//Clear canvas
function clearCtx() {
  if (moveSquareBtn.innerHTML == "Stop Square") {
    moveSquareBtn.innerHTML = "Moving Square";
    cancelAnimationFrame(requestSquare);
  }
  if (moveCircleBtn.innerHTML == "Stop Circle") {
    moveCircleBtn.innerHTML = "Moving Circle";
    cancelAnimationFrame(requestCircle);
  }
  if (moveTriangleBtn.innerHTML == "Stop Triangle") {
    moveTriangleBtn.innerHTML = "Moving Triangle";
    cancelAnimationFrame(requestTriangle);
  }
  ctx.clearRect(0, 0, cw, ch);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cw, ch);
  clearArrays();
};

const clearFigures = document.querySelector(".clearBtn");

clearFigures.addEventListener("click", clearCtx);

//Clear arrays
function clearArrayCircles() {
  circles.length = [];
};
function clearArraySquares() {
  squares.length = [];
};
function clearArrayTriangles() {
  triangles.length = [];
};

function clearArrays() {
  clearArrayCircles();
  clearArraySquares();
  clearArrayTriangles();
};

//Moving square
const squareSize = 80;

let squareX = cw / 2 - squareSize / 2;
let squareY = ch / 2 - squareSize / 2;
let squareSpeedX = -4;
let squareSpeedY = 4;

let requestSquare;

function movingSquare() {
  requestSquare = requestAnimationFrame(movingSquare);
  ctx.clearRect(0, 0, cw, ch);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cw, ch);

  squareX += squareSpeedX;
  squareY += squareSpeedY;

  ctx.fillStyle = "#fff";
  ctx.fillRect(squareX, squareY, squareSize, squareSize);

  if (squareX <= 0 || squareX + squareSize >= cw) {
    squareSpeedX = -squareSpeedX;
  }
  if (squareY <= 0 || squareY + squareSize >= ch) {
    squareSpeedY = -squareSpeedY;
  }
};

//Moving/stop square button
const moveSquareBtn = document.querySelector(".moveSquareBtn");

moveSquareBtn.addEventListener("click", function() {
  if (moveSquareBtn.innerHTML == "Moving Square") {
    moveSquareBtn.innerHTML = "Stop Square";

    moveCircleBtn.innerHTML = "Moving Circle";
    cancelAnimationFrame(requestCircle);

    moveTriangleBtn.innerHTML = "Moving Triangle";
    cancelAnimationFrame(requestTriangle);
		
    clearArrays();
    movingSquare();
  }
  else {
    moveSquareBtn.innerHTML = "Moving Square";
    cancelAnimationFrame(requestSquare);
  }
});

//Moving circle
const circleRadius = 40;

let circleX = cw / 2 - circleRadius;
let circleY = ch / 2 - circleRadius;
let circleSpeedX = -4;
let circleSpeedY = 4;

let requestCircle;

function movingCircle() {
  requestCircle = requestAnimationFrame(movingCircle);
  ctx.clearRect(0, 0, cw, ch);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cw, ch);

  circleX += circleSpeedX;
  circleY += circleSpeedY;

  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI*2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  if (circleX - circleRadius<= 0 || circleX + circleRadius >= cw) {
    circleSpeedX = -circleSpeedX;
  }
  if (circleY - circleRadius<= 0 || circleY + circleRadius >= ch) {
    circleSpeedY = -circleSpeedY;
  }
};

//Moving/stop circle button
const moveCircleBtn = document.querySelector(".moveCircleBtn");

moveCircleBtn.addEventListener("click", function() {
  if (moveCircleBtn.innerHTML == "Moving Circle") {
    moveCircleBtn.innerHTML = "Stop Circle";

    moveSquareBtn.innerHTML = "Moving Square";
    cancelAnimationFrame(requestSquare);

    moveTriangleBtn.innerHTML = "Moving Triangle";
    cancelAnimationFrame(requestTriangle);

    clearArrays();
    movingCircle();
  }
  else {
    moveCircleBtn.innerHTML = "Moving Circle";
    cancelAnimationFrame(requestCircle);
  }
});

//Moving triangle
const triangleSize = 60;

let triangleX = cw / 2 - triangleSize / 2;
let triangleY = ch / 2 - triangleSize / 2;
let triangleSpeedX = -4;
let triangleSpeedY = 4;

let requestTriangle;

function movingTriangle() {
  requestTriangle = requestAnimationFrame(movingTriangle);
  ctx.clearRect(0, 0, cw, ch);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cw, ch);

  triangleX += triangleSpeedX;
  triangleY += triangleSpeedY;

  ctx.beginPath();
  ctx.moveTo(triangleX, triangleY);
  ctx.lineTo(triangleX+triangleSize,triangleY+(triangleSize*2));
  ctx.lineTo(triangleX-triangleSize,triangleY+(triangleSize*2));
  ctx.lineTo(triangleX, triangleY);
  ctx.fillStyle = "#fff";
  ctx.fill();

  if (triangleX - triangleSize <= 0 || triangleX + triangleSize >= cw) {
    triangleSpeedX = -triangleSpeedX;
  }
  if (triangleY <= 0 || triangleY + triangleSize*2 >= ch) {
    triangleSpeedY = -triangleSpeedY;
  }
};

//Moving/stop triangle button
const moveTriangleBtn = document.querySelector(".moveTriangleBtn");

moveTriangleBtn.addEventListener("click", function() {
  if (moveTriangleBtn.innerHTML == "Moving Triangle") {
    moveTriangleBtn.innerHTML = "Stop Triangle";

    moveSquareBtn.innerHTML = "Moving Square";
    cancelAnimationFrame(requestSquare);

    moveCircleBtn.innerHTML = "Moving Circle";
    cancelAnimationFrame(requestCircle);

    clearArrays();
    movingTriangle();
  }
  else {
    moveTriangleBtn.innerHTML = "Moving Triangle";
    cancelAnimationFrame(requestTriangle);
  }
});