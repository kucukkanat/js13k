const Scene = require('class/Scene')
const Player = require('object/Player')
const scene = new Scene({
    width: 580,
    height: 300
})
scene.addToBody()
// Hide the canvas in the beginning of the game
scene.canvas.classList.add('hide')
const startScreen = require('./start-screen')
const keys = []
document.addEventListener('keydown', event => {
    const code = event.code.toLowerCase()
    keys[code] = true
})
document.addEventListener('keyup', event => {
    const code = event.code.toLowerCase()
    keys[code] = false
})

const startGame = () => {
    let SCORE = 0
    const gameTime = 60 //SECONDS
    let remainingTime = gameTime
    const updateScoreBoard = ()=>{
        document.querySelector('#score').innerHTML = `Score:${SCORE} Remaining: ${remainingTime}`
    }
    updateScoreBoard()
    startScreen.hide()
    const timer = setInterval(()=>{
        updateScoreBoard()
        if(remainingTime > 1){
            remainingTime -= 1
        } else{
            remainingTime = 0
            startScreen.show()
        }
    },1000)
    require('object/Desks').init(scene)
    require('object/Phones').init(scene)
    const playerSpeed = 5

    Player.init(scene)
        .then(player => {
            // Extend update function
            const temp = player.update
            player.update = function () {

                if (keys['arrowright']) {
                    player.sprite.y = 25
                    player.velocity.x = 4
                    player.sprite.speed = 100
                    player.sprite.frames = 4
                    if(player.right() > player.scene.canvas.width) {
                        player.velocity.x = 0
                    }
                }
                if (keys['arrowleft']) {
                    player.sprite.y = 50
                    player.velocity.x = -4
                    player.sprite.speed = 100
                    player.sprite.frames = 4
                    if(player.left() < 0) {
                        player.velocity.x = 0
                    }
                }
                if (keys['arrowup']) {
                    player.sprite.y = 25
                    player.velocity.y = -4
                    player.sprite.speed = 100
                    if(player.top() < 0) {
                        player.velocity.y = 0
                    }
                }
                if (keys['arrowdown']) {
                    player.sprite.y = 50
                    player.velocity.y = 4
                    player.sprite.speed = 100
                    if(player.bottom() > player.scene.canvas.height) {
                        player.velocity.y = 0
                    }
                }
                const horizontalStop = !keys.arrowright && !keys.arrowleft
                const verticalStop = !keys.arrowup && !keys.arrowdown
                if (verticalStop) player.velocity.y = 0
                if (horizontalStop) player.velocity.x = 0

                if (horizontalStop && verticalStop) {
                    player.sprite.y = 0
                    player.sprite.speed = 300
                }

                player.onCollide = item => {
                    const hitItem = item[0].actor
                    if (hitItem.name === 'phone' && hitItem.ringing) {
                        hitItem.pickup()
                        SCORE+=1
                        updateScoreBoard()
                    }
                }

                // IDLE
                temp.apply(this, [])
            }
            player.onCollide = e => {
                // console.log('Collided with ',e)
            }
            player.sprite.play()
        })

}


const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()

const startButton = document.querySelector('#start-screen button')
startButton.addEventListener('click',()=>{
    startGame()
})