include("./js/paddle.js");
include("./js/ball.js");

function setup() {
  canvas = createCanvas(800, 500);
  canvas.background(0);

  player1 = new Paddle(true);
  player2 = new Paddle(false);

  ball = new Ball();
}

function update() {
  player1.update();
  player2.update();

  ball.update();

  ball.checkCollision(player1);
  ball.checkCollision(player2);
}

function keyDown() {
  switch (keyCode) {
    case KEY.W:
      player1.move(UP);
      break;
    case KEY.S:
      player1.move(DOWN);
      break;
    case KEY.O:
      player2.move(UP);
      break;
    case KEY.L:
      player2.move(DOWN);
      break;
  }
}

function keyUp() {
  switch (keyCode) {
    case KEY.W:
      player1.move(null);
      break;
    case KEY.S:
      player1.move(null);
      break;
    case KEY.O:
      player2.move(null);
      break;
    case KEY.L:
      player2.move(null);
      break;
  }
}
