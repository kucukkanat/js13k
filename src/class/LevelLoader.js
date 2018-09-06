const AssetManager = require('class/AssetManager')
const assetManager = new AssetManager()
module.exports = class LevelLoader {
    constructor(props) {
        this.scene = props.scene
    }
    load() {
        assetManager.load('level.level')
        .then(level => {
            console.log(level)
        })
    }
}