//The pattern class
class Pattern {

	constructor(startLocation, patternRotation, branchRotation, branchSize, branchColor, generation) {

		//Branch informations	
		this.patternRotation = patternRotation;
		this.branchRotation = branchRotation;
		this.generation = generation;
		this.branchSize = branchSize;
		this.branchSizeOffset = generation < 12 ? branchSize : branchSize - (-0.2 * generation);
		this.finished = false;
		this.branches = new Array();

		//Color
		let noiseVaule = (noise(startLocation.x * 0.01, startLocation.y * 0.01) - 0.3) * generation;
		let randomValue = random(-1, 1) * generation * 0.3;
		this.branchColor =
			color(white(branchColor) + randomValue,
				white(branchColor) + randomValue,
				blue(branchColor) + randomValue * 0.5,
				alpha(branchColor) - generation * 0.1);

		//Vectors for drawing
		this.startLocation = startLocation;
		this.drawLocation = createVector(startLocation.x, startLocation.y);
		this.endPoint = createVector(startLocation.x + cos(patternRotation) * this.branchSizeOffset, startLocation.y + sin(patternRotation) * this.branchSizeOffset);

		this.dir = p5.Vector.sub(this.endPoint, this.drawLocation);
		this.dir.normalize();
		this.dir.mult(3);
	}

	growAndDraw() {
		if (!this.finished) {
			this.drawLocation.add(this.dir);

			//Check if there is already something drawn or out of space
			if (this.generation > 5 &&
				(this.endPoint.x < paintBorder || this.endPoint.y < paintBorder ||
					this.endPoint.x > width - paintBorder || this.endPoint.y > height - paintBorder ||
					get(this.drawLocation.x, this.drawLocation.y)[0] <= density ||
					get(this.drawLocation.x, this.drawLocation.y)[1] <= density ||
					get(this.drawLocation.x, this.drawLocation.y)[2] <= density)) {
				this.finished = true;
			}

			strokeWeight(4 - this.generation * 0.05);

			let offset = random(-1.5, 1.5) * (this.generation * 0.9);

			stroke(red(this.branchColor) + offset, green(this.branchColor) + offset, blue(this.branchColor) + offset, alpha(this.branchColor) - offset);

			curve(this.startLocation.x + offset, this.startLocation.y + offset,
				this.startLocation.x, this.startLocation.y, this.drawLocation.x, this.drawLocation.y,
				this.drawLocation.x + offset, this.drawLocation.y + offset);

			if (this.drawLocation.dist(this.endPoint) <= 3 && !this.finished) {
				this.finished = true;

				let randomDegreeOffset = exp(random(this.generation, this.generation) * 0.01);

				this.branches.push(new Pattern(
					this.endPoint,
					this.patternRotation + this.branchRotation + randomDegreeOffset,
					this.branchRotation,
					this.branchSize,
					this.branchColor,
					this.generation + 1));

				this.branches.push(new Pattern(
					this.endPoint,
					this.patternRotation - this.branchRotation,
					this.branchRotation,
					this.branchSize,
					this.branchColor,
					this.generation + 1));
			}
		} else if (this.generation < maxGenerations) {
			for (var i = 0; i < this.branches.length; i++) {
				this.branches[i].growAndDraw();
			}
		}
	};
};