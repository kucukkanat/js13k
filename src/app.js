const Scene = require('class/Scene')
const GameObject = require('class/GameObject')
const AssetManager = require('class/AssetManager')
const Vector = require('class/Vector')
const scene = new Scene()
scene.addToBody()

// Load sprite
new AssetManager().load('assets/player_big.png')
.then(sprite => {
    const Player = new GameObject({
        name:'Player',
        scene,
        sprite,
        width:80,
        height:80,
        position: new Vector(400,100)
    })
    Player.animation(0,4,400)
    
    Player.onKeydown('arrowright',function(){
        Player.animation(2,6,200)
        this.velocity.x = 3
    })
    Player.onKeydown('arrowleft',function(){
        Player.animation(1,6,200)
        this.velocity.x = -3
    })
    Player.onKeyup(function(){
        animR=false
        animL=false
        this.velocity.x = 0
        Player.animation(0,4,400)
    })
    
})

const loop = () => {
    scene.clear()
    scene.draw()
    
    requestAnimationFrame(loop)
}
loop()