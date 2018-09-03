export default class Canvas {
    constructor(canvas) {
        this.canvas = document.getElementById(canvas) || canvas || document.createElement('canvas')
    }
}