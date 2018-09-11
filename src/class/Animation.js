module.exports = class Animation extends Sprite {
    /**
     * @class Animation
     * @param {object} props - Properties
     * @param {number} props.animationIndex
     * @param {number} props.speed
     */
    constructor(props){
        super(props)
        this.tick = 0
        this.loop = null
        this.frames = props.frames || 1
        this.animationIndex = props.animationIndex || 0
        this.speed = props.speed || 200
    }
    /**
     * @memberof Animation
     */
    play(){
        const roller = ()=>{
            if(this.tick < this.frames - 1) {
                this.tick += 1
            } else {
                this.tick = 0
            }
            this.x = this.tick * this.width
        }
        this.loop = setTimeout(roller,this.speed)
    }
    /**
     * @memberof Animation
     */
    pause(){
        clearTimeout(this.loop)
    }
}