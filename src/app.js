const Scene = require('class/Scene')
const scene = new Scene()
scene.addToBody()

const Player = require('object/Player')

const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()