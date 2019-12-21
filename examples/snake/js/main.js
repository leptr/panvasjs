function setup() {
  canvas = createCanvas(500, 500);
  if (mobile) canvas.setSize(innerWidth);
  canvas.background(51);
  framerate(10);
  rows = 25;
  cols = rows;
  size = width / cols;

  set();
}

function update() {
  if (snake.pos.isOffScreen()) gameOver();
}

function set() {
  food = new Food();
  snake = new Snake();
  gameover = false;
  canvas.play();
}

function gameOver() {
  gameover = true;
  stopAutoUpdate(snake);
  stopAutoUpdate(food);
  canvas.pause();
  canvas.clear();
  canvas.textAlign(CENTER);
  canvas.fill(255);
  canvas.text("GAME OVER", width / 2, 220, 50, "Arial");
  let message = mobile ? "Tap the screen to restart" : "Press SPACE to restart";
  canvas.text(message, width / 2, 260, 30, "Arial");
}

function keyDown() {
  switch (keyCode) {
    case 27:
      if (canvas.isPaused) {
        canvas.play();
      } else {
        canvas.pause();
        canvas.clear();
        canvas.textAlign(CENTER);
        canvas.fill(255);
        canvas.text("Game paused", width / 2, height / 2, 60, "Arial");
        let message = "Press ESC to continue";
        canvas.text(message, width / 2, height / 2 + 40, 30, "Arial");
      }
      break;
    case 32:
      if (gameover) set();
      break;
    case 37: // left arrow key
      snake.move(LEFT);
      break;
    case 38: // up arrow key
      snake.move(UP);
      break;
    case 39: // right arrow key
      snake.move(RIGHT);
      break;
    case 40: // down arrow key
      snake.move(DOWN);
      break;
  }
}

function touchStart() {
  if (gameover) set();
}

function swipe(dir) {
  switch (dir) {
    case UP:
      snake.move("up");
      break;
    case DOWN:
      snake.move("down");
      break;
    case LEFT:
      snake.move("left");
      break;
    case RIGHT:
      snake.move("right");
      break;
  }
}
