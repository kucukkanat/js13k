import Scene from 'class/Scene'

export default class GameObject {
    constructor(scene) {
        this.x = 0
        this.y = 0
        // Velocity
        this.dx = 0
        this.dy = 0
        // Acceleration
        this.ddx = 0
        this.ddy = 0
        
        if(!scene || !(scene instanceof Scene)) {
            throw new Error('Where am I going to draw this? On your wall ?')
        }
        // Add this to scene actors
        scene.actors.push(this)
        this.scene = scene
        this.canvas = scene.canvas
        this.context = scene.canvas.getContext("2d")
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