const boxesWidth = 20;
const boxesHeight = 20;
const boxesPerRow = 10;
const boxesPerColumn = 10;

let grid;

function setup() {
	createCanvas(windowWidth, windowHeight);
    wasd();

}

function wasd() {

    grid = new Grid({
        x: 100,
        y: 100,
        boxesHor: boxesPerRow,
        boxesVer: boxesPerColumn
    })

    let segmentsToRemove = 40;
    while(segmentsToRemove > 0) {
        const result = grid.deleteBorderPair(
            Math.floor(random(0, boxesPerRow - 1)),
            Math.floor(random(0, boxesPerColumn - 1)),
            Math.floor(random(0, 3))
        );

        if (result) {
            segmentsToRemove = segmentsToRemove - 1;
        }
    }

    grid.draw()
}

function mouseClicked() {
    wasd()
}

class Box {
    constructor(params){
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
        this.borders = [true, true, true, true]
    }

    draw(color) {
        push();
        fill(color || 'black')
        noStroke()
        translate(this.x, this.y);
        rect(0, 0, this.width, this.height)
        pop();
    }

    drawBorders() {
        push()
        translate(this.x, this.y)
        this.borders.forEach((border, index) => {
            if (border) {
                const isHor = index % 2 === 0
                strokeWeight(3)
                stroke('black')
                if (isHor) {
                    if (index === 0) {
                        line(0, 0, this.width, 0)
                    } else {
                        line(this.width, this.height, 0, this.height)
                    }
                } else {
                    if (index === 1) {
                        line(this.width, 0, this.width, this.height)
                    } else {
                        line(0, this.height, 0, 0)
                    }
                }
            }
        })
        pop()
    }

    changeBorder(borderIndex, newState) {
        this.borders[borderIndex] = newState
    }
}

class Grid {
    constructor(params){
        this.x = params.x;
        this.y = params.y;
        this.boxesHor = params.boxesHor;
        this.boxesVer = params.boxesVer;

        this.boxes = [];
        this.createBoxes()
    }

    getAllBoxes() {
        return this.boxes.reduce((acc, row) => acc.concat(row))
    }

    createBoxes() {
        const boxes = []
        for (let i = 0; i < this.boxesHor; i++) {
            const column = [];
            for (let h = 0; h < this.boxesVer; h++) {
                column.push(new Box({
                    width: boxesWidth,
                    height: boxesHeight,
                    x: boxesWidth * i,
                    y: boxesHeight * h
                }))
            }
            boxes.push(column)
        }

        this.boxes = boxes;
        return this.boxes;
    }

    draw() {
        push()
        translate(this.x, this.y)
        this.getAllBoxes().forEach(box => {
            box.draw('white');
            box.drawBorders()
        })
        pop();
    }

    deleteBorderPair(x, y, borderIndex) {
        const pairings = [2, 3, 0, 1]
        const box = this.getBox(x, y)
        if (box) {
            let box2;
            if (borderIndex === 0) {
                box2 = this.getBox(x, y - 1)
            } else if (borderIndex === 1) {
                box2 = this.getBox(x + 1, y)
            } else if (borderIndex === 2) {
                box2 = this.getBox(x, y + 1)
            } else if (borderIndex === 3) {
                box2 = this.getBox(x - 1, y)
            }

            if (box2) {
                box.changeBorder(borderIndex, false)
                box2.changeBorder(pairings[borderIndex], false)
                return true
            } else {
                return false;
            }
        } else {
            return false
        }

    }

    getBox(x, y) {
        return this.boxes[x] && this.boxes[x][y]
    }
}
