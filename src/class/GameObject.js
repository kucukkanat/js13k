const Vector = require('class/Vector')
const Scene = require('class/Scene')
const {BodyType} = require('class/Constants')

module.exports = class GameObject {
    constructor(props) {
        this.position = new Vector(10, 10)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)
        
        this.mass = 1
        this.width = 0
        this.height = 0
        this.body = BodyType.DYNAMIC

        // Override defaults
        Object.assign(this, props)
        

        if(!this.scene) throw new Error(`props.scene is undefined!`)
        if(!this.scene instanceof Scene) throw new Error(`props.scene is not a Scene object!`)

        // Add to the scene after constructing
        this.scene.add(this)
    }
    update() {
        if(this.body !== BodyType.STATIC) {
            this.position = this.position.add(this.velocity)
            this.velocity = this.velocity.add(this.acceleration)
        }
    }
    removeForces(){
        this.acceleration = new Vector(0,0,0)
    }
    applyForce(F){
        if(!(F instanceof Vector)) throw new Error(`Force should be a Vector!`)
        const acceleration = F.scale(1/this.mass) // F = m.a
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
    collisions(){

    }
}