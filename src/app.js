import Scene from 'class/Scene'
import Ball from 'class/Ball'
import AssetManager from 'class/AssetManager'

// Create Scene
const scene = new Scene()
scene.addToBody()

// Create Game Objects
const ball = new Ball(scene)


const gameLoop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(gameLoop)
}
gameLoop()


const storage = new AssetManager()

