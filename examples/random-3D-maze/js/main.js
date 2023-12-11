include("./js/wall.js");
include("./js/maze.js");
include("./js/ray.js");
include("./js/camera.js");

function setup() {
  sceneW = 800;
  sceneH = 800;

  canvas = createCanvas(sceneW, sceneH);
  canvas.background(0);

  showMode = 1;

  scene = [];

  size = 80;

  walls = [];
  // walls.push(new Wall(0, 0, sceneW, 0, false));
  // walls.push(new Wall(sceneW, 0, sceneW, sceneH, false));
  // walls.push(new Wall(sceneW, sceneH, 0, sceneH, false));
  // walls.push(new Wall(0, sceneH, 0, 0, false));

  // walls.push(new Wall(300, 100, 300, 300, true));
  // walls.push(new Wall(100, 100, 200, 200, true));
  // walls.push(new Wall(100, 300, 200, 300, true));

  walls = createMaze(sceneW / size, sceneH / size, size);

  camera = new Camera(size / 2, size / 2);
}

function update() {
  for (let wall of walls) wall.update();

  camera.update();

  canvas.stroke(255);
  canvas.lineWidth(1);
  canvas.line(sceneW, 0, sceneW, sceneH);

  if (showMode === 1) {
    canvas.fill(0, 150, 190);
    canvas.rect(0, 0, sceneW, sceneH / 2);
    canvas.fill(60, 140, 60);
    canvas.rect(0, sceneH / 2, sceneW, sceneH);
    for (let i = 0; i < scene.length; i++) {
      let distProjectionPlane = abs(sceneW / 2 / tan(camera.fov / 2));

      let w = sceneW / scene.length;
      //let h = map(scene[i], 0, sceneW, sceneH, 0);
      let h = (sceneH / scene[i]) * distProjectionPlane;
      //let h = (1 / scene[i]) * 100 * sceneH;
      let start = (sceneH - h) / 2;

      let v = map(scene[i], 0, sceneW, 200, 0);
      let clr = new Color(v / 2, 0, v);

      canvas.noStroke();
      canvas.fill(clr);
      canvas.rect(i * w, start, w + 1, h);
    }
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
    case KEY.M:
      showMode = (showMode + 1) % 2;
  }
}

function keyUp() {
  if (keyCode === KEY.W || keyCode === KEY.S) camera.move(null);
  else if (keyCode === KEY.A || keyCode === KEY.D) camera.rotate(null);
}
