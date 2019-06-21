let canvas;
let bird;
let gravity;
let pipes;
let pipeSpace;
let score;
let ended = false;

function setup() {
  canvas = createCanvas(innerWidth, innerHeight);
  if (!mobile) canvas.setSize(400, 600);
  canvas.background(55, 194, 233);

  gravity = createVector(0, 0.5);

  pipeSpace = (Width / 5) * 3;

  set();
}

function update() {
  canvas.noStroke();
  bird.applyForce(gravity);
  bird.update();

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.update();
    if (
      bird.pos.x + bird.r >= pipe.x &&
      bird.pos.x - bird.r <= pipe.x + pipe.width
    ) {
      if (!pipe.passed) {
        pipe.passed = true;
        score++;
      }
      if (
        bird.pos.y - bird.r <= pipe.y ||
        bird.pos.y + bird.r >= pipe.y + pipe.margin
      ) {
        gameOver();
        break;
      }
    }
  }
  if (pipes[pipes.length - 1].x <= Width - pipeSpace) pipes.push(new Pipe());
  if (pipes[0].x == -pipes[0].width) pipes.splice(0, 1);

  canvas.textAlign("center");
  canvas.fill(255);
  canvas.text(score, Width / 2, 40, 30, "Arial");
}

function keyDown() {
  if (keyCode === 32) {
    if (ended) set();
    else bird.jump();
  }
}

function touchStart() {
  if (ended) set();
  else bird.jump();
}

function set() {
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  score = 0;
  if (ended) canvas.playPause();
  ended = false;
}

function gameOver() {
  canvas.playPause();
  canvas.clear();
  ended = true;
  canvas.fill(255);
  canvas.text("GAME OVER", Width / 2, Height / 2, 60, "Arial");
  let message = mobile ? "Tap the screen to restart" : "Press SPACE to restart";
  canvas.text(message, Width / 2, Height / 2 + 40, 30, "Arial");
}
