module.exports = class Vector {
    /**
     * @class Vector
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     */
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
    /**
     * 
     * @memberof Vector 
     * @param {Vector} vector
     * @returns {Vector} Added value
     */
    add(vector) {
        if(!(vector instanceof Vector)) throw new Error(`You should pass a Vector to add!`)
        return new Vector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        )
    }
    /**
     * 
     * @memberof Vector 
     * @param {Vector} vector
     * @returns {Vector} Subtracted value
     */
    subtract(vector) {
        if(!vector instanceof Vector) throw new Error(`You should pass a Vector to add!`)
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z)
    }
    /**
     * @memberof Vector
     * @alias subtract
     */
    sub(vector){
        return this.subtract(vector)
    }
    /**
     * @memberof Vector 
     * @param {number} Size to scale
     * @returns {Vector} Scaled value
     */
    scale(K) {
        return new Vector(this.x * K,this.y * K,this.z * K)
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    /**
     * @memberof Vector 
     * Simply prints to console
     */
    toString(){
        console.log(`${this.x} : ${this.y} : ${this.z}`)
    }
}

