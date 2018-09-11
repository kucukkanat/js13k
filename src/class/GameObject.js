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
        // Run onCollide function if collides
        const collisions = this.collisions()
        if(collisions.length > 0){
            this.onCollide(collisions)
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
    midX(){
        return this.position.x + this.width/2
    }
    midY(){
        return this.position.y + this.height/2
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
    onCollide(){}
    collisions() {
        const collidedActors = []
        for (let i = 0; i < this.scene.actors.length; i++) {
            const actor = this.scene.actors[i]
            const midDistanceX = Math.abs(this.midX() - actor.midX())
            const midDistanceY = Math.abs(this.midY() - actor.midY())
            const hWidth = this.width / 2 + actor.width / 2
            const hHeight = this.height / 2 + actor.height / 2
            const collides = midDistanceX < hWidth && midDistanceY < hHeight && this !== actor
            if(collides){
                const collideX = hWidth - midDistanceX
                const collideY = hHeight - midDistanceY
                
                // If vertically collided (y-axis)
                if(collideY < collideX) {
                    if(this.velocity.y > 0) {
                        collidedActors.push({actor,direction:'top'})
                    } else if (this.velocity.y < 0) {
                        collidedActors.push({actor,direction:'bottom'})
                    } 
                    
                } else {
                    if(this.velocity.x > 0) {
                        collidedActors.push({actor,direction:'left'})
                    } else if (this.velocity.x < 0) {
                        collidedActors.push({actor,direction:'right'})
                    } 
                    
                }
            }
        }
        return collidedActors
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