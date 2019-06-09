const canvas = document.querySelector("#scene");
const ctx    = canvas.getContext("2d");
let gravity  = 0.1;
let impactForce = 1;

let ball;
let leftSide;
let righttSide;
let toptSide;
let bottomtSide;

function preload() {
	initPaint();

	ball = new Ball(200, 470, 20);

	leftSide   = new Line(140, 100, 0, 500, 290);
	rightSide  = new Line(660, 100, canvas.width, 500, 240);
	topSide    = new Line(140, 100, 660, 100, 0);
	bottomSide = new Line(0, 500, canvas.width, 500, 0);
}

function initPaint() {
	ctx.lineCap     = "round";
	ctx.strokeStyle = "White";
	ctx.lineWidth   = 5;
	ctx.fillStyle   = "White";
}

function gameLoop() {
	ball.update();

	ball.collideLine(leftSide);
	ball.collideLine(rightSide);
	ball.collideLine(topSide);
	ball.collideLine(bottomSide);
}

function drawLoop() {
	ctx.beginPath();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball.draw(ctx);
	ctx.fill();

    ctx.beginPath();
    Util.drawLines(ctx, leftSide, rightSide, topSide, bottomSide);
    ctx.stroke();
}

canvas.addEventListener("click", function(event) {
	let distance = Util.distanceXY(event.layerX, event.layerY, ball.x, ball.y, ball.radius);

	if(Math.sqrt(distance.dx + distance.dy) <= ball.radius * 2) 
	{
		/*
		 * Impact force on y and x
		 */
		let dx = (Math.sqrt(distance.dx) / 2) / (ball.radius - impactForce);
		let dy = (Math.sqrt(distance.dy) / 2) / (ball.radius - impactForce);

		if(event.layerX-ball.radius/2 < ball.x) 
		{
			dx *= -1;
		}

		ball.xmov = dx;
		ball.ymov = dy;
	}
});

function gravityChange(newVal) {
	gravity = parseFloat(newVal);
}

function decayChange(newVal) {
	ball.decay = parseFloat(newVal);
}

function powerChange(newVal) {
	impactForce = parseFloat(newVal);
	document.getElementById("impactForce").innerText = "Impact force("+impactForce+")";
}

function ballSizeChange(newVal) {
	ball.radius = parseFloat(newVal);
}

preload();

setInterval(() => {
	gameLoop();
	drawLoop();
}, 15);