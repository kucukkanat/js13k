const Scene = require('class/Scene')
const scene = new Scene()
scene.addToBody()
const keys = []
document.addEventListener('keydown', event => {
    const code = event.code.toLowerCase()
    keys[code] = true
})
document.addEventListener('keyup', event => {
    const code = event.code.toLowerCase()
    keys[code] = false
})

require('object/Desks').init(scene)
require('object/Phones').init(scene)

const Player = require('object/Player')
Player.init(scene)
    .then(player => {
        // Extend update function
        const temp = player.update
        player.update = function() {
            
            if(keys['arrowright']) {
                player.sprite.y = 25
                player.velocity.x = 4
                player.sprite.speed = 100
            }
            if(keys['arrowleft']) {
                player.sprite.y = 50
                player.velocity.x = -4
                player.sprite.speed = 100
            }
            if(keys['arrowup']) {
                player.sprite.y = 25
                player.velocity.y = -4
                player.sprite.speed = 100
            }
            if(keys['arrowdown']) {
                player.sprite.y = 50
                player.velocity.y = 4
                player.sprite.speed = 100
            }
            const horizontalStop = !keys.arrowright && !keys.arrowleft
            const verticalStop = !keys.arrowup && !keys.arrowdown
            if(verticalStop) player.velocity.y = 0
            if(horizontalStop) player.velocity.x = 0

            if(horizontalStop && verticalStop){
                player.sprite.y = 0 
                player.sprite.speed = 300
            }
            
            
            // IDLE
            temp.apply(this,[])
        }
        player.onCollide = e => {
           // console.log('Collided with ',e)
        }
        player.sprite.play()
    })
const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()
