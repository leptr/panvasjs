// Include the pipe and bird files
include("./js/pipe.js");
include("./js/bird.js");

function setup() {
  // Create the canvas
  canvas = createCanvas(400, 600);
  canvas.background(100, 100, 255);

  // Create the global gravity vector, a downwards pointed vector
  gravity = createVector(0, 0.6);

  // The global score variable
  score = 0;

  // Create the bird and the pipe
  pipe = new Pipe();
  bird = new Bird();
}

function update() {
  // Call the bird and pipe update methods
  pipe.update();
  bird.update();

  // Display the player score on the canvas
  canvas.fill(255);
  canvas.textAlign(CENTER);
  canvas.text(score, width / 2, 70, 70, "Roboto");
}

// Restart function is called if the bird collides with the pipe
// It resets the player score, and creates a new instance of the bird and the pipe
function restart() {
  score = 0;
  bird = new Bird();
  pipe = new Pipe();
}

// The keyDown function is called by PanvasJS every time a key is pressed
// If the key is the space button, make the bird jump
function keyDown(keyCode) {
  if (keyCode === KEY.SPACE) bird.jump();
}
