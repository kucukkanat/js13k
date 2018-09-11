/**
 * @class Sprite
 */
module.exports = class Sprite{
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
        this.speed = props.speed || 1
    }
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
    pause(){
        clearTimeout(this.loop)
    }
}