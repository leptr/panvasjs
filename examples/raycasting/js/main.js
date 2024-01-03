// Include the wall, ray, and camera files
include("./js/wall.js");
include("./js/ray.js");
include("./js/camera.js");

function setup() {
  // The canvas here is split into two halves, so we are defining the width and height of each half
  // Then later when creating the canvas we make it twice the width of the scene
  sceneW = 400;
  sceneH = 400;

  // Create the canvas
  canvas = createCanvas(sceneW * 2, sceneH);
  canvas.background(0);

  // The scene array will hold all of the distances between the camera and the walls it is looking at
  scene = [];

  // The walls array will hold all the walls that exist on the map
  walls = [];
  // Create walls for the scene edges
  walls.push(new Wall(0, 0, sceneW, 0, false));
  walls.push(new Wall(sceneW, 0, sceneW, sceneH, false));
  walls.push(new Wall(sceneW, sceneH, 0, sceneH, false));
  walls.push(new Wall(0, sceneH, 0, 0, false));

  // Create a few walls on the map
  // The positions of these walls do not matter, they can be placed anywhere on the map
  walls.push(new Wall(300, 100, 300, 300, true));
  walls.push(new Wall(100, 100, 200, 200, true));
  walls.push(new Wall(100, 300, 200, 300, true));

  // Create an instance of the camera
  camera = new Camera(0, 200);
}

function update() {
  // Update all of the walls in the walls array
  for (let wall of walls) wall.update();

  // Call the camera update method
  camera.update();

  canvas.stroke(255);
  canvas.lineWidth(1);
  // Draw a line in the middle of the canvas to visually split it into two halves
  canvas.line(sceneW, 0, sceneW, sceneH);

  // Iterate through all of the items in the scene and render them on screen as vertical lines
  for (let i = 0; i < scene.length; i++) {
    // Get the projection plane for the information from the rays
    let distProjectionPlane = abs(sceneW / 2 / tan(camera.fov / 2));

    // Calculate the global positions of the lines to make the code easier to understand
    let w = sceneW / scene.length;
    let h = (sceneH / scene[i]) * distProjectionPlane;
    let start = (sceneH - h) / 2;

    // The brightness of the line drawn is proportional to its distance from the camera
    // Look at each line as a slice of the wall that the camera is looking at
    // The further the "line" is from the camera, the further the wall is as well
    // Walls that are further away will appear darker, since the rays are illuminating the walls
    let brightness = map(scene[i], 0, sceneW, 200, 0);

    // Draw a line at the position of each scene item
    // All of these lines together will create a 3D effect that will make the full image look like a 3D render of the scene
    canvas.noStroke();
    canvas.fill(brightness);
    canvas.rect(i * w + sceneW, start, w + 1, h);
  }
}

// The keyDown function is called by PanvasJS every time a key is pressed
function keyDown() {
  switch (keyCode) {
    case KEY.A: // If the key is A, move the camera forward
      camera.rotate(RIGHT);
      break;
    case KEY.D: // If the key is D, rotate the camera to the right
      camera.rotate(LEFT);
      break;
    case KEY.W: // If the key is A, rotate the camera to the left
      camera.move(UP);
      break;
    case KEY.S: // If the key is S, move the camera backward
      camera.move(DOWN);
      break;
  }
}

// The keyUp function is called by PanvasJS every time a key is released
function keyUp() {
  if (keyCode === KEY.W || keyCode === KEY.S) camera.move(null); // If the key is W or S, stop camera movement
  else if (keyCode === KEY.A || keyCode === KEY.D) camera.rotate(null); // If the key is A or D, stop camera rotation
}
