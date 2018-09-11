const Scene = require('class/Scene')
const scene = new Scene()
scene.addToBody()

const Player = require('object/Player')
Player.init(scene)
.then(p => {
    console.log(p)
})
const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()