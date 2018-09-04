import Scene from 'class/Scene'
import GameObject from 'class/GameObject'
import AssetManager from 'class/AssetManager'

const scene = new Scene()
scene.addToBody()



const storage = new AssetManager()

storage.loadMultiple([
    'https://en.wikipedia.org/wiki/File:Bar%C4%B1%C5%9F_Man%C3%A7o.jpg',
    'http://www.gulerotel.com/wp-content/uploads/2017/02/2017-02-01-Bar%C4%B1%C5%9F-man%C3%A7o-%C3%B6l%C3%BCm-y%C4%B1ld%C3%B6n%C3%BCm%C3%BC13.jpg'
])
.then(v => {
    console.log(storage.assets)
    console.log(v)
})
console.log(storage.assets)
setTimeout(() => {
    console.log(storage)
},2000)