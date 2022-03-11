function setup() {
  canvas = createCanvas(400);
  canvas.background(51);

  scale = 20;
  size = width / scale;

  framerate(10);

  snake = new Snake();
  food = new Food();
}

function update() {
  food.update();
  snake.update();
}

class Snake {
  constructor() {
    this.pos = createVector(0, 0);
    this.size = scale;

    this.dir = RIGHT;

    this.tail = [];
  }

  draw() {
    canvas.noStroke();
    canvas.fill(255);
    canvas.rect(this.pos.x * scale, this.pos.y * scale, this.size, this.size);

    for (let piece of this.tail) {
      canvas.rect(piece.x * scale, piece.y * scale, this.size, this.size);
    }
  }

  move() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
      if (this.pos.x === this.tail[i].x && this.pos.y === this.tail[i].y)
        this.death();
    }

    if (this.pos.x === food.pos.x && this.pos.y === food.pos.y) {
      this.tail.push({ x: this.pos.x, y: this.pos.y });
      food.relocate();
    } else {
      this.tail[this.tail.length - 1] = { x: this.pos.x, y: this.pos.y };
    }

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

    if (this.pos.x < 0) this.pos.x = size;
    else if (this.pos.x >= size) this.pos.x = 0;

    if (this.pos.y < 0) this.pos.y = size;
    else if (this.pos.y >= size) this.pos.y = 0;
  }

  death() {
    this.pos = createVector(0, 0);
    this.tail = [];

    food.relocate();
  }

  update() {
    this.move();
    this.draw();
  }
}

function keyDown() {
  switch (keyCode) {
    case KEY.UP_ARROW:
      if (snake.dir !== DOWN) snake.dir = UP;
      break;
    case KEY.RIGHT_ARROW:
      if (snake.dir !== LEFT) snake.dir = RIGHT;
      break;
    case KEY.DOWN_ARROW:
      if (snake.dir !== UP) snake.dir = DOWN;
      break;
    case KEY.LEFT_ARROW:
      if (snake.dir !== RIGHT) snake.dir = LEFT;
      break;
  }
}

class Food {
  constructor() {
    this.pos = createVector(0, 0);
    this.size = scale;

    this.relocate();
  }

  relocate() {
    this.pos = createVector(randInt(size), randInt(size));
  }

  draw() {
    canvas.noStroke();
    canvas.fill(255, 85, 85);
    canvas.rect(this.pos.x * scale, this.pos.y * scale, this.size, this.size);
  }

  update() {
    this.draw();
  }
}
