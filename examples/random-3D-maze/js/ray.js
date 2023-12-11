class Ray {
  constructor(x, y, a) {
    this.pos = createVector(x, y);
    this.dir = Vector.fromAngle(a);
  }

  setDirection(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  setAngle(a) {
    this.dir = Vector.fromAngle(a);
  }

  cast(wall) {
    let x1 = wall.a.x;
    let y1 = wall.a.y;
    let x2 = wall.b.x;
    let y2 = wall.b.y;

    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.dir.x;
    let y4 = this.pos.y + this.dir.y;

    let d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d === 0) return false;

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;

    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

    if (t > 0 && t < 1 && u > 0) {
      let p = createVector();
      p.x = x1 + t * (x2 - x1);
      p.y = y1 + t * (y2 - y1);
      return p;
    } else return false;
  }

  draw() {
    canvas.stroke(255);
    canvas.lineWidth(1);
  }

  update() {
    this.draw();
  }
}
