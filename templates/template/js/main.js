function setup() {
  canvas = createCanvas(400, 400);
  canvas.background(33, 33, 69);
}

function update() {
  canvas.fill(255, 106, 106);
  canvas.circle(mouseX, mouseY, 50);
}
