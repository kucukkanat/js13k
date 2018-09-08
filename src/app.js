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
    setTimeout(()=>{
        Player.velocity.x = -2
        Player.animation(1,6,200)
    },3000)
    setTimeout(()=>{
        Player.velocity.x = 2
        Player.animation(2,6,200)
    },6000)
    setTimeout(()=>{
        Player.velocity.x = 0
        Player.animation(0,4,200)
    },8000)
    
})

const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()