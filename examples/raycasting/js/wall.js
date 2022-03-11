class Wall {
  constructor(x1, y1, x2, y2, shouldDraw) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);

    this.shouldDraw = shouldDraw;
  }

  draw() {
    if (this.shouldDraw) {
      canvas.stroke(255);
      canvas.lineWidth(2);
      canvas.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }

  update() {
    this.draw();
  }
}
