// Include the paddle and ball files
include("./js/wall.js");
include("./js/maze.js");
include("./js/ray.js");
include("./js/camera.js");

function setup() {
  sceneW = 800;
  sceneH = 800;

  // Create the canvas
  canvas = createCanvas(sceneW, sceneH);
  canvas.background(0);

  // Define the global show mode
  // 1 means the 3D render is displayed
  // 0 means the 2D maze is displayed
  showMode = 1;

  // The scene array will hold all of the distances between the camera and the walls it is looking at
  scene = [];

  // The size variable is the size of each cell in the maze
  size = 80;

  // The walls array will hold all the walls that exist on the map
  walls = [];

  // Create a new maze and add all walls into the walls array
  walls = createMaze(sceneW / size, sceneH / size, size);

  // Create an instance of the camera
  camera = new Camera(size / 2, size / 2);
}

function update() {
  // Update all of the walls in the walls array
  for (let wall of walls) wall.update();

  // Call the camera update method
  camera.update();

  // If show mode is 1, draw the 3D render of all of the maze walls
  if (showMode === 1) {
    canvas.fill(0, 150, 190);
    canvas.rect(0, 0, sceneW, sceneH / 2);
    canvas.fill(60, 140, 60);
    canvas.rect(0, sceneH / 2, sceneW, sceneH);
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
      let v = map(scene[i], 0, sceneW, 200, 0);
      let clr = new Color(v / 2, 0, v);

      // Draw a line at the position of each scene item
      // All of these lines together will create a 3D effect that will make the full image look like a 3D render of the scene
      canvas.noStroke();
      canvas.fill(clr);
      canvas.rect(i * w, start, w + 1, h);
    }
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
