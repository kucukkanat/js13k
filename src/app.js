const Scene = require('class/Scene')
const scene = new Scene()
scene.addToBody()

const playerSpeed = 5
const Player = require('object/Player')
Player.init(scene)
.then(p => {
    const runRight = player => {
        player.sprite.y = 25
        player.sprite.frames=4
        player.sprite.speed = 100
        player.sprite.pause()
        player.sprite.play()
    }
    const runLeft = player => {
        player.sprite.y = 50
        player.sprite.frames=4
        player.sprite.speed = 100
        player.sprite.pause()
        player.sprite.play()
    }
    const goIdle = player => {
        player.sprite.y = 0
        player.sprite.frames = 6
        player.sprite.speed = 300
        player.sprite.pause()
        player.sprite.play()
    }
    // Keydowns
    p.onKeydown('arrowdown',function(){
        this.velocity.y = playerSpeed
    })
    p.onKeydown('arrowup',function(){
        this.velocity.y = -playerSpeed
    })
    p.onKeydown('arrowright',function(){
        this.velocity.x = playerSpeed
        runRight(this)
    })
    p.onKeydown('arrowleft',function(){
        this.velocity.x = -playerSpeed
        runLeft(this)
    })
    // Keyups
    p.onKeyup('arrowdown',function(){
        this.removeVelocity()
        goIdle(this)
    })
    p.onKeyup('arrowup',function(){
        this.removeVelocity()
        goIdle(this)
    })
    p.onKeyup('arrowright',function(){
        this.removeVelocity()
        goIdle(this)
    })
    p.onKeyup('arrowleft',function(){
        this.removeVelocity()
        goIdle(this)
    })
    console.log(p)
    p.sprite.play()
})
const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()