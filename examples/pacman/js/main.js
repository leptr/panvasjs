// NOTE: this is old code from 2019 using the older version of PanvasJS that I developed back in highschool
// This was my final project for the end of last year of high school for my programming class
// Fun fact: this version of PanvasJS was fully developed on my phone during class, when I should have been paying attention
// I later refactored the code on my PC and created what PanvasJS is today, good old times...

function setup() {
  createCanvas(500, 500);
  background(0);

  terrain = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [3, 3, 3, 3, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 3, 3, 3, 3],
    [3, 3, 3, 3, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 3, 3, 3, 3],
    [3, 3, 3, 3, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 3, 3, 3, 3],
    [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 3, 3, 3, 3, 3, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 3, 3, 3, 3, 3, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [3, 3, 3, 3, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 3, 3, 3, 3],
    [3, 3, 3, 3, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 3, 3, 3, 3],
    [3, 3, 3, 3, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 3, 3, 3, 3],
    [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  tiles = 25;
  size = 20;

  image = document.getElementById("heart");

  set();
}

function set() {
  ended = false;
  framerate(100);
  foods = 0;
  field = [];
  for (let i = 0; i < tiles; i++) field[i] = [];

  for (let i = 0; i < tiles; i++) {
    for (let j = 0; j < tiles; j++) {
      if (terrain[i][j] == 1) field[j][i] = new Tile(j * size, i * size);
      else if (terrain[i][j] == 2) field[j][i] = new Slab(j * size, i * size);
      else if (terrain[i][j] == 0) {
        field[j][i] = field[j][i] = new Food(j * size, i * size);
        foods++;
      } else field[j][i] = field[j][i] = new Blank();
    }
  }

  player = new Player();
  enemies = [];
  for (i = 0; i < 4; i++) enemies[i] = new Enemy();
}

function keyDown() {
  switch (keyCode) {
    case 32:
      if (ended) set();
      break;
    case 37:
      player.move("left");
      break;
    case 38:
      player.move("up");
      break;
    case 39:
      player.move("right");
      break;
    case 40:
      player.move("down");
      break;
  }
}

function end(res) {
  playPause();
  ended = true;
  getContext(canvas).font = "90px Arial";
  getContext(canvas).textAlign = "center";
  fill(255);
  if (res == "lost") {
    getContext(canvas).fillText("You lost!", 250, 200);
  } else if (res == "won") {
    getContext(canvas).fillText("You won!", 250, 200);
  }
  getContext(canvas).font = "30px Arial";
  getContext(canvas).fillText("Press SPACE to restart", 250, 250);
}

function loop() {
  let countedFoods = 0;
  getContext(canvas).clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < tiles; i++) {
    for (let j = 0; j < tiles; j++) {
      if (field[i][j]) {
        field[i][j].draw();
        if (field[i][j].isFood) countedFoods++;
      }
    }
  }
  if (countedFoods != foods) foods = countedFoods;

  player.update();
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    if (enemies[i].showX == player.showX && enemies[i].showY == player.showY) {
      if (player.canEat) enemies[i].reset();
      else player.reset();
    }
  }
  if (player.lives == 0) end("lost");
  if (foods == 0) end("won");

  for (i = 0; i < player.lives; i++) {
    getContext(canvas).drawImage(image, i * size, 0);
  }
}
