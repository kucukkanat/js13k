import GameObject from 'class/GameObject';

export default class Ball extends GameObject {
  constructor(scene, r) {
    super(scene);

    this.r = 20;
    this.dr = 0;
    this.width = this.r;
    this.height = this.r;
    this.solid = true;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }
  update() {
    super.update();
    this.r += this.dr;

    if (this.collides()) {
      this.dy = -this.dy;
    }
    if (this.y < 100) {
      this.dy = 0;
    }
  }
  draw() {
    this.scene.context.beginPath();
    this.scene.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.scene.context.stroke();
  }
}
