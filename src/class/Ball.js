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

        if(this.collisions().length !=0) {
            this.dx = -this.dx
            this.dy = -this.dy

            this.ddx = -this.ddx
            this.ddy = -this.ddy
        }
        if(this.y<100){
            this.dy=0
            this.ddy=0.5
        }
    }
    draw() {
        this.scene.context.beginPath();
        this.scene.context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.scene.context.stroke()
    }
}