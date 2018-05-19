const boxesHor = 3;
const boxesVer = 3;
const boxWidth = 50;
const boxHeight = 75;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100)

	const layout = new Layout({x: 100, y: 100, boxesHor, boxesVer})
	layout.createBoxes(true)
}

function draw() {

}

class Box {
	constructor(params) {
		this.height = params.height
		this.width = params.width
		this.x = params.x
		this.y = params.y
		this.borders = [true, true, true, true];
	}

	draw() {
		push();
		noStroke();
		translate(this.x, this.y)
		rect(0, 0, boxWidth, boxHeight)
		pop();
	}

	drawBorders(w) {
		push()
		translate(this.x, this.y)
		this.borders.forEach((curr, index) => {
			const isHorizontal = index % 2 === 0
			// ^----->
			// |     |
			// |     |
			// <-----v
			if (isHorizontal) {
				if (index === 0) {
					stroke('red')
					line(0, 0, this.width, 0)
				} else {
					stroke('blue')
					line(this.width, this.height, 0, this.height)
				}
			} else {
				if (index === 1) {
					stroke('green')
					line(this.width, 0, this.width, this.height)
				} else {
					stroke('teal')
					line(0, this.height, 0, 0)
				}
			}
		})
		pop();
	}
}

class Layout {
	constructor(params) {
		this.boxesHor = params.boxesHor
		this.boxesVer = params.boxesVer
		this.x = params.x
		this.y = params.y;

		this.boxes = [];
	}

	createBoxes(draw = true) {
		const boxes = [];

		for (let i = 0; i < boxesHor; i++) {
			const row = []
			for (let h = 0; h < boxesVer; h++) {
				const element = new Box({
					width: boxWidth,
					height: boxHeight,
					x: (boxWidth * i),
					y: (boxHeight * h)
				})

				row.push(element)
			}
			boxes.push(row);
		}

		this.boxes = boxes;
		if (draw) {
			this.draw()
		}
		return this.boxes;
	}

	getAllBoxes() {
		return this.boxes.reduce((acc, row) => acc.concat(row), [])
	}

	draw() {
		console.log('alexalex - |||||||||', this.getAllBoxes());
		push()
		translate(this.x, this.y)
		this.getAllBoxes().forEach((element, index) => {
			element.draw();
			element.drawBorders(index);
		})
		pop();
	}
}
