function Snake() {
  this.pos = createVector(randInt(cols), randInt(rows));
  this.pos.multiply(size);
  this.velocity = createVector(0, 1);
  this.velocity.multiply(size);

  this.tail = [];
  this.total = 0;

  this.show = () => {
    canvas.noStroke();
    canvas.fill(255);
    canvas.rect(this.pos.x, this.pos.y, size, size);
    for (piece of this.tail) {
      canvas.rect(piece.x, piece.y, size, size);
    }
  };

  this.grow = () => {
    this.total++;
    food = new Food();
  };

  this.move = dir => {
    switch (dir) {
      case UP:
        this.velocity = createVector(0, -1);
        this.velocity.multiply(size);
        break;
      case DOWN:
        this.velocity = createVector(0, 1);
        this.velocity.multiply(size);
        break;
      case RIGHT:
        this.velocity = createVector(1, 0);
        this.velocity.multiply(size);
        break;
      case LEFT:
        this.velocity = createVector(-1, 0);
        this.velocity.multiply(size);
        break;
    }
  };

  this.update = () => {
    if (distance(this.pos, food.pos) === 0) this.grow();

    if (this.total == this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        swap(this.tail, i, i + 1);
      }
    }
    if (this.total > 0) this.tail[this.total - 1] = this.pos.copy();

    this.pos.add(this.velocity);

    this.show();

    for (piece of this.tail) {
      if (distance(this.pos, piece) === 0) gameOver();
    }
  };
}
