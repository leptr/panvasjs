# Ptr.js

## A framework for JavaScript canvas

## Documentation

## Variables

- **mobile** - variable that is `true` if the code is opened from a mobile device or `false` if it is not; useful if you have special control buttons for mobile devices
- **Width** and **Height** - contain the width and height of the canvas element
- **innerWidth** and **innerHeight** - contain the innner width and inner height of the browser window
- **PI** - Pi constant
- **E** - Euler's constant
- **SQRT2** - square root of 2
- **SQRT1_2** - square root of 1/2
- **LN2** - natural logarithm of 2
- **LN10** - natural logarithm of 10
- **LOG2E** - base 2 logarithm of e
- **LOG10E** - base 10 logarithm of e
- **frameCount** - contains the number of frames that have passed since the loop started running

## Functions

- `framerate(newFramerate)` - changes the framerate to the new one
- `map(num, a, b, c, d)` - takes a number that is in range from a to b numbers and maps it to the range from c to d
- `random(num1, num2)` - returns a random number in the range of num1 to num2; if num2 is null, it returns a random number from 0 to num1; if both num1 and num2 are null, it returns a random number from 0 to 1; if an array is passed to the random function, it will return a random element from that array
- `randInt(num1, num2)` - same as random(), except it returns a whole number; you must provide at least one argument
- `floor(num)` - rounds the given number to the next lower integer
- `ceil(num)` - rounds the given number to the next higher integer
- `round(num)` - rounds the given number mathematically
- `pow(num, pow)` - returns num to the power of pow
- `sqrt(num)` - returns the square root of the given number
- `sqr(num)` - returns the square of given number
- `abs(num)` - returns the absolute value of the given number
- `sin(angle)` - returns the sine of given angle
- `cos(angle)` - returns the cosine of given angle
- `asin(num)` - returns the arcus sine of the given number
- `acos(num)` - returns the arcus cosine of the given number
- `tan(angle)` - returns the tangent of the given angle
- `atan(num)` - returns the arcus tangnet of the given number
- `exp(num)` - return E to the power of num
- `log(num)` - returns the natural logarith of num with base E
- `min(nums)` - returns the lowest of the numbers given; takes multiple numbers as input
- `max(nums)` - returns the highest of the numbers given; takes multiple numbers as input
- `write(text)` - writes the given text to the document
- `log(text)` - logs the given text to the console
- `error(text)` - writes the given text to the console as an error
- `warn(text)` - writes the given text to the console as a warning
- `setText(element, text)` - writes the given text to the element with the given ID
- `keyDown()` - activates when a key is pressed; has a built in variable called keyCode which contains the code of the pressed key
- `keyUp()` - activates when a key is released; has a built in variable called keyCode which contains the code of the released key
- `touchStart()` - activates only on touchscreen devices when the screen has been touched; it is given an array as an argument which contains all the information about all the touches of the screen
- `touchMove()` - activates only on touchscreen devices when the screen is touched and a touch is moving on the screen; it is given an array as an argument which contains all the information about all the touches of the screen
- `touchEnd()`- activates only on touchscreen devices when the screen has been released; it is given an array as an argument which contains all the information about all the touches of the screen
- `mouseDown()` - activates when the left mouse button is clicked; the mouse coordinates can be accessed through the mouseX and mouseY variables
- `mouseMove()` - activates when the left mouse button is held down and mouse is moving; the mouse coordinates can be accessed through the mouseX and mouseY variables
- `mouseUp()` - activates when the left mouse button is released; the mouse coordinates can be accessed through the mouseX and mouseY variables
- `createVector(x, y)` - returns a Vector object with the given x and y values
- `createCanvas(widht, height)` - returns a Canvas object wit the given width and height values
- `Vector.fromAngle(angle)` - returns a Vector object generated from the given angle
- `preload()` - runs its code before anything else; useful for preloading images or other files

## Classes

## Canvas

Class Canvas is the main class of the framework. When an instance is created, it creates a canvas element and appends it to the document body. An instance can be created by calling the `createCanvas()` function. Example: `let canvas = createCanvas(400, 400);`

### Attributes

- **width** - contains the width of the canvas; it can also be accessed through the Width global variable
- **height** - contains the height of the canvas; it can also be accessed through the Height global variable
- **canvas** - points to the actual canvas element that is displayed in the document
- **ctx** - contains the context of the canvas element

### Methods

