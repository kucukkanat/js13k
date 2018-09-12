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
                            x: x * 54 + 20,
                            y: y * 25 - 25
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

                
                

                phone.onCollide(items => {
                    console.log('Collided')
                    console.log(items)
                })
                phone.pickup = ()=>{
                    phone.sprite.pause()
                    phone.sprite.x = 0
                    phone.ringing = false
                }
                // Randomly start to ring
                const ring = () => {
                    phone.ringing = true
                    const ringFor = 5
                    const randomTime = Math.random() * 15 * SECONDS

                    setTimeout(() => {
                        phone.sprite.play()
                        // Ring for 5 seconds
                        setTimeout(() => {
                            phone.pickup()
                        }, ringFor * SECONDS)
                        ring()
                    }, randomTime)
                }
                ring()
            })

        })
}