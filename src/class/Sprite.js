const GameObject = require('class/GameObject')
const AssetManager = require('class/AssetManager')
const assetManager = new AssetManager()
module.exports = class Sprite extends GameObject{
    constructor(props){
        super(props)
        if(!props.url) throw new Error(`Sprite url undefined!`)
        this.url = props.url

        this.animation = {
            tick:0,
            index:0
        }
    }
    animate(index=0){
        assetManager.load(this.url)
        .then(image => {
            const frameCount = image.width / this.width
            const anima = ()=>{
                if(this.animation.tick < frameCount - 1){
                    this.animation.tick+=1
                }
                else{
                    this.animation.tick=0
                }
                setTimeout(anima,200)
            }
            anima()
        })
    }
    draw(){
        assetManager.load(this.url)
        .then(image => {
            const ctx = this.scene.context
            ctx.drawImage(image, this.animation.tick*this.width, this.animation.index, this.width, this.height, this.position.x, this.position.y, this.width, this.height)
        })
    }
}