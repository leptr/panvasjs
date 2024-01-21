// isMobile function determines if the web page is opened on a mobile device

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Variables used for handling user interaction
let keyCode, mouseX, mouseY, cMouseX, cMouseY, canvasX, canvasY;
let touches = [];
let touchX, touchY, prevTouchX, prevTouchY;
let mousePressed = false;

// Mathematical variables
const PI = Math.PI;
const TWO_PI = 2 * PI;
const HALF_PI = PI / 2;
const E = Math.E;
const SQRT2 = Math.SQRT2;
const SQRT1_2 = Math.SQRT1_2;
const LN2 = Math.LN2;
const LN10 = Math.LN10;
const LOG2E = Math.LOG2E;
const LOG10E = Math.LOG10E;

// Directional variables
let UP, DOWN, LEFT, RIGHT, CENTER, START, END, CORNER;
let mobile;

// Canvas variables
let width, height;
let innerWidth, innerHeight;
let can;
let frameRate = 60;
let interval = undefined;
let frameCount = 0;
let hasACanvas = true;

// Array used for auto updating objects
const updateable = [];

// Library that handles key codes
const KEY = {
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,

  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,

  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,

  NUM0: 96,
  NUM1: 97,
  NUM2: 98,
  NUM3: 99,
  NUM4: 100,
  NUM5: 101,
  NUM6: 102,
  NUM7: 103,
  NUM8: 104,
  NUM9: 105,

  ESC: 27,
  TAB: 9,
  CAPS_LOCK: 20,
  LEFT_SHIFT: 16,
  CONTROL: 17,
  SPACE: 32,
  CONTEXT_MENU: 93,
  RIGHT_SHIFT: 16,
  ENTER: 13,
  BACKSPACE: 8,
  ALT: 18,

  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,

  PAUSE: 19,
  DELETE: 46,
  HOME: 36,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
};

// Main Canvas class
class Canvas {
  constructor(width_, height_, canvas_) {
    // Handle canvas size
    this.width = width_ || 100;
    this.height = height_ || this.width;

    // Determine if an existig canvas is being used or if a new one should be created
    if (!canvas_) {
      this.canvas = document.createElement("CANVAS");
      document.body.appendChild(this.canvas);
    } else this.canvas = canvas_;

    // Update global variables
    width = this.width;
    height = this.height;

    // Get canvas context used for manipulating the canvas
    this.ctx = this.canvas.getContext("2d");

    // Allow accessing the canvas element through a global variable
    can = this;

    // Handle canvas internal size variables
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Calling the loop function in an interval determined by the global framerate variable
    interval = setInterval(loop, 1000 / frameRate);

    // Set default maximum size of the canvas
    this.maxWidth = 99000;
    this.maxHeight = 99000;

    // Set the background color
    this.backgroundColor = "rgb(0, 0, 0)";
    this.shouldClear = true;

    this.isPaused = false;

    // Handle shape defaults
    this.lnWdth = 1;

    this.rectDrawMode = "corner";
  }

