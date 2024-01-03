// Main Ray class
class Ray {
  constructor(x, y, a) {
    // The ray is defined by a position and direction
    this.pos = createVector(x, y);
    this.dir = Vector.fromAngle(a);
    // The offset is the angle of the ray relative to the source
    this.offset = a;
  }

  // The setDirection method allows us to change the direction of the ray on the go
  setDirection(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  // The setAngle method allows us to change the change the angle offset of the ray
  setAngle(a) {
    this.dir = Vector.fromAngle(a);
    this.offset = a;
  }

  // The cast method casts the ray based on the position and direction
  cast(wall) {
    // Get all the paramaters for the wall position
    let x1 = wall.a.x;
    let y1 = wall.a.y;
    let x2 = wall.b.x;
    let y2 = wall.b.y;

    // Get all the paramaters for the ray start and end points
    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.dir.x;
    let y4 = this.pos.y + this.dir.y;

    // Calculate if the ray is colliding with the wall
    // More information on the method used can be found on the Ray Casting page on Wikipedia
    // https://en.wikipedia.org/wiki/Ray_casting
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

  // The draw method draws the ray as a line on the canvas
  draw() {
    canvas.stroke(255);
    canvas.lineWidth(1);
  }

  // The update method calls the draw method; this is unnecessary here, but is kept for the sake of consistency with the standard used throughout PanvasJS
  update() {
    this.draw();
  }
}
