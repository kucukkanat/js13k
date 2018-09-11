const GameObject = require('class/GameObject')
const Sprite = require('class/Sprite')
const AssetManager = require('class/AssetManager')
const Vector = require('class/Vector')

// 25x25px
const Player = new GameObject({
    position: new Vector(100,100)
})

module.exports = Player