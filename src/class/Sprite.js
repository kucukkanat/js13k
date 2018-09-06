const GameObject = require('class/GameObject')
const AssetManager = require('class/AssetManager')
const assetManager = new AssetManager()
module.exports = class Sprite extends GameObject{
    constructor(props){
        super(props)
        if(!props.url) throw new Error(`Sprite url undefined!`)
        this.url = props.url

        this.animations = []
    }
    draw(){
        assetManager.load(this.url)
        .then(image => {
            ctx.drawImage(image, 0, 0, this.width, this.height, this.position.x, this.position.y, this.width, this.height)
        })
    }
}