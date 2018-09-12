
module.exports = class Sprite{
    /**
     * @class Sprite
     * @param {object} props 
     * @param {image} props.image - Must be returned from {@link AssetManager}
     * @param {number} props.x - X point to start to crop image
     * @param {number} props.y - Y point to start to crop image
     * @param {number} props.width - Crop width
     * @param {number} props.height - Crop height
     * @param {number} props.tick - Animation starting frame index
     * @param {number} props.frames - Number of frames in animation
     * @param {number} props.speed - Speed in miliseconds
     */
    constructor(props){
        ['image','x','y','width','height']
        .forEach(key => {
            if(props[key] === undefined){
                console.log(props[key])
                throw new Error(`props[${key}] is missing!`)
            }
        })
        Object.assign(this,props)

        this.loop = null
        this.tick = props.tick || 0
        this.frames = props.frames || 1
        this.speed = props.speed || 200
    }
    /**
     * @memberof Sprite
     * @method
     * Plays the animation
     */
    play(){
        const roller = ()=>{
            if(this.tick < this.frames - 1) {
                this.tick += 1
            } else {
                this.tick = 0
            }
            this.x = this.tick * this.width
            this.loop = setTimeout(roller,this.speed)
        }
        roller()
    }
    /**
     * @memberof Sprite
     * @method
     * Pauses the animation
     */
    pause(){
        clearTimeout(this.loop)
    }
}