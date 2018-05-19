class Vehicle {
	constructor(x, y) {
		this.acceleration = createVector(0, 0);
		this.velocity = createVector(0, -2);
		this.position = createVector(x, y);
		this.r = 6;
		this.maxspeed = 4;
		this.maxforce = 0.1;
	}

	update() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxspeed);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	applyForce(force) {
		this.acceleration.add(force);
	}

	// seek(target) {
	// 	let desired = p5.Vector.sub(target, this.position);

	// 	desired.setMag(this.maxspeed);

	// 	let steer = p5.Vector.sub(desired, this.velocity);
	// 	steer.limit(this.maxforce);
	// 	this.applyForce(steer);
	// }

	arrive(target) {
		var desired = p5.Vector.sub(target, this.position);
		var d = desired.mag();
		if (d < 100) {
			var m = map(d, 0, 100, 0, this.maxspeed);
			desired.setMag(m);
		} else {
			desired.setMag(this.maxspeed)
		}

		var steer = p5.Vector.sub(desired, this.velocity);
		steer.limit(this.maxforce);
		this.applyForce(steer);
	}

	display() {
		let theta = this.velocity.heading() + PI / 2;
		fill(127);
		stroke(200);
		strokeWeight(1);
		push();
		translate(this.position.x, this.position.y);
		rotate(theta);
		beginShape();
		vertex(0, -this.r * 2);
		vertex(-this.r, this.r * 2);
		vertex(this.r, this.r * 2);
		endShape(CLOSE);
		pop();
	}


}
