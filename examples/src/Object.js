class Object {
	x = 0.0;
	y = 0.0;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	getPos() { 
		return {x:x, y:y} 
	}

	setPos(ix, iy) {
		x = ix;
		y = iy;
	}
}