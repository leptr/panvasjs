function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

let keyCode, mouseX, mouseY;
let touches = [];
let width, height;
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
let UP, DOWN, LEFT, RIGHT, CENTER, START, END, CORNER;
let mobile;
let innerWidth, innerHeight;
let can;
let frameRate = 60;
let interval = undefined;
let frameCount = 0;
let hasACanvas = true;
let touchX, touchY, prevTouchX, prevTouchY;
let mousePressed = false;

const updateable = [];

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

function Canvas(width_, height_, canvas_) {
  this.width = width_ || 100;
  this.height = height_ || this.width;

  if (!canvas_) {
    this.canvas = document.createElement('CANVAS');
    document.body.appendChild(this.canvas);
  } else this.canvas = canvas_;

  this.background = 51;

  width = this.width;
  height = this.height;

  this.ctx = this.canvas.getContext('2d');

  can = this;

  this.canvas.width = this.width;
  this.canvas.height = this.height;

  interval = setInterval(loop, 1000 / frameRate);

  this.maxWidth = 99000;
  this.maxHeight = 99000;

  this.backgroundColor = 'rgb(0, 0, 0)';
  this.shouldClear = true;

  this.isPaused = false;

  this.lnWdth = 1;

  this.rectDrawMode = 'corner';

  this.clear = () => {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(
      -this.maxWidth / 3,
      -this.maxHeight / 3,
      (this.maxWidth / 3) * 2,
      (this.maxHeight / 3) * 2
    );
  };

  this.noClear = () => {
    this.shouldClear = false;
  };

  this.setMaxSize = (width_, height_) => {
    this.maxWidth = width_;
    this.maxHeight = height_;
  };

  this.setSize = (width_, height_) => {
    if (width_ === undefined && height_ === undefined) {
      error('setSize function requires at least one argument');
    } else {
      this.canvas.width = width_;
      this.canvas.height = height_ || width_;
      width = width_;
      height_ = height_;
    }
  };

  this.fullScreen = () => {
    this.setSize(innerWidth, innerHeight);
  };

  this.background = (r, g, b, a) => {
    if (r === undefined) {
      error('Invalid arguments for Canvas background method');
    } else {
      let red, green, blue, alpha;
      if (r instanceof Color) {
        red = r.red;
        green = r.green;
        blue = r.blue;
        alpha = r.alpha;
        this.backgroundColor = r.color();
      } else {
        red = r;
        green = g === undefined ? r : g;
        blue = b === undefined ? r : b;
        alpha = a === undefined ? 255 : g;
        this.backgroundColor = color(red, green, blue, alpha);
        this.canvas.style.backgroundColor = color(red, green, blue, alpha);
      }
    }
  };

  this.fill = (r, g, b, a) => {
    if (r === undefined) {
      error('Invalid arguments for Canvas fill method');
    } else {
      let red, green, blue, alpha;
      if (r instanceof Color) {
        this.ctx.fillStyle = r.color();
      } else {
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
  };

  this.noFill = () => {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  };

  this.stroke = (r, g, b, a) => {
    if (r === undefined) {
      error('Invalid arguments for Canvas stroke method');
    } else {
      let red, green, blue, alpha;
      if (r instanceof Color) {
        this.ctx.fillStyle = r.color();
      } else {
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
  };

  this.noStroke = () => {
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
  };

  this.lineWidth = (width_) => {
    this.ctx.lineWidth = width_;
    this.lnWdth = width_;
  };

  this.line = (x1, y1, x2, y2) => {
    if (
      x1 === undefined ||
      x2 === undefined ||
      y1 === undefined ||
      y2 === undefined
    )
      error('Invalid arguments for Canvas line method');
    else {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  };

  this.lineFromVector = (vector) => {
    if (!vector || !(vector instanceof Vector))
      error('Invalid argument for Canvas lineFromVector method');
    else {
      let x1 = vector.x;
      let y1 = vector.y;

      let theta = vector.angle(true);
      let length = vector.magnitude();

      let x2 = length * cos(theta) + x1;
      let y2 = length * sin(theta) + y1;

      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  };

  this.lineFromAngle = (x, y, angle, length) => {
    if (x === undefined)
      error('Invalid arguments for Canvas lineFromAngle method');
    else {
      let x1 = x;
      let y1 = y;
      let theta = angle;
      let len = length;

      let x2 = len * cos(theta) + x1;
      let y2 = len * sin(theta) + y1;

      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  };

  this.rect = (x, y, width_, height_) => {
    if (
      x === undefined &&
      y === undefined &&
      width_ === undefined &&
      height_ === undefined
    ) {
      error('Invalid arguments for Canvas rect method');
    } else {
      let x1 = x;
      let y1 = y;
      let wid, heig;
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

      if (this.rectDrawMode === 'corner') {
        this.ctx.fillRect(x1, y1, wid, heig);
        this.ctx.strokeRect(x1, y1, wid, heig);
      } else if (this.rectDrawMode === 'center') {
        this.ctx.fillRect(x1 - wid / 2, y1 - heig / 2, wid, heig);
        this.ctx.strokeRect(x1 - wid / 2, y1 - heig / 2, wid, heig);
      }
    }
  };

  this.rectMode = (mode) => {
    if (mode !== 'center' && mode !== 'corner')
      error('Invalid argument for Canvas rectMode method');
    else this.rectDrawMode = mode;
  };

  this.point = (x, y) => {
    if (x === undefined) error('Invalid arguments for Canvas point method');
    else {
      let x1 = x;
      let y1 = y || x;

      this.ctx.beginPath();
      this.ctx.fillStyle = this.ctx.strokeStyle;
      this.ctx.arc(x1, y1, this.lnWdth / 2, 0, PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  this.circle = (x, y, r) => {
    if (x === undefined || y === undefined || r === undefined) {
      error('Invalid arguments for Canvas circle method');
    } else {
      let x1 = x;
      let y1 = y;
      let radius = r;

      this.ctx.beginPath();
      this.ctx.arc(x1, y1, radius, 0, PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  this.arc = (x, y, r, startAngle, endAngle) => {
    if (
      x === undefined ||
      y === undefined ||
      r === undefined ||
      startAngle === undefined ||
      endAngle === undefined
    ) {
      error('Invalid arguments for Canvas arc method');
    } else {
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
  };

  this.ellipse = (x, y, width_, height_, rotation) => {
    if (x === undefined || height === undefined)
      error('Invalid arguments for Canvas ellipse method');
    else {
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
  };

  this.beginShape = (x, y) => {
    if (x === undefined)
      error('Invalid arguments for Canvas beginShape method');
    else {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    }
  };

  this.vertex = (x, y) => {
    if (x === undefined) error('Invalid arguments for Canvas vertex method');
    else {
      this.ctx.lineTo(x, y);
    }
  };

  this.closeShape = () => {
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  };

  this.text = (text, x, y, fontSize, fontName) => {
    if (
      text === undefined ||
      x === undefined ||
      y === undefined ||
      fontSize === undefined ||
      fontName === undefined
    )
      error('Invalid arguments for Canvas text method');
    else {
      this.ctx.font = fontSize.toString() + 'px ' + fontName;
      this.ctx.fillText(text, x, y);
      this.ctx.strokeText(text, x, y);
    }
  };

  this.textAlign = (align) => {
    if (!align) error('You need to specify the text alignment');
    else {
      this.ctx.textAlign = align;
    }
  };

  this.translate = (x, y) => {
    if (x === undefined) error('Invalid arguments for Canvas translate method');
    else {
      if (y === undefined) {
        y = x;
      }
      this.ctx.translate(x, y);
    }
  };

  this.rotate = (angle) => {
    if (angle === undefined) angle = 0;
    this.ctx.rotate((angle * PI) / 180);
  };

  this.save = () => {
    this.ctx.save();
  };

  this.restore = () => {
    this.ctx.restore();
  };

  this.scale = (width_, height_) => {
    let wid = width_ || 1;
    let heig = height_ || wid;

    this.ctx.scale(wid, heig);
  };

  this.screenshot = () => {
    let d = document.createElement('a');
    let number = randInt(999999);
    let down = number + '.png';
    d.setAttribute('download', down);
    d.href = this.canvas
      .toDataURL('image/png')
      .replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    d.click();
  };

  this.playPause = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
      if (typeof onPause === 'function') onPause();
      this.isPaused = true;
    } else {
      framerate(frameRate);
      this.isPaused = false;
    }
  };

  this.pause = () => {
    clearInterval(interval);
    interval = null;
    this.isPaused = true;
  };

  this.play = () => {
    framerate(frameRate);
    this.isPaused = false;
  };

  this.drawImage = (image, sx, sy, swidth, sheight, x, y, wid, heig) => {
    if (image === undefined)
      error('Invalid arguments for Canvas drawImage method');
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
  };
}

function Vector(x, y) {
  this.x = 0;
  this.y = 0;

  this.previousX = 0;
  this.previousY = 0;

  if (x !== undefined) this.x = x;
  if (y !== undefined) this.y = y;

  this.set = (x, y) => {
    if (x === undefined && y === undefined) {
      error('No X or Y value has been passed to the Vector set function');
    } else {
      this.previousX = x;
      this.previousX = y;
      if (x !== undefined) this.x = x;

      if (y !== undefined) this.y = y;
    }
  };

  this.add = (vec2) => {
    if (x === undefined && y === undefined) {
      error('No vector has been passed to the Vector add function');
    } else {
      this.previousX = this.x;
      this.previousY = this.y;

      this.x += vec2.x;

      this.y += vec2.y;
    }
  };

  this.subtract = (vec2) => {
    if (x === undefined && y === undefined) {
      error('No vector has been passed to the Vector subtract function');
    } else {
      this.previousX = this.x;
      this.previousY = this.y;

      this.x -= vec2.x;

      this.y -= vec2.y;
    }
  };

  this.multiply = (num) => {
    this.previousX = this.x;
    this.previousY = this.y;

    this.x *= num;
    this.y *= num;
  };

  this.divide = (num) => {
    num = 1 / num;
    this.multiply(num);
  };

  this.angle = (degrees) => {
    if (degrees) return (atan(this.y / this.x) * 180) / PI;
    return atan(this.y / this.x);
  };

  this.rotate = (angle) => {
    this.previousX = this.x;
    this.previousY = this.y;

    this.x = cos(angle) * this.previousX - sin(angle) * this.previousY;
    this.y = sin(angle) * this.previousX + cos(angle) * this.previousY;
  };

  this.magnitude = () => {
    return sqrt(sqr(this.x) + sqr(this.y));
  };

  this.magnitudeSqr = () => {
    return sqr(this.x) + sqr(this.y);
  };

  this.setMagnitude = (newMag) => {
    let mag = sqrt(sqr(this.x) + sqr(this.y));
    let ratio = newMag / mag;

    this.previousX = this.x;
    this.previousY = this.y;

    this.x *= ratio;
    this.y *= ratio;
  };

  this.copy = () => {
    return new Vector(this.x, this.y);
  };

  this.normalize = () => {
    let tmp = new Vector(this.x, this.y);

    let mag = sqrt(sqr(tmp.x) + sqr(tmp.y));

    tmp.x = tmp.x / mag;
    tmp.y = tmp.y / mag;

    this.previousX = this.x;
    this.previousY = this.y;

    this.x = tmp.x;
    this.y = tmp.y;
  };

  this.distance = (vec2) => {
    if (vec2 === undefined)
      error('You need to pass another vector to the Vector distance method');
    else return sqrt(sqr(this.x - vec2.x) + sqr(this.y - vec2.y));
  };

  this.isOffScreen = () => {
    if (this.x >= width || this.x < 0 || this.y >= height || this.y < 0)
      return true;
    else return false;
  };

  this.lerp = (vec2, step) => {
    if (vec2 === undefined || step === undefined)
      error('Invalid arguments for Vector lerp method');
    else {
      this.x = lerp(this.x, vec2.x, step);
      this.y = lerp(this.y, vec2.y, step);
    }
  };

  this.constrain = (minX, maxX, minY, maxY) => {
    if (this.x >= maxX) this.x = maxX;
    else if (this.x <= minX) this.x = minX;
    if (this.y >= maxY) this.y = maxY;
    else if (this.y <= minY) this.y = minY;
  };
}

Vector.__proto__.fromAngle = (angle) => {
  return new Vector(cos(angle), sin(angle));
};

function Point(x, y) {
  this.x = x;
  this.y = y;

  this.distance = (pt2) => {
    if (pt2 === undefined)
      error('You need to pass another point to the Point distance method');
    else return sqrt(sqr(this.x - pt2.x) + sqr(this.y - pt2.y));
  };

  this.isOffScreen = () => {
    if (
      this.x >= canvas.width ||
      this.x < 0 ||
      this.y >= canvas.height ||
      this.y < 0
    )
      return true;
    else return false;
  };
}

function Color(red, green, blue, alpha) {
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

  this.randomize = (randomizeAlpha) => {
    let r, g, b, a;

    let offset = randInt(-100, 100);

    r = this.red + offset;
    g = this.green + offset;
    b = this.blue + offset;
    a = randomizeAlpha ? this.alpha + offset : this.alpha;

    return new Color(r, g, b, a);
  };

  this.color = () => {
    return color(this.red, this.green, this.blue, this.alpha);
  };
}

function Image(path) {
  this.path = path;
  this.filename = this.path.split('/').pop();

  this.image = document.createElement('IMG');
  this.image.src = this.path;
}

function Sound(path) {
  this.path = path;
  this.filename = this.path.split('/').pop();

  this.audio = document.createElement('AUDIO');
  this.audio.src = this.path;

  this.play = () => {
    this.audio.play();
  };

  this.pause = () => {
    this.audio.pause();
  };

  this.playPause = () => {
    if (this.audio.paused) this.play();
    else this.pause();
  };
}

function Store() {
  this.save = (name, data) => {
    let d;
    if (typeof data === 'object') d = JSON.stringify(data);
    else d = data;
    window.localStorage.setItem(name, d);
  };

  this.load = (name) => {
    let d = window.localStorage.getItem(name);
    let data = JSON.parse(d);
    return data;
  };

  this.removeItem = (name) => {
    window.localStorage.removeItem(name);
  };

  this.clearStorage = () => {
    window.localStorage.clear();
  };

  this.itemAtKey = (key) => {
    return window.localStorage.key(key);
  };
}

const Storage = new Store();

function color(red, green, blue, alpha) {
  if (red === undefined) {
    error('Invalid arguments for color function');
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

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  }
}

function distance(x1, y1, x2, y2) {
  if (!x1 && !y1) error('Invalid arguments for distance function');
  else {
    if (x2 === undefined && y2 === undefined) {
      if (
        x1 instanceof Vector ||
        (x1 instanceof Point && y1 instanceof Vector) ||
        y1 instanceof Point
      ) {
        return sqrt(sqr(x1.x - y1.x) + sqr(x1.y - y1.y));
      } else error('Invalid arguments for distance function');
    } else {
      return sqrt(sqr(x1 - x2) + sqr(y1 - y2));
    }
  }
}

function createVector(x, y) {
  let x1 = x || 0;
  let y1 = y || 0;
  return new Vector(x1, y1);
}

function randomVector(magnitude) {
  let x = randInt(Width);
  let y = randInt(Height);
  let vec = createVector(x, y);
  if (magnitude !== undefined) vec.setMagnitude(magnitude);
  else vec.normalize();
  return vec;
}

function createCanvas(width_, height_, canvas_) {
  return new Canvas(width_, height_, canvas_);
}

function createPoint(x, y) {
  return new Point(x, y);
}

function randomPoint() {
  return new Point(randInt(width), randInt(height));
}

function isInArray(array, element) {
  if (array === undefined || element === undefined)
    error('Invalid arguments for isInArray function');
  else {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return i;
      }
    }
    return false;
  }
}

function removeFromArray(array, element) {
  if (array === undefined || element === undefined)
    error('Invalid arguments for removeFromArray function');
  else {
    let i = isInArray(array, element);
    if (i === false) return;
    array.splice(i, 1);
  }
}

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

function toRadians(degrees) {
  return degrees * (PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / PI);
}

function constrain(num, min, max) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
}

function lerp(value1, value2, step) {
  if (value1 === undefined || value2 === undefined || step === undefined)
    error('Invalid arguments for lerp function');
  else {
    return (1 - step) * value1 + step * value2;
  }
}

function map(num, a, b, c, d) {
  return ((num - a) / (b - a)) * (d - c) + c;
}

function joinArray(array, spacing) {
  if (!array) error('Invalid arguments for joinArray function');
  else {
    let result = '';
    for (let item of array) {
      result += item;
      if (spacing) result += spacing;
    }

    return result;
  }
}

function removeChars(text, characters) {
  for (let i = 0; i < text.length; i++) {
    for (let char of characters) {
      if (text[i] === char) text = removeCharAt(text, i);
    }
  }
  return text;
}

function replaceCharAt(text, index, replacement) {
  let split = text.split('');
  split[index] = replacement;
  string = joinArray(split);
  return string;
}

function removeCharAt(text, index) {
  let string = text;
  let split = string.split('');
  split.splice(index, 1);
  string = joinArray(split);
  return string;
}

function sort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
}

function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function random(num1, num2) {
  if (num1 === undefined && num2 === undefined) return Math.random();
  else {
    if (num1.constructor === Array) {
      let i = Math.floor(Math.random() * num1.length);
      return num1[i];
    }
    if (num2 !== undefined) return Math.random() * (num2 - num1) + num1;
    else return Math.random() * num1;
  }
}

function randInt(num1, num2) {
  if (num1 === undefined && num2 === undefined)
    error('At least one argument is needed for the randInt function');
  else if (num2 !== undefined)
    return Math.floor(Math.random() * (num2 - num1) + num1);
  else return Math.floor(Math.random() * num1);
}

function setTitle(title) {
  document.title = title;
}

function floor(num) {
  return Math.floor(num);
}

function ceil(num) {
  return Math.ceil(num);
}

function round(num) {
  return Math.round(num);
}

function pow(num, pow) {
  return Math.pow(num, pow);
}

function sqrt(num) {
  return Math.sqrt(num);
}

function sqr(num) {
  return num * num;
}

function abs(num) {
  return Math.abs(num);
}

function sin(angle) {
  return Math.sin((angle * PI) / 180);
}

function cos(angle) {
  return Math.cos((angle * PI) / 180);
}

function acos(num) {
  return Math.acos(num);
}

function asin(num) {
  return Math.asin(num);
}

function tan(num) {
  return Math.tan(num);
}

function atan(num) {
  return Math.atan(num);
}

function exp(num) {
  return Math.exp(num);
}

function log(num) {
  return Math.log(num);
}

function min() {
  return Math.min.apply(null, arguments);
}

function max() {
  return Math.max.apply(null, arguments);
}

function write() {
  document.write.apply(null, arguments);
}

function print() {
  console.log.apply(null, arguments);
}

function table() {
  console.table.apply(null, arguments);
}

function error() {
  console.error.apply(null, arguments);
}

function warn() {
  console.warn.apply(null, arguments);
}

function setText(element, text) {
  document.getElementById(element).innerHtml = text;
}

window.addEventListener('keydown', (e) => {
  if (typeof keyDown === 'function') {
    keyCode = e.keyCode;
    keyDown();
  }
});

window.addEventListener('keyup', (e) => {
  if (typeof keyUp === 'function') {
    keyCode = e.keyCode;
    keyUp();
  }
});

window.addEventListener('touchstart', (e) => {
  let touches = e.touches;
  touchX = touches[0].clientX;
  touchY = touches[0].clientY;
  startTouchX = touchX;
  startTouchY = touchY;
  calledFunction = false;
  if (typeof touchStart === 'function') {
    touchStart(touches);
  }
});

window.addEventListener('touchmove', (e) => {
  let touches = e.touches;
  touchX = touches[0].clientX;
  touchY = touches[0].clientY;
  let distX = startTouchX - touchX;
  let distY = startTouchY - touchY;
  let dir;

  if (distX >= 100 && distY <= 10 && distY >= -10 && !calledFunction) {
    dir = RIGHT;
    if (typeof swipe === 'function') {
      calledFunction = true;
      log('Swiping ' + dir);
      swipe(dir);
    }
  } else if (distX <= -100 && distY <= 10 && distY >= -10 && !calledFunction) {
    dir = LEFT;
    if (typeof swipe === 'function') {
      calledFunction = true;
      log('Swiping ' + dir);
      swipe(dir);
    }
  } else if (distY <= -100 && distX <= 10 && distX >= -10 && !calledFunction) {
    dir = DOWN;
    if (typeof swipe === 'function') {
      calledFunction = true;
      log('Swiping ' + dir);
      swipe(dir);
    }
  } else if (distY >= 100 && distX <= 10 && distX >= -10 && !calledFunction) {
    dir = UP;
    if (typeof swipe === 'function') {
      calledFunction = true;
      log('Swiping ' + dir);
      swipe(dir);
    }
  }

  if (typeof touchMove === 'function') {
    touchMove(touches);
  }
});

window.addEventListener('touchend', (e) => {
  let touches = e.touches;
  if (typeof touchEnd === 'function') {
    touchEnd(touches);
  }
});

window.addEventListener('mousedown', (e) => {
  mousePressed = true;
  if (!mobile) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (typeof mouseDown === 'function') {
      mouseDown();
    }
  }
});

window.addEventListener('mousemove', (e) => {
  if (!mobile) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (typeof mouseMove === 'function') {
      mouseMove();
    }
  }
});

window.addEventListener('mouseup', (e) => {
  mousePressed = false;
  if (!mobile) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (typeof mouseUp === 'function') {
      mouseUp();
    }
  }
});

function framerate(framerate) {
  if (framerate && typeof framerate !== 'number') {
    error('Invalid argument for framerate function');
  } else {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    frameRate = framerate;
    interval = setInterval(loop, 1000 / frameRate);
  }

  return frameRate;
}

function include(file, callback) {
  let element = document.createElement('SCRIPT');
  element.src = file;
  document.head.appendChild(element);

  element.addEventListener('load', callback);
}

window.addEventListener('ready', () => {
  if (typeof preload === 'function') preload();
});

window.addEventListener('load', () => {
  mobile = isMobile();
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
  END = 'end';
  START = 'start';
  CORNER = 'corner';
  CENTER = 'center';
  RIGHT = 'right';
  LEFT = 'left';
  DOWN = 'down';
  UP = 'up';
  if (typeof onMobile === 'function' && mobile) onMobile();

  setup();
});

function noCanvas() {
  interval = setInterval(loop, 1000 / frameRate);
  hasACanvas = false;
}

function autoUpdate(obj) {
  if (typeof obj === 'object') updateable.push(obj);
  else if (obj === undefined)
    print('The autoUpdate function requires an argument');
  else print('The autoUpdate function requires an object');
}

function stopAutoUpdate(obj) {
  for (let i = 0; i < updateable.length; i++) {
    if (updateable[i] === obj) updateable.splice(i, 1);
  }
}

function loop() {
  frameCount++;

  if (hasACanvas && can.shouldClear) can.clear();
  for (let obj of updateable) {
    if (typeof obj.update === 'function') obj.update();
  }
  if (typeof update === 'function') update();
}
