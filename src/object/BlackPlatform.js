const GameObject = require('class/GameObject')

module.exports = class BlackPlatform extends GameObject {
    constructor(props){
        super(props)
    }
    draw(){
        const ctx = this.scene.context
        ctx.rect(this.position.x,this.position.y,this.width,this.height)
        ctx.stroke()
    }
}