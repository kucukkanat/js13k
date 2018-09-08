const AssetManager = require('class/AssetManager')
const assetManager = new AssetManager()

module.exports = class Animation {
    constructor(gameObject,props){
        this.playing = false
        this.loop = null
        this.tick = 0
        this.frames = 1
        this.speed = 200
        this.index = 0 // Animation index index*height will be y-axis to draw
        this.url = ''
        
        // Override defaults
        Object.assign(this,props)
        
        // Overwrite GameObjects draw method for animation
        const self = this
        gameObject.draw = function() {
            assetManager.load(self.url)
            .then(image => {
                this.scene.context.drawImage(
                    image, 
                    self.tick*this.width, 
                    self.index, 
                    this.width, 
                    this.height, 
                    this.position.x, 
                    this.position.y, 
                    this.width, 
                    this.height
                )
            })
        }
    }
    play(){
        const frameRoller = ()=>{
            if(this.tick < this.frames){
                this.tick += 1
            } else {
                this.tick = 0
            }
            this.loop = setTimeout(frameRoller,this.speed)
        }
        frameRoller()
            
        
    }
    pause(){
        clearTimeout(this.loop)
    }
}