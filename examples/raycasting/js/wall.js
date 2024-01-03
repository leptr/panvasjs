// Main Wall class
class Wall {
  constructor(x1, y1, x2, y2, shouldDraw) {
    // The wall is defined by two vectors and their positions
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);

    this.shouldDraw = shouldDraw;
  }

  // The draw method draws a line between the start and end point of the wall
  draw() {
    if (this.shouldDraw) {
      canvas.stroke(255);
      canvas.lineWidth(2);
      canvas.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }

  // The update method calls the draw method; this is unnecessary here, but is kept for the sake of consistency with the standard used throughout PanvasJS
  update() {
    this.draw();
  }
}
