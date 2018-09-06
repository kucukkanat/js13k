const Scene = require('class/Scene')
const Sprite = require('class/Sprite')
const Vector = require('class/Vector')
const scene = new Scene()
scene.canvas.width=800
scene.addToBody()

const Player = new Sprite({
    url:'player_idle.png',
    scene,
    width:40,
    height:40,
    position: new Vector(100,100)
})
Player.animate()

const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()