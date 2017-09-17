// Start to set up all
$(document).ready(startGame);

// Initialize components
var myGamePiece;

function startGame() {
	myGameArea.start();
	myGamePiece = new component(30, 30, 'red', 10, 120);
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
		// Move by screentouch
		window.addEventListener('touchmove', function (e) {
			myGameArea.x = e.touches[0].screenX;
			myGameArea.y = e.touches[0].screenY;
		})
		// Move by keys
		window.addEventListener('keydown', function (e) {
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.keys[e.keyCode] = false;
		})
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
	// Move by touchscreen
	if (myGameArea.touchX && myGameArea.touchY) {
		myGamePiece.x = myGameArea.x;
		myGamePiece.y = myGameArea.y;
	}

	// Move by keys
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	if (myGameArea.keys && myGameArea.keys[37]) {
		moveLeft();
	}
	if (myGameArea.keys && myGameArea.keys[39]) {
		moveRight();
	}
	if (myGameArea.keys && myGameArea.keys[38]) {
		moveUp();
	}
	if (myGameArea.keys && myGameArea.keys[40]) {
		moveDown();
	}

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

function stopMove() {
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
}
