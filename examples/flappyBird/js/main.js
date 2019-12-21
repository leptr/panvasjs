let canvas;
let bird;
let gravity;
let pipes;
let pipeSpace;
let score;
let ended = false;

function setup() {
  canvas = createCanvas(400, 600);
  if (mobile) canvas.fullScreen();
  canvas.background(55, 194, 233);

  gravity = createVector(0, 0.5);

  pipeSpace = (width / 5) * 3;

  bird = new Bird();

  set();
}

function update() {
  canvas.noStroke();
  bird.applyForce(gravity);

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
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
  if (pipes[pipes.length - 1].x <= width - pipeSpace) pipes.push(new Pipe());
  if (pipes[0].x == -pipes[0].width) {
    stopAutoUpdate(pipes[0]);
    pipes.splice(0, 1);
  }

  canvas.textAlign("center");
  canvas.fill(255);
  canvas.text(score, width / 2, 40, 30, "Arial");
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
  pipes = [];
  pipes.push(new Pipe());
  score = 0;
  if (ended) canvas.playPause();
  ended = false;
}

function gameOver() {
  canvas.playPause();
  for (let pipe of pipes) {
    stopAutoUpdate(pipe);
  }
  canvas.clear();
  ended = true;
  canvas.fill(255);
  canvas.text("GAME OVER", width / 2, height / 2, 60, "Arial");
  let message = mobile ? "Tap the screen to restart" : "Press SPACE to restart";
  canvas.text(message, width / 2, height / 2 + 40, 30, "Arial");
}
