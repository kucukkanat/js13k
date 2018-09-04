export default class ClickIndicator {
    constructor(scene) {
        this.scene = scene
        scene.canvas.addEventListener('click', (event) => {
            var rect = scene.canvas.getBoundingClientRect();
            const pos =  {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            }
            this.draw(pos)
        })
    }
    draw(pos) {
        this.scene.context.beginPath();
        this.scene.context.arc(pos.x, pos.y, 20, 0, 2*Math.PI);

        this.scene.context.fillStyle = '#FF0000'
        this.scene.context.fill()
        this.scene.context.stroke()
    }
}