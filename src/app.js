const Scene = require('class/Scene')
const GameObject = require('class/GameObject')
const Ball = require('object/Ball')
const Vector = require('class/Vector')
const Platform = require('object/Platform')

const scene = new Scene()
scene.addToBody()

const b = new Ball({scene, r:20, position:new Vector(100,20)})
b.applyForce(new Vector(0,0.2))
const brick = new Platform({scene,position:new Vector(50,340),width:428,height:128})
console.log(brick)

const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()