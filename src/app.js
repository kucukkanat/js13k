const Scene = require('class/Scene')
const GameObject = require('class/GameObject')
const Ball = require('object/Ball')
const Vector = require('class/Vector')

const scene = new Scene()
scene.addToBody()

const b = new Ball({scene, r:20})
b.acceleration = b.acceleration.add(new Vector(0,1))
console.log(b)

const loop = () => {
    
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()