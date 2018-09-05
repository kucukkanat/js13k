import GameObject from 'class/GameObject'

export default class Cube extends GameObject {
    constructor(scene,x,y,w,h,solid) {
        super(scene)
        if(arguments.length === 3) {
            this.width = arguments[1]
            this.height = arguments[2]
        }
        if(arguments.length === 5) {
            this.x = arguments[1]
            this.y = arguments[2]
            this.width = arguments[3]
            this.height = arguments[4]
        }

        this.draw = this.draw.bind(this)
    }
    update(){
        super.update()
        
        if(this.collides()) {
            this.dy = -this.dy * 0.8
        }
    }
    draw() {
        this.scene.context.beginPath()
        this.scene.context.rect(this.x,this.y,this.width,this.height)
        this.scene.context.stroke()
    }
}
