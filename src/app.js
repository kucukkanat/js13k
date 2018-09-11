const Scene = require('class/Scene')
const scene = new Scene()
scene.addToBody()

const Player = require('object/Player')
Player.init(scene)
.then(p => {
    const runRight = player => {
        player.sprite.y = 25
    }
    const runLeft = player => {
        player.sprite.y = 50
    }
    // Keydowns
    p.onKeydown('arrowdown',function(){
        this.velocity.y = 2
    })
    p.onKeydown('arrowup',function(){
        this.velocity.y = -2
    })
    p.onKeydown('arrowright',function(){
        this.velocity.x = 2
        runRight(this)
    })
    p.onKeydown('arrowleft',function(){
        this.velocity.x = -2
        runLeft(this)
    })
    // Keyups
    p.onKeyup('arrowdown',function(){
        this.removeVelocity()
    })
    p.onKeyup('arrowup',function(){
        this.removeVelocity()
    })
    p.onKeyup('arrowright',function(){
        this.removeVelocity()
    })
    p.onKeyup('arrowleft',function(){
        this.removeVelocity()
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