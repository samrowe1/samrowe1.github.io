// The branch class
class Branch {
    constructor(startLocation, rotation, branchRotation, branchSize, generation) {
        // Branch features
        this.rotation = rotation;
        this.branchRotation = branchRotation;
        this.generation = generation;
        this.branchSize = branchSize;
        this.branchSizeOffset = branchSize + random(-0.2, 0.2) * branchSize * (width / 500);

        // Vectors for drawing
        this.startLocation = startLocation;
        this.drawLocation = createVector(startLocation.x, startLocation.y);
        this.endPoint = createVector(
            startLocation.x + cos(rotation) * this.branchSizeOffset,
            startLocation.y + sin(rotation) * this.branchSizeOffset
        );
        this.dir = p5.Vector.sub(this.endPoint, this.drawLocation);
        this.dir.normalize();
        this.dir.mult(3);

        this.finished = false;
        this.branches = [];
    }

    growAndDraw() {
        if (!this.finished) {
            this.drawLocation.add(this.dir);

            // Stop growth if the branch reaches the canvas edges
            if (
                this.endPoint.x < paintBorder ||
                this.endPoint.y < paintBorder ||
                this.endPoint.x > width - paintBorder ||
                this.endPoint.y > height - paintBorder
            ) {
                this.finished = true;
            }

            strokeCap(ROUND);
            strokeWeight(4 - this.generation * 0.01);

            let alphaValue = 255 - this.generation * 10; // Decrease alpha as generation increases
            if (alphaValue < 50) alphaValue = 50; // Minimum alpha to prevent full transparency

            if (this.generation % 2 === 0) {
                stroke(255, alphaValue); // Pure white with dynamic alpha
            } else {
                stroke(random(0, 100), random(150, 255), random(200, 255), alphaValue); // Teal/Turquoise with dynamic alpha
            }

            let offset = random(-1, 1) * this.generation;
            curve(
                this.startLocation.x + offset,
                this.startLocation.y + offset,
                this.startLocation.x,
                this.startLocation.y,
                this.drawLocation.x,
                this.drawLocation.y,
                this.drawLocation.x + offset,
                this.drawLocation.y + offset
            );

            // Stop growth for this branch and add new ones
            if (this.drawLocation.dist(this.endPoint) <= 2 && !this.finished) {
                this.finished = true;

                if (this.generation < maxGenerations) {
                    let randomDegreeOffset = random(
                        this.generation * -0.2,
                        this.generation * 12.2
                    );

                    this.branches.push(
                        new Branch(
                            this.endPoint,
                            this.rotation + this.branchRotation + randomDegreeOffset,
                            this.branchRotation,
                            this.branchSize * 0.7, // Reduce size for next branches
                            this.generation + 1
                        )
                    );
                    this.branches.push(
                        new Branch(
                            this.endPoint,
                            this.rotation - (this.branchRotation + randomDegreeOffset),
                            this.branchRotation,
                            this.branchSize * 0.7, // Reduce size for next branches
                            this.generation + 1
                        )
                    );
                }
            }
        } else if (this.generation < maxGenerations) {
            // Grow child branches
            for (let i = 0; i < this.branches.length; i++) {
                this.branches[i].growAndDraw();
            }
        }
    }
}
