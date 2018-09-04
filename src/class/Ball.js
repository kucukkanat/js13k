import GameObject from 'class/GameObject'

export default class Ball extends GameObject{
    constructor(scene){
        super(scene)
        
        this.r = 20
        this.dr = 0
        this.width = this.r
        this.height = this.r
    }
    update() {
        super.update()
        this.r += this.dr
    }
    draw() {
        this.scene.context.beginPath();
        this.scene.context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.scene.context.stroke()
    }
}