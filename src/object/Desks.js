const GameObject = require('class/GameObject')
const Sprite = require('class/Sprite')
const AssetManager = require('class/AssetManager')
const Vector = require('class/Vector')

const floorPlan = `
x000x00000
0000x0x000
000x00000x
0000000x00
xx000000x0
0000000000
000000x000
`

module.exports = {
    floorPlan,
    init : (scene) => new AssetManager()
    .load('assets/desk.png')
    .then(image => {
        const deskPositions = []
        const rows = floorPlan.split('\n')
        for (let y = 0; y < rows.length; y++) {
            const cells = rows[y].split('')
            for (let x = 0; x < cells.length; x++) {
                if(cells[x] === 'x'){
                    deskPositions.push({
                        x:x*55,
                        y:y*55
                    })
                }
                
            }
        }
        
        deskPositions.forEach(pos => {
            const desk = new GameObject({
                name:'desk',
                scene,
                width:60,
                height:60,
                position: new Vector(pos.x,pos.y),
                sprite: new Sprite({
                    image,
                    x:0,
                    y:0,
                    width:55,
                    height:55,
                    frames:1
                })
            })
								desk.onCollide(e => {
									console.log('Desk collided')
								})

								const temp = desk.draw
								desk.draw = ()=>{
									temp.apply(desk)
									const ctx = desk.scene.context
									ctx.rect(desk.position.x,desk.position.y,desk.width,desk.height);
									ctx.stroke();
								}
        })
        
    })
}
