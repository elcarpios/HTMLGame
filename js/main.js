// Start to set up all
$(document).ready(startGame);

// Initialize components
var myGamePiece;

function startGame() {
	myGameArea.start();
	myGamePiece = new component(30, 30, 'red', 10, 120);
	addEventArrows();
}

// Create the GameArea and Positioning in 1st child in body
var myGameArea = {
	canvas: document.createElement('canvas'),
	start: function () {
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		// Set 20 milenseconds interval to refresh the canvas 50fps
		this.interval = setInterval(updateGameArea, 20);
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.update = function () {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	this.newPos = function () {
		this.x += this.speedX;
		this.y += this.speedY;
	}
}

function updateGameArea() {
	myGameArea.clear();
	myGamePiece.newPos();
	myGamePiece.update();
}

function moveUp() {
	myGamePiece.speedY -= 1;
}

function moveDown() {
	myGamePiece.speedY += 1;
}

function moveLeft() {
	myGamePiece.speedX -= 1;
}

function moveRight() {
	myGamePiece.speedX += 1;
}

function addEventArrows() {
	$(document).keydown(function (e) {
			switch (e.which) {
				case 37: moveLeft(); // left
					break;

				case 38: moveUp(); // up
					break;

				case 39: moveRight(); // right
					break;

				case 40: moveDown(); // down
					break;

				default:
					return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		})
}
