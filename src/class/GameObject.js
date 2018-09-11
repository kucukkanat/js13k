const Vector = require('class/Vector')
const Scene = require('class/Scene')
const Sprite = require('class/Sprite')

const {
    BodyType
} = require('class/Constants')
const AssetManager = require('class/AssetManager')

module.exports = class GameObject {
    /**
     * @class GameObject
     * @param {object} props 
     * @param {Vector} props.position
     * @param {Vector} props.velocity
     * @param {Vector} props.acceleration
     * 
     * @param {number} props.mass
     * @param {number} props.width
     * @param {number} props.height
     * @param {Sprite} props.sprite
     * 
     */
    constructor(props) {
        this.position = new Vector(10, 10)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)

        this.mass = 1
        this.width = 20
        this.height = 20
        this.body = BodyType.DYNAMIC
        this.tick=0
        this.animationIndex=0
        this.sprite = null
        
        // Override defaults
        Object.assign(this, props)
        if (!this.sprite instanceof Sprite) throw new Error(`Sprite must be an instance of Sprite class!`)
        if (!this.scene) throw new Error(`props.scene is undefined!`)
        if (!this.scene instanceof Scene) throw new Error(`props.scene is not a Scene object!`)

        // Add to the scene after constructing
        this.scene.add(this)
    }
    /**
     * @memberof GameObject
     * Updates the GameObject every frame
     */
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
    /**
     * @memberof GameObject
     * Removes all forces (acceleration) on the object
     */
    removeForces() {
        this.acceleration = new Vector(0, 0, 0)
    }
    /**
     * @memberof GameObject
     * @param {Vector} force
     */
    applyForce(F) {
        if (!(F instanceof Vector)) throw new Error(`Force should be a Vector!`)
        const acceleration = F.scale(1 / this.mass) // F = m.a
        this.acceleration = this.acceleration.add(acceleration)
    }
    /**
     * @memberof GameObject
     * @returns {number} x - The middle position on x axis
     */
    midX(){
        return this.position.x + this.width/2
    }
    /**
     * @memberof GameObject
     * @returns {number} y - The middle position on y axis
     */
    midY(){
        return this.position.y + this.height/2
    }
    /**
     * @memberof GameObject
     * @returns {number} y - The top point on y axis
     */
    top() {
        return this.position.y;
    }
    /**
     * @memberof GameObject
     * @returns {number} y - The bottom point on y axis
     */
    bottom() {
        return this.position.y + this.height;
    }
    /**
     * @memberof GameObject
     * @returns {number} x - The leftmost point on x axis
     */
    left() {
        return this.position.x;
    }
    /**
     * @memberof GameObject
     * @returns {number} x - The rightmost point on x axis
     */
    right() {
        return this.position.x + this.width;
    }
    onCollide(){}
    /**
     * @memberof GameObject
     * @returns {GameObject[]} Array of collides objects
     */
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
                    // Correction - save the GameObject from merging the other actor
                    console.log(this.bottom(),actor.top())
                    this.position.y -= this.velocity.y
                    
                } else {
                    if(this.velocity.x > 0) {
                        collidedActors.push({actor,direction:'left'})
                    } else if (this.velocity.x < 0) {
                        collidedActors.push({actor,direction:'right'})
                    } 
                    // Correction - save the GameObject from merging the other actor
                    this.position.x -= this.velocity.x
                }
            }
        }
        return collidedActors
    }
    /**
     * @memberof GameObject
     * @param {string} key - The key code
     * @param {function} cb - function to call
     */
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
    /**
     * @memberof GameObject
     * @param {string} key - The key code
     * @param {function} cb - function to call
     */
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
    /**
     * @memberof GameObject
     * @param {string} key - The key code
     * @param {function} cb - function to call
     */
    onKeypress(key,cb){
        document.addEventListener('keypress',event => {
            const code = event.code.toLowerCase()
            if(key === code){
                cb.apply(this)
            }
        })
    }
    /**
     * @memberof GameObject
     * Draws the gameobject if it has a sprite
     */
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