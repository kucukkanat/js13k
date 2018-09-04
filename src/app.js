import Scene from 'class/Scene'
import Ball from 'class/Ball'
import Cube from 'class/Cube'
import ClickIndicator from 'class/ClickIndicator'

// Create Scene
const scene = new Scene()
scene.addToBody()

new ClickIndicator(scene)
// Create Game Objects
const ball = new Ball(scene)
const platform = new Cube(scene)

ball.x = 150
ball.y = 100
ball.ddy=0.38
ball.ddx=0.001
ball.r = 30

platform.width=200
platform.height=20
platform.x=100
platform.y = scene.canvas.height-100
// Create Game Objects

setTimeout(()=>{
    ball.removeForces()
    ball.dy = 0
    ball.ddx=-0.1
},20000)

// Game logic 
const gameLoop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(gameLoop)
}
gameLoop()
