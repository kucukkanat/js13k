export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;

    return this;
  }

  addX(x) {
    this.x += x;
    return this;
  }

  addY(y) {
    this.y += y;
    return this;
  }

  subX(x) {
    this.x -= x;
    return this;
  }

  subY(y) {
    this.y -= y;
    return this;
  }

  mul(val) {
    this.x *= val;
    this.y *= val;
    return this;
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}
