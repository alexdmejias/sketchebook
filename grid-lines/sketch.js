const m = 30;
const qty = 25;
const r =  2;
let positions = [];
let lines = [];
let linesToShow;
const cWidth = 600;
const color = 'red';

// ver, hor, for, back
let lineTypesAllowed = [1, 2, 3, 0];

function setup() {
	createCanvas(cWidth, cWidth);
	background(100)
	linesToShow = Math.floor(random(0, 100));
	const innerArea = cWidth - (2 * m);
	push()
	noStroke()
	translate(m, m)
	fill(color)

	const segment = (innerArea) / (qty - 1);
	for (let i = 0; i < qty; i++) { // vertical
		for (let h = 0; h < qty; h++) { // hor
			const horValue = segment * h;
			const verValue = segment * i;
			const nextVerValue = verValue + segment
			const nextHorValue = horValue + segment

			positions.push([horValue, verValue])

			if ((isAllowed(0)) && (h < qty && i  < qty - 1)) { // verticals
				lines.push([[horValue, verValue], [horValue, nextVerValue]])
			}

			if ((isAllowed(1)) && (h < qty - 1 && i  < qty)) { // horizontals
				lines.push([[horValue, verValue], [nextHorValue, verValue]])
			}

			if ((isAllowed(2)) && (h > 0 && i < qty - 1 )) { // forward
				lines.push([[horValue, verValue], [horValue - segment, nextVerValue]])
			}

			if ((isAllowed(3)) && (h < qty - 1 && i < qty - 1 )) { // backward
				lines.push([[horValue, verValue], [nextHorValue, nextVerValue]])
			}

			ellipse(horValue, verValue, r)
		}
	}
	pop()
	push()
	translate(m, m)
	strokeWeight(r)
	stroke(color)
	for (let i = 0; i < linesToShow; i++) {
		const lineToShowIndex = Math.floor(random(0, lines.length))
		const currLine = lines[lineToShowIndex];
		lines.splice(lineToShowIndex, 1)
		line(currLine[0][0], currLine[0][1], currLine[1][0], currLine[1][1])
	}
	pop()

}

function draw() {

}


function isAllowed (index) {
	return lineTypesAllowed === 'all' || lineTypesAllowed.indexOf(index) > -1
}
