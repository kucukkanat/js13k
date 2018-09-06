const Scene = require('class/Scene')
const scene = new Scene()
scene.canvas.width=800
scene.addToBody()

const LevelLoader = require('class/LevelLoader')
new LevelLoader('level.level')
.load()

// const level1 = new LevelLoader('../dist/level.js')
// level1.load()
// .then(l => {
//     console.log(l)
// })

const BlackPlatform = require('object/BlackPlatform')
const Vector = require('class/Vector')
const level = require('../dist/level')

const lines = level.split('\n')
lines.forEach((line,lineIndex) => {
    const cells = line.split('')
    const y = lineIndex*40
    cells.forEach((cell,cellIndex) => {
        const x = cellIndex*40
        if(cell.toLowerCase() === 'x'){
            
            const p = new BlackPlatform({scene,position:new Vector(x,y),width:40,height:40})
        }        
    })
})

new BlackPlatform({scene,position:new Vector(40,40),width:40,height:40})
const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()