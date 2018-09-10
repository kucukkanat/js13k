const Scene = require('class/Scene')
const Vector = require('class/Vector')
const Sprite = require('class/Sprite')
const GameObject = require('class/GameObject')
const AssetManager = require('class/AssetManager')
const scene = new Scene()
scene.addToBody()

// Load sprite
new AssetManager().load('assets/player_big.png')
.then(image => {
    const Player = new GameObject({
        name:'Player',
        scene,
        width:80,
        height:80,
        position: new Vector(400,100),
        sprite: new Sprite({
            image,
            x:0,
            y:80,
            width:80,
            height:80,
            frames:6,
            speed:500
        })
    })
    
    Player.sprite.play()
    Player.onKeydown('arrowright',function(){
        console.log('right')
        Player.sprite.y = 160
    })
    Player.onKeydown('arrowleft',function(){
        console.log('left')
        Player.sprite.y = 80
    })
})

const loop = () => {
    scene.clear()
    scene.draw()
    
    requestAnimationFrame(loop)
}
loop()