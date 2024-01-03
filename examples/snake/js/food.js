// Main Food class
class Food {
  constructor() {
    // The food is only defined by its position
    this.pos = createVector(0, 0);
    this.size = scale;

    this.relocate();
  }

  // The relocate method picks a new position for the food
  relocate() {
    this.pos = createVector(randInt(size), randInt(size));
  }

  // The draw method draws the food on the canvas as a rectangle
  draw() {
    canvas.noStroke();
    canvas.fill(255, 85, 85);
    canvas.rect(this.pos.x * scale, this.pos.y * scale, this.size, this.size);
  }

  // The update method calls the draw method; this is unnecessary here, but is kept for the sake of consistency with the standard used throughout PanvasJS
  update() {
    this.draw();
  }
}
