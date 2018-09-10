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
            speed:200
        })
    })
    const Player2 = new GameObject({
        name:'Player',
        scene,
        width:80,
        height:80,
        position: new Vector(20,100),
        sprite: new Sprite({
            image,
            x:0,
            y:0,
            width:80,
            height:80,
            frames:4,
            speed:500
        })
    })
    

    Player.sprite.play()
    Player2.sprite.play()
    Player.onKeydown('arrowright',function(){
        this.sprite.y = 160
        this.acceleration.x = this.velocity.x < 1 ? 0.1 : 0
    })
    Player.onKeydown('arrowleft',function(){
        this.sprite.y = 80
        this.acceleration.x = this.velocity.x > -1 ? -0.1 : 0
    })
    Player.onKeyup(function(){
        this.velocity.x = 0
        this.acceleration.x = 0
        this.sprite.y=0
        this.sprite.frames=4
    })
    Player.onCollide = function(direction){
        console.log(direction)
    }
})

const loop = () => {
    scene.clear()
    scene.draw()
    
    requestAnimationFrame(loop)
}
loop()