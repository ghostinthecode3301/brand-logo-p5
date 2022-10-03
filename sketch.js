let sizepx // размер в пикселях
let linesWeight = 2 // толщина линий

let anchorPointsX = []
let anchorPointsY = []
let controlPointsX = [] // movers
let controlPointsY = [] // movers
let letters = []

function preload() {
    light = loadFont('./fonts/Oxygen-Light.ttf')
    regular = loadFont('./fonts/Oxygen-Regular.ttf')
}

function setup() {
    sizepx = 2000
    createCanvas(sizepx, sizepx) // use sizepx to make custom size
    createPoints(width, height, 4)

    letters.push('E', 'N', 'G', 'L', 'I', 'S', 'H', 'W', 'I', 'T', 'H', 'Y', 'A', 'N', 'A')
}
function draw() {
    colorMode(HSB)
    background(255);

    push()

    textSize(width / 8)
    textFont(light)
    textAlign(LEFT, TOP)

    stroke(0)
    fill(0)

    text(letters[0], (2/8 + 0.025) * width, (2/8 - 0.01875) * height)
    text(letters[1], (3/8 + 0.015625) * width, (2/8 - 0.01875) * height)
    text(letters[2], (4/8 + 0.015625) * width, (2/8 - 0.01875) * height)

    text(letters[3], (2/8 + 0.025) * width, (3/8 - 0.01875) * height)
    text(letters[4], (3/8 + 0.05) * width, (3/8 - 0.01875) * height)
    text(letters[5], (4/8 + 0.025) * width, (3/8 - 0.01875) * height)
    text(letters[6], (5/8 + 0.016) * width, (3/8 - 0.01875) * height)

    push()
    textSize(width / 10)
    textFont(regular)
    text(letters[7], (2/8 + 0.0125) * width, (4/8 - 0.0025) * height) // w by the way
    pop()
    text(letters[8], (3/8 + 0.05) * width, (4/8 - 0.01875) * height)
    text(letters[9], (4/8 + 0.03125) * width, (4/8 - 0.01875) * height)
    text(letters[10], (5/8 + 0.016) * width, (4/8 - 0.01875) * height)

    text(letters[11], (2/8 + 0.0275) * width, (5/8  - 0.01875) * height)
    text(letters[12], (3/8 + 0.025) * width, (5/8  - 0.01875) * height)
    text(letters[13], (4/8 + 0.015625) * width, (5/8 - 0.01875) * height)
    text(letters[14], (5/8 + 0.025) * width, (5/8  - 0.01875) * height)
    pop()

    drawLines()

    for (let i = 0; i < controlPointsX.length; i++) {
        controlPointsX[i].update(frameCount);
        controlPointsY[i].update(frameCount);
        //console.log(...controlPointsX, ...controlPointsY)
    }
    //console.log(anchorPointsX, anchorPointsY, controlPointsX, controlPointsY, frameCount)
    curves(anchorPointsX, anchorPointsY, controlPointsX, controlPointsY, frameCount, linesWeight)
    //noLoop()
}

function createPoints(width, height, slices = 5) {


    for (let i = 1; i < slices; i++) {  // going with different x-es

        let upperPoint  = new Point(2/8 * width + i/slices * width/2, 2/8 * height)
        let bottomPoint  = new Point(2/8 * width + i/slices * width/2, 6/8 * height)

        //console.log(upperWay)
        anchorPointsX.push(upperPoint)
        anchorPointsX.push(bottomPoint)

    }

    for (let i = 1; i < slices; i++) {  // going with different x-es

        let leftPoint  = new Point(2/8 * width, 2/8 * height + i/slices * height/2)
        let rightPoint  = new Point( 6/8 * width, 2/8 * height + i/slices * height/2)

        //console.log(upperWay)
        anchorPointsY.push(leftPoint)
        anchorPointsY.push(rightPoint)

    }

    for (let i = 0; i < anchorPointsX.length; i += 2) {
       let start = createVector(anchorPointsX[i].xPoint, anchorPointsX[i].yPoint)
       let end = createVector(anchorPointsX[i + 1].xPoint, anchorPointsX[i + 1].yPoint)
       let bufX = p5.Vector.sub(end, start)
       bufX.div(5)
       start.add(bufX)


        let firstControl = new Mover(start.x, start.y, sizepx)
        push()
        strokeWeight(5)
        point(start.x, start.y)
        pop()
        controlPointsX.push(firstControl)

        start.add(bufX.mult(3))
        let secondControl = new Mover(start.x, start.y, sizepx)
        push()
        strokeWeight(5)
        point(start.x, start.y)
        pop()
        controlPointsX.push(secondControl)
    }

    for (let i = 0; i < anchorPointsY.length; i += 2) {
        let start = createVector(anchorPointsY[i].xPoint, anchorPointsY[i].yPoint)
        let end = createVector(anchorPointsY[i + 1].xPoint, anchorPointsY[i + 1].yPoint)
        let bufY = p5.Vector.sub(end, start)
        bufY.div(5)
        start.add(bufY)


        let firstControl = new Mover(start.x, start.y, sizepx)
        push()
        strokeWeight(5)
        point(start.x, start.y)
        pop()
        controlPointsY.push(firstControl)

        start.add(bufY.mult(3))
        let secondControl = new Mover(start.y, start.x, sizepx)
        push()
        strokeWeight(5)
        point(start.x, start.y)
        pop()
        controlPointsY.push(secondControl)
    }
}

function drawLines() {

    line(2/8 * width, 2/8 * height, 2/8 * width, 6/8 * height)
    line(2/8 * width, 2/8 * height, 6/8 * width, 2/8 * height)
    line(6/8 * width, 2/8 * height, 6/8 * width, 6/8 * height)
    line(2/8 * width, 6/8 * height, 6/8 * width, 6/8 * height)
}

function curves(apx = [], apy = [], cpx = [], cpy = [], frameCount, linesWeight) {
    colorMode(HSB)
    let lengthX = apx.length
    strokeWeight(linesWeight)

    noFill()
    for (let i = 0; i < lengthX; i+= 2) {
        push()
        stroke(frameCount / 10, 50, map(frameCount, 0, 500, 0, 30))
        bezier(apx[i].xPoint, apx[i].yPoint, cpx[i].pos.x, cpx[i].pos.y, cpx[i + 1].pos.x, cpx[i + 1].pos.y, apx[i + 1].xPoint, apx[i + 1].yPoint)
        pop()
    }

    let lengthY = apy.length;

    for (let i = 0; i < lengthY; i+= 2) {
        push()
        stroke(frameCount / 10, 50, map(frameCount, 0, 500, 0, 30))
        bezier(apy[i].xPoint, apy[i].yPoint, cpy[i].pos.x, cpy[i].pos.y, cpy[i + 1].pos.y, cpy[i + 1].pos.x, apy[i + 1].xPoint, apy[i + 1].yPoint)
        pop()
    }

}

class Point {
    constructor(x, y) {
        this.xPoint = x;
        this.yPoint = y;
    }
}