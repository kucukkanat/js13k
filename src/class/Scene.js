export default class Scene {
    constructor(canvas) {
        this.canvas = document.getElementById(canvas) || canvas || document.createElement('canvas')
        if(!canvas){
            this.canvas.height = 400
            this.canvas.width = 600
        }
        this.context = this.canvas.getContext("2d")
    }
    addToBody(){
        document.body.appendChild(this.canvas)
    }
}