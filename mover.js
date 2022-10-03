class Mover {
    constructor(x, y, size, frameCount) {
        this.xPoint = x;
        this.yPoint = y;
        this.pos = createVector(x, y)
        this.vel = createVector(0,0)
        this.scale = size
        this.frames = frameCount
        this.acc = p5.Vector.random2D()

    }

    update(frameCount) {
        this.acc.setMag(0.1)
        this.acc.limit(0.1)
        this.vel.add(this.acc)

        if ((this.scale / 8000 - (frameCount / 60000)) > 0.01) {
            this.vel.limit(this.scale / 8000 - (frameCount / 60000))
        } else {
            this.vel.limit(0.01)
        }

        this.pos.add(this.vel)
    }

    show(){
        noStroke()
        fill('#5842da')
        ellipse(this.pos.x, this.pos.y, 20, 20)
    }

}