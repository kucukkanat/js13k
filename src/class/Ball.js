export default class Ball extends GameObject{
    constructor(context){
        super()
        this.context = context
        this.r = 20

        this.draw = this.draw.bind(this)
    }
    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.context.stroke()
    }
}