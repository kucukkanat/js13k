const GameObject = require('class/GameObject')

module.exports = class Ball extends GameObject {
    constructor(props){
        super(props)
        this.r = props.r || 1
        
        this.width = this.r
        this.height = this.r
    }
    draw() {
        const ctx = this.scene.context
        ctx.beginPath();
        ctx.arc(this.position.x + this.r, this.position.y + this.r ,this.r, 0, 2*Math.PI );
        ctx.stroke();
    }
}