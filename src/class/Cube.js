import GameObject from 'class/GameObject'

export default class Cube extends GameObject {
    constructor(scene, width=150, height=50, solid=true) {
        super(scene)
        this.width = width
        this.height = height
        this.solid = true

        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)
    }
    draw() {
        this.scene.context.beginPath()
        this.scene.context.rect(this.x,this.y,this.width,this.height)
        this.scene.context.stroke()
    }
}
