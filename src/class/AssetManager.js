export default class AssetManager {
    constructor(){
        this.assets = {
            image:[],
            audio:[],
            data :[]
        }
    }
    static getExtension(url){
        return url.split('.').pop()
    }
    loadMultiple(assetUrls) {
        const promises = assetUrls.map(url => this.load(url))
        return Promise.all(promises)
    }
    load(url) {
        const imageRegex = /(jpeg|jpg|gif|png)$/
        const audioRegex = /(wav|mp3|ogg|aac)$/
        const jsonRegex = /(json)$/
        const ext = AssetManager.getExtension(url)
        
        const returnWithPromise = (item) => new Promise(resolve => {
            resolve(item)
        })

        /**
         * If the item is already loaded
         * do not attempt to load again 
         * and return it from the storage
         */

        if(ext.match(imageRegex)) {
            return this.assets.image[url] ? returnWithPromise(this.assets.image[url]) : this.loadImage(url)
        } 
        else if(ext.match(audioRegex)) {
            return this.assets.audio[url] ? returnWithPromise(this.assets.audio[url]) : this.loadAudio(url)
        } 
        else if(ext.match(jsonRegex)) {
            return this.assets.data[url] ? returnWithPromise(this.assets.data[url]) : this.loadData(url)
        } 
        else {
            return this.assets.data[url] ? returnWithPromise(this.assets.data[url]) : this.loadData(url)
        }
    }
    loadImage(url){
        const image = new Image()
        image.src = url
        return new Promise((resolve, reject) => {
            image.onload = () => {
                // Add to asset storage
                this.assets.image[url]=image
                resolve(image)
            }
            image.onerror = () => {
                reject(`Could not load image ${image.src}`)
            }
        })
    }
    loadAudio(url) {
        console.warn(`Audio loader is not supported yet!`)
        return new Promise((resolve, reject) => {
            this.assets.audio[url]=null
            // TODO
        })
    }
    loadData(url) {
        return fetch(url).then(r=>r.json())
        .then(json => {
            // Add to asset storage
            this.assets.data[url] = json
            return json
        })
        
    }

}