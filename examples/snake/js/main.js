// Include the snake and food files
include("./js/snake.js");
include("./js/food.js");

function setup() {
  // Create the canvas
  canvas = createCanvas(400);
  canvas.background(51);

  // Set the global scale of the elements we will draw later
  scale = 20;
  size = width / scale;

  // Lower the refresh rate so the game is slower
  // This is not a good practice as lowering the refresh rate slows down everything in the script
  // However, it is fine in this case
  framerate(10);

  // Create the new instances of the snake and the food
  snake = new Snake();
  food = new Food();
}

function update() {
  // Call the snake and food update methods
  food.update();
  snake.update();
}

// The keyDown function is called by PanvasJS every time a key is pressed
function keyDown() {
  switch (keyCode) {
    case KEY.UP_ARROW: // If the key is up arrow, move up
      if (snake.dir !== DOWN) snake.dir = UP; // If the snake is moving up, it cannot move down because it will collide with itself
      break;
    case KEY.RIGHT_ARROW: // If the key is right arrow, move right
      if (snake.dir !== LEFT) snake.dir = RIGHT; // If the snake is moving left, it cannot move right because it will collide with itself
      break;
    case KEY.DOWN_ARROW: // If the key is down arrow, move down
      if (snake.dir !== UP) snake.dir = DOWN; // If the snake is moving down, it cannot move up because it will collide with itself
      break;
    case KEY.LEFT_ARROW: // If the key is left arrow, move left
      if (snake.dir !== RIGHT) snake.dir = LEFT; // If the snake is moving right, it cannot move left because it will collide with itself
      break;
  }
}
