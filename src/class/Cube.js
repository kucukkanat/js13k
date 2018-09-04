import GameObject from 'class/GameObject'

export default class Cube extends GameObject {
    constructor(scene, width=150, height=50, solid=true) {
        super(scene)
        this.width = width
        this.height = height
        
    }
    draw() {
        console.log(this.width,this.height)
        this.scene.context.rect(this.x,this.y,this.width,this.height)
        this.scene.context.stroke()
    }
}
