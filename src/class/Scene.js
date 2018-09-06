const AssetManager = require('class/AssetManager')
const {
  GRAVITY,
  BodyType
} = require('class/Constants')

module.exports = class Scene {
  constructor(props={}) {
    this.actors = []
    this.canvas = document.getElementById(props.canvas) || props.canvas || document.createElement('canvas')
    this.canvas.height = props.height || 480
    this.canvas.width = props.height || 640
    
    Object.assign(this, props)
    
    this.AssetManager = AssetManager;
    this.context = this.canvas.getContext('2d');
  }
  add(actor) {
    this.actors.push(actor);
  }
  draw() {
    // Draws all scene actors
    for (let index = 0; index < this.actors.length; index++) {
      const actor = this.actors[index];
      actor.update();
      actor.draw();
    }
  }
  addToBody() {
    document.body.appendChild(this.canvas);
  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}