- `setSize(newWidth, newHeight)` - changes the dimensions of the canvas to the new dimensions; also updates the Width and Height global variables
- `background(r, g, b)` - changes the canvas background color to the given RGB values; if only one value is passed to the method, that value is taken as the red, green, and blue value
- `fill(r, g, b, a)` - changes the fill color of the canvas; if only one value is passed to the method, that value is taken as the red, green, and blue value, and alpha is set to 255; to set the alpha value, you must pass all four arguments; alpha ranges from 0 to 255
- `noFill()` - removes the fill
- `stroke(r, g, b, a)` - changes the stroke color of the canvas; if only one value is passed to the method, that value is taken as the red, green, and blue value, and alpha is set to 255; to set the alpha value, you must pass all four arguments; alpha ranges from 0 to 255
- `noStroke()` - removes the stroke
- `lineWidth(width)` - changes the stroke line width
- `line(x1, y1, x2, y2)` - draws a line from (x1, y1) to (x2, y2); lineWidth function affects it
- `rect(x, y, width, height)` - draws a rectangle starting at the given coordinates with the given dimensions; only two arguments can be passed, in which case x and y are set to the first number, and width and height are set to the second number
- `rectMode(mode)` - sets the drawing mode for rectangles on canvas; takes a string for an input; valid values are "center" or "corner"
- `circle(x, y, radius)` - draws a circle at the given coordinates with the given radius
- `text(text, x, y, fontSize, fontName)` - displays the given text on the canvas at the given coordinates; fontSize is an integer, fontName is a string
- `textAlign(alignment)` - sets the alignment for the displayed text; takes a string for an input; valid values are "start", "end", "left", "right", "center"
- `translate(x, y)` - translates the canvas starting point to the given coordinates
- `rotate(angle)` - rotates the canvas by the given angle
- `save()` - saves the current state of the canvas
- `restore()` - restores the last saved state of the canvas
- `screenshot()` - takes a screenshot of the canvas and saves it as a png file; the background color is not included in the screenshot
- `playPause()` - either stops or restarts the main loop depending on its state
- `drawImage(image, sx, sy, swidth, sheight, x, y, width, height)` - draws an image on the canvas; Arguments:

1. image - an image object
2. sx (optional) - x value from which the cropping of the image starts
3. sy (optional) - y value from which the cropping of the image starts
4. swidth (optional) - width of the crop
5. sheight (optional) - height of the crop
6. x - x coordinate of the canvas from which the image starts drawing
7. y - y coordinate of the canvas from which the image starts drawing
8. width (optional) - width of the image on the canvas; if left blank, it will be displayed in its full size
9. height (optional) - height of the image on the canvas; if left blank, it will be displayed in its full size

## Image

Takes a path to the image as an argument.

### Attributes

- **path** - contains the path to the image
- **filename** - contains the name of the image file
- **image** - contains the image element

## Point

A point on the canvas

### Attribures

- **x** - the x coordinate of the point
- **y** - the y coordinate of the point

### Methods

- `distance(point2)` - returns the distance to the given point
- `isOffScreen()` - returns true if the point is off the screen to any side; translating the canvas affects its work

## Vector

A 2D Vector object

### Attributes

- **x** - the x coordinate
- **y** - the y coordinate
- **previousX** - contains the previous x coordinate of the vector in case it has changed
- **previousY** - contains the previous y coordinate of the vector in case it has changed

### Methods

- `set(newX, newY)` - changes vectors x and y coordinates to the new ones
- `add(vector2)` - adds the two vectors and changes x and y coordinates to the result ones
- `subtract(vector2)` - subtracts the two vectors and changes x and y coordinates to the result ones
- `multiply(vector2)` - multiplies the two vectors and changes x and y coordinates to the result ones
- `divide(vector2)` - divides the two vectors and changes x and y coordinates to the result ones
- `angle()` - returns the angle of the vector in relation to the x axis
- `rotate(angle)` - rotates the vector by the given angle
- `magintude()` - returns the magnitude (length) of the vector
- `setMagnitude(newMagnitude)` - sets the magnitude (length) of the vector to the new one
- `copy()` - returns a copy of the vector
- `normalize()` - normalizes the vector (sets its magnitude to 1)
- `distance(vector2)` - returns the distance to the given vector
- `isOffScreen()` - returns true if the vector is off the screen to any side; translating the canvas affects its work
