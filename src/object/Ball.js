const GameObject = require('class/GameObject')

module.exports = class Ball extends GameObject {
    constructor(props){
        super(props)
        this.r = props.r || 1
        
        this.width = 2*this.r
        this.height = 2*this.r
    }
    update(){
        super.update()
        console.log(this.collisions())
        if(this.collisions() === 'top' || this.collisions() === 'bottom') {
            this.velocity.y *= -1
            console.log('Collided')
        }
        if(this.collisions() === 'left' || this.collisions() === 'right') {
            this.velocity.x *= -1
            console.log('Collided')
        }
    }
    draw() {
        const ctx = this.scene.context
        ctx.beginPath();
        ctx.arc(this.position.x + this.r, this.position.y + this.r ,this.r, 0, 2*Math.PI );
        ctx.stroke();
    }
}