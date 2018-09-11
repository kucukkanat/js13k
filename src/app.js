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
        position: new Vector(400,200),
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
        position: new Vector(20,200),
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
    Player2.name='enemy'
    Player.onKeydown('arrowright',function(){
        this.sprite.frames=6
        this.sprite.y = 160
        this.acceleration.x = this.velocity.x < 1 ? 0.1 : 0
    })
    Player.onKeydown('arrowleft',function(){
        this.sprite.frames=6
        this.sprite.y = 80
        this.acceleration.x = this.velocity.x > -1 ? -0.1 : 0
    })
    Player.onKeyup('arrowright',function(){
        this.velocity.x = 0
        this.acceleration.x = 0
        this.sprite.frames=1
    })
    Player.onKeyup('arrowleft',function(){
        this.velocity.x = 0
        this.acceleration.x = 0
        this.sprite.frames=1
    })
    Player.onCollide = function(items){
        if(items[0].direction === 'top' || items[0].direction === 'bottom') {
            this.velocity.y = 0
        } else if(items[0].direction === 'right' || items[0].direction === 'left') {
            this.velocity.x = 0
        }
        if(items[0].direction === 'top') {
            this.jumped = false
        }
        console.log(items[0].direction)
    }
    Player.onKeydown('space',function(){
        if(!this.jumped) {
            this.jumped = true
            this.velocity.y = -6
            this.acceleration.y = 0.1
        }
    })
    const old = Player.update
    Player.update = function(){
        old.apply(Player)
        
    }
})

const loop = () => {
    scene.clear()
    scene.draw()
    
    requestAnimationFrame(loop)
}
loop()