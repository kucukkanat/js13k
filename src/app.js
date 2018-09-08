const Scene = require('class/Scene')
const GameObject = require('class/GameObject')
const Animation = require('class/Animation')
const Vector = require('class/Vector')
const scene = new Scene()
scene.canvas.width=800
scene.addToBody()

const Player = new GameObject({
    name:'Player',
    scene,
    width:40,
    height:40,
    position: new Vector(100,100)
})
const anim1 = new Animation(Player,{url:'player_idle.png'})
anim1.play()
setTimeout(()=>{
    console.log('Stopped')
    anim1.pause()
},1000)

const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()