class Line {
	topX = 0.0
	topY = 0.0
	bottomX = 0.0
	bottomY = 0.0

	constructor(topX, topY, bottomX, bottomY, angle) {
		this.topX 	 = topX;
		this.topY 	 = topY;
		this.bottomX = bottomX;
		this.bottomY = bottomY;
		this.angle   = angle;
	}

	draw(ctx) {
			ctx.setLineDash([24, 15])
		ctx.moveTo(this.topX, this.topY);
		ctx.lineTo(this.bottomX, this.bottomY);
	}
}