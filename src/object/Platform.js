const GameObject = require('class/GameObject')
const AssetManager = require('class/AssetManager')
const assets = new AssetManager()

module.exports = class Platform extends GameObject{
    constructor(props) {
        super(props)
    }
    draw(){
        const ctx = this.scene.context
        assets.load('/brick.png')
        .then(image => {
            console.log(this.position.x, this.position.y)
            ctx.drawImage(image, 0, 0, this.width, this.height, this.position.x, this.position.y, this.width, this.height)
        })
    }
}