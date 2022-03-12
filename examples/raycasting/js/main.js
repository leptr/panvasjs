include("./js/wall.js");
include("./js/ray.js");
include("./js/camera.js");

function setup() {
  sceneW = 400;
  sceneH = 400;

  canvas = createCanvas(sceneW * 2, sceneH);
  canvas.background(0);

  scene = [];

  walls = [];
  walls.push(new Wall(0, 0, sceneW, 0, false));
  walls.push(new Wall(sceneW, 0, sceneW, sceneH, false));
  walls.push(new Wall(sceneW, sceneH, 0, sceneH, false));
  walls.push(new Wall(0, sceneH, 0, 0, false));

  walls.push(new Wall(300, 100, 300, 300, true));
  walls.push(new Wall(100, 100, 200, 200, true));
  walls.push(new Wall(100, 300, 200, 300, true));

  camera = new Camera(0, 200);
}

function update() {
  for (let wall of walls) wall.update();

  camera.update();

  canvas.stroke(255);
  canvas.lineWidth(1);
  canvas.line(sceneW, 0, sceneW, sceneH);

  for (let i = 0; i < scene.length; i++) {
    let distProjectionPlane = abs(sceneW / 2 / tan(camera.fov / 2));

    let w = sceneW / scene.length;
    let h = (sceneH / scene[i]) * distProjectionPlane;
    let start = (sceneH - h) / 2;

    let brightness = map(scene[i], 0, sceneW, 200, 0);

    canvas.noStroke();
    canvas.fill(brightness);
    canvas.rect(i * w + sceneW, start, w + 1, h);
  }
}

function keyDown() {
  switch (keyCode) {
    case KEY.A:
      camera.rotate(RIGHT);
      break;
    case KEY.D:
      camera.rotate(LEFT);
      break;
    case KEY.W:
      camera.move(UP);
      break;
    case KEY.S:
      camera.move(DOWN);
      break;
  }
}

function keyUp() {
  if (keyCode === KEY.W || keyCode === KEY.S) camera.move(null);
  else if (keyCode === KEY.A || keyCode === KEY.D) camera.rotate(null);
}
