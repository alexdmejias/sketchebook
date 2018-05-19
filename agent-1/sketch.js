let v;
let vehicles = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	// v = new Vehicle(width / 2, height / 2);
	// vehicles = [];
	for (let index = 0; index < 10; index++) {
		vehicles[index] = new Vehicle(width / index + 1, height / index + 1);
	}
}

function draw() {
	background(51);
	let mouse = createVector(mouseX, mouseY);
	fill(127);
	stroke(200);
	strokeWeight(2);
	ellipse(mouse.x, mouse.y, 48, 48);


	for (let index = 0; index < vehicles.length; index++) {
		vehicles[index].arrive(mouse);
		vehicles[index].update();
		vehicles[index].display();

	}
}
