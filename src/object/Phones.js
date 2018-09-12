const GameObject = require('class/GameObject')
const Vector = require('class/Vector')
const Sprite = require('class/Sprite')
const AssetManager = require('class/AssetManager')
const {
    floorPlan
} = require('object/Desks')
const SECONDS = 1000

module.exports = {
    init: (scene) => new AssetManager()
        .load('assets/phone.png')
        .then(image => {
            const deskPositions = []
            const rows = floorPlan.split('\n')
            for (let y = 0; y < rows.length; y++) {
                const cells = rows[y].split('')
                for (let x = 0; x < cells.length; x++) {
                    if (cells[x] === 'x') {
                        deskPositions.push({
                            x: x * 55 + 20,
                            y: y * 55 - 10
                        })
                    }

                }
            }

            deskPositions.forEach(pos => {
                const phone = new GameObject({
                    name: 'phone',
                    scene,
                    width: 40,
                    height: 40,
                    position: new Vector(pos.x, pos.y),
                    sprite: new Sprite({
                        image,
                        x: 0,
                        y: 0,
                        width: 32,
                        height: 32,
                        frames: 4
                    })
                })
								const temp = phone.draw
								phone.draw = ()=>{
									temp.apply(phone)
									const ctx = phone.scene.context
									ctx.rect(phone.position.x,phone.position.y,phone.width,phone.height);
									ctx.stroke();
								}
								phone.onCollide(items => {
									console.log('Collided')
									console.log(items)
								})
                // Randomly start to ring
                const ring = () => {
                    const ringFor = 5
                    const randomTime = Math.random() * 15*SECONDS
                    
                    setTimeout(() => {
                        phone.sprite.play()
                        // Ring for 5 seconds
                        setTimeout(() => {
                            phone.sprite.pause()
                            phone.sprite.x = 0
                        }, ringFor * SECONDS)
                        ring()
                    }, randomTime)
                }
                ring()
            })

        })
}
