// Main Snake class
class Snake {
  constructor() {
    this.pos = createVector(0, 0);
    this.size = scale;

    this.dir = RIGHT;

    // The tail array will contain all tail sections of the snake
    this.tail = [];
  }

  // The draw method draws the snake head and the snake tail on the canvas
  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.rect(this.pos.x * scale, this.pos.y * scale, this.size, this.size);

    // Iterate through all pieces of the tail and draw them on the canvas
    for (let piece of this.tail) {
      canvas.rect(piece.x * scale, piece.y * scale, this.size, this.size);
    }
  }

  // The move method handles the movement for the snake
  move() {
    // Iterate through all pieces of the tail
    for (let i = 0; i < this.tail.length - 1; i++) {
      // Move all pieces down by one
      // This is done every frame, so that the oldest element is removed, and a new one is added
      // This way we achieve the illusion of the snake moving across the screen
      // In reality, we are removing the last piece of the tail and adding a new piece to it at the position of the head
      this.tail[i] = this.tail[i + 1];
      // If any of the pieces of the tail overlaps the head, the snake ran into itself and has died
      if (this.pos.x === this.tail[i].x && this.pos.y === this.tail[i].y) this.death();
    }

    // If the head overlaps the food, the snake has eaten the food and will grow
    // In this case, instead of making the new tail piece equal to the head, we push another piece toe the tail, extending it by 1
    if (this.pos.x === food.pos.x && this.pos.y === food.pos.y) {
      this.tail.push({ x: this.pos.x, y: this.pos.y });
      // Relocate the food as it has been eaten
      food.relocate();
    } else {
      // If the snake did not eat the food, make the new element equal to the current position of the head
      this.tail[this.tail.length - 1] = { x: this.pos.x, y: this.pos.y };
    }

    // Move the head based on the snake's direction
    switch (this.dir) {
      case UP:
        this.pos.y--;
        break;
      case RIGHT:
        this.pos.x++;
        break;
      case DOWN:
        this.pos.y++;
        break;
      case LEFT:
        this.pos.x--;
        break;
    }

    // Handle edge wrapping
    if (this.pos.x < 0) this.pos.x = size;
    else if (this.pos.x >= size) this.pos.x = 0;

    if (this.pos.y < 0) this.pos.y = size;
    else if (this.pos.y >= size) this.pos.y = 0;
  }

  // The death method resets the snake and the food i nthe case of the snake dying
  death() {
    this.pos = createVector(0, 0);
    this.tail = [];

    food.relocate();
  }

  // The update method calls the move and draw methods
  update() {
    this.move();
    this.draw();
  }
}
