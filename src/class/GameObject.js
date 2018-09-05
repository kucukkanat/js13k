import Scene from './Scene';
import Vector from './Vector';
import { BodyType } from './Constants';

export default class GameObject {
  constructor(options) {
    this.pos = new Vector(0, 0);

    // Velocity
    this.velocity = new Vector(0, 0);

    this.forces = [];

    this.body = BodyType.RIGID;

    Object.assign(this, options);

    if (!this.scene || !(this.scene instanceof Scene)) {
      throw new Error('Where am I going to draw this? On your wall ?');
    }
    // Add this to scene actors
    this.scene.add(this);
    this.canvas = this.scene.canvas;
    this.context = this.scene.canvas.getContext('2d');
  }

  update() {
    if (this.body === BodyType.STATIC) {
      return;
    }

    const a = this.getAcceleration();

    this.forces = [];

    const oldVelocity = this.velocity.clone();
    const oldPosition = this.pos.clone();

    this.velocity.add(a);
    this.pos.add(this.velocity);

    if (this.collides()) {
      this.velocity.y = -oldVelocity.y * 0.6;

      this.pos = oldPosition.add(this.velocity);
    }
  }

  getAcceleration() {
    return this.forces.reduce((acc, force) => acc.add(force), new Vector());
  }

  applyForce(force) {
    this.forces.push(force);
  }

  top() {
    return this.pos.y;
  }

  bottom() {
    return this.pos.y + this.height;
  }

  left() {
    return this.pos.x;
  }

  right() {
    return this.pos.x + this.width;
  }

  collisions() {
    const collidedObjects = this.scene.actors.filter(actor => {
      const collides =
        !(
          this.right() < actor.left() ||
          this.bottom() < actor.top() ||
          this.left() > actor.right() ||
          this.top() > actor.bottom()
        ) && actor != this;

      return collides;
    });
    return collidedObjects;
  }
  collides() {
    return this.collisions().length > 0;
  }
  draw() {}
}
