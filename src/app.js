import Scene from 'class/Scene'
import Ball from 'class/Ball'
import Cube from 'class/Cube'
import ClickIndicator from 'class/ClickIndicator'
import AssetManager from 'class/AssetManager'

const mgr = new AssetManager()
mgr.load('background','https://images6.alphacoders.com/715/715677.png')
mgr.load('https://images6.alphacoders.com/715/715677.png')
console.log(mgr)

// Create Scene
const scene = new Scene()
scene.addToBody()

new ClickIndicator(scene)
// Create Game Objects
const ball = new Cube(scene, 150, 100, 40, 60)
const platform = new Cube(scene)

ball.ddy=0.4


platform.width=200
platform.height=20
platform.x=100
platform.y = scene.canvas.height-100
// Create Game Objects

// Game logic 
const gameLoop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(gameLoop)
}
gameLoop()
