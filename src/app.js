const Scene = require('class/Scene')
const GameObject = require('class/GameObject')
const Ball = require('object/Ball')
const Vector = require('class/Vector')

const scene = new Scene()
scene.addToBody()

const b = new Ball({scene, r:20})
b.applyForce(new Vector(0,0.2))
const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()