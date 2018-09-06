const AssetManager = require('class/AssetManager')
const {
  GRAVITY,
  BodyType
} = require('class/Constants')

module.exports = class Scene {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas) || canvas || document.createElement('canvas')

    if (!canvas) {
      this.canvas.height = 480
      this.canvas.width = 640
    }

    this.AssetManager = AssetManager;
    this.context = this.canvas.getContext('2d');
    this.actors = []
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