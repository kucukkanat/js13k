const Vector = require('class/Vector')
const {BodyType} = require('class/Constants')

module.exports = class GameObject {
    constructor(props) {
        this.position = new Vector(10, 10)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)

        this.width = 0
        this.height = 0
        this.body = BodyType.STATIC
        
        Object.assign(this, props)

        if(!this.scene) {
            throw new Error(`props.scene is undefined!`)
        }
        this.scene.add(this)
    }
    update() {
        if(this.body !== BodyType.STATIC) {
            this.position = this.position.add(this.velocity)
            this.velocity = this.velocity.add(this.acceleration)
        }
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