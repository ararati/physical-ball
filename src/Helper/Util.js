class Util {
	static distance(x1, y1, x2, y2, radius) {
		let distXY = distanceXY(x1, y1, x2, y2, radius);
		
		return Math.sqrt(distXY.dx + distXY.dy)
	}

	static distanceXY(x1, y1, x2, y2, radius) {
		let distX = (x1+radius/2-x2)*(x1+radius/2-x2)
		let distY = (y1-y2)*(y1-y2)
		
		return {dx: distX, dy:distY};
	}

	static drawLines(ctx, lines) {	
	const count = arguments.length;

	for(let i = 1; i < count; i++) 
	{
		if(!(arguments[i] instanceof Line)) 
			throw "Wrong type of line";

		arguments[i].draw(ctx);
	}
}
}