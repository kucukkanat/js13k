module.exports = class Vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
    add(vector) {
        if(!(vector instanceof Vector)) throw new Error(`You should pass a Vector to add!`)
        return new Vector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        )
    }
    subtract(vector) {
        if(!vector instanceof Vector) throw new Error(`You should pass a Vector to add!`)
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z)
    }
    sub(vector){
        return this.subtract(vector)
    }
    scale(K) {
        return new Vector(this.x * K,this.y * K,this.z * K)
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    toString(){
        console.log(`${this.x} : ${this.y} : ${this.z}`)
    }
}

