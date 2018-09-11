const GameObject = require('class/GameObject')
const Sprite = require('class/Sprite')
const AssetManager = require('class/AssetManager')
const Vector = require('class/Vector')

// 25x25px

module.exports = {
    init : (scene) => new AssetManager()
    .load('assets/Officer.png')
    .then(image => {
        const player = new GameObject({
            scene,
            width:60,
            height:60,
            position: new Vector(100,100),
            sprite: new Sprite({
                image,
                x:0,
                y:0,
                width:25,
                height:25,
                frames:6,
                speed:200
            })
        })
        return player
    })
}