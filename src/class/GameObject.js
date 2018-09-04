export default class GameObject {
    constructor(properties = {}) {
        this.x = 0
        this.y = 0
        // Velocity
        this.dx = 0
        this.dy = 0
        // Acceleration
        this.ddx = 0
        this.ddy = 0

        for(key in properties) {
            this.props[key] = properties[key]
        }
    }
    update() {
        this.dx += this.ddx
        this.dy += this.ddy

        this.x += this.dx
        this.y += this.dy
    }
    draw() {
        
    }
}