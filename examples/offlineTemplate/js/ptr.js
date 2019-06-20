function isMobile() {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

let keyCode, mouseX, mouseY;
let touches = [];
let Width, Height;
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;
const SQRT1_2 = Math.SQRT1_2;
const LN2 = Math.LN2;
const LN10 = Math.LN10;
const LOG2E = Math.LOG2E;
const LOG10E = Math.LOG10E;
let mobile;
let innerWidth, innerHeight;
let can;
let fr = 60;
let interval = undefined;

window.addEventListener("ready", () => {
  if (typeof preload === "function") preload();
});

window.addEventListener("load", () => {
  mobile = isMobile();
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
  if (typeof onMobile === "function" && mobile) onMobile();
  setup();
});

function loop() {
  can.ctx.clearRect(-Width, -Height, Width * 2, Height * 2);
  update();
}

function framerate(framerate) {
  if (framerate && typeof framerate !== "number") {
    error("Invalid argument for framerate function");
  } else {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    fr = framerate;
    interval = setInterval(loop, 1000 / fr);
  }
}

function Canvas(width, height) {
  this.width = width || 100;
  this.height = height || this.width;

  Width = this.width;
  Height = this.height;

  this.background = 51;

  this.canvas = document.createElement("CANVAS"); //creating a canvas element
  document.body.appendChild(this.canvas); //adding the canvas to the body

  this.ctx = this.canvas.getContext("2d"); //getting the canvas context

  can = this.canvas;
  can.ctx = this.ctx;

  this.canvas.width = this.width; //setting width
  this.canvas.height = this.height; //setting height

  interval = setInterval(loop, 1000 / fr);

  this.rectDrawMode = "corner";

  this.setSize = (width, height) => {
    if (width == null && height == null) {
      error("setSize function requires at least one argument");
    } else {
      this.canvas.width = width;
      this.canvas.height = height || width;
      Width = width;
      Height = height;
    }
  };

  this.background = (r, g, b) => {
    if (
      (r == null && g == null && b == null) ||
      (r != null && g != null && b == null)
    ) {
      error("Invalid arguments for canvas background function");
    } else {
      let red = r;
      let green = g || r;
      let blue = b || r;

      let col = "rgb(" + red + "," + green + "," + blue + ")"; //creating a string with the imputed color
      this.canvas.style.backgroundColor = col; //setting the background color
    }
  };

  this.fill = (r, g, b, a) => {
    if (
      (r === null && g === null && b === null && a === null) ||
      (r !== null && g !== null && b !== null && a === null)
    ) {
      error("Invalid arguments for canvas fill function");
    } else {
      let red = r;
      let green = g || r;
      let blue = b || r;
      let alpha = a / 255 || 1;

      let col = "rgba(" + red + "," + green + "," + blue + ", " + alpha + ")"; //creating a string with the imputed color
      this.ctx.fillStyle = col;
    }
  };

  this.noFill = () => {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
  };

  this.stroke = (r, g, b, a) => {
    if (
      (r == null && g == null && b == null && a === null) ||
      (r != null && g != null && b == null && a === null)
    ) {
      error("Invalid arguments for canvas stroke function");
    } else {
      let red = r;
      let green = g || r;
      let blue = b || r;
      let alpha = a / 255 || 1;

      let col = "rgba(" + red + "," + green + "," + blue + ", " + alpha + ")"; //creating a string with the imputed color
      this.ctx.strokeStyle = col;
    }
  };

  this.noStroke = () => {
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0)";
  };

  this.lineWidth = width => {
    this.ctx.lineWidth = width;
  };

  this.line = (x1, y1, x2, y2) => {
    if (x1 === null || x2 === null || y1 === null || y2 === null)
      error("Invalid arguments for canvas line function");
    else {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  };

  this.rect = (x, y, width, height) => {
    if (x == null && y == null && width == null && height == null) {
      error("Invalid arguments for rectangle function");
    } else {
      let x1 = x;
      let y1 = y;
      let wid, heig;
      if (width == null && height == null) {
        y1 = x1;
        wid = y;
        heig = width;
      } else if (width != null && height == null) {
        wid = width;
        heig = wid;
      } else {
        wid = width;
        heig = height;
      }

      if (this.rectDrawMode === "corner") {
        this.ctx.fillRect(x1, y1, wid, heig);
        this.ctx.strokeRect(x1, y1, wid, heig);
      } else if (this.rectDrawMode === "center") {
        this.ctx.fillRect(x1 - wid / 2, y1 - heig / 2, wid, heig);
        this.ctx.strokeRect(x1 - wid / 2, y1 - heig / 2, wid, heig);
      }
    }
  };

  this.rectMode = mode => {
    if (mode !== "center" && mode !== "corner")
      error("Invalid argument for Canvas rectMode method");
    else this.rectDrawMode = mode;
  };

  this.circle = (x, y, r) => {
    if (x === null || y === null || r === null) {
      error("Invalid arguments for canvas circle function");
    } else {
      let x1 = x;
      let y1 = y;
      let radius = r;

      this.ctx.beginPath();
      this.ctx.arc(x1, y1, radius, 0, PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    }
  };

  this.text = (text, x, y, fontSize, fontName) => {
    if (
      text == null ||
      x == null ||
      y == null ||
      fontSize == null ||
      fontName == null
    )
      error("Invalid arguments for canvas text function");
    else {
      this.ctx.font = fontSize.toString() + "px " + fontName;
      this.ctx.fillText(text, x, y);
      this.ctx.strokeText(text, x, y);
    }
  };

  this.textAlign = align => {
    if (!align) error("You need to specify the text alignment");
    else {
      this.ctx.textAlign = align;
    }
  };

  this.translate = (x, y) => {
    this.ctx.translate(x, y);
  };

  this.rotate = angle => {
    this.ctx.rotate((angle * PI) / 180);
  };

  this.save = () => {
    this.ctx.save();
  };

  this.restore = () => {
    this.ctx.restore();
  };

  this.screenshot = () => {
    let d = document.createElement("a");
    let number = randInt(999999);
    let down = number + ".png";
    d.setAttribute("download", down);
    d.href = this.canvas
      .toDataURL("image/png")
      .replace(/^data:image\/[^;]/, "data:application/octet-stream");
    d.click();
  };

  this.playPause = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    } else {
      framerate(fr);
    }
  };

  this.drawImage = (image, sx, sy, swidth, sheight, x, y, wid, heig) => {
    if (image === null)
      error("Invalid arguments for canvas drawImage function");
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

function createCanvas(width, height) {
  return new Canvas(width, height);
}

function Image(path) {
  this.path = path;
  this.filename = this.path.split("/").pop();

  this.image = document.createElement("IMG");
  this.image.src = this.path;
}

function Vector(x, y) {
  this.x = 0;
  this.y = 0;

  this.previousX = 0;
  this.previousY = 0;

  if (x != null) this.x = x;
  if (y != null) this.y = y;

  this.set = (x, y) => {
    if (x == null && y == null) {
      error("No X or Y value has been passed to the Vector set function");
    } else {
      this.previousX = x;
      this.previousX = y;
      if (x != null) this.x = x;

      if (y != null) this.y = y;
    }
  };

  this.add = vec2 => {
    if (x == null && y == null) {
      error("No vector has been passed to the Vector add function");
    } else {
      this.previousX = this.x;
      this.previousY = this.y;

      this.x += vec2.x;

      this.y += vec2.y;
    }
  };

  this.subtract = vec2 => {
    if (x == null && y == null) {
      error("No vector has been passed to the Vector subtract function");
    } else {
      this.previousX = this.x;
      this.previousY = this.y;

      this.x -= vec2.x;

      this.y -= vec2.y;
    }
  };

  this.multiply = num => {
    this.previousX = this.x;
    this.previousY = this.y;

    this.x *= num;
    this.y *= num;
  };

  this.divide = num => {
    num = 1 / num;
    this.multiply(num);
  };

  this.angle = degrees => {
    if (degrees)
      return (acos(this.x / pow(sqr(this.x) + sqr(this.y), -1)) * 180) / PI;
    else return acos(this.x / pow(sqr(this.x) + sqr(this.y), -1));
  };

  this.rotate = angle => {
    this.previousX = this.x;
    this.previousY = this.y;

    this.x = cos(angle) * this.previousX - sin(angle) * this.previousY;
    this.y = sin(angle) * this.previousX - cos(angle) * this.previousY;
  };

  this.magnitude = () => {
    return sqrt(sqr(this.x) + sqr(this.y));
  };

  this.setMagnitude = newMag => {
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

  this.distance = vec2 => {
    if (vec2 === null)
      error("You need to pass another vector to he Vector distance method");
    else
      return sqrt(
        (this.x - vec2.x) * (this.x - vec2.x) +
          (this.y - vec2.y) * (this.y - vec2.y)
      );
  };

  this.isOffScreen = () => {
    if (
      this.x > canvas.width ||
      this.x < 0 ||
      this.y > canvas.height ||
      this.y < 0
    )
      return true;
    else return false;
  };
}

Vector.__proto__.fromAngle = angle => {
  return new Vector(cos(angle), sin(angle));
};

function createVector(x, y) {
  return new Vector(x, y);
}

function Point(x, y) {
  this.x = x;
  this.y = y;

  this.distance = pt2 => {
    if (pt2 === null)
      error("You need to pass another point to the Point distance method");
    else
      return sqrt(
        (this.x - pt2.x) * (this.x - pt2.x) +
          (this.y - pt2.y) * (this.y - pt2.y)
      );
  };
}

function map(num, a, b, c, d) {
  return ((num - a) / (b - a)) * (d - c) + c;
}

function random(a, b) {
  if (a === null && b === null) return Math.random();
  else {
    if (a.constructor === Array) {
      let i = Math.floor(Math.random() * a.length);
      return a[i];
    }
    if (b != null) return Math.random() * (b - a) + a;
    else return Math.random() * a;
  }
}

function randInt(a, b) {
  if (a == null && b == null)
    error("At least one argument is needed for the randInt function");
  else if (b != null) return Math.floor(Math.random() * (b - a) + a);
  else return Math.floor(Math.random() * a);
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

function write(text) {
  document.write(text);
}

function log(text) {
  console.log(text);
}

function error(text) {
  console.error(text);
}

function warn(text) {
  console.warn(text);
}

function setText(element, text) {
  document.getElementById(element).innerHtml = text;
}

window.addEventListener("keydown", e => {
  if (typeof keyDown === "function") {
    keyCode = e.keyCode;
    keyDown();
  }
});

window.addEventListener("keyup", e => {
  if (typeof keyUp === "function") {
    keyCode = e.keyCode;
    keyUp();
  }
});

window.addEventListener("touchstart", e => {
  let touches = e.touches;
  if (typeof touchStart === "function") {
    touchStart(touches);
  }
});

window.addEventListener("touchmove", e => {
  let touches = e.touches;
  if (typeof touchMove === "function") {
    touchMove(touches);
  }
});

window.addEventListener("touchend", e => {
  let touches = e.touches;
  if (typeof touchEnd === "function") {
    touchEnd(touches);
  }
});

window.addEventListener("mousedown", e => {
  if (!mobile) {
    mouseX = e.mouseX;
    mouseY = e.mouseY;
    if (typeof mouseDown === "function") {
      mouseDown();
    }
  }
});

window.addEventListener("mousemove", e => {
  if (!mobile) {
    mouseX = e.mouseX;
    mouseY = e.mouseY;
    if (typeof mouseMove === "function") {
      mouseMove();
    }
  }
});

window.addEventListener("mouseup", e => {
  if (!mobile) {
    mouseX = e.mouseX;
    mouseY = e.mouseY;
    if (typeof mouseUp === "function") {
      mouseUp();
    }
  }
});
