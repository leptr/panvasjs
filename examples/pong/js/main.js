// Include the paddle and ball files
include("./js/paddle.js");
include("./js/ball.js");

function setup() {
  // Create the canvas
  canvas = createCanvas(800, 500);
  canvas.background(0);

  // Create the player 1 and player 2 paddles
  player1 = new Paddle(true);
  player2 = new Paddle(false);

  // Create the ball
  ball = new Ball();
}

function update() {
  // Update the players and ball
  player1.update();
  player2.update();

  ball.update();

  // Check if the ball is colliding with the paddles
  ball.checkCollision(player1);
  ball.checkCollision(player2);
}

// The keyDown function is called by PanvasJS every time a key is pressed
function keyDown() {
  switch (keyCode) {
    case KEY.W: // If the key is W, move the player 1 up
      player1.move(UP);
      break;
    case KEY.S: // If the key is S, move the player 1 down
      player1.move(DOWN);
      break;
    case KEY.O: // If the key is O, move the player 2 up
      player2.move(UP);
      break;
    case KEY.L: // If the key is L, move the player 2 down
      player2.move(DOWN);
      break;
  }
}

// The keyUp function is called by PanvasJS every time a key is released
function keyUp() {
  switch (keyCode) {
    case KEY.W: // If the key is W, stop player 1 movement
      player1.move(null);
      break;
    case KEY.S: // If the key is S, stop player 1 movement
      player1.move(null);
      break;
    case KEY.O: // If the key is O, stop player 2 movement
      player2.move(null);
      break;
    case KEY.L: // If the key is L, stop player 2 movement
      player2.move(null);
      break;
  }
}
