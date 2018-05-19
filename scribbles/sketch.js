let initPoints;
let vcenter;
let points;
const colors = ['grey', 'red', 'green', 'blue', 'orange', 'yellow', 'aliceblue'];
function setup() {
	createCanvas(windowWidth, windowHeight);
	drawCurvedLine()
}

function mousePressed() {
	drawCurvedLine()
  }

function drawCurvedLine() {
	clear()
	const initY = random(300, windowHeight - 300)

	initPoints = [
		[0, initY],
		...getRandomPoints(4),
		[windowWidth, initY]
	]
	points = getMultipleChaikins(initPoints, 5);
	push();
	const lastPass= points[points.length - 1]
	drawLine(lastPass, 50, 3)
}

function getRandomPoints(numOfPoints){
	const points = [];
	for (let index = 0; index < numOfPoints; index++) {
		points.push([random(100, windowWidth - 100), random(300, windowHeight - 300)])
	}
	return points;
}

function getMultipleChaikins (initPoints, passes = 5) {
	const totalPoints = [initPoints];
	const firstPoint = initPoints[0];
	const lastPoint = initPoints[initPoints.length - 1];

	for (let index = 0; index < passes; index++) {
		const newPass = [firstPoint];
		const currPoints = totalPoints[totalPoints.length - 1]

		for (let i = 0; i < currPoints.length - 1; i++) {
			let ps = chaikins(currPoints[i], currPoints[i + 1]);
			newPass.push(...ps)
		}

		newPass.push(lastPoint);
		totalPoints.push(newPass);
	}

	return totalPoints;

}

function chaikins(p0, p1) {
	const q = [(3/4 * p0[0]) + (1/4 * p1[0]), (3/4 * p0[1]) + (1/4 * p1[1])]
	const r = [(3/4 * p1[0]) + (1/4 * p0[0]), (3/4 * p1[1]) + (1/4 * p0[1])]

	return [q, r]
}

function drawLine (points = [], color = 'black', width = 1) {
	stroke(color)

	strokeWeight(width)
	for (let index = 0; index < points.length - 1; index++) {
		const point = points[index];
		const nextPoint = points[index + 1]
		line(...point, ...nextPoint)
	}
}
