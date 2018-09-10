const Vector = require('class/Vector')
const Scene = require('class/Scene')

const {
    BodyType
} = require('class/Constants')
const AssetManager = require('class/AssetManager')
module.exports = class GameObject {
    constructor(props) {
        this.position = new Vector(10, 10)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)

        this.mass = 1
        this.width = 0
        this.height = 0
        this.body = BodyType.DYNAMIC
        this.tick=0
        this.animationIndex=0
        this.sprite = null
        
        // Override defaults
        Object.assign(this, props)


        if (!this.scene) throw new Error(`props.scene is undefined!`)
        if (!this.scene instanceof Scene) throw new Error(`props.scene is not a Scene object!`)

        // Add to the scene after constructing
        this.scene.add(this)
    }
    update() {
        if (this.body !== BodyType.STATIC) {
            this.position = this.position.add(this.velocity)
            this.velocity = this.velocity.add(this.acceleration)
        }
    }
    removeForces() {
        this.acceleration = new Vector(0, 0, 0)
    }
    applyForce(F) {
        if (!(F instanceof Vector)) throw new Error(`Force should be a Vector!`)
        const acceleration = F.scale(1 / this.mass) // F = m.a
        this.acceleration = this.acceleration.add(acceleration)
    }
    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.height;
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.width;
    }
    collisions() {
        for (let i = 0; i < this.scene.actors.length; i++) {
            const actor = this.scene.actors[i]
            const midDistanceX = Math.abs((this.left() + (this.width / 2)) - (actor.left() + (actor.width / 2)))
            const midDistanceY = Math.abs((this.top() + (this.height / 2)) - (actor.top() + (actor.height / 2)))
            const hWidth = this.width / 2 + actor.width / 2
            const hHeight = this.height / 2 + actor.height / 2
            const collides = midDistanceX < hWidth && midDistanceY < hHeight && this !== actor
            if(collides){
                const collideX = hWidth - midDistanceX
                const collideY = hHeight - midDistanceY
                
                // If vertically collided (y-axis)
                if(collideY < collideX) {
                    if(this.velocity.y > 0) {
                        return 'top'
                    } else {
                        return 'bottom'
                    }
                } else {
                    if(this.velocity.x > 0) {
                        return 'left'
                    } else {
                        return 'right'
                    }
                }
            }
            
        }
    }
    onKeydown(key,cb){
        document.addEventListener('keydown',event => {
            const code = event.code.toLowerCase()
            if(key === code){
                cb.apply(this)
            } else if(key === 'any') {
                cb.apply(this)
            }
        })
    }
    onKeyup(key,cb){
        document.addEventListener('keyup',event => {
            const code = event.code.toLowerCase()
            if(key === code){
                cb.apply(this)
            } else if(arguments.length === 1) {
                arguments[0].apply(this)
            }
        })
    }
    onKeypress(key,cb){
        document.addEventListener('keypress',event => {
            const code = event.code.toLowerCase()
            if(key === code){
                cb.apply(this)
            }
        })
    }
    animation(index,frames,speed) {
        // Dont restart the same animation (for keydown or repeating events)
        if(index === this.animationIndex) return

        // Clear previous animation
        clearTimeout(this.loop)
        this.animationIndex = index
        this.tick = 0
        const frameRoller = () => {
            if(this.tick < frames - 1){
                this.tick += 1
            } else {
                this.tick = 0
            }
            this.loop = setTimeout(frameRoller,speed)
        }
        frameRoller()
    }
    draw(){
        if(this.sprite){
            this.scene.context.drawImage(
                this.sprite.image, 
                this.sprite.x, //source x
                this.sprite.y, // source y
                this.sprite.width, // source width
                this.sprite.height, // source height
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height
            )
        }
    }
}