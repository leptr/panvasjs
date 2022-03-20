include("./js/pipe.js");
include("./js/bird.js");

function setup() {
  canvas = createCanvas(400, 600);
  canvas.background(100, 100, 255);

  gravity = createVector(0, 0.6);

  score = 0;

  pipe = new Pipe();
  bird = new Bird();
}

function update() {
  pipe.update();
  bird.update();

  canvas.fill(255);
  canvas.textAlign(CENTER);
  canvas.text(score, width / 2, 70, 70, "Roboto");
}

function restart() {
  score = 0;
  bird = new Bird();
  pipe = new Pipe();
}

function keyDown() {
  if (keyCode === KEY.SPACE) bird.jump();
}
