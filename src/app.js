import Scene from 'class/Scene'
import Ball from 'class/Ball'
import AssetManager from 'class/AssetManager'

// Create Scene
const scene = new Scene()
scene.addToBody()

// Create Game Objects
let balls = []
for (let index = 0; index < 40; index++) {
    balls.push(new Ball(scene))
    balls[index].r = index*4
    balls[index].dx = 20/index
    balls[index].dy = 20/index
    balls[index].dr = index/4
}


const gameLoop = () => {
    
    scene.clear()
    scene.draw()
    requestAnimationFrame(gameLoop)
}
gameLoop()


const storage = new AssetManager()

