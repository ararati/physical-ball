class Ball extends Object
{
	xmov = 0;
	ymov = 0;

	radius = 10;
	decay  = 0.8;

	collision = {
		x: 0,
		y: 0,
		angle: 0.0,
	}

	constructor(x, y, radius) {
		super(x, y);
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	/*
	 *	Get the angle of contact and simulate a rebound
	 */
	bounce(angle) {
		let alpha = angle * Math.PI / 180;
		let cosAlpha = Math.cos(alpha);
		let sinAlpha = Math.sin(alpha);
		let xmov = this.xmov;
		let ymov = this.ymov;
		let ymovF = ymov * cosAlpha - xmov * sinAlpha;
		let xmovF = xmov * cosAlpha + ymov * sinAlpha;

		let negMovY = -ymovF*this.decay;
		let decayX = xmovF;
		let newMovY = negMovY * cosAlpha + decayX * sinAlpha;
		let newMovX = decayX * cosAlpha - negMovY * sinAlpha;

		this.xmov = newMovX;
		this.ymov = newMovY;
	}

	/*
	 * Update obj in game loop
	 */
	update() {
		ball.checkCanvasBounds();

		this.ymov += gravity;

		this.y += this.ymov;
		this.x += this.xmov;
	}

	/*
	 * Draw obj in draw loop
	 */
	draw(ctx) {
		ctx.arc(this.x, this.y, this.radius*2, 0, 2 * Math.PI);

		return this;
	}

	collideLine(line) {
			// console.log(line instanceof Line);
		if(!(line instanceof Line)) 
			throw "Wrong type of line";

		const x1 = line.topX;
		const y1 = line.topY;
		const x2 = line.bottomX;
		const y2 = line.bottomY;
		const cx = this.x;
		const cy = this.y;

		//line length
		let distX = x1 - x2;
		let distY = y1 - y2;
		let lineLenght = Math.sqrt( (distX*distX) + (distY*distY) );

		//product of vectors
		let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(lineLenght,2);

		//coords of nearst point to the line
		let closestX = x1 + (dot * (x2-x1));
		let closestY = y1 + (dot * (y2-y1));

		distX = closestX - cx;
	    distY = closestY - cy;

	    //distance from the nearest point to the line
	    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

	    if (distance <= this.radius*2) {
	    	this.bounce(line.angle);
	    	this.saveCollisionData(closestX, closestY, line.angle);
	    }
	}

	saveCollisionData(x, y, angle) {
		this.collision.x = x;
		this.collision.y = y;
		this.collision.angle = angle;

		return this;
	}

	checkCanvasBounds() {
		if(	Math.abs(this.ymov) < 0.2 && 
			this.collision.angle == 0 && 
			this.collision.y > bottomSide.bottomY
			) 
		{
			this.ymov = 0;
		}

		if(this.y+this.radius*2 > bottomSide.topY) 
		{
			this.y = bottomSide.topY-this.radius*2;
		} 
		else if(this.y-this.radius*2 < topSide.topY) 
		{
			this.y = topSide.topY+this.radius*2;
		}

		if(this.x-this.radius*2-ball.radius/2 < leftSide.bottomX) 
		{
			this.x = leftSide.bottomX+this.radius*2+ball.radius/2;
		}
		else if(this.x+this.radius*2+ball.radius/2 > rightSide.bottomX) 
		{
			this.x = rightSide.bottomX-this.radius*2-ball.radius/2;
		}
	}
}