  // clear method is used for "clearing" the canvas by drawing a square over it
  clear() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(
      -this.maxWidth / 3,
      -this.maxHeight / 3,
      (this.maxWidth / 3) * 2,
      (this.maxHeight / 3) * 2
    );
  }

  // noClear method allows the user to disable clearing
  noClear() {
    this.shouldClear = false;
  }

  // setMaxSize method allows the user to change the canvas max size
  setMaxSize(width_, height_) {
    this.maxWidth = width_;
    this.maxHeight = height_;
  }

  // setSize method allows the user to change the canvas size on the go
  setSize(width_, height_) {
    if (width_ === undefined && height_ === undefined) {
      // Handle bad arguments
      error("setSize function requires at least one argument");
    } else {
      // Update all canvas size variables
      this.canvas.width = width_;
      this.canvas.height = height_ || width_;
      width = width_;
      height = height_;
    }
  }

  // fullScreen method allows the user to set the canvas to take the full window size
  fullScreen() {
    this.setSize(innerWidth, innerHeight);
  }

  // background method allows the user to change the canvas background
  background(r, g, b, a) {
    if (r === undefined) {
      // Handle bad arguments
      error("Invalid arguments for Canvas background method");
    } else {
      let red, green, blue, alpha;
      // Check if the provided argument is a Color class
      if (r instanceof Color) {
        // Update canvas color based on the object arguments
        red = r.red;
        green = r.green;
        blue = r.blue;
        alpha = r.alpha;
        this.backgroundColor = r.color();
      } else {
        // Update canvas color based on the provided arguments
        red = r;
        green = g === undefined ? r : g;
        blue = b === undefined ? r : b;
        alpha = a === undefined ? 255 : g;
        this.backgroundColor = color(red, green, blue, alpha);
        this.canvas.style.backgroundColor = color(red, green, blue, alpha);
      }
    }
  }

  // fill method allows the user to change the fill color of the canvas
  fill(r, g, b, a) {
    if (r === undefined) {
      // Handle bad arguments
      error("Invalid arguments for Canvas fill method");
    } else {
      let red, green, blue, alpha;
      // Check if the provided argument is a Color class
      if (r instanceof Color) {
        // Update canvas fill color based on the object arguments
        this.ctx.fillStyle = r.color();
      } else {
        // Update canvas fill color based on the provided arguments
        red = r;
        green = g === undefined ? r : g;
        blue = b === undefined ? r : b;
        if (g !== undefined && b === undefined) {
          green = r;
          alpha = g;
        } else if (a !== undefined) {
          alpha = a;
        } else {
          alpha = 255;
        }

        this.ctx.fillStyle = color(red, green, blue, alpha);
      }
    }
  }

  // noFill method allows the user to draw shapes with no fill color
  noFill() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
  }

  // stroke method allows the user to set the stroke color of the drawing
  stroke(r, g, b, a) {
    if (r === undefined) {
      // Handle bad arguments
      error("Invalid arguments for Canvas stroke method");
    } else {
      let red, green, blue, alpha;
      // Check if the provided argument is a Color class
      if (r instanceof Color) {
        // Update canvas stroke color based on the object arguments
        this.ctx.fillStyle = r.color();
      } else {
        // Update canvas stroke color based on the provided arguments
        red = r;
        green = g === undefined ? r : g;
        blue = b === undefined ? r : b;
        if (g !== undefined && b === undefined) {
          green = r;
          alpha = g;
        } else if (a !== undefined) {
          alpha = a;
        } else {
          alpha = 255;
        }

        this.ctx.strokeStyle = color(red, green, blue, alpha);
      }
    }
  }

  // noStroke method allows the user to disable the stroke
  noStroke() {
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0)";
  }

  // lineWidth method allows the user to change the stroke size
  lineWidth(width_) {
    this.ctx.lineWidth = width_;
    this.lnWdth = width_;
  }

  // line method allows the user to draw a line on the canvas
  line(x1, y1, x2, y2) {
    // Handle bad arguments
    if (
      x1 === undefined ||
      x2 === undefined ||
      y1 === undefined ||
      y2 === undefined
    )
      error("Invalid arguments for Canvas line method");
    else {
      // Draw a line based on the provided arguments
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }

  // lineFromVector method allows the user to draw a line from a Vector class
  lineFromVector(vector) {
    // Handle bad arguments
    if (!vector || !(vector instanceof Vector))
      error("Invalid argument for Canvas lineFromVector method");
    else {
      // Calculate line start and end point based on the vector information
      let x1 = vector.x;
      let y1 = vector.y;

      let theta = vector.angle(true);
      let length = vector.magnitude();

      let x2 = length * cos(theta) + x1;
      let y2 = length * sin(theta) + y1;

      // Draw the line based on the calculated arguments
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }

  // lineFromAngle method allows the user to draw a line based on an angle
  lineFromAngle(x, y, angle, length) {
    // Handle bad arguments
    if (x === undefined)
      error("Invalid arguments for Canvas lineFromAngle method");
    else {
      // Calculate lin end point based on the vector information
      let x1 = x;
      let y1 = y;
      let theta = angle;
      let len = length;

      let x2 = len * cos(theta) + x1;
      let y2 = len * sin(theta) + y1;

      // Draw the line based on the calculated arguments
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }

  // rect method allows the user to draw a rectangle on the canvas
  rect(x, y, width_, height_) {
    if (
      x === undefined &&
      y === undefined &&
      width_ === undefined &&
      height_ === undefined
    ) {
      // Handle bad arguments
      error("Invalid arguments for Canvas rect method");
    } else {
      // Prepare necessary variables
      let x1 = x;
      let y1 = y;
      let wid, heig;
      // Handle size if the provided arguments are incomplete
      if (width_ === undefined && height_ === undefined) {
        y1 = x1;
        wid = y;
        heig = width_;
      } else if (width_ !== undefined && height_ === undefined) {
        wid = width_;
        heig = wid;
      } else {
        wid = width_;
        heig = height_;
      }

      // Draw the canvas based on the set rectangle drawing origin
      if (this.rectDrawMode === "corner") {
        this.ctx.fillRect(x1, y1, wid, heig);
        this.ctx.strokeRect(x1, y1, wid, heig);
      } else if (this.rectDrawMode === "center") {
        this.ctx.fillRect(x1 - wid / 2, y1 - heig / 2, wid, heig);
        this.ctx.strokeRect(x1 - wid / 2, y1 - heig / 2, wid, heig);
      }
    }
  }

  // rectMode method allows the user to change the rectangle drawing origin of the canvas
  rectMode(mode) {
    // Handle bad arguments
    if (mode !== "center" && mode !== "corner")
      error("Invalid argument for Canvas rectMode method");
    else this.rectDrawMode = mode;
  }

  // point method allows the user to draw a point on the canvas
  point(x, y) {
    // Handle bad arguments
    if (x === undefined) error("Invalid arguments for Canvas point method");
    else {
      // Draw the point on the given coordinates with the size of the lineWidth
      let x1 = x;
      let y1 = y || x;

      this.ctx.beginPath();
      this.ctx.fillStyle = this.ctx.strokeStyle;
      this.ctx.arc(x1, y1, this.lnWdth / 2, 0, PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  // circle method allows the user to draw a circle on the canvas
  circle(x, y, r) {
    if (x === undefined || y === undefined || r === undefined) {
      // Handle bad arguments
      error("Invalid arguments for Canvas circle method");
    } else {
      // Draw the circle based on the provided arguments
      let x1 = x;
      let y1 = y;
      let radius = r;

      this.ctx.beginPath();
      this.ctx.arc(x1, y1, radius, 0, PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  // arc method allows the user to draw an arc shape on the canvas
  arc(x, y, r, startAngle, endAngle) {
    if (
      x === undefined ||
      y === undefined ||
      r === undefined ||
      startAngle === undefined ||
      endAngle === undefined
    ) {
      // Handle bad arguments
      error("Invalid arguments for Canvas arc method");
    } else {
      // Draw an arc based on the provided arguments
      let x1 = x;
      let y1 = y;
      let radius = r;
      let sa = toRadians(startAngle - 90);
      let ea = toRadians(endAngle - 90);

      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.arc(x1, y1, radius, sa, ea);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  // ellipse method allows the user to draw an ellipse on the canvas
  ellipse(x, y, width_, height_, rotation) {
    // Handle bad arguments
    if (x === undefined || height === undefined)
      error("Invalid arguments for Canvas ellipse method");
    else {
      // Draw an ellipse based on the provided arguments
      let x1 = x;
      let y1 = y;
      let wid = abs(width_);
      let heig = abs(height_);
      let angle = 0;
      if (rotation !== undefined) angle = toRadians(rotation);

      this.ctx.beginPath();
      this.ctx.ellipse(x1, y1, wid, heig, angle, 0, TWO_PI);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  // beginShape method allows the user to start a shape at the given coordinates; in conjunction with the vertext and closeShape methods
  beginShape(x, y) {
    if (x === undefined)
      error("Invalid arguments for Canvas beginShape method");
    else {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    }
  }

  // vertex method allows the user to place a new vertex in the started shape at the given coordinates; in conjunction with the beginShape and closeShape methods
  vertex(x, y) {
    if (x === undefined) error("Invalid arguments for Canvas vertex method");
    else {
      this.ctx.lineTo(x, y);
    }
  }

  // closeShape method allows the user to close the shape at the started shape at the given coordinates; in conjunction with the vertext and beginShape methods
  closeShape() {
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }

  // text method allows the user to write text on the canvas
  text(text, x, y, fontSize, fontName) {
    // Handle bad arguments
    if (
      text === undefined ||
      x === undefined ||
      y === undefined ||
      fontSize === undefined ||
      fontName === undefined
    )
      error("Invalid arguments for Canvas text method");
    else {
      // Write the text based on the given arguments
      this.ctx.font = fontSize.toString() + "px " + fontName;
      this.ctx.fillText(text, x, y);
      this.ctx.strokeText(text, x, y);
    }
  }

  // textAlign method allows the user to set the text alignment
  textAlign(align) {
    // Handle bad arguments
    if (!align) error("You need to specify the text alignment");
    else {
      // Update the text alignment
      this.ctx.textAlign = align;
    }
  }

  // translate method allows the user to move the canvas origin point to the provided coordinates
  translate(x, y) {
    // Handle bad arguments
    if (x === undefined) error("Invalid arguments for Canvas translate method");
    else {
      // Translate the canvas origin point
      if (y === undefined) {
        y = x;
      }
      this.ctx.translate(x, y);
    }
  }

  // rotate method allows the player to rotate the canvas by the angle
  rotate(angle) {
    if (angle === undefined) angle = 0;
    this.ctx.rotate((angle * PI) / 180);
  }

  // save method allows the user to save the canvas state to memory
  save() {
    this.ctx.save();
  }

  // restore method allows the user to restore the saved canvas state
  restore() {
    this.ctx.restore();
  }

  // scale method allows the user to scale the canvas size
  scale(width_, height_) {
    let wid = width_ || 1;
    let heig = height_ || wid;

    this.ctx.scale(wid, heig);
  }

  // screenshot method allows the user to save a screenshot of the canvas
  screenshot(name) {
    let d = document.createElement("a");
    let n;
    if (name) {
      n = name;
    } else {
      n = "panvasjs_screenshot" + randInt(999999);
    }

    // Download the screenshot to the user's device
    let down = n + ".png";
    d.setAttribute("download", down);
    d.href = this.canvas
      .toDataURL("image/png")
      .replace(/^data:image\/[^;]/, "data:application/octet-stream");
    d.click();
  }

  // playPause method allows the user to pause or unpause the canvas updates based on the current statee
  playPause() {
    if (interval) {
      clearInterval(interval);
      interval = null;
      if (typeof onPause === "function") onPause();
      this.isPaused = true;
    } else {
      framerate(frameRate);
      this.isPaused = false;
    }
  }

  // pause method allows the user to pause the canvas updates
  pause() {
    clearInterval(interval);
    interval = null;
    this.isPaused = true;
  }

  // play method allows the user to resume the canvas updates
  play() {
    framerate(frameRate);
    this.isPaused = false;
  }

  // drawImage method allows the user to drawn an image to the canvas
  drawImage(image, sx, sy, swidth, sheight, x, y, wid, heig) {
    // Handle bad arguments
    if (image === undefined)
      error("Invalid arguments for Canvas drawImage method");
    else {
      if (swidth === undefined) this.ctx.drawImage(image.image, sx, sy);
      else if (swidth !== undefined && sheight !== undefined && x === undefined)
        this.ctx.drawImage(image.image, sx, sy, swidth, sheight);
      else if (heig !== undefined)
        this.ctx.drawImage(
          image.image,
          sx,
          sy,
          swidth,
          sheight,
          x,
          y,
          wid,
          heig
        );
    }
  }
}

// Main Vector class
class Vector {
  constructor(x, y) {
    // Prepare basic vector variables
    this.x = 0;
    this.y = 0;

    this.previousX = 0;
    this.previousY = 0;

    if (x !== undefined) this.x = x;
    if (y !== undefined) this.y = y;
  }

  // set method allows the user to update the vector coordinates
  set(x, y) {
    if (x === undefined && y === undefined) {
      // Handle bad arguments
      error("No X or Y value has been passed to the Vector set function");
    } else {
      // Update the vector coordinates based on the provided arguments
      this.previousX = x;
      this.previousX = y;
      if (x !== undefined) this.x = x;

      if (y !== undefined) this.y = y;
    }
  }

  // add method allows the user to perform addition with the provided vector
  add(vec2) {
    if (x === undefined && y === undefined) {
      // Handle bad arguments
      error("No vector has been passed to the Vector add function");
    } else {
      // Add the provided vector
      this.previousX = this.x;
      this.previousY = this.y;

      this.x += vec2.x;

      this.y += vec2.y;
    }
  }

  // subtract method allows the user to perform subtraction with the provided vector
  subtract(vec2) {
    if (x === undefined && y === undefined) {
      // Handle bad arguments
      error("No vector has been passed to the Vector subtract function");
    } else {
      // Subtract the provided vector
      this.previousX = this.x;
      this.previousY = this.y;

      this.x -= vec2.x;

      this.y -= vec2.y;
    }
  }

  // multiply method allows the user to perform multiplication with the provided vector
  multiply(num) {
    if (!num) num = 1;
    this.previousX = this.x;
    this.previousY = this.y;

    this.x *= num;
    this.y *= num;
  }

  // divide method allows the user to perform division with the provided vector
  divide(num) {
    if (!num) num = 1;

    num = 1 / num;
    this.multiply(num);
  }

  // angle method allows the user to get the angle of the vector
  angle(degrees) {
    if (degrees) return (atan(this.y / this.x) * 180) / PI;
    return atan(this.y / this.x);
  }

  // rotate method allows the user to rotate the vector by the given angle
  rotate(angle) {
    this.previousX = this.x;
    this.previousY = this.y;

    this.x = cos(angle) * this.previousX - sin(angle) * this.previousY;
    this.y = sin(angle) * this.previousX + cos(angle) * this.previousY;
  }

  // magnitude method allows the user to get the magnitude of the vector
  magnitude() {
    return sqrt(sqr(this.x) + sqr(this.y));
  }

  // magnitudeSqr method allows the user to get the squared magnitude of the vector
  magnitudeSqr() {
    return sqr(this.x) + sqr(this.y);
  }

  // setMagnitude method allows the user to update the vector magnitude
  setMagnitude(newMag) {
    let mag = sqrt(sqr(this.x) + sqr(this.y));
    let ratio = newMag / mag;

    this.previousX = this.x;
    this.previousY = this.y;

    this.x *= ratio;
    this.y *= ratio;
  }

  // limit method allows the user to set the maximum magnitude for the vector
  limit(minMag, maxMag) {
    let maxM = minMag;
    let minM = null;

    if (maxMag) {
      maxM = maxMag;
      minM = minMag;
    }

    if (minM && this.magnitude() < minM) this.setMagnitude(minM);
    if (this.magnitude() > maxM) this.setMagnitude(maxM);
  }

  // copy method allows the user to get a copy of the vector
  copy() {
    return new Vector(this.x, this.y);
  }

  // normalize method allows the user to normalize the vector/set its magnitude to 1
  normalize() {
    let tmp = new Vector(this.x, this.y);

    let mag = sqrt(sqr(tmp.x) + sqr(tmp.y));

    tmp.x = tmp.x / mag;
    tmp.y = tmp.y / mag;

    this.previousX = this.x;
    this.previousY = this.y;

    this.x = tmp.x;
    this.y = tmp.y;
  }

  // distance method allows the user to get the distance to another vector
  distance(vec2) {
    // Handle bad arguments
    if (vec2 === undefined)
      error("You need to pass another vector to the Vector distance method");
    else return sqrt(sqr(this.x - vec2.x) + sqr(this.y - vec2.y));
  }

  // isOffScreen method allows the user to check if the vector is off the edges of the canvas
  isOffScreen() {
    if (this.x >= width || this.x < 0 || this.y >= height || this.y < 0)
      return true;
    else return false;
  }

  // lerp method allows the user to lerp the vector towards another vector over time
  lerp(vec2, step) {
    // Handle bad arguments
    if (vec2 === undefined || step === undefined)
      error("Invalid arguments for Vector lerp method");
    else {
      this.x = lerp(this.x, vec2.x, step);
      this.y = lerp(this.y, vec2.y, step);
    }
  }

  // constrain method allows the user to constrain the method between the set coordinates
  constrain(minX, maxX, minY, maxY) {
    if (this.x >= maxX) this.x = maxX;
    else if (this.x <= minX) this.x = minX;
    if (this.y >= maxY) this.y = maxY;
    else if (this.y <= minY) this.y = minY;
  }
}

// Vector.fromAngle method allows the user to create a vector from the given angles
Vector.__proto__.fromAngle = (angle) => {
  return new Vector(cos(angle), sin(angle));
};

// Main Point class
class Point {
  constructor(x, y) {
    // Define all necessary variables
    this.x = x;
    this.y = y;
  }

  // distance method allows the user to get the distance to another point
  distance(pt2) {
    if (pt2 === undefined)
      error("You need to pass another point to the Point distance method");
    else return sqrt(sqr(this.x - pt2.x) + sqr(this.y - pt2.y));
  }

  // isOffScreen method allows the user to check if the point is off the edges of the canvas
  isOffScreen() {
    if (
      this.x >= canvas.width ||
      this.x < 0 ||
      this.y >= canvas.height ||
      this.y < 0
    )
      return true;
    else return false;
  }
}

// Main Color class
class Color {
  constructor(red, green, blue, alpha) {
    // Define all necessary variables
    this.red = red || 0;
    this.alpha = alpha || 255;
    if (green !== undefined && blue !== undefined) {
      this.green = green;
      this.blue = blue;
      this.alpha = 255;
    } else if (green !== undefined && blue === undefined) {
      this.green = red;
      this.blue = red;
      this.alpha = green;
    } else {
      this.green = red;
      this.blue = red;
    }
  }

  // randomize method allows the user to get a random variation of the color
  randomize(randomizeAlpha) {
    let r, g, b, a;

    let offset = randInt(-100, 100);

    r = this.red + offset;
    g = this.green + offset;
    b = this.blue + offset;
    a = randomizeAlpha ? this.alpha + offset : this.alpha;

    return new Color(r, g, b, a);
  }

  // color method allows the user to get the object as a usable color code
  color() {
    return color(this.red, this.green, this.blue, this.alpha);
  }
}

// Main Image class
class Image {
  constructor(path) {
    // Define all necessary variables
    this.path = path;
    this.filename = this.path.split("/").pop();

    this.image = document.createElement("IMG");
    this.image.src = this.path;
  }
}

// Main Sound class
class Sound {
  constructor(path) {
    // Define all necessary variables
    this.path = path;
    this.filename = this.path.split("/").pop();

    this.audio = document.createElement("AUDIO");
    this.audio.src = this.path;
  }

  // play method allows the user to play the audio
  play() {
    this.audio.play();
  }

  // pause method allows the user to pause the audio
  pause() {
    this.audio.pause();
  }

  // playPause method allows the user to play or pause the audio based on its current state
  playPause() {
    if (this.audio.paused) this.play();
    else this.pause();
  }
}

// Main Store class
class Store {
  // save method allows the user to save data to the local storage
  save(name, data) {
    let d;
    if (typeof data === "object") d = JSON.stringify(data);
    else d = data;
    window.localStorage.setItem(name, d);
  }

  // load method allows the user to load data from the local storage
  load(name) {
    let d = window.localStorage.getItem(name);
    let data = JSON.parse(d);
    return data;
  }

  // removeItem method allows the user to remvoe the provided item from the local storage
  removeItem(name) {
    window.localStorage.removeItem(name);
  }

  // clearStorage method allows the user to clear all data from the local storage
  clearStorage() {
    window.localStorage.clear();
  }

  // itemAtKey method allows the user to access the data from the item with the given key
  itemAtKey(key) {
    return window.localStorage.key(key);
  }
}

// Main Storage object available to the user
const Storage = new Store();

// Main color function that converts provided RGBA arguments to a usable color
function color(red, green, blue, alpha) {
  if (red === undefined) {
    // Handle bad arguments
    error("Invalid arguments for color function");
  } else {
    let r, g, b, a;
    if (green !== undefined && blue === undefined) {
      r = red;
      g = red;
      b = red;
      a = green;
    } else if (blue !== undefined && alpha === undefined) {
      r = red;
      g = green;
      b = blue;
      a = 1;
    } else if (alpha !== undefined) {
      r = red;
      g = green;
      b = blue;
      a = alpha / 255;
    }

    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }
}

// distance function allows the user to calculate the distance between two sets of coordinates
function distance(x1, y1, x2, y2) {
  // Handle bad arguments
  if (!x1 && !y1) error("Invalid arguments for distance function");
  else {
    // Check if the provided arguments are instances of Vector or Point methods
    if (x2 === undefined && y2 === undefined) {
      if (
        x1 instanceof Vector ||
        (x1 instanceof Point && y1 instanceof Vector) ||
        y1 instanceof Point
      ) {
        return sqrt(sqr(x1.x - y1.x) + sqr(x1.y - y1.y));
      } else error("Invalid arguments for distance function");
    } else {
      return sqrt(sqr(x1 - x2) + sqr(y1 - y2));
    }
  }
}

// createVector function allows the user to create a new vector with the provided arguments
function createVector(x, y) {
  let x1 = x || 0;
  let y1 = y || 0;
  return new Vector(x1, y1);
}

// randomVector function allows the user to create a random vector with the given magnitude
function randomVector(magnitude) {
  let x = randInt(width);
  let y = randInt(height);
  let vec = createVector(x, y);
  if (magnitude !== undefined) vec.setMagnitude(magnitude);
  else vec.normalize();
  return vec;
}

// createCanvas function allows the user to create a new canvas
function createCanvas(width_, height_, canvas_) {
  return new Canvas(width_, height_, canvas_);
}

// createPoint function allows the user to create a new point with the provided arguments
function createPoint(x, y) {
  return new Point(x, y);
}

// randomPoint function allows the user to create a random point with the given magnitude
function randomPoint() {
  return new Point(randInt(width), randInt(height));
}

// isInArray function allows the user to check if the given element is inside the given array
function isInArray(array, element) {
  // Handle bad arguments
  if (array === undefined || element === undefined)
    error("Invalid arguments for isInArray function");
  else {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return i;
      }
    }
    return false;
  }
}

// removeFromArray function allows the user to remvoe the given element from the given array
function removeFromArray(array, element) {
  // Handle bad arguments
  if (array === undefined || element === undefined)
    error("Invalid arguments for removeFromArray function");
  else {
    let i = isInArray(array, element);
    if (i === false) return;
    array.splice(i, 1);
  }
}

// createMatrix function allows the user to create a new matrix with the given number of collumns and rows
function createMatrix(cols, rows) {
  let m = [];
  for (let i = 0; i < cols; i++) {
    m[i] = [];
    for (let j = 0; j < rows; j++) {
      m[i][j] = null;
    }
  }
  return m;
}

// toRadians function converts the given angle in degrees to radians
function toRadians(degrees) {
  return degrees * (PI / 180);
}

// toDegrees function converts the given angle in radians to degrees
function toDegrees(radians) {
  return radians * (180 / PI);
}

// constrain function constrains the given number between the given min and max values
function constrain(num, min, max) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
}

// lerp function stands for linear interpolation; it slowly brings the first value to the second over time with the given step size
function lerp(value1, value2, step) {
  // Handle bad arguments
  if (value1 === undefined || value2 === undefined || step === undefined)
    error("Invalid arguments for lerp function");
  else {
    return (1 - step) * value1 + step * value2;
  }
}

// map function maps the given value ranging from a to b to a new value ranging from c to d
function map(num, a, b, c, d) {
  return ((num - a) / (b - a)) * (d - c) + c;
}

// joinArray function joins two arrays into one
function joinArray(array, spacing) {
  // Handle bad arguments
  if (!array) error("Invalid arguments for joinArray function");
  else {
    let result = "";
    for (let item of array) {
      result += item;
      if (spacing) result += spacing;
    }

    return result;
  }
}

// removeChars function removes all instances of the provided character from the array
function removeChars(text, characters) {
  for (let i = 0; i < text.length; i++) {
    for (let char of characters) {
      if (text[i] === char) text = removeCharAt(text, i);
    }
  }
  return text;
}

// replaceCharAt function replaces the character in the text at the given index
function replaceCharAt(text, index, replacement) {
  let split = text.split("");
  split[index] = replacement;
  string = joinArray(split);
  return string;
}

// removeCharAt function removes the character in the text at the given index
function removeCharAt(text, index) {
  let string = text;
  let split = string.split("");
  split.splice(index, 1);
  string = joinArray(split);
  return string;
}

// sort function sorts the given array
function sort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
}

// swap function swaps the places of two elements inside the given array
function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

// random function returns a random number or element from an array if provided with one
function random(num1, num2) {
  // Return a number between 0 and 1 if no arguments are provided
  if (num1 === undefined && num2 === undefined) return Math.random();
  else {
    // Return a random array element if one is provided
    if (num1.constructor === Array) {
      let i = Math.floor(Math.random() * num1.length);
      return num1[i];
    }
    // Return a random number between the two provided numbers if two numbers are provided
    if (num2 !== undefined) return Math.random() * (num2 - num1) + num1;
    // Return a random number between 0 and the provided number if only one is provided
    else return Math.random() * num1;
  }
}

// randInt function returns a random integer between the given values
function randInt(num1, num2) {
  // Handle bad arguments
  if (num1 === undefined && num2 === undefined)
    error("At least one argument is needed for the randInt function");
  // Return a random integer between the two numbers if two numbers are provided
  else if (num2 !== undefined)
    return Math.floor(Math.random() * (num2 - num1) + num1);
  // Return a random interger between 0 and the provided number if only one number is provided
  else return Math.floor(Math.random() * num1);
}

// setTitle function allows the user to change the page title
function setTitle(title) {
  document.title = title;
}

// floor function rounds the provided number down to the next integer
function floor(num) {
  return Math.floor(num);
}

// ceil function rounds the provided number up to the next integer
function ceil(num) {
  return Math.ceil(num);
}

// round function rounds the provided number to the closest integer
function round(num) {
  return Math.round(num);
}

// pow function returns the value of the provided number to the provided power
function pow(num, pow) {
  return Math.pow(num, pow);
}

// sqrt function returns the square root of the provided number
function sqrt(num) {
  return Math.sqrt(num);
}

// sqr function returns the square of the given number
function sqr(num) {
  return num * num;
}

// abs function returns the absolute value of the provided number
function abs(num) {
  return Math.abs(num);
}

// sin function returns the sine value of the provided angle
function sin(angle) {
  return Math.sin((angle * PI) / 180);
}

// cos function returns the cosine value of the provided angle
function cos(angle) {
  return Math.cos((angle * PI) / 180);
}

// acos function returns the arc cosine value of the provided angle
function acos() {
  return Math.acos.apply(null, arguments);
}

// asin function returns the arc sine value of the provided angle
function asin() {
  return Math.asin.apply(null, arguments);
}

// tan function returns the tangent of the given number in radians
function tan() {
  return Math.tan.apply(null, arguments);
}

// atan function returns the arc tangent of the given number in radians
function atan() {
  return Math.atan.apply(null, arguments);
}

// atan2 function returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point
function atan2() {
  return Math.atan2.apply(null, arguments);
}

// exp function returns e raised to the power of the provided number
function exp() {
  return Math.exp.apply(null, arguments);
}

// log function returns the natural logarithm base e of the given number
function log() {
  return Math.log.apply(null, arguments);
}

// min function returns the smallest number in the provided list of numbers
function min() {
  return Math.min.apply(null, arguments);
}

// max function returns the biggest number in the provided list of numbers
function max() {
  return Math.max.apply(null, arguments);
}

// write function writes a line of text to the DOM
function write() {
  document.write.apply(null, arguments);
}

// print function writes the text to the console
function print() {
  console.log.apply(null, arguments);
}

// table function prints an array or matrix as a table to the console
function table() {
  console.table.apply(null, arguments);
}

// error function writes an error to the console
function error() {
  console.error.apply(null, arguments);
}

// warn function writes a warning to the console
function warn() {
  console.warn.apply(null, arguments);
}

// setText function takes a DOM element and changes its text contents
function setText(element, text) {
  document.getElementById(element).innerHtml = text;
}

// Allows the keyDown function to be ran when a key is pressed
window.addEventListener("keydown", (e) => {
  if (typeof keyDown === "function") {
    keyCode = e.keyCode;
    keyDown(keyCode);
  }
});

// Allows the keyUp function to be ran when a key is released
window.addEventListener("keyup", (e) => {
  if (typeof keyUp === "function") {
    keyCode = e.keyCode;
    keyUp(keyCode);
  }
});

// Allows the touchStart function to be ran when a touch is detected
window.addEventListener("touchstart", (e) => {
  let touches = e.touches;
  touchX = touches[0].clientX;
  touchY = touches[0].clientY;
  startTouchX = touchX;
  startTouchY = touchY;
  calledFunction = false;
  if (typeof touchStart === "function") {
    touchStart(touches);
  }
});

// Allows the touchMove function to be ran when a touch is moving, and function swipe when a swipe is detected
window.addEventListener("touchmove", (e) => {
  let touches = e.touches;
  touchX = touches[0].clientX;
  touchY = touches[0].clientY;
  let distX = startTouchX - touchX;
  let distY = startTouchY - touchY;
  let dir;

  if (distX >= 100 && distY <= 10 && distY >= -10 && !calledFunction) {
    dir = RIGHT;
    if (typeof swipe === "function") {
      calledFunction = true;
      log("Swiping " + dir);
      swipe(dir);
    }
  } else if (distX <= -100 && distY <= 10 && distY >= -10 && !calledFunction) {
    dir = LEFT;
    if (typeof swipe === "function") {
      calledFunction = true;
      log("Swiping " + dir);
      swipe(dir);
    }
  } else if (distY <= -100 && distX <= 10 && distX >= -10 && !calledFunction) {
    dir = DOWN;
    if (typeof swipe === "function") {
      calledFunction = true;
      log("Swiping " + dir);
      swipe(dir);
    }
  } else if (distY >= 100 && distX <= 10 && distX >= -10 && !calledFunction) {
    dir = UP;
    if (typeof swipe === "function") {
      calledFunction = true;
      log("Swiping " + dir);
      swipe(dir);
    }
  }

  if (typeof touchMove === "function") {
    touchMove(touches);
  }
});

// Allows the touchEnd function to be ran when a touch is lifted
window.addEventListener("touchend", (e) => {
  let touches = e.touches;
  if (typeof touchEnd === "function") {
    touchEnd(touches);
  }
});

// Allows the mouseDown function to be ran when a mouse is pressed
window.addEventListener("mousedown", (e) => {
  mousePressed = true;
  if (!mobile) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (can) {
      cMouseX = constrain(mouseX - canvasX, 0, can.width);
      cMouseY = constrain(mouseY - canvasY, 0, can.height);
    }
    if (typeof mouseDown === "function") {
      mouseDown();
    }
  }
});

// Allows the mouseMove function to be ran when a mouse is moved
window.addEventListener("mousemove", (e) => {
  if (!mobile) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (can) {
      cMouseX = constrain(mouseX - canvasX, 0, can.width);
      cMouseY = constrain(mouseY - canvasY, 0, can.height);
    }
    if (typeof mouseMove === "function") {
      mouseMove();
    }
  }
});

// Allows the mouseUp function to be ran when a mouse is released
window.addEventListener("mouseup", (e) => {
  mousePressed = false;
  if (!mobile) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (can) {
      cMouseX = constrain(mouseX - canvasX, 0, can.width);
      cMouseY = constrain(mouseY - canvasY, 0, can.height);
    }
    if (typeof mouseUp === "function") {
      mouseUp();
    }
  }
});

// framerate function allows the user to change the refresh rate of the canvas
function framerate(framerate) {
  if (framerate && typeof framerate !== "number") {
    // Handle bad arguments
    error("Invalid argument for framerate function");
  } else {
    // Update the refresh rate
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    frameRate = framerate;
    interval = setInterval(loop, 1000 / frameRate);
  }

  return frameRate;
}

// include function allows the user to include a JavaScript file from the code instead of from the HTML
function include(file, callback) {
  let element = document.createElement("SCRIPT");
  element.src = file;
  document.head.appendChild(element);

  element.addEventListener("load", callback);
}

// Calls the preload function when the window is ready
window.addEventListener("ready", () => {
  if (typeof preload === "function") preload();
});

// Sets up the page when the window has fully loaded
window.addEventListener("load", () => {
  mobile = isMobile();
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
  END = "end";
  START = "start";
  CORNER = "corner";
  CENTER = "center";
  RIGHT = "right";
  LEFT = "left";
  DOWN = "down";
  UP = "up";
  if (typeof onMobile === "function" && mobile) onMobile();

  setup();
});

// noCanvas function allows the user to set the loop code to run without a canvas element
function noCanvas() {
  interval = setInterval(loop, 1000 / frameRate);
  hasACanvas = false;
}

// autoUpdate function allows the user to make a custom object automatically update each frame
function autoUpdate(obj) {
  if (typeof obj === "object") updateable.push(obj);
  else if (obj === undefined)
    print("The autoUpdate function requires an argument");
  else print("The autoUpdate function requires an object");
}

// stopAutoUpdate function allows the user to remove an object from being automatically updated each frame
function stopAutoUpdate(obj) {
  for (let i = updateable.length - 1; i >= 0; i--) {
    if (updateable[i] === obj) updateable.splice(i, 1);
  }
}

// loop function runs every frame and handles everything that needs to be run in the loop
function loop() {
  frameCount++;

  if (hasACanvas && can.shouldClear) {
    let rct = can.canvas.getBoundingClientRect();
    canvasX = rct.left + window.scrollX;
    canvasY = rct.top + window.scrollY;
    can.clear();
  }
  for (let obj of updateable) {
    if (typeof obj.update === "function") obj.update();
  }
  if (typeof update === "function") update();
}
