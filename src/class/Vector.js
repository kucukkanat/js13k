module.exports = class Vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
    add(vector) {
        return new Vector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        )
    }
    subtract(vector) {
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
}

