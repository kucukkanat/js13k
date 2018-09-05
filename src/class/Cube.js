import GameObject from './GameObject';

export default class Cube extends GameObject {
  constructor(options) {
    super(options);

    this.draw = this.draw.bind(this);
  }

  getDisplacement(otherObject) {
    const self = {
      top: this.top(),
      bottom: this.bottom(),
    };

    const other = {
      top: otherObject.top(),
      bottom: otherObject.bottom(),
    };

    return {
      y: self.bottom - other.top,
    };
  }

  draw() {
    this.scene.context.beginPath();
    this.scene.context.rect(this.pos.x, this.pos.y, this.width, this.height);
    this.scene.context.stroke();
  }
}
